import { Session } from "./license.js";
import { WidevineDevice } from "./device.js";
import { RemoteCdm } from "../remote_cdm.js";
import {
    DeviceManager,
    RemoteCDMManager,
    base64toUint8Array,
    uint8ArrayToBase64,
    notifyUser
} from "../../util.js";

const { LicenseType, SignedMessage, LicenseRequest, License } = protobuf.roots.default.license_protocol;

export class WidevineLocal {    
    constructor(host, sessions) {
        this.host = host;
        this.sessions = sessions;
    }

    async generateChallenge(pssh, extra) {
        const { serverCert } = extra;

        if (!pssh) {
            console.log("[Vineless]", "NO_PSSH_DATA_IN_CHALLENGE");
            return;
        }

        const selected_device_name = await DeviceManager.getSelectedWidevineDevice(this.host);
        if (!selected_device_name) {
            return;
        }

        const device_b64 = await DeviceManager.loadWidevineDevice(selected_device_name);
        const widevine_device = new WidevineDevice(base64toUint8Array(device_b64).buffer);

        const private_key = `-----BEGIN RSA PRIVATE KEY-----${uint8ArrayToBase64(widevine_device.private_key)}-----END RSA PRIVATE KEY-----`;
        const session = new Session(
            {
                privateKey: private_key,
                identifierBlob: widevine_device.client_id_bytes
            },
            pssh
        );

        if (serverCert) {
            session.setServiceCertificate(base64toUint8Array(serverCert));
        }

        const [challenge, request_id] = session.createLicenseRequest(LicenseType.STREAMING, widevine_device.type === 2);

        return {
            sessionKey: uint8ArrayToBase64(request_id),
            sessionValue: session,
            challenge: uint8ArrayToBase64(challenge)
        };
    }

    async parseLicense(body) {
        const license = base64toUint8Array(body);
        const signed_license_message = SignedMessage.decode(license);

        if (signed_license_message.type !== SignedMessage.MessageType.LICENSE) {
            console.log("[Vineless]", "INVALID_MESSAGE_TYPE", signed_license_message.type.toString());
            return;
        }

        const license_obj = License.decode(signed_license_message.msg);
        const loaded_request_id = uint8ArrayToBase64(license_obj.id.requestId);

        if (!this.sessions.has(loaded_request_id)) {
            return;
        }

        const loadedSession = this.sessions.get(loaded_request_id);
        const keys = await loadedSession.parseLicense(license);
        const pssh = loadedSession.getPSSH();

        const log = {
            type: "WIDEVINE",
            pssh_data: pssh,
            keys: keys,
            timestamp: Math.floor(Date.now() / 1000)
        }

        return {
            pssh: pssh,
            log: log,
            sessionKey: loaded_request_id
        };
    }
}

export class WidevineRemote {
    constructor(host, sessions) {
        this.host = host;
        this.sessions = sessions;
    }

    async generateChallenge(pssh) {
        if (!pssh) {
            console.log("[Vineless]", "NO_PSSH_DATA_IN_CHALLENGE");
            return;
        }

        const selected_remote_cdm_name = await RemoteCDMManager.getSelectedRemoteCDM(this.host);
        if (!selected_remote_cdm_name) {
            return;
        }

        const selected_remote_cdm = JSON.parse(await RemoteCDMManager.loadRemoteCDM(selected_remote_cdm_name));
        const remote_cdm = RemoteCdm.from_object(selected_remote_cdm);

        try {
            const session_id = await remote_cdm.open();
            const challenge_b64 = await remote_cdm.get_license_challenge(session_id, pssh, true);

            const signed_challenge_message = SignedMessage.decode(base64toUint8Array(challenge_b64));
            const challenge_message = LicenseRequest.decode(signed_challenge_message.msg);

            return {
                sessionKey: uint8ArrayToBase64(challenge_message.contentId.widevinePsshData.requestId),
                sessionValue: {
                    id: session_id,
                    pssh: pssh,
                    remoteCdm: remote_cdm
                },
                challenge: challenge_b64
            };
        } catch (error) {
            console.error("[Vineless]", "ERROR_GENERATING_CHALLENGE", error);
            const isSW = typeof window === "undefined";
            notifyUser(
                "Remote challenge generation failed!",
                error.message +
                "\nRefer to the extension " +
                (isSW ? "service worker" : "background script") +
                " DevTools console for more details."
            );
        }
    }

    async parseLicense(body) {
        const license = base64toUint8Array(body);
        const signed_license_message = SignedMessage.decode(license);

        if (signed_license_message.type !== SignedMessage.MessageType.LICENSE) {
            console.log("[Vineless]", "INVALID_MESSAGE_TYPE", signed_license_message.type.toString());
            return;
        }

        const license_obj = License.decode(signed_license_message.msg);
        const loaded_request_id = uint8ArrayToBase64(license_obj.id.requestId);

        if (!this.sessions.has(loaded_request_id)) {
            return;
        }

        const session = this.sessions.get(loaded_request_id);
        const remote_cdm = session.remoteCdm;

        try {
            await remote_cdm.parse_license(session.id, body);
            const returned_keys = await remote_cdm.get_keys(session.id, "CONTENT");
            await remote_cdm.close(session.id);

            if (returned_keys.length === 0) {
                return;
            }

            const keys = returned_keys.map(({ key, key_id }) => ({ k: key, kid: key_id }));

            const log = {
                type: "WIDEVINE",
                pssh_data: session.pssh,
                keys: keys,
                timestamp: Math.floor(Date.now() / 1000),
            }

            return {
                pssh: session.pssh,
                log: log,
                sessionKey: loaded_request_id
            };
        } catch (error) {
            console.error("[Vineless]", "ERROR_PARSING_LICENSE", error);
            const isSW = typeof window === "undefined";
            notifyUser(
                "Remote license parsing failed!",
                error.message +
                "\nRefer to the extension " +
                (isSW ? "service worker" : "background script") +
                " DevTools console for more details."
            );
        }
    }
}
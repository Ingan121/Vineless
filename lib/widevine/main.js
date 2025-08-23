import { Session } from "./license.js";
import { WidevineDevice } from "./device.js";
import {
    DeviceManager,
    base64toUint8Array,
    uint8ArrayToBase64,
} from "../../util.js";

const { LicenseType } = protobuf.roots.default.license_protocol;

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

    async parseLicense(body, session) {
        const license = base64toUint8Array(body);
        const keys = await session.parseLicense(license);
        const pssh = session.getPSSH();

        const log = {
            type: "WIDEVINE",
            pssh_data: pssh,
            keys: keys,
            timestamp: Math.floor(Date.now() / 1000)
        }

        return {
            pssh: pssh,
            log: log
        };
    }
}
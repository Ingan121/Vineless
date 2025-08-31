import { Session } from "./license.js";
import { WidevineDevice } from "./device.js";
import {
    DeviceManager,
    base64toUint8Array,
    uint8ArrayToBase64,
    compareUint8Arrays
} from "../../util.js";

const { LicenseType } = protobuf.roots.default.license_protocol;

export class WidevineLocal {
    constructor(host, keySystem, sessionId, tab) {
        this.host = host;
    }

    async generateChallenge(pssh, extra) {
        const { serverCert } = extra;

        if (!pssh) {
            throw new Error("No PSSH data in challenge");
        }

        const selected_device_name = await DeviceManager.getSelectedWidevineDevice(this.host);
        if (!selected_device_name) {
            throw new Error("No Widevine device selected");
        }

        const device_b64 = await DeviceManager.loadWidevineDevice(selected_device_name);
        const widevine_device = new WidevineDevice(base64toUint8Array(device_b64).buffer);

        const psshBytes = base64toUint8Array(pssh);
        const PSSH_MAGIC = new Uint8Array([0x70, 0x73, 0x73, 0x68]);
        let initDataType = "cenc";
        if (!compareUint8Arrays(psshBytes.subarray(4, 8), PSSH_MAGIC)) {
            initDataType = "webm";
        }

        const private_key = `-----BEGIN RSA PRIVATE KEY-----${uint8ArrayToBase64(widevine_device.private_key)}-----END RSA PRIVATE KEY-----`;
        this.session = new Session(
            {
                privateKey: private_key,
                identifierBlob: widevine_device.client_id_bytes
            },
            psshBytes,
            initDataType
        );

        if (serverCert) {
            await this.session.setServiceCertificate(base64toUint8Array(serverCert));
            console.log("Set service certificate", this.session._serviceCertificate);
        }

        const [challenge] = this.session.createLicenseRequest(LicenseType.AUTOMATIC, widevine_device.type === 2);

        return uint8ArrayToBase64(challenge);
    }

    async parseLicense(license) {
        const keys = await this.session.parseLicense(base64toUint8Array(license));
        const pssh = this.session.getPSSH();

        return {
            type: "WIDEVINE",
            pssh: pssh,
            keys: keys
        };
    }
}
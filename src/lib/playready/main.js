import { Cdm } from './cdm.js';
import { PlayReadyDevice } from "./device.js";
import { Utils } from "./utils.js";
import { utils } from "./noble-curves.min.js";
import {
    PRDeviceManager,
    base64toUint8Array,
    uint8ArrayToBase64
} from '../../util.js';

export class PlayReadyLocal {
    constructor(host, keySystem, sessionId, tab) {
        this.host = host;
    }

    async generateChallenge(pssh, extra) {
        if (!pssh) {
            throw new Error("No PSSH data in challenge");
        }

        const selected_device_name = await PRDeviceManager.getSelectedPlayreadyDevice(this.host);
        if (!selected_device_name) {
            throw new Error("No PlayReady device selected");
        }

        const device_b64 = await PRDeviceManager.loadPlayreadyDevice(selected_device_name);
        const playready_device = new PlayReadyDevice(Utils.base64ToBytes(device_b64));
        this.cdm = Cdm.fromDevice(playready_device);

        const rawInitData = base64toUint8Array(pssh);
        const decodedInitData = new TextDecoder("utf-16le").decode(rawInitData);

        /*
        * arbitrary data could be formatted in a special way and parsing it with the spec-compliant xmldom could remove
        * required end tags (e.g. '</KID>')
        * */
        this.wrmHeader = decodedInitData.match(/<WRMHEADER.*?WRMHEADER>/gm)[0];
        const version = "10.0.16384.10011";

        const licenseChallenge = this.cdm.getLicenseChallenge(this.wrmHeader, "", version);
        const newChallenge = btoa(licenseChallenge);

        const newXmlDoc = `<PlayReadyKeyMessage type="LicenseAcquisition">
            <LicenseAcquisition Version="1">
                <Challenge encoding="base64encoded">${newChallenge}</Challenge>
                <HttpHeaders>
                    <HttpHeader>
                        <name>Content-Type</name>
                        <value>text/xml; charset=utf-8</value>
                    </HttpHeader>
                    <HttpHeader>
                        <name>SOAPAction</name>
                        <value>"http://schemas.microsoft.com/DRM/2007/03/protocols/AcquireLicense"</value>
                    </HttpHeader>
                </HttpHeaders>
            </LicenseAcquisition>
        </PlayReadyKeyMessage>`.replace(/  |\n/g, '');

        const utf8KeyMessage = new TextEncoder().encode(newXmlDoc);
        const newKeyMessage = new Uint8Array(utf8KeyMessage.length * 2);

        for (let i = 0; i < utf8KeyMessage.length; i++) {
            newKeyMessage[i * 2] = utf8KeyMessage[i];
            newKeyMessage[i * 2 + 1] = 0;
        }

        return uint8ArrayToBase64(newKeyMessage);
    }

    async parseLicense(license) {
        const returned_keys = this.cdm.parseLicense(atob(license));
        const keys = returned_keys.map(key => ({ k: utils.bytesToHex(key.key), kid: utils.bytesToHex(key.key_id) }));

        return {
            type: "PLAYREADY",
            pssh: this.wrmHeader,
            keys: keys
        };
    }
}
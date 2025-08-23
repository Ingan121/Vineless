import { Cdm } from './cdm.js';
import { Device } from "./device.js";
import { Utils } from "./utils.js";
import { utils } from "./noble-curves.min.js";
import {
    PRDeviceManager,
    base64toUint8Array,
    uint8ArrayToBase64
} from '../../util.js';

export class PlayReadyLocal {
    constructor(host, sessions) {
        this.host = host;
        this.sessions = sessions;
    }

    async generateChallenge(pssh, extra) {
        const { sessionId } = extra;

        const selected_device_name = await PRDeviceManager.getSelectedPlayreadyDevice(this.host);
        if (!selected_device_name) {
            return;
        }

        const device_b64 = await PRDeviceManager.loadPlayreadyDevice(selected_device_name);
        const playready_device = new Device(Utils.base64ToBytes(device_b64));
        const cdm = Cdm.fromDevice(playready_device);

        const challengeData = base64toUint8Array(pssh);
        const challenge = new TextDecoder("utf-16le").decode(challengeData);

        /*
        * arbitrary data could be formatted in a special way and parsing it with the spec-compliant xmldom could remove
        * required end tags (e.g. '</KID>')
        * */
        const wrmHeader = challenge.match(/<WRMHEADER.*?WRMHEADER>/gm)[0];
        const version = "10.0.16384.10011";

        const licenseChallenge = cdm.getLicenseChallenge(wrmHeader, "", version);
        const newChallenge = btoa(licenseChallenge);
        console.log("[Vineless]", "REPLACING", challenge, licenseChallenge, sessionId);

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

        return {
            sessionKey: sessionId,
            sessionValue: { wrmHeader, cdm },
            challenge: uint8ArrayToBase64(newKeyMessage)
        };
    }

    async parseLicense(body, session) {
        const { cdm, wrmHeader } = session;
        const returned_keys = cdm.parseLicense(atob(body));
        const keys = returned_keys.map(key => ({ k: utils.bytesToHex(key.key), kid: utils.bytesToHex(key.key_id) }));

        const log = {
            type: "PLAYREADY",
            wrm_header: wrmHeader,
            keys: keys,
            timestamp: Math.floor(Date.now() / 1000),
        }

        return {
            pssh: wrmHeader,
            log: log
        };
    }
}
import {
    base64toUint8Array,
    uint8ArrayToBase64,
    uint8ArrayToHex,
    hexToUint8Array,
    flipUUIDByteOrder,
    RemoteCDMManager
} from "../util.js";

const { SignedMessage, LicenseRequest } = protobuf.roots.default.license_protocol;

export class GenericRemoteDevice {
    constructor(host) {
        this.host = host;
    }

    async generateChallenge(pssh, extra) {
        this.pssh = pssh;
        const { serverCert, sessionId } = extra;

        if (!pssh) {
            throw new Error("No PSSH data in challenge");
        }

        const selectedRemoteCdmName = await RemoteCDMManager[sessionId ? 'getSelectedPRRemoteCDM' : 'getSelectedRemoteCDM'](this.host);
        if (!selectedRemoteCdmName) {
            throw new Error("No Remote CDM selected");
        }

        const selectedRemoteCdm = JSON.parse(await RemoteCDMManager.loadRemoteCDM(selectedRemoteCdmName));
        selectedRemoteCdm.sg_api_conf = Object.assign(getDefaultSGConfig(selectedRemoteCdm.type), selectedRemoteCdm.sg_api_conf || {});
        this.remoteCdm = new RemoteCdm(selectedRemoteCdm);

        try {
            const challengeB64 = await this.remoteCdm.generateChallenge(pssh, serverCert);

            let sessionIdToUse = sessionId; // PlayReady
            if (!sessionIdToUse) { // Widevine
                const signedChallengeMessage = SignedMessage.decode(base64toUint8Array(challengeB64));
                const challengeMessage = LicenseRequest.decode(signedChallengeMessage.msg);
                sessionIdToUse = uint8ArrayToBase64(challengeMessage.contentId.widevinePsshData.requestId);
            }

            return {
                sessionKey: sessionIdToUse,
                challenge: challengeB64
            };
        } catch (error) {
            let message = error.message;
            if (this.remoteCdm.lastMsg) {
                message = "Server returned message: " + this.remoteCdm.lastMsg;
            } else if (message.includes("fetch")) {
                message += "\nMake sure the server is reachable.";
            }
            throw new Error("Remote: " + message);
        }
    }

    async parseLicense(body) {
        try {
            const keysData = await this.remoteCdm.parseLicense(body);

            if (!keysData) {
                throw new Error("No keys were received from the remote CDM!");
            }

            const keys = this.remoteCdm.parseKeys(keysData);

            if (keys.length === 0) {
                throw new Error("No keys were received from the remote CDM!");
            }

            const log = {
                type: this.remoteCdm.type,
                pssh_data: this.pssh,
                keys: keys,
                timestamp: Math.floor(Date.now() / 1000),
            }

            return {
                pssh: this.pssh,
                log: log
            };
        } catch (error) {
            let message = error.message;
            if (this.remoteCdm.lastMsg) {
                message = "Server returned message: " + this.remoteCdm.lastMsg;
            } else if (message.includes("fetch")) {
                message += "\nMake sure the server is reachable.";
            }
            throw new Error("Remote: " + message);
        }
    }
}

export class RemoteCdm {
    constructor(dataObj) {
        this.type = dataObj.type || "WIDEVINE";
        this.device_type = dataObj.device_type;
        this.system_id = dataObj.system_id;
        this.security_level = dataObj.security_level;
        this.device_name = dataObj.device_name || dataObj.name;
        this.name_override = dataObj.name_override;

        this.apiConf = dataObj.sg_api_conf;
        this.baseUrl = dataObj.host || "";
        this.baseHeaders = this.apiConf?.headers || {};

        this.overridingHeaders = this.apiConf?.overrideHeaders;
        if (this.overridingHeaders) {
            registerOverrideHeaders(this.overridingHeaders.headers, this.overridingHeaders.urls);
        }

        this.secret = dataObj.secret;
        for (const [key, value] of Object.entries(this.baseHeaders)) {
            if (value === "{secret}") {
                if (this.secret) {
                    this.baseHeaders[key] = this.secret;
                } else {
                    delete this.baseHeaders[key];
                }
            }
        }
    }

    getName() {
        let name = this.name_override;
        if (!name) {
            name = this.baseUrl + "/" + this.device_name;
        }
        if (this.type === "PLAYREADY") {
            let type = "PR";
            switch (this.security_level + '') {
                case "3000":
                    type = "SL3K"
                    break;
                case "2000":
                    type = "SL2K"
                    break;
                default:
                    type = "SL" + this.security_level;
            }
            return `[${type}] ${name}`;
        }
        const type = this.device_type === "CHROME" ? "CHROME" : `L${this.security_level}`;
        return `[${type}] ${name} (${this.system_id})`;
    }

    async generateChallenge(pssh, serverCert) {
        this.pssh = pssh;
        this.serverCert = serverCert;

        const apiData = this.apiConf.generateChallenge;
        const requests = Array.isArray(apiData) ? apiData : [apiData];
        for (const request of requests) {
            if (request.serverCertOnly && !serverCert) {
                continue;
            }
            const options = {
                method: request.method || "POST",
                headers: Object.assign(this.baseHeaders, request.headers),
            };
            if (options.method === "POST") {
                let data = {};
                if (request.bodyObj) {
                    data = request.bodyObj;
                }
                if (request.sessionIdKeyName) {
                    setNestedProperty(data, request.sessionIdKeyName, this.sessionId);
                }
                if (request.psshKeyName) {
                    setNestedProperty(data, request.psshKeyName, this.pssh);
                }
                if (request.serverCertKeyName) {
                    setNestedProperty(data, request.serverCertKeyName, this.serverCert);
                }
                options.body = JSON.stringify(data);
            }
            const res = await fetch(this.baseUrl + request.url.replaceAll("{device_name}", this.device_name).replace("%s", this.sessionId), options);
            const jsonData = await res.json();
            const messageKey = request.messageKey || this.apiConf.messageKey;
            if (messageKey) {
                this.lastMsg = getNestedProperty(jsonData, messageKey);
            }
            if (request.sessionIdResKeyName) {
                this.sessionId = getNestedProperty(jsonData, request.sessionIdResKeyName);
                if (!this.sessionId) {
                    throw new Error("Server did not return a session ID");
                }
            }
            if (request.challengeKeyName) {
                this.challenge = getNestedProperty(jsonData, request.challengeKeyName);
                if (!this.challenge) {
                    throw new Error("Server did not return a challenge");
                }
                if (request.encodeB64) {
                    this.challenge = btoa(this.challenge);
                }
                if (request.bundleInKeyMessage) {
                    const newXmlDoc = `<PlayReadyKeyMessage type="LicenseAcquisition">
                        <LicenseAcquisition Version="1">
                            <Challenge encoding="base64encoded">${this.challenge}</Challenge>
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

                    this.challenge = uint8ArrayToBase64(newKeyMessage);
                }
            }
        }
        return this.challenge;
    }

    async parseLicense(licenseB64) {
        const apiData = this.apiConf.parseLicense;
        const requests = Array.isArray(apiData) ? apiData : [apiData];
        for (const request of requests) {
            const options = {
                method: request.method || "POST",
                headers: Object.assign(this.baseHeaders, request.headers),
            };
            if (options.method === "POST") {
                let data = {};
                if (request.bodyObj) {
                    data = request.bodyObj;
                }
                if (request.sessionIdKeyName) {
                    setNestedProperty(data, request.sessionIdKeyName, this.sessionId);
                }
                if (request.psshKeyName) {
                    setNestedProperty(data, request.psshKeyName, this.pssh);
                }
                if (request.serverCertKeyName) {
                    setNestedProperty(data, request.serverCertKeyName, this.serverCert);
                }
                if (request.challengeKeyName) {
                    setNestedProperty(data, request.challengeKeyName, this.challenge);
                }
                if (request.licenseKeyName) {
                    setNestedProperty(data, request.licenseKeyName, request.decodeB64 ? atob(licenseB64) : licenseB64);
                }
                options.body = JSON.stringify(data);
            }
            const res = await fetch(this.baseUrl + request.url.replaceAll("{device_name}", this.device_name).replace("%s", this.sessionId), options);
            const jsonData = await res.json();
            const messageKey = request.messageKey || this.apiConf.messageKey;
            if (messageKey) {
                this.lastMsg = getNestedProperty(jsonData, messageKey);
            }
            if (request.sessionIdResKeyName) {
                this.sessionId = getNestedProperty(jsonData, request.sessionIdResKeyName);
                if (!this.sessionId) {
                    throw new Error("Server did not return a session ID");
                }
            }
            if (request.contentKeysKeyName) {
                this.contentKeys = getNestedProperty(jsonData, request.contentKeysKeyName);
            }
        }
        return this.contentKeys;
    }

    parseKeys(keysData) {
        const apiData = this.apiConf.keyParseRules;
        const keys = [];
        if (apiData.regex) {
            const regex = new RegExp(apiData.regex.data, 'g');
            let match = null;
            do {
                let k, kid;
                match = regex.exec(keysData);
                if (match) {
                    if (apiData.regex.keyFirst) {
                        k = match[1];
                        kid = match[2];
                    } else {
                        k = match[2];
                        kid = match[1];
                    }
                    keys.push({ k, kid });
                }
            } while (match);
        } else {
            const mainArray = getNestedProperty(keysData, apiData.mainArrayKeyName || []);
            for (const item of mainArray) {
                const k = getNestedProperty(item, apiData.keyKeyName);
                const kid = getNestedProperty(item, apiData.kidKeyName);
                keys.push({ k, kid });
            }
        }
        if (apiData.base64) {
            for (const key of keys) {
                key.k = uint8ArrayToHex(base64toUint8Array(key.k)),
                key.kid = uint8ArrayToHex(base64toUint8Array(key.kid))
            }
        }
        if (apiData.needsFlipping) {
            for (const key of keys) {
                key.k = uint8ArrayToHex(flipUUIDByteOrder(hexToUint8Array(key.k)));
                key.kid = uint8ArrayToHex(flipUUIDByteOrder(hexToUint8Array(key.kid)));
            }
        }
        return keys;
    }
}

function getNestedProperty(object, nestedKeyName) {
    const keyNames = Array.isArray(nestedKeyName) ? nestedKeyName : nestedKeyName.split('.');

    if (keyNames.length === 0) {
        return object;
    }

    let value = object;
    for (const keyName of keyNames) {
        value = value[keyName];
        if (!value) {
            return null;
        }
    }
    return value;
}

function setNestedProperty(object, nestedKeyName, value) {
    const keyNames = Array.isArray(nestedKeyName) ? nestedKeyName : nestedKeyName.split('.');

    if (keyNames.length === 0) {
        return object;
    }

    let cur = object;
    for (let i = 0; i < keyNames.length - 1; i++) {
        const keyName = keyNames[i];
        if (typeof cur[keyName] !== 'object' || cur[keyName] === null) {
            cur[keyName] = {};
        }
        cur = cur[keyName];
    }
    cur[keyNames[keyNames.length - 1]] = value;
    return object;
}

// Only for Firefox-based browsers cuz this ext is MV3
function registerOverrideHeaders(overridingHeaders, urls) {
    try {
        const onBeforeSendHeaders = chrome.webRequest.onBeforeSendHeaders;

        if (registerOverrideHeaders._listener) {
            onBeforeSendHeaders.removeListener(registerOverrideHeaders._listener);
            delete registerOverrideHeaders._listener;
        }

        function overrideHeadersListener(details) {
            const requestHeaders = details.requestHeaders;
            for (const header in overridingHeaders) {
                const targetHeader = requestHeaders.find(h => h.name.toLowerCase() === header.toLowerCase());
                if (targetHeader) {
                    targetHeader.value = overridingHeaders[header];
                } else {
                    requestHeaders.push({
                        name: header,
                        value: overridingHeaders[header]
                    });
                }
            }
            return { requestHeaders: requestHeaders };
        }

        registerOverrideHeaders._listener = overrideHeadersListener;

        onBeforeSendHeaders.addListener(
            overrideHeadersListener,
            { urls: urls },
            ["blocking", "requestHeaders"]
        );
    } catch {
        // oh noes nerfed webRequest
    }
}

function getDefaultSGConfig(type) {
    if (type === "PLAYREADY") {
        return {
            "headers": {
                "Content-Type": "application/json",
                "X-Secret-Key": "{secret}"
            },
            "generateChallenge": [
                {
                    "method": "GET",
                    "url": "/{device_name}/open",
                    "sessionIdResKeyName": "data.session_id"
                },
                {
                    "method": "POST",
                    "url": "/{device_name}/get_license_challenge",
                    "bodyObj": {
                        "privacy_mode": true
                    },
                    "sessionIdKeyName": "session_id",
                    "psshKeyName": "init_data",
                    "challengeKeyName": "data.challenge",
                    "encodeB64": true,
                    "bundleInKeyMessage": true
                }
            ],
            "parseLicense": [
                {
                    "method": "POST",
                    "url": "/{device_name}/parse_license",
                    "sessionIdKeyName": "session_id",
                    "licenseKeyName": "license_message",
                    "decodeB64": true
                },
                {
                    "method": "POST",
                    "url": "/{device_name}/get_keys",
                    "sessionIdKeyName": "session_id",
                    "contentKeysKeyName": "data.keys"
                },
                {
                    "method": "GET",
                    "url": "/{device_name}/close/%s"
                }
            ],
            "keyParseRules": {
                "keyKeyName": "key",
                "kidKeyName": "key_id"
            },
            "messageKey": "message"
        }
    } else {
        return {
            "headers": {
                "Content-Type": "application/json",
                "X-Secret-Key": "{secret}"
            },
            "generateChallenge": [
                {
                    "method": "GET",
                    "url": "/{device_name}/open",
                    "sessionIdResKeyName": "data.session_id"
                },
                {
                    "method": "POST",
                    "url": "/{device_name}/set_service_certificate",
                    "sessionIdKeyName": "session_id",
                    "serverCertKeyName": "certificate",
                    "serverCertOnly": true
                },
                {
                    "method": "POST",
                    "url": "/{device_name}/get_license_challenge/STREAMING",
                    "bodyObj": {
                        "privacy_mode": true
                    },
                    "sessionIdKeyName": "session_id",
                    "psshKeyName": "init_data",
                    "challengeKeyName": "data.challenge_b64"
                }
            ],
            "parseLicense": [
                {
                    "method": "POST",
                    "url": "/{device_name}/parse_license",
                    "sessionIdKeyName": "session_id",
                    "licenseKeyName": "license_message"
                },
                {
                    "method": "POST",
                    "url": "/{device_name}/get_keys/CONTENT",
                    "sessionIdKeyName": "session_id",
                    "contentKeysKeyName": "data.keys"
                },
                {
                    "method": "GET",
                    "url": "/{device_name}/close/%s"
                }
            ],
            "keyParseRules": {
                "keyKeyName": "key",
                "kidKeyName": "key_id"
            },
            "messageKey": "message"
        }
    }
}
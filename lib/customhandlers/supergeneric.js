import {
    base64toUint8Array,
    uint8ArrayToBase64,
    uint8ArrayToHex,
    hexToUint8Array,
    flipUUIDByteOrder,
    notifyUser,
    RemoteCDMManager
} from "../../util.js";

const { SignedMessage, LicenseRequest, License } = protobuf.roots.default.license_protocol;

export default class SuperGenericApiDevice {
    constructor(host, sessions) {
        this.host = host;
        this.sessions = sessions;
    }

    async generateChallenge(pssh, extra) {
        const { serverCert, sessionId } = extra;

        if (!pssh) {
            console.log("[Vineless]", "NO_PSSH_DATA_IN_CHALLENGE");
            return;
        }

        const selected_remote_cdm_name = await RemoteCDMManager[sessionId ? 'getSelectedPRRemoteCDM' : 'getSelectedRemoteCDM'](this.host);
        if (!selected_remote_cdm_name) {
            return;
        }

        const selected_remote_cdm = JSON.parse(await RemoteCDMManager.loadRemoteCDM(selected_remote_cdm_name));
        if (!selected_remote_cdm.sg_api_conf) {
            console.error("[Vineless] This remote device is not for SuperGeneric!")
            notifyUser("Vineless", "This remote device is not for SuperGeneric!");
            return;
        }
        const remote_cdm = new GenericRemoteCdm(selected_remote_cdm);

        await remote_cdm.open();
        if (serverCert) {
            await remote_cdm.set_service_certificate(serverCert);
        }
        const challenge_b64 = await remote_cdm.get_license_challenge(pssh);

        const signed_challenge_message = SignedMessage.decode(base64toUint8Array(challenge_b64));
        const challenge_message = LicenseRequest.decode(signed_challenge_message.msg);

        return {
            sessionKey: uint8ArrayToBase64(challenge_message.contentId.widevinePsshData.requestId),
            sessionValue: {
                id: remote_cdm.sessionId,
                pssh: pssh,
                remoteCdm: remote_cdm
            },
            challenge: challenge_b64
        };
    }

    async parseLicense(body, extra) {
        const { sessionId } = extra;

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

        const keys_data = await remote_cdm.parse_license_and_get_keys(body);
        await remote_cdm.close();

        if (!keys_data) {
            console.error("[Vineless] No keys received!");
            return;
        }

        const keys = await remote_cdm.parse_keys(keys_data);

        if (keys.length === 0) {
            return;
        }

        const log = {
            type: remote_cdm.type,
            pssh_data: session.pssh,
            keys: keys,
            timestamp: Math.floor(Date.now() / 1000),
        }

        return {
            pssh: session.pssh,
            log: log,
            sessionKey: loaded_request_id
        };
    }
}

class GenericRemoteCdm {
    constructor(jsonData) {
        this.apiConf = jsonData.sg_api_conf;
        this.baseUrl = jsonData.host || "";
        this.baseHeaders = this.apiConf.headers || {};
        this.type = jsonData.type || "WIDEVINE";

        this.overridingHeaders = this.apiConf.overrideHeaders;
        if (this.overridingHeaders) {
            registerOverrideHeaders(this.overridingHeaders.headers, this.overridingHeaders.urls);
        }
    }

    async open() {
        const apiData = this.apiConf.open;
        if (!apiData) {
            return;
        }
        const options = {
            method: apiData.method || "GET",
            headers: Object.assign(this.baseHeaders, apiData.headers),
        };
        let data = {};
        if (apiData.bodyObj) {
            data = apiData.bodyObj;
            options.body = JSON.stringify(data);
        }
        const res = await fetch(this.baseUrl + apiData.url, options);
        switch (apiData.resType) {
            case "json":
                const jsonData = await res.json();
                this.sessionId = getNestedProperty(jsonData, apiData.sessionIdResKeyName);
                break;
            case "text":
                this.sessionId = await res.text();
        }
        return this.sessionId;
    }

    async close() {
        const apiData = this.apiConf.close;
        if (!apiData) {
            return;
        }
        const options = {
            method: apiData.method || "GET",
            headers: Object.assign(this.baseHeaders, apiData.headers),
        };
        let data = {};
        if (apiData.bodyObj) {
            data = apiData.bodyObj;
            if (!apiData.sessionIdKeyName) {
                options.body = JSON.stringify(data);
            }
        }
        if (apiData.sessionIdKeyName) {
            setNestedProperty(data, apiData.sessionIdKeyName, this.sessionId);
            options.body = JSON.stringify(data);
        }
        await fetch(this.baseUrl + apiData.url.replace("%s", this.sessionId), options);
    }

    async set_service_certificate(service_cert) {
        this.serverCert = service_cert;
        const apiData = this.apiConf.setServiceCertificate;
        if (!apiData) {
            return;
        }
        const options = {
            method: apiData.method || "POST",
            headers: Object.assign(this.baseHeaders, apiData.headers),
        };
        let data = {};
        if (apiData.bodyObj) {
            data = apiData.bodyObj;
        }
        if (apiData.sessionIdKeyName) {
            setNestedProperty(data, apiData.sessionIdKeyName, this.sessionId);
        }
        if (apiData.serverCertKeyName) {
            setNestedProperty(data, apiData.serverCertKeyName, this.serverCert);
        }
        options.body = JSON.stringify(data);
        await fetch(this.baseUrl + apiData.url, options);
    }

    async get_license_challenge(pssh) {
        this.pssh = pssh;
        const apiData = this.apiConf.getLicenseChallenge;
        const options = {
            method: apiData.method || "POST",
            headers: Object.assign(this.baseHeaders, apiData.headers),
        };
        let data = {};
        if (apiData.bodyObj) {
            data = apiData.bodyObj;
        }
        if (apiData.sessionIdKeyName) {
            setNestedProperty(data, apiData.sessionIdKeyName, this.sessionId);
        }
        if (apiData.psshKeyName) {
            setNestedProperty(data, apiData.psshKeyName, pssh);
        }
        if (apiData.serverCertKeyName) {
            setNestedProperty(data, apiData.serverCertKeyName, this.serverCert);
        }
        options.body = JSON.stringify(data);
        const res = await fetch(this.baseUrl + apiData.url, options);
        const jsonData = await res.json();
        if (apiData.sessionIdResKeyName) {
            this.sessionId = getNestedProperty(jsonData, apiData.sessionIdResKeyName);
        }
        if (apiData.challengeKeyName) {
            this.challenge = getNestedProperty(jsonData, apiData.challengeKeyName);
        }
        return this.challenge;
    }

    async parse_license_and_get_keys(license_b64) {
        const apiData = this.apiConf.parseLicense;
        const options = {
            method: apiData.method || "POST",
            headers: Object.assign(this.baseHeaders, apiData.headers),
        };
        let data = {};
        if (apiData.bodyObj) {
            data = apiData.bodyObj;
        }
        if (apiData.sessionIdKeyName) {
            setNestedProperty(data, apiData.sessionIdKeyName, this.sessionId);
        }
        if (apiData.psshKeyName) {
            setNestedProperty(data, apiData.psshKeyName, this.pssh);
        }
        if (apiData.serverCertKeyName) {
            setNestedProperty(data, apiData.serverCertKeyName, this.serverCert);
        }
        if (apiData.challengeKeyName) {
            setNestedProperty(data, apiData.challengeKeyName, this.challenge);
        }
        if (apiData.licenseKeyName) {
            setNestedProperty(data, apiData.licenseKeyName, license_b64);
        }
        options.body = JSON.stringify(data);
        const res = await fetch(this.baseUrl + apiData.url, options);
        const jsonData = await res.json();
        if (apiData.contentKeysKeyName) {
            return getNestedProperty(jsonData, apiData.contentKeysKeyName);
        } else {
            const apiData = this.apiConf.getKeys;
            const options = {
                method: apiData.method || "POST",
                headers: Object.assign(this.baseHeaders, apiData.headers),
            };
            let data = {};
            if (apiData.bodyObj) {
                data = apiData.bodyObj;
            }
            if (apiData.sessionIdKeyName) {
                setNestedProperty(data, apiData.sessionIdKeyName, this.sessionId);
            }
            options.body = JSON.stringify(data);
            const res = await fetch(this.baseUrl + apiData.url, options);
            const jsonData = await res.json();
            if (apiData.contentKeysKeyName) {
                return getNestedProperty(jsonData, apiData.contentKeysKeyName);
            }
        }
    }

    parse_keys(keys_data) {
        const apiData = this.apiConf.keyParseRules;
        const keys = [];
        if (apiData.regex) {
            const regex = new RegExp(apiData.regex.data, 'g');
            let match = null;
            do {
                let k, kid;
                match = regex.exec(keys_data);
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
            const mainArray = getNestedProperty(keys_data, apiData.mainArrayKeyName || []);
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
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

        const selectedRemoteCdmName = await RemoteCDMManager[sessionId ? 'getSelectedPRRemoteCDM' : 'getSelectedRemoteCDM'](this.host);
        if (!selectedRemoteCdmName) {
            return;
        }

        const selectedRemoteCdm = JSON.parse(await RemoteCDMManager.loadRemoteCDM(selectedRemoteCdmName));
        if (!selectedRemoteCdm.sg_api_conf) {
            console.error("[Vineless] This remote device is not for SuperGeneric!")
            notifyUser("Vineless", "This remote device is not for SuperGeneric!");
            return;
        }
        const remoteCdm = new GenericRemoteCdm(selectedRemoteCdm);

        try {
            const challengeB64 = await remoteCdm.generateChallenge(pssh, serverCert);

            const signedChallengeMessage = SignedMessage.decode(base64toUint8Array(challengeB64));
            const challengeMessage = LicenseRequest.decode(signedChallengeMessage.msg);

            return {
                sessionKey: uint8ArrayToBase64(challengeMessage.contentId.widevinePsshData.requestId),
                sessionValue: {
                    id: remoteCdm.sessionId,
                    pssh: pssh,
                    remoteCdm: remoteCdm
                },
                challenge: challengeB64
            };
        } catch (error) {
            console.error("[Vineless]", "ERROR_PARSING_LICENSE", error);
            const isSW = typeof window === "undefined";
            notifyUser(
                "SuperGeneric challenge generation failed!",
                error.message +
                "\nRefer to the extension " +
                (isSW ? "service worker" : "background script") +
                " DevTools console for more details."
            );
        }
    }

    async parseLicense(body, extra) {
        const { sessionId } = extra;

        const license = base64toUint8Array(body);
        const signedLicenseMessage = SignedMessage.decode(license);

        if (signedLicenseMessage.type !== SignedMessage.MessageType.LICENSE) {
            console.log("[Vineless]", "INVALID_MESSAGE_TYPE", signedLicenseMessage.type.toString());
            return;
        }

        const licenseObj = License.decode(signedLicenseMessage.msg);
        const loadedRequestId = uint8ArrayToBase64(licenseObj.id.requestId);

        if (!this.sessions.has(loadedRequestId)) {
            return;
        }

        const session = this.sessions.get(loadedRequestId);
        const remoteCdm = session.remoteCdm;

        try {
            const keysData = await remoteCdm.parseLicense(body);

            if (!keysData) {
                console.error("[Vineless] No keys received!");
                notifyUser("SuperGeneric license parsing failed!", "No keys were received from the remote CDM!");
                return;
            }

            const keys = await remoteCdm.parseKeys(keysData);

            if (keys.length === 0) {
                return;
            }

            const log = {
                type: "WIDEVINE",
                pssh_data: session.pssh,
                keys: keys,
                timestamp: Math.floor(Date.now() / 1000),
            }

            return {
                pssh: session.pssh,
                log: log,
                sessionKey: loadedRequestId
            };
        } catch (error) {
            console.error("[Vineless]", "ERROR_PARSING_LICENSE", error);
            const isSW = typeof window === "undefined";
            notifyUser(
                "SuperGeneric license parsing failed!",
                error.message +
                "\nRefer to the extension " +
                (isSW ? "service worker" : "background script") +
                " DevTools console for more details."
            );
        }
    }
}

class GenericRemoteCdm {
    constructor(jsonData) {
        this.apiConf = jsonData.sg_api_conf;
        this.baseUrl = jsonData.host || "";
        this.baseHeaders = this.apiConf.headers || {};

        this.overridingHeaders = this.apiConf.overrideHeaders;
        if (this.overridingHeaders) {
            registerOverrideHeaders(this.overridingHeaders.headers, this.overridingHeaders.urls);
        }
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
            const res = await fetch(this.baseUrl + request.url.replace("%s", this.sessionId), options);
            const jsonData = await res.json();
            if (request.sessionIdResKeyName) {
                this.sessionId = getNestedProperty(jsonData, request.sessionIdResKeyName);
            }
            if (request.challengeKeyName) {
                this.challenge = getNestedProperty(jsonData, request.challengeKeyName);
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
                    setNestedProperty(data, request.licenseKeyName, licenseB64);
                }
                options.body = JSON.stringify(data);
            }
            const res = await fetch(this.baseUrl + request.url.replace("%s", this.sessionId), options);
            const jsonData = await res.json();
            if (request.sessionIdResKeyName) {
                this.sessionId = getNestedProperty(jsonData, request.sessionIdResKeyName);
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
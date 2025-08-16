import {
    base64toUint8Array,
    uint8ArrayToHex
} from "../../util";

export default class SuperGenericApiDevice {
    constructor(host, sessions) {
        this.host = host;
        this.sessions = sessions;
    }

    async generateChallenge(pssh, extra) {
        const pssh_data = getWvPsshFromConcatPssh(pssh);

        if (!pssh_data) {
            console.log("[Vineless]", "NO_PSSH_DATA_IN_CHALLENGE");
            return;
        }

        const selected_remote_cdm_name = await RemoteCDMManager.getSelectedRemoteCDM(this.host);
        if (!selected_remote_cdm_name) {
            return;
        }

        const selected_remote_cdm = JSON.parse(await RemoteCDMManager.loadRemoteCDM(selected_remote_cdm_name));

        


    }

    async parseLicense(body, extra) {

    }
}

class GenericRemoteCdm {
    constructor(apiConf) {
        this.apiConf = apiConf;
    }

    async open() {
        const apiData = this.apiConf.open;
        if (!apiData) {
            return;
        }
        const res = await fetch(apiData.url, {
            method: apiData.method || "GET",
            headers: apiData.headers,
        });
        switch (apiData.resType) {
            case "json":
                const jsonData = await res.json();
                this.sessionId = getNestedProperty(jsonData, apiData.sessionIdKeyName);
                break;
            case "text":
                this.sessionId = await res.text();
        }
        return this.sessionId;
    }

    async close(session_id) {
        const apiData = this.apiConf.close;
        if (!apiData) {
            return;
        }
        const options = {
            method: apiData.method || "GET",
            headers: apiData.headers,
        };
        let data = {};
        if (apiData.bodyObj) {
            data = apiData.bodyObj;
            if (!apiData.sessionIdKeyName) {
                options.body = JSON.stringify(data);
            }
        }
        if (apiData.sessionIdKeyName) {
            setNestedProperty(data, apiData.sessionIdKeyName, session_id);
            options.body = JSON.stringify(data);
        }
        await fetch(apiData.url.replace("%s", session_id), options);
    }

    async set_service_certificate(service_cert) {
        this.serverCert = service_cert;
        const apiData = this.apiConf.setServiceCertificate;
        if (!apiData) {
            return;
        }
        const options = {
            method: apiData.method || "POST",
            headers: apiData.headers,
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
        await fetch(apiData.url, options);
    }

    async get_license_challenge(pssh) {
        this.pssh = pssh;
        const apiData = this.apiConf.getLicenseChallenge;
        const options = {
            method: apiData.method || "POST",
            headers: apiData.headers,
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
        const res = await fetch(apiData.url, options);
        const jsonData = await res.json();
        if (apiData.sessionIdResKeyName) {
            this.sessionId = getNestedProperty(jsonData, apiData.sessionIdResKeyName);
        }
        if (apiData.challengeKeyName) {
            this.challenge = getNestedProperty(jsonData, apiData.challenge);
        }
        return this.challenge;
    }

    async parse_license_and_get_keys(license_b64) {
        const apiData = this.apiConf.parseLicense;
        const options = {
            method: apiData.method || "POST",
            headers: apiData.headers,
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
        if (apiData.challengeKeyName) {
            setNestedProperty(data, apiData.challenge, this.challenge);
        }
        if (apiData.licenseKeyName) {
            setNestedProperty(data, apiData.licenseKeyNamem, this.licenseKeyName);
        }
        options.body = JSON.stringify(data);
        const res = await fetch(apiData.url, options);
        const jsonData = await res.json();
        if (apiData.contentKeysKeyName) {
            return getNestedProperty(jsonData, apiData.contentKeysKeyName);
        } else {
            const apiData = this.apiConf.getKeys;
            const options = {
                method: apiData.method || "POST",
                headers: apiData.headers,
            };
            let data = {};
            if (apiData.bodyObj) {
                data = apiData.bodyObj;
            }
            if (apiData.sessionIdKeyName) {
                setNestedProperty(data, apiData.sessionIdKeyName, this.sessionId);
            }
            options.body = JSON.stringify(data);
            const res = await fetch(apiData.url, options);
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
            const regex = new RegExp(apiData.regex.data, 'ㅎ');
            let match = null;
            do {
                let k, kid;
                regex.exec(keys_data);
                if (apiData.regex.keyFirst) {
                    k = match[1];
                    kid = match[2];
                } else {
                    k = match[2];
                    kid = match[1];
                }
                if (apiData.regex.base64) {
                    keys.push({
                        k: uint8ArrayToHex(base64toUint8Array(k)),
                        kid: uint8ArrayToHex(base64toUint8Array(kid))
                    })
                } else {
                    keys.push({ k, kid });
                }
            } while (match);
        } else {
            const mainArray = getNestedProperty(keys_data, apiData.mainArrayKeyName);
            for (const item of mainArray) {
                const k = getNestedProperty(item, apiData.keyKeyName);
                const kid = getNestedProperty(item, apiData.kidKeyName);
                keys.push({ k, kid });
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

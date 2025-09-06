import {
    base64toUint8Array,
    uint8ArrayToHex,
    AsyncLocalStorage,
    AsyncSessionStorage
} from "../../util.js";

export default class KnownKeysDevice {
    constructor(host, keySystem, sessionId, tab) {
        this.incognito = tab.incognito;
        this.storage = this.incognito ? AsyncSessionStorage : AsyncLocalStorage;
    }

    async generateChallenge(pssh) {
        this.pssh = pssh;
        this.kids = getKeyIdFromPSSH(pssh);
        return "CAQ=";
    }

    async parseLicense(license) {
        const logs = Object.values(await this.storage.getStorage());
        const psshMatch = logs.find(log => log.pssh === this.pssh);
        let keysObj = [];
        if (psshMatch) {
            keysObj = psshMatch.keys;
        } else {
            keysObj = this.kids.map(kid => ({ kid }));
            for (const keyObj of keysObj) {
                const kidMatch = logs.find(log => log.keys.some(key => key.kid.toLowerCase() === keyObj.kid.toLowerCase()));
                if (kidMatch) {
                    const key = kidMatch.keys.find(key => key.kid.toLowerCase() === keyObj.kid.toLowerCase());
                    keyObj.k = key.k;
                }
            }
        }
        console.log("Known keys found", keysObj);
        if (keysObj.length === 0 || keysObj.some(k => !k.k)) {
            //throw new Error("Not all keys found in known keys");
            keysObj = logs[0].keys; // test
        }
        return {
            type: "WIDEVINE",
            pssh: this.pssh,
            keys: keysObj
        };
    }
}

function getKeyIdFromPSSH(pssh) {
    const psshBytes = base64toUint8Array(pssh);
    const kids = [];
    let offset = 0x20;
    while (offset < psshBytes.length) {
        if (psshBytes[offset] === 0x12 && psshBytes[offset + 1] === 0x10) {
            offset += 2;
            const kid = psshBytes.subarray(offset, offset + 16);
            kids.push(uint8ArrayToHex(kid));
            offset += 16;
        } else {
            break;
        }
    }
    return kids;
}
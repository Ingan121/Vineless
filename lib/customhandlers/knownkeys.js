import {
    base64toUint8Array,
    uint8ArrayToHex,
    AsyncLocalStorage,
    AsyncSessionStorage
} from "../../util.js";

export default class KnownKeysDevice {
    constructor(host, keySystem, sessionId, tab) {
        this.tab = tab;
        this.storage = this.tab.incognito ? AsyncSessionStorage : AsyncLocalStorage;
    }

    async generateChallenge(pssh) {
        this.pssh = pssh;
        this.kids = getKeyIdFromPSSH(pssh);

        // Send a "service certificate challenge" message to (by)pass the license server's device check
        // Upon receiving an 'update' call with a service certificate, just load the keys at this point
        // instead of sending an actual license request (the received service certificate is ignored)
        return "CAQ=";
    }

    async parseLicense(license) { // license: ignored, most likely service certificate data
        const logs = Object.values(await this.storage.getStorage());
        let keys = this.kids.map(kid => ({ kid }));
        for (const keyObj of keys) {
            const kidMatch = logs.find(log => log.keys.some(key => key.kid.toLowerCase() === keyObj.kid.toLowerCase()));
            if (kidMatch) {
                const key = kidMatch.keys.find(key => key.kid.toLowerCase() === keyObj.kid.toLowerCase());
                keyObj.k = key.k;
            }
        }
        if (keys.length === 0 || keys.some(k => !k.k) || !this.kids.every(kid => keys.some(k => k.kid.toLowerCase() === kid.toLowerCase()))) {
            const psshMatch = logs.find(log => log.pssh === this.pssh);
            const urlMatch = logs.find(log => log.url === this.tab.url);
            const res = await chrome.scripting.executeScript({
                target: { tabId: this.tab.id },
                func: askForKeys,
                args: [this.pssh, this.kids, psshMatch?.keys || urlMatch?.keys || []]
            });
            keys = res[0].result;
        }
        if (keys.length === 0 || keys.some(k => !k.k) || !this.kids.every(kid => keys.some(k => k.kid.toLowerCase() === kid.toLowerCase()))) {
            throw new Error("Not all required keys were provided");
        }
        return {
            type: "WIDEVINE",
            pssh: this.pssh,
            keys: keys
        };
    }
}

// Only works with Widevine PSSH boxes that contain KIDs
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

function askForKeys(pssh, kids, candidate) {
    let msg = `Provide keys in the kid:key format (hex), separated by spaces.\nPSSH: ${pssh}`
    if (kids.length > 0) {
        msg += `KIDs: ${kids.join(", ")}`;
    }
    if (candidate.length > 0) {
        msg += "\nLeave blank and press OK to use the following keys from a log entry with matched PSSH or URL:";
        msg += "\n" + candidate.map(key => `${key.kid}:${key.k}`).join(" ");
    }
    const res = window.prompt(msg, "");
    if (res === null) return [];
    if (res.trim() === "") {
        if (candidate.length > 0) {
            return candidate;
        }
        return [];
    }
    const regex = /([0-9a-fA-F]+):([0-9a-fA-F]+)/g;
    const keys = [];
    let match;
    do {
        match = regex.exec(res);
        if (match) {
            const [_, kid, k] = match;
            keys.push({ kid, k });
        }
    } while (match);
    return keys;
}
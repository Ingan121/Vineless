import "./lib/forge.min.js";
import "./lib/widevine/protobuf.min.js";
import "./lib/widevine/license_protocol.js";

import {
    base64toUint8Array,
    uint8ArrayToHex,
    setIcon,
    setBadgeText,
    openPopup,
    notifyUser,
    getWvPsshFromConcatPssh,
    SettingsManager,
    ScriptManager,
    AsyncLocalStorage,
} from "./util.js";

import {
    WidevineLocal,
    WidevineRemote
} from "./lib/widevine/main.js";
import {
    PlayReadyLocal,
    PlayReadyRemote
} from "./lib/playready/main.js";
import { CustomHandlers } from "./lib/customhandlers/main.js";

let manifests = new Map();
let requests = new Map();
let sessions = new Map();
let sessionCnt = {};
let logs = [];

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        if (details.method === "GET") {
            if (!requests.has(details.url)) {
                const headers = details.requestHeaders
                    .filter(item => !(
                        item.name.startsWith('sec-ch-ua') ||
                        item.name.startsWith('Sec-Fetch') ||
                        item.name.startsWith('Accept-') ||
                        item.name.startsWith('Host') ||
                        item.name === "Connection"
                    )).reduce((acc, item) => {
                        acc[item.name] = item.value;
                        return acc;
                    }, {});
                console.debug(headers);
                requests.set(details.url, headers);
            }
        }
    },
    {urls: ["<all_urls>"]},
    ['requestHeaders', chrome.webRequest.OnSendHeadersOptions.EXTRA_HEADERS].filter(Boolean)
);

async function parseClearKey(body) {
    const clearkey = JSON.parse(atob(body));

    const formatted_keys = clearkey["keys"].map(key => ({
        ...key,
        kid: uint8ArrayToHex(base64toUint8Array(key.kid.replace(/-/g, "+").replace(/_/g, "/") + "==")),
        k: uint8ArrayToHex(base64toUint8Array(key.k.replace(/-/g, "+").replace(/_/g, "/") + "=="))
    }));
    const pssh_data = btoa(JSON.stringify({kids: clearkey["keys"].map(key => key.k)}));

    const log = {
        type: "CLEARKEY",
        pssh_data: pssh_data,
        keys: formatted_keys,
        timestamp: Math.floor(Date.now() / 1000)
    }

    return {
        pssh: pssh_data,
        log: log,
        sessionKey: null
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    (async () => {
        const tab_url = sender.tab ? sender.tab.url : null;
        const host = tab_url ? new URL(tab_url).host : null;
        console.log(message.type, message.body);

        const profileConfig = await SettingsManager.getProfile(host);

        switch (message.type) {
            case "REQUEST":
                if (!profileConfig.enabled) {
                    sendResponse();
                    manifests.clear();
                    return;
                }

                if (!sessionCnt[sender.tab.id]) {
                    sessionCnt[sender.tab.id] = 1;
                    setIcon("images/icon-active.png", sender.tab.id);
                } else {
                    sessionCnt[sender.tab.id]++;
                }

                if (!message.body) {
                    setBadgeText("CK", sender.tab.id);
                    sendResponse();
                    return;
                } else {
                    const split = message.body.split(":");
                    let device = null;
                    let pssh = null;
                    const extra = {};
                    if (message.body.startsWith("lookup:")) {
                        const [ _, sessionId, kidHex, serverCert ] = split;
                        // Find first log that contains the requested KID
                        const log = logs.find(log =>
                            log.keys.some(k => k.kid.toLowerCase() === kidHex.toLowerCase())
                        );
                        if (!log) {
                            console.warn("[Vineless] Lookup failed: no log found for KID", kidHex);
                            sendResponse();
                            return;
                        }
                        pssh = log.pssh_data;
                        switch (log.type) {
                            case "CLEARKEY": // UNTESTED
                                const json = JSON.stringify({
                                    kids: log.keys.map(key => key.kid),
                                    type: "temporary"
                                });
                                setBadgeText("CK", sender.tab.id);
                                sendResponse(btoa(json));
                                break;
                            case "WIDEVINE":
                            {
                                setBadgeText("WV", sender.tab.id);
                                pssh = getWvPsshFromConcatPssh(pssh);
                                const device_type = profileConfig.widevine.type;
                                switch (device_type) {
                                    case "local":
                                        device = new WidevineLocal(host, sessions);
                                        extra.serverCert = serverCert;
                                        break;
                                    case "remote":
                                        device = new WidevineRemote(host, sessions);
                                        break;
                                    case "custom":
                                        device = new CustomHandlers[profileConfig.widevine.device.custom].handler(host, sessions);
                                        break;
                                }
                                break;
                            }
                            case "PLAYREADY": // UNTESTED
                            {
                                setBadgeText("PR", sender.tab.id);
                                const device_type = profileConfig.playready.type;
                                switch (device_type) {
                                    case "local":
                                        device = new PlayReadyLocal(host, sessions);
                                        break;
                                    case "remote":
                                        device = new PlayReadyRemote(host, sessions);
                                        break;
                                    case "custom":
                                        device = new CustomHandlers[profileConfig.playready.device.custom].handler(host, sessions);
                                        break;
                                }
                                extra.sessionId = sessionId;
                                break;
                            }
                        }
                    } else if (message.body.startsWith("pr:")) {
                        if (!profileConfig.playready.enabled) {
                            sendResponse();
                            manifests.clear();
                            return;
                        }
                        setBadgeText("PR", sender.tab.id);
                        [ extra.sessionId, pssh ] = split.slice(1);
                        const device_type = profileConfig.playready.type;
                        switch (device_type) {
                            case "local":
                                device = new PlayReadyLocal(host, sessions);
                                break;
                            case "remote":
                                device = new PlayReadyRemote(host, sessions);
                                break;
                            case "custom":
                                device = new CustomHandlers[profileConfig.playready.device.custom].handler(host, sessions);
                                break;
                        }
                    } else {
                        if (!profileConfig.widevine.enabled) {
                            sendResponse();
                            manifests.clear();
                            return;
                        }
                        setBadgeText("WV", sender.tab.id);
                        [ pssh, extra.serverCert ] = split;
                        pssh = getWvPsshFromConcatPssh(pssh);
                        const device_type = profileConfig.widevine.type;
                        switch (device_type) {
                            case "local":
                                device = new WidevineLocal(host, sessions);
                                break;
                            case "remote":
                                device = new WidevineRemote(host, sessions);
                                break;
                            case "custom":
                                device = new CustomHandlers[profileConfig.widevine.device.custom].handler(host, sessions);
                                break;
                        }
                    }

                    if (device) {
                        const res = await device.generateChallenge(pssh, extra);
                        if (res?.sessionKey) {
                            sessions.set(res.sessionKey, res.sessionValue);
                        }
                        if (res?.challenge) {
                            console.log("[Vineless] Generated license challenge:", res.challenge);
                            sendResponse(res.challenge);
                        } else {
                            sendResponse();
                        }
                    } else {
                        sendResponse();
                    }
                }
                break;

            case "RESPONSE":
                if (!profileConfig.enabled) {
                    sendResponse();
                    manifests.clear();
                    return;
                }

                let res = null;
                try {
                    res = await parseClearKey(message.body);
                } catch (e) {
                    let device = null;
                    let license = null;
                    const extra = {};
                    if (message.body.startsWith("pr:")) {
                        if (!profileConfig.playready.enabled) {
                            sendResponse();
                            manifests.clear();
                            return;
                        }
                        const split = message.body.split(':');
                        const device_type = profileConfig.playready.type;
                        switch (device_type) {
                            case "local":
                                device = new PlayReadyLocal(host, sessions);
                                break;
                            case "remote":
                                device = new PlayReadyRemote(host, sessions);
                                break;
                            case "custom":
                                device = new CustomHandlers[profileConfig.playready.device.custom].handler(host, sessions);
                                break;
                        }
                        license = atob(split[2]);
                        extra.sessionId = split[1];
                    } else {
                        if (!profileConfig.widevine.enabled) {
                            sendResponse();
                            manifests.clear();
                            return;
                        }
                        const device_type = profileConfig.widevine.type;
                        license = message.body;
                        switch (device_type) {
                            case "local":
                                device = new WidevineLocal(host, sessions);
                                break;
                            case "remote":
                                device = new WidevineRemote(host, sessions);
                                break;
                            case "custom":
                                device = new CustomHandlers[profileConfig.widevine.device.custom].handler(host, sessions);
                                break;
                        }
                    }

                    if (device) {
                        res = await device.parseLicense(license, extra);
                    }
                }

                if (res) {
                    if (res.sessionKey) {
                        sessions.delete(res.sessionKey);
                    }

                    if (res.log) {
                        console.log("[Vineless]", "KEYS", JSON.stringify(res.log.keys), tab_url);

                        res.log.url = tab_url;
                        res.log.manifests = manifests.has(tab_url) ? manifests.get(tab_url) : [];

                        logs.push(res.log);
                        await AsyncLocalStorage.setStorage({[res.pssh]: res.log});

                        sendResponse(JSON.stringify({
                            pssh: res.pssh,
                            keys: res.log.keys
                        }));
                    } else {
                        sendResponse();
                    }
                }
                break;
            case "CLOSE":
                if (sessionCnt[sender.tab.id]) {
                    if (--sessionCnt[sender.tab.id] === 0) {
                        setIcon("images/icon.png", sender.tab.id);
                        setBadgeText(null, sender.tab.id);
                    }
                }
                sendResponse();
                break;
            case "GET_ACTIVE":
                if (message.from === "content") return;
                sendResponse(sessionCnt[message.body]);
                break;
            case "GET_PROFILE":
                let wvEnabled = profileConfig.widevine.enabled;
                if (wvEnabled) {
                    switch (profileConfig.widevine.type) {
                        case "local":
                            if (!profileConfig.widevine.device.local) {
                                wvEnabled = false;
                            }
                            break;
                        case "remote":
                            if (!profileConfig.widevine.device.remote) {
                                wvEnabled = false;
                            }
                            break;
                    }
                }
                let prEnabled = profileConfig.playready.enabled;
                if (prEnabled) {
                    switch (profileConfig.playready.type) {
                        case "local":
                            if (!profileConfig.playready.device.local) {
                                prEnabled = false;
                            }
                            break;
                        case "remote":
                            if (!profileConfig.playready.device.remote) {
                                prEnabled = false;
                            }
                            break;
                    }
                }
                sendResponse(JSON.stringify({
                    enabled: profileConfig.enabled,
                    widevine: {
                        enabled: wvEnabled
                    },
                    playready: {
                        enabled: prEnabled
                    },
                    clearkey: {
                        enabled: profileConfig.clearkey.enabled
                    },
                    blockDisabled: profileConfig.blockDisabled
                }));
                break;
            case "OPEN_PICKER_WVD":
                if (message.from === "content") return;
                openPopup('picker/filePicker.html?type=wvd', 300, 200);
                break;
            case "OPEN_PICKER_REMOTE":
                if (message.from === "content") return;
                openPopup('picker/filePicker.html?type=remote', 300, 200);
                break;
            case "OPEN_PICKER_PRD":
                if (message.from === "content") return;
                openPopup('picker/filePicker.html?type=prd', 300, 200);
                break;
            case "CLEAR":
                if (message.from === "content") return;
                logs = [];
                manifests.clear()
                break;
            case "MANIFEST":
                const parsed = JSON.parse(message.body);
                const element = {
                    type: parsed.type,
                    url: parsed.url,
                    headers: requests.has(parsed.url) ? requests.get(parsed.url) : [],
                };

                if (!manifests.has(tab_url)) {
                    manifests.set(tab_url, [element]);
                } else {
                    let elements = manifests.get(tab_url);
                    if (!elements.some(e => e.url === parsed.url)) {
                        elements.push(element);
                        manifests.set(tab_url, elements);
                    }
                }
                sendResponse();
        }
    })();
    return true;
});

chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId === 0) { // main frame only
        delete sessionCnt[details.tabId];
    }
});

chrome.tabs.onRemoved.addListener((tabId) => {
    delete sessionCnt[tabId];
});

SettingsManager.getGlobalEnabled().then(enabled => {
    if (!enabled) {
        setIcon("images/icon-disabled.png");
        ScriptManager.unregisterContentScript();
    } else {
        ScriptManager.registerContentScript();
    }
});

const isSW = typeof window === "undefined";
self.addEventListener('error', (event) => {
    notifyUser(
        "An unknown error occurred!",
        (event.message || event.error) +
        "\nRefer to the extension " +
        (isSW ? "service worker" : "background script") +
        " DevTools console for more details."
    )
});
self.addEventListener('unhandledrejection', (event) => {
    notifyUser(
        "An unknown error occurred!",
        (event.reason) +
        "\nRefer to the extension " +
        (isSW ? "service worker" : "background script") +
        " DevTools console for more details."
    )
});
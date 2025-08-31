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
    AsyncSessionStorage,
} from "./util.js";

import { WidevineLocal } from "./lib/widevine/main.js";
import { PlayReadyLocal } from "./lib/playready/main.js";
import { GenericRemoteDevice } from "./lib/remote_cdm.js";
import { CustomHandlers } from "./lib/customhandlers/main.js";

let manifests = new Map();
let requests = new Map();
let sessions = new Map();
let sessionCnt = {};

const isSW = typeof window === "undefined";

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
    const pssh = btoa(JSON.stringify({kids: clearkey["keys"].map(key => key.k)}));

    return {
        type: "CLEARKEY",
        pssh: pssh,
        keys: formatted_keys
    };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    (async () => {
        const tab_url = sender.tab ? sender.tab.url : null;
        const host = tab_url ? new URL(tab_url).host : null;
        const origin = sender.origin?.startsWith("https://") ? sender.origin : null;
        console.log(message.type, message.body);

        const profileConfig = await SettingsManager.getProfile(host);

        switch (message.type) {
            case "REQUEST":
            {
                if (!sessionCnt[sender.tab.id]) {
                    sessionCnt[sender.tab.id] = 1;
                    setIcon("images/icon-active.png", sender.tab.id);
                } else {
                    sessionCnt[sender.tab.id]++;
                }

                if (!message.body) {
                    setBadgeText("CK", sender.tab.id);
                    sendResponse();
                } else {
                    const parsed = JSON.parse(message.body);
                    const { keySystem, sessionId, initDataType, initData, serverCert } = parsed;
                    let device = null;
                    let pssh = initData;
                    const extra = {};
                    if (initDataType === "webm" && keySystem.startsWith("com.widevine.alpha") && origin !== null && !sender.tab?.incognito) {
                        const kidHex = uint8ArrayToHex(base64toUint8Array(initData));
                        // Find first log that contains the requested KID
                        const logs = Object.values(await AsyncLocalStorage.getStorage());
                        const log = logs.find(log =>
                            log.origin === origin && log.type === "WIDEVINE" && log.keys.some(k => k.kid.toLowerCase() === kidHex.toLowerCase())
                        );
                        if (log) {
                            pssh = log.pssh;
                        }
                    }
                    if (keySystem.startsWith("com.microsoft.playready")) {
                        setBadgeText("PR", sender.tab.id);
                        const device_type = profileConfig.playready.type;
                        switch (device_type) {
                            case "local":
                                device = PlayReadyLocal;
                                break;
                            case "remote":
                                device = GenericRemoteDevice;
                                break;
                            case "custom":
                                device = CustomHandlers[profileConfig.playready.device.custom].handler;
                                break;
                        }
                    } else {
                        setBadgeText("WV", sender.tab.id);
                        extra.serverCert = serverCert;
                        pssh = getWvPsshFromConcatPssh(pssh);
                        const device_type = profileConfig.widevine.type;
                        switch (device_type) {
                            case "local":
                                device = WidevineLocal;
                                break;
                            case "remote":
                                device = GenericRemoteDevice;
                                break;
                            case "custom":
                                device = CustomHandlers[profileConfig.widevine.device.custom].handler;
                                break;
                        }
                    }

                    if (device) {
                        try {
                            const instance = new device(host, keySystem, sessionId, sender.tab);
                            const res = await instance.generateChallenge(pssh, extra);
                            sessions.set(sessionId, instance);
                            console.log("[Vineless] Generated license challenge:", res, "sessionId:", sessionId);
                            if (!res || res === "null" || res === "bnVsbA==") {
                                notifyUser(
                                    "Challenge generation failed!",
                                    "Please refer to the extension " +
                                    (isSW ? "service worker" : "background page") +
                                    " DevTools console/network tab for more details."
                                );
                                sendResponse();
                                return;
                            }
                            sendResponse(res);
                        } catch (error) {
                            console.error("[Vineless] Challenge generation error:", error);
                            notifyUser(
                                "Challenge generation failed!",
                                error.message +
                                "\nSee extension DevTools for details.", // Reserve space for long error messages
                                true
                            );
                            sendResponse();
                        }
                    } else {
                        notifyUser("Challenge generation failed!", "No device handler was selected");
                        sendResponse();
                    }
                }
                break;
            }

            case "RESPONSE":
            {
                const parsed = JSON.parse(message.body);
                const { keySystem, sessionId, license, persistent } = parsed;
                let res = null;
                if (keySystem === "org.w3.clearkey") {
                    res = await parseClearKey(license);
                } else {
                    if (sessionId) {
                        const device = sessions.get(sessionId);
                        if (device) {
                            try {
                                res = await device.parseLicense(license);
                                sessions.delete(sessionId);
                            } catch (error) {
                                console.error("[Vineless] License parsing error:", error);
                                notifyUser(
                                    "License parsing failed!",
                                    error.message +
                                    "\nSee extension DevTools for details.", // Reserve space for long error messages
                                    true
                                );
                            }
                        } else {
                            console.error("[Vineless] No device found for session:", sessionId);
                            notifyUser("License parsing failed!", "No saved device handler found for session " + sessionId, true);
                        }
                    }
                }

                if (res) {
                    console.log("[Vineless]", "KEYS", JSON.stringify(res.keys), tab_url);

                    const storage = sender.tab?.incognito ? AsyncSessionStorage : AsyncLocalStorage;
                    const key = res.pssh + origin;
                    const existing = (await storage.getStorage(key))?.[key];
                    if (existing) {
                        if (persistent && profileConfig.allowPersistence && origin !== null) {
                            if (existing.sessions) {
                                existing.sessions.push(sessionId);
                            } else {
                                existing.sessions = [sessionId];
                            }
                        }
                        existing.url = tab_url;
                        existing.keys = res.keys;
                        existing.manifests = manifests.has(tab_url) ? manifests.get(tab_url) : [];
                        existing.title = sender.tab?.title;
                        existing.timestamp = Math.floor(Date.now() / 1000);
                        await storage.setStorage({ [key]: existing });
                    } else {
                        res.url = tab_url;
                        res.origin = origin;
                        res.manifests = manifests.has(tab_url) ? manifests.get(tab_url) : [];
                        res.title = sender.tab?.title;
                        res.timestamp = Math.floor(Date.now() / 1000);

                        if (persistent && profileConfig.allowPersistence && origin !== null) {
                            res.sessions = [sessionId];
                        }

                        await storage.setStorage({ [key]: res });
                    }

                    sendResponse(JSON.stringify({
                        pssh: res.pssh,
                        keys: res.keys
                    }));
                } else {
                    // Most likely exception thrown in device.parseLicense, which is already notified above
                    sendResponse();
                }
                break;
            }
            case "LOAD":
            {
                if (origin === null) {
                    sendResponse();
                    notifyUser("Vineless", "Persistent license usage has been blocked on a page with opaque origin.");
                    return;
                }
                if (sender.tab?.incognito) {
                    notifyUser("Vineless", "Persistent license usage has been blocked in incognito mode.");
                    return;
                }

                if (!sessionCnt[sender.tab.id]) {
                    sessionCnt[sender.tab.id] = 1;
                    setIcon("images/icon-active.png", sender.tab.id);
                } else {
                    sessionCnt[sender.tab.id]++;
                }

                const parsed = JSON.parse(message.body);
                const { keySystem, sessionId } = parsed;
                if (keySystem === "org.w3.clearkey") {
                    setBadgeText("CK", sender.tab.id);
                } else if (keySystem.startsWith("com.microsoft.playready")) {
                    setBadgeText("PR", sender.tab.id);
                } else if (keySystem.startsWith("com.widevine.alpha")) {
                    setBadgeText("WV", sender.tab.id);
                }

                const logs = Object.values(await AsyncLocalStorage.getStorage());
                const log = logs.find(log => log.origin === origin && log.sessions?.includes(sessionId));
                if (log) {
                    sendResponse(JSON.stringify({
                        pssh: log.pssh,
                        keys: log.keys
                    }));
                } else {
                    sendResponse();
                    notifyUser("Persistent session not found", "Web page tried to load a persistent session that does not exist.");
                }
                break;
            }
            case "REMOVE":
            {
                if (origin === null) {
                    sendResponse();
                    notifyUser("Vineless", "Persistent license usage has been blocked on a page with opaque origin.");
                    return;
                }
                if (sender.tab?.incognito) {
                    notifyUser("Vineless", "Persistent license usage has been blocked in incognito mode.");
                    return;
                }

                const sessionId = message.body;
                const logs = Object.values(await AsyncLocalStorage.getStorage());
                const log = logs.find(log => log.origin === origin && log.sessions?.includes(sessionId));
                if (log) {
                    const idx = log.sessions.indexOf(sessionId);
                    log.sessions.splice(idx, 1);
                    await AsyncLocalStorage.setStorage({ [log.pssh + origin]: log });
                }
                sendResponse();
                break;
            }
            case "CLOSE":
                if (sender?.tab?.id) {
                    if (sessionCnt[sender.tab.id]) {
                        if (--sessionCnt[sender.tab.id] === 0) {
                            setIcon("images/icon.png", sender.tab.id);
                            setBadgeText(null, sender.tab.id);
                        }
                    }
                }
                sendResponse();
                break;
            case "GET_ACTIVE":
                if (message.from === "content" || sender.tab) return;
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
                        enabled: wvEnabled,
                        serverCert: profileConfig.widevine.serverCert
                    },
                    playready: {
                        enabled: prEnabled
                    },
                    clearkey: {
                        enabled: profileConfig.clearkey.enabled
                    },
                    blockDisabled: profileConfig.blockDisabled,
                    allowPersistence: profileConfig.allowPersistence && origin !== null && !sender.tab?.incognito,
                }));
                break;
            case "OPEN_PICKER_WVD":
                if (message.from === "content" || sender.tab) return;
                openPopup('pages/picker/filePicker.html?type=wvd', 450, 200);
                break;
            case "OPEN_PICKER_REMOTE":
                if (message.from === "content" || sender.tab) return;
                openPopup('pages/picker/filePicker.html?type=remote', 450, 200);
                break;
            case "OPEN_PICKER_PRD":
                if (message.from === "content" || sender.tab) return;
                openPopup('pages/picker/filePicker.html?type=prd', 450, 200);
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

chrome.windows.onRemoved.addListener(() => {
    chrome.windows.getAll({ populate: false }, (windows) => {
        const incognitoWindows = windows.filter(w => w.incognito);
        if (incognitoWindows.length === 0) {
            chrome.storage.session.clear();
        }
    });
});

SettingsManager.getGlobalEnabled().then(enabled => {
    if (!enabled) {
        setIcon("images/icon-disabled.png");
        ScriptManager.unregisterContentScript();
    } else {
        ScriptManager.registerContentScript();
    }
});

self.addEventListener('error', (event) => {
    notifyUser(
        "An unknown error occurred!",
        (event.message || event.error) +
        "\nRefer to the extension " +
        (isSW ? "service worker" : "background page") +
        " DevTools console for more details.",
        true
    );
});
self.addEventListener('unhandledrejection', (event) => {
    notifyUser(
        "An unknown error occurred!",
        (event.reason) +
        "\nRefer to the extension " +
        (isSW ? "service worker" : "background page") +
        " DevTools console for more details.",
        true
    );
});
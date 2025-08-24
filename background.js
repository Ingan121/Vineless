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
    getWvRequestIdFromLicense,
    SettingsManager,
    ScriptManager,
    AsyncLocalStorage,
} from "./util.js";

import { WidevineLocal } from "./lib/widevine/main.js";
import { PlayReadyLocal } from "./lib/playready/main.js";
import { GenericRemoteDevice } from "./lib/remote_cdm.js";
import { CustomHandlers } from "./lib/customhandlers/main.js";

let manifests = new Map();
let requests = new Map();
let sessions = new Map();
let sessionCnt = {};
let logs = [];

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
                    const extra = { tab: sender.tab };
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
                                        device = new GenericRemoteDevice(host, sessions);
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
                                        device = new GenericRemoteDevice(host, sessions);
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
                        setBadgeText("PR", sender.tab.id);
                        [ extra.sessionId, pssh ] = split.slice(1);
                        const device_type = profileConfig.playready.type;
                        switch (device_type) {
                            case "local":
                                device = new PlayReadyLocal(host, sessions);
                                break;
                            case "remote":
                                device = new GenericRemoteDevice(host, sessions);
                                break;
                            case "custom":
                                device = new CustomHandlers[profileConfig.playready.device.custom].handler(host, sessions);
                                break;
                        }
                    } else {
                        setBadgeText("WV", sender.tab.id);
                        [ pssh, extra.serverCert ] = split;
                        pssh = getWvPsshFromConcatPssh(pssh);
                        const device_type = profileConfig.widevine.type;
                        switch (device_type) {
                            case "local":
                                device = new WidevineLocal(host, sessions);
                                break;
                            case "remote":
                                device = new GenericRemoteDevice(host, sessions);
                                break;
                            case "custom":
                                device = new CustomHandlers[profileConfig.widevine.device.custom].handler(host, sessions);
                                break;
                        }
                    }

                    if (device) {
                        try {
                            const res = await device.generateChallenge(pssh, extra);
                            sessions.set(res.sessionKey, {
                                device: device,
                                value: res.sessionValue
                            });
                            if (res?.challenge) {
                                console.log("[Vineless] Generated license challenge:", res.challenge, "sessionId:", res.sessionKey);
                                if (res.challenge === "null" || res.challenge === "bnVsbA==") {
                                    notifyUser(
                                        "Challenge generation failed!",
                                        "Please refer to the extension " +
                                        (isSW ? "service worker" : "background page") +
                                        " DevTools console/network tab for more details."
                                    );
                                }
                                sendResponse(res.challenge);
                            } else {
                                notifyUser(
                                    "Challenge generation failed!",
                                    "Please refer to the extension " +
                                    (isSW ? "service worker" : "background page") +
                                    " DevTools console/network tab for more details."
                                );
                                sendResponse();
                            }
                        } catch (error) {
                            console.error("[Vineless] Challenge generation error:", error);
                            notifyUser(
                                "Challenge generation failed!",
                                error.message +
                                "\nSee extension DevTools for details." // Reserve space for long error messages
                            );
                            sendResponse();
                        }
                    } else {
                        notifyUser("Challenge generation failed!", "No device handler was selected");
                        sendResponse();
                    }
                }
                break;

            case "RESPONSE":
                let res = null;
                try {
                    res = await parseClearKey(message.body);
                } catch (e) {
                    let sessionId = null;
                    let license = null;
                    if (message.body.startsWith("pr:")) {
                        const split = message.body.split(':');
                        [ sessionId, license ] = split.slice(1);
                    } else {
                        sessionId = getWvRequestIdFromLicense(message.body);
                        license = message.body;
                    }

                    if (sessionId) {
                        const session = sessions.get(sessionId);
                        if (session) {
                            try {
                                res = await session.device.parseLicense(license, session.value);
                                sessions.delete(sessionId);
                            } catch (error) {
                                console.error("[Vineless] License parsing error:", error);
                                notifyUser(
                                    "License parsing failed!",
                                    error.message +
                                    "\nSee extension DevTools for details." // Reserve space for long error messages
                                );
                            }
                        }
                    }
                }

                if (res) {
                    if (res.log) {
                        console.log("[Vineless]", "KEYS", JSON.stringify(res.log.keys), tab_url);

                        res.log.url = tab_url;
                        res.log.manifests = manifests.has(tab_url) ? manifests.get(tab_url) : [];
                        res.log.title = sender.tab?.title;

                        logs.push(res.log);
                        await AsyncLocalStorage.setStorage({[res.pssh]: res.log});

                        sendResponse(JSON.stringify({
                            pssh: res.pssh,
                            keys: res.log.keys
                        }));
                    } else {
                        notifyUser(
                            "License parsing failed!",
                            "Please refer to the extension " +
                            (isSW ? "service worker" : "background page") +
                            " DevTools console/network tab for more details."
                        );
                        sendResponse();
                    }
                } else {
                    // Most likely exception thrown in interface.parseLicense, which is already notified
                    sendResponse();
                }
                break;
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
                if (message.from === "content" || sender.tab) return;
                openPopup('picker/filePicker.html?type=wvd', 450, 200);
                break;
            case "OPEN_PICKER_REMOTE":
                if (message.from === "content" || sender.tab) return;
                openPopup('picker/filePicker.html?type=remote', 450, 200);
                break;
            case "OPEN_PICKER_PRD":
                if (message.from === "content" || sender.tab) return;
                openPopup('picker/filePicker.html?type=prd', 450, 200);
                break;
            case "CLEAR":
                if (message.from === "content" || sender.tab) return;
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

self.addEventListener('error', (event) => {
    notifyUser(
        "An unknown error occurred!",
        (event.message || event.error) +
        "\nRefer to the extension " +
        (isSW ? "service worker" : "background page") +
        " DevTools console for more details."
    );
});
self.addEventListener('unhandledrejection', (event) => {
    notifyUser(
        "An unknown error occurred!",
        (event.reason) +
        "\nRefer to the extension " +
        (isSW ? "service worker" : "background page") +
        " DevTools console for more details."
    );
});
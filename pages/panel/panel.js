import "../../lib/widevine/protobuf.min.js";
import "../../lib/widevine/license_protocol.js";
import {
    AsyncLocalStorage,
    base64toUint8Array,
    getForegroundTab,
    DeviceManager,
    RemoteCDMManager,
    PRDeviceManager,
    CustomHandlerManager,
    SettingsManager,
    escapeHTML
} from "../../util.js";

import { CustomHandlers } from "../../lib/customhandlers/main.js";

const overlay = document.getElementById('overlay');
const overlayMessage = document.getElementById('overlayMessage');
const icon = document.getElementById('icon');
const main = document.getElementById('main');
const commandOptions = document.getElementById('command-options');
const keyContainer = document.getElementById('key-container');

let currentTab = null;

// #region Main
const enabled = document.getElementById('enabled');

const toggle = document.getElementById('scopeToggle');
const globalScopeLabel = document.getElementById('globalScopeLabel');
const siteScopeLabel = document.getElementById('siteScopeLabel');
const scopeInput = document.getElementById('scopeInput');

toggle.addEventListener('change', async () => {
    if (!toggle.checked) {
        const hostOverride = siteScopeLabel.dataset.hostOverride;
        if (hostOverride) {
            SettingsManager.removeProfile(hostOverride);
            window.close();
            return;
        }
        SettingsManager.removeProfile(new URL(currentTab.url).host);
        loadConfig("global");
        reloadButton.classList.remove("hidden");
    }
});

siteScopeLabel.addEventListener('click', function () {
    scopeInput.value = siteScopeLabel.dataset.hostOverride || new URL(currentTab.url).host;
    scopeInput.style.display = 'block';
    scopeInput.focus();
});
scopeInput.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        const hostOverride = scopeInput.value || new URL(currentTab.url).host;
        if (!hostOverride) {
            scopeInput.style.display = 'none';
            return;
        }
        toggle.checked = true;
        toggle.disabled = false;
        globalScopeLabel.textContent = "Remove";
        siteScopeLabel.innerHTML = escapeHTML(hostOverride) + "&lrm;";
        siteScopeLabel.dataset.hostOverride = hostOverride;
        scopeInput.style.display = 'none';
        loadConfig(hostOverride);
        alert("Reopen the panel to remove the override");
    }
});
scopeInput.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        scopeInput.style.display = 'none';
        event.preventDefault();
    }
});
scopeInput.addEventListener('blur', function () {
    scopeInput.style.display = 'none';
});

const reloadButton = document.getElementById('reload');
reloadButton.addEventListener('click', async function () {
    chrome.tabs.reload(currentTab.id);
    window.close();
});

const version = document.getElementById('version');
version.textContent = "v" + chrome.runtime.getManifest().version + " Pre-release";

const wvEnabled = document.getElementById('wvEnabled');
const prEnabled = document.getElementById('prEnabled');
const ckEnabled = document.getElementById('ckEnabled');
const blockDisabled = document.getElementById('blockDisabled');
const allowPersistence = document.getElementById('allowPersistence');
const wvServerCert = document.getElementById('wv-server-cert');

const wvdSelect = document.getElementById('wvdSelect');
const remoteSelect = document.getElementById('remoteSelect');
const customSelect = document.getElementById('customSelect');
const prdSelect = document.getElementById('prdSelect');
const prRemoteSelect = document.getElementById('prRemoteSelect');
const prCustomSelect = document.getElementById('prCustomSelect');

const wvdCombobox = document.getElementById('wvd-combobox');
const remoteCombobox = document.getElementById('remote-combobox');
const prdCombobox = document.getElementById('prd-combobox');
const prRemoteCombobox = document.getElementById('pr-remote-combobox');

[
    enabled,
    wvEnabled, prEnabled, ckEnabled, blockDisabled, allowPersistence, wvServerCert,
    wvdSelect, remoteSelect, customSelect,
    prdSelect, prRemoteSelect, prCustomSelect,
    wvdCombobox, remoteCombobox,
    prdCombobox, prRemoteCombobox,
].forEach(elem => {
    elem.addEventListener('change', async function () {
        applyConfig();
    });
})

main.addEventListener('toggle', async function () {
    SettingsManager.setUICollapsed(!main.open, !commandOptions.open);
});
commandOptions.addEventListener('toggle', async function () {
    SettingsManager.setUICollapsed(!main.open, !commandOptions.open);
});

const exportButton = document.getElementById('export');
exportButton.addEventListener('click', async function () {
    const logs = await AsyncLocalStorage.getStorage(null);
    SettingsManager.downloadFile(new TextEncoder().encode(JSON.stringify(logs) + "\n"), "logs.json");
});

for (const a of document.getElementsByTagName('a')) {
    a.addEventListener('click', (event) => {
        event.preventDefault();
        chrome.tabs.create({ url: a.href });
        window.close();
    });
}
// #endregion Main

// #region Widevine Device
document.getElementById('fileInput').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: "OPEN_PICKER_WVD" });
    window.close();
});

const remove = document.getElementById('remove');
remove.addEventListener('click', async function () {
    await DeviceManager.removeWidevineDevice(wvdCombobox.options[wvdCombobox.selectedIndex]?.text || "");
    wvdCombobox.innerHTML = '';
    await DeviceManager.loadSetAllWidevineDevices();
    applyConfig();
});

const download = document.getElementById('download');
download.addEventListener('click', async function () {
    const widevineDevice = wvdCombobox.options[wvdCombobox.selectedIndex]?.text;
    if (!widevineDevice) {
        return;
    }
    SettingsManager.downloadFile(
        base64toUint8Array(await DeviceManager.loadWidevineDevice(widevineDevice)),
        widevineDevice + ".wvd"
    )
});
// #endregion Widevine Device

// #region Remote CDM
[
    document.getElementById('remoteInput'),
    document.getElementById('prRemoteInput')
].forEach(elem => {
    elem.addEventListener('click', () => {
        chrome.runtime.sendMessage({ type: "OPEN_PICKER_REMOTE" });
        window.close();
    });
});

const remoteRemove = document.getElementById('remoteRemove');
remoteRemove.addEventListener('click', async function() {
    await RemoteCDMManager.removeRemoteCDM(remoteCombobox.options[remoteCombobox.selectedIndex]?.text || "");
    remoteCombobox.innerHTML = '';
    await RemoteCDMManager.loadSetWVRemoteCDMs();
    applyConfig();
});
const prRemoteRemove = document.getElementById('prRemoteRemove');
prRemoteRemove.addEventListener('click', async function() {
    await RemoteCDMManager.removeRemoteCDM(prRemoteCombobox.options[prRemoteCombobox.selectedIndex]?.text || "");
    prRemoteCombobox.innerHTML = '';
    await RemoteCDMManager.loadSetPRRemoteCDMs();
    applyConfig();
});

async function downloadRemote(remoteCdmName) {
    let remoteCdm = await RemoteCDMManager.loadRemoteCDM(remoteCdmName);
    if (!remoteCdm.endsWith('\n')) {
        remoteCdm += '\n';
    }
    SettingsManager.downloadFile(new TextEncoder().encode(remoteCdm), remoteCdmName + ".json");
}
const remoteDownload = document.getElementById('remoteDownload');
remoteDownload.addEventListener('click', async function() {
    const remoteCdm = remoteCombobox.options[remoteCombobox.selectedIndex]?.text;
    if (!remoteCdm) {
        return;
    }
    downloadRemote(remoteCdm);
});
const prRemoteDownload = document.getElementById('prRemoteDownload');
prRemoteDownload.addEventListener('click', async function() {
    const remoteCdm = prRemoteCombobox.options[prRemoteCombobox.selectedIndex]?.text;
    if (!remoteCdm) {
        return;
    }
    downloadRemote(remoteCdm);
});
// #endregion Remote CDM

// #region Playready Device
document.getElementById('prdInput').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: "OPEN_PICKER_PRD" });
    window.close();
});

const prdRemove = document.getElementById('prdRemove');
prdRemove.addEventListener('click', async function() {
    await PRDeviceManager.removePlayreadyDevice(prdCombobox.options[prdCombobox.selectedIndex]?.text || "");
    prdCombobox.innerHTML = '';
    await PRDeviceManager.loadSetAllPlayreadyDevices();
    applyConfig();
});

const prdDownload = document.getElementById('prdDownload');
prdDownload.addEventListener('click', async function() {
    const playreadyDevice = prdCombobox.options[prdCombobox.selectedIndex]?.text;
    if (!playreadyDevice) {
        return;
    }
    SettingsManager.downloadFile(
        base64toUint8Array(await PRDeviceManager.loadPlayreadyDevice(playreadyDevice)),
        playreadyDevice + ".prd"
    )
});
// #endregion Playready Device

// #region Custom Handlers
const customCombobox = document.getElementById('custom-combobox');
const customDesc = document.getElementById('custom-desc');
const prCustomCombobox = document.getElementById('pr-custom-combobox');
const prCustomDesc = document.getElementById('pr-custom-desc');
customCombobox.addEventListener('change', function () {
    customDesc.textContent = CustomHandlers[customCombobox.value].description;
    applyConfig();
});
prCustomCombobox.addEventListener('change', function () {
    prCustomDesc.textContent = CustomHandlers[prCustomCombobox.value].description;
    applyConfig();
});
// #endregion Custom Handlers

// #region Command Options
const decryptionEngineSelect = document.getElementById('decryption-engine-select');
const muxerSelect = document.getElementById('muxer-select');
const formatSelect = document.getElementById('format-select');
const videoStreamSelect = document.getElementById('video-stream-select');
const audioAllCheckbox = document.getElementById('audio-all');
const subsAllCheckbox = document.getElementById('subs-all');

const downloaderName = document.getElementById('downloader-name');
downloaderName.addEventListener('input', function () {
    SettingsManager.saveExecutableName(downloaderName.value);
    reloadAllCommands();
});

async function saveCommandOptions() {
    const opts = {
        decryptionEngine: decryptionEngineSelect.value,
        muxer: muxerSelect.value,
        format: formatSelect.value,
        videoStream: videoStreamSelect.value,
        audioAll: audioAllCheckbox.checked,
        subsAll: subsAllCheckbox.checked
    };
    await SettingsManager.saveCommandOptions(opts);
    await reloadAllCommands();
}

async function restoreCommandOptions() {
    const opts = await SettingsManager.getCommandOptions?.() || {};
    decryptionEngineSelect.value = opts.decryptionEngine || 'SHAKA_PACKAGER';
    muxerSelect.value = opts.muxer || 'ffmpeg';
    formatSelect.value = opts.format || 'mp4';
    videoStreamSelect.value = opts.videoStream || 'best';
    audioAllCheckbox.checked = !!opts.audioAll;
    subsAllCheckbox.checked = !!opts.subsAll;
}

[
    decryptionEngineSelect,
    muxerSelect,
    formatSelect,
    videoStreamSelect,
    audioAllCheckbox,
    subsAllCheckbox
].forEach(elem => {
    elem.addEventListener('change', saveCommandOptions);
});
// #endregion Command Options

// #region Logs
const clear = document.getElementById('clear');
clear.addEventListener('click', async function() {
    chrome.storage.local.clear();
    keyContainer.innerHTML = "";
});

async function createCommand(json, keyString, title) {
    const metadata = JSON.parse(json);
    const headerString = Object.entries(metadata.headers).map(([key, value]) => `-H "${key}: ${value.replace(/"/g, "'")}"`).join(' ');

    // Get selected decryption engine
    let engineArg = `--decryption-engine ${decryptionEngineSelect.value}`;

    // Get selected muxer and format, combine as required
    const muxer = muxerSelect.value;
    const format = formatSelect.value;
    let formatMuxerArg = `-M format=${format}:muxer=${muxer}`;

    // Stream options
    let streamArgs = [];
    const videoStream = videoStreamSelect.value;
    if (videoStream === "best") streamArgs.push('-sv best');
    if (videoStream === "1080") streamArgs.push('-sv res="1080*"');
    if (audioAllCheckbox.checked) streamArgs.push('-sa all');
    if (subsAllCheckbox.checked) streamArgs.push('-ss all');

    return `${await SettingsManager.getExecutableName()} "${metadata.url}" ${headerString} ${keyString} ${engineArg} ${formatMuxerArg} ${streamArgs.join(' ')}${title ? ` --save-name "${title}"` : ""}`.trim();
}

async function reloadAllCommands() {
    const logContainers = document.querySelectorAll('.log-container');
    for (const logContainer of logContainers) {
        const command = logContainer.querySelector('.command-box');
        if (!command) {
            continue;
        }
        const select = logContainer.querySelector(".manifest-box");
        const key = logContainer.querySelector('.key-box');
        command.value = await createCommand(select.value, key.value, logContainer.log.title);
    }
}

function getFriendlyType(type) {
    switch (type) {
        case "CLEARKEY":
            return "ClearKey";
        case "WIDEVINE":
            return "Widevine";
        case "PLAYREADY":
            return "PlayReady";
        default:
            return type;
    }
}

async function appendLog(result, testDuplicate) {
    const keyString = result.keys.map(key => `--key ${key.kid}:${key.k}`).join(' ');
    const date = new Date(result.timestamp * 1000);
    const dateString = date.toLocaleString();

    const logContainer = document.createElement('div');
    logContainer.classList.add('log-container');

    const pssh = result.pssh || result.pssh_data || result.wrm_header;

    logContainer.innerHTML = `
        <button class="toggleButton">+</button>
        <div class="expandableDiv collapsed">
            <a href="#" class="expanded-only removeButton">x</a>
            <label class="always-visible right-bound">
                URL:<input type="text" class="text-box" value="${escapeHTML(result.url)}"${result.origin ? `title="Origin: ${escapeHTML(result.origin)}"` : ""} readonly>
            </label>
            <label class="expanded-only right-bound">
                Title:<input type="text" class="text-box" value="${escapeHTML(result.title || '')}" readonly>
            </label>
            <label class="expanded-only right-bound">
                Type:<input type="text" class="text-box" value="${getFriendlyType(result.type)}" readonly>
            </label>
            <label class="expanded-only right-bound">
                ${result.type === "PLAYREADY" ? "WRM" : "PSSH"}:<input type="text" class="text-box pssh-box" value="${escapeHTML(pssh)}" readonly>
            </label>
            <label class="expanded-only right-bound key-copy">
                <a href="#" title="Click to copy">Keys:</a><input type="text" class="text-box key-box" value="${keyString}" readonly>
            </label>
            <label class="expanded-only right-bound">
                Date:<input type="text" class="text-box" value="${dateString}" readonly>
            </label>
            ${result.sessions?.length > 0 ? `<label class="expanded-only right-bound session-copy">
                <a href="#" title="Click to copy, right click to remove">Sessions:</a><select class="text-box session-box"></select>
            </label>` : ''}
            ${result.manifests.length > 0 ? `<label class="expanded-only right-bound manifest-copy">
                <a href="#" title="Click to copy">Manifest:</a><select class="text-box manifest-box"></select>
            </label>
            <label class="expanded-only right-bound command-copy">
                <a href="#" title="Click to copy">Cmd:</a><input type="text" class="text-box command-box" readonly>
            </label>` : ''}
        </div>`;

    const keysInput = logContainer.querySelector('.key-copy');
    keysInput.addEventListener('click', () => {
        navigator.clipboard.writeText(keyString);
    });

    if (result.sessions?.length > 0) {
        const sessionSelect = logContainer.querySelector(".session-box");
        const option = new Option(`${result.sessions.length} persistent sessions`, "");
        sessionSelect.add(option);

        result.sessions.forEach((session) => {
            const option = new Option(session, session);
            sessionSelect.add(option);
        });

        const sessionCopy = logContainer.querySelector('.session-copy');
        sessionCopy.addEventListener('click', () => {
            if (sessionSelect.selectedIndex === 0) return;
            navigator.clipboard.writeText(sessionSelect.value);
        });
        sessionCopy.addEventListener('contextmenu', (event) => {
            if (sessionSelect.selectedIndex === 0) return;
            event.preventDefault();
            result.sessions.splice(sessionSelect.selectedIndex - 1, 1);
            AsyncLocalStorage.setStorage({ [pssh + result.origin]: result });
        });
    }

    if (result.manifests.length > 0) {
        const command = logContainer.querySelector('.command-box');

        const select = logContainer.querySelector(".manifest-box");
        select.addEventListener('change', async () => {
            command.value = await createCommand(select.value, keyString, result.title);
        });
        result.manifests.forEach((manifest) => {
            const option = new Option(`[${manifest.type}] ${manifest.url}`, JSON.stringify(manifest));
            select.add(option);
        });
        command.value = await createCommand(select.value, keyString, result.title);

        const manifestCopy = logContainer.querySelector('.manifest-copy');
        manifestCopy.addEventListener('click', () => {
            navigator.clipboard.writeText(JSON.parse(select.value).url);
        });

        const commandCopy = logContainer.querySelector('.command-copy');
        commandCopy.addEventListener('click', () => {
            navigator.clipboard.writeText(command.value);
        });
    }

    const toggleButton = logContainer.querySelector('.toggleButton');
    toggleButton.addEventListener('click', function () {
        const expandableDiv = this.nextElementSibling;
        if (expandableDiv.classList.contains('collapsed')) {
            toggleButton.innerHTML = "-";
            expandableDiv.classList.remove('collapsed');
            expandableDiv.classList.add('expanded');
        } else {
            toggleButton.innerHTML = "+";
            expandableDiv.classList.remove('expanded');
            expandableDiv.classList.add('collapsed');
        }
    });

    const removeButton = logContainer.querySelector('.removeButton');
    removeButton.addEventListener('click', () => {
        logContainer.remove();
        AsyncLocalStorage.removeStorage([pssh]);
    });

    for (const a of logContainer.getElementsByTagName('a')) {
        a.addEventListener('click', (event) => {
            event.preventDefault();
        });
    }

    // Remote duplicate existing entry
    if (testDuplicate) {
        const logContainers = keyContainer.querySelectorAll('.log-container');
        logContainers.forEach(container => {
            if (container.log.pssh === pssh && container.log.origin === result.origin) {
                container.remove();
            }
        });
    }

    logContainer.log = result;

    keyContainer.appendChild(logContainer);

    updateIcon();
}

chrome.storage.onChanged.addListener(async (changes, areaName) => {
    if (areaName === 'local') {
        for (const [key, values] of Object.entries(changes)) {
            await appendLog(values.newValue, true);
        }
    }
});

async function checkLogs() {
    const logs = await AsyncLocalStorage.getStorage(null);
    Object.values(logs).forEach(async (result) => {
        await appendLog(result, false);
    });
}
// #endregion Keys

// #region Initialization and Config Management
async function loadConfig(scope = "global") {
    const profileConfig = await SettingsManager.getProfile(scope);
    enabled.checked = await SettingsManager.getGlobalEnabled() && profileConfig.enabled;
    wvEnabled.checked = profileConfig.widevine.enabled;
    prEnabled.checked = profileConfig.playready.enabled;
    ckEnabled.checked = profileConfig.clearkey.enabled;
    blockDisabled.checked = profileConfig.blockDisabled;
    allowPersistence.checked = profileConfig.allowPersistence;
    wvServerCert.value = profileConfig.widevine.serverCert || "if_provided";
    SettingsManager.setSelectedDeviceType(profileConfig.widevine.type);
    await DeviceManager.selectWidevineDevice(profileConfig.widevine.device.local);
    await RemoteCDMManager.selectRemoteCDM(profileConfig.widevine.device.remote);
    CustomHandlerManager.selectCustomHandler(profileConfig.widevine.device.custom);
    SettingsManager.setSelectedPRDeviceType(profileConfig.playready.type);
    await PRDeviceManager.selectPlayreadyDevice(profileConfig.playready.device.local);
    await RemoteCDMManager.selectPRRemoteCDM(profileConfig.playready.device.remote);
    CustomHandlerManager.selectPRCustomHandler(profileConfig.playready.device.custom);
    updateIcon();
    main.dataset.wvType = profileConfig.widevine.type;
    main.dataset.prType = profileConfig.playready.type;
}

async function applyConfig() {
    const scope = siteScopeLabel.dataset.hostOverride || (toggle.checked ? new URL(currentTab.url).host : "global");
    const wvType = wvdSelect.checked ? "local" : (remoteSelect.checked ? "remote" : "custom");
    const prType = prdSelect.checked ? "local" : (prRemoteSelect.checked ? "remote" : "custom");
    const config = {
        "enabled": enabled.checked,
        "widevine": {
            "enabled": wvEnabled.checked,
            "device": {
                "local": wvdCombobox.options[wvdCombobox.selectedIndex]?.text || null,
                "remote": remoteCombobox.options[remoteCombobox.selectedIndex]?.text || null,
                "custom": customCombobox.value
            },
            "type": wvType,
            "serverCert": wvServerCert.value
        },
        "playready": {
            "enabled": prEnabled.checked,
            "device": {
                "local": prdCombobox.options[prdCombobox.selectedIndex]?.text || null,
                "remote": prRemoteCombobox.options[prRemoteCombobox.selectedIndex]?.text || null,
                "custom": prCustomCombobox.value
            },
            "type": prType
        },
        "clearkey": {
            "enabled": ckEnabled.checked
        },
        "blockDisabled": blockDisabled.checked,
        "allowPersistence": allowPersistence.checked
    };
    main.dataset.wvType = wvType;
    main.dataset.prType = prType;
    await SettingsManager.setProfile(scope, config);
    // If Vineless is globally disabled, per-site enabled config is completely ignored
    // Enable both global and per-site when switching the per-site one to enabled, if global was disabled
    if (scope === "global" || (config.enabled && !await SettingsManager.getGlobalEnabled())) {
        await SettingsManager.setGlobalEnabled(config.enabled);
    }
    if (!siteScopeLabel.dataset.hostOverride) {
        reloadButton.classList.remove('hidden');
    }
    updateIcon();
}

async function getSessionCount() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ type: "GET_ACTIVE", body: currentTab.id }, (response) => {
            resolve(response);
        });
    });
}

async function updateIcon() {
    if (await getSessionCount()) {
        icon.src = "../../images/icon-active.png";
    } else if (await SettingsManager.getGlobalEnabled()) {
        icon.src = "../../images/icon.png";
    } else {
        icon.src = "../../images/icon-disabled.png";
    }
}

function timeoutPromise(promise, ms) {
    let timer;
    const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("timeout")), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

document.addEventListener('DOMContentLoaded', async function () {
    const configs = [
        {
            "initDataTypes": ["cenc"],
            "videoCapabilities": [
                {"contentType": "video/mp4;codecs=\"avc1.64001f\"", "robustness": ""},
                {"contentType": "video/mp4;codecs=\"avc1.4D401F\"", "robustness": ""},
                {"contentType": "video/mp4;codecs=\"avc1.42E01E\"", "robustness": ""}
            ],
            "distinctiveIdentifier": "optional",
            "persistentState": "optional",
            "sessionTypes": ["temporary"]
        }
    ];

    try {
        // Probe ClearKey support
        // Tor Browser might return a never-resolving promise on RMKSA so use a timeout
        await timeoutPromise(navigator.requestMediaKeySystemAccess('org.w3.clearkey', configs), 3000);
        overlay.style.display = 'none';

        currentTab = await getForegroundTab();
        const host = new URL(currentTab.url).host;
        if (host) {
            siteScopeLabel.innerHTML = escapeHTML(host) + "&lrm;";
            if (await SettingsManager.profileExists(host)) {
                toggle.checked = true;
            }
        } else {
            siteScopeLabel.textContent = "<no origin>";
            toggle.disabled = true;
        }
        downloaderName.value = await SettingsManager.getExecutableName();
        await restoreCommandOptions();
        CustomHandlerManager.loadSetAllCustomHandlers();
        await DeviceManager.loadSetAllWidevineDevices();
        await RemoteCDMManager.loadSetAllRemoteCDMs();
        await PRDeviceManager.loadSetAllPlayreadyDevices();
        const { devicesCollapsed, commandsCollapsed } = await SettingsManager.getUICollapsed();
        if (!devicesCollapsed) {
            main.open = true;
        }
        if (!commandsCollapsed) {
            commandOptions.open = true;
        }
        checkLogs();
        loadConfig(host);
    } catch (e) {
        // bail out
        console.error(e);
        if ((e.name === "NotSupportedError" || e.name === "TypeError") && overlay.style.display !== 'none') {
            overlayMessage.innerHTML = "This browser does not support either EME or ClearKey!<br>Vineless cannot work without those!";
            document.body.style.overflow = "hidden";
        } else {
            alert("An unknown error occurred while loading the panel!");
        }
    }
});
// #endregion Initialization and Config Management

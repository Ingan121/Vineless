import "../lib/widevine/protobuf.min.js";
import "../lib/widevine/license_protocol.js";
import { Utils } from '../lib/playready/utils.js';
import {
    AsyncLocalStorage,
    base64toUint8Array,
    stringToUint8Array,
    getForegroundTab,
    DeviceManager,
    RemoteCDMManager,
    PRDeviceManager,
    CustomHandlerManager,
    SettingsManager,
    escapeHTML
} from "../util.js";

import { CustomHandlers } from "../lib/customhandlers/main.js";

const overlay = document.getElementById('overlay');
const overlayMessage = document.getElementById('overlayMessage');
const icon = document.getElementById('icon');
const main = document.getElementById('main');
const key_container = document.getElementById('key-container');

let currentTab = null;

// ================ Main ================
const enabled = document.getElementById('enabled');

const toggle = document.getElementById('scopeToggle');
toggle.addEventListener('change', async () => {
    if (!toggle.checked) {
        SettingsManager.removeProfile(new URL(currentTab.url).host);
        loadConfig("global");
        reloadButton.classList.remove("hidden");
    }
});

const siteScopeLabel = document.getElementById('siteScopeLabel');
const scopeInput = document.getElementById('scopeInput');
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
        toggle.disabled = true;
        siteScopeLabel.textContent = hostOverride;
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

const wvd_select = document.getElementById('wvd_select');
const remote_select = document.getElementById('remote_select');
const custom_select = document.getElementById('custom_select');
const prd_select = document.getElementById('prd_select');
const pr_remote_select = document.getElementById('pr_remote_select');
const pr_custom_select = document.getElementById('pr_custom_select');

const wvd_combobox = document.getElementById('wvd-combobox');
const remote_combobox = document.getElementById('remote-combobox');
const prd_combobox = document.getElementById('prd-combobox');
const pr_remote_combobox = document.getElementById('pr-remote-combobox');

[
    enabled,
    wvEnabled, prEnabled, ckEnabled, blockDisabled,
    wvd_select, remote_select, custom_select,
    prd_select, pr_remote_select, pr_custom_select,
    wvd_combobox, remote_combobox,
    prd_combobox, pr_remote_combobox,
].forEach(elem => {
    elem.addEventListener('change', async function () {
        applyConfig();
    });
})

const export_button = document.getElementById('export');
export_button.addEventListener('click', async function () {
    const logs = await AsyncLocalStorage.getStorage(null);
    SettingsManager.downloadFile(stringToUint8Array(JSON.stringify(logs)), "logs.json");
});
// ======================================

// ================ Widevine Device ================
document.getElementById('fileInput').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: "OPEN_PICKER_WVD" });
    window.close();
});

const remove = document.getElementById('remove');
remove.addEventListener('click', async function () {
    await DeviceManager.removeWidevineDevice(wvd_combobox.options[wvd_combobox.selectedIndex]?.text || "");
    wvd_combobox.innerHTML = '';
    await DeviceManager.loadSetAllWidevineDevices();
    applyConfig();
});

const download = document.getElementById('download');
download.addEventListener('click', async function () {
    const widevine_device = wvd_combobox.options[wvd_combobox.selectedIndex]?.text;
    if (!widevine_device) {
        return;
    }
    SettingsManager.downloadFile(
        base64toUint8Array(await DeviceManager.loadWidevineDevice(widevine_device)),
        widevine_device + ".wvd"
    )
});
// =================================================

// ================ Remote CDM ================
[
    document.getElementById('remoteInput'),
    document.getElementById('prRemoteInput')
].forEach(elem => {
    elem.addEventListener('click', () => {
        chrome.runtime.sendMessage({ type: "OPEN_PICKER_REMOTE" });
        window.close();
    });
});

const remote_remove = document.getElementById('remoteRemove');
remote_remove.addEventListener('click', async function() {
    await RemoteCDMManager.removeRemoteCDM(remote_combobox.options[remote_combobox.selectedIndex]?.text || "");
    remote_combobox.innerHTML = '';
    pr_remote_combobox.innerHTML = '';
    await RemoteCDMManager.loadSetAllRemoteCDMs();
    applyConfig();
});
const pr_remote_remove = document.getElementById('prRemoteRemove');
pr_remote_remove.addEventListener('click', async function() {
    await RemoteCDMManager.removeRemoteCDM(pr_remote_combobox.options[pr_remote_combobox.selectedIndex]?.text || "");
    remote_combobox.innerHTML = '';
    pr_remote_combobox.innerHTML = '';
    await RemoteCDMManager.loadSetAllRemoteCDMs();
    applyConfig();
});

const remote_download = document.getElementById('remoteDownload');
remote_download.addEventListener('click', async function() {
    const remote_cdm = remote_combobox.options[remote_combobox.selectedIndex]?.text;
    if (!remote_cdm) {
        return;
    }
    SettingsManager.downloadFile(
        await RemoteCDMManager.loadRemoteCDM(remote_cdm),
        remote_cdm + ".json"
    )
});
const pr_remote_download = document.getElementById('prRemoteDownload');
pr_remote_download.addEventListener('click', async function() {
    const remote_cdm = pr_remote_combobox.options[pr_remote_combobox.selectedIndex]?.text;
    if (!remote_cdm) {
        return;
    }
    SettingsManager.downloadFile(
        await RemoteCDMManager.loadRemoteCDM(remote_cdm),
        remote_cdm + ".json"
    )
});
// ============================================

// ================ Playready Device ================
document.getElementById('prdInput').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: "OPEN_PICKER_PRD" });
    window.close();
});

const prdRemove = document.getElementById('prdRemove');
prdRemove.addEventListener('click', async function() {
    await PRDeviceManager.removePlayreadyDevice(prd_combobox.options[prd_combobox.selectedIndex]?.text || "");
    prd_combobox.innerHTML = '';
    await PRDeviceManager.loadSetAllPlayreadyDevices();
    applyConfig();
});

const prdDownload = document.getElementById('prdDownload');
prdDownload.addEventListener('click', async function() {
    const playready_device = prd_combobox.options[prd_combobox.selectedIndex]?.text;
    if (!playready_device) {
        return;
    }
    SettingsManager.downloadFile(
        Utils.base64ToBytes(await PRDeviceManager.loadPlayreadyDevice(playready_device)),
        playready_device + ".prd"
    )
});
// ==================================================

// ================ Custom Handlers ================
const custom_combobox = document.getElementById('custom-combobox');
const custom_desc = document.getElementById('custom-desc');
const pr_custom_combobox = document.getElementById('pr-custom-combobox');
const pr_custom_desc = document.getElementById('pr-custom-desc');
custom_combobox.addEventListener('change', function () {
    custom_desc.textContent = CustomHandlers[custom_combobox.value].description;
    applyConfig();
});
pr_custom_combobox.addEventListener('change', function () {
    pr_custom_desc.textContent = CustomHandlers[pr_custom_combobox.value].description;
    applyConfig();
});
// =================================================

// ================ Command Options ================
const use_shaka = document.getElementById('use-shaka');
use_shaka.addEventListener('change', async function (){
    await SettingsManager.saveUseShakaPackager(use_shaka.checked);
});

const downloader_name = document.getElementById('downloader-name');
downloader_name.addEventListener('input', async function (event){
    console.log("input change", event);
    await SettingsManager.saveExecutableName(downloader_name.value);
});
// =================================================

// ================ Keys ================
const clear = document.getElementById('clear');
clear.addEventListener('click', async function() {
    chrome.runtime.sendMessage({ type: "CLEAR" });
    chrome.storage.local.clear();
    key_container.innerHTML = "";
});

async function getCurrentTabTitle() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab.title || "video";
} // Filename using TAB title

async function createCommand(json, key_string) {
    const metadata = JSON.parse(json);
    const filename = await getCurrentTabTitle();
    const header_string = Object.entries(metadata.headers).map(([key, value]) => `-H "${key}: ${value.replace(/"/g, "'")}"`).join(' ');
    return `${await SettingsManager.getExecutableName()} "${metadata.url}" ${header_string} ${key_string} ${await SettingsManager.getUseShakaPackager() ? "--use-shaka-packager " : ""}--save-name "${filename}" -M format=mkv`;
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

async function appendLog(result) {
    const key_string = result.keys.map(key => `--key ${key.kid}:${key.k}`).join(' ');
    const date = new Date(result.timestamp * 1000);
    const date_string = date.toLocaleString();

    const logContainer = document.createElement('div');
    logContainer.classList.add('log-container');

    logContainer.innerHTML = `
        <button class="toggleButton">+</button>
        <div class="expandableDiv collapsed">
            <label class="always-visible right-bound">
                URL:<input type="text" class="text-box" value="${escapeHTML(result.url)}">
            </label>
            <label class="expanded-only right-bound">
                Type:<input type="text" class="text-box" value="${getFriendlyType(result.type)}">
            </label>
            <label class="expanded-only right-bound">
            <label class="expanded-only right-bound">
                ${result.type === "PLAYREADY" ? "WRM" : "PSSH"}:<input type="text" class="text-box" value='${escapeHTML(result.pssh_data || result.wrm_header)}'>
            </label>
            <label class="expanded-only right-bound key-copy">
                <a href="#" title="Click to copy">Keys:</a><input type="text" class="text-box" value="${key_string}">
            </label>
            <label class="expanded-only right-bound">
                Date:<input type="text" class="text-box" value="${date_string}">
            </label>
            ${result.manifests.length > 0 ? `<label class="expanded-only right-bound manifest-copy">
                <a href="#" title="Click to copy">Manifest:</a><select id="manifest" class="text-box"></select>
            </label>
            <label class="expanded-only right-bound command-copy">
                <a href="#" title="Click to copy">Cmd:</a><input type="text" id="command" class="text-box">
            </label>` : ''}
        </div>`;

    const keysInput = logContainer.querySelector('.key-copy');
    keysInput.addEventListener('click', () => {
        navigator.clipboard.writeText(key_string);
    });

    if (result.manifests.length > 0) {
        const command = logContainer.querySelector('#command');

        const select = logContainer.querySelector("#manifest");
        select.addEventListener('change', async () => {
            command.value = await createCommand(select.value, key_string);
        });
        result.manifests.forEach((manifest) => {
            const option = new Option(`[${manifest.type}] ${manifest.url}`, JSON.stringify(manifest));
            select.add(option);
        });
        command.value = await createCommand(select.value, key_string);

        const manifest_copy = logContainer.querySelector('.manifest-copy');
        manifest_copy.addEventListener('click', () => {
            navigator.clipboard.writeText(JSON.parse(select.value).url);
        });

        const command_copy = logContainer.querySelector('.command-copy');
        command_copy.addEventListener('click', () => {
            navigator.clipboard.writeText(command.value);
        });
    }

    const toggleButtons = logContainer.querySelector('.toggleButton');
    toggleButtons.addEventListener('click', function () {
        const expandableDiv = this.nextElementSibling;
        if (expandableDiv.classList.contains('collapsed')) {
            toggleButtons.innerHTML = "-";
            expandableDiv.classList.remove('collapsed');
            expandableDiv.classList.add('expanded');
        } else {
            toggleButtons.innerHTML = "+";
            expandableDiv.classList.remove('expanded');
            expandableDiv.classList.add('collapsed');
        }
    });

    key_container.appendChild(logContainer);

    updateIcon();
}

chrome.storage.onChanged.addListener(async (changes, areaName) => {
    if (areaName === 'local') {
        for (const [key, values] of Object.entries(changes)) {
            await appendLog(values.newValue);
        }
    }
});

async function checkLogs() {
    const logs = await AsyncLocalStorage.getStorage(null);
    Object.values(logs).forEach(async (result) => {
        await appendLog(result);
    });
}

async function loadConfig(scope = "global") {
    const profileConfig = await SettingsManager.getProfile(scope);
    enabled.checked = await SettingsManager.getGlobalEnabled() && profileConfig.enabled;
    wvEnabled.checked = profileConfig.widevine.enabled;
    prEnabled.checked = profileConfig.playready.enabled;
    ckEnabled.checked = profileConfig.clearkey.enabled;
    blockDisabled.checked = profileConfig.blockDisabled;
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
    const wvType = wvd_select.checked ? "local" : (remote_select.checked ? "remote" : "custom");
    const prType = prd_select.checked ? "local" : (pr_remote_select.checked ? "remote" : "custom");
    const config = {
        "enabled": enabled.checked,
        "widevine": {
            "enabled": wvEnabled.checked,
            "device": {
                "local": wvd_combobox.options[wvd_combobox.selectedIndex]?.text || null,
                "remote": remote_combobox.options[remote_combobox.selectedIndex]?.text || null,
                "custom": custom_combobox.value
            },
            "type": wvType
        },
        "playready": {
            "enabled": prEnabled.checked,
            "device": {
                "local": prd_combobox.options[prd_combobox.selectedIndex]?.text || null,
                "remote": pr_remote_combobox.options[pr_remote_combobox.selectedIndex]?.text || null,
                "custom": pr_custom_combobox.value
            },
            "type": prType
        },
        "clearkey": {
            "enabled": ckEnabled.checked
        },
        "blockDisabled": blockDisabled.checked
    };
    main.dataset.wvType = wvType;
    main.dataset.prType = prType;
    await SettingsManager.setProfile(scope, config);
    // If Vineless is globally disabled, per-site enabled config is completely ignored
    // Enable both global and per-site when switching the per-site one to enabled, if global was disabled
    if (scope === "global" || (config.enabled && !await SettingsManager.getGlobalEnabled())) {
        await SettingsManager.setGlobalEnalbed(config.enabled);
    }
    reloadButton.classList.remove('hidden');
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
        icon.src = "../images/icon-active.png";
    } else if (await SettingsManager.getGlobalEnabled()) {
        icon.src = "../images/icon.png";
    } else {
        icon.src = "../images/icon-disabled.png";
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
            siteScopeLabel.textContent = host;
            if (await SettingsManager.profileExists(host)) {
                toggle.checked = true;
            }
        } else {
            siteScopeLabel.textContent = "<no origin>";
            toggle.disabled = true;
        }
        use_shaka.checked = await SettingsManager.getUseShakaPackager();
        downloader_name.value = await SettingsManager.getExecutableName();
        CustomHandlerManager.loadSetAllCustomHandlers();
        await DeviceManager.loadSetAllWidevineDevices();
        await RemoteCDMManager.loadSetAllRemoteCDMs();
        await PRDeviceManager.loadSetAllPlayreadyDevices();
        checkLogs();
        loadConfig(host);
    } catch (e) {
        // bail out
        console.error(e);
        if (e.name === "NotSupportedError" || e.name === "TypeError") {
            overlayMessage.innerHTML = "This browser does not support either EME or ClearKey!<br>Vineless cannot work without those!";
            document.body.style.overflow = "hidden";
        } else {
            alert("An unknown error occurred while loading the panel!");
        }
    }
});
// ======================================

import "../protobuf.min.js";
import "../license_protocol.js";
import { Utils } from '../jsplayready/utils.js';
import {
    AsyncLocalStorage,
    base64toUint8Array,
    stringToUint8Array,
    getForegroundTab,
    DeviceManager,
    RemoteCDMManager,
    PRDeviceManager,
    SettingsManager,
    escapeHTML
} from "../util.js";

const key_container = document.getElementById('key-container');
const icon = document.getElementById('icon');

let currentTab = null;

// ================ Main ================
const enabled = document.getElementById('enabled');
enabled.addEventListener('change', async function (){
    applyConfig();
});

const toggle = document.getElementById('scopeToggle');
toggle.addEventListener('change', async () => {
    if (!toggle.checked) {
        SettingsManager.removeProfile(new URL(currentTab.url).host);
        loadConfig("global");
        reloadButton.classList.remove("hidden");
    }
});

const siteScopeLabel = document.getElementById('siteScopeLabel');

const reloadButton = document.getElementById('reload');
reloadButton.addEventListener('click', async function () {
    chrome.tabs.reload(currentTab.id);
    window.close();
});

const version = document.getElementById('version');
version.textContent = "v" + chrome.runtime.getManifest().version + " Pre-release";

const wvEnabled = document.getElementById('wvEnabled');
wvEnabled.addEventListener('change', async function () {
    applyConfig();
});

const prEnabled = document.getElementById('prEnabled');
prEnabled.addEventListener('change', async function () {
    applyConfig();
});

const ckEnabled = document.getElementById('ckEnabled');
ckEnabled.addEventListener('change', async function () {
    applyConfig();
});

const blockDisabled = document.getElementById('blockDisabled');
blockDisabled.addEventListener('change', async function () {
    applyConfig();
});

const wvd_select = document.getElementById('wvd_select');
wvd_select.addEventListener('change', async function () {
    applyConfig();
});

const remote_select = document.getElementById('remote_select');
remote_select.addEventListener('change', async function () {
    applyConfig();
});

const export_button = document.getElementById('export');
export_button.addEventListener('click', async function() {
    const logs = await AsyncLocalStorage.getStorage(null);
    SettingsManager.downloadFile(stringToUint8Array(JSON.stringify(logs)), "logs.json");
});
// ======================================

// ================ UnifiedPicker ================

function openUnifiedPicker() {
  chrome.runtime.sendMessage({ type: "OPEN_PICKER_DEVICE" });
  window.close();
}

document.getElementById('fileInput').addEventListener('click', openUnifiedPicker);   // WVD
document.getElementById('remoteInput').addEventListener('click', openUnifiedPicker); // Remote JSON
document.getElementById('prdInput').addEventListener('click', openUnifiedPicker);    // PRD


// ================ Widevine Device ================
// document.getElementById('fileInput').addEventListener('click', () => {
//     chrome.runtime.sendMessage({ type: "OPEN_PICKER_WVD" });
//     window.close();
// });

const remove = document.getElementById('remove');
remove.addEventListener('click', async function() {
    await DeviceManager.removeWidevineDevice(wvd_combobox.options[wvd_combobox.selectedIndex]?.text || "");
    wvd_combobox.innerHTML = '';
    await DeviceManager.loadSetAllWidevineDevices();
    applyConfig();
});

const download = document.getElementById('download');
download.addEventListener('click', async function() {
    const widevine_device = wvd_combobox.options[wvd_combobox.selectedIndex]?.text;
    SettingsManager.downloadFile(
        base64toUint8Array(await DeviceManager.loadWidevineDevice(widevine_device)),
        widevine_device + ".wvd"
    )
});

const wvd_combobox = document.getElementById('wvd-combobox');
wvd_combobox.addEventListener('change', async function() {
    applyConfig();
});
// =================================================

// ================ Remote CDM ================
// document.getElementById('remoteInput').addEventListener('click', () => {
//     chrome.runtime.sendMessage({ type: "OPEN_PICKER_REMOTE" });
//     window.close();
// });

const remote_remove = document.getElementById('remoteRemove');
remote_remove.addEventListener('click', async function() {
    await RemoteCDMManager.removeRemoteCDM(remote_combobox.options[remote_combobox.selectedIndex]?.text || "");
    remote_combobox.innerHTML = '';
    await RemoteCDMManager.loadSetAllRemoteCDMs();
    applyConfig();
});

const remote_download = document.getElementById('remoteDownload');
remote_download.addEventListener('click', async function() {
    const remote_cdm = remote_combobox.options[remote_combobox.selectedIndex]?.text;
    SettingsManager.downloadFile(
        await RemoteCDMManager.loadRemoteCDM(remote_cdm),
        remote_cdm + ".json"
    )
});

const remote_combobox = document.getElementById('remote-combobox');
remote_combobox.addEventListener('change', async function() {
    applyConfig();
});
// ============================================

// ================ Playready Device ================
// document.getElementById('prdInput').addEventListener('click', () => {
//     chrome.runtime.sendMessage({ type: "OPEN_PICKER_PRD" });
//     window.close();
// });

const prd_combobox = document.getElementById('prd-combobox');
prd_combobox.addEventListener('change', async function() {
    applyConfig();
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
    SettingsManager.downloadFile(
        Utils.base64ToBytes(await PRDeviceManager.loadPlayreadyDevice(playready_device)),
        playready_device + ".prd"
    )
});
// ============================================

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

async function createCommand(json, key_string) {
    const metadata = JSON.parse(json);
    const header_string = Object.entries(metadata.headers).map(([key, value]) => `-H "${key}: ${value.replace(/"/g, "'")}"`).join(' ');
    return `${await SettingsManager.getExecutableName()} "${metadata.url}" ${header_string} ${key_string} ${await SettingsManager.getUseShakaPackager() ? "--use-shaka-packager " : ""}-M format=mkv`;
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
                Type:<input type="text" class="text-box" value="${result.type}">
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
    await PRDeviceManager.selectPlayreadyDevice(profileConfig.playready.device.local);
    updateIcon();
}

async function applyConfig() {
    const scope = toggle.checked ? new URL(currentTab.url).host : "global";
    const config = {
        "enabled": enabled.checked,
        "widevine": {
            "enabled": wvEnabled.checked,
            "device": {
                "local": wvd_combobox.options[wvd_combobox.selectedIndex]?.text || null,
                "remote": remote_combobox.options[remote_combobox.selectedIndex]?.text || null
            },
            "type": wvd_select.checked ? "local" : "remote"
        },
        "playready": {
            "enabled": prEnabled.checked,
            "device": {
                "local": prd_combobox.options[prd_combobox.selectedIndex]?.text || null
            },
            "type": "local"
        },
        "clearkey": {
            "enabled": ckEnabled.checked
        },
        "blockDisabled": blockDisabled.checked
    };
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

document.addEventListener('DOMContentLoaded', async function () {
    currentTab = await getForegroundTab();
    const host = new URL(currentTab.url).host;
    if (await SettingsManager.profileExists(host)) {
        toggle.checked = true;
    }
    siteScopeLabel.textContent = host;
    use_shaka.checked = await SettingsManager.getUseShakaPackager();
    downloader_name.value = await SettingsManager.getExecutableName();
    await DeviceManager.loadSetAllWidevineDevices();
    await RemoteCDMManager.loadSetAllRemoteCDMs();
    await PRDeviceManager.loadSetAllPlayreadyDevices();
    checkLogs();
    loadConfig(host);
});
// ======================================

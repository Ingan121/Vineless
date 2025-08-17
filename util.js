import { WidevineDevice } from "./lib/widevine/device.js";
import { RemoteCdm } from "./lib/remote_cdm.js";
import { CustomHandlers } from "./lib/customhandlers/main.js";

export class AsyncSyncStorage {
    static async setStorage(items) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set(items, () => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError));
                } else {
                    resolve();
                }
            });
        });
    }

    static async getStorage(keys) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(keys, (result) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError));
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async removeStorage(keys) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.remove(keys, (result) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError));
                } else {
                    resolve(result);
                }
            });
        });
    }
}

export class AsyncLocalStorage {
    static async setStorage(items) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.set(items, () => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError));
                } else {
                    resolve();
                }
            });
        });
    }

    static async getStorage(keys) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(keys, (result) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError));
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async removeStorage(keys) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.remove(keys, (result) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError));
                } else {
                    resolve(result);
                }
            });
        });
    }
}

export class DeviceManager {
    static async saveWidevineDevice(name, value) {
        const result = await AsyncSyncStorage.getStorage(['devices']);
        const array = result.devices === undefined ? [] : result.devices;
        array.push(name);
        await AsyncSyncStorage.setStorage({ devices: array });
        await AsyncSyncStorage.setStorage({ [name]: value });
    }

    static async loadWidevineDevice(name) {
        const result = await AsyncSyncStorage.getStorage([name ?? ""]);
        return result[name] || "";
    }

    static setWidevineDevice(name, value){
        const wvd_combobox = document.getElementById('wvd-combobox');
        const wvd_element = document.createElement('option');

        wvd_element.text = name;
        wvd_element.value = value;

        wvd_combobox.appendChild(wvd_element);
    }

    static async loadSetAllWidevineDevices() {
        const result = await AsyncSyncStorage.getStorage(['devices']);
        const array = result.devices || [];
        for (const item of array) {
            this.setWidevineDevice(item, await this.loadWidevineDevice(item));
        }
    }

    static async saveGlobalSelectedWidevineDevice(name) {
        const config = await SettingsManager.getProfile();
        config.widevine.device.local = name;
        await SettingsManager.setProfile("global", config);
    }

    static async getSelectedWidevineDevice(scope) {
        const config = await SettingsManager.getProfile(scope);
        return config.widevine?.device?.local || "";
    }

    static async selectWidevineDevice(name) {
        document.getElementById('wvd-combobox').value = await this.loadWidevineDevice(name);
    }

    static async removeWidevineDevice(name) {
        const result = await AsyncSyncStorage.getStorage(['devices']);
        const array = result.devices === undefined ? [] : result.devices;

        const index = array.indexOf(name);
        if (index > -1) {
            array.splice(index, 1);
        }

        await AsyncSyncStorage.setStorage({ devices: array });
        await AsyncSyncStorage.removeStorage([name]);
    }
}

export class PRDeviceManager {
    static async savePlayreadyDevice(name, value) {
        const result = await AsyncSyncStorage.getStorage(['prDevices']);
        const array = result.prDevices === undefined ? [] : result.prDevices;
        array.push(name);
        await AsyncSyncStorage.setStorage({ prDevices: array });
        await AsyncSyncStorage.setStorage({ [name]: value });
    }

    static async loadPlayreadyDevice(name) {
        const result = await AsyncSyncStorage.getStorage([name ?? ""]);
        return result[name] || "";
    }

    static setPlayreadyDevice(name, value){
        const prd_combobox = document.getElementById('prd-combobox');
        const prd_element = document.createElement('option');

        prd_element.text = name;
        prd_element.value = value;

        prd_combobox.appendChild(prd_element);
    }

    static async loadSetAllPlayreadyDevices() {
        const result = await AsyncSyncStorage.getStorage(['prDevices']);
        const array = result.prDevices || [];
        for (const item of array) {
            this.setPlayreadyDevice(item, await this.loadPlayreadyDevice(item));
        }
    }

    static async saveGlobalSelectedPlayreadyDevice(name) {
        const config = await SettingsManager.getProfile("global");
        config.playready.device.local = name;
        await SettingsManager.setProfile("global", config);
    }

    static async getSelectedPlayreadyDevice(scope) {
        const config = await SettingsManager.getProfile(scope);
        return config.playready?.device?.local || "";
    }

    static async selectPlayreadyDevice(name) {
        document.getElementById('prd-combobox').value = await this.loadPlayreadyDevice(name);
    }

    static async removePlayreadyDevice(name) {
        const result = await AsyncSyncStorage.getStorage(['prDevices']);
        const array = result.prDevices === undefined ? [] : result.prDevices;

        const index = array.indexOf(name);
        if (index > -1) {
            array.splice(index, 1);
        }

        await AsyncSyncStorage.setStorage({ prDevices: array });
        await AsyncSyncStorage.removeStorage([name]);
    }
}

export class RemoteCDMManager {
    static async saveRemoteCDM(name, obj) {
        const result = await AsyncSyncStorage.getStorage(['remote_cdms']);
        const array = result.remote_cdms === undefined ? [] : result.remote_cdms;
        array.push(name);
        await AsyncSyncStorage.setStorage({ remote_cdms: array });
        await AsyncSyncStorage.setStorage({ [name]: obj });
    }

    static async loadRemoteCDM(name) {
        const result = await AsyncSyncStorage.getStorage([name ?? ""]);
        return JSON.stringify(result[name] || {});
    }

    static setRemoteCDM(name, value) {
        const remote_combobox = document.getElementById('remote-combobox');
        const pr_remote_combobox = document.getElementById('pr-remote-combobox');
        const remote_element = document.createElement('option');

        remote_element.text = name;
        remote_element.value = value;

        const parsed = JSON.parse(value);
        const type = parsed.type || "WIDEVINE";
        if (type === "PLAYREADY") {
            pr_remote_combobox.appendChild(remote_element);
        } else {
            remote_combobox.appendChild(remote_element);
        }
    }

    static async loadSetAllRemoteCDMs() {
        const result = await AsyncSyncStorage.getStorage(['remote_cdms']);
        const array = result.remote_cdms || [];
        for (const item of array) {
            this.setRemoteCDM(item, await this.loadRemoteCDM(item));
        }
    }

    static async saveGlobalSelectedRemoteCDM(name) {
        const config = await SettingsManager.getProfile("global");
        config.widevine.device.remote = name;
        await SettingsManager.setProfile("global", config);
    }

    static async saveGlobalSelectedPRRemoteCDM(name) {
        const config = await SettingsManager.getProfile("global");
        config.playready.device.remote = name;
        await SettingsManager.setProfile("global", config);
    }

    static async getSelectedRemoteCDM(scope) {
        const config = await SettingsManager.getProfile(scope);
        return config.widevine?.device?.remote || "";
    }

    static async getSelectedPRRemoteCDM(scope) {
        const config = await SettingsManager.getProfile(scope);
        return config.playready?.device?.remote || "";
    }

    static async selectRemoteCDM(name) {
        document.getElementById('remote-combobox').value = await this.loadRemoteCDM(name);
    }

    static async selectPRRemoteCDM(name) {
        document.getElementById('pr-remote-combobox').value = await this.loadRemoteCDM(name);
    }

    static async removeRemoteCDM(name) {
        const result = await AsyncSyncStorage.getStorage(['remote_cdms']);
        const array = result.remote_cdms === undefined ? [] : result.remote_cdms;

        const index = array.indexOf(name);
        if (index > -1) {
            array.splice(index, 1);
        }

        await AsyncSyncStorage.setStorage({ remote_cdms: array });
        await AsyncSyncStorage.removeStorage([name]);
    }
}

export class CustomHandlerManager {
    static loadSetAllCustomHandlers() {
        const custom_combobox = document.getElementById('custom-combobox');
        const custom_desc = document.getElementById('custom-desc');
        const pr_custom_combobox = document.getElementById('pr-custom-combobox');
        const pr_custom_desc = document.getElementById('pr-custom-desc');

        for (const handler in CustomHandlers) {
            if (CustomHandlers[handler].disabled) {
                continue;
            }
            const option = document.createElement('option');
            option.text = CustomHandlers[handler].name;
            option.value = handler;
            custom_combobox.appendChild(option);
            pr_custom_combobox.appendChild(option.cloneNode(true));
        }

        custom_desc.innerHTML = CustomHandlers[custom_combobox.value].description;
        pr_custom_desc.innerHTML = CustomHandlers[pr_custom_combobox.value].description;
    }

    static selectCustomHandler(name) {
        document.getElementById('custom-combobox').value = name;
        document.getElementById('custom-desc').textContent = CustomHandlers[name]?.description || "";
    }

    static selectPRCustomHandler(name) {
        document.getElementById('pr-custom-combobox').value = name;
        document.getElementById('pr-custom-desc').textContent = CustomHandlers[name]?.description || "";
    }
}

export class SettingsManager {
    static async getProfile(scope = "global") {
        const result = await AsyncSyncStorage.getStorage([scope ?? "global"]);
        if (result[scope] === undefined) {
            if (scope !== "global") {
                return await this.getProfile("global");
            }
            return {
                "enabled": true,
                "widevine": {
                    "enabled": true,
                    "device": {
                        "local": null,
                        "remote": null,
                        "custom": "supergeneric"
                    },
                    "type": "local"
                },
                "playready": {
                    "enabled": true,
                    "device": {
                        "local": null,
                        "remote": null,
                        "custom": "supergeneric"
                    },
                    "type": "local"
                },
                "clearkey": {
                    "enabled": true
                },
                "blockDisabled": false
            }
        }
        return result[scope];
    }

    static async setProfile(scope, config) {
        await AsyncSyncStorage.setStorage({ [scope]: config });
    }

    static async removeProfile(scope) {
        if (!scope || scope === "global") {
            return;
        }
        await AsyncSyncStorage.removeStorage([scope]);
    }

    static async profileExists(scope) {
        const result = await AsyncSyncStorage.getStorage([scope ?? "global"]);
        return result[scope] !== undefined;
    }

    static async getGlobalEnabled() {
        const config = await SettingsManager.getProfile("global");
        return config.enabled;
    }

    static async setGlobalEnalbed(enabled) {
        const config = await SettingsManager.getProfile("global");
        config.enabled = enabled;
        setIcon(`images/icon${enabled ? '' : '-disabled'}.png`);
        if (enabled) {
            await ScriptManager.registerContentScript();
        } else {
            await ScriptManager.unregisterContentScript();
        }
        await SettingsManager.setProfile("global", config);
    }

    static downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    static async saveDarkMode(dark_mode) {
        await AsyncSyncStorage.setStorage({ dark_mode: dark_mode });
    }

    static async getDarkMode() {
        const result = await AsyncSyncStorage.getStorage(["dark_mode"]);
        return result["dark_mode"] || false;
    }

    static setDarkMode(dark_mode) {
        const toggle = document.getElementById('darkModeToggle');
        toggle.checked = dark_mode;
        document.body.classList.toggle('dark-mode', dark_mode);
    }

    static async importDevice(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async function (loaded) {
                const result = loaded.target.result;

                const widevine_device = new WidevineDevice(result);
                const b64_device = uint8ArrayToBase64(new Uint8Array(result));
                const device_name = widevine_device.get_name();

                if (!await DeviceManager.loadWidevineDevice(device_name)) {
                    await DeviceManager.saveWidevineDevice(device_name, b64_device);
                }

                await DeviceManager.saveGlobalSelectedWidevineDevice(device_name);
                resolve();
            };
            reader.readAsArrayBuffer(file);
        });
    }

    static async loadRemoteCDM(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async function (loaded) {
                const result = loaded.target.result;

                let json_file = void 0;
                try {
                    json_file = JSON.parse(result);
                } catch {
                    resolve();
                    return;
                }

                console.log("LOADED DEVICE:", json_file);
                const remote_cdm = new RemoteCdm(
                    json_file.type || "WIDEVINE",
                    json_file.device_type,
                    json_file.system_id,
                    json_file.security_level,
                    json_file.host,
                    json_file.secret,
                    json_file.device_name ?? json_file.name,
                    json_file.name_override
                );
                const device_name = remote_cdm.get_name();
                console.log("NAME:", device_name);

                if (await RemoteCDMManager.loadRemoteCDM(device_name) === "{}") {
                    await RemoteCDMManager.saveRemoteCDM(device_name, json_file);
                }

                if (json_file.type === "PLAYREADY") {
                    await RemoteCDMManager.saveGlobalSelectedPRRemoteCDM(device_name);
                } else {
                    await RemoteCDMManager.saveGlobalSelectedRemoteCDM(device_name);
                }
                resolve();
            };
            reader.readAsText(file);
        });
    }
    
    static async importPRDevice(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async function (loaded) {
                const result = loaded.target.result;

                const b64_device = uint8ArrayToBase64(new Uint8Array(result));
                const device_name = file.name.slice(0, -4);

                if (!await PRDeviceManager.loadPlayreadyDevice(device_name)) {
                    await PRDeviceManager.savePlayreadyDevice(device_name, b64_device);
                }

                await PRDeviceManager.saveGlobalSelectedPlayreadyDevice(device_name);
                resolve();
            };
            reader.readAsArrayBuffer(file);
        });
    }

    static setSelectedDeviceType(device_type) {
        switch (device_type) {
            case "local":
                const wvd_select = document.getElementById('wvd_select');
                wvd_select.checked = true;
                break;
            case "remote":
                const remote_select = document.getElementById('remote_select');
                remote_select.checked = true;
                break;
            case "custom":
                const custom_select = document.getElementById('custom_select');
                custom_select.checked = true;
        }
    }

    static setSelectedPRDeviceType(device_type) {
        switch (device_type) {
            case "local":
                const prd_select = document.getElementById('prd_select');
                prd_select.checked = true;
                break;
            case "remote":
                const remote_select = document.getElementById('pr_remote_select');
                remote_select.checked = true;
                break;
            case "custom":
                const custom_select = document.getElementById('pr_custom_select');
                custom_select.checked = true;
        }
    }

    static async saveUseShakaPackager(use_shaka) {
        await AsyncSyncStorage.setStorage({ use_shaka: use_shaka });
    }

    static async getUseShakaPackager() {
        const result = await AsyncSyncStorage.getStorage(["use_shaka"]);
        return result["use_shaka"] ?? true;
    }

    static async saveExecutableName(exe_name) {
        await AsyncSyncStorage.setStorage({ exe_name: exe_name });
    }

    static async getExecutableName() {
        const result = await AsyncSyncStorage.getStorage(["exe_name"]);
        return result["exe_name"] ?? "N_m3u8DL-RE";
    }
}

export class ScriptManager {
    static id = "vl-content";

    static async registerContentScript() {
        const existing = await chrome.scripting.getRegisteredContentScripts({
            ids: [this.id]
        });
        if (existing?.length) {
            return;
        }

        await chrome.scripting.registerContentScripts([{
            id: this.id,
            js: ['/content_script.js'],
            matches: ['*://*/*'],
            runAt: 'document_start',
            world: 'MAIN',
            allFrames: true,
            matchOriginAsFallback: true,
            persistAcrossSessions: true
        }]);
    }

    static async unregisterContentScript() {
        try {
            await chrome.scripting.unregisterContentScripts({
                ids: [this.id]
            });
        } catch {
            // not registered
        }
    }
}

export function intToUint8Array(num) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, num, false);
    return new Uint8Array(buffer);
}

export function compareUint8Arrays(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    return Array.from(arr1).every((value, index) => value === arr2[index]);
}

export function uint8ArrayToHex(buffer) {
    return Array.prototype.map.call(buffer, x => x.toString(16).padStart(2, '0')).join('');
}

export function hexToUint8Array(hex) {
    if (typeof hex !== 'string' || hex.length % 2 !== 0)
        throw new Error("Invalid hex string");

    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
}

export function uint8ArrayToString(uint8array) {
    return String.fromCharCode.apply(null, uint8array)
}

export function uint8ArrayToBase64(uint8array) {
    return btoa(String.fromCharCode.apply(null, uint8array));
}

export function base64toUint8Array(base64_string){
    return Uint8Array.from(atob(base64_string), c => c.charCodeAt(0))
}

export function stringToUint8Array(string) {
    return Uint8Array.from(string.split("").map(x => x.charCodeAt()))
}

export function stringToHex(string){
    return string.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("");
}

export function flipUUIDByteOrder(u8arr) {
    const out = new Uint8Array(16);
    out.set([
        u8arr[3], u8arr[2], u8arr[1], u8arr[0], // 4 bytes reversed
        u8arr[5], u8arr[4],                     // 2 bytes reversed
        u8arr[7], u8arr[6],                     // 2 bytes reversed
        ...u8arr.slice(8)                       // last 8 bytes unchanged
    ]);
    return out;
}

// Some services send WV+PR concatenated PSSH to generateRequest
export function getWvPsshFromConcatPssh(psshBase64) {
    const raw = base64toUint8Array(psshBase64);

    let offset = 0;
    while (offset + 8 <= raw.length) {
        const size = new DataView(raw.buffer, raw.byteOffset + offset).getUint32(0);
        if (size === 0 || offset + size > raw.length) break;

        const box = raw.slice(offset, offset + size);
        const boxType = String.fromCharCode(...box.slice(4, 8));
        const systemId = [...box.slice(12, 28)]
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        if (boxType === 'pssh' && systemId === 'edef8ba979d64acea3c827dcd51d21ed') {
            return uint8ArrayToBase64(box);
        }

        offset += size;
    }

    return psshBase64;
}

export async function setIcon(filename, tabId = undefined) {
    const isMV3 = typeof chrome.action !== "undefined";
    if (!isMV3) {
        chrome.browserAction.setIcon({
            path: {
                128: filename
            },
            ...(tabId ? { tabId } : {})
        });
        return;
    }

    const url = chrome.runtime.getURL(filename);
    const res = await fetch(url);
    const blob = await res.blob();
    const bitmap = await createImageBitmap(blob);

    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0);
    const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height);

    chrome.action.setIcon({
        imageData: {
            [bitmap.width]: imageData
        },
        ...(tabId ? { tabId } : {})
    });
}

export async function setBadgeText(text, tabId = undefined) {
    const isMV3 = typeof chrome.action !== "undefined";
    if (!isMV3) {
        chrome.browserAction.setBadgeText({
            text,
            ...(tabId ? { tabId } : {})
        });
        chrome.browserAction.setBadgeBackgroundColor({ color: "#2169eb" });
        return;
    }

    chrome.action.setBadgeText({
        text,
        ...(tabId ? { tabId } : {})
    });
    chrome.action.setBadgeBackgroundColor({ color: "#2169eb" });
}

export async function getForegroundTab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs.length > 0) {
                resolve(tabs[0]);
            }
        });
    });
}

export async function openPopup(url, width, height) {
    const options = { url };
    if (!chrome.windows?.create || navigator.userAgent.includes("Android") || navigator.userAgent.includes("iPhone OS")) {
        options.active = true;
        return await chrome.tabs.create(options);
    }
    options.type = 'popup';
    options.width = width;
    options.height = height;
    return await chrome.windows.create(options);
}

export function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}

export function notifyUser(title, message) {
    if (chrome.notifications?.create) {
        chrome.notifications.create({
            type: "basic",
            iconUrl: chrome.runtime.getURL("images/icon.png"),
            title: title,
            message: message
        })
    } else if (self.alert) {
        alert(message);
    }
}
import "../lib/widevine/protobuf.min.js";
import "../lib/widevine/license_protocol.js";
import { SettingsManager } from "../util.js";

const type = new URL(location.href).searchParams.get('type');
const fileInput = document.getElementById('fileInput');
fileInput.accept = type === "remote" ? ".json" : "." + type;

fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    switch (type) {
        case "wvd":
            await SettingsManager.importDevice(file);
            break;
        case "remote":
            await SettingsManager.loadRemoteCDM(file);
            break;
        case "prd":
            await SettingsManager.importPRDevice(file);
            break;
    }
    document.write("Imported successfully!");
    window.close();
});

document.getElementById('urlImport').addEventListener('click', async () => {
    try {
        const url = document.getElementById('urlInput').value;
        const res = await fetch(url);
        const blob = await res.blob();
        blob.name = decodeURIComponent(url.split('/').pop());
        switch (type) {
            case "wvd":
                await SettingsManager.importDevice(blob);
                break;
            case "remote":
                await SettingsManager.loadRemoteCDM(blob);
                break;
            case "prd":
                await SettingsManager.importPRDevice(blob);
                break;
        }
        document.write("Imported successfully!");
        window.close();
    } catch (e) {
        console.error(e);
        document.write("Failed to import!\n" + e.stack);
    }
});
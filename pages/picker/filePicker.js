import "../../lib/widevine/protobuf.min.js";
import "../../lib/widevine/license_protocol.js";
import { SettingsManager } from "../../util.js";

const type = new URL(location.href).searchParams.get('type');
const fileInput = document.getElementById('fileInput');
fileInput.accept = type === "remote" ? ".json" : "." + type;

async function importDevice(file) {
    const importFunctions = {
        "wvd": SettingsManager.importDevice,
        "prd": SettingsManager.importPRDevice,
        "remote": SettingsManager.loadRemoteCDM
    };
    // Always use this order, as prd validation is not strict
    const order = ['remote', 'wvd', 'prd'];

    for (const type of order) {
        try {
            await importFunctions[type](file);
            console.log(`Imported ${file.name} as ${type}`);
            return true;
        } catch (e) {
            console.warn(`Failed to import ${file.name} as ${type}:`, e);
            // go on
        }
    }
    // real failure
    return false;
}

fileInput.addEventListener('change', async (event) => {
    for (const file of event.target.files) {
        if (!await importDevice(file)) {
            window.resizeTo(800, 600);
            alert("Failed to import device file:", file.name);
        }
    }
    document.write("Imported successfully!"); // For stupid mobile browsers that window.close() doesn't work
    window.close();
});

document.addEventListener("drop", async (event) => {
    event.preventDefault();
    for (const file of event.dataTransfer.files) {
        if (!await importDevice(file)) {
            window.resizeTo(800, 600);
            alert("Failed to import device file:", file.name);
        }
    }
    document.write("Imported successfully!"); // For stupid mobile browsers that window.close() doesn't work
    window.close();
});
window.addEventListener("dragover", e => e.preventDefault());

document.getElementById('urlImport').addEventListener('click', async () => {
    try {
        const url = document.getElementById('urlInput').value;
        const res = await fetch(url);
        const blob = await res.blob();
        blob.name = decodeURIComponent(url.split('/').pop());
        if (!await importDevice(blob)) {
            window.resizeTo(800, 600);
            alert("Failed to import!");
        }
        document.write("Imported successfully!");
        window.close();
    } catch (e) {
        console.error(e);
        alert("Failed to import!\n" + e.stack);
    }
});
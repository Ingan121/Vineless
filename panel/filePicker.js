import "../protobuf.min.js";
    import "../license_protocol.js";
    import { SettingsManager } from "../util.js";

    const fileInput = document.getElementById('fileInput');
    const urlBtn = document.getElementById('urlImport');
    const urlInput = document.getElementById('urlInput');
    const statusEl = document.getElementById('status');
    const drop = document.getElementById('drop');

    const setStatus = (msg) => { statusEl.textContent = msg; };

    function extOf(name = "") {
      const m = /\.([A-Za-z0-9]+)$/.exec(name.toLowerCase());
      return m ? `.${m[1]}` : "";
    }

    async function routeImport(fileOrBlob, filenameHint = "") {
      // Normalize to File (so it has a name)
      const name = (fileOrBlob && fileOrBlob.name) ? fileOrBlob.name : (filenameHint || "unknown");
      const asFile = (fileOrBlob instanceof File)
        ? fileOrBlob
        : new File([fileOrBlob], name, { type: fileOrBlob.type || "application/octet-stream" });

      const ext = extOf(asFile.name);
      setStatus(`Importing "${asFile.name}"…`);

      try {
        if (ext === ".prd") {
          await SettingsManager.importPRDevice(asFile);
        } else if (ext === ".wvd") {
          await SettingsManager.importDevice(asFile);
        } else if (ext === ".json") {
          await SettingsManager.loadRemoteCDM(asFile);
        } else {
          throw new Error(`Unsupported file extension "${ext}". Use .prd, .wvd or .json`);
        }
        setStatus(`✅ Imported successfully: ${asFile.name}`);
        // If you really want to close after success, uncomment:
        window.close();
      } catch (e) {
        console.error(e);
        setStatus(`❌ Failed to import "${asFile.name}"\n${e?.stack || e}`);
      }
    }

    async function fetchAsFile(url) {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      // try to get name from Content-Disposition; fallback to URL path
      const cd = res.headers.get("Content-Disposition") || "";
      let filename = "";
      const m1 = /filename\*?=(?:UTF-8''|")?([^\";]+)/i.exec(cd);
      if (m1) {
        filename = decodeURIComponent(m1[1].replace(/^"+|"+$/g, ''));
      } else {
        try { filename = new URL(url).pathname.split("/").pop() || ""; } catch {}
      }
      if (!filename) filename = "download";
      const blob = await res.blob();
      return new File([blob], filename, { type: blob.type || "application/octet-stream" });
    }

    // File picker
    fileInput.addEventListener('change', async (ev) => {
      const file = ev.target.files?.[0];
      if (!file) return;
      await routeImport(file);
      fileInput.value = ""; // reset
    });

    // URL import
    urlBtn.addEventListener('click', async () => {
      const url = urlInput.value.trim();
      if (!url) { setStatus("Please enter a URL."); return; }
      try {
        setStatus(`Downloading from URL…`);
        const file = await fetchAsFile(url);
        await routeImport(file, file.name);
      } catch (e) {
        console.error(e);
        setStatus(`❌ Failed to import from URL\n${e?.stack || e}`);
      }
    });

    // Drag & drop
    const prevent = (e) => { e.preventDefault(); e.stopPropagation(); };
    ["dragenter","dragover","dragleave","drop"].forEach(evt => {
      drop.addEventListener(evt, prevent, false);
    });
    ["dragenter","dragover"].forEach(evt => drop.addEventListener(evt, () => drop.classList.add("drag")));
    ["dragleave","drop"].forEach(evt => drop.addEventListener(evt, () => drop.classList.remove("drag")));
    drop.addEventListener("drop", async (e) => {
      const file = e.dataTransfer?.files?.[0];
      if (file) await routeImport(file);
    });
(function () {
    // Logging workaround for some stupid sites
    const consoleLogUnaltered = globalThis.console.log;
    const consoleDebugUnaltered = globalThis.console.debug;
    const consoleErrorUnaltered = globalThis.console.error;
    const consoleWarnUnaltered = globalThis.console.warn;
    class console {
        static log(...args) {
            consoleLogUnaltered(...args);
        }
        static debug(...args) {
            consoleDebugUnaltered(...args);
        }
        static error(...args) {
            consoleErrorUnaltered(...args);
        }
        static warn(...args) {
            consoleWarnUnaltered(...args);
        }
    }

    function uint8ArrayToBase64(uint8array) {
        return btoa(String.fromCharCode.apply(null, uint8array));
    }

    function uint8ArrayToString(uint8array) {
        return String.fromCharCode.apply(null, uint8array)
    }

    function base64toUint8Array(base64_string){
        return Uint8Array.from(atob(base64_string), c => c.charCodeAt(0))   
    }

    function uint8ArrayToHex(buffer) {
        return Array.prototype.map.call(buffer, x => x.toString(16).padStart(2, '0')).join('');
    }

    function base64ToBase64Url(b64) {
        return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    function hexToBase64(hexstring) {
        return btoa(hexstring.match(/\w{2}/g).map(function(a) {
            return String.fromCharCode(parseInt(a, 16));
        }).join(""));
    }

    function hexToUint8Array(hex) {
        if (typeof hex !== 'string' || hex.length % 2 !== 0)
            throw new Error("Invalid hex string");

        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }
        return bytes;
    }

    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    function generateClearKeyInitData(keys) {
        const json = JSON.stringify({
            kids: keys.map(key => base64ToBase64Url(uint8ArrayToBase64(hexToUint8Array(key.kid)))),
            type: "temporary"
        });
        return new TextEncoder().encode(json);
    }

    function generateClearKeyLicense(keys) {
        return JSON.stringify({
            keys: keys.map(({ k, kid }) => ({
                kty: "oct",
                alg: "A128KW",
                k: base64ToBase64Url(hexToBase64(k)),
                kid: base64ToBase64Url(hexToBase64(kid))
            })),
            type: "temporary"
        });
    }

    function emitAndWaitForResponse(type, data) {
        return new Promise((resolve) => {
            const requestId = Math.random().toString(16).substring(2, 9);
            const responseHandler = (event) => {
                const { detail } = event;
                if (detail.substring(0, 7) === requestId) {
                    document.removeEventListener('responseReceived', responseHandler);
                    resolve(detail.substring(7));
                }
            };
            document.addEventListener('responseReceived', responseHandler);
            const requestEvent = new CustomEvent('response', {
                detail: {
                    type: type, 
                    body: data,
                    requestId: requestId,
                }
            });
            document.dispatchEvent(requestEvent);
        });
    }

    const fnproxy = (object, func) => new Proxy(object, { apply: func });
    const proxy = (object, key, func) => Object.hasOwnProperty.call(object, key) && Object.defineProperty(object, key, {
        value: fnproxy(object[key], func)
    });

    class Evaluator {
        static isDASH(text) {
            return text.includes('<mpd') && text.includes('</mpd>');
        }

        static isHLS(text) {
            return text.includes('#extm3u');
        }

        static isHLSMaster(text) {
            return text.includes('#ext-x-stream-inf');
        }

        static isMSS(text) {
            return text.includes('<smoothstreamingmedia') && text.includes('</smoothstreamingmedia>');
        }

        static getManifestType(text) {
            const lower = text.toLowerCase();
            if (this.isDASH(lower)) {
                return "DASH";
            } else if (this.isHLS(lower)) {
                if (this.isHLSMaster(lower)) {
                    return "HLS_MASTER";
                } else {
                    return "HLS_PLAYLIST";
                }
            } else if (this.isMSS(lower)) {
                return "MSS";
            }
        }
    }

    const decodingInfoUnaltered = navigator.mediaCapabilities?.decodingInfo;

    async function sanitizeConfigForClearKey(configOrConfigs) {
        const configs = Array.isArray(configOrConfigs) ? configOrConfigs : [configOrConfigs];
        const supportedConfigs = [];

        for (const config of configs) {
            const videoCaps = config.videoCapabilities || [];
            const audioCaps = config.audioCapabilities || [];

            const initDataTypes = config.initDataTypes || ["cenc"];

            const cleanVideoCaps = [];
            const cleanAudioCaps = [];

            for (const [type, caps, cleanList] of [
                ["video", videoCaps, cleanVideoCaps],
                ["audio", audioCaps, cleanAudioCaps]
            ]) {
                for (const cap of caps) {
                    const contentType = cap.contentType;
                    if (!contentType || !MediaSource.isTypeSupported(contentType)) {
                        console.debug("[Vineless] Unsupported contentType:", contentType);
                        continue; // skip if not playable
                    }

                    const mediaConfig = {
                        type: "media-source",
                        [type]: {
                            contentType,
                            robustness: "", // ClearKey must use empty robustness
                            bitrate: 100000,
                            framerate: 30,
                            channels: type === "audio" ? 2 : undefined,
                            width: type === "video" ? 1920 : undefined,
                            height: type === "video" ? 1080 : undefined,
                            samplerate: type === "audio" ? 48000 : undefined
                        },
                        keySystemConfiguration: {
                            keySystem: "org.w3.clearkey",
                            initDataType: "cenc",
                            distinctiveIdentifier: "not-allowed",
                            persistentState: "optional",
                            sessionTypes: ["temporary"]
                        },
                        _ck: true
                    };

                    let supported = true;
                    if (decodingInfoUnaltered) {
                        try {
                            const result = await decodingInfoUnaltered.call(navigator.mediaCapabilities, mediaConfig);
                            supported = result.supported;
                        } catch (e) {
                            supported = false;
                        }
                    }

                    if (supported) {
                        cleanList.push({ contentType, robustness: "" });
                    }
                }
            }

            if (cleanVideoCaps.length || cleanAudioCaps.length) {
                supportedConfigs.push({
                    initDataTypes,
                    distinctiveIdentifier: "not-allowed",
                    persistentState: "optional",
                    sessionTypes: ["temporary"],
                    videoCapabilities: cleanVideoCaps.length ? cleanVideoCaps : undefined,
                    audioCapabilities: cleanAudioCaps.length ? cleanAudioCaps : undefined
                });
            }
        }

        if (!supportedConfigs.length) {
            console.warn("[Vineless] No supported configs for ClearKey, returning empty array");
            return [];
        }

        console.debug("[Vineless] Sanitized config for ClearKey:", supportedConfigs);
        return supportedConfigs;
    }

    function hookKeySystem(Interface) {
        const origKeySystemDescriptor = Object.getOwnPropertyDescriptor(Interface.prototype, 'keySystem');
        const origKeySystemGetter = origKeySystemDescriptor?.get;

        if (typeof origKeySystemGetter !== 'undefined') {
            Object.defineProperty(Interface.prototype, 'keySystem', {
                get() {
                    if (this._emeShim?.origKeySystem) {
                        console.debug("[Vineless] Shimmed keySystem");
                        return this._emeShim.origKeySystem;
                    }
                    return origKeySystemGetter.call(this);
                }
            });
        }
    }

    function flipUUIDByteOrder(u8arr) {
        const out = new Uint8Array(16);
        out.set([
            u8arr[3], u8arr[2], u8arr[1], u8arr[0], // 4 bytes reversed
            u8arr[5], u8arr[4],                     // 2 bytes reversed
            u8arr[7], u8arr[6],                     // 2 bytes reversed
            ...u8arr.slice(8)                       // last 8 bytes unchanged
        ]);
        return out;
    }

    const isFirefox = navigator.userAgent.includes("Firefox") || typeof InstallTrigger !== 'undefined';

    const SERVICE_CERTIFICATE_CHALLENGE = new Uint8Array([0x08, 0x04]);

    const wvRobustnessLevels = [
        "",
        "SW_SECURE_CRYPTO",
        "SW_SECURE_DECODE",
        "HW_SECURE_CRYPTO",
        "HW_SECURE_DECODE",
        "HW_SECURE_ALL"
    ];
    const hdcpLevels = ["0", "1.0", "1.1", "1.2", "1.3", "1.4", "2.0", "2.1", "2.2", "2.3"];

    const keySystems = {
        widevine: [
            "com.widevine.alpha",
            "com.widevine.alpha.experiment",
            "com.widevine.alpha.experiment2",
            "com.widevine.alpha.hr",
            "com.widevine.alpha.hrnoncompositing",
            "com.youtube.widevine.l3",
        ],
        playready: [
            "com.microsoft.playready.recommendation.2000",
            "com.microsoft.playready.recommendation.2000.clearlead",
            "com.microsoft.playready.2000",
            "com.microsoft.playready.software",
            "com.microsoft.playready.recommendation.150",
            "com.microsoft.playready.recommendation.clearlead",
            "com.microsoft.playready.150",
            "com.microsoft.playready.recommendation",
            "com.microsoft.playready",
            "com.chromecast.playready",
            "com.youtube.playready",
        ],
        playready3K: [
            "com.microsoft.playready.recommendation.3000",
            "com.microsoft.playready.recommendation.3000.clearlead",
            "com.microsoft.playready.recommendation.hardware",
            "com.microsoft.playready.3000",
            "com.microsoft.playready.hardware",
        ]
    };
    function isWidevineKeySystem(keySystem) {
        return keySystems.widevine.includes(keySystem);
    }
    function isPlayReadyKeySystem(keySystem) {
        return keySystems.playready.includes(keySystem) || keySystems.playready3K.includes(keySystem);
    }

    (() => {
        const requestMediaKeySystemAccessUnaltered = navigator.requestMediaKeySystemAccess;
        if (!requestMediaKeySystemAccessUnaltered) {
            console.error("[Vineless] EME not available!");
            return;
        }

        let profileConfig = null;

        async function getEnabledForKeySystem(keySystem) {
            if (!profileConfig) {
                profileConfig = JSON.parse(await emitAndWaitForResponse("GET_PROFILE"));
            }
            if (!keySystem) {
                return false;
            }
            if (!profileConfig.enabled) {
                return false;
            }
            if (isWidevineKeySystem(keySystem)) {
                return profileConfig.widevine.enabled;
            } else if (isPlayReadyKeySystem(keySystem)) {
                return profileConfig.playready.enabled;
            } else if (keySystem === "org.w3.clearkey") {
                return profileConfig.clearkey.enabled;
            }
            console.error("[Vineless] Unsupported keySystem:", keySystem);
            return false;
        }

        // Filter out EME config properties that are disallowed by the user config
        function filterEmeProps(keySystem, origConfig) {
            if (!profileConfig.allowPersistence && !origConfig.some(c => !c.sessionTypes || (c.sessionTypes.length === 1 && c.sessionTypes.includes('temporary')))) {
                console.warn("[Vineless] Denying persistent-license due to user preference");
                return false;
            }
            console.debug("[Vineless] filterEmeProps", keySystem, origConfig);
            if (isWidevineKeySystem(keySystem) && profileConfig.widevine.robustness) {
                let maxLevelIndex = wvRobustnessLevels.indexOf(profileConfig.widevine.robustness);
                let videoOk = false, audioOk = false;
                // Check if any of the provided configs are acceptable
                for (const config of origConfig) {
                    if (config.videoCapabilities?.length) {
                        for (const cap of config.videoCapabilities || []) {
                            if (cap.robustness) {
                                const idx = wvRobustnessLevels.indexOf(cap.robustness);
                                if (idx !== -1 && idx <= maxLevelIndex) {
                                    videoOk = true;
                                    break;
                                }
                            } else {
                                videoOk = true; // robustness not specified
                            }
                        }
                    } else {
                        videoOk = true; // videoCapabilities not specified
                    }
                    if (config.audioCapabilities?.length) {
                        for (const cap of config.audioCapabilities || []) {
                            if (cap.robustness) {
                                const idx = wvRobustnessLevels.indexOf(cap.robustness);
                                if (idx !== -1 && idx <= maxLevelIndex) {
                                    audioOk = true;
                                    break;
                                }
                            } else {
                                audioOk = true; // robustness not specified
                            }
                        }
                    } else {
                        audioOk = true; // audioCapabilities not specified
                    }
                }
                console.debug("[Vineless] Robustness check result:", videoOk, audioOk);
                if (!videoOk || !audioOk) {
                    console.warn("[Vineless] Blocked due to robustness level being higher than user preference:", profileConfig.widevine.robustness);
                    return false;
                }
            } else if (isPlayReadyKeySystem(keySystem)) {
                if (!profileConfig.playready.allowSL3K && keySystems.playready3K.includes(keySystem)) {
                    console.warn("[Vineless] Blocked PlayReady SL3000 due to user preference");
                    return false;
                }
                // Firefox only accepts "", "2000", and "3000" (if supported) as robustness values
                // Edge accepts any value, including invalid ones and "3000" in non-SL3000-capable systems
                if (isFirefox) {
                    let videoOk = false, audioOk = false;
                    // Check if any of the provided configs are acceptable
                    for (const config of origConfig) {
                        if (config.videoCapabilities?.length) {
                            for (const cap of config.videoCapabilities || []) {
                                if (cap.robustness) {
                                    switch (cap.robustness + '') {
                                        case "2000":
                                            videoOk = true;
                                            break;
                                        case "3000":
                                            videoOk = profileConfig.playready.allowSL3K;
                                    }
                                } else {
                                    videoOk = true; // robustness not specified or empty
                                }
                            }
                        } else {
                            videoOk = true; // videoCapabilities not specified
                        }
                        if (config.audioCapabilities?.length) {
                            for (const cap of config.audioCapabilities || []) {
                                if (cap.robustness) {
                                    // Only "2000" is supported for audio
                                    if ((cap.robustness + '') === "2000") {
                                        audioOk = true;
                                    }
                                } else {
                                    audioOk = true; // robustness not specified or empty
                                }
                            }
                        } else {
                            audioOk = true; // audioCapabilities not specified
                        }
                    }
                    if (!videoOk || !audioOk) {
                        console.warn("[Vineless] Blocked invalid PlayReady robustness level");
                        return false;
                    }
                }
            }
            return true;
        }

        if (typeof Navigator !== 'undefined') {
            proxy(Navigator.prototype, 'requestMediaKeySystemAccess', async (_target, _this, _args) => {
                console.log("[Vineless] requestMediaKeySystemAccess", structuredClone(_args));
                try {
                    const origKeySystem = _args[0];
                    const origConfig = structuredClone(_args[1]);
                    const enabled = await getEnabledForKeySystem(origKeySystem);
                    if (!enabled && profileConfig.blockDisabled) {
                        console.warn("[Vineless] Blocked a non-Vineless enabled EME keySystem:", origKeySystem);
                        if (isWidevineKeySystem(origKeySystem) && isFirefox) {
                            // Throw a fake Firefox-specific Widevine error message
                            throw new DOMException("Widevine EME disabled", "NotSupportedError");
                        }
                        // Throw a real error for other cases
                        _args[0] = "com.ingan121.vineless.invalid";
                        await _target.apply(_this, _args); // should throw here
                    }
                    if (!filterEmeProps(origKeySystem, origConfig)) {
                        _args[0] = "com.ingan121.vineless.invalid";
                        await _target.apply(_this, _args); // should throw here
                    }
                    if (enabled && origKeySystem !== "org.w3.clearkey") {
                        _args[0] = "org.w3.clearkey";
                        _args[1] = await sanitizeConfigForClearKey(_args[1]);
                    }
                    const systemAccess = await _target.apply(_this, _args);
                    if (enabled) {
                        systemAccess._emeShim = {
                            origKeySystem,
                            persistent: !origConfig.some(c => c.persistentState === "not-allowed")
                        };
                        systemAccess._getRealConfiguration = systemAccess.getConfiguration;
                        systemAccess.getConfiguration = function () {
                            console.debug("[Vineless] Shimmed MediaKeySystemAccess.getConfiguration");
                            return origConfig[0];
                        };
                    }
                    console.debug("[Vineless] requestMediaKeySystemAccess SUCCESS", systemAccess);
                    return systemAccess;
                } catch (e) {
                    console.error("[Vineless] requestMediaKeySystemAccess FAILED", e);
                    throw e;
                }
            });
        }

        if (typeof MediaCapabilities !== 'undefined') {
            proxy(MediaCapabilities.prototype, 'decodingInfo', async (_target, _this, _args) => {
                const [config] = _args;
                if (config._ck) {
                    return await _target.apply(_this, _args);
                }
                const origKeySystem = config?.keySystemConfiguration?.keySystem;

                if (await getEnabledForKeySystem(origKeySystem)) {
                    console.log("[Vineless] Intercepted decodingInfo for", origKeySystem, config);

                    try {
                        const ckConfig = structuredClone(config);

                        // Convert decodingInfo-like config to RMKSA-like structure
                        const ksc = ckConfig.keySystemConfiguration = {
                            initDataTypes: ["cenc"],
                            distinctiveIdentifier: "not-allowed",
                            persistentState: "optional",
                            sessionTypes: ["temporary"],
                            videoCapabilities: [],
                            audioCapabilities: []
                        };

                        if (ckConfig.video?.contentType) {
                            ksc.videoCapabilities.push({
                                contentType: ckConfig.video.contentType,
                                robustness: config.keySystemConfiguration?.video?.robustness || "",
                                encryptionScheme: config.keySystemConfiguration?.video?.encryptionScheme || ""
                            });
                        }
                        if (ckConfig.audio?.contentType) {
                            ksc.audioCapabilities.push({
                                contentType: ckConfig.audio.contentType,
                                robustness: config.keySystemConfiguration?.audio?.robustness || "",
                                encryptionScheme: config.keySystemConfiguration?.audio?.encryptionScheme || ""
                            });
                        }

                        if (!filterEmeProps(origKeySystem, [ksc])) {
                            console.warn("[Vineless] decodingInfo: blocked due to user config");
                            return {
                                supported: false,
                                smooth: false,
                                powerEfficient: false,
                                keySystemAccess: null
                            };
                        }

                        const sanitized = await sanitizeConfigForClearKey(ksc);
                        if (!sanitized.length) {
                            console.warn("[Vineless] decodingInfo: no valid config after sanitization");
                            return {
                                supported: false,
                                smooth: false,
                                powerEfficient: false,
                                keySystemAccess: null
                            };
                        }

                        const originalVideo = ksc.videoCapabilities?.length;
                        const originalAudio = ksc.audioCapabilities?.length;
                        const sanitizedVideo = sanitized[0].videoCapabilities?.length;
                        const sanitizedAudio = sanitized[0].audioCapabilities?.length;

                        if (
                            (originalVideo && !sanitizedVideo) ||
                            (originalAudio && !sanitizedAudio)
                        ) {
                            console.warn("[Vineless] decodingInfo: partial capability failure detected");
                            return {
                                supported: false,
                                smooth: false,
                                powerEfficient: false,
                                keySystemAccess: null
                            };
                        }

                        ckConfig.keySystemConfiguration = sanitized[0];
                        ckConfig.keySystemConfiguration.keySystem = "org.w3.clearkey";

                        const ckResult = await _target.call(_this, ckConfig);

                        const access = await requestMediaKeySystemAccessUnaltered.call(navigator, "org.w3.clearkey", [ckConfig.keySystemConfiguration]);

                        access._emeShim = {
                            origKeySystem,
                            persistent: config.keySystemConfiguration.persistentState !== "not-allowed"
                        };
                        access._getRealConfiguration = access.getConfiguration;

                        // Patch `getConfiguration()` to reflect original input
                        access.getConfiguration = () => ({
                            ...access._getRealConfiguration(),
                            videoCapabilities: ksc.videoCapabilities,
                            audioCapabilities: ksc.audioCapabilities,
                            sessionTypes: ksc.sessionTypes,
                            initDataTypes: ksc.initDataTypes
                        });

                        return {
                            ...ckResult,
                            supported: true,
                            keySystemAccess: access
                        };
                    } catch (e) {
                        console.warn("[Vineless] decodingInfo fallback failed");
                        return {
                            supported: true,
                            smooth: true,
                            powerEfficient: false,
                            keySystemAccess: null
                        };
                    }
                } else if (origKeySystem && profileConfig.blockDisabled) {
                    console.warn("[Vineless] Blocked a non-Vineless enabled EME keySystem:", origKeySystem);
                    return {
                        supported: false,
                        smooth: false,
                        powerEfficient: false,
                        keySystemAccess: null
                    };
                }

                return await _target.apply(_this, _args);
            });
        }

        if (typeof HTMLMediaElement !== 'undefined') {
            proxy(HTMLMediaElement.prototype, 'setMediaKeys', async (_target, _this, _args) => {
                console.log("[Vineless] setMediaKeys", _args);
                const keys = _args[0];
                const keySystem = keys?._emeShim?.origKeySystem;
                if (!await getEnabledForKeySystem(keySystem)) {
                    return await _target.apply(_this, _args);
                }

                // Replace with our own ClearKey MediaKeys
                if (keys._ckConfig) {
                    if (!keys._ckKeys) {
                        const ckAccess = await requestMediaKeySystemAccessUnaltered.call(navigator, 'org.w3.clearkey', [keys._ckConfig]);
                        keys._ckKeys = await ckAccess.createMediaKeys();
                        keys._ckKeys._emeShim = {
                            origMediaKeys: keys
                        };
                    }

                    console.log("[Vineless] Replaced mediaKeys with ClearKey one");

                    return _target.call(_this, keys._ckKeys);
                }

                return _target.apply(_this, _args);
            });

            const origMediaKeysDescriptor = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'mediaKeys');
            const origMediaKeysGetter = origMediaKeysDescriptor?.get;

            if (typeof origMediaKeysGetter !== 'undefined') {
                Object.defineProperty(HTMLMediaElement.prototype, 'mediaKeys', {
                    get() {
                        const result = origMediaKeysGetter.call(this);
                        if (result?._emeShim?.origMediaKeys) {
                            console.debug("[Vineless] Shimmed HTMLMediaElement.mediaKeys");
                            return result._emeShim.origMediaKeys;
                        }
                        return result;
                    }
                });
            }
        }

        if (typeof MediaKeySystemAccess !== 'undefined') {
            proxy(MediaKeySystemAccess.prototype, 'createMediaKeys', async (_target, _this, _args) => {
                console.log("[Vineless] createMediaKeys");

                const realKeys = _target.apply(_this, _args);
                realKeys.then(res => {
                    res._ckConfig = (_this._getRealConfiguration || _this.getConfiguration).call(_this);
                    res._emeShim = _this._emeShim;
                });

                return realKeys;
            });

            hookKeySystem(MediaKeySystemAccess);
        }

        if (typeof MediaKeys !== 'undefined') {
            proxy(MediaKeys.prototype, 'createSession', (_target, _this, _args) => {
                const isInternal = _this._emeShim?.origMediaKeys;
                console[isInternal ? "debug" : "log"]("[Vineless] createSession" + (isInternal ? " (Internal)" : ""), _args[0]);
                // Always use temporary for external sessions as persistence is internally managed by Vineless
                // This ensures that persistent mode works regardless of the browser ClearKey handler's persistence capability
                _args[0] = "temporary";
                const session = _target.apply(_this, _args);
                session._mediaKeys = _this;

                // Create a controlled closed Promise
                let closeResolver;
                session._closedPromise = new Promise(resolve => {
                    closeResolver = resolve;
                });
                session._closeResolver = closeResolver;

                Object.defineProperty(session, 'closed', {
                    get: () => session._closedPromise
                });

                return session;
            });
            proxy(MediaKeys.prototype, 'setServerCertificate', async (_target, _this, _args) => {
                console.log("[Vineless] setServerCertificate", _args[0]);
                const keySystem = _this._emeShim?.origKeySystem;
                if (!await getEnabledForKeySystem(keySystem) || _this._ck) {
                    return await _target.apply(_this, _args);
                }
                if (isWidevineKeySystem(keySystem)) {
                    _this._emeShim.serverCert = uint8ArrayToBase64(new Uint8Array(_args[0]));
                    return true;
                }
                // Server certificates are not supported on ClearKey or PlayReady
                return false;
            });
            proxy(MediaKeys.prototype, 'getStatusForPolicy', async (_target, _this, _args) => {
                const level = _args[0]?.minHdcpVersion;
                console.log("[Vineless] getStatusForPolicy", level);
                const keySystem = _this._emeShim?.origKeySystem;
                if (!await getEnabledForKeySystem(keySystem) || _this._ck) {
                    return await _target.apply(_this, _args);
                }
                const idx = hdcpLevels.indexOf(level);
                if (idx !== -1 && idx <= profileConfig.hdcp) {
                    return "usable";
                }
                return "output-restricted";
            });

            hookKeySystem(MediaKeys);
        }

        if (typeof MediaKeySession !== 'undefined') {
            async function generateRequestLogic(keySystem, initDataType, initData, mediaKeySession) {
                const data = {
                    keySystem: keySystem,
                    sessionId: mediaKeySession.sessionId,
                    initDataType: initDataType,
                    initData: uint8ArrayToBase64(new Uint8Array(initData))
                };
                if (!["webm", "cenc"].includes(initDataType.toLowerCase()) ||
                    (isPlayReadyKeySystem(keySystem) && initDataType.toLowerCase() !== "cenc")
                ) {
                    throw new Error("Unsupported initDataType: " + initDataType);
                }
                if (mediaKeySession._mediaKeys._emeShim.serverCert && profileConfig.widevine.serverCert !== "never") {
                    data.serverCert = mediaKeySession._mediaKeys._emeShim.serverCert;
                }
                const challenge = await emitAndWaitForResponse("REQUEST", JSON.stringify(data));
                if (!challenge || challenge === "null") {
                    console.error("No challenge received from the background script");
                    throw new TypeError(""); // Firefox does this on some CDM errors
                }
                const challengeBytes = base64toUint8Array(challenge);

                const evt = new MediaKeyMessageEvent("message", {
                    message: challengeBytes.buffer,
                    messageType: "license-request"
                });
                mediaKeySession.dispatchEvent(evt);
            }
            async function updateLogic(keySystem, bgResponse, mediaKeySession) {
                if (!bgResponse || bgResponse === "undefined") {
                    console.error("[Vineless] updateLogic FAILED, background script did not return the content keys");
                    return false;
                }

                try {
                    const parsed = JSON.parse(bgResponse);
                    console.log("[Vineless] Received keys from the background script:", parsed, mediaKeySession);
                    if (parsed && mediaKeySession._mediaKeys) {
                        if (!mediaKeySession._mediaKeys._ckKeys) {
                            const ckAccess = await requestMediaKeySystemAccessUnaltered.call(navigator, 'org.w3.clearkey', [mediaKeySession._mediaKeys._ckConfig]);
                            mediaKeySession._mediaKeys._ckKeys = await ckAccess.createMediaKeys();
                            mediaKeySession._mediaKeys._ckKeys._emeShim = {
                                origMediaKeys: mediaKeySession._mediaKeys
                            };
                        }

                        const ckLicense = generateClearKeyLicense(parsed.keys);

                        mediaKeySession._ckSession = mediaKeySession._mediaKeys._ckKeys.createSession();
                        mediaKeySession._ckSession._ck = true;

                        await mediaKeySession._ckSession.generateRequest('keyids', generateClearKeyInitData(parsed.keys));

                        const encoder = new TextEncoder();
                        const encodedLicense = encoder.encode(ckLicense);
                        await mediaKeySession._ckSession.update(encodedLicense);

                        const keyStatuses = new Map();
                        const addedKeys = new Set();
                        for (const { kid } of parsed.keys) {
                            // Some require unflipped one, others (PR only) require flipped one
                            // So include both unless duplicate
                            const raw = hexToUint8Array(kid);
                            if (isPlayReadyKeySystem(keySystem)) {
                                const flipped = flipUUIDByteOrder(raw);

                                for (const keyBytes of [raw, flipped]) {
                                    const keyHex = Array.from(keyBytes).map(b => b.toString(16).padStart(2, '0')).join('');
                                    if (!addedKeys.has(keyHex)) {
                                        keyStatuses.set(keyBytes, "usable");
                                        addedKeys.add(keyHex);
                                    }
                                }
                            } else {
                                // Some services hate having extra keys on Widevine
                                keyStatuses.set(raw, "usable");
                            }
                        }

                        Object.defineProperty(mediaKeySession, "keyStatuses", {
                            value: keyStatuses,
                            writable: false
                        });

                        const keyStatusEvent = new Event("keystatuseschange");
                        mediaKeySession.dispatchEvent(keyStatusEvent);

                        console.debug("[Vineless] updateLogic SUCCESS, keyStatuses:", keyStatuses);
                        return true;
                    } else {
                        console.error("[Vineless] updateLogic FAILED, no MediaKeys available!");
                        return false;
                    }
                } catch (e) {
                    console.error("[Vineless] updateLogic FAILED,", e);
                    // If parsing failed, fall through to original Widevine path
                    return false;
                }
            }
            proxy(MediaKeySession.prototype, 'generateRequest', async (_target, _this, _args) => {
                console[_this._ck ? "debug" : "log"]("[Vineless] generateRequest" + (_this._ck ? " (Internal)" : ""), _args, "sessionId:", _this.sessionId);
                const keySystem = _this._mediaKeys?._emeShim?.origKeySystem;
                if (!await getEnabledForKeySystem(keySystem) || _this._ck) {
                    return await _target.apply(_this, _args);
                }

                if (keySystem === "org.w3.clearkey") {
                    // Not much processing is required for real ClearKey (only update() is important)
                    // Just notify the background script about the playback (for the status icon) and go on
                    await emitAndWaitForResponse("REQUEST");
                    return await _target.apply(_this, _args);
                }

                try {
                    Object.defineProperty(_this, "sessionId", {
                        value: genRanHex(32).toUpperCase(),
                        writable: false
                    });

                    if (isWidevineKeySystem(keySystem) && profileConfig.widevine.serverCert === "always" && !_this._mediaKeys._emeShim.serverCert) {
                        console.debug("[Vineless] generateRequest: Did not receive server certificate in 'always' mode; sending challenge");
                        _this._serverCertChallenge = [..._args];
                        const evt = new MediaKeyMessageEvent("message", {
                            message: SERVICE_CERTIFICATE_CHALLENGE.buffer,
                            messageType: "license-request"
                        });
                        _this.dispatchEvent(evt);
                        return;
                    }

                    await generateRequestLogic(keySystem, _args[0], _args[1], _this);
                    console.debug("[Vineless] generateRequest SUCCESS");
                } catch (e) {
                    console.error("[Vineless] generateRequest FAILED,", e);
                    throw e;
                }

                return;
            });
            proxy(MediaKeySession.prototype, 'update', async (_target, _this, _args) => {
                console[_this._ck ? "debug" : "log"]("[Vineless] update" + (_this._ck ? " (Internal)" : ""), _args, "sessionId:", _this.sessionId);
                const keySystem = _this._mediaKeys?._emeShim?.origKeySystem;
                if (!await getEnabledForKeySystem(keySystem) || _this._ck) {
                    !_this._ck && _this.addEventListener('keystatuseschange', () => {
                        const kidStasuses = {};
                        for (const [keyId, status] of _this.keyStatuses) {
                            kidStasuses[uint8ArrayToHex(new Uint8Array(keyId))] = status;
                        }
                        console.log("[Vineless] keyStatuses:", kidStasuses);
                    });
                    return await _target.apply(_this, _args);
                }

                const [response] = _args;
                if (_this._serverCertChallenge) {
                    _this._mediaKeys._emeShim.serverCert = uint8ArrayToBase64(new Uint8Array(response).slice(5));
                    const [ initDataType, initData ] = _this._serverCertChallenge;
                    await generateRequestLogic(keySystem, initDataType, initData, _this);
                    delete _this._serverCertChallenge;
                    console.debug("[Vineless] update: Server certificate exchange successful");
                    return;
                }

                const base64Response = uint8ArrayToBase64(new Uint8Array(response));
                const data = {
                    keySystem: keySystem,
                    sessionId: _this.sessionId,
                    license: base64Response,
                    persistent: _this._mediaKeys._emeShim.persistent
                };
                const bgResponse = await emitAndWaitForResponse("RESPONSE", JSON.stringify(data));

                if (await updateLogic(keySystem, bgResponse, _this)) {
                    console.debug("[Vineless] update SUCCESS");
                    return;
                }

                return await _target.apply(_this, _args);
            });
            proxy(MediaKeySession.prototype, 'load', async (_target, _this, _args) => {
                const [sessionId] = _args;
                console.log("[Vineless] load", sessionId);
                const keySystem = _this?._mediaKeys?._emeShim?.origKeySystem;
                if (!await getEnabledForKeySystem(keySystem) || _this._ck) {
                    return await _target.apply(_this, _args);
                }

                const data = {
                    keySystem: keySystem,
                    sessionId: sessionId
                };
                const bgResponse = await emitAndWaitForResponse("LOAD", JSON.stringify(data));

                Object.defineProperty(_this, "sessionId", {
                    value: sessionId,
                    writable: false
                });

                if (await updateLogic(keySystem, bgResponse, _this)) {
                    console.debug("[Vineless] load SUCCESS");
                    return true;
                }

                return await _target.apply(_this, _args);
            });
            proxy(MediaKeySession.prototype, 'remove', async (_target, _this, _args) => {
                console.log("[Vineless] remove");
                const keySystem = _this?._mediaKeys?._emeShim?.origKeySystem;
                if (!await getEnabledForKeySystem(keySystem) || _this._ck) {
                    return await _target.apply(_this, _args);
                }

                await emitAndWaitForResponse("REMOVE", _this.sessionId);
                return;
            });
            proxy(MediaKeySession.prototype, 'close', async (_target, _this, _args) => {
                console.log("[Vineless] close");
                const keySystem = _this?._mediaKeys?._emeShim?.origKeySystem;

                // Mark closed
                if (_this._closeResolver) {
                    _this._closeResolver({result: "closed-by-application"});
                }

                if (!await getEnabledForKeySystem(keySystem) || _this._ck) {
                    return await _target.apply(_this, _args);
                }

                // Close internal session if found
                if (_this._ckSession) {
                    try {
                        await _this._ckSession.close();
                    } catch (e) {}
                }

                await emitAndWaitForResponse("CLOSE");

                return Promise.resolve();
            });
        }
    })();

    const originalFetch = window.fetch;
    window.fetch = function() {
        return new Promise(async (resolve, reject) => {
            originalFetch.apply(this, arguments).then((response) => {
                if (response) {
                    response.clone().text().then((text) => {
                        const manifest_type = Evaluator.getManifestType(text);
                        if (manifest_type) {
                            if (arguments.length === 1) {
                                emitAndWaitForResponse("MANIFEST", JSON.stringify({
                                    "url": arguments[0].url,
                                    "type": manifest_type,
                                }));
                            } else if (arguments.length === 2) {
                                emitAndWaitForResponse("MANIFEST", JSON.stringify({
                                    "url": arguments[0],
                                    "type": manifest_type,
                                }));
                            }
                        }
                        resolve(response);
                    }).catch(() => {
                        resolve(response);
                    })
                } else {
                    resolve(response);
                }
            }).catch(() => {
                resolve();
            })
        })
    }

    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        this._method = method;
        return open.apply(this, arguments);
    };

    const send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(postData) {
        this.addEventListener('load', async function() {
            if (this._method === "GET") {
                let body = void 0;
                switch (this.responseType) {
                    case "":
                    case "text":
                        body = this.responseText ?? this.response;
                        break;
                    case "json":
                        // TODO: untested
                        body = JSON.stringify(this.response);
                        break;
                    case "arraybuffer":
                        // TODO: untested
                        if (this.response.byteLength) {
                            const response = new Uint8Array(this.response);
                            body = uint8ArrayToString(new Uint8Array([...response.slice(0, 2000), ...response.slice(-2000)]));
                        }
                        break;
                    case "document":
                        // todo
                        break;
                    case "blob":
                        body = await this.response.text();
                        break;
                }
                if (body) {
                    const manifest_type = Evaluator.getManifestType(body);
                    if (manifest_type) {
                        emitAndWaitForResponse("MANIFEST", JSON.stringify({
                            "url": this.responseURL,
                            "type": manifest_type,
                        }));
                    }
                }
            }
        });
        return send.apply(this, arguments);
    };
})();
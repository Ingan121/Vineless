# Vineless
* A browser extension to play DRM-protected content without a real CDM
* Works by redirecting the content keys to the browser's ClearKey handler

## Features
+ User-friendly / GUI-based
+ Supports Widevine and PlayReady-protected content
+ Manifest V3 compliant

## Devices
* This addon requires a Widevine/PlayReady Device file to work. Don't ask me where to get those.

## Compatibility
+ Should be compatible with all modern browsers that supports the standard EME, the ClearKey CDM, and the Manifest V3 extensions
+ Tested browsers: Chrome, Edge, Firefox, Marble, and Supermium on Windows
+ Incompatible browsers:
  + Tor Browser (does not support ClearKey)
  + Many mobile browsers, including Firefox (Stable/Nightly), and Kiwi Browser (does not support ClearKey)
  + Internet Explorer, obviously.
+ Works with any service that accepts challenges from Android devices on the same endpoint.
+ Incompatible services:
  + Netflix (unless a browser/PC device is provided, which is rare)
+ Some services may detect your browser and interfere with PlayReady playback. Try using a user-agent changer extension, or use a Chromium-based browser for PlayReady playback.
+ Incompatible extensions:
  + WidevineProxy2, or anything similar
  + PlayreadyProxy2, or anything similar
  + EME Call and Event Logger (extension, not the userscript)
  + For Vineless to work, these extensions must be fully disabled in the browser's extensions page

## Installation
+ Chrome
  1. Download the ZIP file from the [releases section](https://github.com/Ingan121/Vineless/releases)
  2. Navigate to `chrome://extensions/`
  3. Enable `Developer mode`
  4. Drag-and-drop the downloaded file into the window
+ Firefox
  + Persistent installation
    1. Download the XPI file from the [releases section](https://github.com/Ingan121/Vineless/releases)
    2. Navigate to `about:addons`
    3. Click the settings icon and choose `Install Add-on From File...`
    4. Select the downloaded file
  + Temporary installation
    1. Download the ZIP file from the [releases section](https://github.com/Ingan121/Vineless/releases)
    2. Navigate to `about:debugging#/runtime/this-firefox`
    3. Click `Load Temporary Add-on...` and select the downloaded file

## Setup
+ Open the extension and click one of the `Choose File` buttons to select device files
+ Select the type of device you're using in the top `Systems` section
+ The files are saved in the extension's `chrome.storage.sync` storage and will be synchronized across any browsers into which the user is signed in with their Google account.
+ The maximum number of devices is ~25 Local **OR** ~200 Remote CDMs
+ Check `Enabled` to activate the message interception and you're done.

## Usage
All the user has to do is to play a DRM protected video. With everything set up properly, videos will start to play even without a supported DRM system.

## FAQ
> What if I'm unable to play the video?

* First, check if the service accepts your device (CDM).
  * For Widevine, use either [WidevineProxy2](https://github.com/DevLARLEY/WidevineProxy2) or [openwv](https://github.com/tchebb/openwv) with the same WVD file.
  * For PlayReady, use [PlayreadyProxy2](https://github.com/DevLARLEY/PlayreadyProxy2/) with the same PRD file.
  * For ClearKey, just fully disable Vineless and test the playback with the non-intercepted ClearKey handler.
  * Do note that WidevineProxy2 and PlayreadyProxy2 do not support playback, so just test if you can acquire the keys with them. Also, fully disable Vineless before testing those two.
* If those aren't working as well, this automatically means that the license server is blocking your CDM and that you either need a CDM from a physical device, a ChromeCDM, or an L1 Android CDM. Don't ask where you can get these.
* If those are working but Vineless isn't working, please report this on the issues page. Please include the DevTools console logs as well, and make sure the verbose/debug logs are enabled.

## Disclaimer
+ This program is intended solely for educational purposes.
+ Do not use this program to decrypt or access any content for which you do not have the legal rights or explicit permission.
+ Unauthorized decryption or distribution of copyrighted materials is a violation of applicable laws and intellectual property rights.
+ This tool must not be used for any illegal activities, including but not limited to piracy, circumventing digital rights management (DRM), or unauthorized access to protected content.
+ The developers, contributors, and maintainers of this program are not responsible for any misuse or illegal activities performed using this software.
+ By using this program, you agree to comply with all applicable laws and regulations governing digital rights and copyright protections.

## Credits
+ [WidevineProxy2](https://github.com/DevLARLEY/WidevineProxy2)
+ [PlayreadyProxy2](https://github.com/DevLARLEY/PlayreadyProxy2/tree/f4965f809dbea1a309e1fd50c072f50bf08fb03c)
+ [node-widevine](https://github.com/Frooastside/node-widevine)
+ [forge](https://github.com/digitalbazaar/forge)
+ [protobuf.js](https://github.com/protobufjs/protobuf.js)
+ [noble-curves](https://github.com/paulmillr/noble-curves)
+ [xmldom](https://github.com/xmldom/xmldom)
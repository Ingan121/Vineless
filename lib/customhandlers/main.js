import HardcodedDevice from "./hardcoded.js";
import KnownKeysDevice from "./knownkeys.js";

// add your handlers here
export const CustomHandlers = {
    "hardcoded": {
        "name": "Hardcoded Example Custom Handler",
        "description": "Simple custom handler for testing. Values must be changed by directly editing the source. Don't use this unless you're testing the extension.",
        "handler": HardcodedDevice,
        // "for": "widevine" // or "playready", omit for both
        "disabled": true
    },
    "knownkeys": {
        "name": "Play with Known Keys",
        "description": "Play protected videos using keys from the saved logs, without actually doing a license exchange. Some services may reject this method.",
        "handler": KnownKeysDevice,
        "for": "widevine"
    }
};
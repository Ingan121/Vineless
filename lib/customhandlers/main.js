import HardcodedDevice from "./hardcoded.js";
import SuperGenericApiDevice from "./supergeneric.js";

// add your handlers here
export const CustomHandlers = {
    "hardcoded": {
        "disabled": true,
        "name": "Hardcoded Example Custom Handler",
        "description": "Simple custom handler for testing. Values must be changed by directly editing the source. Don't use this unless you're testing the extension.",
        "handler": HardcodedDevice
    },
    "supergeneric": {
        "name": "Super Generic Remote API Handler",
        "description": "Extensible interface that can handle various remote API specs. Valid SuperGeneric remote device JSON must be selected in the remote device selection field.",
        "handler": SuperGenericApiDevice
    }
};
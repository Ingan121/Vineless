import HardcodedDevice from "./hardcoded.js";

// add your handlers here
export const CustomHandlers = {
    "hardcoded": {
        "name": "Hardcoded Example Custom Handler",
        "description": "Simple custom handler for testing. Values must be changed by directly editing the source. Don't use this unless you're testing the extension.",
        "handler": HardcodedDevice,
        "disabled": true
    }
};
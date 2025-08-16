import HardcodedDevice from "./hardcoded.js";
import SuperGenericApiDevice from "./supergeneric.js";

// add your handlers here
export const customHandlers = {
    "hardcoded": HardcodedDevice,
    "supergeneric": SuperGenericApiDevice
};
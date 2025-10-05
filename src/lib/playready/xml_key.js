import { EccKey } from "./ecc_key.js";
import { utils } from "./noble-curves.min.js";

export class XmlKey {
    constructor() {
        this._shared_point = EccKey.generate();
        this.shared_x_key = this._shared_point.publicKey.x;
        this.shared_y_key = this._shared_point.publicKey.y;

        const shared_key_x_bytes = utils.numberToBytesBE(this.shared_x_key, 32);
        this.aes_iv = shared_key_x_bytes.subarray(0, 16);
        this.aes_key = shared_key_x_bytes.subarray(16, 32);
    }

    get_point() {
        return this._shared_point.publicKey;
    }
}
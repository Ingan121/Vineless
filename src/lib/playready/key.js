export class Key {
    constructor(key_id, key_type, cipher_type, key) {
        this.key_id = this._swapEndianess(key_id);
        this.key_type = key_type;
        this.cipher_type = cipher_type;
        this.key = key;
    }

    _swapEndianess(uuidBytes) {
        return new Uint8Array([
            uuidBytes[3], uuidBytes[2], uuidBytes[1], uuidBytes[0],
            uuidBytes[5], uuidBytes[4],
            uuidBytes[7], uuidBytes[6],
            uuidBytes[8], uuidBytes[9],
            ...uuidBytes.slice(10, 16)
        ]);
    }
}
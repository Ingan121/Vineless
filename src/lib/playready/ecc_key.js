import { p256, utils } from './noble-curves.min.js';
import { Crypto } from "./crypto.js";
import {Utils} from "./utils.js";

export class EccKey {
    constructor(privateKey, publicKey) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }

    static randomScalar() {
        const randomBytes = Crypto.randomBytes(32);
        return utils.bytesToNumberBE(randomBytes) % p256.CURVE.n;
    }

    static generate() {
        const privateKey = EccKey.randomScalar();
        const publicKey = p256.ProjectivePoint.BASE.multiply(privateKey).toAffine();
        return new EccKey(privateKey, publicKey);
    }

    static construct(privateKey) {
        const publicKey = p256.ProjectivePoint.BASE.multiply(privateKey).toAffine();
        return new EccKey(privateKey, publicKey);
    }

    static loads(bytes) {
        const privateBytes = bytes.subarray(0, 32);
        return EccKey.construct(utils.bytesToNumberBE(privateBytes));
    }

    dumps() {
        return new Uint8Array([
            ...this.privateBytes(),
            ...this.publicBytes()
        ]);
    }

    privateBytes() {
        return utils.numberToBytesBE(this.privateKey, 32);
    }

    publicBytes() {
        return new Uint8Array([
            ...utils.numberToBytesBE(this.publicKey.x, 32),
            ...utils.numberToBytesBE(this.publicKey.y, 32)
        ]);
    }

    privateSha256Digest() {
        return Crypto.sha256(Utils.bytesToString(this.publicBytes()));
    }
}
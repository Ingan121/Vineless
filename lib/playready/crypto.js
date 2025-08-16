import { Utils } from "./utils.js";
import { p256, utils } from './noble-curves.min.js';
import { ElGamal } from "./elgamal.js";
import '../forge.min.js';

export class Crypto {
    static ecc256decrypt(private_key, ciphertext) {
        const decrypted = ElGamal.decrypt(
            {
                point1: {
                    x: utils.bytesToNumberBE(ciphertext.subarray(0, 32)),
                    y: utils.bytesToNumberBE(ciphertext.subarray(32, 64))
                },
                point2: {
                    x: utils.bytesToNumberBE(ciphertext.subarray(64, 96)),
                    y: utils.bytesToNumberBE(ciphertext.subarray(96, 128))
                }
            },
            private_key
        );

        return utils.numberToBytesBE(decrypted.x, 32);
    }

    static ecc256Sign(private_key, data) {
        return p256.sign(
            Crypto.sha256(data),
            private_key
        );
    }

    static aesCbcEncrypt(key, iv, data) {
        const cipher = forge.cipher.createCipher(
            'AES-CBC',
            forge.util.createBuffer(key, 'raw')
        );

        cipher.start({
            iv: forge.util.createBuffer(iv, 'raw').getBytes()
        });

        cipher.update(forge.util.createBuffer(data, 'raw'));
        cipher.finish();

        return Utils.stringToBytes(cipher.output.getBytes());
    }

    static aesEcbEncrypt(key, data) {
        const cipher = forge.cipher.createCipher(
            'AES-ECB',
            forge.util.createBuffer(key, 'raw')
        );

        cipher.mode.pad = function(){};
        cipher.mode.unpad = function(){};

        cipher.start();
        cipher.update(forge.util.createBuffer(data, 'raw'));
        cipher.finish();

        return Utils.stringToBytes(cipher.output.getBytes());
    }

    static sha256(data) {
        const md = forge.md.sha256.create();
        md.update(data);
        return Utils.stringToBytes(md.digest().getBytes());
    }

    static randomBytes(size) {
        const randomBytes = new Uint8Array(size);
        crypto.getRandomValues(randomBytes);
        return randomBytes;
    }
}
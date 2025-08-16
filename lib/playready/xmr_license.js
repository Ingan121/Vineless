import { BinaryReader, Utils } from "./utils.js";
import { AES_CMAC } from "./cmac.js";

class _SignatureObject {
    constructor(reader) {
        this.signature_type = reader.readUint16();
        this.signature_data_length = reader.readUint16();
        this.signature_data = reader.readBytes(this.signature_data_length);
    }
}

class _AuxiliaryKey {
    constructor(reader) {
        this.location = reader.readUint32();
        this.key = reader.readBytes(16);
    }
}

class _AuxiliaryKeysObject {
    constructor(reader) {
        this.count = reader.readUint16();
        this.auxiliary_keys = [];
        for (let i = 0; i < this.count; i++) {
            this.auxiliary_keys.push(new _AuxiliaryKey(reader));
        }
    }
}

class _ContentKeyObject {
    constructor(reader) {
        this.key_id = reader.readBytes(16);
        this.key_type = reader.readUint16();
        this.cipher_type = reader.readUint16();
        this.key_length = reader.readUint16();
        this.encrypted_key = reader.readBytes(this.key_length);
    }
}

class _XmrObject {
    constructor(reader) {
        this.flags = reader.readUint16();
        this.type = reader.readUint16();
        this.length = reader.readUint32();
        this.data = null;
        if (this.flags === 0 || this.flags === 1) {
            switch (this.type) {
                case 10:
                    this.data = new _ContentKeyObject(reader);
                    break;
                case 11:
                    this.data = new _SignatureObject(reader);
                    break;
                case 81:
                    this.data = new _AuxiliaryKeysObject(reader);
                    break;
                default:
                    this.data = reader.readBytes(this.length - 8);
            }
        }
    }
}

class _XmrLicense {
    constructor(reader) {
        this.signature = reader.readBytes(4);
        this.xmr_version = reader.readUint32();
        this.rights_id = reader.readBytes(16);
        this.containers = [];
        while (reader.length > reader.offset) {
            this.containers.push(new _XmrObject(reader));
        }
    }
}

export class XmrLicense {
    constructor(reader, license_obj) {
        this._reader = reader;
        this._license_obj = license_obj;
    }

    static loads(bytes) {
        const reader = new BinaryReader(bytes);
        return new XmrLicense(reader, new _XmrLicense(reader));
    }

    getObjects(type) {
        return this._license_obj.containers.filter(obj => obj.type === type);
    }

    checkSignature(integrity_key) {
        const signatureObject = this.getObjects(11)[0].data;
        const raw_data = this._reader._raw_bytes;

        const cmac = new AES_CMAC(integrity_key);
        const signatureData = raw_data.subarray(0, raw_data.length - (signatureObject.signature_data_length + 12));
        const signature = cmac.calculate(signatureData);

        return Utils.compareArrays(signature, signatureObject.signature_data);
    }
}

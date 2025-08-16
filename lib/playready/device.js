import { BinaryReader } from "./utils.js";

export class Device {
    constructor(bytes) {
        this._reader = new BinaryReader(bytes);

        this._reader.readBytes(3);
        this.version = this._reader.readUint8();
        switch (this.version) {
            case 2:
                this.group_certificate_len = this._reader.readUint32();
                this.group_certificate = this._reader.readBytes(this.group_certificate_len);
                this.encryption_key = this._reader.readBytes(96);
                this.signing_key = this._reader.readBytes(96);
                break;
            case 3:
                this.group_key = this._reader.readBytes(96);
                this.encryption_key = this._reader.readBytes(96);
                this.signing_key = this._reader.readBytes(96);
                this.group_certificate_len = this._reader.readUint32();
                this.group_certificate = this._reader.readBytes(this.group_certificate_len);
                break;
        }
    }
}

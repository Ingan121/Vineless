export class Utils {
    static bytesToString(bytes) {
        return String.fromCharCode.apply(null, bytes);
    }

    static stringToBytes(string) {
        return Uint8Array.from(string.split("").map(x => x.charCodeAt()));
    }

    static tryGetUtf16Le(bytes) {
        if (bytes.length % 2 !== 0) {
            return null;
        }

        for (let i = 1; i < bytes.length; i += 2) {
            if (bytes[i] !== 0) {
                return null;
            }
        }

        try {
            const decoder = new TextDecoder('utf-16le', { fatal: true });
            return decoder.decode(bytes);
        } catch (e) {
            return null;
        }
    }

    static compareArrays(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        return Array.from(arr1).every((value, index) => value === arr2[index]);
    }

    static base64ToBytes(base64_string){
        return Uint8Array.from(atob(base64_string), c => c.charCodeAt(0));
    }

    static bytesToBase64(uint8array) {
        return btoa(String.fromCharCode.apply(null, uint8array));
    }

    static xorArrays(arr1, arr2) {
        return new Uint8Array(arr1.map((byte, i) => byte ^ arr2[i]));
    }
}

export class BinaryReader {
    constructor(data) {
        this.offset = 0;
        this.length = data.length;
        this._raw_bytes = new Uint8Array(data);
        this._data_view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    }

    readUint8(){
        return this._data_view.getUint8(this.offset++);
    }

    readUint16(little){
        const result = this._data_view.getUint16(this.offset, little);
        this.offset += 2;
        return result;
    }

    readUint32(little){
        const result = this._data_view.getUint32(this.offset, little);
        this.offset += 4;
        return result;
    }

    readBytes(size){
        const result = this._raw_bytes.subarray(this.offset, this.offset + size);
        this.offset += size;
        return result;
    }

    reset() {
        this._data_view = new DataView(this._raw_bytes.buffer);
        this.offset = 0;
    }
}

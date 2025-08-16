const { ClientIdentification, SignedDrmCertificate, DrmCertificate } = protobuf.roots.default.license_protocol;

export class Crc32 {
    constructor() {
        this.crc_table = this.setupTable();
    }

    setupTable() {
        let c;
        const crcTable = [];
        for (let n = 0; n < 256; n++) {
            c = n;
            for (let k = 0; k < 8; k++) {
                c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
            }
            crcTable[n] = c;
        }
        return crcTable;
    }

    crc32(uint8Array) {
        let crc = 0 ^ (-1);
        for (let i = 0; i < uint8Array.length; i++) {
            crc = (crc >>> 8) ^ this.crc_table[(crc ^ uint8Array[i]) & 0xFF];
        }
        return (crc ^ (-1)) >>> 0;
    }
}

export class WidevineDevice {
    constructor(bytes) {
        this._raw_bytes = new Uint8Array(bytes);
        this._data_view = new DataView(bytes);

        this.version = this._data_view.getUint8(3);
        this.type = this._data_view.getUint8(4);
        this.security_level = this._data_view.getUint8(5);
        this.flags = this._data_view.getUint8(6);

        this.private_key_len = this._data_view.getUint16(7);
        this.private_key = this._raw_bytes.subarray(9, 9 + this.private_key_len);

        this.client_id_len = this._data_view.getUint16(9 + this.private_key_len);
        this.client_id_bytes = this._raw_bytes.subarray(11 + this.private_key_len, 11 + this.private_key_len + this.client_id_len);
        this.client_id = ClientIdentification.decode(this.client_id_bytes);
    }

    get_name() {
        const client_info = Object.fromEntries(this.client_id.clientInfo.map(item => [item.name, item.value]))
        const type = this.type === 1 ? "CHROME" : `L${this.security_level}`

        const root_signed_cert = SignedDrmCertificate.decode(this.client_id.token);
        const root_cert = DrmCertificate.decode(root_signed_cert.drmCertificate);

        let name = `[${type}]`;
        if (client_info["company_name"])
            name += ` ${client_info["company_name"]}`;
        if (client_info["model_name"])
            name += ` ${client_info["model_name"]}`;
        if (client_info["product_name"])
            name += ` ${client_info["product_name"]}`;
        if (root_cert.systemId)
            name += ` (${root_cert.systemId})`;

        const crc32 = new Crc32();
        name += ` [${crc32.crc32(this._raw_bytes).toString(16)}]`;

        return name;
    }
}

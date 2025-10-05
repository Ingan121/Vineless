import { ElGamal } from "./elgamal.js";
import { Crypto } from "./crypto.js";
import { EccKey } from "./ecc_key.js";
import { Utils } from "./utils.js";
import { Key } from "./key.js";
import { utils } from "./noble-curves.min.js";
import { XmrLicense } from "./xmr_license.js";
import { DOMParser } from './xmldom.min.js';
import { XmlKey } from "./xml_key.js";

export class Cdm {
    constructor(certificate_chain, encryption_key, signing_key) {
        this.certificate_chain = certificate_chain;
        this.encryption_key = EccKey.loads(encryption_key);
        this.signing_key = EccKey.loads(signing_key);

        this.rgbMagicConstantZero = new Uint8Array([0x7e, 0xe9, 0xed, 0x4a, 0xf7, 0x73, 0x22, 0x4f, 0x00, 0xb8, 0xea, 0x7e, 0xfb, 0x02, 0x7c, 0xbb]);
        this._wmrmServerKey = {
            x: 90785344306297710604867503975059265028223978614363440949957868233137570135451n,
            y: 68827801477692731286297993103001909218341737652466656881935707825713852622178n
        };

        this.parser = new DOMParser();
    }

    static fromDevice(device) {
        return new Cdm(
            device.group_certificate,
            device.encryption_key,
            device.signing_key
        );
    }

    _getKeyCipher(xml_key) {
        const encrypted = ElGamal.encrypt(xml_key.get_point(), this._wmrmServerKey);
        return new Uint8Array([
            ...utils.numberToBytesBE(encrypted.point1.x, 32),
            ...utils.numberToBytesBE(encrypted.point1.y, 32),
            ...utils.numberToBytesBE(encrypted.point2.x, 32),
            ...utils.numberToBytesBE(encrypted.point2.y, 32)
        ]);
    }

    _getDataCipher(xml_key) {
        const b64CertificateChain = Utils.bytesToBase64(this.certificate_chain);
        const body = `<Data><CertificateChains><CertificateChain>${b64CertificateChain}</CertificateChain></CertificateChains><Features><Feature Name="AESCBC">""</Feature><REE><AESCBCS></AESCBCS></REE></Features></Data>`;

        const ciphertext = Crypto.aesCbcEncrypt(
            xml_key.aes_key,
            xml_key.aes_iv,
            Utils.stringToBytes(body)
        );

        return new Uint8Array([
            ...xml_key.aes_iv,
            ...ciphertext
        ]);
    }

    _buildDigestInfo(digest_value) {
        return (
            `<SignedInfo xmlns="http://www.w3.org/2000/09/xmldsig#">` +
                `<CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"></CanonicalizationMethod>` +
                `<SignatureMethod Algorithm="http://schemas.microsoft.com/DRM/2007/03/protocols#ecdsa-sha256"></SignatureMethod>` +
                `<Reference URI="#SignedData">` +
                    `<DigestMethod Algorithm="http://schemas.microsoft.com/DRM/2007/03/protocols#sha256"></DigestMethod>` +
                    `<DigestValue>${digest_value}</DigestValue>` +
                `</Reference>` +
            `</SignedInfo>`
        );
    }

    _buildDigestContent(content_header, nonce, key_cipher, data_cipher, rev_lists, protocol_version, client_version) {
        const clientTime = Math.floor(Date.now() / 1000);

        return (
            `<LA xmlns="http://schemas.microsoft.com/DRM/2007/03/protocols" Id="SignedData" xml:space="preserve">` +
                `<Version>${protocol_version}</Version>` +
                `<ContentHeader>${content_header}</ContentHeader>` +
                `<CLIENTINFO>` +
                    `<CLIENTVERSION>${client_version}</CLIENTVERSION>` +
                `</CLIENTINFO>` +
                rev_lists +
                `<LicenseNonce>${nonce}</LicenseNonce>` +
                `<ClientTime>${clientTime}</ClientTime>` +
                `<EncryptedData xmlns="http://www.w3.org/2001/04/xmlenc#" Type="http://www.w3.org/2001/04/xmlenc#Element">` +
                    `<EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes128-cbc"></EncryptionMethod>` +
                    `<KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#">` +
                        `<EncryptedKey xmlns="http://www.w3.org/2001/04/xmlenc#">` +
                            `<EncryptionMethod Algorithm="http://schemas.microsoft.com/DRM/2007/03/protocols#ecc256"></EncryptionMethod>` +
                            `<KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#">` +
                                `<KeyName>WMRMServer</KeyName>` +
                            `</KeyInfo>` +
                            `<CipherData>` +
                                `<CipherValue>${key_cipher}</CipherValue>` +
                            `</CipherData>` +
                        `</EncryptedKey>` +
                    `</KeyInfo>` +
                    `<CipherData>` +
                        `<CipherValue>${data_cipher}</CipherValue>` +
                    `</CipherData>` +
                `</EncryptedData>` +
            `</LA>`
        );
    }

    _buildMainBody(la_content, signed_info, signature_value, public_key) {
        return (
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<soap:Body>' +
                '<AcquireLicense xmlns="http://schemas.microsoft.com/DRM/2007/03/protocols">' +
                    '<challenge>' +
                        '<Challenge xmlns="http://schemas.microsoft.com/DRM/2007/03/protocols/messages">' +
                            la_content +
                            '<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">' +
                                signed_info +
                                `<SignatureValue>${signature_value}</SignatureValue>` +
                                '<KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#">' +
                                    '<KeyValue>' +
                                        '<ECCKeyValue>' +
                                            `<PublicKey>${public_key}</PublicKey>` +
                                        '</ECCKeyValue>' +
                                    '</KeyValue>' +
                                '</KeyInfo>' +
                            '</Signature>' +
                        '</Challenge>' +
                    '</challenge>' +
                '</AcquireLicense>' +
            '</soap:Body>' +
            '</soap:Envelope>'
        );
    }

    getLicenseChallenge(wrm_header, rev_lists, client_version) {
        const xml_key = new XmlKey();

        const wrmHeaderDoc = this.parser.parseFromString(wrm_header, "application/xml").documentElement;
        const wrmHeaderVersion = wrmHeaderDoc.getAttribute("version");

        let protocol_version = 1;

        switch (wrmHeaderVersion){
            case "4.3.0.0":
                protocol_version = 5
                break;
            case "4.2.0.0":
                protocol_version = 4
                break;
        }

        const laContent = this._buildDigestContent(
            wrm_header,
            Utils.bytesToBase64(Crypto.randomBytes(16)),
            Utils.bytesToBase64(this._getKeyCipher(xml_key)),
            Utils.bytesToBase64(this._getDataCipher(xml_key)),
            rev_lists,
            protocol_version,
            client_version ?? "10.0.16384.10011"
        );
        const contentHash = Crypto.sha256(laContent);

        const signedInfo = this._buildDigestInfo(
            Utils.bytesToBase64(contentHash)
        );

        const signature = Crypto.ecc256Sign(
            this.signing_key.privateKey,
            signedInfo
        );
        const rawSignature = new Uint8Array([
            ...utils.numberToBytesBE(signature.r, 32),
            ...utils.numberToBytesBE(signature.s, 32)
        ]);

        const singing_key = this.signing_key.publicBytes();

        return this._buildMainBody(
            laContent,
            signedInfo,
            Utils.bytesToBase64(rawSignature),
            Utils.bytesToBase64(singing_key)
        );
    }

    parseLicense(rawLicense) {
        const xmlDoc = this.parser.parseFromString(rawLicense, "application/xml");
        const licenseElements = xmlDoc.getElementsByTagName("License");

        const keys = [];

        Array.from(licenseElements).forEach(licenseElement => {
            const license = XmrLicense.loads(Utils.base64ToBytes(licenseElement.textContent));

            const isScalable = license.getObjects(81).length > 0;

            license.getObjects(10).forEach(obj => {
                const contentKeyObject = obj.data;

                if (![3, 4, 6].includes(contentKeyObject.cipher_type)) {
                    return;
                }

                const viaSymmetric = contentKeyObject.cipher_type === 6;
                console.log(
                    "cipher_type", contentKeyObject.cipher_type,
                    "key_type", contentKeyObject.key_type,
                    "isScalable", isScalable,
                    "viaSymmetric", viaSymmetric,
                );

                const encryptedKey = contentKeyObject.encrypted_key;
                const decrypted = Crypto.ecc256decrypt(this.encryption_key.privateKey, encryptedKey);

                let ci = decrypted.subarray(0, 16);
                let ck = decrypted.subarray(16, 32);

                if (isScalable) {
                    ci = decrypted.filter((_, index) => index % 2 === 0).slice(0, 16);
                    ck = decrypted.filter((_, index) => index % 2 === 1).slice(0, 16);

                    if (viaSymmetric) {
                        const embeddedRootLicense = encryptedKey.subarray(0, 144);
                        let embeddedLeafLicense = encryptedKey.subarray(144);

                        const rgbKey = Utils.xorArrays(ck, this.rgbMagicConstantZero);
                        const contentKeyPrime = Crypto.aesEcbEncrypt(ck, rgbKey);

                        const auxKey = license.getObjects(81)[0].data.auxiliary_keys[0].key;

                        const uplinkXKey = Crypto.aesEcbEncrypt(contentKeyPrime, auxKey);
                        const secondaryKey = Crypto.aesEcbEncrypt(ck, embeddedRootLicense.subarray(128));

                        embeddedLeafLicense = Crypto.aesEcbEncrypt(uplinkXKey, embeddedLeafLicense);
                        embeddedLeafLicense = Crypto.aesEcbEncrypt(secondaryKey, embeddedLeafLicense);

                        ci = embeddedLeafLicense.subarray(0, 16);
                        ck = embeddedLeafLicense.subarray(16, 32);
                    }
                }

                if (!license.checkSignature(ci)) {
                    throw new Error("License integrity signature does not match");
                }

                keys.push(new Key(
                    contentKeyObject.key_id,
                    contentKeyObject.key_type,
                    contentKeyObject.cipher_type,
                    ck,
                ));
            });
        });

        return keys;
    }
}
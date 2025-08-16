/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.license_protocol = (function() {
    
        /**
         * Namespace license_protocol.
         * @exports license_protocol
         * @namespace
         */
        var license_protocol = {};
    
        /**
         * LicenseType enum.
         * @name license_protocol.LicenseType
         * @enum {number}
         * @property {number} STREAMING=1 STREAMING value
         * @property {number} OFFLINE=2 OFFLINE value
         * @property {number} AUTOMATIC=3 AUTOMATIC value
         */
        license_protocol.LicenseType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[1] = "STREAMING"] = 1;
            values[valuesById[2] = "OFFLINE"] = 2;
            values[valuesById[3] = "AUTOMATIC"] = 3;
            return values;
        })();
    
        /**
         * PlatformVerificationStatus enum.
         * @name license_protocol.PlatformVerificationStatus
         * @enum {number}
         * @property {number} PLATFORM_UNVERIFIED=0 PLATFORM_UNVERIFIED value
         * @property {number} PLATFORM_TAMPERED=1 PLATFORM_TAMPERED value
         * @property {number} PLATFORM_SOFTWARE_VERIFIED=2 PLATFORM_SOFTWARE_VERIFIED value
         * @property {number} PLATFORM_HARDWARE_VERIFIED=3 PLATFORM_HARDWARE_VERIFIED value
         * @property {number} PLATFORM_NO_VERIFICATION=4 PLATFORM_NO_VERIFICATION value
         * @property {number} PLATFORM_SECURE_STORAGE_SOFTWARE_VERIFIED=5 PLATFORM_SECURE_STORAGE_SOFTWARE_VERIFIED value
         */
        license_protocol.PlatformVerificationStatus = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "PLATFORM_UNVERIFIED"] = 0;
            values[valuesById[1] = "PLATFORM_TAMPERED"] = 1;
            values[valuesById[2] = "PLATFORM_SOFTWARE_VERIFIED"] = 2;
            values[valuesById[3] = "PLATFORM_HARDWARE_VERIFIED"] = 3;
            values[valuesById[4] = "PLATFORM_NO_VERIFICATION"] = 4;
            values[valuesById[5] = "PLATFORM_SECURE_STORAGE_SOFTWARE_VERIFIED"] = 5;
            return values;
        })();
    
        license_protocol.LicenseIdentification = (function() {
    
            /**
             * Properties of a LicenseIdentification.
             * @memberof license_protocol
             * @interface ILicenseIdentification
             * @property {Uint8Array|null} [requestId] LicenseIdentification requestId
             * @property {Uint8Array|null} [sessionId] LicenseIdentification sessionId
             * @property {Uint8Array|null} [purchaseId] LicenseIdentification purchaseId
             * @property {license_protocol.LicenseType|null} [type] LicenseIdentification type
             * @property {number|null} [version] LicenseIdentification version
             * @property {Uint8Array|null} [providerSessionToken] LicenseIdentification providerSessionToken
             */
    
            /**
             * Constructs a new LicenseIdentification.
             * @memberof license_protocol
             * @classdesc Represents a LicenseIdentification.
             * @implements ILicenseIdentification
             * @constructor
             * @param {license_protocol.ILicenseIdentification=} [properties] Properties to set
             */
            function LicenseIdentification(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LicenseIdentification requestId.
             * @member {Uint8Array} requestId
             * @memberof license_protocol.LicenseIdentification
             * @instance
             */
            LicenseIdentification.prototype.requestId = $util.newBuffer([]);
    
            /**
             * LicenseIdentification sessionId.
             * @member {Uint8Array} sessionId
             * @memberof license_protocol.LicenseIdentification
             * @instance
             */
            LicenseIdentification.prototype.sessionId = $util.newBuffer([]);
    
            /**
             * LicenseIdentification purchaseId.
             * @member {Uint8Array} purchaseId
             * @memberof license_protocol.LicenseIdentification
             * @instance
             */
            LicenseIdentification.prototype.purchaseId = $util.newBuffer([]);
    
            /**
             * LicenseIdentification type.
             * @member {license_protocol.LicenseType} type
             * @memberof license_protocol.LicenseIdentification
             * @instance
             */
            LicenseIdentification.prototype.type = 1;
    
            /**
             * LicenseIdentification version.
             * @member {number} version
             * @memberof license_protocol.LicenseIdentification
             * @instance
             */
            LicenseIdentification.prototype.version = 0;
    
            /**
             * LicenseIdentification providerSessionToken.
             * @member {Uint8Array} providerSessionToken
             * @memberof license_protocol.LicenseIdentification
             * @instance
             */
            LicenseIdentification.prototype.providerSessionToken = $util.newBuffer([]);
    
            /**
             * Creates a new LicenseIdentification instance using the specified properties.
             * @function create
             * @memberof license_protocol.LicenseIdentification
             * @static
             * @param {license_protocol.ILicenseIdentification=} [properties] Properties to set
             * @returns {license_protocol.LicenseIdentification} LicenseIdentification instance
             */
            LicenseIdentification.create = function create(properties) {
                return new LicenseIdentification(properties);
            };
    
            /**
             * Encodes the specified LicenseIdentification message. Does not implicitly {@link license_protocol.LicenseIdentification.verify|verify} messages.
             * @function encode
             * @memberof license_protocol.LicenseIdentification
             * @static
             * @param {license_protocol.ILicenseIdentification} message LicenseIdentification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LicenseIdentification.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.requestId != null && Object.hasOwnProperty.call(message, "requestId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.requestId);
                if (message.sessionId != null && Object.hasOwnProperty.call(message, "sessionId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.sessionId);
                if (message.purchaseId != null && Object.hasOwnProperty.call(message, "purchaseId"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.purchaseId);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.type);
                if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.version);
                if (message.providerSessionToken != null && Object.hasOwnProperty.call(message, "providerSessionToken"))
                    writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.providerSessionToken);
                return writer;
            };
    
            /**
             * Encodes the specified LicenseIdentification message, length delimited. Does not implicitly {@link license_protocol.LicenseIdentification.verify|verify} messages.
             * @function encodeDelimited
             * @memberof license_protocol.LicenseIdentification
             * @static
             * @param {license_protocol.ILicenseIdentification} message LicenseIdentification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LicenseIdentification.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LicenseIdentification message from the specified reader or buffer.
             * @function decode
             * @memberof license_protocol.LicenseIdentification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {license_protocol.LicenseIdentification} LicenseIdentification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LicenseIdentification.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.LicenseIdentification();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.requestId = reader.bytes();
                            break;
                        }
                    case 2: {
                            message.sessionId = reader.bytes();
                            break;
                        }
                    case 3: {
                            message.purchaseId = reader.bytes();
                            break;
                        }
                    case 4: {
                            message.type = reader.int32();
                            break;
                        }
                    case 5: {
                            message.version = reader.int32();
                            break;
                        }
                    case 6: {
                            message.providerSessionToken = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a LicenseIdentification message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof license_protocol.LicenseIdentification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {license_protocol.LicenseIdentification} LicenseIdentification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LicenseIdentification.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LicenseIdentification message.
             * @function verify
             * @memberof license_protocol.LicenseIdentification
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LicenseIdentification.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.requestId != null && message.hasOwnProperty("requestId"))
                    if (!(message.requestId && typeof message.requestId.length === "number" || $util.isString(message.requestId)))
                        return "requestId: buffer expected";
                if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                    if (!(message.sessionId && typeof message.sessionId.length === "number" || $util.isString(message.sessionId)))
                        return "sessionId: buffer expected";
                if (message.purchaseId != null && message.hasOwnProperty("purchaseId"))
                    if (!(message.purchaseId && typeof message.purchaseId.length === "number" || $util.isString(message.purchaseId)))
                        return "purchaseId: buffer expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isInteger(message.version))
                        return "version: integer expected";
                if (message.providerSessionToken != null && message.hasOwnProperty("providerSessionToken"))
                    if (!(message.providerSessionToken && typeof message.providerSessionToken.length === "number" || $util.isString(message.providerSessionToken)))
                        return "providerSessionToken: buffer expected";
                return null;
            };
    
            /**
             * Creates a LicenseIdentification message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof license_protocol.LicenseIdentification
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {license_protocol.LicenseIdentification} LicenseIdentification
             */
            LicenseIdentification.fromObject = function fromObject(object) {
                if (object instanceof $root.license_protocol.LicenseIdentification)
                    return object;
                var message = new $root.license_protocol.LicenseIdentification();
                if (object.requestId != null)
                    if (typeof object.requestId === "string")
                        $util.base64.decode(object.requestId, message.requestId = $util.newBuffer($util.base64.length(object.requestId)), 0);
                    else if (object.requestId.length >= 0)
                        message.requestId = object.requestId;
                if (object.sessionId != null)
                    if (typeof object.sessionId === "string")
                        $util.base64.decode(object.sessionId, message.sessionId = $util.newBuffer($util.base64.length(object.sessionId)), 0);
                    else if (object.sessionId.length >= 0)
                        message.sessionId = object.sessionId;
                if (object.purchaseId != null)
                    if (typeof object.purchaseId === "string")
                        $util.base64.decode(object.purchaseId, message.purchaseId = $util.newBuffer($util.base64.length(object.purchaseId)), 0);
                    else if (object.purchaseId.length >= 0)
                        message.purchaseId = object.purchaseId;
                switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "STREAMING":
                case 1:
                    message.type = 1;
                    break;
                case "OFFLINE":
                case 2:
                    message.type = 2;
                    break;
                case "AUTOMATIC":
                case 3:
                    message.type = 3;
                    break;
                }
                if (object.version != null)
                    message.version = object.version | 0;
                if (object.providerSessionToken != null)
                    if (typeof object.providerSessionToken === "string")
                        $util.base64.decode(object.providerSessionToken, message.providerSessionToken = $util.newBuffer($util.base64.length(object.providerSessionToken)), 0);
                    else if (object.providerSessionToken.length >= 0)
                        message.providerSessionToken = object.providerSessionToken;
                return message;
            };
    
            /**
             * Creates a plain object from a LicenseIdentification message. Also converts values to other types if specified.
             * @function toObject
             * @memberof license_protocol.LicenseIdentification
             * @static
             * @param {license_protocol.LicenseIdentification} message LicenseIdentification
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LicenseIdentification.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if (options.bytes === String)
                        object.requestId = "";
                    else {
                        object.requestId = [];
                        if (options.bytes !== Array)
                            object.requestId = $util.newBuffer(object.requestId);
                    }
                    if (options.bytes === String)
                        object.sessionId = "";
                    else {
                        object.sessionId = [];
                        if (options.bytes !== Array)
                            object.sessionId = $util.newBuffer(object.sessionId);
                    }
                    if (options.bytes === String)
                        object.purchaseId = "";
                    else {
                        object.purchaseId = [];
                        if (options.bytes !== Array)
                            object.purchaseId = $util.newBuffer(object.purchaseId);
                    }
                    object.type = options.enums === String ? "STREAMING" : 1;
                    object.version = 0;
                    if (options.bytes === String)
                        object.providerSessionToken = "";
                    else {
                        object.providerSessionToken = [];
                        if (options.bytes !== Array)
                            object.providerSessionToken = $util.newBuffer(object.providerSessionToken);
                    }
                }
                if (message.requestId != null && message.hasOwnProperty("requestId"))
                    object.requestId = options.bytes === String ? $util.base64.encode(message.requestId, 0, message.requestId.length) : options.bytes === Array ? Array.prototype.slice.call(message.requestId) : message.requestId;
                if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                    object.sessionId = options.bytes === String ? $util.base64.encode(message.sessionId, 0, message.sessionId.length) : options.bytes === Array ? Array.prototype.slice.call(message.sessionId) : message.sessionId;
                if (message.purchaseId != null && message.hasOwnProperty("purchaseId"))
                    object.purchaseId = options.bytes === String ? $util.base64.encode(message.purchaseId, 0, message.purchaseId.length) : options.bytes === Array ? Array.prototype.slice.call(message.purchaseId) : message.purchaseId;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.license_protocol.LicenseType[message.type] === undefined ? message.type : $root.license_protocol.LicenseType[message.type] : message.type;
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.providerSessionToken != null && message.hasOwnProperty("providerSessionToken"))
                    object.providerSessionToken = options.bytes === String ? $util.base64.encode(message.providerSessionToken, 0, message.providerSessionToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.providerSessionToken) : message.providerSessionToken;
                return object;
            };
    
            /**
             * Converts this LicenseIdentification to JSON.
             * @function toJSON
             * @memberof license_protocol.LicenseIdentification
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LicenseIdentification.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for LicenseIdentification
             * @function getTypeUrl
             * @memberof license_protocol.LicenseIdentification
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            LicenseIdentification.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/license_protocol.LicenseIdentification";
            };
    
            return LicenseIdentification;
        })();
    
        license_protocol.License = (function() {
    
            /**
             * Properties of a License.
             * @memberof license_protocol
             * @interface ILicense
             * @property {license_protocol.ILicenseIdentification|null} [id] License id
             * @property {license_protocol.License.IPolicy|null} [policy] License policy
             * @property {Array.<license_protocol.License.IKeyContainer>|null} [key] License key
             * @property {number|Long|null} [licenseStartTime] License licenseStartTime
             * @property {boolean|null} [remoteAttestationVerified] License remoteAttestationVerified
             * @property {Uint8Array|null} [providerClientToken] License providerClientToken
             * @property {number|null} [protectionScheme] License protectionScheme
             * @property {Uint8Array|null} [srmRequirement] License srmRequirement
             * @property {Uint8Array|null} [srmUpdate] License srmUpdate
             * @property {license_protocol.PlatformVerificationStatus|null} [platformVerificationStatus] License platformVerificationStatus
             * @property {Array.<Uint8Array>|null} [groupIds] License groupIds
             */
    
            /**
             * Constructs a new License.
             * @memberof license_protocol
             * @classdesc Represents a License.
             * @implements ILicense
             * @constructor
             * @param {license_protocol.ILicense=} [properties] Properties to set
             */
            function License(properties) {
                this.key = [];
                this.groupIds = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * License id.
             * @member {license_protocol.ILicenseIdentification|null|undefined} id
             * @memberof license_protocol.License
             * @instance
             */
            License.prototype.id = null;
    
            /**
             * License policy.
             * @member {license_protocol.License.IPolicy|null|undefined} policy
             * @memberof license_protocol.License
             * @instance
             */
            License.prototype.policy = null;
    
            /**
             * License key.
             * @member {Array.<license_protocol.License.IKeyContainer>} key
             * @memberof license_protocol.License
             * @instance
             */
            License.prototype.key = $util.emptyArray;
    
            /**
             * License licenseStartTime.
             * @member {number|Long} licenseStartTime
             * @memberof license_protocol.License
             * @instance
             */
            License.prototype.licenseStartTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * License remoteAttestationVerified.
             * @member {boolean} remoteAttestationVerified
             * @memberof license_protocol.License
             * @instance
             */
            License.prototype.remoteAttestationVerified = false;
    
            /**
             * License providerClientToken.
             * @member {Uint8Array} providerClientToken
             * @memberof license_protocol.License
             * @instance
             */
            License.prototype.providerClientToken = $util.newBuffer([]);
    
            /**
             * License protectionScheme.
             * @member {number} protectionScheme
             * @memberof license_protocol.License
             * @instance
             */
            License.prototype.protectionScheme = 0;
    
            /**
             * License srmRequirement.
             * @member {Uint8Array} srmRequirement
             * @memberof license_protocol.License
             * @instance
             */
            License.prototype.srmRequirement = $util.newBuffer([]);
    
            /**
             * License srmUpdate.
             * @member {Uint8Array} srmUpdate
             * @memberof license_protocol.License
             * @instance
             */
            License.prototype.srmUpdate = $util.newBuffer([]);
    
            /**
             * License platformVerificationStatus.
             * @member {license_protocol.PlatformVerificationStatus} platformVerificationStatus
             * @memberof license_protocol.License
             * @instance
             */
            License.prototype.platformVerificationStatus = 4;
    
            /**
             * License groupIds.
             * @member {Array.<Uint8Array>} groupIds
             * @memberof license_protocol.License
             * @instance
             */
            License.prototype.groupIds = $util.emptyArray;
    
            /**
             * Creates a new License instance using the specified properties.
             * @function create
             * @memberof license_protocol.License
             * @static
             * @param {license_protocol.ILicense=} [properties] Properties to set
             * @returns {license_protocol.License} License instance
             */
            License.create = function create(properties) {
                return new License(properties);
            };
    
            /**
             * Encodes the specified License message. Does not implicitly {@link license_protocol.License.verify|verify} messages.
             * @function encode
             * @memberof license_protocol.License
             * @static
             * @param {license_protocol.ILicense} message License message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            License.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    $root.license_protocol.LicenseIdentification.encode(message.id, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.policy != null && Object.hasOwnProperty.call(message, "policy"))
                    $root.license_protocol.License.Policy.encode(message.policy, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.key != null && message.key.length)
                    for (var i = 0; i < message.key.length; ++i)
                        $root.license_protocol.License.KeyContainer.encode(message.key[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.licenseStartTime != null && Object.hasOwnProperty.call(message, "licenseStartTime"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.licenseStartTime);
                if (message.remoteAttestationVerified != null && Object.hasOwnProperty.call(message, "remoteAttestationVerified"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.remoteAttestationVerified);
                if (message.providerClientToken != null && Object.hasOwnProperty.call(message, "providerClientToken"))
                    writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.providerClientToken);
                if (message.protectionScheme != null && Object.hasOwnProperty.call(message, "protectionScheme"))
                    writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.protectionScheme);
                if (message.srmRequirement != null && Object.hasOwnProperty.call(message, "srmRequirement"))
                    writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.srmRequirement);
                if (message.srmUpdate != null && Object.hasOwnProperty.call(message, "srmUpdate"))
                    writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.srmUpdate);
                if (message.platformVerificationStatus != null && Object.hasOwnProperty.call(message, "platformVerificationStatus"))
                    writer.uint32(/* id 10, wireType 0 =*/80).int32(message.platformVerificationStatus);
                if (message.groupIds != null && message.groupIds.length)
                    for (var i = 0; i < message.groupIds.length; ++i)
                        writer.uint32(/* id 11, wireType 2 =*/90).bytes(message.groupIds[i]);
                return writer;
            };
    
            /**
             * Encodes the specified License message, length delimited. Does not implicitly {@link license_protocol.License.verify|verify} messages.
             * @function encodeDelimited
             * @memberof license_protocol.License
             * @static
             * @param {license_protocol.ILicense} message License message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            License.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a License message from the specified reader or buffer.
             * @function decode
             * @memberof license_protocol.License
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {license_protocol.License} License
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            License.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.License();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = $root.license_protocol.LicenseIdentification.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.policy = $root.license_protocol.License.Policy.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            if (!(message.key && message.key.length))
                                message.key = [];
                            message.key.push($root.license_protocol.License.KeyContainer.decode(reader, reader.uint32()));
                            break;
                        }
                    case 4: {
                            message.licenseStartTime = reader.int64();
                            break;
                        }
                    case 5: {
                            message.remoteAttestationVerified = reader.bool();
                            break;
                        }
                    case 6: {
                            message.providerClientToken = reader.bytes();
                            break;
                        }
                    case 7: {
                            message.protectionScheme = reader.uint32();
                            break;
                        }
                    case 8: {
                            message.srmRequirement = reader.bytes();
                            break;
                        }
                    case 9: {
                            message.srmUpdate = reader.bytes();
                            break;
                        }
                    case 10: {
                            message.platformVerificationStatus = reader.int32();
                            break;
                        }
                    case 11: {
                            if (!(message.groupIds && message.groupIds.length))
                                message.groupIds = [];
                            message.groupIds.push(reader.bytes());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a License message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof license_protocol.License
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {license_protocol.License} License
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            License.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a License message.
             * @function verify
             * @memberof license_protocol.License
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            License.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id")) {
                    var error = $root.license_protocol.LicenseIdentification.verify(message.id);
                    if (error)
                        return "id." + error;
                }
                if (message.policy != null && message.hasOwnProperty("policy")) {
                    var error = $root.license_protocol.License.Policy.verify(message.policy);
                    if (error)
                        return "policy." + error;
                }
                if (message.key != null && message.hasOwnProperty("key")) {
                    if (!Array.isArray(message.key))
                        return "key: array expected";
                    for (var i = 0; i < message.key.length; ++i) {
                        var error = $root.license_protocol.License.KeyContainer.verify(message.key[i]);
                        if (error)
                            return "key." + error;
                    }
                }
                if (message.licenseStartTime != null && message.hasOwnProperty("licenseStartTime"))
                    if (!$util.isInteger(message.licenseStartTime) && !(message.licenseStartTime && $util.isInteger(message.licenseStartTime.low) && $util.isInteger(message.licenseStartTime.high)))
                        return "licenseStartTime: integer|Long expected";
                if (message.remoteAttestationVerified != null && message.hasOwnProperty("remoteAttestationVerified"))
                    if (typeof message.remoteAttestationVerified !== "boolean")
                        return "remoteAttestationVerified: boolean expected";
                if (message.providerClientToken != null && message.hasOwnProperty("providerClientToken"))
                    if (!(message.providerClientToken && typeof message.providerClientToken.length === "number" || $util.isString(message.providerClientToken)))
                        return "providerClientToken: buffer expected";
                if (message.protectionScheme != null && message.hasOwnProperty("protectionScheme"))
                    if (!$util.isInteger(message.protectionScheme))
                        return "protectionScheme: integer expected";
                if (message.srmRequirement != null && message.hasOwnProperty("srmRequirement"))
                    if (!(message.srmRequirement && typeof message.srmRequirement.length === "number" || $util.isString(message.srmRequirement)))
                        return "srmRequirement: buffer expected";
                if (message.srmUpdate != null && message.hasOwnProperty("srmUpdate"))
                    if (!(message.srmUpdate && typeof message.srmUpdate.length === "number" || $util.isString(message.srmUpdate)))
                        return "srmUpdate: buffer expected";
                if (message.platformVerificationStatus != null && message.hasOwnProperty("platformVerificationStatus"))
                    switch (message.platformVerificationStatus) {
                    default:
                        return "platformVerificationStatus: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    }
                if (message.groupIds != null && message.hasOwnProperty("groupIds")) {
                    if (!Array.isArray(message.groupIds))
                        return "groupIds: array expected";
                    for (var i = 0; i < message.groupIds.length; ++i)
                        if (!(message.groupIds[i] && typeof message.groupIds[i].length === "number" || $util.isString(message.groupIds[i])))
                            return "groupIds: buffer[] expected";
                }
                return null;
            };
    
            /**
             * Creates a License message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof license_protocol.License
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {license_protocol.License} License
             */
            License.fromObject = function fromObject(object) {
                if (object instanceof $root.license_protocol.License)
                    return object;
                var message = new $root.license_protocol.License();
                if (object.id != null) {
                    if (typeof object.id !== "object")
                        throw TypeError(".license_protocol.License.id: object expected");
                    message.id = $root.license_protocol.LicenseIdentification.fromObject(object.id);
                }
                if (object.policy != null) {
                    if (typeof object.policy !== "object")
                        throw TypeError(".license_protocol.License.policy: object expected");
                    message.policy = $root.license_protocol.License.Policy.fromObject(object.policy);
                }
                if (object.key) {
                    if (!Array.isArray(object.key))
                        throw TypeError(".license_protocol.License.key: array expected");
                    message.key = [];
                    for (var i = 0; i < object.key.length; ++i) {
                        if (typeof object.key[i] !== "object")
                            throw TypeError(".license_protocol.License.key: object expected");
                        message.key[i] = $root.license_protocol.License.KeyContainer.fromObject(object.key[i]);
                    }
                }
                if (object.licenseStartTime != null)
                    if ($util.Long)
                        (message.licenseStartTime = $util.Long.fromValue(object.licenseStartTime)).unsigned = false;
                    else if (typeof object.licenseStartTime === "string")
                        message.licenseStartTime = parseInt(object.licenseStartTime, 10);
                    else if (typeof object.licenseStartTime === "number")
                        message.licenseStartTime = object.licenseStartTime;
                    else if (typeof object.licenseStartTime === "object")
                        message.licenseStartTime = new $util.LongBits(object.licenseStartTime.low >>> 0, object.licenseStartTime.high >>> 0).toNumber();
                if (object.remoteAttestationVerified != null)
                    message.remoteAttestationVerified = Boolean(object.remoteAttestationVerified);
                if (object.providerClientToken != null)
                    if (typeof object.providerClientToken === "string")
                        $util.base64.decode(object.providerClientToken, message.providerClientToken = $util.newBuffer($util.base64.length(object.providerClientToken)), 0);
                    else if (object.providerClientToken.length >= 0)
                        message.providerClientToken = object.providerClientToken;
                if (object.protectionScheme != null)
                    message.protectionScheme = object.protectionScheme >>> 0;
                if (object.srmRequirement != null)
                    if (typeof object.srmRequirement === "string")
                        $util.base64.decode(object.srmRequirement, message.srmRequirement = $util.newBuffer($util.base64.length(object.srmRequirement)), 0);
                    else if (object.srmRequirement.length >= 0)
                        message.srmRequirement = object.srmRequirement;
                if (object.srmUpdate != null)
                    if (typeof object.srmUpdate === "string")
                        $util.base64.decode(object.srmUpdate, message.srmUpdate = $util.newBuffer($util.base64.length(object.srmUpdate)), 0);
                    else if (object.srmUpdate.length >= 0)
                        message.srmUpdate = object.srmUpdate;
                switch (object.platformVerificationStatus) {
                case "PLATFORM_UNVERIFIED":
                case 0:
                    message.platformVerificationStatus = 0;
                    break;
                case "PLATFORM_TAMPERED":
                case 1:
                    message.platformVerificationStatus = 1;
                    break;
                case "PLATFORM_SOFTWARE_VERIFIED":
                case 2:
                    message.platformVerificationStatus = 2;
                    break;
                case "PLATFORM_HARDWARE_VERIFIED":
                case 3:
                    message.platformVerificationStatus = 3;
                    break;
                default:
                    if (typeof object.platformVerificationStatus === "number") {
                        message.platformVerificationStatus = object.platformVerificationStatus;
                        break;
                    }
                    break;
                case "PLATFORM_NO_VERIFICATION":
                case 4:
                    message.platformVerificationStatus = 4;
                    break;
                case "PLATFORM_SECURE_STORAGE_SOFTWARE_VERIFIED":
                case 5:
                    message.platformVerificationStatus = 5;
                    break;
                }
                if (object.groupIds) {
                    if (!Array.isArray(object.groupIds))
                        throw TypeError(".license_protocol.License.groupIds: array expected");
                    message.groupIds = [];
                    for (var i = 0; i < object.groupIds.length; ++i)
                        if (typeof object.groupIds[i] === "string")
                            $util.base64.decode(object.groupIds[i], message.groupIds[i] = $util.newBuffer($util.base64.length(object.groupIds[i])), 0);
                        else if (object.groupIds[i].length >= 0)
                            message.groupIds[i] = object.groupIds[i];
                }
                return message;
            };
    
            /**
             * Creates a plain object from a License message. Also converts values to other types if specified.
             * @function toObject
             * @memberof license_protocol.License
             * @static
             * @param {license_protocol.License} message License
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            License.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.key = [];
                    object.groupIds = [];
                }
                if (options.defaults) {
                    object.id = null;
                    object.policy = null;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.licenseStartTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.licenseStartTime = options.longs === String ? "0" : 0;
                    object.remoteAttestationVerified = false;
                    if (options.bytes === String)
                        object.providerClientToken = "";
                    else {
                        object.providerClientToken = [];
                        if (options.bytes !== Array)
                            object.providerClientToken = $util.newBuffer(object.providerClientToken);
                    }
                    object.protectionScheme = 0;
                    if (options.bytes === String)
                        object.srmRequirement = "";
                    else {
                        object.srmRequirement = [];
                        if (options.bytes !== Array)
                            object.srmRequirement = $util.newBuffer(object.srmRequirement);
                    }
                    if (options.bytes === String)
                        object.srmUpdate = "";
                    else {
                        object.srmUpdate = [];
                        if (options.bytes !== Array)
                            object.srmUpdate = $util.newBuffer(object.srmUpdate);
                    }
                    object.platformVerificationStatus = options.enums === String ? "PLATFORM_NO_VERIFICATION" : 4;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = $root.license_protocol.LicenseIdentification.toObject(message.id, options);
                if (message.policy != null && message.hasOwnProperty("policy"))
                    object.policy = $root.license_protocol.License.Policy.toObject(message.policy, options);
                if (message.key && message.key.length) {
                    object.key = [];
                    for (var j = 0; j < message.key.length; ++j)
                        object.key[j] = $root.license_protocol.License.KeyContainer.toObject(message.key[j], options);
                }
                if (message.licenseStartTime != null && message.hasOwnProperty("licenseStartTime"))
                    if (typeof message.licenseStartTime === "number")
                        object.licenseStartTime = options.longs === String ? String(message.licenseStartTime) : message.licenseStartTime;
                    else
                        object.licenseStartTime = options.longs === String ? $util.Long.prototype.toString.call(message.licenseStartTime) : options.longs === Number ? new $util.LongBits(message.licenseStartTime.low >>> 0, message.licenseStartTime.high >>> 0).toNumber() : message.licenseStartTime;
                if (message.remoteAttestationVerified != null && message.hasOwnProperty("remoteAttestationVerified"))
                    object.remoteAttestationVerified = message.remoteAttestationVerified;
                if (message.providerClientToken != null && message.hasOwnProperty("providerClientToken"))
                    object.providerClientToken = options.bytes === String ? $util.base64.encode(message.providerClientToken, 0, message.providerClientToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.providerClientToken) : message.providerClientToken;
                if (message.protectionScheme != null && message.hasOwnProperty("protectionScheme"))
                    object.protectionScheme = message.protectionScheme;
                if (message.srmRequirement != null && message.hasOwnProperty("srmRequirement"))
                    object.srmRequirement = options.bytes === String ? $util.base64.encode(message.srmRequirement, 0, message.srmRequirement.length) : options.bytes === Array ? Array.prototype.slice.call(message.srmRequirement) : message.srmRequirement;
                if (message.srmUpdate != null && message.hasOwnProperty("srmUpdate"))
                    object.srmUpdate = options.bytes === String ? $util.base64.encode(message.srmUpdate, 0, message.srmUpdate.length) : options.bytes === Array ? Array.prototype.slice.call(message.srmUpdate) : message.srmUpdate;
                if (message.platformVerificationStatus != null && message.hasOwnProperty("platformVerificationStatus"))
                    object.platformVerificationStatus = options.enums === String ? $root.license_protocol.PlatformVerificationStatus[message.platformVerificationStatus] === undefined ? message.platformVerificationStatus : $root.license_protocol.PlatformVerificationStatus[message.platformVerificationStatus] : message.platformVerificationStatus;
                if (message.groupIds && message.groupIds.length) {
                    object.groupIds = [];
                    for (var j = 0; j < message.groupIds.length; ++j)
                        object.groupIds[j] = options.bytes === String ? $util.base64.encode(message.groupIds[j], 0, message.groupIds[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.groupIds[j]) : message.groupIds[j];
                }
                return object;
            };
    
            /**
             * Converts this License to JSON.
             * @function toJSON
             * @memberof license_protocol.License
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            License.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for License
             * @function getTypeUrl
             * @memberof license_protocol.License
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            License.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/license_protocol.License";
            };
    
            License.Policy = (function() {
    
                /**
                 * Properties of a Policy.
                 * @memberof license_protocol.License
                 * @interface IPolicy
                 * @property {boolean|null} [canPlay] Policy canPlay
                 * @property {boolean|null} [canPersist] Policy canPersist
                 * @property {boolean|null} [canRenew] Policy canRenew
                 * @property {number|Long|null} [rentalDurationSeconds] Policy rentalDurationSeconds
                 * @property {number|Long|null} [playbackDurationSeconds] Policy playbackDurationSeconds
                 * @property {number|Long|null} [licenseDurationSeconds] Policy licenseDurationSeconds
                 * @property {number|Long|null} [renewalRecoveryDurationSeconds] Policy renewalRecoveryDurationSeconds
                 * @property {string|null} [renewalServerUrl] Policy renewalServerUrl
                 * @property {number|Long|null} [renewalDelaySeconds] Policy renewalDelaySeconds
                 * @property {number|Long|null} [renewalRetryIntervalSeconds] Policy renewalRetryIntervalSeconds
                 * @property {boolean|null} [renewWithUsage] Policy renewWithUsage
                 * @property {boolean|null} [alwaysIncludeClientId] Policy alwaysIncludeClientId
                 * @property {number|Long|null} [playStartGracePeriodSeconds] Policy playStartGracePeriodSeconds
                 * @property {boolean|null} [softEnforcePlaybackDuration] Policy softEnforcePlaybackDuration
                 * @property {boolean|null} [softEnforceRentalDuration] Policy softEnforceRentalDuration
                 */
    
                /**
                 * Constructs a new Policy.
                 * @memberof license_protocol.License
                 * @classdesc Represents a Policy.
                 * @implements IPolicy
                 * @constructor
                 * @param {license_protocol.License.IPolicy=} [properties] Properties to set
                 */
                function Policy(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Policy canPlay.
                 * @member {boolean} canPlay
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.canPlay = false;
    
                /**
                 * Policy canPersist.
                 * @member {boolean} canPersist
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.canPersist = false;
    
                /**
                 * Policy canRenew.
                 * @member {boolean} canRenew
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.canRenew = false;
    
                /**
                 * Policy rentalDurationSeconds.
                 * @member {number|Long} rentalDurationSeconds
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.rentalDurationSeconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Policy playbackDurationSeconds.
                 * @member {number|Long} playbackDurationSeconds
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.playbackDurationSeconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Policy licenseDurationSeconds.
                 * @member {number|Long} licenseDurationSeconds
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.licenseDurationSeconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Policy renewalRecoveryDurationSeconds.
                 * @member {number|Long} renewalRecoveryDurationSeconds
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.renewalRecoveryDurationSeconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Policy renewalServerUrl.
                 * @member {string} renewalServerUrl
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.renewalServerUrl = "";
    
                /**
                 * Policy renewalDelaySeconds.
                 * @member {number|Long} renewalDelaySeconds
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.renewalDelaySeconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Policy renewalRetryIntervalSeconds.
                 * @member {number|Long} renewalRetryIntervalSeconds
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.renewalRetryIntervalSeconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Policy renewWithUsage.
                 * @member {boolean} renewWithUsage
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.renewWithUsage = false;
    
                /**
                 * Policy alwaysIncludeClientId.
                 * @member {boolean} alwaysIncludeClientId
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.alwaysIncludeClientId = false;
    
                /**
                 * Policy playStartGracePeriodSeconds.
                 * @member {number|Long} playStartGracePeriodSeconds
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.playStartGracePeriodSeconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Policy softEnforcePlaybackDuration.
                 * @member {boolean} softEnforcePlaybackDuration
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.softEnforcePlaybackDuration = false;
    
                /**
                 * Policy softEnforceRentalDuration.
                 * @member {boolean} softEnforceRentalDuration
                 * @memberof license_protocol.License.Policy
                 * @instance
                 */
                Policy.prototype.softEnforceRentalDuration = true;
    
                /**
                 * Creates a new Policy instance using the specified properties.
                 * @function create
                 * @memberof license_protocol.License.Policy
                 * @static
                 * @param {license_protocol.License.IPolicy=} [properties] Properties to set
                 * @returns {license_protocol.License.Policy} Policy instance
                 */
                Policy.create = function create(properties) {
                    return new Policy(properties);
                };
    
                /**
                 * Encodes the specified Policy message. Does not implicitly {@link license_protocol.License.Policy.verify|verify} messages.
                 * @function encode
                 * @memberof license_protocol.License.Policy
                 * @static
                 * @param {license_protocol.License.IPolicy} message Policy message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Policy.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.canPlay != null && Object.hasOwnProperty.call(message, "canPlay"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.canPlay);
                    if (message.canPersist != null && Object.hasOwnProperty.call(message, "canPersist"))
                        writer.uint32(/* id 2, wireType 0 =*/16).bool(message.canPersist);
                    if (message.canRenew != null && Object.hasOwnProperty.call(message, "canRenew"))
                        writer.uint32(/* id 3, wireType 0 =*/24).bool(message.canRenew);
                    if (message.rentalDurationSeconds != null && Object.hasOwnProperty.call(message, "rentalDurationSeconds"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int64(message.rentalDurationSeconds);
                    if (message.playbackDurationSeconds != null && Object.hasOwnProperty.call(message, "playbackDurationSeconds"))
                        writer.uint32(/* id 5, wireType 0 =*/40).int64(message.playbackDurationSeconds);
                    if (message.licenseDurationSeconds != null && Object.hasOwnProperty.call(message, "licenseDurationSeconds"))
                        writer.uint32(/* id 6, wireType 0 =*/48).int64(message.licenseDurationSeconds);
                    if (message.renewalRecoveryDurationSeconds != null && Object.hasOwnProperty.call(message, "renewalRecoveryDurationSeconds"))
                        writer.uint32(/* id 7, wireType 0 =*/56).int64(message.renewalRecoveryDurationSeconds);
                    if (message.renewalServerUrl != null && Object.hasOwnProperty.call(message, "renewalServerUrl"))
                        writer.uint32(/* id 8, wireType 2 =*/66).string(message.renewalServerUrl);
                    if (message.renewalDelaySeconds != null && Object.hasOwnProperty.call(message, "renewalDelaySeconds"))
                        writer.uint32(/* id 9, wireType 0 =*/72).int64(message.renewalDelaySeconds);
                    if (message.renewalRetryIntervalSeconds != null && Object.hasOwnProperty.call(message, "renewalRetryIntervalSeconds"))
                        writer.uint32(/* id 10, wireType 0 =*/80).int64(message.renewalRetryIntervalSeconds);
                    if (message.renewWithUsage != null && Object.hasOwnProperty.call(message, "renewWithUsage"))
                        writer.uint32(/* id 11, wireType 0 =*/88).bool(message.renewWithUsage);
                    if (message.alwaysIncludeClientId != null && Object.hasOwnProperty.call(message, "alwaysIncludeClientId"))
                        writer.uint32(/* id 12, wireType 0 =*/96).bool(message.alwaysIncludeClientId);
                    if (message.playStartGracePeriodSeconds != null && Object.hasOwnProperty.call(message, "playStartGracePeriodSeconds"))
                        writer.uint32(/* id 13, wireType 0 =*/104).int64(message.playStartGracePeriodSeconds);
                    if (message.softEnforcePlaybackDuration != null && Object.hasOwnProperty.call(message, "softEnforcePlaybackDuration"))
                        writer.uint32(/* id 14, wireType 0 =*/112).bool(message.softEnforcePlaybackDuration);
                    if (message.softEnforceRentalDuration != null && Object.hasOwnProperty.call(message, "softEnforceRentalDuration"))
                        writer.uint32(/* id 15, wireType 0 =*/120).bool(message.softEnforceRentalDuration);
                    return writer;
                };
    
                /**
                 * Encodes the specified Policy message, length delimited. Does not implicitly {@link license_protocol.License.Policy.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof license_protocol.License.Policy
                 * @static
                 * @param {license_protocol.License.IPolicy} message Policy message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Policy.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Policy message from the specified reader or buffer.
                 * @function decode
                 * @memberof license_protocol.License.Policy
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {license_protocol.License.Policy} Policy
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Policy.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.License.Policy();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.canPlay = reader.bool();
                                break;
                            }
                        case 2: {
                                message.canPersist = reader.bool();
                                break;
                            }
                        case 3: {
                                message.canRenew = reader.bool();
                                break;
                            }
                        case 4: {
                                message.rentalDurationSeconds = reader.int64();
                                break;
                            }
                        case 5: {
                                message.playbackDurationSeconds = reader.int64();
                                break;
                            }
                        case 6: {
                                message.licenseDurationSeconds = reader.int64();
                                break;
                            }
                        case 7: {
                                message.renewalRecoveryDurationSeconds = reader.int64();
                                break;
                            }
                        case 8: {
                                message.renewalServerUrl = reader.string();
                                break;
                            }
                        case 9: {
                                message.renewalDelaySeconds = reader.int64();
                                break;
                            }
                        case 10: {
                                message.renewalRetryIntervalSeconds = reader.int64();
                                break;
                            }
                        case 11: {
                                message.renewWithUsage = reader.bool();
                                break;
                            }
                        case 12: {
                                message.alwaysIncludeClientId = reader.bool();
                                break;
                            }
                        case 13: {
                                message.playStartGracePeriodSeconds = reader.int64();
                                break;
                            }
                        case 14: {
                                message.softEnforcePlaybackDuration = reader.bool();
                                break;
                            }
                        case 15: {
                                message.softEnforceRentalDuration = reader.bool();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Policy message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof license_protocol.License.Policy
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {license_protocol.License.Policy} Policy
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Policy.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Policy message.
                 * @function verify
                 * @memberof license_protocol.License.Policy
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Policy.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.canPlay != null && message.hasOwnProperty("canPlay"))
                        if (typeof message.canPlay !== "boolean")
                            return "canPlay: boolean expected";
                    if (message.canPersist != null && message.hasOwnProperty("canPersist"))
                        if (typeof message.canPersist !== "boolean")
                            return "canPersist: boolean expected";
                    if (message.canRenew != null && message.hasOwnProperty("canRenew"))
                        if (typeof message.canRenew !== "boolean")
                            return "canRenew: boolean expected";
                    if (message.rentalDurationSeconds != null && message.hasOwnProperty("rentalDurationSeconds"))
                        if (!$util.isInteger(message.rentalDurationSeconds) && !(message.rentalDurationSeconds && $util.isInteger(message.rentalDurationSeconds.low) && $util.isInteger(message.rentalDurationSeconds.high)))
                            return "rentalDurationSeconds: integer|Long expected";
                    if (message.playbackDurationSeconds != null && message.hasOwnProperty("playbackDurationSeconds"))
                        if (!$util.isInteger(message.playbackDurationSeconds) && !(message.playbackDurationSeconds && $util.isInteger(message.playbackDurationSeconds.low) && $util.isInteger(message.playbackDurationSeconds.high)))
                            return "playbackDurationSeconds: integer|Long expected";
                    if (message.licenseDurationSeconds != null && message.hasOwnProperty("licenseDurationSeconds"))
                        if (!$util.isInteger(message.licenseDurationSeconds) && !(message.licenseDurationSeconds && $util.isInteger(message.licenseDurationSeconds.low) && $util.isInteger(message.licenseDurationSeconds.high)))
                            return "licenseDurationSeconds: integer|Long expected";
                    if (message.renewalRecoveryDurationSeconds != null && message.hasOwnProperty("renewalRecoveryDurationSeconds"))
                        if (!$util.isInteger(message.renewalRecoveryDurationSeconds) && !(message.renewalRecoveryDurationSeconds && $util.isInteger(message.renewalRecoveryDurationSeconds.low) && $util.isInteger(message.renewalRecoveryDurationSeconds.high)))
                            return "renewalRecoveryDurationSeconds: integer|Long expected";
                    if (message.renewalServerUrl != null && message.hasOwnProperty("renewalServerUrl"))
                        if (!$util.isString(message.renewalServerUrl))
                            return "renewalServerUrl: string expected";
                    if (message.renewalDelaySeconds != null && message.hasOwnProperty("renewalDelaySeconds"))
                        if (!$util.isInteger(message.renewalDelaySeconds) && !(message.renewalDelaySeconds && $util.isInteger(message.renewalDelaySeconds.low) && $util.isInteger(message.renewalDelaySeconds.high)))
                            return "renewalDelaySeconds: integer|Long expected";
                    if (message.renewalRetryIntervalSeconds != null && message.hasOwnProperty("renewalRetryIntervalSeconds"))
                        if (!$util.isInteger(message.renewalRetryIntervalSeconds) && !(message.renewalRetryIntervalSeconds && $util.isInteger(message.renewalRetryIntervalSeconds.low) && $util.isInteger(message.renewalRetryIntervalSeconds.high)))
                            return "renewalRetryIntervalSeconds: integer|Long expected";
                    if (message.renewWithUsage != null && message.hasOwnProperty("renewWithUsage"))
                        if (typeof message.renewWithUsage !== "boolean")
                            return "renewWithUsage: boolean expected";
                    if (message.alwaysIncludeClientId != null && message.hasOwnProperty("alwaysIncludeClientId"))
                        if (typeof message.alwaysIncludeClientId !== "boolean")
                            return "alwaysIncludeClientId: boolean expected";
                    if (message.playStartGracePeriodSeconds != null && message.hasOwnProperty("playStartGracePeriodSeconds"))
                        if (!$util.isInteger(message.playStartGracePeriodSeconds) && !(message.playStartGracePeriodSeconds && $util.isInteger(message.playStartGracePeriodSeconds.low) && $util.isInteger(message.playStartGracePeriodSeconds.high)))
                            return "playStartGracePeriodSeconds: integer|Long expected";
                    if (message.softEnforcePlaybackDuration != null && message.hasOwnProperty("softEnforcePlaybackDuration"))
                        if (typeof message.softEnforcePlaybackDuration !== "boolean")
                            return "softEnforcePlaybackDuration: boolean expected";
                    if (message.softEnforceRentalDuration != null && message.hasOwnProperty("softEnforceRentalDuration"))
                        if (typeof message.softEnforceRentalDuration !== "boolean")
                            return "softEnforceRentalDuration: boolean expected";
                    return null;
                };
    
                /**
                 * Creates a Policy message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof license_protocol.License.Policy
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {license_protocol.License.Policy} Policy
                 */
                Policy.fromObject = function fromObject(object) {
                    if (object instanceof $root.license_protocol.License.Policy)
                        return object;
                    var message = new $root.license_protocol.License.Policy();
                    if (object.canPlay != null)
                        message.canPlay = Boolean(object.canPlay);
                    if (object.canPersist != null)
                        message.canPersist = Boolean(object.canPersist);
                    if (object.canRenew != null)
                        message.canRenew = Boolean(object.canRenew);
                    if (object.rentalDurationSeconds != null)
                        if ($util.Long)
                            (message.rentalDurationSeconds = $util.Long.fromValue(object.rentalDurationSeconds)).unsigned = false;
                        else if (typeof object.rentalDurationSeconds === "string")
                            message.rentalDurationSeconds = parseInt(object.rentalDurationSeconds, 10);
                        else if (typeof object.rentalDurationSeconds === "number")
                            message.rentalDurationSeconds = object.rentalDurationSeconds;
                        else if (typeof object.rentalDurationSeconds === "object")
                            message.rentalDurationSeconds = new $util.LongBits(object.rentalDurationSeconds.low >>> 0, object.rentalDurationSeconds.high >>> 0).toNumber();
                    if (object.playbackDurationSeconds != null)
                        if ($util.Long)
                            (message.playbackDurationSeconds = $util.Long.fromValue(object.playbackDurationSeconds)).unsigned = false;
                        else if (typeof object.playbackDurationSeconds === "string")
                            message.playbackDurationSeconds = parseInt(object.playbackDurationSeconds, 10);
                        else if (typeof object.playbackDurationSeconds === "number")
                            message.playbackDurationSeconds = object.playbackDurationSeconds;
                        else if (typeof object.playbackDurationSeconds === "object")
                            message.playbackDurationSeconds = new $util.LongBits(object.playbackDurationSeconds.low >>> 0, object.playbackDurationSeconds.high >>> 0).toNumber();
                    if (object.licenseDurationSeconds != null)
                        if ($util.Long)
                            (message.licenseDurationSeconds = $util.Long.fromValue(object.licenseDurationSeconds)).unsigned = false;
                        else if (typeof object.licenseDurationSeconds === "string")
                            message.licenseDurationSeconds = parseInt(object.licenseDurationSeconds, 10);
                        else if (typeof object.licenseDurationSeconds === "number")
                            message.licenseDurationSeconds = object.licenseDurationSeconds;
                        else if (typeof object.licenseDurationSeconds === "object")
                            message.licenseDurationSeconds = new $util.LongBits(object.licenseDurationSeconds.low >>> 0, object.licenseDurationSeconds.high >>> 0).toNumber();
                    if (object.renewalRecoveryDurationSeconds != null)
                        if ($util.Long)
                            (message.renewalRecoveryDurationSeconds = $util.Long.fromValue(object.renewalRecoveryDurationSeconds)).unsigned = false;
                        else if (typeof object.renewalRecoveryDurationSeconds === "string")
                            message.renewalRecoveryDurationSeconds = parseInt(object.renewalRecoveryDurationSeconds, 10);
                        else if (typeof object.renewalRecoveryDurationSeconds === "number")
                            message.renewalRecoveryDurationSeconds = object.renewalRecoveryDurationSeconds;
                        else if (typeof object.renewalRecoveryDurationSeconds === "object")
                            message.renewalRecoveryDurationSeconds = new $util.LongBits(object.renewalRecoveryDurationSeconds.low >>> 0, object.renewalRecoveryDurationSeconds.high >>> 0).toNumber();
                    if (object.renewalServerUrl != null)
                        message.renewalServerUrl = String(object.renewalServerUrl);
                    if (object.renewalDelaySeconds != null)
                        if ($util.Long)
                            (message.renewalDelaySeconds = $util.Long.fromValue(object.renewalDelaySeconds)).unsigned = false;
                        else if (typeof object.renewalDelaySeconds === "string")
                            message.renewalDelaySeconds = parseInt(object.renewalDelaySeconds, 10);
                        else if (typeof object.renewalDelaySeconds === "number")
                            message.renewalDelaySeconds = object.renewalDelaySeconds;
                        else if (typeof object.renewalDelaySeconds === "object")
                            message.renewalDelaySeconds = new $util.LongBits(object.renewalDelaySeconds.low >>> 0, object.renewalDelaySeconds.high >>> 0).toNumber();
                    if (object.renewalRetryIntervalSeconds != null)
                        if ($util.Long)
                            (message.renewalRetryIntervalSeconds = $util.Long.fromValue(object.renewalRetryIntervalSeconds)).unsigned = false;
                        else if (typeof object.renewalRetryIntervalSeconds === "string")
                            message.renewalRetryIntervalSeconds = parseInt(object.renewalRetryIntervalSeconds, 10);
                        else if (typeof object.renewalRetryIntervalSeconds === "number")
                            message.renewalRetryIntervalSeconds = object.renewalRetryIntervalSeconds;
                        else if (typeof object.renewalRetryIntervalSeconds === "object")
                            message.renewalRetryIntervalSeconds = new $util.LongBits(object.renewalRetryIntervalSeconds.low >>> 0, object.renewalRetryIntervalSeconds.high >>> 0).toNumber();
                    if (object.renewWithUsage != null)
                        message.renewWithUsage = Boolean(object.renewWithUsage);
                    if (object.alwaysIncludeClientId != null)
                        message.alwaysIncludeClientId = Boolean(object.alwaysIncludeClientId);
                    if (object.playStartGracePeriodSeconds != null)
                        if ($util.Long)
                            (message.playStartGracePeriodSeconds = $util.Long.fromValue(object.playStartGracePeriodSeconds)).unsigned = false;
                        else if (typeof object.playStartGracePeriodSeconds === "string")
                            message.playStartGracePeriodSeconds = parseInt(object.playStartGracePeriodSeconds, 10);
                        else if (typeof object.playStartGracePeriodSeconds === "number")
                            message.playStartGracePeriodSeconds = object.playStartGracePeriodSeconds;
                        else if (typeof object.playStartGracePeriodSeconds === "object")
                            message.playStartGracePeriodSeconds = new $util.LongBits(object.playStartGracePeriodSeconds.low >>> 0, object.playStartGracePeriodSeconds.high >>> 0).toNumber();
                    if (object.softEnforcePlaybackDuration != null)
                        message.softEnforcePlaybackDuration = Boolean(object.softEnforcePlaybackDuration);
                    if (object.softEnforceRentalDuration != null)
                        message.softEnforceRentalDuration = Boolean(object.softEnforceRentalDuration);
                    return message;
                };
    
                /**
                 * Creates a plain object from a Policy message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof license_protocol.License.Policy
                 * @static
                 * @param {license_protocol.License.Policy} message Policy
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Policy.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.canPlay = false;
                        object.canPersist = false;
                        object.canRenew = false;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.rentalDurationSeconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.rentalDurationSeconds = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.playbackDurationSeconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.playbackDurationSeconds = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.licenseDurationSeconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.licenseDurationSeconds = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.renewalRecoveryDurationSeconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.renewalRecoveryDurationSeconds = options.longs === String ? "0" : 0;
                        object.renewalServerUrl = "";
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.renewalDelaySeconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.renewalDelaySeconds = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.renewalRetryIntervalSeconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.renewalRetryIntervalSeconds = options.longs === String ? "0" : 0;
                        object.renewWithUsage = false;
                        object.alwaysIncludeClientId = false;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.playStartGracePeriodSeconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.playStartGracePeriodSeconds = options.longs === String ? "0" : 0;
                        object.softEnforcePlaybackDuration = false;
                        object.softEnforceRentalDuration = true;
                    }
                    if (message.canPlay != null && message.hasOwnProperty("canPlay"))
                        object.canPlay = message.canPlay;
                    if (message.canPersist != null && message.hasOwnProperty("canPersist"))
                        object.canPersist = message.canPersist;
                    if (message.canRenew != null && message.hasOwnProperty("canRenew"))
                        object.canRenew = message.canRenew;
                    if (message.rentalDurationSeconds != null && message.hasOwnProperty("rentalDurationSeconds"))
                        if (typeof message.rentalDurationSeconds === "number")
                            object.rentalDurationSeconds = options.longs === String ? String(message.rentalDurationSeconds) : message.rentalDurationSeconds;
                        else
                            object.rentalDurationSeconds = options.longs === String ? $util.Long.prototype.toString.call(message.rentalDurationSeconds) : options.longs === Number ? new $util.LongBits(message.rentalDurationSeconds.low >>> 0, message.rentalDurationSeconds.high >>> 0).toNumber() : message.rentalDurationSeconds;
                    if (message.playbackDurationSeconds != null && message.hasOwnProperty("playbackDurationSeconds"))
                        if (typeof message.playbackDurationSeconds === "number")
                            object.playbackDurationSeconds = options.longs === String ? String(message.playbackDurationSeconds) : message.playbackDurationSeconds;
                        else
                            object.playbackDurationSeconds = options.longs === String ? $util.Long.prototype.toString.call(message.playbackDurationSeconds) : options.longs === Number ? new $util.LongBits(message.playbackDurationSeconds.low >>> 0, message.playbackDurationSeconds.high >>> 0).toNumber() : message.playbackDurationSeconds;
                    if (message.licenseDurationSeconds != null && message.hasOwnProperty("licenseDurationSeconds"))
                        if (typeof message.licenseDurationSeconds === "number")
                            object.licenseDurationSeconds = options.longs === String ? String(message.licenseDurationSeconds) : message.licenseDurationSeconds;
                        else
                            object.licenseDurationSeconds = options.longs === String ? $util.Long.prototype.toString.call(message.licenseDurationSeconds) : options.longs === Number ? new $util.LongBits(message.licenseDurationSeconds.low >>> 0, message.licenseDurationSeconds.high >>> 0).toNumber() : message.licenseDurationSeconds;
                    if (message.renewalRecoveryDurationSeconds != null && message.hasOwnProperty("renewalRecoveryDurationSeconds"))
                        if (typeof message.renewalRecoveryDurationSeconds === "number")
                            object.renewalRecoveryDurationSeconds = options.longs === String ? String(message.renewalRecoveryDurationSeconds) : message.renewalRecoveryDurationSeconds;
                        else
                            object.renewalRecoveryDurationSeconds = options.longs === String ? $util.Long.prototype.toString.call(message.renewalRecoveryDurationSeconds) : options.longs === Number ? new $util.LongBits(message.renewalRecoveryDurationSeconds.low >>> 0, message.renewalRecoveryDurationSeconds.high >>> 0).toNumber() : message.renewalRecoveryDurationSeconds;
                    if (message.renewalServerUrl != null && message.hasOwnProperty("renewalServerUrl"))
                        object.renewalServerUrl = message.renewalServerUrl;
                    if (message.renewalDelaySeconds != null && message.hasOwnProperty("renewalDelaySeconds"))
                        if (typeof message.renewalDelaySeconds === "number")
                            object.renewalDelaySeconds = options.longs === String ? String(message.renewalDelaySeconds) : message.renewalDelaySeconds;
                        else
                            object.renewalDelaySeconds = options.longs === String ? $util.Long.prototype.toString.call(message.renewalDelaySeconds) : options.longs === Number ? new $util.LongBits(message.renewalDelaySeconds.low >>> 0, message.renewalDelaySeconds.high >>> 0).toNumber() : message.renewalDelaySeconds;
                    if (message.renewalRetryIntervalSeconds != null && message.hasOwnProperty("renewalRetryIntervalSeconds"))
                        if (typeof message.renewalRetryIntervalSeconds === "number")
                            object.renewalRetryIntervalSeconds = options.longs === String ? String(message.renewalRetryIntervalSeconds) : message.renewalRetryIntervalSeconds;
                        else
                            object.renewalRetryIntervalSeconds = options.longs === String ? $util.Long.prototype.toString.call(message.renewalRetryIntervalSeconds) : options.longs === Number ? new $util.LongBits(message.renewalRetryIntervalSeconds.low >>> 0, message.renewalRetryIntervalSeconds.high >>> 0).toNumber() : message.renewalRetryIntervalSeconds;
                    if (message.renewWithUsage != null && message.hasOwnProperty("renewWithUsage"))
                        object.renewWithUsage = message.renewWithUsage;
                    if (message.alwaysIncludeClientId != null && message.hasOwnProperty("alwaysIncludeClientId"))
                        object.alwaysIncludeClientId = message.alwaysIncludeClientId;
                    if (message.playStartGracePeriodSeconds != null && message.hasOwnProperty("playStartGracePeriodSeconds"))
                        if (typeof message.playStartGracePeriodSeconds === "number")
                            object.playStartGracePeriodSeconds = options.longs === String ? String(message.playStartGracePeriodSeconds) : message.playStartGracePeriodSeconds;
                        else
                            object.playStartGracePeriodSeconds = options.longs === String ? $util.Long.prototype.toString.call(message.playStartGracePeriodSeconds) : options.longs === Number ? new $util.LongBits(message.playStartGracePeriodSeconds.low >>> 0, message.playStartGracePeriodSeconds.high >>> 0).toNumber() : message.playStartGracePeriodSeconds;
                    if (message.softEnforcePlaybackDuration != null && message.hasOwnProperty("softEnforcePlaybackDuration"))
                        object.softEnforcePlaybackDuration = message.softEnforcePlaybackDuration;
                    if (message.softEnforceRentalDuration != null && message.hasOwnProperty("softEnforceRentalDuration"))
                        object.softEnforceRentalDuration = message.softEnforceRentalDuration;
                    return object;
                };
    
                /**
                 * Converts this Policy to JSON.
                 * @function toJSON
                 * @memberof license_protocol.License.Policy
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Policy.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * Gets the default type url for Policy
                 * @function getTypeUrl
                 * @memberof license_protocol.License.Policy
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Policy.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/license_protocol.License.Policy";
                };
    
                return Policy;
            })();
    
            License.KeyContainer = (function() {
    
                /**
                 * Properties of a KeyContainer.
                 * @memberof license_protocol.License
                 * @interface IKeyContainer
                 * @property {Uint8Array|null} [id] KeyContainer id
                 * @property {Uint8Array|null} [iv] KeyContainer iv
                 * @property {Uint8Array|null} [key] KeyContainer key
                 * @property {license_protocol.License.KeyContainer.KeyType|null} [type] KeyContainer type
                 * @property {license_protocol.License.KeyContainer.SecurityLevel|null} [level] KeyContainer level
                 * @property {license_protocol.License.KeyContainer.IOutputProtection|null} [requiredProtection] KeyContainer requiredProtection
                 * @property {license_protocol.License.KeyContainer.IOutputProtection|null} [requestedProtection] KeyContainer requestedProtection
                 * @property {license_protocol.License.KeyContainer.IKeyControl|null} [keyControl] KeyContainer keyControl
                 * @property {license_protocol.License.KeyContainer.IOperatorSessionKeyPermissions|null} [operatorSessionKeyPermissions] KeyContainer operatorSessionKeyPermissions
                 * @property {Array.<license_protocol.License.KeyContainer.IVideoResolutionConstraint>|null} [videoResolutionConstraints] KeyContainer videoResolutionConstraints
                 * @property {boolean|null} [antiRollbackUsageTable] KeyContainer antiRollbackUsageTable
                 * @property {string|null} [trackLabel] KeyContainer trackLabel
                 */
    
                /**
                 * Constructs a new KeyContainer.
                 * @memberof license_protocol.License
                 * @classdesc Represents a KeyContainer.
                 * @implements IKeyContainer
                 * @constructor
                 * @param {license_protocol.License.IKeyContainer=} [properties] Properties to set
                 */
                function KeyContainer(properties) {
                    this.videoResolutionConstraints = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * KeyContainer id.
                 * @member {Uint8Array} id
                 * @memberof license_protocol.License.KeyContainer
                 * @instance
                 */
                KeyContainer.prototype.id = $util.newBuffer([]);
    
                /**
                 * KeyContainer iv.
                 * @member {Uint8Array} iv
                 * @memberof license_protocol.License.KeyContainer
                 * @instance
                 */
                KeyContainer.prototype.iv = $util.newBuffer([]);
    
                /**
                 * KeyContainer key.
                 * @member {Uint8Array} key
                 * @memberof license_protocol.License.KeyContainer
                 * @instance
                 */
                KeyContainer.prototype.key = $util.newBuffer([]);
    
                /**
                 * KeyContainer type.
                 * @member {license_protocol.License.KeyContainer.KeyType} type
                 * @memberof license_protocol.License.KeyContainer
                 * @instance
                 */
                KeyContainer.prototype.type = 1;
    
                /**
                 * KeyContainer level.
                 * @member {license_protocol.License.KeyContainer.SecurityLevel} level
                 * @memberof license_protocol.License.KeyContainer
                 * @instance
                 */
                KeyContainer.prototype.level = 1;
    
                /**
                 * KeyContainer requiredProtection.
                 * @member {license_protocol.License.KeyContainer.IOutputProtection|null|undefined} requiredProtection
                 * @memberof license_protocol.License.KeyContainer
                 * @instance
                 */
                KeyContainer.prototype.requiredProtection = null;
    
                /**
                 * KeyContainer requestedProtection.
                 * @member {license_protocol.License.KeyContainer.IOutputProtection|null|undefined} requestedProtection
                 * @memberof license_protocol.License.KeyContainer
                 * @instance
                 */
                KeyContainer.prototype.requestedProtection = null;
    
                /**
                 * KeyContainer keyControl.
                 * @member {license_protocol.License.KeyContainer.IKeyControl|null|undefined} keyControl
                 * @memberof license_protocol.License.KeyContainer
                 * @instance
                 */
                KeyContainer.prototype.keyControl = null;
    
                /**
                 * KeyContainer operatorSessionKeyPermissions.
                 * @member {license_protocol.License.KeyContainer.IOperatorSessionKeyPermissions|null|undefined} operatorSessionKeyPermissions
                 * @memberof license_protocol.License.KeyContainer
                 * @instance
                 */
                KeyContainer.prototype.operatorSessionKeyPermissions = null;
    
                /**
                 * KeyContainer videoResolutionConstraints.
                 * @member {Array.<license_protocol.License.KeyContainer.IVideoResolutionConstraint>} videoResolutionConstraints
                 * @memberof license_protocol.License.KeyContainer
                 * @instance
                 */
                KeyContainer.prototype.videoResolutionConstraints = $util.emptyArray;
    
                /**
                 * KeyContainer antiRollbackUsageTable.
                 * @member {boolean} antiRollbackUsageTable
                 * @memberof license_protocol.License.KeyContainer
                 * @instance
                 */
                KeyContainer.prototype.antiRollbackUsageTable = false;
    
                /**
                 * KeyContainer trackLabel.
                 * @member {string} trackLabel
                 * @memberof license_protocol.License.KeyContainer
                 * @instance
                 */
                KeyContainer.prototype.trackLabel = "";
    
                /**
                 * Creates a new KeyContainer instance using the specified properties.
                 * @function create
                 * @memberof license_protocol.License.KeyContainer
                 * @static
                 * @param {license_protocol.License.IKeyContainer=} [properties] Properties to set
                 * @returns {license_protocol.License.KeyContainer} KeyContainer instance
                 */
                KeyContainer.create = function create(properties) {
                    return new KeyContainer(properties);
                };
    
                /**
                 * Encodes the specified KeyContainer message. Does not implicitly {@link license_protocol.License.KeyContainer.verify|verify} messages.
                 * @function encode
                 * @memberof license_protocol.License.KeyContainer
                 * @static
                 * @param {license_protocol.License.IKeyContainer} message KeyContainer message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                KeyContainer.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.id);
                    if (message.iv != null && Object.hasOwnProperty.call(message, "iv"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.iv);
                    if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                        writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.key);
                    if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.type);
                    if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                        writer.uint32(/* id 5, wireType 0 =*/40).int32(message.level);
                    if (message.requiredProtection != null && Object.hasOwnProperty.call(message, "requiredProtection"))
                        $root.license_protocol.License.KeyContainer.OutputProtection.encode(message.requiredProtection, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.requestedProtection != null && Object.hasOwnProperty.call(message, "requestedProtection"))
                        $root.license_protocol.License.KeyContainer.OutputProtection.encode(message.requestedProtection, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                    if (message.keyControl != null && Object.hasOwnProperty.call(message, "keyControl"))
                        $root.license_protocol.License.KeyContainer.KeyControl.encode(message.keyControl, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                    if (message.operatorSessionKeyPermissions != null && Object.hasOwnProperty.call(message, "operatorSessionKeyPermissions"))
                        $root.license_protocol.License.KeyContainer.OperatorSessionKeyPermissions.encode(message.operatorSessionKeyPermissions, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                    if (message.videoResolutionConstraints != null && message.videoResolutionConstraints.length)
                        for (var i = 0; i < message.videoResolutionConstraints.length; ++i)
                            $root.license_protocol.License.KeyContainer.VideoResolutionConstraint.encode(message.videoResolutionConstraints[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                    if (message.antiRollbackUsageTable != null && Object.hasOwnProperty.call(message, "antiRollbackUsageTable"))
                        writer.uint32(/* id 11, wireType 0 =*/88).bool(message.antiRollbackUsageTable);
                    if (message.trackLabel != null && Object.hasOwnProperty.call(message, "trackLabel"))
                        writer.uint32(/* id 12, wireType 2 =*/98).string(message.trackLabel);
                    return writer;
                };
    
                /**
                 * Encodes the specified KeyContainer message, length delimited. Does not implicitly {@link license_protocol.License.KeyContainer.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof license_protocol.License.KeyContainer
                 * @static
                 * @param {license_protocol.License.IKeyContainer} message KeyContainer message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                KeyContainer.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a KeyContainer message from the specified reader or buffer.
                 * @function decode
                 * @memberof license_protocol.License.KeyContainer
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {license_protocol.License.KeyContainer} KeyContainer
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                KeyContainer.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.License.KeyContainer();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.id = reader.bytes();
                                break;
                            }
                        case 2: {
                                message.iv = reader.bytes();
                                break;
                            }
                        case 3: {
                                message.key = reader.bytes();
                                break;
                            }
                        case 4: {
                                message.type = reader.int32();
                                break;
                            }
                        case 5: {
                                message.level = reader.int32();
                                break;
                            }
                        case 6: {
                                message.requiredProtection = $root.license_protocol.License.KeyContainer.OutputProtection.decode(reader, reader.uint32());
                                break;
                            }
                        case 7: {
                                message.requestedProtection = $root.license_protocol.License.KeyContainer.OutputProtection.decode(reader, reader.uint32());
                                break;
                            }
                        case 8: {
                                message.keyControl = $root.license_protocol.License.KeyContainer.KeyControl.decode(reader, reader.uint32());
                                break;
                            }
                        case 9: {
                                message.operatorSessionKeyPermissions = $root.license_protocol.License.KeyContainer.OperatorSessionKeyPermissions.decode(reader, reader.uint32());
                                break;
                            }
                        case 10: {
                                if (!(message.videoResolutionConstraints && message.videoResolutionConstraints.length))
                                    message.videoResolutionConstraints = [];
                                message.videoResolutionConstraints.push($root.license_protocol.License.KeyContainer.VideoResolutionConstraint.decode(reader, reader.uint32()));
                                break;
                            }
                        case 11: {
                                message.antiRollbackUsageTable = reader.bool();
                                break;
                            }
                        case 12: {
                                message.trackLabel = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a KeyContainer message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof license_protocol.License.KeyContainer
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {license_protocol.License.KeyContainer} KeyContainer
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                KeyContainer.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a KeyContainer message.
                 * @function verify
                 * @memberof license_protocol.License.KeyContainer
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                KeyContainer.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!(message.id && typeof message.id.length === "number" || $util.isString(message.id)))
                            return "id: buffer expected";
                    if (message.iv != null && message.hasOwnProperty("iv"))
                        if (!(message.iv && typeof message.iv.length === "number" || $util.isString(message.iv)))
                            return "iv: buffer expected";
                    if (message.key != null && message.hasOwnProperty("key"))
                        if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                            return "key: buffer expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            break;
                        }
                    if (message.level != null && message.hasOwnProperty("level"))
                        switch (message.level) {
                        default:
                            return "level: enum value expected";
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            break;
                        }
                    if (message.requiredProtection != null && message.hasOwnProperty("requiredProtection")) {
                        var error = $root.license_protocol.License.KeyContainer.OutputProtection.verify(message.requiredProtection);
                        if (error)
                            return "requiredProtection." + error;
                    }
                    if (message.requestedProtection != null && message.hasOwnProperty("requestedProtection")) {
                        var error = $root.license_protocol.License.KeyContainer.OutputProtection.verify(message.requestedProtection);
                        if (error)
                            return "requestedProtection." + error;
                    }
                    if (message.keyControl != null && message.hasOwnProperty("keyControl")) {
                        var error = $root.license_protocol.License.KeyContainer.KeyControl.verify(message.keyControl);
                        if (error)
                            return "keyControl." + error;
                    }
                    if (message.operatorSessionKeyPermissions != null && message.hasOwnProperty("operatorSessionKeyPermissions")) {
                        var error = $root.license_protocol.License.KeyContainer.OperatorSessionKeyPermissions.verify(message.operatorSessionKeyPermissions);
                        if (error)
                            return "operatorSessionKeyPermissions." + error;
                    }
                    if (message.videoResolutionConstraints != null && message.hasOwnProperty("videoResolutionConstraints")) {
                        if (!Array.isArray(message.videoResolutionConstraints))
                            return "videoResolutionConstraints: array expected";
                        for (var i = 0; i < message.videoResolutionConstraints.length; ++i) {
                            var error = $root.license_protocol.License.KeyContainer.VideoResolutionConstraint.verify(message.videoResolutionConstraints[i]);
                            if (error)
                                return "videoResolutionConstraints." + error;
                        }
                    }
                    if (message.antiRollbackUsageTable != null && message.hasOwnProperty("antiRollbackUsageTable"))
                        if (typeof message.antiRollbackUsageTable !== "boolean")
                            return "antiRollbackUsageTable: boolean expected";
                    if (message.trackLabel != null && message.hasOwnProperty("trackLabel"))
                        if (!$util.isString(message.trackLabel))
                            return "trackLabel: string expected";
                    return null;
                };
    
                /**
                 * Creates a KeyContainer message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof license_protocol.License.KeyContainer
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {license_protocol.License.KeyContainer} KeyContainer
                 */
                KeyContainer.fromObject = function fromObject(object) {
                    if (object instanceof $root.license_protocol.License.KeyContainer)
                        return object;
                    var message = new $root.license_protocol.License.KeyContainer();
                    if (object.id != null)
                        if (typeof object.id === "string")
                            $util.base64.decode(object.id, message.id = $util.newBuffer($util.base64.length(object.id)), 0);
                        else if (object.id.length >= 0)
                            message.id = object.id;
                    if (object.iv != null)
                        if (typeof object.iv === "string")
                            $util.base64.decode(object.iv, message.iv = $util.newBuffer($util.base64.length(object.iv)), 0);
                        else if (object.iv.length >= 0)
                            message.iv = object.iv;
                    if (object.key != null)
                        if (typeof object.key === "string")
                            $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                        else if (object.key.length >= 0)
                            message.key = object.key;
                    switch (object.type) {
                    default:
                        if (typeof object.type === "number") {
                            message.type = object.type;
                            break;
                        }
                        break;
                    case "SIGNING":
                    case 1:
                        message.type = 1;
                        break;
                    case "CONTENT":
                    case 2:
                        message.type = 2;
                        break;
                    case "KEY_CONTROL":
                    case 3:
                        message.type = 3;
                        break;
                    case "OPERATOR_SESSION":
                    case 4:
                        message.type = 4;
                        break;
                    case "ENTITLEMENT":
                    case 5:
                        message.type = 5;
                        break;
                    case "OEM_CONTENT":
                    case 6:
                        message.type = 6;
                        break;
                    }
                    switch (object.level) {
                    default:
                        if (typeof object.level === "number") {
                            message.level = object.level;
                            break;
                        }
                        break;
                    case "SW_SECURE_CRYPTO":
                    case 1:
                        message.level = 1;
                        break;
                    case "SW_SECURE_DECODE":
                    case 2:
                        message.level = 2;
                        break;
                    case "HW_SECURE_CRYPTO":
                    case 3:
                        message.level = 3;
                        break;
                    case "HW_SECURE_DECODE":
                    case 4:
                        message.level = 4;
                        break;
                    case "HW_SECURE_ALL":
                    case 5:
                        message.level = 5;
                        break;
                    }
                    if (object.requiredProtection != null) {
                        if (typeof object.requiredProtection !== "object")
                            throw TypeError(".license_protocol.License.KeyContainer.requiredProtection: object expected");
                        message.requiredProtection = $root.license_protocol.License.KeyContainer.OutputProtection.fromObject(object.requiredProtection);
                    }
                    if (object.requestedProtection != null) {
                        if (typeof object.requestedProtection !== "object")
                            throw TypeError(".license_protocol.License.KeyContainer.requestedProtection: object expected");
                        message.requestedProtection = $root.license_protocol.License.KeyContainer.OutputProtection.fromObject(object.requestedProtection);
                    }
                    if (object.keyControl != null) {
                        if (typeof object.keyControl !== "object")
                            throw TypeError(".license_protocol.License.KeyContainer.keyControl: object expected");
                        message.keyControl = $root.license_protocol.License.KeyContainer.KeyControl.fromObject(object.keyControl);
                    }
                    if (object.operatorSessionKeyPermissions != null) {
                        if (typeof object.operatorSessionKeyPermissions !== "object")
                            throw TypeError(".license_protocol.License.KeyContainer.operatorSessionKeyPermissions: object expected");
                        message.operatorSessionKeyPermissions = $root.license_protocol.License.KeyContainer.OperatorSessionKeyPermissions.fromObject(object.operatorSessionKeyPermissions);
                    }
                    if (object.videoResolutionConstraints) {
                        if (!Array.isArray(object.videoResolutionConstraints))
                            throw TypeError(".license_protocol.License.KeyContainer.videoResolutionConstraints: array expected");
                        message.videoResolutionConstraints = [];
                        for (var i = 0; i < object.videoResolutionConstraints.length; ++i) {
                            if (typeof object.videoResolutionConstraints[i] !== "object")
                                throw TypeError(".license_protocol.License.KeyContainer.videoResolutionConstraints: object expected");
                            message.videoResolutionConstraints[i] = $root.license_protocol.License.KeyContainer.VideoResolutionConstraint.fromObject(object.videoResolutionConstraints[i]);
                        }
                    }
                    if (object.antiRollbackUsageTable != null)
                        message.antiRollbackUsageTable = Boolean(object.antiRollbackUsageTable);
                    if (object.trackLabel != null)
                        message.trackLabel = String(object.trackLabel);
                    return message;
                };
    
                /**
                 * Creates a plain object from a KeyContainer message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof license_protocol.License.KeyContainer
                 * @static
                 * @param {license_protocol.License.KeyContainer} message KeyContainer
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                KeyContainer.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.videoResolutionConstraints = [];
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.id = "";
                        else {
                            object.id = [];
                            if (options.bytes !== Array)
                                object.id = $util.newBuffer(object.id);
                        }
                        if (options.bytes === String)
                            object.iv = "";
                        else {
                            object.iv = [];
                            if (options.bytes !== Array)
                                object.iv = $util.newBuffer(object.iv);
                        }
                        if (options.bytes === String)
                            object.key = "";
                        else {
                            object.key = [];
                            if (options.bytes !== Array)
                                object.key = $util.newBuffer(object.key);
                        }
                        object.type = options.enums === String ? "SIGNING" : 1;
                        object.level = options.enums === String ? "SW_SECURE_CRYPTO" : 1;
                        object.requiredProtection = null;
                        object.requestedProtection = null;
                        object.keyControl = null;
                        object.operatorSessionKeyPermissions = null;
                        object.antiRollbackUsageTable = false;
                        object.trackLabel = "";
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = options.bytes === String ? $util.base64.encode(message.id, 0, message.id.length) : options.bytes === Array ? Array.prototype.slice.call(message.id) : message.id;
                    if (message.iv != null && message.hasOwnProperty("iv"))
                        object.iv = options.bytes === String ? $util.base64.encode(message.iv, 0, message.iv.length) : options.bytes === Array ? Array.prototype.slice.call(message.iv) : message.iv;
                    if (message.key != null && message.hasOwnProperty("key"))
                        object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.license_protocol.License.KeyContainer.KeyType[message.type] === undefined ? message.type : $root.license_protocol.License.KeyContainer.KeyType[message.type] : message.type;
                    if (message.level != null && message.hasOwnProperty("level"))
                        object.level = options.enums === String ? $root.license_protocol.License.KeyContainer.SecurityLevel[message.level] === undefined ? message.level : $root.license_protocol.License.KeyContainer.SecurityLevel[message.level] : message.level;
                    if (message.requiredProtection != null && message.hasOwnProperty("requiredProtection"))
                        object.requiredProtection = $root.license_protocol.License.KeyContainer.OutputProtection.toObject(message.requiredProtection, options);
                    if (message.requestedProtection != null && message.hasOwnProperty("requestedProtection"))
                        object.requestedProtection = $root.license_protocol.License.KeyContainer.OutputProtection.toObject(message.requestedProtection, options);
                    if (message.keyControl != null && message.hasOwnProperty("keyControl"))
                        object.keyControl = $root.license_protocol.License.KeyContainer.KeyControl.toObject(message.keyControl, options);
                    if (message.operatorSessionKeyPermissions != null && message.hasOwnProperty("operatorSessionKeyPermissions"))
                        object.operatorSessionKeyPermissions = $root.license_protocol.License.KeyContainer.OperatorSessionKeyPermissions.toObject(message.operatorSessionKeyPermissions, options);
                    if (message.videoResolutionConstraints && message.videoResolutionConstraints.length) {
                        object.videoResolutionConstraints = [];
                        for (var j = 0; j < message.videoResolutionConstraints.length; ++j)
                            object.videoResolutionConstraints[j] = $root.license_protocol.License.KeyContainer.VideoResolutionConstraint.toObject(message.videoResolutionConstraints[j], options);
                    }
                    if (message.antiRollbackUsageTable != null && message.hasOwnProperty("antiRollbackUsageTable"))
                        object.antiRollbackUsageTable = message.antiRollbackUsageTable;
                    if (message.trackLabel != null && message.hasOwnProperty("trackLabel"))
                        object.trackLabel = message.trackLabel;
                    return object;
                };
    
                /**
                 * Converts this KeyContainer to JSON.
                 * @function toJSON
                 * @memberof license_protocol.License.KeyContainer
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                KeyContainer.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * Gets the default type url for KeyContainer
                 * @function getTypeUrl
                 * @memberof license_protocol.License.KeyContainer
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                KeyContainer.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/license_protocol.License.KeyContainer";
                };
    
                /**
                 * KeyType enum.
                 * @name license_protocol.License.KeyContainer.KeyType
                 * @enum {number}
                 * @property {number} SIGNING=1 SIGNING value
                 * @property {number} CONTENT=2 CONTENT value
                 * @property {number} KEY_CONTROL=3 KEY_CONTROL value
                 * @property {number} OPERATOR_SESSION=4 OPERATOR_SESSION value
                 * @property {number} ENTITLEMENT=5 ENTITLEMENT value
                 * @property {number} OEM_CONTENT=6 OEM_CONTENT value
                 */
                KeyContainer.KeyType = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[1] = "SIGNING"] = 1;
                    values[valuesById[2] = "CONTENT"] = 2;
                    values[valuesById[3] = "KEY_CONTROL"] = 3;
                    values[valuesById[4] = "OPERATOR_SESSION"] = 4;
                    values[valuesById[5] = "ENTITLEMENT"] = 5;
                    values[valuesById[6] = "OEM_CONTENT"] = 6;
                    return values;
                })();
    
                /**
                 * SecurityLevel enum.
                 * @name license_protocol.License.KeyContainer.SecurityLevel
                 * @enum {number}
                 * @property {number} SW_SECURE_CRYPTO=1 SW_SECURE_CRYPTO value
                 * @property {number} SW_SECURE_DECODE=2 SW_SECURE_DECODE value
                 * @property {number} HW_SECURE_CRYPTO=3 HW_SECURE_CRYPTO value
                 * @property {number} HW_SECURE_DECODE=4 HW_SECURE_DECODE value
                 * @property {number} HW_SECURE_ALL=5 HW_SECURE_ALL value
                 */
                KeyContainer.SecurityLevel = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[1] = "SW_SECURE_CRYPTO"] = 1;
                    values[valuesById[2] = "SW_SECURE_DECODE"] = 2;
                    values[valuesById[3] = "HW_SECURE_CRYPTO"] = 3;
                    values[valuesById[4] = "HW_SECURE_DECODE"] = 4;
                    values[valuesById[5] = "HW_SECURE_ALL"] = 5;
                    return values;
                })();
    
                KeyContainer.KeyControl = (function() {
    
                    /**
                     * Properties of a KeyControl.
                     * @memberof license_protocol.License.KeyContainer
                     * @interface IKeyControl
                     * @property {Uint8Array|null} [keyControlBlock] KeyControl keyControlBlock
                     * @property {Uint8Array|null} [iv] KeyControl iv
                     */
    
                    /**
                     * Constructs a new KeyControl.
                     * @memberof license_protocol.License.KeyContainer
                     * @classdesc Represents a KeyControl.
                     * @implements IKeyControl
                     * @constructor
                     * @param {license_protocol.License.KeyContainer.IKeyControl=} [properties] Properties to set
                     */
                    function KeyControl(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * KeyControl keyControlBlock.
                     * @member {Uint8Array} keyControlBlock
                     * @memberof license_protocol.License.KeyContainer.KeyControl
                     * @instance
                     */
                    KeyControl.prototype.keyControlBlock = $util.newBuffer([]);
    
                    /**
                     * KeyControl iv.
                     * @member {Uint8Array} iv
                     * @memberof license_protocol.License.KeyContainer.KeyControl
                     * @instance
                     */
                    KeyControl.prototype.iv = $util.newBuffer([]);
    
                    /**
                     * Creates a new KeyControl instance using the specified properties.
                     * @function create
                     * @memberof license_protocol.License.KeyContainer.KeyControl
                     * @static
                     * @param {license_protocol.License.KeyContainer.IKeyControl=} [properties] Properties to set
                     * @returns {license_protocol.License.KeyContainer.KeyControl} KeyControl instance
                     */
                    KeyControl.create = function create(properties) {
                        return new KeyControl(properties);
                    };
    
                    /**
                     * Encodes the specified KeyControl message. Does not implicitly {@link license_protocol.License.KeyContainer.KeyControl.verify|verify} messages.
                     * @function encode
                     * @memberof license_protocol.License.KeyContainer.KeyControl
                     * @static
                     * @param {license_protocol.License.KeyContainer.IKeyControl} message KeyControl message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    KeyControl.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.keyControlBlock != null && Object.hasOwnProperty.call(message, "keyControlBlock"))
                            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.keyControlBlock);
                        if (message.iv != null && Object.hasOwnProperty.call(message, "iv"))
                            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.iv);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified KeyControl message, length delimited. Does not implicitly {@link license_protocol.License.KeyContainer.KeyControl.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof license_protocol.License.KeyContainer.KeyControl
                     * @static
                     * @param {license_protocol.License.KeyContainer.IKeyControl} message KeyControl message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    KeyControl.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a KeyControl message from the specified reader or buffer.
                     * @function decode
                     * @memberof license_protocol.License.KeyContainer.KeyControl
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {license_protocol.License.KeyContainer.KeyControl} KeyControl
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    KeyControl.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.License.KeyContainer.KeyControl();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1: {
                                    message.keyControlBlock = reader.bytes();
                                    break;
                                }
                            case 2: {
                                    message.iv = reader.bytes();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a KeyControl message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof license_protocol.License.KeyContainer.KeyControl
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {license_protocol.License.KeyContainer.KeyControl} KeyControl
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    KeyControl.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a KeyControl message.
                     * @function verify
                     * @memberof license_protocol.License.KeyContainer.KeyControl
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    KeyControl.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.keyControlBlock != null && message.hasOwnProperty("keyControlBlock"))
                            if (!(message.keyControlBlock && typeof message.keyControlBlock.length === "number" || $util.isString(message.keyControlBlock)))
                                return "keyControlBlock: buffer expected";
                        if (message.iv != null && message.hasOwnProperty("iv"))
                            if (!(message.iv && typeof message.iv.length === "number" || $util.isString(message.iv)))
                                return "iv: buffer expected";
                        return null;
                    };
    
                    /**
                     * Creates a KeyControl message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof license_protocol.License.KeyContainer.KeyControl
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {license_protocol.License.KeyContainer.KeyControl} KeyControl
                     */
                    KeyControl.fromObject = function fromObject(object) {
                        if (object instanceof $root.license_protocol.License.KeyContainer.KeyControl)
                            return object;
                        var message = new $root.license_protocol.License.KeyContainer.KeyControl();
                        if (object.keyControlBlock != null)
                            if (typeof object.keyControlBlock === "string")
                                $util.base64.decode(object.keyControlBlock, message.keyControlBlock = $util.newBuffer($util.base64.length(object.keyControlBlock)), 0);
                            else if (object.keyControlBlock.length >= 0)
                                message.keyControlBlock = object.keyControlBlock;
                        if (object.iv != null)
                            if (typeof object.iv === "string")
                                $util.base64.decode(object.iv, message.iv = $util.newBuffer($util.base64.length(object.iv)), 0);
                            else if (object.iv.length >= 0)
                                message.iv = object.iv;
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a KeyControl message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof license_protocol.License.KeyContainer.KeyControl
                     * @static
                     * @param {license_protocol.License.KeyContainer.KeyControl} message KeyControl
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    KeyControl.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            if (options.bytes === String)
                                object.keyControlBlock = "";
                            else {
                                object.keyControlBlock = [];
                                if (options.bytes !== Array)
                                    object.keyControlBlock = $util.newBuffer(object.keyControlBlock);
                            }
                            if (options.bytes === String)
                                object.iv = "";
                            else {
                                object.iv = [];
                                if (options.bytes !== Array)
                                    object.iv = $util.newBuffer(object.iv);
                            }
                        }
                        if (message.keyControlBlock != null && message.hasOwnProperty("keyControlBlock"))
                            object.keyControlBlock = options.bytes === String ? $util.base64.encode(message.keyControlBlock, 0, message.keyControlBlock.length) : options.bytes === Array ? Array.prototype.slice.call(message.keyControlBlock) : message.keyControlBlock;
                        if (message.iv != null && message.hasOwnProperty("iv"))
                            object.iv = options.bytes === String ? $util.base64.encode(message.iv, 0, message.iv.length) : options.bytes === Array ? Array.prototype.slice.call(message.iv) : message.iv;
                        return object;
                    };
    
                    /**
                     * Converts this KeyControl to JSON.
                     * @function toJSON
                     * @memberof license_protocol.License.KeyContainer.KeyControl
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    KeyControl.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    /**
                     * Gets the default type url for KeyControl
                     * @function getTypeUrl
                     * @memberof license_protocol.License.KeyContainer.KeyControl
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    KeyControl.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/license_protocol.License.KeyContainer.KeyControl";
                    };
    
                    return KeyControl;
                })();
    
                KeyContainer.OutputProtection = (function() {
    
                    /**
                     * Properties of an OutputProtection.
                     * @memberof license_protocol.License.KeyContainer
                     * @interface IOutputProtection
                     * @property {license_protocol.License.KeyContainer.OutputProtection.HDCP|null} [hdcp] OutputProtection hdcp
                     * @property {license_protocol.License.KeyContainer.OutputProtection.CGMS|null} [cgmsFlags] OutputProtection cgmsFlags
                     * @property {license_protocol.License.KeyContainer.OutputProtection.HdcpSrmRule|null} [hdcpSrmRule] OutputProtection hdcpSrmRule
                     * @property {boolean|null} [disableAnalogOutput] OutputProtection disableAnalogOutput
                     * @property {boolean|null} [disableDigitalOutput] OutputProtection disableDigitalOutput
                     */
    
                    /**
                     * Constructs a new OutputProtection.
                     * @memberof license_protocol.License.KeyContainer
                     * @classdesc Represents an OutputProtection.
                     * @implements IOutputProtection
                     * @constructor
                     * @param {license_protocol.License.KeyContainer.IOutputProtection=} [properties] Properties to set
                     */
                    function OutputProtection(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * OutputProtection hdcp.
                     * @member {license_protocol.License.KeyContainer.OutputProtection.HDCP} hdcp
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @instance
                     */
                    OutputProtection.prototype.hdcp = 0;
    
                    /**
                     * OutputProtection cgmsFlags.
                     * @member {license_protocol.License.KeyContainer.OutputProtection.CGMS} cgmsFlags
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @instance
                     */
                    OutputProtection.prototype.cgmsFlags = 42;
    
                    /**
                     * OutputProtection hdcpSrmRule.
                     * @member {license_protocol.License.KeyContainer.OutputProtection.HdcpSrmRule} hdcpSrmRule
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @instance
                     */
                    OutputProtection.prototype.hdcpSrmRule = 0;
    
                    /**
                     * OutputProtection disableAnalogOutput.
                     * @member {boolean} disableAnalogOutput
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @instance
                     */
                    OutputProtection.prototype.disableAnalogOutput = false;
    
                    /**
                     * OutputProtection disableDigitalOutput.
                     * @member {boolean} disableDigitalOutput
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @instance
                     */
                    OutputProtection.prototype.disableDigitalOutput = false;
    
                    /**
                     * Creates a new OutputProtection instance using the specified properties.
                     * @function create
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @static
                     * @param {license_protocol.License.KeyContainer.IOutputProtection=} [properties] Properties to set
                     * @returns {license_protocol.License.KeyContainer.OutputProtection} OutputProtection instance
                     */
                    OutputProtection.create = function create(properties) {
                        return new OutputProtection(properties);
                    };
    
                    /**
                     * Encodes the specified OutputProtection message. Does not implicitly {@link license_protocol.License.KeyContainer.OutputProtection.verify|verify} messages.
                     * @function encode
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @static
                     * @param {license_protocol.License.KeyContainer.IOutputProtection} message OutputProtection message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    OutputProtection.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.hdcp != null && Object.hasOwnProperty.call(message, "hdcp"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.hdcp);
                        if (message.cgmsFlags != null && Object.hasOwnProperty.call(message, "cgmsFlags"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.cgmsFlags);
                        if (message.hdcpSrmRule != null && Object.hasOwnProperty.call(message, "hdcpSrmRule"))
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.hdcpSrmRule);
                        if (message.disableAnalogOutput != null && Object.hasOwnProperty.call(message, "disableAnalogOutput"))
                            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.disableAnalogOutput);
                        if (message.disableDigitalOutput != null && Object.hasOwnProperty.call(message, "disableDigitalOutput"))
                            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.disableDigitalOutput);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified OutputProtection message, length delimited. Does not implicitly {@link license_protocol.License.KeyContainer.OutputProtection.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @static
                     * @param {license_protocol.License.KeyContainer.IOutputProtection} message OutputProtection message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    OutputProtection.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes an OutputProtection message from the specified reader or buffer.
                     * @function decode
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {license_protocol.License.KeyContainer.OutputProtection} OutputProtection
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    OutputProtection.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.License.KeyContainer.OutputProtection();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1: {
                                    message.hdcp = reader.int32();
                                    break;
                                }
                            case 2: {
                                    message.cgmsFlags = reader.int32();
                                    break;
                                }
                            case 3: {
                                    message.hdcpSrmRule = reader.int32();
                                    break;
                                }
                            case 4: {
                                    message.disableAnalogOutput = reader.bool();
                                    break;
                                }
                            case 5: {
                                    message.disableDigitalOutput = reader.bool();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes an OutputProtection message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {license_protocol.License.KeyContainer.OutputProtection} OutputProtection
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    OutputProtection.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies an OutputProtection message.
                     * @function verify
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    OutputProtection.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.hdcp != null && message.hasOwnProperty("hdcp"))
                            switch (message.hdcp) {
                            default:
                                return "hdcp: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 255:
                                break;
                            }
                        if (message.cgmsFlags != null && message.hasOwnProperty("cgmsFlags"))
                            switch (message.cgmsFlags) {
                            default:
                                return "cgmsFlags: enum value expected";
                            case 42:
                            case 0:
                            case 2:
                            case 3:
                                break;
                            }
                        if (message.hdcpSrmRule != null && message.hasOwnProperty("hdcpSrmRule"))
                            switch (message.hdcpSrmRule) {
                            default:
                                return "hdcpSrmRule: enum value expected";
                            case 0:
                            case 1:
                                break;
                            }
                        if (message.disableAnalogOutput != null && message.hasOwnProperty("disableAnalogOutput"))
                            if (typeof message.disableAnalogOutput !== "boolean")
                                return "disableAnalogOutput: boolean expected";
                        if (message.disableDigitalOutput != null && message.hasOwnProperty("disableDigitalOutput"))
                            if (typeof message.disableDigitalOutput !== "boolean")
                                return "disableDigitalOutput: boolean expected";
                        return null;
                    };
    
                    /**
                     * Creates an OutputProtection message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {license_protocol.License.KeyContainer.OutputProtection} OutputProtection
                     */
                    OutputProtection.fromObject = function fromObject(object) {
                        if (object instanceof $root.license_protocol.License.KeyContainer.OutputProtection)
                            return object;
                        var message = new $root.license_protocol.License.KeyContainer.OutputProtection();
                        switch (object.hdcp) {
                        default:
                            if (typeof object.hdcp === "number") {
                                message.hdcp = object.hdcp;
                                break;
                            }
                            break;
                        case "HDCP_NONE":
                        case 0:
                            message.hdcp = 0;
                            break;
                        case "HDCP_V1":
                        case 1:
                            message.hdcp = 1;
                            break;
                        case "HDCP_V2":
                        case 2:
                            message.hdcp = 2;
                            break;
                        case "HDCP_V2_1":
                        case 3:
                            message.hdcp = 3;
                            break;
                        case "HDCP_V2_2":
                        case 4:
                            message.hdcp = 4;
                            break;
                        case "HDCP_V2_3":
                        case 5:
                            message.hdcp = 5;
                            break;
                        case "HDCP_NO_DIGITAL_OUTPUT":
                        case 255:
                            message.hdcp = 255;
                            break;
                        }
                        switch (object.cgmsFlags) {
                        default:
                            if (typeof object.cgmsFlags === "number") {
                                message.cgmsFlags = object.cgmsFlags;
                                break;
                            }
                            break;
                        case "CGMS_NONE":
                        case 42:
                            message.cgmsFlags = 42;
                            break;
                        case "COPY_FREE":
                        case 0:
                            message.cgmsFlags = 0;
                            break;
                        case "COPY_ONCE":
                        case 2:
                            message.cgmsFlags = 2;
                            break;
                        case "COPY_NEVER":
                        case 3:
                            message.cgmsFlags = 3;
                            break;
                        }
                        switch (object.hdcpSrmRule) {
                        default:
                            if (typeof object.hdcpSrmRule === "number") {
                                message.hdcpSrmRule = object.hdcpSrmRule;
                                break;
                            }
                            break;
                        case "HDCP_SRM_RULE_NONE":
                        case 0:
                            message.hdcpSrmRule = 0;
                            break;
                        case "CURRENT_SRM":
                        case 1:
                            message.hdcpSrmRule = 1;
                            break;
                        }
                        if (object.disableAnalogOutput != null)
                            message.disableAnalogOutput = Boolean(object.disableAnalogOutput);
                        if (object.disableDigitalOutput != null)
                            message.disableDigitalOutput = Boolean(object.disableDigitalOutput);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from an OutputProtection message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @static
                     * @param {license_protocol.License.KeyContainer.OutputProtection} message OutputProtection
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    OutputProtection.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.hdcp = options.enums === String ? "HDCP_NONE" : 0;
                            object.cgmsFlags = options.enums === String ? "CGMS_NONE" : 42;
                            object.hdcpSrmRule = options.enums === String ? "HDCP_SRM_RULE_NONE" : 0;
                            object.disableAnalogOutput = false;
                            object.disableDigitalOutput = false;
                        }
                        if (message.hdcp != null && message.hasOwnProperty("hdcp"))
                            object.hdcp = options.enums === String ? $root.license_protocol.License.KeyContainer.OutputProtection.HDCP[message.hdcp] === undefined ? message.hdcp : $root.license_protocol.License.KeyContainer.OutputProtection.HDCP[message.hdcp] : message.hdcp;
                        if (message.cgmsFlags != null && message.hasOwnProperty("cgmsFlags"))
                            object.cgmsFlags = options.enums === String ? $root.license_protocol.License.KeyContainer.OutputProtection.CGMS[message.cgmsFlags] === undefined ? message.cgmsFlags : $root.license_protocol.License.KeyContainer.OutputProtection.CGMS[message.cgmsFlags] : message.cgmsFlags;
                        if (message.hdcpSrmRule != null && message.hasOwnProperty("hdcpSrmRule"))
                            object.hdcpSrmRule = options.enums === String ? $root.license_protocol.License.KeyContainer.OutputProtection.HdcpSrmRule[message.hdcpSrmRule] === undefined ? message.hdcpSrmRule : $root.license_protocol.License.KeyContainer.OutputProtection.HdcpSrmRule[message.hdcpSrmRule] : message.hdcpSrmRule;
                        if (message.disableAnalogOutput != null && message.hasOwnProperty("disableAnalogOutput"))
                            object.disableAnalogOutput = message.disableAnalogOutput;
                        if (message.disableDigitalOutput != null && message.hasOwnProperty("disableDigitalOutput"))
                            object.disableDigitalOutput = message.disableDigitalOutput;
                        return object;
                    };
    
                    /**
                     * Converts this OutputProtection to JSON.
                     * @function toJSON
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    OutputProtection.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    /**
                     * Gets the default type url for OutputProtection
                     * @function getTypeUrl
                     * @memberof license_protocol.License.KeyContainer.OutputProtection
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    OutputProtection.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/license_protocol.License.KeyContainer.OutputProtection";
                    };
    
                    /**
                     * HDCP enum.
                     * @name license_protocol.License.KeyContainer.OutputProtection.HDCP
                     * @enum {number}
                     * @property {number} HDCP_NONE=0 HDCP_NONE value
                     * @property {number} HDCP_V1=1 HDCP_V1 value
                     * @property {number} HDCP_V2=2 HDCP_V2 value
                     * @property {number} HDCP_V2_1=3 HDCP_V2_1 value
                     * @property {number} HDCP_V2_2=4 HDCP_V2_2 value
                     * @property {number} HDCP_V2_3=5 HDCP_V2_3 value
                     * @property {number} HDCP_NO_DIGITAL_OUTPUT=255 HDCP_NO_DIGITAL_OUTPUT value
                     */
                    OutputProtection.HDCP = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "HDCP_NONE"] = 0;
                        values[valuesById[1] = "HDCP_V1"] = 1;
                        values[valuesById[2] = "HDCP_V2"] = 2;
                        values[valuesById[3] = "HDCP_V2_1"] = 3;
                        values[valuesById[4] = "HDCP_V2_2"] = 4;
                        values[valuesById[5] = "HDCP_V2_3"] = 5;
                        values[valuesById[255] = "HDCP_NO_DIGITAL_OUTPUT"] = 255;
                        return values;
                    })();
    
                    /**
                     * CGMS enum.
                     * @name license_protocol.License.KeyContainer.OutputProtection.CGMS
                     * @enum {number}
                     * @property {number} CGMS_NONE=42 CGMS_NONE value
                     * @property {number} COPY_FREE=0 COPY_FREE value
                     * @property {number} COPY_ONCE=2 COPY_ONCE value
                     * @property {number} COPY_NEVER=3 COPY_NEVER value
                     */
                    OutputProtection.CGMS = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[42] = "CGMS_NONE"] = 42;
                        values[valuesById[0] = "COPY_FREE"] = 0;
                        values[valuesById[2] = "COPY_ONCE"] = 2;
                        values[valuesById[3] = "COPY_NEVER"] = 3;
                        return values;
                    })();
    
                    /**
                     * HdcpSrmRule enum.
                     * @name license_protocol.License.KeyContainer.OutputProtection.HdcpSrmRule
                     * @enum {number}
                     * @property {number} HDCP_SRM_RULE_NONE=0 HDCP_SRM_RULE_NONE value
                     * @property {number} CURRENT_SRM=1 CURRENT_SRM value
                     */
                    OutputProtection.HdcpSrmRule = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "HDCP_SRM_RULE_NONE"] = 0;
                        values[valuesById[1] = "CURRENT_SRM"] = 1;
                        return values;
                    })();
    
                    return OutputProtection;
                })();
    
                KeyContainer.VideoResolutionConstraint = (function() {
    
                    /**
                     * Properties of a VideoResolutionConstraint.
                     * @memberof license_protocol.License.KeyContainer
                     * @interface IVideoResolutionConstraint
                     * @property {number|null} [minResolutionPixels] VideoResolutionConstraint minResolutionPixels
                     * @property {number|null} [maxResolutionPixels] VideoResolutionConstraint maxResolutionPixels
                     * @property {license_protocol.License.KeyContainer.IOutputProtection|null} [requiredProtection] VideoResolutionConstraint requiredProtection
                     */
    
                    /**
                     * Constructs a new VideoResolutionConstraint.
                     * @memberof license_protocol.License.KeyContainer
                     * @classdesc Represents a VideoResolutionConstraint.
                     * @implements IVideoResolutionConstraint
                     * @constructor
                     * @param {license_protocol.License.KeyContainer.IVideoResolutionConstraint=} [properties] Properties to set
                     */
                    function VideoResolutionConstraint(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * VideoResolutionConstraint minResolutionPixels.
                     * @member {number} minResolutionPixels
                     * @memberof license_protocol.License.KeyContainer.VideoResolutionConstraint
                     * @instance
                     */
                    VideoResolutionConstraint.prototype.minResolutionPixels = 0;
    
                    /**
                     * VideoResolutionConstraint maxResolutionPixels.
                     * @member {number} maxResolutionPixels
                     * @memberof license_protocol.License.KeyContainer.VideoResolutionConstraint
                     * @instance
                     */
                    VideoResolutionConstraint.prototype.maxResolutionPixels = 0;
    
                    /**
                     * VideoResolutionConstraint requiredProtection.
                     * @member {license_protocol.License.KeyContainer.IOutputProtection|null|undefined} requiredProtection
                     * @memberof license_protocol.License.KeyContainer.VideoResolutionConstraint
                     * @instance
                     */
                    VideoResolutionConstraint.prototype.requiredProtection = null;
    
                    /**
                     * Creates a new VideoResolutionConstraint instance using the specified properties.
                     * @function create
                     * @memberof license_protocol.License.KeyContainer.VideoResolutionConstraint
                     * @static
                     * @param {license_protocol.License.KeyContainer.IVideoResolutionConstraint=} [properties] Properties to set
                     * @returns {license_protocol.License.KeyContainer.VideoResolutionConstraint} VideoResolutionConstraint instance
                     */
                    VideoResolutionConstraint.create = function create(properties) {
                        return new VideoResolutionConstraint(properties);
                    };
    
                    /**
                     * Encodes the specified VideoResolutionConstraint message. Does not implicitly {@link license_protocol.License.KeyContainer.VideoResolutionConstraint.verify|verify} messages.
                     * @function encode
                     * @memberof license_protocol.License.KeyContainer.VideoResolutionConstraint
                     * @static
                     * @param {license_protocol.License.KeyContainer.IVideoResolutionConstraint} message VideoResolutionConstraint message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    VideoResolutionConstraint.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.minResolutionPixels != null && Object.hasOwnProperty.call(message, "minResolutionPixels"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.minResolutionPixels);
                        if (message.maxResolutionPixels != null && Object.hasOwnProperty.call(message, "maxResolutionPixels"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.maxResolutionPixels);
                        if (message.requiredProtection != null && Object.hasOwnProperty.call(message, "requiredProtection"))
                            $root.license_protocol.License.KeyContainer.OutputProtection.encode(message.requiredProtection, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified VideoResolutionConstraint message, length delimited. Does not implicitly {@link license_protocol.License.KeyContainer.VideoResolutionConstraint.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof license_protocol.License.KeyContainer.VideoResolutionConstraint
                     * @static
                     * @param {license_protocol.License.KeyContainer.IVideoResolutionConstraint} message VideoResolutionConstraint message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    VideoResolutionConstraint.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a VideoResolutionConstraint message from the specified reader or buffer.
                     * @function decode
                     * @memberof license_protocol.License.KeyContainer.VideoResolutionConstraint
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {license_protocol.License.KeyContainer.VideoResolutionConstraint} VideoResolutionConstraint
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    VideoResolutionConstraint.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.License.KeyContainer.VideoResolutionConstraint();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1: {
                                    message.minResolutionPixels = reader.uint32();
                                    break;
                                }
                            case 2: {
                                    message.maxResolutionPixels = reader.uint32();
                                    break;
                                }
                            case 3: {
                                    message.requiredProtection = $root.license_protocol.License.KeyContainer.OutputProtection.decode(reader, reader.uint32());
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a VideoResolutionConstraint message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof license_protocol.License.KeyContainer.VideoResolutionConstraint
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {license_protocol.License.KeyContainer.VideoResolutionConstraint} VideoResolutionConstraint
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    VideoResolutionConstraint.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a VideoResolutionConstraint message.
                     * @function verify
                     * @memberof license_protocol.License.KeyContainer.VideoResolutionConstraint
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    VideoResolutionConstraint.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.minResolutionPixels != null && message.hasOwnProperty("minResolutionPixels"))
                            if (!$util.isInteger(message.minResolutionPixels))
                                return "minResolutionPixels: integer expected";
                        if (message.maxResolutionPixels != null && message.hasOwnProperty("maxResolutionPixels"))
                            if (!$util.isInteger(message.maxResolutionPixels))
                                return "maxResolutionPixels: integer expected";
                        if (message.requiredProtection != null && message.hasOwnProperty("requiredProtection")) {
                            var error = $root.license_protocol.License.KeyContainer.OutputProtection.verify(message.requiredProtection);
                            if (error)
                                return "requiredProtection." + error;
                        }
                        return null;
                    };
    
                    /**
                     * Creates a VideoResolutionConstraint message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof license_protocol.License.KeyContainer.VideoResolutionConstraint
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {license_protocol.License.KeyContainer.VideoResolutionConstraint} VideoResolutionConstraint
                     */
                    VideoResolutionConstraint.fromObject = function fromObject(object) {
                        if (object instanceof $root.license_protocol.License.KeyContainer.VideoResolutionConstraint)
                            return object;
                        var message = new $root.license_protocol.License.KeyContainer.VideoResolutionConstraint();
                        if (object.minResolutionPixels != null)
                            message.minResolutionPixels = object.minResolutionPixels >>> 0;
                        if (object.maxResolutionPixels != null)
                            message.maxResolutionPixels = object.maxResolutionPixels >>> 0;
                        if (object.requiredProtection != null) {
                            if (typeof object.requiredProtection !== "object")
                                throw TypeError(".license_protocol.License.KeyContainer.VideoResolutionConstraint.requiredProtection: object expected");
                            message.requiredProtection = $root.license_protocol.License.KeyContainer.OutputProtection.fromObject(object.requiredProtection);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a VideoResolutionConstraint message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof license_protocol.License.KeyContainer.VideoResolutionConstraint
                     * @static
                     * @param {license_protocol.License.KeyContainer.VideoResolutionConstraint} message VideoResolutionConstraint
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    VideoResolutionConstraint.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.minResolutionPixels = 0;
                            object.maxResolutionPixels = 0;
                            object.requiredProtection = null;
                        }
                        if (message.minResolutionPixels != null && message.hasOwnProperty("minResolutionPixels"))
                            object.minResolutionPixels = message.minResolutionPixels;
                        if (message.maxResolutionPixels != null && message.hasOwnProperty("maxResolutionPixels"))
                            object.maxResolutionPixels = message.maxResolutionPixels;
                        if (message.requiredProtection != null && message.hasOwnProperty("requiredProtection"))
                            object.requiredProtection = $root.license_protocol.License.KeyContainer.OutputProtection.toObject(message.requiredProtection, options);
                        return object;
                    };
    
                    /**
                     * Converts this VideoResolutionConstraint to JSON.
                     * @function toJSON
                     * @memberof license_protocol.License.KeyContainer.VideoResolutionConstraint
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    VideoResolutionConstraint.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    /**
                     * Gets the default type url for VideoResolutionConstraint
                     * @function getTypeUrl
                     * @memberof license_protocol.License.KeyContainer.VideoResolutionConstraint
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    VideoResolutionConstraint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/license_protocol.License.KeyContainer.VideoResolutionConstraint";
                    };
    
                    return VideoResolutionConstraint;
                })();
    
                KeyContainer.OperatorSessionKeyPermissions = (function() {
    
                    /**
                     * Properties of an OperatorSessionKeyPermissions.
                     * @memberof license_protocol.License.KeyContainer
                     * @interface IOperatorSessionKeyPermissions
                     * @property {boolean|null} [allowEncrypt] OperatorSessionKeyPermissions allowEncrypt
                     * @property {boolean|null} [allowDecrypt] OperatorSessionKeyPermissions allowDecrypt
                     * @property {boolean|null} [allowSign] OperatorSessionKeyPermissions allowSign
                     * @property {boolean|null} [allowSignatureVerify] OperatorSessionKeyPermissions allowSignatureVerify
                     */
    
                    /**
                     * Constructs a new OperatorSessionKeyPermissions.
                     * @memberof license_protocol.License.KeyContainer
                     * @classdesc Represents an OperatorSessionKeyPermissions.
                     * @implements IOperatorSessionKeyPermissions
                     * @constructor
                     * @param {license_protocol.License.KeyContainer.IOperatorSessionKeyPermissions=} [properties] Properties to set
                     */
                    function OperatorSessionKeyPermissions(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * OperatorSessionKeyPermissions allowEncrypt.
                     * @member {boolean} allowEncrypt
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @instance
                     */
                    OperatorSessionKeyPermissions.prototype.allowEncrypt = false;
    
                    /**
                     * OperatorSessionKeyPermissions allowDecrypt.
                     * @member {boolean} allowDecrypt
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @instance
                     */
                    OperatorSessionKeyPermissions.prototype.allowDecrypt = false;
    
                    /**
                     * OperatorSessionKeyPermissions allowSign.
                     * @member {boolean} allowSign
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @instance
                     */
                    OperatorSessionKeyPermissions.prototype.allowSign = false;
    
                    /**
                     * OperatorSessionKeyPermissions allowSignatureVerify.
                     * @member {boolean} allowSignatureVerify
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @instance
                     */
                    OperatorSessionKeyPermissions.prototype.allowSignatureVerify = false;
    
                    /**
                     * Creates a new OperatorSessionKeyPermissions instance using the specified properties.
                     * @function create
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @static
                     * @param {license_protocol.License.KeyContainer.IOperatorSessionKeyPermissions=} [properties] Properties to set
                     * @returns {license_protocol.License.KeyContainer.OperatorSessionKeyPermissions} OperatorSessionKeyPermissions instance
                     */
                    OperatorSessionKeyPermissions.create = function create(properties) {
                        return new OperatorSessionKeyPermissions(properties);
                    };
    
                    /**
                     * Encodes the specified OperatorSessionKeyPermissions message. Does not implicitly {@link license_protocol.License.KeyContainer.OperatorSessionKeyPermissions.verify|verify} messages.
                     * @function encode
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @static
                     * @param {license_protocol.License.KeyContainer.IOperatorSessionKeyPermissions} message OperatorSessionKeyPermissions message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    OperatorSessionKeyPermissions.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.allowEncrypt != null && Object.hasOwnProperty.call(message, "allowEncrypt"))
                            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.allowEncrypt);
                        if (message.allowDecrypt != null && Object.hasOwnProperty.call(message, "allowDecrypt"))
                            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.allowDecrypt);
                        if (message.allowSign != null && Object.hasOwnProperty.call(message, "allowSign"))
                            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.allowSign);
                        if (message.allowSignatureVerify != null && Object.hasOwnProperty.call(message, "allowSignatureVerify"))
                            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.allowSignatureVerify);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified OperatorSessionKeyPermissions message, length delimited. Does not implicitly {@link license_protocol.License.KeyContainer.OperatorSessionKeyPermissions.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @static
                     * @param {license_protocol.License.KeyContainer.IOperatorSessionKeyPermissions} message OperatorSessionKeyPermissions message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    OperatorSessionKeyPermissions.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes an OperatorSessionKeyPermissions message from the specified reader or buffer.
                     * @function decode
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {license_protocol.License.KeyContainer.OperatorSessionKeyPermissions} OperatorSessionKeyPermissions
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    OperatorSessionKeyPermissions.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.License.KeyContainer.OperatorSessionKeyPermissions();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1: {
                                    message.allowEncrypt = reader.bool();
                                    break;
                                }
                            case 2: {
                                    message.allowDecrypt = reader.bool();
                                    break;
                                }
                            case 3: {
                                    message.allowSign = reader.bool();
                                    break;
                                }
                            case 4: {
                                    message.allowSignatureVerify = reader.bool();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes an OperatorSessionKeyPermissions message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {license_protocol.License.KeyContainer.OperatorSessionKeyPermissions} OperatorSessionKeyPermissions
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    OperatorSessionKeyPermissions.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies an OperatorSessionKeyPermissions message.
                     * @function verify
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    OperatorSessionKeyPermissions.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.allowEncrypt != null && message.hasOwnProperty("allowEncrypt"))
                            if (typeof message.allowEncrypt !== "boolean")
                                return "allowEncrypt: boolean expected";
                        if (message.allowDecrypt != null && message.hasOwnProperty("allowDecrypt"))
                            if (typeof message.allowDecrypt !== "boolean")
                                return "allowDecrypt: boolean expected";
                        if (message.allowSign != null && message.hasOwnProperty("allowSign"))
                            if (typeof message.allowSign !== "boolean")
                                return "allowSign: boolean expected";
                        if (message.allowSignatureVerify != null && message.hasOwnProperty("allowSignatureVerify"))
                            if (typeof message.allowSignatureVerify !== "boolean")
                                return "allowSignatureVerify: boolean expected";
                        return null;
                    };
    
                    /**
                     * Creates an OperatorSessionKeyPermissions message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {license_protocol.License.KeyContainer.OperatorSessionKeyPermissions} OperatorSessionKeyPermissions
                     */
                    OperatorSessionKeyPermissions.fromObject = function fromObject(object) {
                        if (object instanceof $root.license_protocol.License.KeyContainer.OperatorSessionKeyPermissions)
                            return object;
                        var message = new $root.license_protocol.License.KeyContainer.OperatorSessionKeyPermissions();
                        if (object.allowEncrypt != null)
                            message.allowEncrypt = Boolean(object.allowEncrypt);
                        if (object.allowDecrypt != null)
                            message.allowDecrypt = Boolean(object.allowDecrypt);
                        if (object.allowSign != null)
                            message.allowSign = Boolean(object.allowSign);
                        if (object.allowSignatureVerify != null)
                            message.allowSignatureVerify = Boolean(object.allowSignatureVerify);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from an OperatorSessionKeyPermissions message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @static
                     * @param {license_protocol.License.KeyContainer.OperatorSessionKeyPermissions} message OperatorSessionKeyPermissions
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    OperatorSessionKeyPermissions.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.allowEncrypt = false;
                            object.allowDecrypt = false;
                            object.allowSign = false;
                            object.allowSignatureVerify = false;
                        }
                        if (message.allowEncrypt != null && message.hasOwnProperty("allowEncrypt"))
                            object.allowEncrypt = message.allowEncrypt;
                        if (message.allowDecrypt != null && message.hasOwnProperty("allowDecrypt"))
                            object.allowDecrypt = message.allowDecrypt;
                        if (message.allowSign != null && message.hasOwnProperty("allowSign"))
                            object.allowSign = message.allowSign;
                        if (message.allowSignatureVerify != null && message.hasOwnProperty("allowSignatureVerify"))
                            object.allowSignatureVerify = message.allowSignatureVerify;
                        return object;
                    };
    
                    /**
                     * Converts this OperatorSessionKeyPermissions to JSON.
                     * @function toJSON
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    OperatorSessionKeyPermissions.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    /**
                     * Gets the default type url for OperatorSessionKeyPermissions
                     * @function getTypeUrl
                     * @memberof license_protocol.License.KeyContainer.OperatorSessionKeyPermissions
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    OperatorSessionKeyPermissions.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/license_protocol.License.KeyContainer.OperatorSessionKeyPermissions";
                    };
    
                    return OperatorSessionKeyPermissions;
                })();
    
                return KeyContainer;
            })();
    
            return License;
        })();
    
        /**
         * ProtocolVersion enum.
         * @name license_protocol.ProtocolVersion
         * @enum {number}
         * @property {number} VERSION_2_0=20 VERSION_2_0 value
         * @property {number} VERSION_2_1=21 VERSION_2_1 value
         * @property {number} VERSION_2_2=22 VERSION_2_2 value
         */
        license_protocol.ProtocolVersion = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[20] = "VERSION_2_0"] = 20;
            values[valuesById[21] = "VERSION_2_1"] = 21;
            values[valuesById[22] = "VERSION_2_2"] = 22;
            return values;
        })();
    
        license_protocol.LicenseRequest = (function() {
    
            /**
             * Properties of a LicenseRequest.
             * @memberof license_protocol
             * @interface ILicenseRequest
             * @property {license_protocol.IClientIdentification|null} [clientId] LicenseRequest clientId
             * @property {license_protocol.LicenseRequest.IContentIdentification|null} [contentId] LicenseRequest contentId
             * @property {license_protocol.LicenseRequest.RequestType|null} [type] LicenseRequest type
             * @property {number|Long|null} [requestTime] LicenseRequest requestTime
             * @property {Uint8Array|null} [keyControlNonceDeprecated] LicenseRequest keyControlNonceDeprecated
             * @property {license_protocol.ProtocolVersion|null} [protocolVersion] LicenseRequest protocolVersion
             * @property {number|null} [keyControlNonce] LicenseRequest keyControlNonce
             * @property {license_protocol.IEncryptedClientIdentification|null} [encryptedClientId] LicenseRequest encryptedClientId
             */
    
            /**
             * Constructs a new LicenseRequest.
             * @memberof license_protocol
             * @classdesc Represents a LicenseRequest.
             * @implements ILicenseRequest
             * @constructor
             * @param {license_protocol.ILicenseRequest=} [properties] Properties to set
             */
            function LicenseRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LicenseRequest clientId.
             * @member {license_protocol.IClientIdentification|null|undefined} clientId
             * @memberof license_protocol.LicenseRequest
             * @instance
             */
            LicenseRequest.prototype.clientId = null;
    
            /**
             * LicenseRequest contentId.
             * @member {license_protocol.LicenseRequest.IContentIdentification|null|undefined} contentId
             * @memberof license_protocol.LicenseRequest
             * @instance
             */
            LicenseRequest.prototype.contentId = null;
    
            /**
             * LicenseRequest type.
             * @member {license_protocol.LicenseRequest.RequestType} type
             * @memberof license_protocol.LicenseRequest
             * @instance
             */
            LicenseRequest.prototype.type = 1;
    
            /**
             * LicenseRequest requestTime.
             * @member {number|Long} requestTime
             * @memberof license_protocol.LicenseRequest
             * @instance
             */
            LicenseRequest.prototype.requestTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * LicenseRequest keyControlNonceDeprecated.
             * @member {Uint8Array} keyControlNonceDeprecated
             * @memberof license_protocol.LicenseRequest
             * @instance
             */
            LicenseRequest.prototype.keyControlNonceDeprecated = $util.newBuffer([]);
    
            /**
             * LicenseRequest protocolVersion.
             * @member {license_protocol.ProtocolVersion} protocolVersion
             * @memberof license_protocol.LicenseRequest
             * @instance
             */
            LicenseRequest.prototype.protocolVersion = 20;
    
            /**
             * LicenseRequest keyControlNonce.
             * @member {number} keyControlNonce
             * @memberof license_protocol.LicenseRequest
             * @instance
             */
            LicenseRequest.prototype.keyControlNonce = 0;
    
            /**
             * LicenseRequest encryptedClientId.
             * @member {license_protocol.IEncryptedClientIdentification|null|undefined} encryptedClientId
             * @memberof license_protocol.LicenseRequest
             * @instance
             */
            LicenseRequest.prototype.encryptedClientId = null;
    
            /**
             * Creates a new LicenseRequest instance using the specified properties.
             * @function create
             * @memberof license_protocol.LicenseRequest
             * @static
             * @param {license_protocol.ILicenseRequest=} [properties] Properties to set
             * @returns {license_protocol.LicenseRequest} LicenseRequest instance
             */
            LicenseRequest.create = function create(properties) {
                return new LicenseRequest(properties);
            };
    
            /**
             * Encodes the specified LicenseRequest message. Does not implicitly {@link license_protocol.LicenseRequest.verify|verify} messages.
             * @function encode
             * @memberof license_protocol.LicenseRequest
             * @static
             * @param {license_protocol.ILicenseRequest} message LicenseRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LicenseRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
                    $root.license_protocol.ClientIdentification.encode(message.clientId, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.contentId != null && Object.hasOwnProperty.call(message, "contentId"))
                    $root.license_protocol.LicenseRequest.ContentIdentification.encode(message.contentId, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
                if (message.requestTime != null && Object.hasOwnProperty.call(message, "requestTime"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.requestTime);
                if (message.keyControlNonceDeprecated != null && Object.hasOwnProperty.call(message, "keyControlNonceDeprecated"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.keyControlNonceDeprecated);
                if (message.protocolVersion != null && Object.hasOwnProperty.call(message, "protocolVersion"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.protocolVersion);
                if (message.keyControlNonce != null && Object.hasOwnProperty.call(message, "keyControlNonce"))
                    writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.keyControlNonce);
                if (message.encryptedClientId != null && Object.hasOwnProperty.call(message, "encryptedClientId"))
                    $root.license_protocol.EncryptedClientIdentification.encode(message.encryptedClientId, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified LicenseRequest message, length delimited. Does not implicitly {@link license_protocol.LicenseRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof license_protocol.LicenseRequest
             * @static
             * @param {license_protocol.ILicenseRequest} message LicenseRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LicenseRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LicenseRequest message from the specified reader or buffer.
             * @function decode
             * @memberof license_protocol.LicenseRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {license_protocol.LicenseRequest} LicenseRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LicenseRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.LicenseRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.clientId = $root.license_protocol.ClientIdentification.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.contentId = $root.license_protocol.LicenseRequest.ContentIdentification.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.type = reader.int32();
                            break;
                        }
                    case 4: {
                            message.requestTime = reader.int64();
                            break;
                        }
                    case 5: {
                            message.keyControlNonceDeprecated = reader.bytes();
                            break;
                        }
                    case 6: {
                            message.protocolVersion = reader.int32();
                            break;
                        }
                    case 7: {
                            message.keyControlNonce = reader.uint32();
                            break;
                        }
                    case 8: {
                            message.encryptedClientId = $root.license_protocol.EncryptedClientIdentification.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a LicenseRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof license_protocol.LicenseRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {license_protocol.LicenseRequest} LicenseRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LicenseRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LicenseRequest message.
             * @function verify
             * @memberof license_protocol.LicenseRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LicenseRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.clientId != null && message.hasOwnProperty("clientId")) {
                    var error = $root.license_protocol.ClientIdentification.verify(message.clientId);
                    if (error)
                        return "clientId." + error;
                }
                if (message.contentId != null && message.hasOwnProperty("contentId")) {
                    var error = $root.license_protocol.LicenseRequest.ContentIdentification.verify(message.contentId);
                    if (error)
                        return "contentId." + error;
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.requestTime != null && message.hasOwnProperty("requestTime"))
                    if (!$util.isInteger(message.requestTime) && !(message.requestTime && $util.isInteger(message.requestTime.low) && $util.isInteger(message.requestTime.high)))
                        return "requestTime: integer|Long expected";
                if (message.keyControlNonceDeprecated != null && message.hasOwnProperty("keyControlNonceDeprecated"))
                    if (!(message.keyControlNonceDeprecated && typeof message.keyControlNonceDeprecated.length === "number" || $util.isString(message.keyControlNonceDeprecated)))
                        return "keyControlNonceDeprecated: buffer expected";
                if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
                    switch (message.protocolVersion) {
                    default:
                        return "protocolVersion: enum value expected";
                    case 20:
                    case 21:
                    case 22:
                        break;
                    }
                if (message.keyControlNonce != null && message.hasOwnProperty("keyControlNonce"))
                    if (!$util.isInteger(message.keyControlNonce))
                        return "keyControlNonce: integer expected";
                if (message.encryptedClientId != null && message.hasOwnProperty("encryptedClientId")) {
                    var error = $root.license_protocol.EncryptedClientIdentification.verify(message.encryptedClientId);
                    if (error)
                        return "encryptedClientId." + error;
                }
                return null;
            };
    
            /**
             * Creates a LicenseRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof license_protocol.LicenseRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {license_protocol.LicenseRequest} LicenseRequest
             */
            LicenseRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.license_protocol.LicenseRequest)
                    return object;
                var message = new $root.license_protocol.LicenseRequest();
                if (object.clientId != null) {
                    if (typeof object.clientId !== "object")
                        throw TypeError(".license_protocol.LicenseRequest.clientId: object expected");
                    message.clientId = $root.license_protocol.ClientIdentification.fromObject(object.clientId);
                }
                if (object.contentId != null) {
                    if (typeof object.contentId !== "object")
                        throw TypeError(".license_protocol.LicenseRequest.contentId: object expected");
                    message.contentId = $root.license_protocol.LicenseRequest.ContentIdentification.fromObject(object.contentId);
                }
                switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "NEW":
                case 1:
                    message.type = 1;
                    break;
                case "RENEWAL":
                case 2:
                    message.type = 2;
                    break;
                case "RELEASE":
                case 3:
                    message.type = 3;
                    break;
                }
                if (object.requestTime != null)
                    if ($util.Long)
                        (message.requestTime = $util.Long.fromValue(object.requestTime)).unsigned = false;
                    else if (typeof object.requestTime === "string")
                        message.requestTime = parseInt(object.requestTime, 10);
                    else if (typeof object.requestTime === "number")
                        message.requestTime = object.requestTime;
                    else if (typeof object.requestTime === "object")
                        message.requestTime = new $util.LongBits(object.requestTime.low >>> 0, object.requestTime.high >>> 0).toNumber();
                if (object.keyControlNonceDeprecated != null)
                    if (typeof object.keyControlNonceDeprecated === "string")
                        $util.base64.decode(object.keyControlNonceDeprecated, message.keyControlNonceDeprecated = $util.newBuffer($util.base64.length(object.keyControlNonceDeprecated)), 0);
                    else if (object.keyControlNonceDeprecated.length >= 0)
                        message.keyControlNonceDeprecated = object.keyControlNonceDeprecated;
                switch (object.protocolVersion) {
                default:
                    if (typeof object.protocolVersion === "number") {
                        message.protocolVersion = object.protocolVersion;
                        break;
                    }
                    break;
                case "VERSION_2_0":
                case 20:
                    message.protocolVersion = 20;
                    break;
                case "VERSION_2_1":
                case 21:
                    message.protocolVersion = 21;
                    break;
                case "VERSION_2_2":
                case 22:
                    message.protocolVersion = 22;
                    break;
                }
                if (object.keyControlNonce != null)
                    message.keyControlNonce = object.keyControlNonce >>> 0;
                if (object.encryptedClientId != null) {
                    if (typeof object.encryptedClientId !== "object")
                        throw TypeError(".license_protocol.LicenseRequest.encryptedClientId: object expected");
                    message.encryptedClientId = $root.license_protocol.EncryptedClientIdentification.fromObject(object.encryptedClientId);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a LicenseRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof license_protocol.LicenseRequest
             * @static
             * @param {license_protocol.LicenseRequest} message LicenseRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LicenseRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.clientId = null;
                    object.contentId = null;
                    object.type = options.enums === String ? "NEW" : 1;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.requestTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.requestTime = options.longs === String ? "0" : 0;
                    if (options.bytes === String)
                        object.keyControlNonceDeprecated = "";
                    else {
                        object.keyControlNonceDeprecated = [];
                        if (options.bytes !== Array)
                            object.keyControlNonceDeprecated = $util.newBuffer(object.keyControlNonceDeprecated);
                    }
                    object.protocolVersion = options.enums === String ? "VERSION_2_0" : 20;
                    object.keyControlNonce = 0;
                    object.encryptedClientId = null;
                }
                if (message.clientId != null && message.hasOwnProperty("clientId"))
                    object.clientId = $root.license_protocol.ClientIdentification.toObject(message.clientId, options);
                if (message.contentId != null && message.hasOwnProperty("contentId"))
                    object.contentId = $root.license_protocol.LicenseRequest.ContentIdentification.toObject(message.contentId, options);
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.license_protocol.LicenseRequest.RequestType[message.type] === undefined ? message.type : $root.license_protocol.LicenseRequest.RequestType[message.type] : message.type;
                if (message.requestTime != null && message.hasOwnProperty("requestTime"))
                    if (typeof message.requestTime === "number")
                        object.requestTime = options.longs === String ? String(message.requestTime) : message.requestTime;
                    else
                        object.requestTime = options.longs === String ? $util.Long.prototype.toString.call(message.requestTime) : options.longs === Number ? new $util.LongBits(message.requestTime.low >>> 0, message.requestTime.high >>> 0).toNumber() : message.requestTime;
                if (message.keyControlNonceDeprecated != null && message.hasOwnProperty("keyControlNonceDeprecated"))
                    object.keyControlNonceDeprecated = options.bytes === String ? $util.base64.encode(message.keyControlNonceDeprecated, 0, message.keyControlNonceDeprecated.length) : options.bytes === Array ? Array.prototype.slice.call(message.keyControlNonceDeprecated) : message.keyControlNonceDeprecated;
                if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
                    object.protocolVersion = options.enums === String ? $root.license_protocol.ProtocolVersion[message.protocolVersion] === undefined ? message.protocolVersion : $root.license_protocol.ProtocolVersion[message.protocolVersion] : message.protocolVersion;
                if (message.keyControlNonce != null && message.hasOwnProperty("keyControlNonce"))
                    object.keyControlNonce = message.keyControlNonce;
                if (message.encryptedClientId != null && message.hasOwnProperty("encryptedClientId"))
                    object.encryptedClientId = $root.license_protocol.EncryptedClientIdentification.toObject(message.encryptedClientId, options);
                return object;
            };
    
            /**
             * Converts this LicenseRequest to JSON.
             * @function toJSON
             * @memberof license_protocol.LicenseRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LicenseRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for LicenseRequest
             * @function getTypeUrl
             * @memberof license_protocol.LicenseRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            LicenseRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/license_protocol.LicenseRequest";
            };
    
            LicenseRequest.ContentIdentification = (function() {
    
                /**
                 * Properties of a ContentIdentification.
                 * @memberof license_protocol.LicenseRequest
                 * @interface IContentIdentification
                 * @property {license_protocol.LicenseRequest.ContentIdentification.IWidevinePsshData|null} [widevinePsshData] ContentIdentification widevinePsshData
                 * @property {license_protocol.LicenseRequest.ContentIdentification.IWebmKeyId|null} [webmKeyId] ContentIdentification webmKeyId
                 * @property {license_protocol.LicenseRequest.ContentIdentification.IExistingLicense|null} [existingLicense] ContentIdentification existingLicense
                 * @property {license_protocol.LicenseRequest.ContentIdentification.IInitData|null} [initData] ContentIdentification initData
                 */
    
                /**
                 * Constructs a new ContentIdentification.
                 * @memberof license_protocol.LicenseRequest
                 * @classdesc Represents a ContentIdentification.
                 * @implements IContentIdentification
                 * @constructor
                 * @param {license_protocol.LicenseRequest.IContentIdentification=} [properties] Properties to set
                 */
                function ContentIdentification(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * ContentIdentification widevinePsshData.
                 * @member {license_protocol.LicenseRequest.ContentIdentification.IWidevinePsshData|null|undefined} widevinePsshData
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @instance
                 */
                ContentIdentification.prototype.widevinePsshData = null;
    
                /**
                 * ContentIdentification webmKeyId.
                 * @member {license_protocol.LicenseRequest.ContentIdentification.IWebmKeyId|null|undefined} webmKeyId
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @instance
                 */
                ContentIdentification.prototype.webmKeyId = null;
    
                /**
                 * ContentIdentification existingLicense.
                 * @member {license_protocol.LicenseRequest.ContentIdentification.IExistingLicense|null|undefined} existingLicense
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @instance
                 */
                ContentIdentification.prototype.existingLicense = null;
    
                /**
                 * ContentIdentification initData.
                 * @member {license_protocol.LicenseRequest.ContentIdentification.IInitData|null|undefined} initData
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @instance
                 */
                ContentIdentification.prototype.initData = null;
    
                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;
    
                /**
                 * ContentIdentification contentIdVariant.
                 * @member {"widevinePsshData"|"webmKeyId"|"existingLicense"|"initData"|undefined} contentIdVariant
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @instance
                 */
                Object.defineProperty(ContentIdentification.prototype, "contentIdVariant", {
                    get: $util.oneOfGetter($oneOfFields = ["widevinePsshData", "webmKeyId", "existingLicense", "initData"]),
                    set: $util.oneOfSetter($oneOfFields)
                });
    
                /**
                 * Creates a new ContentIdentification instance using the specified properties.
                 * @function create
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @static
                 * @param {license_protocol.LicenseRequest.IContentIdentification=} [properties] Properties to set
                 * @returns {license_protocol.LicenseRequest.ContentIdentification} ContentIdentification instance
                 */
                ContentIdentification.create = function create(properties) {
                    return new ContentIdentification(properties);
                };
    
                /**
                 * Encodes the specified ContentIdentification message. Does not implicitly {@link license_protocol.LicenseRequest.ContentIdentification.verify|verify} messages.
                 * @function encode
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @static
                 * @param {license_protocol.LicenseRequest.IContentIdentification} message ContentIdentification message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ContentIdentification.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.widevinePsshData != null && Object.hasOwnProperty.call(message, "widevinePsshData"))
                        $root.license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData.encode(message.widevinePsshData, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.webmKeyId != null && Object.hasOwnProperty.call(message, "webmKeyId"))
                        $root.license_protocol.LicenseRequest.ContentIdentification.WebmKeyId.encode(message.webmKeyId, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.existingLicense != null && Object.hasOwnProperty.call(message, "existingLicense"))
                        $root.license_protocol.LicenseRequest.ContentIdentification.ExistingLicense.encode(message.existingLicense, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.initData != null && Object.hasOwnProperty.call(message, "initData"))
                        $root.license_protocol.LicenseRequest.ContentIdentification.InitData.encode(message.initData, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };
    
                /**
                 * Encodes the specified ContentIdentification message, length delimited. Does not implicitly {@link license_protocol.LicenseRequest.ContentIdentification.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @static
                 * @param {license_protocol.LicenseRequest.IContentIdentification} message ContentIdentification message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ContentIdentification.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a ContentIdentification message from the specified reader or buffer.
                 * @function decode
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {license_protocol.LicenseRequest.ContentIdentification} ContentIdentification
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ContentIdentification.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.LicenseRequest.ContentIdentification();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.widevinePsshData = $root.license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.webmKeyId = $root.license_protocol.LicenseRequest.ContentIdentification.WebmKeyId.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.existingLicense = $root.license_protocol.LicenseRequest.ContentIdentification.ExistingLicense.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                message.initData = $root.license_protocol.LicenseRequest.ContentIdentification.InitData.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a ContentIdentification message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {license_protocol.LicenseRequest.ContentIdentification} ContentIdentification
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ContentIdentification.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a ContentIdentification message.
                 * @function verify
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ContentIdentification.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.widevinePsshData != null && message.hasOwnProperty("widevinePsshData")) {
                        properties.contentIdVariant = 1;
                        {
                            var error = $root.license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData.verify(message.widevinePsshData);
                            if (error)
                                return "widevinePsshData." + error;
                        }
                    }
                    if (message.webmKeyId != null && message.hasOwnProperty("webmKeyId")) {
                        if (properties.contentIdVariant === 1)
                            return "contentIdVariant: multiple values";
                        properties.contentIdVariant = 1;
                        {
                            var error = $root.license_protocol.LicenseRequest.ContentIdentification.WebmKeyId.verify(message.webmKeyId);
                            if (error)
                                return "webmKeyId." + error;
                        }
                    }
                    if (message.existingLicense != null && message.hasOwnProperty("existingLicense")) {
                        if (properties.contentIdVariant === 1)
                            return "contentIdVariant: multiple values";
                        properties.contentIdVariant = 1;
                        {
                            var error = $root.license_protocol.LicenseRequest.ContentIdentification.ExistingLicense.verify(message.existingLicense);
                            if (error)
                                return "existingLicense." + error;
                        }
                    }
                    if (message.initData != null && message.hasOwnProperty("initData")) {
                        if (properties.contentIdVariant === 1)
                            return "contentIdVariant: multiple values";
                        properties.contentIdVariant = 1;
                        {
                            var error = $root.license_protocol.LicenseRequest.ContentIdentification.InitData.verify(message.initData);
                            if (error)
                                return "initData." + error;
                        }
                    }
                    return null;
                };
    
                /**
                 * Creates a ContentIdentification message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {license_protocol.LicenseRequest.ContentIdentification} ContentIdentification
                 */
                ContentIdentification.fromObject = function fromObject(object) {
                    if (object instanceof $root.license_protocol.LicenseRequest.ContentIdentification)
                        return object;
                    var message = new $root.license_protocol.LicenseRequest.ContentIdentification();
                    if (object.widevinePsshData != null) {
                        if (typeof object.widevinePsshData !== "object")
                            throw TypeError(".license_protocol.LicenseRequest.ContentIdentification.widevinePsshData: object expected");
                        message.widevinePsshData = $root.license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData.fromObject(object.widevinePsshData);
                    }
                    if (object.webmKeyId != null) {
                        if (typeof object.webmKeyId !== "object")
                            throw TypeError(".license_protocol.LicenseRequest.ContentIdentification.webmKeyId: object expected");
                        message.webmKeyId = $root.license_protocol.LicenseRequest.ContentIdentification.WebmKeyId.fromObject(object.webmKeyId);
                    }
                    if (object.existingLicense != null) {
                        if (typeof object.existingLicense !== "object")
                            throw TypeError(".license_protocol.LicenseRequest.ContentIdentification.existingLicense: object expected");
                        message.existingLicense = $root.license_protocol.LicenseRequest.ContentIdentification.ExistingLicense.fromObject(object.existingLicense);
                    }
                    if (object.initData != null) {
                        if (typeof object.initData !== "object")
                            throw TypeError(".license_protocol.LicenseRequest.ContentIdentification.initData: object expected");
                        message.initData = $root.license_protocol.LicenseRequest.ContentIdentification.InitData.fromObject(object.initData);
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from a ContentIdentification message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @static
                 * @param {license_protocol.LicenseRequest.ContentIdentification} message ContentIdentification
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ContentIdentification.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (message.widevinePsshData != null && message.hasOwnProperty("widevinePsshData")) {
                        object.widevinePsshData = $root.license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData.toObject(message.widevinePsshData, options);
                        if (options.oneofs)
                            object.contentIdVariant = "widevinePsshData";
                    }
                    if (message.webmKeyId != null && message.hasOwnProperty("webmKeyId")) {
                        object.webmKeyId = $root.license_protocol.LicenseRequest.ContentIdentification.WebmKeyId.toObject(message.webmKeyId, options);
                        if (options.oneofs)
                            object.contentIdVariant = "webmKeyId";
                    }
                    if (message.existingLicense != null && message.hasOwnProperty("existingLicense")) {
                        object.existingLicense = $root.license_protocol.LicenseRequest.ContentIdentification.ExistingLicense.toObject(message.existingLicense, options);
                        if (options.oneofs)
                            object.contentIdVariant = "existingLicense";
                    }
                    if (message.initData != null && message.hasOwnProperty("initData")) {
                        object.initData = $root.license_protocol.LicenseRequest.ContentIdentification.InitData.toObject(message.initData, options);
                        if (options.oneofs)
                            object.contentIdVariant = "initData";
                    }
                    return object;
                };
    
                /**
                 * Converts this ContentIdentification to JSON.
                 * @function toJSON
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ContentIdentification.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * Gets the default type url for ContentIdentification
                 * @function getTypeUrl
                 * @memberof license_protocol.LicenseRequest.ContentIdentification
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ContentIdentification.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/license_protocol.LicenseRequest.ContentIdentification";
                };
    
                ContentIdentification.WidevinePsshData = (function() {
    
                    /**
                     * Properties of a WidevinePsshData.
                     * @memberof license_protocol.LicenseRequest.ContentIdentification
                     * @interface IWidevinePsshData
                     * @property {Array.<Uint8Array>|null} [psshData] WidevinePsshData psshData
                     * @property {license_protocol.LicenseType|null} [licenseType] WidevinePsshData licenseType
                     * @property {Uint8Array|null} [requestId] WidevinePsshData requestId
                     */
    
                    /**
                     * Constructs a new WidevinePsshData.
                     * @memberof license_protocol.LicenseRequest.ContentIdentification
                     * @classdesc Represents a WidevinePsshData.
                     * @implements IWidevinePsshData
                     * @constructor
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IWidevinePsshData=} [properties] Properties to set
                     */
                    function WidevinePsshData(properties) {
                        this.psshData = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * WidevinePsshData psshData.
                     * @member {Array.<Uint8Array>} psshData
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData
                     * @instance
                     */
                    WidevinePsshData.prototype.psshData = $util.emptyArray;
    
                    /**
                     * WidevinePsshData licenseType.
                     * @member {license_protocol.LicenseType} licenseType
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData
                     * @instance
                     */
                    WidevinePsshData.prototype.licenseType = 1;
    
                    /**
                     * WidevinePsshData requestId.
                     * @member {Uint8Array} requestId
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData
                     * @instance
                     */
                    WidevinePsshData.prototype.requestId = $util.newBuffer([]);
    
                    /**
                     * Creates a new WidevinePsshData instance using the specified properties.
                     * @function create
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IWidevinePsshData=} [properties] Properties to set
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData} WidevinePsshData instance
                     */
                    WidevinePsshData.create = function create(properties) {
                        return new WidevinePsshData(properties);
                    };
    
                    /**
                     * Encodes the specified WidevinePsshData message. Does not implicitly {@link license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData.verify|verify} messages.
                     * @function encode
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IWidevinePsshData} message WidevinePsshData message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    WidevinePsshData.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.psshData != null && message.psshData.length)
                            for (var i = 0; i < message.psshData.length; ++i)
                                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.psshData[i]);
                        if (message.licenseType != null && Object.hasOwnProperty.call(message, "licenseType"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.licenseType);
                        if (message.requestId != null && Object.hasOwnProperty.call(message, "requestId"))
                            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.requestId);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified WidevinePsshData message, length delimited. Does not implicitly {@link license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IWidevinePsshData} message WidevinePsshData message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    WidevinePsshData.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a WidevinePsshData message from the specified reader or buffer.
                     * @function decode
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData} WidevinePsshData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    WidevinePsshData.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1: {
                                    if (!(message.psshData && message.psshData.length))
                                        message.psshData = [];
                                    message.psshData.push(reader.bytes());
                                    break;
                                }
                            case 2: {
                                    message.licenseType = reader.int32();
                                    break;
                                }
                            case 3: {
                                    message.requestId = reader.bytes();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a WidevinePsshData message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData} WidevinePsshData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    WidevinePsshData.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a WidevinePsshData message.
                     * @function verify
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    WidevinePsshData.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.psshData != null && message.hasOwnProperty("psshData")) {
                            if (!Array.isArray(message.psshData))
                                return "psshData: array expected";
                            for (var i = 0; i < message.psshData.length; ++i)
                                if (!(message.psshData[i] && typeof message.psshData[i].length === "number" || $util.isString(message.psshData[i])))
                                    return "psshData: buffer[] expected";
                        }
                        if (message.licenseType != null && message.hasOwnProperty("licenseType"))
                            switch (message.licenseType) {
                            default:
                                return "licenseType: enum value expected";
                            case 1:
                            case 2:
                            case 3:
                                break;
                            }
                        if (message.requestId != null && message.hasOwnProperty("requestId"))
                            if (!(message.requestId && typeof message.requestId.length === "number" || $util.isString(message.requestId)))
                                return "requestId: buffer expected";
                        return null;
                    };
    
                    /**
                     * Creates a WidevinePsshData message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData} WidevinePsshData
                     */
                    WidevinePsshData.fromObject = function fromObject(object) {
                        if (object instanceof $root.license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData)
                            return object;
                        var message = new $root.license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData();
                        if (object.psshData) {
                            if (!Array.isArray(object.psshData))
                                throw TypeError(".license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData.psshData: array expected");
                            message.psshData = [];
                            for (var i = 0; i < object.psshData.length; ++i)
                                if (typeof object.psshData[i] === "string")
                                    $util.base64.decode(object.psshData[i], message.psshData[i] = $util.newBuffer($util.base64.length(object.psshData[i])), 0);
                                else if (object.psshData[i].length >= 0)
                                    message.psshData[i] = object.psshData[i];
                        }
                        switch (object.licenseType) {
                        default:
                            if (typeof object.licenseType === "number") {
                                message.licenseType = object.licenseType;
                                break;
                            }
                            break;
                        case "STREAMING":
                        case 1:
                            message.licenseType = 1;
                            break;
                        case "OFFLINE":
                        case 2:
                            message.licenseType = 2;
                            break;
                        case "AUTOMATIC":
                        case 3:
                            message.licenseType = 3;
                            break;
                        }
                        if (object.requestId != null)
                            if (typeof object.requestId === "string")
                                $util.base64.decode(object.requestId, message.requestId = $util.newBuffer($util.base64.length(object.requestId)), 0);
                            else if (object.requestId.length >= 0)
                                message.requestId = object.requestId;
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a WidevinePsshData message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData} message WidevinePsshData
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    WidevinePsshData.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.psshData = [];
                        if (options.defaults) {
                            object.licenseType = options.enums === String ? "STREAMING" : 1;
                            if (options.bytes === String)
                                object.requestId = "";
                            else {
                                object.requestId = [];
                                if (options.bytes !== Array)
                                    object.requestId = $util.newBuffer(object.requestId);
                            }
                        }
                        if (message.psshData && message.psshData.length) {
                            object.psshData = [];
                            for (var j = 0; j < message.psshData.length; ++j)
                                object.psshData[j] = options.bytes === String ? $util.base64.encode(message.psshData[j], 0, message.psshData[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.psshData[j]) : message.psshData[j];
                        }
                        if (message.licenseType != null && message.hasOwnProperty("licenseType"))
                            object.licenseType = options.enums === String ? $root.license_protocol.LicenseType[message.licenseType] === undefined ? message.licenseType : $root.license_protocol.LicenseType[message.licenseType] : message.licenseType;
                        if (message.requestId != null && message.hasOwnProperty("requestId"))
                            object.requestId = options.bytes === String ? $util.base64.encode(message.requestId, 0, message.requestId.length) : options.bytes === Array ? Array.prototype.slice.call(message.requestId) : message.requestId;
                        return object;
                    };
    
                    /**
                     * Converts this WidevinePsshData to JSON.
                     * @function toJSON
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    WidevinePsshData.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    /**
                     * Gets the default type url for WidevinePsshData
                     * @function getTypeUrl
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    WidevinePsshData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/license_protocol.LicenseRequest.ContentIdentification.WidevinePsshData";
                    };
    
                    return WidevinePsshData;
                })();
    
                ContentIdentification.WebmKeyId = (function() {
    
                    /**
                     * Properties of a WebmKeyId.
                     * @memberof license_protocol.LicenseRequest.ContentIdentification
                     * @interface IWebmKeyId
                     * @property {Uint8Array|null} [header] WebmKeyId header
                     * @property {license_protocol.LicenseType|null} [licenseType] WebmKeyId licenseType
                     * @property {Uint8Array|null} [requestId] WebmKeyId requestId
                     */
    
                    /**
                     * Constructs a new WebmKeyId.
                     * @memberof license_protocol.LicenseRequest.ContentIdentification
                     * @classdesc Represents a WebmKeyId.
                     * @implements IWebmKeyId
                     * @constructor
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IWebmKeyId=} [properties] Properties to set
                     */
                    function WebmKeyId(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * WebmKeyId header.
                     * @member {Uint8Array} header
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WebmKeyId
                     * @instance
                     */
                    WebmKeyId.prototype.header = $util.newBuffer([]);
    
                    /**
                     * WebmKeyId licenseType.
                     * @member {license_protocol.LicenseType} licenseType
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WebmKeyId
                     * @instance
                     */
                    WebmKeyId.prototype.licenseType = 1;
    
                    /**
                     * WebmKeyId requestId.
                     * @member {Uint8Array} requestId
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WebmKeyId
                     * @instance
                     */
                    WebmKeyId.prototype.requestId = $util.newBuffer([]);
    
                    /**
                     * Creates a new WebmKeyId instance using the specified properties.
                     * @function create
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WebmKeyId
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IWebmKeyId=} [properties] Properties to set
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.WebmKeyId} WebmKeyId instance
                     */
                    WebmKeyId.create = function create(properties) {
                        return new WebmKeyId(properties);
                    };
    
                    /**
                     * Encodes the specified WebmKeyId message. Does not implicitly {@link license_protocol.LicenseRequest.ContentIdentification.WebmKeyId.verify|verify} messages.
                     * @function encode
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WebmKeyId
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IWebmKeyId} message WebmKeyId message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    WebmKeyId.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.header);
                        if (message.licenseType != null && Object.hasOwnProperty.call(message, "licenseType"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.licenseType);
                        if (message.requestId != null && Object.hasOwnProperty.call(message, "requestId"))
                            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.requestId);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified WebmKeyId message, length delimited. Does not implicitly {@link license_protocol.LicenseRequest.ContentIdentification.WebmKeyId.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WebmKeyId
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IWebmKeyId} message WebmKeyId message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    WebmKeyId.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a WebmKeyId message from the specified reader or buffer.
                     * @function decode
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WebmKeyId
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.WebmKeyId} WebmKeyId
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    WebmKeyId.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.LicenseRequest.ContentIdentification.WebmKeyId();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1: {
                                    message.header = reader.bytes();
                                    break;
                                }
                            case 2: {
                                    message.licenseType = reader.int32();
                                    break;
                                }
                            case 3: {
                                    message.requestId = reader.bytes();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a WebmKeyId message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WebmKeyId
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.WebmKeyId} WebmKeyId
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    WebmKeyId.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a WebmKeyId message.
                     * @function verify
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WebmKeyId
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    WebmKeyId.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.header != null && message.hasOwnProperty("header"))
                            if (!(message.header && typeof message.header.length === "number" || $util.isString(message.header)))
                                return "header: buffer expected";
                        if (message.licenseType != null && message.hasOwnProperty("licenseType"))
                            switch (message.licenseType) {
                            default:
                                return "licenseType: enum value expected";
                            case 1:
                            case 2:
                            case 3:
                                break;
                            }
                        if (message.requestId != null && message.hasOwnProperty("requestId"))
                            if (!(message.requestId && typeof message.requestId.length === "number" || $util.isString(message.requestId)))
                                return "requestId: buffer expected";
                        return null;
                    };
    
                    /**
                     * Creates a WebmKeyId message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WebmKeyId
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.WebmKeyId} WebmKeyId
                     */
                    WebmKeyId.fromObject = function fromObject(object) {
                        if (object instanceof $root.license_protocol.LicenseRequest.ContentIdentification.WebmKeyId)
                            return object;
                        var message = new $root.license_protocol.LicenseRequest.ContentIdentification.WebmKeyId();
                        if (object.header != null)
                            if (typeof object.header === "string")
                                $util.base64.decode(object.header, message.header = $util.newBuffer($util.base64.length(object.header)), 0);
                            else if (object.header.length >= 0)
                                message.header = object.header;
                        switch (object.licenseType) {
                        default:
                            if (typeof object.licenseType === "number") {
                                message.licenseType = object.licenseType;
                                break;
                            }
                            break;
                        case "STREAMING":
                        case 1:
                            message.licenseType = 1;
                            break;
                        case "OFFLINE":
                        case 2:
                            message.licenseType = 2;
                            break;
                        case "AUTOMATIC":
                        case 3:
                            message.licenseType = 3;
                            break;
                        }
                        if (object.requestId != null)
                            if (typeof object.requestId === "string")
                                $util.base64.decode(object.requestId, message.requestId = $util.newBuffer($util.base64.length(object.requestId)), 0);
                            else if (object.requestId.length >= 0)
                                message.requestId = object.requestId;
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a WebmKeyId message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WebmKeyId
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.WebmKeyId} message WebmKeyId
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    WebmKeyId.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            if (options.bytes === String)
                                object.header = "";
                            else {
                                object.header = [];
                                if (options.bytes !== Array)
                                    object.header = $util.newBuffer(object.header);
                            }
                            object.licenseType = options.enums === String ? "STREAMING" : 1;
                            if (options.bytes === String)
                                object.requestId = "";
                            else {
                                object.requestId = [];
                                if (options.bytes !== Array)
                                    object.requestId = $util.newBuffer(object.requestId);
                            }
                        }
                        if (message.header != null && message.hasOwnProperty("header"))
                            object.header = options.bytes === String ? $util.base64.encode(message.header, 0, message.header.length) : options.bytes === Array ? Array.prototype.slice.call(message.header) : message.header;
                        if (message.licenseType != null && message.hasOwnProperty("licenseType"))
                            object.licenseType = options.enums === String ? $root.license_protocol.LicenseType[message.licenseType] === undefined ? message.licenseType : $root.license_protocol.LicenseType[message.licenseType] : message.licenseType;
                        if (message.requestId != null && message.hasOwnProperty("requestId"))
                            object.requestId = options.bytes === String ? $util.base64.encode(message.requestId, 0, message.requestId.length) : options.bytes === Array ? Array.prototype.slice.call(message.requestId) : message.requestId;
                        return object;
                    };
    
                    /**
                     * Converts this WebmKeyId to JSON.
                     * @function toJSON
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WebmKeyId
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    WebmKeyId.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    /**
                     * Gets the default type url for WebmKeyId
                     * @function getTypeUrl
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.WebmKeyId
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    WebmKeyId.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/license_protocol.LicenseRequest.ContentIdentification.WebmKeyId";
                    };
    
                    return WebmKeyId;
                })();
    
                ContentIdentification.ExistingLicense = (function() {
    
                    /**
                     * Properties of an ExistingLicense.
                     * @memberof license_protocol.LicenseRequest.ContentIdentification
                     * @interface IExistingLicense
                     * @property {license_protocol.ILicenseIdentification|null} [licenseId] ExistingLicense licenseId
                     * @property {number|Long|null} [secondsSinceStarted] ExistingLicense secondsSinceStarted
                     * @property {number|Long|null} [secondsSinceLastPlayed] ExistingLicense secondsSinceLastPlayed
                     * @property {Uint8Array|null} [sessionUsageTableEntry] ExistingLicense sessionUsageTableEntry
                     */
    
                    /**
                     * Constructs a new ExistingLicense.
                     * @memberof license_protocol.LicenseRequest.ContentIdentification
                     * @classdesc Represents an ExistingLicense.
                     * @implements IExistingLicense
                     * @constructor
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IExistingLicense=} [properties] Properties to set
                     */
                    function ExistingLicense(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * ExistingLicense licenseId.
                     * @member {license_protocol.ILicenseIdentification|null|undefined} licenseId
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @instance
                     */
                    ExistingLicense.prototype.licenseId = null;
    
                    /**
                     * ExistingLicense secondsSinceStarted.
                     * @member {number|Long} secondsSinceStarted
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @instance
                     */
                    ExistingLicense.prototype.secondsSinceStarted = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                    /**
                     * ExistingLicense secondsSinceLastPlayed.
                     * @member {number|Long} secondsSinceLastPlayed
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @instance
                     */
                    ExistingLicense.prototype.secondsSinceLastPlayed = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                    /**
                     * ExistingLicense sessionUsageTableEntry.
                     * @member {Uint8Array} sessionUsageTableEntry
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @instance
                     */
                    ExistingLicense.prototype.sessionUsageTableEntry = $util.newBuffer([]);
    
                    /**
                     * Creates a new ExistingLicense instance using the specified properties.
                     * @function create
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IExistingLicense=} [properties] Properties to set
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.ExistingLicense} ExistingLicense instance
                     */
                    ExistingLicense.create = function create(properties) {
                        return new ExistingLicense(properties);
                    };
    
                    /**
                     * Encodes the specified ExistingLicense message. Does not implicitly {@link license_protocol.LicenseRequest.ContentIdentification.ExistingLicense.verify|verify} messages.
                     * @function encode
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IExistingLicense} message ExistingLicense message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ExistingLicense.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.licenseId != null && Object.hasOwnProperty.call(message, "licenseId"))
                            $root.license_protocol.LicenseIdentification.encode(message.licenseId, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.secondsSinceStarted != null && Object.hasOwnProperty.call(message, "secondsSinceStarted"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.secondsSinceStarted);
                        if (message.secondsSinceLastPlayed != null && Object.hasOwnProperty.call(message, "secondsSinceLastPlayed"))
                            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.secondsSinceLastPlayed);
                        if (message.sessionUsageTableEntry != null && Object.hasOwnProperty.call(message, "sessionUsageTableEntry"))
                            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.sessionUsageTableEntry);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified ExistingLicense message, length delimited. Does not implicitly {@link license_protocol.LicenseRequest.ContentIdentification.ExistingLicense.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IExistingLicense} message ExistingLicense message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ExistingLicense.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes an ExistingLicense message from the specified reader or buffer.
                     * @function decode
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.ExistingLicense} ExistingLicense
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ExistingLicense.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.LicenseRequest.ContentIdentification.ExistingLicense();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1: {
                                    message.licenseId = $root.license_protocol.LicenseIdentification.decode(reader, reader.uint32());
                                    break;
                                }
                            case 2: {
                                    message.secondsSinceStarted = reader.int64();
                                    break;
                                }
                            case 3: {
                                    message.secondsSinceLastPlayed = reader.int64();
                                    break;
                                }
                            case 4: {
                                    message.sessionUsageTableEntry = reader.bytes();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes an ExistingLicense message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.ExistingLicense} ExistingLicense
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ExistingLicense.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies an ExistingLicense message.
                     * @function verify
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ExistingLicense.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.licenseId != null && message.hasOwnProperty("licenseId")) {
                            var error = $root.license_protocol.LicenseIdentification.verify(message.licenseId);
                            if (error)
                                return "licenseId." + error;
                        }
                        if (message.secondsSinceStarted != null && message.hasOwnProperty("secondsSinceStarted"))
                            if (!$util.isInteger(message.secondsSinceStarted) && !(message.secondsSinceStarted && $util.isInteger(message.secondsSinceStarted.low) && $util.isInteger(message.secondsSinceStarted.high)))
                                return "secondsSinceStarted: integer|Long expected";
                        if (message.secondsSinceLastPlayed != null && message.hasOwnProperty("secondsSinceLastPlayed"))
                            if (!$util.isInteger(message.secondsSinceLastPlayed) && !(message.secondsSinceLastPlayed && $util.isInteger(message.secondsSinceLastPlayed.low) && $util.isInteger(message.secondsSinceLastPlayed.high)))
                                return "secondsSinceLastPlayed: integer|Long expected";
                        if (message.sessionUsageTableEntry != null && message.hasOwnProperty("sessionUsageTableEntry"))
                            if (!(message.sessionUsageTableEntry && typeof message.sessionUsageTableEntry.length === "number" || $util.isString(message.sessionUsageTableEntry)))
                                return "sessionUsageTableEntry: buffer expected";
                        return null;
                    };
    
                    /**
                     * Creates an ExistingLicense message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.ExistingLicense} ExistingLicense
                     */
                    ExistingLicense.fromObject = function fromObject(object) {
                        if (object instanceof $root.license_protocol.LicenseRequest.ContentIdentification.ExistingLicense)
                            return object;
                        var message = new $root.license_protocol.LicenseRequest.ContentIdentification.ExistingLicense();
                        if (object.licenseId != null) {
                            if (typeof object.licenseId !== "object")
                                throw TypeError(".license_protocol.LicenseRequest.ContentIdentification.ExistingLicense.licenseId: object expected");
                            message.licenseId = $root.license_protocol.LicenseIdentification.fromObject(object.licenseId);
                        }
                        if (object.secondsSinceStarted != null)
                            if ($util.Long)
                                (message.secondsSinceStarted = $util.Long.fromValue(object.secondsSinceStarted)).unsigned = false;
                            else if (typeof object.secondsSinceStarted === "string")
                                message.secondsSinceStarted = parseInt(object.secondsSinceStarted, 10);
                            else if (typeof object.secondsSinceStarted === "number")
                                message.secondsSinceStarted = object.secondsSinceStarted;
                            else if (typeof object.secondsSinceStarted === "object")
                                message.secondsSinceStarted = new $util.LongBits(object.secondsSinceStarted.low >>> 0, object.secondsSinceStarted.high >>> 0).toNumber();
                        if (object.secondsSinceLastPlayed != null)
                            if ($util.Long)
                                (message.secondsSinceLastPlayed = $util.Long.fromValue(object.secondsSinceLastPlayed)).unsigned = false;
                            else if (typeof object.secondsSinceLastPlayed === "string")
                                message.secondsSinceLastPlayed = parseInt(object.secondsSinceLastPlayed, 10);
                            else if (typeof object.secondsSinceLastPlayed === "number")
                                message.secondsSinceLastPlayed = object.secondsSinceLastPlayed;
                            else if (typeof object.secondsSinceLastPlayed === "object")
                                message.secondsSinceLastPlayed = new $util.LongBits(object.secondsSinceLastPlayed.low >>> 0, object.secondsSinceLastPlayed.high >>> 0).toNumber();
                        if (object.sessionUsageTableEntry != null)
                            if (typeof object.sessionUsageTableEntry === "string")
                                $util.base64.decode(object.sessionUsageTableEntry, message.sessionUsageTableEntry = $util.newBuffer($util.base64.length(object.sessionUsageTableEntry)), 0);
                            else if (object.sessionUsageTableEntry.length >= 0)
                                message.sessionUsageTableEntry = object.sessionUsageTableEntry;
                        return message;
                    };
    
                    /**
                     * Creates a plain object from an ExistingLicense message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.ExistingLicense} message ExistingLicense
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ExistingLicense.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.licenseId = null;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, false);
                                object.secondsSinceStarted = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.secondsSinceStarted = options.longs === String ? "0" : 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, false);
                                object.secondsSinceLastPlayed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.secondsSinceLastPlayed = options.longs === String ? "0" : 0;
                            if (options.bytes === String)
                                object.sessionUsageTableEntry = "";
                            else {
                                object.sessionUsageTableEntry = [];
                                if (options.bytes !== Array)
                                    object.sessionUsageTableEntry = $util.newBuffer(object.sessionUsageTableEntry);
                            }
                        }
                        if (message.licenseId != null && message.hasOwnProperty("licenseId"))
                            object.licenseId = $root.license_protocol.LicenseIdentification.toObject(message.licenseId, options);
                        if (message.secondsSinceStarted != null && message.hasOwnProperty("secondsSinceStarted"))
                            if (typeof message.secondsSinceStarted === "number")
                                object.secondsSinceStarted = options.longs === String ? String(message.secondsSinceStarted) : message.secondsSinceStarted;
                            else
                                object.secondsSinceStarted = options.longs === String ? $util.Long.prototype.toString.call(message.secondsSinceStarted) : options.longs === Number ? new $util.LongBits(message.secondsSinceStarted.low >>> 0, message.secondsSinceStarted.high >>> 0).toNumber() : message.secondsSinceStarted;
                        if (message.secondsSinceLastPlayed != null && message.hasOwnProperty("secondsSinceLastPlayed"))
                            if (typeof message.secondsSinceLastPlayed === "number")
                                object.secondsSinceLastPlayed = options.longs === String ? String(message.secondsSinceLastPlayed) : message.secondsSinceLastPlayed;
                            else
                                object.secondsSinceLastPlayed = options.longs === String ? $util.Long.prototype.toString.call(message.secondsSinceLastPlayed) : options.longs === Number ? new $util.LongBits(message.secondsSinceLastPlayed.low >>> 0, message.secondsSinceLastPlayed.high >>> 0).toNumber() : message.secondsSinceLastPlayed;
                        if (message.sessionUsageTableEntry != null && message.hasOwnProperty("sessionUsageTableEntry"))
                            object.sessionUsageTableEntry = options.bytes === String ? $util.base64.encode(message.sessionUsageTableEntry, 0, message.sessionUsageTableEntry.length) : options.bytes === Array ? Array.prototype.slice.call(message.sessionUsageTableEntry) : message.sessionUsageTableEntry;
                        return object;
                    };
    
                    /**
                     * Converts this ExistingLicense to JSON.
                     * @function toJSON
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ExistingLicense.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    /**
                     * Gets the default type url for ExistingLicense
                     * @function getTypeUrl
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.ExistingLicense
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    ExistingLicense.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/license_protocol.LicenseRequest.ContentIdentification.ExistingLicense";
                    };
    
                    return ExistingLicense;
                })();
    
                ContentIdentification.InitData = (function() {
    
                    /**
                     * Properties of an InitData.
                     * @memberof license_protocol.LicenseRequest.ContentIdentification
                     * @interface IInitData
                     * @property {license_protocol.LicenseRequest.ContentIdentification.InitData.InitDataType|null} [initDataType] InitData initDataType
                     * @property {Uint8Array|null} [initData] InitData initData
                     * @property {license_protocol.LicenseType|null} [licenseType] InitData licenseType
                     * @property {Uint8Array|null} [requestId] InitData requestId
                     */
    
                    /**
                     * Constructs a new InitData.
                     * @memberof license_protocol.LicenseRequest.ContentIdentification
                     * @classdesc Represents an InitData.
                     * @implements IInitData
                     * @constructor
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IInitData=} [properties] Properties to set
                     */
                    function InitData(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * InitData initDataType.
                     * @member {license_protocol.LicenseRequest.ContentIdentification.InitData.InitDataType} initDataType
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @instance
                     */
                    InitData.prototype.initDataType = 1;
    
                    /**
                     * InitData initData.
                     * @member {Uint8Array} initData
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @instance
                     */
                    InitData.prototype.initData = $util.newBuffer([]);
    
                    /**
                     * InitData licenseType.
                     * @member {license_protocol.LicenseType} licenseType
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @instance
                     */
                    InitData.prototype.licenseType = 1;
    
                    /**
                     * InitData requestId.
                     * @member {Uint8Array} requestId
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @instance
                     */
                    InitData.prototype.requestId = $util.newBuffer([]);
    
                    /**
                     * Creates a new InitData instance using the specified properties.
                     * @function create
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IInitData=} [properties] Properties to set
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.InitData} InitData instance
                     */
                    InitData.create = function create(properties) {
                        return new InitData(properties);
                    };
    
                    /**
                     * Encodes the specified InitData message. Does not implicitly {@link license_protocol.LicenseRequest.ContentIdentification.InitData.verify|verify} messages.
                     * @function encode
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IInitData} message InitData message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    InitData.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.initDataType != null && Object.hasOwnProperty.call(message, "initDataType"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.initDataType);
                        if (message.initData != null && Object.hasOwnProperty.call(message, "initData"))
                            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.initData);
                        if (message.licenseType != null && Object.hasOwnProperty.call(message, "licenseType"))
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.licenseType);
                        if (message.requestId != null && Object.hasOwnProperty.call(message, "requestId"))
                            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.requestId);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified InitData message, length delimited. Does not implicitly {@link license_protocol.LicenseRequest.ContentIdentification.InitData.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.IInitData} message InitData message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    InitData.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes an InitData message from the specified reader or buffer.
                     * @function decode
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.InitData} InitData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    InitData.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.LicenseRequest.ContentIdentification.InitData();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1: {
                                    message.initDataType = reader.int32();
                                    break;
                                }
                            case 2: {
                                    message.initData = reader.bytes();
                                    break;
                                }
                            case 3: {
                                    message.licenseType = reader.int32();
                                    break;
                                }
                            case 4: {
                                    message.requestId = reader.bytes();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes an InitData message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.InitData} InitData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    InitData.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies an InitData message.
                     * @function verify
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    InitData.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.initDataType != null && message.hasOwnProperty("initDataType"))
                            switch (message.initDataType) {
                            default:
                                return "initDataType: enum value expected";
                            case 1:
                            case 2:
                                break;
                            }
                        if (message.initData != null && message.hasOwnProperty("initData"))
                            if (!(message.initData && typeof message.initData.length === "number" || $util.isString(message.initData)))
                                return "initData: buffer expected";
                        if (message.licenseType != null && message.hasOwnProperty("licenseType"))
                            switch (message.licenseType) {
                            default:
                                return "licenseType: enum value expected";
                            case 1:
                            case 2:
                            case 3:
                                break;
                            }
                        if (message.requestId != null && message.hasOwnProperty("requestId"))
                            if (!(message.requestId && typeof message.requestId.length === "number" || $util.isString(message.requestId)))
                                return "requestId: buffer expected";
                        return null;
                    };
    
                    /**
                     * Creates an InitData message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {license_protocol.LicenseRequest.ContentIdentification.InitData} InitData
                     */
                    InitData.fromObject = function fromObject(object) {
                        if (object instanceof $root.license_protocol.LicenseRequest.ContentIdentification.InitData)
                            return object;
                        var message = new $root.license_protocol.LicenseRequest.ContentIdentification.InitData();
                        switch (object.initDataType) {
                        default:
                            if (typeof object.initDataType === "number") {
                                message.initDataType = object.initDataType;
                                break;
                            }
                            break;
                        case "CENC":
                        case 1:
                            message.initDataType = 1;
                            break;
                        case "WEBM":
                        case 2:
                            message.initDataType = 2;
                            break;
                        }
                        if (object.initData != null)
                            if (typeof object.initData === "string")
                                $util.base64.decode(object.initData, message.initData = $util.newBuffer($util.base64.length(object.initData)), 0);
                            else if (object.initData.length >= 0)
                                message.initData = object.initData;
                        switch (object.licenseType) {
                        default:
                            if (typeof object.licenseType === "number") {
                                message.licenseType = object.licenseType;
                                break;
                            }
                            break;
                        case "STREAMING":
                        case 1:
                            message.licenseType = 1;
                            break;
                        case "OFFLINE":
                        case 2:
                            message.licenseType = 2;
                            break;
                        case "AUTOMATIC":
                        case 3:
                            message.licenseType = 3;
                            break;
                        }
                        if (object.requestId != null)
                            if (typeof object.requestId === "string")
                                $util.base64.decode(object.requestId, message.requestId = $util.newBuffer($util.base64.length(object.requestId)), 0);
                            else if (object.requestId.length >= 0)
                                message.requestId = object.requestId;
                        return message;
                    };
    
                    /**
                     * Creates a plain object from an InitData message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @static
                     * @param {license_protocol.LicenseRequest.ContentIdentification.InitData} message InitData
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    InitData.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.initDataType = options.enums === String ? "CENC" : 1;
                            if (options.bytes === String)
                                object.initData = "";
                            else {
                                object.initData = [];
                                if (options.bytes !== Array)
                                    object.initData = $util.newBuffer(object.initData);
                            }
                            object.licenseType = options.enums === String ? "STREAMING" : 1;
                            if (options.bytes === String)
                                object.requestId = "";
                            else {
                                object.requestId = [];
                                if (options.bytes !== Array)
                                    object.requestId = $util.newBuffer(object.requestId);
                            }
                        }
                        if (message.initDataType != null && message.hasOwnProperty("initDataType"))
                            object.initDataType = options.enums === String ? $root.license_protocol.LicenseRequest.ContentIdentification.InitData.InitDataType[message.initDataType] === undefined ? message.initDataType : $root.license_protocol.LicenseRequest.ContentIdentification.InitData.InitDataType[message.initDataType] : message.initDataType;
                        if (message.initData != null && message.hasOwnProperty("initData"))
                            object.initData = options.bytes === String ? $util.base64.encode(message.initData, 0, message.initData.length) : options.bytes === Array ? Array.prototype.slice.call(message.initData) : message.initData;
                        if (message.licenseType != null && message.hasOwnProperty("licenseType"))
                            object.licenseType = options.enums === String ? $root.license_protocol.LicenseType[message.licenseType] === undefined ? message.licenseType : $root.license_protocol.LicenseType[message.licenseType] : message.licenseType;
                        if (message.requestId != null && message.hasOwnProperty("requestId"))
                            object.requestId = options.bytes === String ? $util.base64.encode(message.requestId, 0, message.requestId.length) : options.bytes === Array ? Array.prototype.slice.call(message.requestId) : message.requestId;
                        return object;
                    };
    
                    /**
                     * Converts this InitData to JSON.
                     * @function toJSON
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    InitData.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    /**
                     * Gets the default type url for InitData
                     * @function getTypeUrl
                     * @memberof license_protocol.LicenseRequest.ContentIdentification.InitData
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    InitData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/license_protocol.LicenseRequest.ContentIdentification.InitData";
                    };
    
                    /**
                     * InitDataType enum.
                     * @name license_protocol.LicenseRequest.ContentIdentification.InitData.InitDataType
                     * @enum {number}
                     * @property {number} CENC=1 CENC value
                     * @property {number} WEBM=2 WEBM value
                     */
                    InitData.InitDataType = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[1] = "CENC"] = 1;
                        values[valuesById[2] = "WEBM"] = 2;
                        return values;
                    })();
    
                    return InitData;
                })();
    
                return ContentIdentification;
            })();
    
            /**
             * RequestType enum.
             * @name license_protocol.LicenseRequest.RequestType
             * @enum {number}
             * @property {number} NEW=1 NEW value
             * @property {number} RENEWAL=2 RENEWAL value
             * @property {number} RELEASE=3 RELEASE value
             */
            LicenseRequest.RequestType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[1] = "NEW"] = 1;
                values[valuesById[2] = "RENEWAL"] = 2;
                values[valuesById[3] = "RELEASE"] = 3;
                return values;
            })();
    
            return LicenseRequest;
        })();
    
        license_protocol.MetricData = (function() {
    
            /**
             * Properties of a MetricData.
             * @memberof license_protocol
             * @interface IMetricData
             * @property {string|null} [stageName] MetricData stageName
             * @property {Array.<license_protocol.MetricData.ITypeValue>|null} [metricData] MetricData metricData
             */
    
            /**
             * Constructs a new MetricData.
             * @memberof license_protocol
             * @classdesc Represents a MetricData.
             * @implements IMetricData
             * @constructor
             * @param {license_protocol.IMetricData=} [properties] Properties to set
             */
            function MetricData(properties) {
                this.metricData = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * MetricData stageName.
             * @member {string} stageName
             * @memberof license_protocol.MetricData
             * @instance
             */
            MetricData.prototype.stageName = "";
    
            /**
             * MetricData metricData.
             * @member {Array.<license_protocol.MetricData.ITypeValue>} metricData
             * @memberof license_protocol.MetricData
             * @instance
             */
            MetricData.prototype.metricData = $util.emptyArray;
    
            /**
             * Creates a new MetricData instance using the specified properties.
             * @function create
             * @memberof license_protocol.MetricData
             * @static
             * @param {license_protocol.IMetricData=} [properties] Properties to set
             * @returns {license_protocol.MetricData} MetricData instance
             */
            MetricData.create = function create(properties) {
                return new MetricData(properties);
            };
    
            /**
             * Encodes the specified MetricData message. Does not implicitly {@link license_protocol.MetricData.verify|verify} messages.
             * @function encode
             * @memberof license_protocol.MetricData
             * @static
             * @param {license_protocol.IMetricData} message MetricData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MetricData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.stageName != null && Object.hasOwnProperty.call(message, "stageName"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.stageName);
                if (message.metricData != null && message.metricData.length)
                    for (var i = 0; i < message.metricData.length; ++i)
                        $root.license_protocol.MetricData.TypeValue.encode(message.metricData[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified MetricData message, length delimited. Does not implicitly {@link license_protocol.MetricData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof license_protocol.MetricData
             * @static
             * @param {license_protocol.IMetricData} message MetricData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MetricData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a MetricData message from the specified reader or buffer.
             * @function decode
             * @memberof license_protocol.MetricData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {license_protocol.MetricData} MetricData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MetricData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.MetricData();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.stageName = reader.string();
                            break;
                        }
                    case 2: {
                            if (!(message.metricData && message.metricData.length))
                                message.metricData = [];
                            message.metricData.push($root.license_protocol.MetricData.TypeValue.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a MetricData message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof license_protocol.MetricData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {license_protocol.MetricData} MetricData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MetricData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a MetricData message.
             * @function verify
             * @memberof license_protocol.MetricData
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MetricData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.stageName != null && message.hasOwnProperty("stageName"))
                    if (!$util.isString(message.stageName))
                        return "stageName: string expected";
                if (message.metricData != null && message.hasOwnProperty("metricData")) {
                    if (!Array.isArray(message.metricData))
                        return "metricData: array expected";
                    for (var i = 0; i < message.metricData.length; ++i) {
                        var error = $root.license_protocol.MetricData.TypeValue.verify(message.metricData[i]);
                        if (error)
                            return "metricData." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a MetricData message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof license_protocol.MetricData
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {license_protocol.MetricData} MetricData
             */
            MetricData.fromObject = function fromObject(object) {
                if (object instanceof $root.license_protocol.MetricData)
                    return object;
                var message = new $root.license_protocol.MetricData();
                if (object.stageName != null)
                    message.stageName = String(object.stageName);
                if (object.metricData) {
                    if (!Array.isArray(object.metricData))
                        throw TypeError(".license_protocol.MetricData.metricData: array expected");
                    message.metricData = [];
                    for (var i = 0; i < object.metricData.length; ++i) {
                        if (typeof object.metricData[i] !== "object")
                            throw TypeError(".license_protocol.MetricData.metricData: object expected");
                        message.metricData[i] = $root.license_protocol.MetricData.TypeValue.fromObject(object.metricData[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a MetricData message. Also converts values to other types if specified.
             * @function toObject
             * @memberof license_protocol.MetricData
             * @static
             * @param {license_protocol.MetricData} message MetricData
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MetricData.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.metricData = [];
                if (options.defaults)
                    object.stageName = "";
                if (message.stageName != null && message.hasOwnProperty("stageName"))
                    object.stageName = message.stageName;
                if (message.metricData && message.metricData.length) {
                    object.metricData = [];
                    for (var j = 0; j < message.metricData.length; ++j)
                        object.metricData[j] = $root.license_protocol.MetricData.TypeValue.toObject(message.metricData[j], options);
                }
                return object;
            };
    
            /**
             * Converts this MetricData to JSON.
             * @function toJSON
             * @memberof license_protocol.MetricData
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MetricData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for MetricData
             * @function getTypeUrl
             * @memberof license_protocol.MetricData
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            MetricData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/license_protocol.MetricData";
            };
    
            /**
             * MetricType enum.
             * @name license_protocol.MetricData.MetricType
             * @enum {number}
             * @property {number} LATENCY=1 LATENCY value
             * @property {number} TIMESTAMP=2 TIMESTAMP value
             */
            MetricData.MetricType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[1] = "LATENCY"] = 1;
                values[valuesById[2] = "TIMESTAMP"] = 2;
                return values;
            })();
    
            MetricData.TypeValue = (function() {
    
                /**
                 * Properties of a TypeValue.
                 * @memberof license_protocol.MetricData
                 * @interface ITypeValue
                 * @property {license_protocol.MetricData.MetricType|null} [type] TypeValue type
                 * @property {number|Long|null} [value] TypeValue value
                 */
    
                /**
                 * Constructs a new TypeValue.
                 * @memberof license_protocol.MetricData
                 * @classdesc Represents a TypeValue.
                 * @implements ITypeValue
                 * @constructor
                 * @param {license_protocol.MetricData.ITypeValue=} [properties] Properties to set
                 */
                function TypeValue(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * TypeValue type.
                 * @member {license_protocol.MetricData.MetricType} type
                 * @memberof license_protocol.MetricData.TypeValue
                 * @instance
                 */
                TypeValue.prototype.type = 1;
    
                /**
                 * TypeValue value.
                 * @member {number|Long} value
                 * @memberof license_protocol.MetricData.TypeValue
                 * @instance
                 */
                TypeValue.prototype.value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Creates a new TypeValue instance using the specified properties.
                 * @function create
                 * @memberof license_protocol.MetricData.TypeValue
                 * @static
                 * @param {license_protocol.MetricData.ITypeValue=} [properties] Properties to set
                 * @returns {license_protocol.MetricData.TypeValue} TypeValue instance
                 */
                TypeValue.create = function create(properties) {
                    return new TypeValue(properties);
                };
    
                /**
                 * Encodes the specified TypeValue message. Does not implicitly {@link license_protocol.MetricData.TypeValue.verify|verify} messages.
                 * @function encode
                 * @memberof license_protocol.MetricData.TypeValue
                 * @static
                 * @param {license_protocol.MetricData.ITypeValue} message TypeValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TypeValue.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                    if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int64(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified TypeValue message, length delimited. Does not implicitly {@link license_protocol.MetricData.TypeValue.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof license_protocol.MetricData.TypeValue
                 * @static
                 * @param {license_protocol.MetricData.ITypeValue} message TypeValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TypeValue.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a TypeValue message from the specified reader or buffer.
                 * @function decode
                 * @memberof license_protocol.MetricData.TypeValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {license_protocol.MetricData.TypeValue} TypeValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TypeValue.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.MetricData.TypeValue();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.type = reader.int32();
                                break;
                            }
                        case 2: {
                                message.value = reader.int64();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a TypeValue message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof license_protocol.MetricData.TypeValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {license_protocol.MetricData.TypeValue} TypeValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TypeValue.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a TypeValue message.
                 * @function verify
                 * @memberof license_protocol.MetricData.TypeValue
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TypeValue.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 1:
                        case 2:
                            break;
                        }
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!$util.isInteger(message.value) && !(message.value && $util.isInteger(message.value.low) && $util.isInteger(message.value.high)))
                            return "value: integer|Long expected";
                    return null;
                };
    
                /**
                 * Creates a TypeValue message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof license_protocol.MetricData.TypeValue
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {license_protocol.MetricData.TypeValue} TypeValue
                 */
                TypeValue.fromObject = function fromObject(object) {
                    if (object instanceof $root.license_protocol.MetricData.TypeValue)
                        return object;
                    var message = new $root.license_protocol.MetricData.TypeValue();
                    switch (object.type) {
                    default:
                        if (typeof object.type === "number") {
                            message.type = object.type;
                            break;
                        }
                        break;
                    case "LATENCY":
                    case 1:
                        message.type = 1;
                        break;
                    case "TIMESTAMP":
                    case 2:
                        message.type = 2;
                        break;
                    }
                    if (object.value != null)
                        if ($util.Long)
                            (message.value = $util.Long.fromValue(object.value)).unsigned = false;
                        else if (typeof object.value === "string")
                            message.value = parseInt(object.value, 10);
                        else if (typeof object.value === "number")
                            message.value = object.value;
                        else if (typeof object.value === "object")
                            message.value = new $util.LongBits(object.value.low >>> 0, object.value.high >>> 0).toNumber();
                    return message;
                };
    
                /**
                 * Creates a plain object from a TypeValue message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof license_protocol.MetricData.TypeValue
                 * @static
                 * @param {license_protocol.MetricData.TypeValue} message TypeValue
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TypeValue.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.type = options.enums === String ? "LATENCY" : 1;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.value = options.longs === String ? "0" : 0;
                    }
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.license_protocol.MetricData.MetricType[message.type] === undefined ? message.type : $root.license_protocol.MetricData.MetricType[message.type] : message.type;
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (typeof message.value === "number")
                            object.value = options.longs === String ? String(message.value) : message.value;
                        else
                            object.value = options.longs === String ? $util.Long.prototype.toString.call(message.value) : options.longs === Number ? new $util.LongBits(message.value.low >>> 0, message.value.high >>> 0).toNumber() : message.value;
                    return object;
                };
    
                /**
                 * Converts this TypeValue to JSON.
                 * @function toJSON
                 * @memberof license_protocol.MetricData.TypeValue
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TypeValue.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * Gets the default type url for TypeValue
                 * @function getTypeUrl
                 * @memberof license_protocol.MetricData.TypeValue
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TypeValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/license_protocol.MetricData.TypeValue";
                };
    
                return TypeValue;
            })();
    
            return MetricData;
        })();
    
        license_protocol.VersionInfo = (function() {
    
            /**
             * Properties of a VersionInfo.
             * @memberof license_protocol
             * @interface IVersionInfo
             * @property {string|null} [licenseSdkVersion] VersionInfo licenseSdkVersion
             * @property {string|null} [licenseServiceVersion] VersionInfo licenseServiceVersion
             */
    
            /**
             * Constructs a new VersionInfo.
             * @memberof license_protocol
             * @classdesc Represents a VersionInfo.
             * @implements IVersionInfo
             * @constructor
             * @param {license_protocol.IVersionInfo=} [properties] Properties to set
             */
            function VersionInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * VersionInfo licenseSdkVersion.
             * @member {string} licenseSdkVersion
             * @memberof license_protocol.VersionInfo
             * @instance
             */
            VersionInfo.prototype.licenseSdkVersion = "";
    
            /**
             * VersionInfo licenseServiceVersion.
             * @member {string} licenseServiceVersion
             * @memberof license_protocol.VersionInfo
             * @instance
             */
            VersionInfo.prototype.licenseServiceVersion = "";
    
            /**
             * Creates a new VersionInfo instance using the specified properties.
             * @function create
             * @memberof license_protocol.VersionInfo
             * @static
             * @param {license_protocol.IVersionInfo=} [properties] Properties to set
             * @returns {license_protocol.VersionInfo} VersionInfo instance
             */
            VersionInfo.create = function create(properties) {
                return new VersionInfo(properties);
            };
    
            /**
             * Encodes the specified VersionInfo message. Does not implicitly {@link license_protocol.VersionInfo.verify|verify} messages.
             * @function encode
             * @memberof license_protocol.VersionInfo
             * @static
             * @param {license_protocol.IVersionInfo} message VersionInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VersionInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.licenseSdkVersion != null && Object.hasOwnProperty.call(message, "licenseSdkVersion"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.licenseSdkVersion);
                if (message.licenseServiceVersion != null && Object.hasOwnProperty.call(message, "licenseServiceVersion"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.licenseServiceVersion);
                return writer;
            };
    
            /**
             * Encodes the specified VersionInfo message, length delimited. Does not implicitly {@link license_protocol.VersionInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof license_protocol.VersionInfo
             * @static
             * @param {license_protocol.IVersionInfo} message VersionInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VersionInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a VersionInfo message from the specified reader or buffer.
             * @function decode
             * @memberof license_protocol.VersionInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {license_protocol.VersionInfo} VersionInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VersionInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.VersionInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.licenseSdkVersion = reader.string();
                            break;
                        }
                    case 2: {
                            message.licenseServiceVersion = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a VersionInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof license_protocol.VersionInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {license_protocol.VersionInfo} VersionInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VersionInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a VersionInfo message.
             * @function verify
             * @memberof license_protocol.VersionInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VersionInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.licenseSdkVersion != null && message.hasOwnProperty("licenseSdkVersion"))
                    if (!$util.isString(message.licenseSdkVersion))
                        return "licenseSdkVersion: string expected";
                if (message.licenseServiceVersion != null && message.hasOwnProperty("licenseServiceVersion"))
                    if (!$util.isString(message.licenseServiceVersion))
                        return "licenseServiceVersion: string expected";
                return null;
            };
    
            /**
             * Creates a VersionInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof license_protocol.VersionInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {license_protocol.VersionInfo} VersionInfo
             */
            VersionInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.license_protocol.VersionInfo)
                    return object;
                var message = new $root.license_protocol.VersionInfo();
                if (object.licenseSdkVersion != null)
                    message.licenseSdkVersion = String(object.licenseSdkVersion);
                if (object.licenseServiceVersion != null)
                    message.licenseServiceVersion = String(object.licenseServiceVersion);
                return message;
            };
    
            /**
             * Creates a plain object from a VersionInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof license_protocol.VersionInfo
             * @static
             * @param {license_protocol.VersionInfo} message VersionInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VersionInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.licenseSdkVersion = "";
                    object.licenseServiceVersion = "";
                }
                if (message.licenseSdkVersion != null && message.hasOwnProperty("licenseSdkVersion"))
                    object.licenseSdkVersion = message.licenseSdkVersion;
                if (message.licenseServiceVersion != null && message.hasOwnProperty("licenseServiceVersion"))
                    object.licenseServiceVersion = message.licenseServiceVersion;
                return object;
            };
    
            /**
             * Converts this VersionInfo to JSON.
             * @function toJSON
             * @memberof license_protocol.VersionInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VersionInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for VersionInfo
             * @function getTypeUrl
             * @memberof license_protocol.VersionInfo
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            VersionInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/license_protocol.VersionInfo";
            };
    
            return VersionInfo;
        })();
    
        license_protocol.SignedMessage = (function() {
    
            /**
             * Properties of a SignedMessage.
             * @memberof license_protocol
             * @interface ISignedMessage
             * @property {license_protocol.SignedMessage.MessageType|null} [type] SignedMessage type
             * @property {Uint8Array|null} [msg] SignedMessage msg
             * @property {Uint8Array|null} [signature] SignedMessage signature
             * @property {Uint8Array|null} [sessionKey] SignedMessage sessionKey
             * @property {Uint8Array|null} [remoteAttestation] SignedMessage remoteAttestation
             * @property {Array.<license_protocol.IMetricData>|null} [metricData] SignedMessage metricData
             * @property {license_protocol.IVersionInfo|null} [serviceVersionInfo] SignedMessage serviceVersionInfo
             * @property {license_protocol.SignedMessage.SessionKeyType|null} [sessionKeyType] SignedMessage sessionKeyType
             * @property {Uint8Array|null} [oemcryptoCoreMessage] SignedMessage oemcryptoCoreMessage
             */
    
            /**
             * Constructs a new SignedMessage.
             * @memberof license_protocol
             * @classdesc Represents a SignedMessage.
             * @implements ISignedMessage
             * @constructor
             * @param {license_protocol.ISignedMessage=} [properties] Properties to set
             */
            function SignedMessage(properties) {
                this.metricData = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * SignedMessage type.
             * @member {license_protocol.SignedMessage.MessageType} type
             * @memberof license_protocol.SignedMessage
             * @instance
             */
            SignedMessage.prototype.type = 1;
    
            /**
             * SignedMessage msg.
             * @member {Uint8Array} msg
             * @memberof license_protocol.SignedMessage
             * @instance
             */
            SignedMessage.prototype.msg = $util.newBuffer([]);
    
            /**
             * SignedMessage signature.
             * @member {Uint8Array} signature
             * @memberof license_protocol.SignedMessage
             * @instance
             */
            SignedMessage.prototype.signature = $util.newBuffer([]);
    
            /**
             * SignedMessage sessionKey.
             * @member {Uint8Array} sessionKey
             * @memberof license_protocol.SignedMessage
             * @instance
             */
            SignedMessage.prototype.sessionKey = $util.newBuffer([]);
    
            /**
             * SignedMessage remoteAttestation.
             * @member {Uint8Array} remoteAttestation
             * @memberof license_protocol.SignedMessage
             * @instance
             */
            SignedMessage.prototype.remoteAttestation = $util.newBuffer([]);
    
            /**
             * SignedMessage metricData.
             * @member {Array.<license_protocol.IMetricData>} metricData
             * @memberof license_protocol.SignedMessage
             * @instance
             */
            SignedMessage.prototype.metricData = $util.emptyArray;
    
            /**
             * SignedMessage serviceVersionInfo.
             * @member {license_protocol.IVersionInfo|null|undefined} serviceVersionInfo
             * @memberof license_protocol.SignedMessage
             * @instance
             */
            SignedMessage.prototype.serviceVersionInfo = null;
    
            /**
             * SignedMessage sessionKeyType.
             * @member {license_protocol.SignedMessage.SessionKeyType} sessionKeyType
             * @memberof license_protocol.SignedMessage
             * @instance
             */
            SignedMessage.prototype.sessionKeyType = 1;
    
            /**
             * SignedMessage oemcryptoCoreMessage.
             * @member {Uint8Array} oemcryptoCoreMessage
             * @memberof license_protocol.SignedMessage
             * @instance
             */
            SignedMessage.prototype.oemcryptoCoreMessage = $util.newBuffer([]);
    
            /**
             * Creates a new SignedMessage instance using the specified properties.
             * @function create
             * @memberof license_protocol.SignedMessage
             * @static
             * @param {license_protocol.ISignedMessage=} [properties] Properties to set
             * @returns {license_protocol.SignedMessage} SignedMessage instance
             */
            SignedMessage.create = function create(properties) {
                return new SignedMessage(properties);
            };
    
            /**
             * Encodes the specified SignedMessage message. Does not implicitly {@link license_protocol.SignedMessage.verify|verify} messages.
             * @function encode
             * @memberof license_protocol.SignedMessage
             * @static
             * @param {license_protocol.ISignedMessage} message SignedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SignedMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.msg);
                if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.signature);
                if (message.sessionKey != null && Object.hasOwnProperty.call(message, "sessionKey"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.sessionKey);
                if (message.remoteAttestation != null && Object.hasOwnProperty.call(message, "remoteAttestation"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.remoteAttestation);
                if (message.metricData != null && message.metricData.length)
                    for (var i = 0; i < message.metricData.length; ++i)
                        $root.license_protocol.MetricData.encode(message.metricData[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.serviceVersionInfo != null && Object.hasOwnProperty.call(message, "serviceVersionInfo"))
                    $root.license_protocol.VersionInfo.encode(message.serviceVersionInfo, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.sessionKeyType != null && Object.hasOwnProperty.call(message, "sessionKeyType"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int32(message.sessionKeyType);
                if (message.oemcryptoCoreMessage != null && Object.hasOwnProperty.call(message, "oemcryptoCoreMessage"))
                    writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.oemcryptoCoreMessage);
                return writer;
            };
    
            /**
             * Encodes the specified SignedMessage message, length delimited. Does not implicitly {@link license_protocol.SignedMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof license_protocol.SignedMessage
             * @static
             * @param {license_protocol.ISignedMessage} message SignedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SignedMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a SignedMessage message from the specified reader or buffer.
             * @function decode
             * @memberof license_protocol.SignedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {license_protocol.SignedMessage} SignedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SignedMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.SignedMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.type = reader.int32();
                            break;
                        }
                    case 2: {
                            message.msg = reader.bytes();
                            break;
                        }
                    case 3: {
                            message.signature = reader.bytes();
                            break;
                        }
                    case 4: {
                            message.sessionKey = reader.bytes();
                            break;
                        }
                    case 5: {
                            message.remoteAttestation = reader.bytes();
                            break;
                        }
                    case 6: {
                            if (!(message.metricData && message.metricData.length))
                                message.metricData = [];
                            message.metricData.push($root.license_protocol.MetricData.decode(reader, reader.uint32()));
                            break;
                        }
                    case 7: {
                            message.serviceVersionInfo = $root.license_protocol.VersionInfo.decode(reader, reader.uint32());
                            break;
                        }
                    case 8: {
                            message.sessionKeyType = reader.int32();
                            break;
                        }
                    case 9: {
                            message.oemcryptoCoreMessage = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SignedMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof license_protocol.SignedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {license_protocol.SignedMessage} SignedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SignedMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a SignedMessage message.
             * @function verify
             * @memberof license_protocol.SignedMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SignedMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        break;
                    }
                if (message.msg != null && message.hasOwnProperty("msg"))
                    if (!(message.msg && typeof message.msg.length === "number" || $util.isString(message.msg)))
                        return "msg: buffer expected";
                if (message.signature != null && message.hasOwnProperty("signature"))
                    if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                        return "signature: buffer expected";
                if (message.sessionKey != null && message.hasOwnProperty("sessionKey"))
                    if (!(message.sessionKey && typeof message.sessionKey.length === "number" || $util.isString(message.sessionKey)))
                        return "sessionKey: buffer expected";
                if (message.remoteAttestation != null && message.hasOwnProperty("remoteAttestation"))
                    if (!(message.remoteAttestation && typeof message.remoteAttestation.length === "number" || $util.isString(message.remoteAttestation)))
                        return "remoteAttestation: buffer expected";
                if (message.metricData != null && message.hasOwnProperty("metricData")) {
                    if (!Array.isArray(message.metricData))
                        return "metricData: array expected";
                    for (var i = 0; i < message.metricData.length; ++i) {
                        var error = $root.license_protocol.MetricData.verify(message.metricData[i]);
                        if (error)
                            return "metricData." + error;
                    }
                }
                if (message.serviceVersionInfo != null && message.hasOwnProperty("serviceVersionInfo")) {
                    var error = $root.license_protocol.VersionInfo.verify(message.serviceVersionInfo);
                    if (error)
                        return "serviceVersionInfo." + error;
                }
                if (message.sessionKeyType != null && message.hasOwnProperty("sessionKeyType"))
                    switch (message.sessionKeyType) {
                    default:
                        return "sessionKeyType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.oemcryptoCoreMessage != null && message.hasOwnProperty("oemcryptoCoreMessage"))
                    if (!(message.oemcryptoCoreMessage && typeof message.oemcryptoCoreMessage.length === "number" || $util.isString(message.oemcryptoCoreMessage)))
                        return "oemcryptoCoreMessage: buffer expected";
                return null;
            };
    
            /**
             * Creates a SignedMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof license_protocol.SignedMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {license_protocol.SignedMessage} SignedMessage
             */
            SignedMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.license_protocol.SignedMessage)
                    return object;
                var message = new $root.license_protocol.SignedMessage();
                switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "LICENSE_REQUEST":
                case 1:
                    message.type = 1;
                    break;
                case "LICENSE":
                case 2:
                    message.type = 2;
                    break;
                case "ERROR_RESPONSE":
                case 3:
                    message.type = 3;
                    break;
                case "SERVICE_CERTIFICATE_REQUEST":
                case 4:
                    message.type = 4;
                    break;
                case "SERVICE_CERTIFICATE":
                case 5:
                    message.type = 5;
                    break;
                case "SUB_LICENSE":
                case 6:
                    message.type = 6;
                    break;
                case "CAS_LICENSE_REQUEST":
                case 7:
                    message.type = 7;
                    break;
                case "CAS_LICENSE":
                case 8:
                    message.type = 8;
                    break;
                case "EXTERNAL_LICENSE_REQUEST":
                case 9:
                    message.type = 9;
                    break;
                case "EXTERNAL_LICENSE":
                case 10:
                    message.type = 10;
                    break;
                }
                if (object.msg != null)
                    if (typeof object.msg === "string")
                        $util.base64.decode(object.msg, message.msg = $util.newBuffer($util.base64.length(object.msg)), 0);
                    else if (object.msg.length >= 0)
                        message.msg = object.msg;
                if (object.signature != null)
                    if (typeof object.signature === "string")
                        $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                    else if (object.signature.length >= 0)
                        message.signature = object.signature;
                if (object.sessionKey != null)
                    if (typeof object.sessionKey === "string")
                        $util.base64.decode(object.sessionKey, message.sessionKey = $util.newBuffer($util.base64.length(object.sessionKey)), 0);
                    else if (object.sessionKey.length >= 0)
                        message.sessionKey = object.sessionKey;
                if (object.remoteAttestation != null)
                    if (typeof object.remoteAttestation === "string")
                        $util.base64.decode(object.remoteAttestation, message.remoteAttestation = $util.newBuffer($util.base64.length(object.remoteAttestation)), 0);
                    else if (object.remoteAttestation.length >= 0)
                        message.remoteAttestation = object.remoteAttestation;
                if (object.metricData) {
                    if (!Array.isArray(object.metricData))
                        throw TypeError(".license_protocol.SignedMessage.metricData: array expected");
                    message.metricData = [];
                    for (var i = 0; i < object.metricData.length; ++i) {
                        if (typeof object.metricData[i] !== "object")
                            throw TypeError(".license_protocol.SignedMessage.metricData: object expected");
                        message.metricData[i] = $root.license_protocol.MetricData.fromObject(object.metricData[i]);
                    }
                }
                if (object.serviceVersionInfo != null) {
                    if (typeof object.serviceVersionInfo !== "object")
                        throw TypeError(".license_protocol.SignedMessage.serviceVersionInfo: object expected");
                    message.serviceVersionInfo = $root.license_protocol.VersionInfo.fromObject(object.serviceVersionInfo);
                }
                switch (object.sessionKeyType) {
                case "UNDEFINED":
                case 0:
                    message.sessionKeyType = 0;
                    break;
                default:
                    if (typeof object.sessionKeyType === "number") {
                        message.sessionKeyType = object.sessionKeyType;
                        break;
                    }
                    break;
                case "WRAPPED_AES_KEY":
                case 1:
                    message.sessionKeyType = 1;
                    break;
                case "EPHERMERAL_ECC_PUBLIC_KEY":
                case 2:
                    message.sessionKeyType = 2;
                    break;
                }
                if (object.oemcryptoCoreMessage != null)
                    if (typeof object.oemcryptoCoreMessage === "string")
                        $util.base64.decode(object.oemcryptoCoreMessage, message.oemcryptoCoreMessage = $util.newBuffer($util.base64.length(object.oemcryptoCoreMessage)), 0);
                    else if (object.oemcryptoCoreMessage.length >= 0)
                        message.oemcryptoCoreMessage = object.oemcryptoCoreMessage;
                return message;
            };
    
            /**
             * Creates a plain object from a SignedMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof license_protocol.SignedMessage
             * @static
             * @param {license_protocol.SignedMessage} message SignedMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SignedMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.metricData = [];
                if (options.defaults) {
                    object.type = options.enums === String ? "LICENSE_REQUEST" : 1;
                    if (options.bytes === String)
                        object.msg = "";
                    else {
                        object.msg = [];
                        if (options.bytes !== Array)
                            object.msg = $util.newBuffer(object.msg);
                    }
                    if (options.bytes === String)
                        object.signature = "";
                    else {
                        object.signature = [];
                        if (options.bytes !== Array)
                            object.signature = $util.newBuffer(object.signature);
                    }
                    if (options.bytes === String)
                        object.sessionKey = "";
                    else {
                        object.sessionKey = [];
                        if (options.bytes !== Array)
                            object.sessionKey = $util.newBuffer(object.sessionKey);
                    }
                    if (options.bytes === String)
                        object.remoteAttestation = "";
                    else {
                        object.remoteAttestation = [];
                        if (options.bytes !== Array)
                            object.remoteAttestation = $util.newBuffer(object.remoteAttestation);
                    }
                    object.serviceVersionInfo = null;
                    object.sessionKeyType = options.enums === String ? "WRAPPED_AES_KEY" : 1;
                    if (options.bytes === String)
                        object.oemcryptoCoreMessage = "";
                    else {
                        object.oemcryptoCoreMessage = [];
                        if (options.bytes !== Array)
                            object.oemcryptoCoreMessage = $util.newBuffer(object.oemcryptoCoreMessage);
                    }
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.license_protocol.SignedMessage.MessageType[message.type] === undefined ? message.type : $root.license_protocol.SignedMessage.MessageType[message.type] : message.type;
                if (message.msg != null && message.hasOwnProperty("msg"))
                    object.msg = options.bytes === String ? $util.base64.encode(message.msg, 0, message.msg.length) : options.bytes === Array ? Array.prototype.slice.call(message.msg) : message.msg;
                if (message.signature != null && message.hasOwnProperty("signature"))
                    object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
                if (message.sessionKey != null && message.hasOwnProperty("sessionKey"))
                    object.sessionKey = options.bytes === String ? $util.base64.encode(message.sessionKey, 0, message.sessionKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.sessionKey) : message.sessionKey;
                if (message.remoteAttestation != null && message.hasOwnProperty("remoteAttestation"))
                    object.remoteAttestation = options.bytes === String ? $util.base64.encode(message.remoteAttestation, 0, message.remoteAttestation.length) : options.bytes === Array ? Array.prototype.slice.call(message.remoteAttestation) : message.remoteAttestation;
                if (message.metricData && message.metricData.length) {
                    object.metricData = [];
                    for (var j = 0; j < message.metricData.length; ++j)
                        object.metricData[j] = $root.license_protocol.MetricData.toObject(message.metricData[j], options);
                }
                if (message.serviceVersionInfo != null && message.hasOwnProperty("serviceVersionInfo"))
                    object.serviceVersionInfo = $root.license_protocol.VersionInfo.toObject(message.serviceVersionInfo, options);
                if (message.sessionKeyType != null && message.hasOwnProperty("sessionKeyType"))
                    object.sessionKeyType = options.enums === String ? $root.license_protocol.SignedMessage.SessionKeyType[message.sessionKeyType] === undefined ? message.sessionKeyType : $root.license_protocol.SignedMessage.SessionKeyType[message.sessionKeyType] : message.sessionKeyType;
                if (message.oemcryptoCoreMessage != null && message.hasOwnProperty("oemcryptoCoreMessage"))
                    object.oemcryptoCoreMessage = options.bytes === String ? $util.base64.encode(message.oemcryptoCoreMessage, 0, message.oemcryptoCoreMessage.length) : options.bytes === Array ? Array.prototype.slice.call(message.oemcryptoCoreMessage) : message.oemcryptoCoreMessage;
                return object;
            };
    
            /**
             * Converts this SignedMessage to JSON.
             * @function toJSON
             * @memberof license_protocol.SignedMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SignedMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for SignedMessage
             * @function getTypeUrl
             * @memberof license_protocol.SignedMessage
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SignedMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/license_protocol.SignedMessage";
            };
    
            /**
             * MessageType enum.
             * @name license_protocol.SignedMessage.MessageType
             * @enum {number}
             * @property {number} LICENSE_REQUEST=1 LICENSE_REQUEST value
             * @property {number} LICENSE=2 LICENSE value
             * @property {number} ERROR_RESPONSE=3 ERROR_RESPONSE value
             * @property {number} SERVICE_CERTIFICATE_REQUEST=4 SERVICE_CERTIFICATE_REQUEST value
             * @property {number} SERVICE_CERTIFICATE=5 SERVICE_CERTIFICATE value
             * @property {number} SUB_LICENSE=6 SUB_LICENSE value
             * @property {number} CAS_LICENSE_REQUEST=7 CAS_LICENSE_REQUEST value
             * @property {number} CAS_LICENSE=8 CAS_LICENSE value
             * @property {number} EXTERNAL_LICENSE_REQUEST=9 EXTERNAL_LICENSE_REQUEST value
             * @property {number} EXTERNAL_LICENSE=10 EXTERNAL_LICENSE value
             */
            SignedMessage.MessageType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[1] = "LICENSE_REQUEST"] = 1;
                values[valuesById[2] = "LICENSE"] = 2;
                values[valuesById[3] = "ERROR_RESPONSE"] = 3;
                values[valuesById[4] = "SERVICE_CERTIFICATE_REQUEST"] = 4;
                values[valuesById[5] = "SERVICE_CERTIFICATE"] = 5;
                values[valuesById[6] = "SUB_LICENSE"] = 6;
                values[valuesById[7] = "CAS_LICENSE_REQUEST"] = 7;
                values[valuesById[8] = "CAS_LICENSE"] = 8;
                values[valuesById[9] = "EXTERNAL_LICENSE_REQUEST"] = 9;
                values[valuesById[10] = "EXTERNAL_LICENSE"] = 10;
                return values;
            })();
    
            /**
             * SessionKeyType enum.
             * @name license_protocol.SignedMessage.SessionKeyType
             * @enum {number}
             * @property {number} UNDEFINED=0 UNDEFINED value
             * @property {number} WRAPPED_AES_KEY=1 WRAPPED_AES_KEY value
             * @property {number} EPHERMERAL_ECC_PUBLIC_KEY=2 EPHERMERAL_ECC_PUBLIC_KEY value
             */
            SignedMessage.SessionKeyType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNDEFINED"] = 0;
                values[valuesById[1] = "WRAPPED_AES_KEY"] = 1;
                values[valuesById[2] = "EPHERMERAL_ECC_PUBLIC_KEY"] = 2;
                return values;
            })();
    
            return SignedMessage;
        })();
    
        /**
         * HashAlgorithmProto enum.
         * @name license_protocol.HashAlgorithmProto
         * @enum {number}
         * @property {number} HASH_ALGORITHM_UNSPECIFIED=0 HASH_ALGORITHM_UNSPECIFIED value
         * @property {number} HASH_ALGORITHM_SHA_1=1 HASH_ALGORITHM_SHA_1 value
         * @property {number} HASH_ALGORITHM_SHA_256=2 HASH_ALGORITHM_SHA_256 value
         * @property {number} HASH_ALGORITHM_SHA_384=3 HASH_ALGORITHM_SHA_384 value
         */
        license_protocol.HashAlgorithmProto = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "HASH_ALGORITHM_UNSPECIFIED"] = 0;
            values[valuesById[1] = "HASH_ALGORITHM_SHA_1"] = 1;
            values[valuesById[2] = "HASH_ALGORITHM_SHA_256"] = 2;
            values[valuesById[3] = "HASH_ALGORITHM_SHA_384"] = 3;
            return values;
        })();
    
        license_protocol.ClientIdentification = (function() {
    
            /**
             * Properties of a ClientIdentification.
             * @memberof license_protocol
             * @interface IClientIdentification
             * @property {license_protocol.ClientIdentification.TokenType|null} [type] ClientIdentification type
             * @property {Uint8Array|null} [token] ClientIdentification token
             * @property {Array.<license_protocol.ClientIdentification.INameValue>|null} [clientInfo] ClientIdentification clientInfo
             * @property {Uint8Array|null} [providerClientToken] ClientIdentification providerClientToken
             * @property {number|null} [licenseCounter] ClientIdentification licenseCounter
             * @property {license_protocol.ClientIdentification.IClientCapabilities|null} [clientCapabilities] ClientIdentification clientCapabilities
             * @property {Uint8Array|null} [vmpData] ClientIdentification vmpData
             * @property {Array.<license_protocol.ClientIdentification.IClientCredentials>|null} [deviceCredentials] ClientIdentification deviceCredentials
             */
    
            /**
             * Constructs a new ClientIdentification.
             * @memberof license_protocol
             * @classdesc Represents a ClientIdentification.
             * @implements IClientIdentification
             * @constructor
             * @param {license_protocol.IClientIdentification=} [properties] Properties to set
             */
            function ClientIdentification(properties) {
                this.clientInfo = [];
                this.deviceCredentials = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ClientIdentification type.
             * @member {license_protocol.ClientIdentification.TokenType} type
             * @memberof license_protocol.ClientIdentification
             * @instance
             */
            ClientIdentification.prototype.type = 0;
    
            /**
             * ClientIdentification token.
             * @member {Uint8Array} token
             * @memberof license_protocol.ClientIdentification
             * @instance
             */
            ClientIdentification.prototype.token = $util.newBuffer([]);
    
            /**
             * ClientIdentification clientInfo.
             * @member {Array.<license_protocol.ClientIdentification.INameValue>} clientInfo
             * @memberof license_protocol.ClientIdentification
             * @instance
             */
            ClientIdentification.prototype.clientInfo = $util.emptyArray;
    
            /**
             * ClientIdentification providerClientToken.
             * @member {Uint8Array} providerClientToken
             * @memberof license_protocol.ClientIdentification
             * @instance
             */
            ClientIdentification.prototype.providerClientToken = $util.newBuffer([]);
    
            /**
             * ClientIdentification licenseCounter.
             * @member {number} licenseCounter
             * @memberof license_protocol.ClientIdentification
             * @instance
             */
            ClientIdentification.prototype.licenseCounter = 0;
    
            /**
             * ClientIdentification clientCapabilities.
             * @member {license_protocol.ClientIdentification.IClientCapabilities|null|undefined} clientCapabilities
             * @memberof license_protocol.ClientIdentification
             * @instance
             */
            ClientIdentification.prototype.clientCapabilities = null;
    
            /**
             * ClientIdentification vmpData.
             * @member {Uint8Array} vmpData
             * @memberof license_protocol.ClientIdentification
             * @instance
             */
            ClientIdentification.prototype.vmpData = $util.newBuffer([]);
    
            /**
             * ClientIdentification deviceCredentials.
             * @member {Array.<license_protocol.ClientIdentification.IClientCredentials>} deviceCredentials
             * @memberof license_protocol.ClientIdentification
             * @instance
             */
            ClientIdentification.prototype.deviceCredentials = $util.emptyArray;
    
            /**
             * Creates a new ClientIdentification instance using the specified properties.
             * @function create
             * @memberof license_protocol.ClientIdentification
             * @static
             * @param {license_protocol.IClientIdentification=} [properties] Properties to set
             * @returns {license_protocol.ClientIdentification} ClientIdentification instance
             */
            ClientIdentification.create = function create(properties) {
                return new ClientIdentification(properties);
            };
    
            /**
             * Encodes the specified ClientIdentification message. Does not implicitly {@link license_protocol.ClientIdentification.verify|verify} messages.
             * @function encode
             * @memberof license_protocol.ClientIdentification
             * @static
             * @param {license_protocol.IClientIdentification} message ClientIdentification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientIdentification.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.token);
                if (message.clientInfo != null && message.clientInfo.length)
                    for (var i = 0; i < message.clientInfo.length; ++i)
                        $root.license_protocol.ClientIdentification.NameValue.encode(message.clientInfo[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.providerClientToken != null && Object.hasOwnProperty.call(message, "providerClientToken"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.providerClientToken);
                if (message.licenseCounter != null && Object.hasOwnProperty.call(message, "licenseCounter"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.licenseCounter);
                if (message.clientCapabilities != null && Object.hasOwnProperty.call(message, "clientCapabilities"))
                    $root.license_protocol.ClientIdentification.ClientCapabilities.encode(message.clientCapabilities, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.vmpData != null && Object.hasOwnProperty.call(message, "vmpData"))
                    writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.vmpData);
                if (message.deviceCredentials != null && message.deviceCredentials.length)
                    for (var i = 0; i < message.deviceCredentials.length; ++i)
                        $root.license_protocol.ClientIdentification.ClientCredentials.encode(message.deviceCredentials[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ClientIdentification message, length delimited. Does not implicitly {@link license_protocol.ClientIdentification.verify|verify} messages.
             * @function encodeDelimited
             * @memberof license_protocol.ClientIdentification
             * @static
             * @param {license_protocol.IClientIdentification} message ClientIdentification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientIdentification.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ClientIdentification message from the specified reader or buffer.
             * @function decode
             * @memberof license_protocol.ClientIdentification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {license_protocol.ClientIdentification} ClientIdentification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientIdentification.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.ClientIdentification();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.type = reader.int32();
                            break;
                        }
                    case 2: {
                            message.token = reader.bytes();
                            break;
                        }
                    case 3: {
                            if (!(message.clientInfo && message.clientInfo.length))
                                message.clientInfo = [];
                            message.clientInfo.push($root.license_protocol.ClientIdentification.NameValue.decode(reader, reader.uint32()));
                            break;
                        }
                    case 4: {
                            message.providerClientToken = reader.bytes();
                            break;
                        }
                    case 5: {
                            message.licenseCounter = reader.uint32();
                            break;
                        }
                    case 6: {
                            message.clientCapabilities = $root.license_protocol.ClientIdentification.ClientCapabilities.decode(reader, reader.uint32());
                            break;
                        }
                    case 7: {
                            message.vmpData = reader.bytes();
                            break;
                        }
                    case 8: {
                            if (!(message.deviceCredentials && message.deviceCredentials.length))
                                message.deviceCredentials = [];
                            message.deviceCredentials.push($root.license_protocol.ClientIdentification.ClientCredentials.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ClientIdentification message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof license_protocol.ClientIdentification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {license_protocol.ClientIdentification} ClientIdentification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientIdentification.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ClientIdentification message.
             * @function verify
             * @memberof license_protocol.ClientIdentification
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ClientIdentification.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.token != null && message.hasOwnProperty("token"))
                    if (!(message.token && typeof message.token.length === "number" || $util.isString(message.token)))
                        return "token: buffer expected";
                if (message.clientInfo != null && message.hasOwnProperty("clientInfo")) {
                    if (!Array.isArray(message.clientInfo))
                        return "clientInfo: array expected";
                    for (var i = 0; i < message.clientInfo.length; ++i) {
                        var error = $root.license_protocol.ClientIdentification.NameValue.verify(message.clientInfo[i]);
                        if (error)
                            return "clientInfo." + error;
                    }
                }
                if (message.providerClientToken != null && message.hasOwnProperty("providerClientToken"))
                    if (!(message.providerClientToken && typeof message.providerClientToken.length === "number" || $util.isString(message.providerClientToken)))
                        return "providerClientToken: buffer expected";
                if (message.licenseCounter != null && message.hasOwnProperty("licenseCounter"))
                    if (!$util.isInteger(message.licenseCounter))
                        return "licenseCounter: integer expected";
                if (message.clientCapabilities != null && message.hasOwnProperty("clientCapabilities")) {
                    var error = $root.license_protocol.ClientIdentification.ClientCapabilities.verify(message.clientCapabilities);
                    if (error)
                        return "clientCapabilities." + error;
                }
                if (message.vmpData != null && message.hasOwnProperty("vmpData"))
                    if (!(message.vmpData && typeof message.vmpData.length === "number" || $util.isString(message.vmpData)))
                        return "vmpData: buffer expected";
                if (message.deviceCredentials != null && message.hasOwnProperty("deviceCredentials")) {
                    if (!Array.isArray(message.deviceCredentials))
                        return "deviceCredentials: array expected";
                    for (var i = 0; i < message.deviceCredentials.length; ++i) {
                        var error = $root.license_protocol.ClientIdentification.ClientCredentials.verify(message.deviceCredentials[i]);
                        if (error)
                            return "deviceCredentials." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a ClientIdentification message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof license_protocol.ClientIdentification
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {license_protocol.ClientIdentification} ClientIdentification
             */
            ClientIdentification.fromObject = function fromObject(object) {
                if (object instanceof $root.license_protocol.ClientIdentification)
                    return object;
                var message = new $root.license_protocol.ClientIdentification();
                switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "KEYBOX":
                case 0:
                    message.type = 0;
                    break;
                case "DRM_DEVICE_CERTIFICATE":
                case 1:
                    message.type = 1;
                    break;
                case "REMOTE_ATTESTATION_CERTIFICATE":
                case 2:
                    message.type = 2;
                    break;
                case "OEM_DEVICE_CERTIFICATE":
                case 3:
                    message.type = 3;
                    break;
                }
                if (object.token != null)
                    if (typeof object.token === "string")
                        $util.base64.decode(object.token, message.token = $util.newBuffer($util.base64.length(object.token)), 0);
                    else if (object.token.length >= 0)
                        message.token = object.token;
                if (object.clientInfo) {
                    if (!Array.isArray(object.clientInfo))
                        throw TypeError(".license_protocol.ClientIdentification.clientInfo: array expected");
                    message.clientInfo = [];
                    for (var i = 0; i < object.clientInfo.length; ++i) {
                        if (typeof object.clientInfo[i] !== "object")
                            throw TypeError(".license_protocol.ClientIdentification.clientInfo: object expected");
                        message.clientInfo[i] = $root.license_protocol.ClientIdentification.NameValue.fromObject(object.clientInfo[i]);
                    }
                }
                if (object.providerClientToken != null)
                    if (typeof object.providerClientToken === "string")
                        $util.base64.decode(object.providerClientToken, message.providerClientToken = $util.newBuffer($util.base64.length(object.providerClientToken)), 0);
                    else if (object.providerClientToken.length >= 0)
                        message.providerClientToken = object.providerClientToken;
                if (object.licenseCounter != null)
                    message.licenseCounter = object.licenseCounter >>> 0;
                if (object.clientCapabilities != null) {
                    if (typeof object.clientCapabilities !== "object")
                        throw TypeError(".license_protocol.ClientIdentification.clientCapabilities: object expected");
                    message.clientCapabilities = $root.license_protocol.ClientIdentification.ClientCapabilities.fromObject(object.clientCapabilities);
                }
                if (object.vmpData != null)
                    if (typeof object.vmpData === "string")
                        $util.base64.decode(object.vmpData, message.vmpData = $util.newBuffer($util.base64.length(object.vmpData)), 0);
                    else if (object.vmpData.length >= 0)
                        message.vmpData = object.vmpData;
                if (object.deviceCredentials) {
                    if (!Array.isArray(object.deviceCredentials))
                        throw TypeError(".license_protocol.ClientIdentification.deviceCredentials: array expected");
                    message.deviceCredentials = [];
                    for (var i = 0; i < object.deviceCredentials.length; ++i) {
                        if (typeof object.deviceCredentials[i] !== "object")
                            throw TypeError(".license_protocol.ClientIdentification.deviceCredentials: object expected");
                        message.deviceCredentials[i] = $root.license_protocol.ClientIdentification.ClientCredentials.fromObject(object.deviceCredentials[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ClientIdentification message. Also converts values to other types if specified.
             * @function toObject
             * @memberof license_protocol.ClientIdentification
             * @static
             * @param {license_protocol.ClientIdentification} message ClientIdentification
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClientIdentification.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.clientInfo = [];
                    object.deviceCredentials = [];
                }
                if (options.defaults) {
                    object.type = options.enums === String ? "KEYBOX" : 0;
                    if (options.bytes === String)
                        object.token = "";
                    else {
                        object.token = [];
                        if (options.bytes !== Array)
                            object.token = $util.newBuffer(object.token);
                    }
                    if (options.bytes === String)
                        object.providerClientToken = "";
                    else {
                        object.providerClientToken = [];
                        if (options.bytes !== Array)
                            object.providerClientToken = $util.newBuffer(object.providerClientToken);
                    }
                    object.licenseCounter = 0;
                    object.clientCapabilities = null;
                    if (options.bytes === String)
                        object.vmpData = "";
                    else {
                        object.vmpData = [];
                        if (options.bytes !== Array)
                            object.vmpData = $util.newBuffer(object.vmpData);
                    }
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.license_protocol.ClientIdentification.TokenType[message.type] === undefined ? message.type : $root.license_protocol.ClientIdentification.TokenType[message.type] : message.type;
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = options.bytes === String ? $util.base64.encode(message.token, 0, message.token.length) : options.bytes === Array ? Array.prototype.slice.call(message.token) : message.token;
                if (message.clientInfo && message.clientInfo.length) {
                    object.clientInfo = [];
                    for (var j = 0; j < message.clientInfo.length; ++j)
                        object.clientInfo[j] = $root.license_protocol.ClientIdentification.NameValue.toObject(message.clientInfo[j], options);
                }
                if (message.providerClientToken != null && message.hasOwnProperty("providerClientToken"))
                    object.providerClientToken = options.bytes === String ? $util.base64.encode(message.providerClientToken, 0, message.providerClientToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.providerClientToken) : message.providerClientToken;
                if (message.licenseCounter != null && message.hasOwnProperty("licenseCounter"))
                    object.licenseCounter = message.licenseCounter;
                if (message.clientCapabilities != null && message.hasOwnProperty("clientCapabilities"))
                    object.clientCapabilities = $root.license_protocol.ClientIdentification.ClientCapabilities.toObject(message.clientCapabilities, options);
                if (message.vmpData != null && message.hasOwnProperty("vmpData"))
                    object.vmpData = options.bytes === String ? $util.base64.encode(message.vmpData, 0, message.vmpData.length) : options.bytes === Array ? Array.prototype.slice.call(message.vmpData) : message.vmpData;
                if (message.deviceCredentials && message.deviceCredentials.length) {
                    object.deviceCredentials = [];
                    for (var j = 0; j < message.deviceCredentials.length; ++j)
                        object.deviceCredentials[j] = $root.license_protocol.ClientIdentification.ClientCredentials.toObject(message.deviceCredentials[j], options);
                }
                return object;
            };
    
            /**
             * Converts this ClientIdentification to JSON.
             * @function toJSON
             * @memberof license_protocol.ClientIdentification
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClientIdentification.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ClientIdentification
             * @function getTypeUrl
             * @memberof license_protocol.ClientIdentification
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ClientIdentification.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/license_protocol.ClientIdentification";
            };
    
            /**
             * TokenType enum.
             * @name license_protocol.ClientIdentification.TokenType
             * @enum {number}
             * @property {number} KEYBOX=0 KEYBOX value
             * @property {number} DRM_DEVICE_CERTIFICATE=1 DRM_DEVICE_CERTIFICATE value
             * @property {number} REMOTE_ATTESTATION_CERTIFICATE=2 REMOTE_ATTESTATION_CERTIFICATE value
             * @property {number} OEM_DEVICE_CERTIFICATE=3 OEM_DEVICE_CERTIFICATE value
             */
            ClientIdentification.TokenType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "KEYBOX"] = 0;
                values[valuesById[1] = "DRM_DEVICE_CERTIFICATE"] = 1;
                values[valuesById[2] = "REMOTE_ATTESTATION_CERTIFICATE"] = 2;
                values[valuesById[3] = "OEM_DEVICE_CERTIFICATE"] = 3;
                return values;
            })();
    
            ClientIdentification.NameValue = (function() {
    
                /**
                 * Properties of a NameValue.
                 * @memberof license_protocol.ClientIdentification
                 * @interface INameValue
                 * @property {string|null} [name] NameValue name
                 * @property {string|null} [value] NameValue value
                 */
    
                /**
                 * Constructs a new NameValue.
                 * @memberof license_protocol.ClientIdentification
                 * @classdesc Represents a NameValue.
                 * @implements INameValue
                 * @constructor
                 * @param {license_protocol.ClientIdentification.INameValue=} [properties] Properties to set
                 */
                function NameValue(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * NameValue name.
                 * @member {string} name
                 * @memberof license_protocol.ClientIdentification.NameValue
                 * @instance
                 */
                NameValue.prototype.name = "";
    
                /**
                 * NameValue value.
                 * @member {string} value
                 * @memberof license_protocol.ClientIdentification.NameValue
                 * @instance
                 */
                NameValue.prototype.value = "";
    
                /**
                 * Creates a new NameValue instance using the specified properties.
                 * @function create
                 * @memberof license_protocol.ClientIdentification.NameValue
                 * @static
                 * @param {license_protocol.ClientIdentification.INameValue=} [properties] Properties to set
                 * @returns {license_protocol.ClientIdentification.NameValue} NameValue instance
                 */
                NameValue.create = function create(properties) {
                    return new NameValue(properties);
                };
    
                /**
                 * Encodes the specified NameValue message. Does not implicitly {@link license_protocol.ClientIdentification.NameValue.verify|verify} messages.
                 * @function encode
                 * @memberof license_protocol.ClientIdentification.NameValue
                 * @static
                 * @param {license_protocol.ClientIdentification.INameValue} message NameValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NameValue.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified NameValue message, length delimited. Does not implicitly {@link license_protocol.ClientIdentification.NameValue.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof license_protocol.ClientIdentification.NameValue
                 * @static
                 * @param {license_protocol.ClientIdentification.INameValue} message NameValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NameValue.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a NameValue message from the specified reader or buffer.
                 * @function decode
                 * @memberof license_protocol.ClientIdentification.NameValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {license_protocol.ClientIdentification.NameValue} NameValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NameValue.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.ClientIdentification.NameValue();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.name = reader.string();
                                break;
                            }
                        case 2: {
                                message.value = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a NameValue message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof license_protocol.ClientIdentification.NameValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {license_protocol.ClientIdentification.NameValue} NameValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NameValue.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a NameValue message.
                 * @function verify
                 * @memberof license_protocol.ClientIdentification.NameValue
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                NameValue.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!$util.isString(message.value))
                            return "value: string expected";
                    return null;
                };
    
                /**
                 * Creates a NameValue message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof license_protocol.ClientIdentification.NameValue
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {license_protocol.ClientIdentification.NameValue} NameValue
                 */
                NameValue.fromObject = function fromObject(object) {
                    if (object instanceof $root.license_protocol.ClientIdentification.NameValue)
                        return object;
                    var message = new $root.license_protocol.ClientIdentification.NameValue();
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.value != null)
                        message.value = String(object.value);
                    return message;
                };
    
                /**
                 * Creates a plain object from a NameValue message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof license_protocol.ClientIdentification.NameValue
                 * @static
                 * @param {license_protocol.ClientIdentification.NameValue} message NameValue
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                NameValue.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.name = "";
                        object.value = "";
                    }
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = message.value;
                    return object;
                };
    
                /**
                 * Converts this NameValue to JSON.
                 * @function toJSON
                 * @memberof license_protocol.ClientIdentification.NameValue
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                NameValue.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * Gets the default type url for NameValue
                 * @function getTypeUrl
                 * @memberof license_protocol.ClientIdentification.NameValue
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                NameValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/license_protocol.ClientIdentification.NameValue";
                };
    
                return NameValue;
            })();
    
            ClientIdentification.ClientCapabilities = (function() {
    
                /**
                 * Properties of a ClientCapabilities.
                 * @memberof license_protocol.ClientIdentification
                 * @interface IClientCapabilities
                 * @property {boolean|null} [clientToken] ClientCapabilities clientToken
                 * @property {boolean|null} [sessionToken] ClientCapabilities sessionToken
                 * @property {boolean|null} [videoResolutionConstraints] ClientCapabilities videoResolutionConstraints
                 * @property {license_protocol.ClientIdentification.ClientCapabilities.HdcpVersion|null} [maxHdcpVersion] ClientCapabilities maxHdcpVersion
                 * @property {number|null} [oemCryptoApiVersion] ClientCapabilities oemCryptoApiVersion
                 * @property {boolean|null} [antiRollbackUsageTable] ClientCapabilities antiRollbackUsageTable
                 * @property {number|null} [srmVersion] ClientCapabilities srmVersion
                 * @property {boolean|null} [canUpdateSrm] ClientCapabilities canUpdateSrm
                 * @property {Array.<license_protocol.ClientIdentification.ClientCapabilities.CertificateKeyType>|null} [supportedCertificateKeyType] ClientCapabilities supportedCertificateKeyType
                 * @property {license_protocol.ClientIdentification.ClientCapabilities.AnalogOutputCapabilities|null} [analogOutputCapabilities] ClientCapabilities analogOutputCapabilities
                 * @property {boolean|null} [canDisableAnalogOutput] ClientCapabilities canDisableAnalogOutput
                 * @property {number|null} [resourceRatingTier] ClientCapabilities resourceRatingTier
                 */
    
                /**
                 * Constructs a new ClientCapabilities.
                 * @memberof license_protocol.ClientIdentification
                 * @classdesc Represents a ClientCapabilities.
                 * @implements IClientCapabilities
                 * @constructor
                 * @param {license_protocol.ClientIdentification.IClientCapabilities=} [properties] Properties to set
                 */
                function ClientCapabilities(properties) {
                    this.supportedCertificateKeyType = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * ClientCapabilities clientToken.
                 * @member {boolean} clientToken
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @instance
                 */
                ClientCapabilities.prototype.clientToken = false;
    
                /**
                 * ClientCapabilities sessionToken.
                 * @member {boolean} sessionToken
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @instance
                 */
                ClientCapabilities.prototype.sessionToken = false;
    
                /**
                 * ClientCapabilities videoResolutionConstraints.
                 * @member {boolean} videoResolutionConstraints
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @instance
                 */
                ClientCapabilities.prototype.videoResolutionConstraints = false;
    
                /**
                 * ClientCapabilities maxHdcpVersion.
                 * @member {license_protocol.ClientIdentification.ClientCapabilities.HdcpVersion} maxHdcpVersion
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @instance
                 */
                ClientCapabilities.prototype.maxHdcpVersion = 0;
    
                /**
                 * ClientCapabilities oemCryptoApiVersion.
                 * @member {number} oemCryptoApiVersion
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @instance
                 */
                ClientCapabilities.prototype.oemCryptoApiVersion = 0;
    
                /**
                 * ClientCapabilities antiRollbackUsageTable.
                 * @member {boolean} antiRollbackUsageTable
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @instance
                 */
                ClientCapabilities.prototype.antiRollbackUsageTable = false;
    
                /**
                 * ClientCapabilities srmVersion.
                 * @member {number} srmVersion
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @instance
                 */
                ClientCapabilities.prototype.srmVersion = 0;
    
                /**
                 * ClientCapabilities canUpdateSrm.
                 * @member {boolean} canUpdateSrm
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @instance
                 */
                ClientCapabilities.prototype.canUpdateSrm = false;
    
                /**
                 * ClientCapabilities supportedCertificateKeyType.
                 * @member {Array.<license_protocol.ClientIdentification.ClientCapabilities.CertificateKeyType>} supportedCertificateKeyType
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @instance
                 */
                ClientCapabilities.prototype.supportedCertificateKeyType = $util.emptyArray;
    
                /**
                 * ClientCapabilities analogOutputCapabilities.
                 * @member {license_protocol.ClientIdentification.ClientCapabilities.AnalogOutputCapabilities} analogOutputCapabilities
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @instance
                 */
                ClientCapabilities.prototype.analogOutputCapabilities = 0;
    
                /**
                 * ClientCapabilities canDisableAnalogOutput.
                 * @member {boolean} canDisableAnalogOutput
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @instance
                 */
                ClientCapabilities.prototype.canDisableAnalogOutput = false;
    
                /**
                 * ClientCapabilities resourceRatingTier.
                 * @member {number} resourceRatingTier
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @instance
                 */
                ClientCapabilities.prototype.resourceRatingTier = 0;
    
                /**
                 * Creates a new ClientCapabilities instance using the specified properties.
                 * @function create
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @static
                 * @param {license_protocol.ClientIdentification.IClientCapabilities=} [properties] Properties to set
                 * @returns {license_protocol.ClientIdentification.ClientCapabilities} ClientCapabilities instance
                 */
                ClientCapabilities.create = function create(properties) {
                    return new ClientCapabilities(properties);
                };
    
                /**
                 * Encodes the specified ClientCapabilities message. Does not implicitly {@link license_protocol.ClientIdentification.ClientCapabilities.verify|verify} messages.
                 * @function encode
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @static
                 * @param {license_protocol.ClientIdentification.IClientCapabilities} message ClientCapabilities message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientCapabilities.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.clientToken != null && Object.hasOwnProperty.call(message, "clientToken"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.clientToken);
                    if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                        writer.uint32(/* id 2, wireType 0 =*/16).bool(message.sessionToken);
                    if (message.videoResolutionConstraints != null && Object.hasOwnProperty.call(message, "videoResolutionConstraints"))
                        writer.uint32(/* id 3, wireType 0 =*/24).bool(message.videoResolutionConstraints);
                    if (message.maxHdcpVersion != null && Object.hasOwnProperty.call(message, "maxHdcpVersion"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.maxHdcpVersion);
                    if (message.oemCryptoApiVersion != null && Object.hasOwnProperty.call(message, "oemCryptoApiVersion"))
                        writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.oemCryptoApiVersion);
                    if (message.antiRollbackUsageTable != null && Object.hasOwnProperty.call(message, "antiRollbackUsageTable"))
                        writer.uint32(/* id 6, wireType 0 =*/48).bool(message.antiRollbackUsageTable);
                    if (message.srmVersion != null && Object.hasOwnProperty.call(message, "srmVersion"))
                        writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.srmVersion);
                    if (message.canUpdateSrm != null && Object.hasOwnProperty.call(message, "canUpdateSrm"))
                        writer.uint32(/* id 8, wireType 0 =*/64).bool(message.canUpdateSrm);
                    if (message.supportedCertificateKeyType != null && message.supportedCertificateKeyType.length)
                        for (var i = 0; i < message.supportedCertificateKeyType.length; ++i)
                            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.supportedCertificateKeyType[i]);
                    if (message.analogOutputCapabilities != null && Object.hasOwnProperty.call(message, "analogOutputCapabilities"))
                        writer.uint32(/* id 10, wireType 0 =*/80).int32(message.analogOutputCapabilities);
                    if (message.canDisableAnalogOutput != null && Object.hasOwnProperty.call(message, "canDisableAnalogOutput"))
                        writer.uint32(/* id 11, wireType 0 =*/88).bool(message.canDisableAnalogOutput);
                    if (message.resourceRatingTier != null && Object.hasOwnProperty.call(message, "resourceRatingTier"))
                        writer.uint32(/* id 12, wireType 0 =*/96).uint32(message.resourceRatingTier);
                    return writer;
                };
    
                /**
                 * Encodes the specified ClientCapabilities message, length delimited. Does not implicitly {@link license_protocol.ClientIdentification.ClientCapabilities.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @static
                 * @param {license_protocol.ClientIdentification.IClientCapabilities} message ClientCapabilities message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientCapabilities.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a ClientCapabilities message from the specified reader or buffer.
                 * @function decode
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {license_protocol.ClientIdentification.ClientCapabilities} ClientCapabilities
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientCapabilities.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.ClientIdentification.ClientCapabilities();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.clientToken = reader.bool();
                                break;
                            }
                        case 2: {
                                message.sessionToken = reader.bool();
                                break;
                            }
                        case 3: {
                                message.videoResolutionConstraints = reader.bool();
                                break;
                            }
                        case 4: {
                                message.maxHdcpVersion = reader.int32();
                                break;
                            }
                        case 5: {
                                message.oemCryptoApiVersion = reader.uint32();
                                break;
                            }
                        case 6: {
                                message.antiRollbackUsageTable = reader.bool();
                                break;
                            }
                        case 7: {
                                message.srmVersion = reader.uint32();
                                break;
                            }
                        case 8: {
                                message.canUpdateSrm = reader.bool();
                                break;
                            }
                        case 9: {
                                if (!(message.supportedCertificateKeyType && message.supportedCertificateKeyType.length))
                                    message.supportedCertificateKeyType = [];
                                if ((tag & 7) === 2) {
                                    var end2 = reader.uint32() + reader.pos;
                                    while (reader.pos < end2)
                                        message.supportedCertificateKeyType.push(reader.int32());
                                } else
                                    message.supportedCertificateKeyType.push(reader.int32());
                                break;
                            }
                        case 10: {
                                message.analogOutputCapabilities = reader.int32();
                                break;
                            }
                        case 11: {
                                message.canDisableAnalogOutput = reader.bool();
                                break;
                            }
                        case 12: {
                                message.resourceRatingTier = reader.uint32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a ClientCapabilities message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {license_protocol.ClientIdentification.ClientCapabilities} ClientCapabilities
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientCapabilities.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a ClientCapabilities message.
                 * @function verify
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ClientCapabilities.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.clientToken != null && message.hasOwnProperty("clientToken"))
                        if (typeof message.clientToken !== "boolean")
                            return "clientToken: boolean expected";
                    if (message.sessionToken != null && message.hasOwnProperty("sessionToken"))
                        if (typeof message.sessionToken !== "boolean")
                            return "sessionToken: boolean expected";
                    if (message.videoResolutionConstraints != null && message.hasOwnProperty("videoResolutionConstraints"))
                        if (typeof message.videoResolutionConstraints !== "boolean")
                            return "videoResolutionConstraints: boolean expected";
                    if (message.maxHdcpVersion != null && message.hasOwnProperty("maxHdcpVersion"))
                        switch (message.maxHdcpVersion) {
                        default:
                            return "maxHdcpVersion: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 255:
                            break;
                        }
                    if (message.oemCryptoApiVersion != null && message.hasOwnProperty("oemCryptoApiVersion"))
                        if (!$util.isInteger(message.oemCryptoApiVersion))
                            return "oemCryptoApiVersion: integer expected";
                    if (message.antiRollbackUsageTable != null && message.hasOwnProperty("antiRollbackUsageTable"))
                        if (typeof message.antiRollbackUsageTable !== "boolean")
                            return "antiRollbackUsageTable: boolean expected";
                    if (message.srmVersion != null && message.hasOwnProperty("srmVersion"))
                        if (!$util.isInteger(message.srmVersion))
                            return "srmVersion: integer expected";
                    if (message.canUpdateSrm != null && message.hasOwnProperty("canUpdateSrm"))
                        if (typeof message.canUpdateSrm !== "boolean")
                            return "canUpdateSrm: boolean expected";
                    if (message.supportedCertificateKeyType != null && message.hasOwnProperty("supportedCertificateKeyType")) {
                        if (!Array.isArray(message.supportedCertificateKeyType))
                            return "supportedCertificateKeyType: array expected";
                        for (var i = 0; i < message.supportedCertificateKeyType.length; ++i)
                            switch (message.supportedCertificateKeyType[i]) {
                            default:
                                return "supportedCertificateKeyType: enum value[] expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                                break;
                            }
                    }
                    if (message.analogOutputCapabilities != null && message.hasOwnProperty("analogOutputCapabilities"))
                        switch (message.analogOutputCapabilities) {
                        default:
                            return "analogOutputCapabilities: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                        }
                    if (message.canDisableAnalogOutput != null && message.hasOwnProperty("canDisableAnalogOutput"))
                        if (typeof message.canDisableAnalogOutput !== "boolean")
                            return "canDisableAnalogOutput: boolean expected";
                    if (message.resourceRatingTier != null && message.hasOwnProperty("resourceRatingTier"))
                        if (!$util.isInteger(message.resourceRatingTier))
                            return "resourceRatingTier: integer expected";
                    return null;
                };
    
                /**
                 * Creates a ClientCapabilities message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {license_protocol.ClientIdentification.ClientCapabilities} ClientCapabilities
                 */
                ClientCapabilities.fromObject = function fromObject(object) {
                    if (object instanceof $root.license_protocol.ClientIdentification.ClientCapabilities)
                        return object;
                    var message = new $root.license_protocol.ClientIdentification.ClientCapabilities();
                    if (object.clientToken != null)
                        message.clientToken = Boolean(object.clientToken);
                    if (object.sessionToken != null)
                        message.sessionToken = Boolean(object.sessionToken);
                    if (object.videoResolutionConstraints != null)
                        message.videoResolutionConstraints = Boolean(object.videoResolutionConstraints);
                    switch (object.maxHdcpVersion) {
                    default:
                        if (typeof object.maxHdcpVersion === "number") {
                            message.maxHdcpVersion = object.maxHdcpVersion;
                            break;
                        }
                        break;
                    case "HDCP_NONE":
                    case 0:
                        message.maxHdcpVersion = 0;
                        break;
                    case "HDCP_V1":
                    case 1:
                        message.maxHdcpVersion = 1;
                        break;
                    case "HDCP_V2":
                    case 2:
                        message.maxHdcpVersion = 2;
                        break;
                    case "HDCP_V2_1":
                    case 3:
                        message.maxHdcpVersion = 3;
                        break;
                    case "HDCP_V2_2":
                    case 4:
                        message.maxHdcpVersion = 4;
                        break;
                    case "HDCP_V2_3":
                    case 5:
                        message.maxHdcpVersion = 5;
                        break;
                    case "HDCP_NO_DIGITAL_OUTPUT":
                    case 255:
                        message.maxHdcpVersion = 255;
                        break;
                    }
                    if (object.oemCryptoApiVersion != null)
                        message.oemCryptoApiVersion = object.oemCryptoApiVersion >>> 0;
                    if (object.antiRollbackUsageTable != null)
                        message.antiRollbackUsageTable = Boolean(object.antiRollbackUsageTable);
                    if (object.srmVersion != null)
                        message.srmVersion = object.srmVersion >>> 0;
                    if (object.canUpdateSrm != null)
                        message.canUpdateSrm = Boolean(object.canUpdateSrm);
                    if (object.supportedCertificateKeyType) {
                        if (!Array.isArray(object.supportedCertificateKeyType))
                            throw TypeError(".license_protocol.ClientIdentification.ClientCapabilities.supportedCertificateKeyType: array expected");
                        message.supportedCertificateKeyType = [];
                        for (var i = 0; i < object.supportedCertificateKeyType.length; ++i)
                            switch (object.supportedCertificateKeyType[i]) {
                            default:
                                if (typeof object.supportedCertificateKeyType[i] === "number") {
                                    message.supportedCertificateKeyType[i] = object.supportedCertificateKeyType[i];
                                    break;
                                }
                            case "RSA_2048":
                            case 0:
                                message.supportedCertificateKeyType[i] = 0;
                                break;
                            case "RSA_3072":
                            case 1:
                                message.supportedCertificateKeyType[i] = 1;
                                break;
                            case "ECC_SECP256R1":
                            case 2:
                                message.supportedCertificateKeyType[i] = 2;
                                break;
                            case "ECC_SECP384R1":
                            case 3:
                                message.supportedCertificateKeyType[i] = 3;
                                break;
                            case "ECC_SECP521R1":
                            case 4:
                                message.supportedCertificateKeyType[i] = 4;
                                break;
                            }
                    }
                    switch (object.analogOutputCapabilities) {
                    default:
                        if (typeof object.analogOutputCapabilities === "number") {
                            message.analogOutputCapabilities = object.analogOutputCapabilities;
                            break;
                        }
                        break;
                    case "ANALOG_OUTPUT_UNKNOWN":
                    case 0:
                        message.analogOutputCapabilities = 0;
                        break;
                    case "ANALOG_OUTPUT_NONE":
                    case 1:
                        message.analogOutputCapabilities = 1;
                        break;
                    case "ANALOG_OUTPUT_SUPPORTED":
                    case 2:
                        message.analogOutputCapabilities = 2;
                        break;
                    case "ANALOG_OUTPUT_SUPPORTS_CGMS_A":
                    case 3:
                        message.analogOutputCapabilities = 3;
                        break;
                    }
                    if (object.canDisableAnalogOutput != null)
                        message.canDisableAnalogOutput = Boolean(object.canDisableAnalogOutput);
                    if (object.resourceRatingTier != null)
                        message.resourceRatingTier = object.resourceRatingTier >>> 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from a ClientCapabilities message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @static
                 * @param {license_protocol.ClientIdentification.ClientCapabilities} message ClientCapabilities
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ClientCapabilities.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.supportedCertificateKeyType = [];
                    if (options.defaults) {
                        object.clientToken = false;
                        object.sessionToken = false;
                        object.videoResolutionConstraints = false;
                        object.maxHdcpVersion = options.enums === String ? "HDCP_NONE" : 0;
                        object.oemCryptoApiVersion = 0;
                        object.antiRollbackUsageTable = false;
                        object.srmVersion = 0;
                        object.canUpdateSrm = false;
                        object.analogOutputCapabilities = options.enums === String ? "ANALOG_OUTPUT_UNKNOWN" : 0;
                        object.canDisableAnalogOutput = false;
                        object.resourceRatingTier = 0;
                    }
                    if (message.clientToken != null && message.hasOwnProperty("clientToken"))
                        object.clientToken = message.clientToken;
                    if (message.sessionToken != null && message.hasOwnProperty("sessionToken"))
                        object.sessionToken = message.sessionToken;
                    if (message.videoResolutionConstraints != null && message.hasOwnProperty("videoResolutionConstraints"))
                        object.videoResolutionConstraints = message.videoResolutionConstraints;
                    if (message.maxHdcpVersion != null && message.hasOwnProperty("maxHdcpVersion"))
                        object.maxHdcpVersion = options.enums === String ? $root.license_protocol.ClientIdentification.ClientCapabilities.HdcpVersion[message.maxHdcpVersion] === undefined ? message.maxHdcpVersion : $root.license_protocol.ClientIdentification.ClientCapabilities.HdcpVersion[message.maxHdcpVersion] : message.maxHdcpVersion;
                    if (message.oemCryptoApiVersion != null && message.hasOwnProperty("oemCryptoApiVersion"))
                        object.oemCryptoApiVersion = message.oemCryptoApiVersion;
                    if (message.antiRollbackUsageTable != null && message.hasOwnProperty("antiRollbackUsageTable"))
                        object.antiRollbackUsageTable = message.antiRollbackUsageTable;
                    if (message.srmVersion != null && message.hasOwnProperty("srmVersion"))
                        object.srmVersion = message.srmVersion;
                    if (message.canUpdateSrm != null && message.hasOwnProperty("canUpdateSrm"))
                        object.canUpdateSrm = message.canUpdateSrm;
                    if (message.supportedCertificateKeyType && message.supportedCertificateKeyType.length) {
                        object.supportedCertificateKeyType = [];
                        for (var j = 0; j < message.supportedCertificateKeyType.length; ++j)
                            object.supportedCertificateKeyType[j] = options.enums === String ? $root.license_protocol.ClientIdentification.ClientCapabilities.CertificateKeyType[message.supportedCertificateKeyType[j]] === undefined ? message.supportedCertificateKeyType[j] : $root.license_protocol.ClientIdentification.ClientCapabilities.CertificateKeyType[message.supportedCertificateKeyType[j]] : message.supportedCertificateKeyType[j];
                    }
                    if (message.analogOutputCapabilities != null && message.hasOwnProperty("analogOutputCapabilities"))
                        object.analogOutputCapabilities = options.enums === String ? $root.license_protocol.ClientIdentification.ClientCapabilities.AnalogOutputCapabilities[message.analogOutputCapabilities] === undefined ? message.analogOutputCapabilities : $root.license_protocol.ClientIdentification.ClientCapabilities.AnalogOutputCapabilities[message.analogOutputCapabilities] : message.analogOutputCapabilities;
                    if (message.canDisableAnalogOutput != null && message.hasOwnProperty("canDisableAnalogOutput"))
                        object.canDisableAnalogOutput = message.canDisableAnalogOutput;
                    if (message.resourceRatingTier != null && message.hasOwnProperty("resourceRatingTier"))
                        object.resourceRatingTier = message.resourceRatingTier;
                    return object;
                };
    
                /**
                 * Converts this ClientCapabilities to JSON.
                 * @function toJSON
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ClientCapabilities.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * Gets the default type url for ClientCapabilities
                 * @function getTypeUrl
                 * @memberof license_protocol.ClientIdentification.ClientCapabilities
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ClientCapabilities.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/license_protocol.ClientIdentification.ClientCapabilities";
                };
    
                /**
                 * HdcpVersion enum.
                 * @name license_protocol.ClientIdentification.ClientCapabilities.HdcpVersion
                 * @enum {number}
                 * @property {number} HDCP_NONE=0 HDCP_NONE value
                 * @property {number} HDCP_V1=1 HDCP_V1 value
                 * @property {number} HDCP_V2=2 HDCP_V2 value
                 * @property {number} HDCP_V2_1=3 HDCP_V2_1 value
                 * @property {number} HDCP_V2_2=4 HDCP_V2_2 value
                 * @property {number} HDCP_V2_3=5 HDCP_V2_3 value
                 * @property {number} HDCP_NO_DIGITAL_OUTPUT=255 HDCP_NO_DIGITAL_OUTPUT value
                 */
                ClientCapabilities.HdcpVersion = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "HDCP_NONE"] = 0;
                    values[valuesById[1] = "HDCP_V1"] = 1;
                    values[valuesById[2] = "HDCP_V2"] = 2;
                    values[valuesById[3] = "HDCP_V2_1"] = 3;
                    values[valuesById[4] = "HDCP_V2_2"] = 4;
                    values[valuesById[5] = "HDCP_V2_3"] = 5;
                    values[valuesById[255] = "HDCP_NO_DIGITAL_OUTPUT"] = 255;
                    return values;
                })();
    
                /**
                 * CertificateKeyType enum.
                 * @name license_protocol.ClientIdentification.ClientCapabilities.CertificateKeyType
                 * @enum {number}
                 * @property {number} RSA_2048=0 RSA_2048 value
                 * @property {number} RSA_3072=1 RSA_3072 value
                 * @property {number} ECC_SECP256R1=2 ECC_SECP256R1 value
                 * @property {number} ECC_SECP384R1=3 ECC_SECP384R1 value
                 * @property {number} ECC_SECP521R1=4 ECC_SECP521R1 value
                 */
                ClientCapabilities.CertificateKeyType = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "RSA_2048"] = 0;
                    values[valuesById[1] = "RSA_3072"] = 1;
                    values[valuesById[2] = "ECC_SECP256R1"] = 2;
                    values[valuesById[3] = "ECC_SECP384R1"] = 3;
                    values[valuesById[4] = "ECC_SECP521R1"] = 4;
                    return values;
                })();
    
                /**
                 * AnalogOutputCapabilities enum.
                 * @name license_protocol.ClientIdentification.ClientCapabilities.AnalogOutputCapabilities
                 * @enum {number}
                 * @property {number} ANALOG_OUTPUT_UNKNOWN=0 ANALOG_OUTPUT_UNKNOWN value
                 * @property {number} ANALOG_OUTPUT_NONE=1 ANALOG_OUTPUT_NONE value
                 * @property {number} ANALOG_OUTPUT_SUPPORTED=2 ANALOG_OUTPUT_SUPPORTED value
                 * @property {number} ANALOG_OUTPUT_SUPPORTS_CGMS_A=3 ANALOG_OUTPUT_SUPPORTS_CGMS_A value
                 */
                ClientCapabilities.AnalogOutputCapabilities = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "ANALOG_OUTPUT_UNKNOWN"] = 0;
                    values[valuesById[1] = "ANALOG_OUTPUT_NONE"] = 1;
                    values[valuesById[2] = "ANALOG_OUTPUT_SUPPORTED"] = 2;
                    values[valuesById[3] = "ANALOG_OUTPUT_SUPPORTS_CGMS_A"] = 3;
                    return values;
                })();
    
                return ClientCapabilities;
            })();
    
            ClientIdentification.ClientCredentials = (function() {
    
                /**
                 * Properties of a ClientCredentials.
                 * @memberof license_protocol.ClientIdentification
                 * @interface IClientCredentials
                 * @property {license_protocol.ClientIdentification.TokenType|null} [type] ClientCredentials type
                 * @property {Uint8Array|null} [token] ClientCredentials token
                 */
    
                /**
                 * Constructs a new ClientCredentials.
                 * @memberof license_protocol.ClientIdentification
                 * @classdesc Represents a ClientCredentials.
                 * @implements IClientCredentials
                 * @constructor
                 * @param {license_protocol.ClientIdentification.IClientCredentials=} [properties] Properties to set
                 */
                function ClientCredentials(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * ClientCredentials type.
                 * @member {license_protocol.ClientIdentification.TokenType} type
                 * @memberof license_protocol.ClientIdentification.ClientCredentials
                 * @instance
                 */
                ClientCredentials.prototype.type = 0;
    
                /**
                 * ClientCredentials token.
                 * @member {Uint8Array} token
                 * @memberof license_protocol.ClientIdentification.ClientCredentials
                 * @instance
                 */
                ClientCredentials.prototype.token = $util.newBuffer([]);
    
                /**
                 * Creates a new ClientCredentials instance using the specified properties.
                 * @function create
                 * @memberof license_protocol.ClientIdentification.ClientCredentials
                 * @static
                 * @param {license_protocol.ClientIdentification.IClientCredentials=} [properties] Properties to set
                 * @returns {license_protocol.ClientIdentification.ClientCredentials} ClientCredentials instance
                 */
                ClientCredentials.create = function create(properties) {
                    return new ClientCredentials(properties);
                };
    
                /**
                 * Encodes the specified ClientCredentials message. Does not implicitly {@link license_protocol.ClientIdentification.ClientCredentials.verify|verify} messages.
                 * @function encode
                 * @memberof license_protocol.ClientIdentification.ClientCredentials
                 * @static
                 * @param {license_protocol.ClientIdentification.IClientCredentials} message ClientCredentials message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientCredentials.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                    if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.token);
                    return writer;
                };
    
                /**
                 * Encodes the specified ClientCredentials message, length delimited. Does not implicitly {@link license_protocol.ClientIdentification.ClientCredentials.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof license_protocol.ClientIdentification.ClientCredentials
                 * @static
                 * @param {license_protocol.ClientIdentification.IClientCredentials} message ClientCredentials message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientCredentials.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a ClientCredentials message from the specified reader or buffer.
                 * @function decode
                 * @memberof license_protocol.ClientIdentification.ClientCredentials
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {license_protocol.ClientIdentification.ClientCredentials} ClientCredentials
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientCredentials.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.ClientIdentification.ClientCredentials();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.type = reader.int32();
                                break;
                            }
                        case 2: {
                                message.token = reader.bytes();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a ClientCredentials message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof license_protocol.ClientIdentification.ClientCredentials
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {license_protocol.ClientIdentification.ClientCredentials} ClientCredentials
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientCredentials.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a ClientCredentials message.
                 * @function verify
                 * @memberof license_protocol.ClientIdentification.ClientCredentials
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ClientCredentials.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                        }
                    if (message.token != null && message.hasOwnProperty("token"))
                        if (!(message.token && typeof message.token.length === "number" || $util.isString(message.token)))
                            return "token: buffer expected";
                    return null;
                };
    
                /**
                 * Creates a ClientCredentials message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof license_protocol.ClientIdentification.ClientCredentials
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {license_protocol.ClientIdentification.ClientCredentials} ClientCredentials
                 */
                ClientCredentials.fromObject = function fromObject(object) {
                    if (object instanceof $root.license_protocol.ClientIdentification.ClientCredentials)
                        return object;
                    var message = new $root.license_protocol.ClientIdentification.ClientCredentials();
                    switch (object.type) {
                    default:
                        if (typeof object.type === "number") {
                            message.type = object.type;
                            break;
                        }
                        break;
                    case "KEYBOX":
                    case 0:
                        message.type = 0;
                        break;
                    case "DRM_DEVICE_CERTIFICATE":
                    case 1:
                        message.type = 1;
                        break;
                    case "REMOTE_ATTESTATION_CERTIFICATE":
                    case 2:
                        message.type = 2;
                        break;
                    case "OEM_DEVICE_CERTIFICATE":
                    case 3:
                        message.type = 3;
                        break;
                    }
                    if (object.token != null)
                        if (typeof object.token === "string")
                            $util.base64.decode(object.token, message.token = $util.newBuffer($util.base64.length(object.token)), 0);
                        else if (object.token.length >= 0)
                            message.token = object.token;
                    return message;
                };
    
                /**
                 * Creates a plain object from a ClientCredentials message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof license_protocol.ClientIdentification.ClientCredentials
                 * @static
                 * @param {license_protocol.ClientIdentification.ClientCredentials} message ClientCredentials
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ClientCredentials.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.type = options.enums === String ? "KEYBOX" : 0;
                        if (options.bytes === String)
                            object.token = "";
                        else {
                            object.token = [];
                            if (options.bytes !== Array)
                                object.token = $util.newBuffer(object.token);
                        }
                    }
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.license_protocol.ClientIdentification.TokenType[message.type] === undefined ? message.type : $root.license_protocol.ClientIdentification.TokenType[message.type] : message.type;
                    if (message.token != null && message.hasOwnProperty("token"))
                        object.token = options.bytes === String ? $util.base64.encode(message.token, 0, message.token.length) : options.bytes === Array ? Array.prototype.slice.call(message.token) : message.token;
                    return object;
                };
    
                /**
                 * Converts this ClientCredentials to JSON.
                 * @function toJSON
                 * @memberof license_protocol.ClientIdentification.ClientCredentials
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ClientCredentials.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * Gets the default type url for ClientCredentials
                 * @function getTypeUrl
                 * @memberof license_protocol.ClientIdentification.ClientCredentials
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ClientCredentials.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/license_protocol.ClientIdentification.ClientCredentials";
                };
    
                return ClientCredentials;
            })();
    
            return ClientIdentification;
        })();
    
        license_protocol.EncryptedClientIdentification = (function() {
    
            /**
             * Properties of an EncryptedClientIdentification.
             * @memberof license_protocol
             * @interface IEncryptedClientIdentification
             * @property {string|null} [providerId] EncryptedClientIdentification providerId
             * @property {Uint8Array|null} [serviceCertificateSerialNumber] EncryptedClientIdentification serviceCertificateSerialNumber
             * @property {Uint8Array|null} [encryptedClientId] EncryptedClientIdentification encryptedClientId
             * @property {Uint8Array|null} [encryptedClientIdIv] EncryptedClientIdentification encryptedClientIdIv
             * @property {Uint8Array|null} [encryptedPrivacyKey] EncryptedClientIdentification encryptedPrivacyKey
             */
    
            /**
             * Constructs a new EncryptedClientIdentification.
             * @memberof license_protocol
             * @classdesc Represents an EncryptedClientIdentification.
             * @implements IEncryptedClientIdentification
             * @constructor
             * @param {license_protocol.IEncryptedClientIdentification=} [properties] Properties to set
             */
            function EncryptedClientIdentification(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * EncryptedClientIdentification providerId.
             * @member {string} providerId
             * @memberof license_protocol.EncryptedClientIdentification
             * @instance
             */
            EncryptedClientIdentification.prototype.providerId = "";
    
            /**
             * EncryptedClientIdentification serviceCertificateSerialNumber.
             * @member {Uint8Array} serviceCertificateSerialNumber
             * @memberof license_protocol.EncryptedClientIdentification
             * @instance
             */
            EncryptedClientIdentification.prototype.serviceCertificateSerialNumber = $util.newBuffer([]);
    
            /**
             * EncryptedClientIdentification encryptedClientId.
             * @member {Uint8Array} encryptedClientId
             * @memberof license_protocol.EncryptedClientIdentification
             * @instance
             */
            EncryptedClientIdentification.prototype.encryptedClientId = $util.newBuffer([]);
    
            /**
             * EncryptedClientIdentification encryptedClientIdIv.
             * @member {Uint8Array} encryptedClientIdIv
             * @memberof license_protocol.EncryptedClientIdentification
             * @instance
             */
            EncryptedClientIdentification.prototype.encryptedClientIdIv = $util.newBuffer([]);
    
            /**
             * EncryptedClientIdentification encryptedPrivacyKey.
             * @member {Uint8Array} encryptedPrivacyKey
             * @memberof license_protocol.EncryptedClientIdentification
             * @instance
             */
            EncryptedClientIdentification.prototype.encryptedPrivacyKey = $util.newBuffer([]);
    
            /**
             * Creates a new EncryptedClientIdentification instance using the specified properties.
             * @function create
             * @memberof license_protocol.EncryptedClientIdentification
             * @static
             * @param {license_protocol.IEncryptedClientIdentification=} [properties] Properties to set
             * @returns {license_protocol.EncryptedClientIdentification} EncryptedClientIdentification instance
             */
            EncryptedClientIdentification.create = function create(properties) {
                return new EncryptedClientIdentification(properties);
            };
    
            /**
             * Encodes the specified EncryptedClientIdentification message. Does not implicitly {@link license_protocol.EncryptedClientIdentification.verify|verify} messages.
             * @function encode
             * @memberof license_protocol.EncryptedClientIdentification
             * @static
             * @param {license_protocol.IEncryptedClientIdentification} message EncryptedClientIdentification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EncryptedClientIdentification.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.providerId != null && Object.hasOwnProperty.call(message, "providerId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.providerId);
                if (message.serviceCertificateSerialNumber != null && Object.hasOwnProperty.call(message, "serviceCertificateSerialNumber"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.serviceCertificateSerialNumber);
                if (message.encryptedClientId != null && Object.hasOwnProperty.call(message, "encryptedClientId"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.encryptedClientId);
                if (message.encryptedClientIdIv != null && Object.hasOwnProperty.call(message, "encryptedClientIdIv"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.encryptedClientIdIv);
                if (message.encryptedPrivacyKey != null && Object.hasOwnProperty.call(message, "encryptedPrivacyKey"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.encryptedPrivacyKey);
                return writer;
            };
    
            /**
             * Encodes the specified EncryptedClientIdentification message, length delimited. Does not implicitly {@link license_protocol.EncryptedClientIdentification.verify|verify} messages.
             * @function encodeDelimited
             * @memberof license_protocol.EncryptedClientIdentification
             * @static
             * @param {license_protocol.IEncryptedClientIdentification} message EncryptedClientIdentification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EncryptedClientIdentification.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an EncryptedClientIdentification message from the specified reader or buffer.
             * @function decode
             * @memberof license_protocol.EncryptedClientIdentification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {license_protocol.EncryptedClientIdentification} EncryptedClientIdentification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EncryptedClientIdentification.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.EncryptedClientIdentification();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.providerId = reader.string();
                            break;
                        }
                    case 2: {
                            message.serviceCertificateSerialNumber = reader.bytes();
                            break;
                        }
                    case 3: {
                            message.encryptedClientId = reader.bytes();
                            break;
                        }
                    case 4: {
                            message.encryptedClientIdIv = reader.bytes();
                            break;
                        }
                    case 5: {
                            message.encryptedPrivacyKey = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an EncryptedClientIdentification message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof license_protocol.EncryptedClientIdentification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {license_protocol.EncryptedClientIdentification} EncryptedClientIdentification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EncryptedClientIdentification.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an EncryptedClientIdentification message.
             * @function verify
             * @memberof license_protocol.EncryptedClientIdentification
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            EncryptedClientIdentification.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.providerId != null && message.hasOwnProperty("providerId"))
                    if (!$util.isString(message.providerId))
                        return "providerId: string expected";
                if (message.serviceCertificateSerialNumber != null && message.hasOwnProperty("serviceCertificateSerialNumber"))
                    if (!(message.serviceCertificateSerialNumber && typeof message.serviceCertificateSerialNumber.length === "number" || $util.isString(message.serviceCertificateSerialNumber)))
                        return "serviceCertificateSerialNumber: buffer expected";
                if (message.encryptedClientId != null && message.hasOwnProperty("encryptedClientId"))
                    if (!(message.encryptedClientId && typeof message.encryptedClientId.length === "number" || $util.isString(message.encryptedClientId)))
                        return "encryptedClientId: buffer expected";
                if (message.encryptedClientIdIv != null && message.hasOwnProperty("encryptedClientIdIv"))
                    if (!(message.encryptedClientIdIv && typeof message.encryptedClientIdIv.length === "number" || $util.isString(message.encryptedClientIdIv)))
                        return "encryptedClientIdIv: buffer expected";
                if (message.encryptedPrivacyKey != null && message.hasOwnProperty("encryptedPrivacyKey"))
                    if (!(message.encryptedPrivacyKey && typeof message.encryptedPrivacyKey.length === "number" || $util.isString(message.encryptedPrivacyKey)))
                        return "encryptedPrivacyKey: buffer expected";
                return null;
            };
    
            /**
             * Creates an EncryptedClientIdentification message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof license_protocol.EncryptedClientIdentification
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {license_protocol.EncryptedClientIdentification} EncryptedClientIdentification
             */
            EncryptedClientIdentification.fromObject = function fromObject(object) {
                if (object instanceof $root.license_protocol.EncryptedClientIdentification)
                    return object;
                var message = new $root.license_protocol.EncryptedClientIdentification();
                if (object.providerId != null)
                    message.providerId = String(object.providerId);
                if (object.serviceCertificateSerialNumber != null)
                    if (typeof object.serviceCertificateSerialNumber === "string")
                        $util.base64.decode(object.serviceCertificateSerialNumber, message.serviceCertificateSerialNumber = $util.newBuffer($util.base64.length(object.serviceCertificateSerialNumber)), 0);
                    else if (object.serviceCertificateSerialNumber.length >= 0)
                        message.serviceCertificateSerialNumber = object.serviceCertificateSerialNumber;
                if (object.encryptedClientId != null)
                    if (typeof object.encryptedClientId === "string")
                        $util.base64.decode(object.encryptedClientId, message.encryptedClientId = $util.newBuffer($util.base64.length(object.encryptedClientId)), 0);
                    else if (object.encryptedClientId.length >= 0)
                        message.encryptedClientId = object.encryptedClientId;
                if (object.encryptedClientIdIv != null)
                    if (typeof object.encryptedClientIdIv === "string")
                        $util.base64.decode(object.encryptedClientIdIv, message.encryptedClientIdIv = $util.newBuffer($util.base64.length(object.encryptedClientIdIv)), 0);
                    else if (object.encryptedClientIdIv.length >= 0)
                        message.encryptedClientIdIv = object.encryptedClientIdIv;
                if (object.encryptedPrivacyKey != null)
                    if (typeof object.encryptedPrivacyKey === "string")
                        $util.base64.decode(object.encryptedPrivacyKey, message.encryptedPrivacyKey = $util.newBuffer($util.base64.length(object.encryptedPrivacyKey)), 0);
                    else if (object.encryptedPrivacyKey.length >= 0)
                        message.encryptedPrivacyKey = object.encryptedPrivacyKey;
                return message;
            };
    
            /**
             * Creates a plain object from an EncryptedClientIdentification message. Also converts values to other types if specified.
             * @function toObject
             * @memberof license_protocol.EncryptedClientIdentification
             * @static
             * @param {license_protocol.EncryptedClientIdentification} message EncryptedClientIdentification
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            EncryptedClientIdentification.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.providerId = "";
                    if (options.bytes === String)
                        object.serviceCertificateSerialNumber = "";
                    else {
                        object.serviceCertificateSerialNumber = [];
                        if (options.bytes !== Array)
                            object.serviceCertificateSerialNumber = $util.newBuffer(object.serviceCertificateSerialNumber);
                    }
                    if (options.bytes === String)
                        object.encryptedClientId = "";
                    else {
                        object.encryptedClientId = [];
                        if (options.bytes !== Array)
                            object.encryptedClientId = $util.newBuffer(object.encryptedClientId);
                    }
                    if (options.bytes === String)
                        object.encryptedClientIdIv = "";
                    else {
                        object.encryptedClientIdIv = [];
                        if (options.bytes !== Array)
                            object.encryptedClientIdIv = $util.newBuffer(object.encryptedClientIdIv);
                    }
                    if (options.bytes === String)
                        object.encryptedPrivacyKey = "";
                    else {
                        object.encryptedPrivacyKey = [];
                        if (options.bytes !== Array)
                            object.encryptedPrivacyKey = $util.newBuffer(object.encryptedPrivacyKey);
                    }
                }
                if (message.providerId != null && message.hasOwnProperty("providerId"))
                    object.providerId = message.providerId;
                if (message.serviceCertificateSerialNumber != null && message.hasOwnProperty("serviceCertificateSerialNumber"))
                    object.serviceCertificateSerialNumber = options.bytes === String ? $util.base64.encode(message.serviceCertificateSerialNumber, 0, message.serviceCertificateSerialNumber.length) : options.bytes === Array ? Array.prototype.slice.call(message.serviceCertificateSerialNumber) : message.serviceCertificateSerialNumber;
                if (message.encryptedClientId != null && message.hasOwnProperty("encryptedClientId"))
                    object.encryptedClientId = options.bytes === String ? $util.base64.encode(message.encryptedClientId, 0, message.encryptedClientId.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedClientId) : message.encryptedClientId;
                if (message.encryptedClientIdIv != null && message.hasOwnProperty("encryptedClientIdIv"))
                    object.encryptedClientIdIv = options.bytes === String ? $util.base64.encode(message.encryptedClientIdIv, 0, message.encryptedClientIdIv.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedClientIdIv) : message.encryptedClientIdIv;
                if (message.encryptedPrivacyKey != null && message.hasOwnProperty("encryptedPrivacyKey"))
                    object.encryptedPrivacyKey = options.bytes === String ? $util.base64.encode(message.encryptedPrivacyKey, 0, message.encryptedPrivacyKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedPrivacyKey) : message.encryptedPrivacyKey;
                return object;
            };
    
            /**
             * Converts this EncryptedClientIdentification to JSON.
             * @function toJSON
             * @memberof license_protocol.EncryptedClientIdentification
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EncryptedClientIdentification.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for EncryptedClientIdentification
             * @function getTypeUrl
             * @memberof license_protocol.EncryptedClientIdentification
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            EncryptedClientIdentification.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/license_protocol.EncryptedClientIdentification";
            };
    
            return EncryptedClientIdentification;
        })();
    
        license_protocol.DrmCertificate = (function() {
    
            /**
             * Properties of a DrmCertificate.
             * @memberof license_protocol
             * @interface IDrmCertificate
             * @property {license_protocol.DrmCertificate.Type|null} [type] DrmCertificate type
             * @property {Uint8Array|null} [serialNumber] DrmCertificate serialNumber
             * @property {number|null} [creationTimeSeconds] DrmCertificate creationTimeSeconds
             * @property {number|null} [expirationTimeSeconds] DrmCertificate expirationTimeSeconds
             * @property {Uint8Array|null} [publicKey] DrmCertificate publicKey
             * @property {number|null} [systemId] DrmCertificate systemId
             * @property {boolean|null} [testDeviceDeprecated] DrmCertificate testDeviceDeprecated
             * @property {string|null} [providerId] DrmCertificate providerId
             * @property {Array.<license_protocol.DrmCertificate.ServiceType>|null} [serviceTypes] DrmCertificate serviceTypes
             * @property {license_protocol.DrmCertificate.Algorithm|null} [algorithm] DrmCertificate algorithm
             * @property {Uint8Array|null} [rotId] DrmCertificate rotId
             * @property {license_protocol.DrmCertificate.IEncryptionKey|null} [encryptionKey] DrmCertificate encryptionKey
             */
    
            /**
             * Constructs a new DrmCertificate.
             * @memberof license_protocol
             * @classdesc Represents a DrmCertificate.
             * @implements IDrmCertificate
             * @constructor
             * @param {license_protocol.IDrmCertificate=} [properties] Properties to set
             */
            function DrmCertificate(properties) {
                this.serviceTypes = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * DrmCertificate type.
             * @member {license_protocol.DrmCertificate.Type} type
             * @memberof license_protocol.DrmCertificate
             * @instance
             */
            DrmCertificate.prototype.type = 0;
    
            /**
             * DrmCertificate serialNumber.
             * @member {Uint8Array} serialNumber
             * @memberof license_protocol.DrmCertificate
             * @instance
             */
            DrmCertificate.prototype.serialNumber = $util.newBuffer([]);
    
            /**
             * DrmCertificate creationTimeSeconds.
             * @member {number} creationTimeSeconds
             * @memberof license_protocol.DrmCertificate
             * @instance
             */
            DrmCertificate.prototype.creationTimeSeconds = 0;
    
            /**
             * DrmCertificate expirationTimeSeconds.
             * @member {number} expirationTimeSeconds
             * @memberof license_protocol.DrmCertificate
             * @instance
             */
            DrmCertificate.prototype.expirationTimeSeconds = 0;
    
            /**
             * DrmCertificate publicKey.
             * @member {Uint8Array} publicKey
             * @memberof license_protocol.DrmCertificate
             * @instance
             */
            DrmCertificate.prototype.publicKey = $util.newBuffer([]);
    
            /**
             * DrmCertificate systemId.
             * @member {number} systemId
             * @memberof license_protocol.DrmCertificate
             * @instance
             */
            DrmCertificate.prototype.systemId = 0;
    
            /**
             * DrmCertificate testDeviceDeprecated.
             * @member {boolean} testDeviceDeprecated
             * @memberof license_protocol.DrmCertificate
             * @instance
             */
            DrmCertificate.prototype.testDeviceDeprecated = false;
    
            /**
             * DrmCertificate providerId.
             * @member {string} providerId
             * @memberof license_protocol.DrmCertificate
             * @instance
             */
            DrmCertificate.prototype.providerId = "";
    
            /**
             * DrmCertificate serviceTypes.
             * @member {Array.<license_protocol.DrmCertificate.ServiceType>} serviceTypes
             * @memberof license_protocol.DrmCertificate
             * @instance
             */
            DrmCertificate.prototype.serviceTypes = $util.emptyArray;
    
            /**
             * DrmCertificate algorithm.
             * @member {license_protocol.DrmCertificate.Algorithm} algorithm
             * @memberof license_protocol.DrmCertificate
             * @instance
             */
            DrmCertificate.prototype.algorithm = 1;
    
            /**
             * DrmCertificate rotId.
             * @member {Uint8Array} rotId
             * @memberof license_protocol.DrmCertificate
             * @instance
             */
            DrmCertificate.prototype.rotId = $util.newBuffer([]);
    
            /**
             * DrmCertificate encryptionKey.
             * @member {license_protocol.DrmCertificate.IEncryptionKey|null|undefined} encryptionKey
             * @memberof license_protocol.DrmCertificate
             * @instance
             */
            DrmCertificate.prototype.encryptionKey = null;
    
            /**
             * Creates a new DrmCertificate instance using the specified properties.
             * @function create
             * @memberof license_protocol.DrmCertificate
             * @static
             * @param {license_protocol.IDrmCertificate=} [properties] Properties to set
             * @returns {license_protocol.DrmCertificate} DrmCertificate instance
             */
            DrmCertificate.create = function create(properties) {
                return new DrmCertificate(properties);
            };
    
            /**
             * Encodes the specified DrmCertificate message. Does not implicitly {@link license_protocol.DrmCertificate.verify|verify} messages.
             * @function encode
             * @memberof license_protocol.DrmCertificate
             * @static
             * @param {license_protocol.IDrmCertificate} message DrmCertificate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DrmCertificate.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                if (message.serialNumber != null && Object.hasOwnProperty.call(message, "serialNumber"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.serialNumber);
                if (message.creationTimeSeconds != null && Object.hasOwnProperty.call(message, "creationTimeSeconds"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.creationTimeSeconds);
                if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.publicKey);
                if (message.systemId != null && Object.hasOwnProperty.call(message, "systemId"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.systemId);
                if (message.testDeviceDeprecated != null && Object.hasOwnProperty.call(message, "testDeviceDeprecated"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.testDeviceDeprecated);
                if (message.providerId != null && Object.hasOwnProperty.call(message, "providerId"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.providerId);
                if (message.serviceTypes != null && message.serviceTypes.length)
                    for (var i = 0; i < message.serviceTypes.length; ++i)
                        writer.uint32(/* id 8, wireType 0 =*/64).int32(message.serviceTypes[i]);
                if (message.algorithm != null && Object.hasOwnProperty.call(message, "algorithm"))
                    writer.uint32(/* id 9, wireType 0 =*/72).int32(message.algorithm);
                if (message.rotId != null && Object.hasOwnProperty.call(message, "rotId"))
                    writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.rotId);
                if (message.encryptionKey != null && Object.hasOwnProperty.call(message, "encryptionKey"))
                    $root.license_protocol.DrmCertificate.EncryptionKey.encode(message.encryptionKey, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                if (message.expirationTimeSeconds != null && Object.hasOwnProperty.call(message, "expirationTimeSeconds"))
                    writer.uint32(/* id 12, wireType 0 =*/96).uint32(message.expirationTimeSeconds);
                return writer;
            };
    
            /**
             * Encodes the specified DrmCertificate message, length delimited. Does not implicitly {@link license_protocol.DrmCertificate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof license_protocol.DrmCertificate
             * @static
             * @param {license_protocol.IDrmCertificate} message DrmCertificate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DrmCertificate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a DrmCertificate message from the specified reader or buffer.
             * @function decode
             * @memberof license_protocol.DrmCertificate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {license_protocol.DrmCertificate} DrmCertificate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DrmCertificate.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.DrmCertificate();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.type = reader.int32();
                            break;
                        }
                    case 2: {
                            message.serialNumber = reader.bytes();
                            break;
                        }
                    case 3: {
                            message.creationTimeSeconds = reader.uint32();
                            break;
                        }
                    case 12: {
                            message.expirationTimeSeconds = reader.uint32();
                            break;
                        }
                    case 4: {
                            message.publicKey = reader.bytes();
                            break;
                        }
                    case 5: {
                            message.systemId = reader.uint32();
                            break;
                        }
                    case 6: {
                            message.testDeviceDeprecated = reader.bool();
                            break;
                        }
                    case 7: {
                            message.providerId = reader.string();
                            break;
                        }
                    case 8: {
                            if (!(message.serviceTypes && message.serviceTypes.length))
                                message.serviceTypes = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.serviceTypes.push(reader.int32());
                            } else
                                message.serviceTypes.push(reader.int32());
                            break;
                        }
                    case 9: {
                            message.algorithm = reader.int32();
                            break;
                        }
                    case 10: {
                            message.rotId = reader.bytes();
                            break;
                        }
                    case 11: {
                            message.encryptionKey = $root.license_protocol.DrmCertificate.EncryptionKey.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a DrmCertificate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof license_protocol.DrmCertificate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {license_protocol.DrmCertificate} DrmCertificate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DrmCertificate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a DrmCertificate message.
             * @function verify
             * @memberof license_protocol.DrmCertificate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DrmCertificate.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.serialNumber != null && message.hasOwnProperty("serialNumber"))
                    if (!(message.serialNumber && typeof message.serialNumber.length === "number" || $util.isString(message.serialNumber)))
                        return "serialNumber: buffer expected";
                if (message.creationTimeSeconds != null && message.hasOwnProperty("creationTimeSeconds"))
                    if (!$util.isInteger(message.creationTimeSeconds))
                        return "creationTimeSeconds: integer expected";
                if (message.expirationTimeSeconds != null && message.hasOwnProperty("expirationTimeSeconds"))
                    if (!$util.isInteger(message.expirationTimeSeconds))
                        return "expirationTimeSeconds: integer expected";
                if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                    if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                        return "publicKey: buffer expected";
                if (message.systemId != null && message.hasOwnProperty("systemId"))
                    if (!$util.isInteger(message.systemId))
                        return "systemId: integer expected";
                if (message.testDeviceDeprecated != null && message.hasOwnProperty("testDeviceDeprecated"))
                    if (typeof message.testDeviceDeprecated !== "boolean")
                        return "testDeviceDeprecated: boolean expected";
                if (message.providerId != null && message.hasOwnProperty("providerId"))
                    if (!$util.isString(message.providerId))
                        return "providerId: string expected";
                if (message.serviceTypes != null && message.hasOwnProperty("serviceTypes")) {
                    if (!Array.isArray(message.serviceTypes))
                        return "serviceTypes: array expected";
                    for (var i = 0; i < message.serviceTypes.length; ++i)
                        switch (message.serviceTypes[i]) {
                        default:
                            return "serviceTypes: enum value[] expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            break;
                        }
                }
                if (message.algorithm != null && message.hasOwnProperty("algorithm"))
                    switch (message.algorithm) {
                    default:
                        return "algorithm: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.rotId != null && message.hasOwnProperty("rotId"))
                    if (!(message.rotId && typeof message.rotId.length === "number" || $util.isString(message.rotId)))
                        return "rotId: buffer expected";
                if (message.encryptionKey != null && message.hasOwnProperty("encryptionKey")) {
                    var error = $root.license_protocol.DrmCertificate.EncryptionKey.verify(message.encryptionKey);
                    if (error)
                        return "encryptionKey." + error;
                }
                return null;
            };
    
            /**
             * Creates a DrmCertificate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof license_protocol.DrmCertificate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {license_protocol.DrmCertificate} DrmCertificate
             */
            DrmCertificate.fromObject = function fromObject(object) {
                if (object instanceof $root.license_protocol.DrmCertificate)
                    return object;
                var message = new $root.license_protocol.DrmCertificate();
                switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "ROOT":
                case 0:
                    message.type = 0;
                    break;
                case "DEVICE_MODEL":
                case 1:
                    message.type = 1;
                    break;
                case "DEVICE":
                case 2:
                    message.type = 2;
                    break;
                case "SERVICE":
                case 3:
                    message.type = 3;
                    break;
                case "PROVISIONER":
                case 4:
                    message.type = 4;
                    break;
                }
                if (object.serialNumber != null)
                    if (typeof object.serialNumber === "string")
                        $util.base64.decode(object.serialNumber, message.serialNumber = $util.newBuffer($util.base64.length(object.serialNumber)), 0);
                    else if (object.serialNumber.length >= 0)
                        message.serialNumber = object.serialNumber;
                if (object.creationTimeSeconds != null)
                    message.creationTimeSeconds = object.creationTimeSeconds >>> 0;
                if (object.expirationTimeSeconds != null)
                    message.expirationTimeSeconds = object.expirationTimeSeconds >>> 0;
                if (object.publicKey != null)
                    if (typeof object.publicKey === "string")
                        $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                    else if (object.publicKey.length >= 0)
                        message.publicKey = object.publicKey;
                if (object.systemId != null)
                    message.systemId = object.systemId >>> 0;
                if (object.testDeviceDeprecated != null)
                    message.testDeviceDeprecated = Boolean(object.testDeviceDeprecated);
                if (object.providerId != null)
                    message.providerId = String(object.providerId);
                if (object.serviceTypes) {
                    if (!Array.isArray(object.serviceTypes))
                        throw TypeError(".license_protocol.DrmCertificate.serviceTypes: array expected");
                    message.serviceTypes = [];
                    for (var i = 0; i < object.serviceTypes.length; ++i)
                        switch (object.serviceTypes[i]) {
                        default:
                            if (typeof object.serviceTypes[i] === "number") {
                                message.serviceTypes[i] = object.serviceTypes[i];
                                break;
                            }
                        case "UNKNOWN_SERVICE_TYPE":
                        case 0:
                            message.serviceTypes[i] = 0;
                            break;
                        case "LICENSE_SERVER_SDK":
                        case 1:
                            message.serviceTypes[i] = 1;
                            break;
                        case "LICENSE_SERVER_PROXY_SDK":
                        case 2:
                            message.serviceTypes[i] = 2;
                            break;
                        case "PROVISIONING_SDK":
                        case 3:
                            message.serviceTypes[i] = 3;
                            break;
                        case "CAS_PROXY_SDK":
                        case 4:
                            message.serviceTypes[i] = 4;
                            break;
                        }
                }
                switch (object.algorithm) {
                case "UNKNOWN_ALGORITHM":
                case 0:
                    message.algorithm = 0;
                    break;
                default:
                    if (typeof object.algorithm === "number") {
                        message.algorithm = object.algorithm;
                        break;
                    }
                    break;
                case "RSA":
                case 1:
                    message.algorithm = 1;
                    break;
                case "ECC_SECP256R1":
                case 2:
                    message.algorithm = 2;
                    break;
                case "ECC_SECP384R1":
                case 3:
                    message.algorithm = 3;
                    break;
                case "ECC_SECP521R1":
                case 4:
                    message.algorithm = 4;
                    break;
                }
                if (object.rotId != null)
                    if (typeof object.rotId === "string")
                        $util.base64.decode(object.rotId, message.rotId = $util.newBuffer($util.base64.length(object.rotId)), 0);
                    else if (object.rotId.length >= 0)
                        message.rotId = object.rotId;
                if (object.encryptionKey != null) {
                    if (typeof object.encryptionKey !== "object")
                        throw TypeError(".license_protocol.DrmCertificate.encryptionKey: object expected");
                    message.encryptionKey = $root.license_protocol.DrmCertificate.EncryptionKey.fromObject(object.encryptionKey);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a DrmCertificate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof license_protocol.DrmCertificate
             * @static
             * @param {license_protocol.DrmCertificate} message DrmCertificate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DrmCertificate.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.serviceTypes = [];
                if (options.defaults) {
                    object.type = options.enums === String ? "ROOT" : 0;
                    if (options.bytes === String)
                        object.serialNumber = "";
                    else {
                        object.serialNumber = [];
                        if (options.bytes !== Array)
                            object.serialNumber = $util.newBuffer(object.serialNumber);
                    }
                    object.creationTimeSeconds = 0;
                    if (options.bytes === String)
                        object.publicKey = "";
                    else {
                        object.publicKey = [];
                        if (options.bytes !== Array)
                            object.publicKey = $util.newBuffer(object.publicKey);
                    }
                    object.systemId = 0;
                    object.testDeviceDeprecated = false;
                    object.providerId = "";
                    object.algorithm = options.enums === String ? "RSA" : 1;
                    if (options.bytes === String)
                        object.rotId = "";
                    else {
                        object.rotId = [];
                        if (options.bytes !== Array)
                            object.rotId = $util.newBuffer(object.rotId);
                    }
                    object.encryptionKey = null;
                    object.expirationTimeSeconds = 0;
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.license_protocol.DrmCertificate.Type[message.type] === undefined ? message.type : $root.license_protocol.DrmCertificate.Type[message.type] : message.type;
                if (message.serialNumber != null && message.hasOwnProperty("serialNumber"))
                    object.serialNumber = options.bytes === String ? $util.base64.encode(message.serialNumber, 0, message.serialNumber.length) : options.bytes === Array ? Array.prototype.slice.call(message.serialNumber) : message.serialNumber;
                if (message.creationTimeSeconds != null && message.hasOwnProperty("creationTimeSeconds"))
                    object.creationTimeSeconds = message.creationTimeSeconds;
                if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                    object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
                if (message.systemId != null && message.hasOwnProperty("systemId"))
                    object.systemId = message.systemId;
                if (message.testDeviceDeprecated != null && message.hasOwnProperty("testDeviceDeprecated"))
                    object.testDeviceDeprecated = message.testDeviceDeprecated;
                if (message.providerId != null && message.hasOwnProperty("providerId"))
                    object.providerId = message.providerId;
                if (message.serviceTypes && message.serviceTypes.length) {
                    object.serviceTypes = [];
                    for (var j = 0; j < message.serviceTypes.length; ++j)
                        object.serviceTypes[j] = options.enums === String ? $root.license_protocol.DrmCertificate.ServiceType[message.serviceTypes[j]] === undefined ? message.serviceTypes[j] : $root.license_protocol.DrmCertificate.ServiceType[message.serviceTypes[j]] : message.serviceTypes[j];
                }
                if (message.algorithm != null && message.hasOwnProperty("algorithm"))
                    object.algorithm = options.enums === String ? $root.license_protocol.DrmCertificate.Algorithm[message.algorithm] === undefined ? message.algorithm : $root.license_protocol.DrmCertificate.Algorithm[message.algorithm] : message.algorithm;
                if (message.rotId != null && message.hasOwnProperty("rotId"))
                    object.rotId = options.bytes === String ? $util.base64.encode(message.rotId, 0, message.rotId.length) : options.bytes === Array ? Array.prototype.slice.call(message.rotId) : message.rotId;
                if (message.encryptionKey != null && message.hasOwnProperty("encryptionKey"))
                    object.encryptionKey = $root.license_protocol.DrmCertificate.EncryptionKey.toObject(message.encryptionKey, options);
                if (message.expirationTimeSeconds != null && message.hasOwnProperty("expirationTimeSeconds"))
                    object.expirationTimeSeconds = message.expirationTimeSeconds;
                return object;
            };
    
            /**
             * Converts this DrmCertificate to JSON.
             * @function toJSON
             * @memberof license_protocol.DrmCertificate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DrmCertificate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for DrmCertificate
             * @function getTypeUrl
             * @memberof license_protocol.DrmCertificate
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            DrmCertificate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/license_protocol.DrmCertificate";
            };
    
            /**
             * Type enum.
             * @name license_protocol.DrmCertificate.Type
             * @enum {number}
             * @property {number} ROOT=0 ROOT value
             * @property {number} DEVICE_MODEL=1 DEVICE_MODEL value
             * @property {number} DEVICE=2 DEVICE value
             * @property {number} SERVICE=3 SERVICE value
             * @property {number} PROVISIONER=4 PROVISIONER value
             */
            DrmCertificate.Type = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "ROOT"] = 0;
                values[valuesById[1] = "DEVICE_MODEL"] = 1;
                values[valuesById[2] = "DEVICE"] = 2;
                values[valuesById[3] = "SERVICE"] = 3;
                values[valuesById[4] = "PROVISIONER"] = 4;
                return values;
            })();
    
            /**
             * ServiceType enum.
             * @name license_protocol.DrmCertificate.ServiceType
             * @enum {number}
             * @property {number} UNKNOWN_SERVICE_TYPE=0 UNKNOWN_SERVICE_TYPE value
             * @property {number} LICENSE_SERVER_SDK=1 LICENSE_SERVER_SDK value
             * @property {number} LICENSE_SERVER_PROXY_SDK=2 LICENSE_SERVER_PROXY_SDK value
             * @property {number} PROVISIONING_SDK=3 PROVISIONING_SDK value
             * @property {number} CAS_PROXY_SDK=4 CAS_PROXY_SDK value
             */
            DrmCertificate.ServiceType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN_SERVICE_TYPE"] = 0;
                values[valuesById[1] = "LICENSE_SERVER_SDK"] = 1;
                values[valuesById[2] = "LICENSE_SERVER_PROXY_SDK"] = 2;
                values[valuesById[3] = "PROVISIONING_SDK"] = 3;
                values[valuesById[4] = "CAS_PROXY_SDK"] = 4;
                return values;
            })();
    
            /**
             * Algorithm enum.
             * @name license_protocol.DrmCertificate.Algorithm
             * @enum {number}
             * @property {number} UNKNOWN_ALGORITHM=0 UNKNOWN_ALGORITHM value
             * @property {number} RSA=1 RSA value
             * @property {number} ECC_SECP256R1=2 ECC_SECP256R1 value
             * @property {number} ECC_SECP384R1=3 ECC_SECP384R1 value
             * @property {number} ECC_SECP521R1=4 ECC_SECP521R1 value
             */
            DrmCertificate.Algorithm = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN_ALGORITHM"] = 0;
                values[valuesById[1] = "RSA"] = 1;
                values[valuesById[2] = "ECC_SECP256R1"] = 2;
                values[valuesById[3] = "ECC_SECP384R1"] = 3;
                values[valuesById[4] = "ECC_SECP521R1"] = 4;
                return values;
            })();
    
            DrmCertificate.EncryptionKey = (function() {
    
                /**
                 * Properties of an EncryptionKey.
                 * @memberof license_protocol.DrmCertificate
                 * @interface IEncryptionKey
                 * @property {Uint8Array|null} [publicKey] EncryptionKey publicKey
                 * @property {license_protocol.DrmCertificate.Algorithm|null} [algorithm] EncryptionKey algorithm
                 */
    
                /**
                 * Constructs a new EncryptionKey.
                 * @memberof license_protocol.DrmCertificate
                 * @classdesc Represents an EncryptionKey.
                 * @implements IEncryptionKey
                 * @constructor
                 * @param {license_protocol.DrmCertificate.IEncryptionKey=} [properties] Properties to set
                 */
                function EncryptionKey(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * EncryptionKey publicKey.
                 * @member {Uint8Array} publicKey
                 * @memberof license_protocol.DrmCertificate.EncryptionKey
                 * @instance
                 */
                EncryptionKey.prototype.publicKey = $util.newBuffer([]);
    
                /**
                 * EncryptionKey algorithm.
                 * @member {license_protocol.DrmCertificate.Algorithm} algorithm
                 * @memberof license_protocol.DrmCertificate.EncryptionKey
                 * @instance
                 */
                EncryptionKey.prototype.algorithm = 1;
    
                /**
                 * Creates a new EncryptionKey instance using the specified properties.
                 * @function create
                 * @memberof license_protocol.DrmCertificate.EncryptionKey
                 * @static
                 * @param {license_protocol.DrmCertificate.IEncryptionKey=} [properties] Properties to set
                 * @returns {license_protocol.DrmCertificate.EncryptionKey} EncryptionKey instance
                 */
                EncryptionKey.create = function create(properties) {
                    return new EncryptionKey(properties);
                };
    
                /**
                 * Encodes the specified EncryptionKey message. Does not implicitly {@link license_protocol.DrmCertificate.EncryptionKey.verify|verify} messages.
                 * @function encode
                 * @memberof license_protocol.DrmCertificate.EncryptionKey
                 * @static
                 * @param {license_protocol.DrmCertificate.IEncryptionKey} message EncryptionKey message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EncryptionKey.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.publicKey);
                    if (message.algorithm != null && Object.hasOwnProperty.call(message, "algorithm"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.algorithm);
                    return writer;
                };
    
                /**
                 * Encodes the specified EncryptionKey message, length delimited. Does not implicitly {@link license_protocol.DrmCertificate.EncryptionKey.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof license_protocol.DrmCertificate.EncryptionKey
                 * @static
                 * @param {license_protocol.DrmCertificate.IEncryptionKey} message EncryptionKey message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EncryptionKey.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an EncryptionKey message from the specified reader or buffer.
                 * @function decode
                 * @memberof license_protocol.DrmCertificate.EncryptionKey
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {license_protocol.DrmCertificate.EncryptionKey} EncryptionKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EncryptionKey.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.DrmCertificate.EncryptionKey();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.publicKey = reader.bytes();
                                break;
                            }
                        case 2: {
                                message.algorithm = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an EncryptionKey message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof license_protocol.DrmCertificate.EncryptionKey
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {license_protocol.DrmCertificate.EncryptionKey} EncryptionKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EncryptionKey.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an EncryptionKey message.
                 * @function verify
                 * @memberof license_protocol.DrmCertificate.EncryptionKey
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                EncryptionKey.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                        if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                            return "publicKey: buffer expected";
                    if (message.algorithm != null && message.hasOwnProperty("algorithm"))
                        switch (message.algorithm) {
                        default:
                            return "algorithm: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            break;
                        }
                    return null;
                };
    
                /**
                 * Creates an EncryptionKey message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof license_protocol.DrmCertificate.EncryptionKey
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {license_protocol.DrmCertificate.EncryptionKey} EncryptionKey
                 */
                EncryptionKey.fromObject = function fromObject(object) {
                    if (object instanceof $root.license_protocol.DrmCertificate.EncryptionKey)
                        return object;
                    var message = new $root.license_protocol.DrmCertificate.EncryptionKey();
                    if (object.publicKey != null)
                        if (typeof object.publicKey === "string")
                            $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                        else if (object.publicKey.length >= 0)
                            message.publicKey = object.publicKey;
                    switch (object.algorithm) {
                    case "UNKNOWN_ALGORITHM":
                    case 0:
                        message.algorithm = 0;
                        break;
                    default:
                        if (typeof object.algorithm === "number") {
                            message.algorithm = object.algorithm;
                            break;
                        }
                        break;
                    case "RSA":
                    case 1:
                        message.algorithm = 1;
                        break;
                    case "ECC_SECP256R1":
                    case 2:
                        message.algorithm = 2;
                        break;
                    case "ECC_SECP384R1":
                    case 3:
                        message.algorithm = 3;
                        break;
                    case "ECC_SECP521R1":
                    case 4:
                        message.algorithm = 4;
                        break;
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from an EncryptionKey message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof license_protocol.DrmCertificate.EncryptionKey
                 * @static
                 * @param {license_protocol.DrmCertificate.EncryptionKey} message EncryptionKey
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                EncryptionKey.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.publicKey = "";
                        else {
                            object.publicKey = [];
                            if (options.bytes !== Array)
                                object.publicKey = $util.newBuffer(object.publicKey);
                        }
                        object.algorithm = options.enums === String ? "RSA" : 1;
                    }
                    if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                        object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
                    if (message.algorithm != null && message.hasOwnProperty("algorithm"))
                        object.algorithm = options.enums === String ? $root.license_protocol.DrmCertificate.Algorithm[message.algorithm] === undefined ? message.algorithm : $root.license_protocol.DrmCertificate.Algorithm[message.algorithm] : message.algorithm;
                    return object;
                };
    
                /**
                 * Converts this EncryptionKey to JSON.
                 * @function toJSON
                 * @memberof license_protocol.DrmCertificate.EncryptionKey
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                EncryptionKey.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * Gets the default type url for EncryptionKey
                 * @function getTypeUrl
                 * @memberof license_protocol.DrmCertificate.EncryptionKey
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                EncryptionKey.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/license_protocol.DrmCertificate.EncryptionKey";
                };
    
                return EncryptionKey;
            })();
    
            return DrmCertificate;
        })();
    
        license_protocol.SignedDrmCertificate = (function() {
    
            /**
             * Properties of a SignedDrmCertificate.
             * @memberof license_protocol
             * @interface ISignedDrmCertificate
             * @property {Uint8Array|null} [drmCertificate] SignedDrmCertificate drmCertificate
             * @property {Uint8Array|null} [signature] SignedDrmCertificate signature
             * @property {license_protocol.ISignedDrmCertificate|null} [signer] SignedDrmCertificate signer
             * @property {license_protocol.HashAlgorithmProto|null} [hashAlgorithm] SignedDrmCertificate hashAlgorithm
             */
    
            /**
             * Constructs a new SignedDrmCertificate.
             * @memberof license_protocol
             * @classdesc Represents a SignedDrmCertificate.
             * @implements ISignedDrmCertificate
             * @constructor
             * @param {license_protocol.ISignedDrmCertificate=} [properties] Properties to set
             */
            function SignedDrmCertificate(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * SignedDrmCertificate drmCertificate.
             * @member {Uint8Array} drmCertificate
             * @memberof license_protocol.SignedDrmCertificate
             * @instance
             */
            SignedDrmCertificate.prototype.drmCertificate = $util.newBuffer([]);
    
            /**
             * SignedDrmCertificate signature.
             * @member {Uint8Array} signature
             * @memberof license_protocol.SignedDrmCertificate
             * @instance
             */
            SignedDrmCertificate.prototype.signature = $util.newBuffer([]);
    
            /**
             * SignedDrmCertificate signer.
             * @member {license_protocol.ISignedDrmCertificate|null|undefined} signer
             * @memberof license_protocol.SignedDrmCertificate
             * @instance
             */
            SignedDrmCertificate.prototype.signer = null;
    
            /**
             * SignedDrmCertificate hashAlgorithm.
             * @member {license_protocol.HashAlgorithmProto} hashAlgorithm
             * @memberof license_protocol.SignedDrmCertificate
             * @instance
             */
            SignedDrmCertificate.prototype.hashAlgorithm = 0;
    
            /**
             * Creates a new SignedDrmCertificate instance using the specified properties.
             * @function create
             * @memberof license_protocol.SignedDrmCertificate
             * @static
             * @param {license_protocol.ISignedDrmCertificate=} [properties] Properties to set
             * @returns {license_protocol.SignedDrmCertificate} SignedDrmCertificate instance
             */
            SignedDrmCertificate.create = function create(properties) {
                return new SignedDrmCertificate(properties);
            };
    
            /**
             * Encodes the specified SignedDrmCertificate message. Does not implicitly {@link license_protocol.SignedDrmCertificate.verify|verify} messages.
             * @function encode
             * @memberof license_protocol.SignedDrmCertificate
             * @static
             * @param {license_protocol.ISignedDrmCertificate} message SignedDrmCertificate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SignedDrmCertificate.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.drmCertificate != null && Object.hasOwnProperty.call(message, "drmCertificate"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.drmCertificate);
                if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
                if (message.signer != null && Object.hasOwnProperty.call(message, "signer"))
                    $root.license_protocol.SignedDrmCertificate.encode(message.signer, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.hashAlgorithm != null && Object.hasOwnProperty.call(message, "hashAlgorithm"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.hashAlgorithm);
                return writer;
            };
    
            /**
             * Encodes the specified SignedDrmCertificate message, length delimited. Does not implicitly {@link license_protocol.SignedDrmCertificate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof license_protocol.SignedDrmCertificate
             * @static
             * @param {license_protocol.ISignedDrmCertificate} message SignedDrmCertificate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SignedDrmCertificate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a SignedDrmCertificate message from the specified reader or buffer.
             * @function decode
             * @memberof license_protocol.SignedDrmCertificate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {license_protocol.SignedDrmCertificate} SignedDrmCertificate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SignedDrmCertificate.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.SignedDrmCertificate();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.drmCertificate = reader.bytes();
                            break;
                        }
                    case 2: {
                            message.signature = reader.bytes();
                            break;
                        }
                    case 3: {
                            message.signer = $root.license_protocol.SignedDrmCertificate.decode(reader, reader.uint32());
                            break;
                        }
                    case 4: {
                            message.hashAlgorithm = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SignedDrmCertificate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof license_protocol.SignedDrmCertificate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {license_protocol.SignedDrmCertificate} SignedDrmCertificate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SignedDrmCertificate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a SignedDrmCertificate message.
             * @function verify
             * @memberof license_protocol.SignedDrmCertificate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SignedDrmCertificate.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.drmCertificate != null && message.hasOwnProperty("drmCertificate"))
                    if (!(message.drmCertificate && typeof message.drmCertificate.length === "number" || $util.isString(message.drmCertificate)))
                        return "drmCertificate: buffer expected";
                if (message.signature != null && message.hasOwnProperty("signature"))
                    if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                        return "signature: buffer expected";
                if (message.signer != null && message.hasOwnProperty("signer")) {
                    var error = $root.license_protocol.SignedDrmCertificate.verify(message.signer);
                    if (error)
                        return "signer." + error;
                }
                if (message.hashAlgorithm != null && message.hasOwnProperty("hashAlgorithm"))
                    switch (message.hashAlgorithm) {
                    default:
                        return "hashAlgorithm: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a SignedDrmCertificate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof license_protocol.SignedDrmCertificate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {license_protocol.SignedDrmCertificate} SignedDrmCertificate
             */
            SignedDrmCertificate.fromObject = function fromObject(object) {
                if (object instanceof $root.license_protocol.SignedDrmCertificate)
                    return object;
                var message = new $root.license_protocol.SignedDrmCertificate();
                if (object.drmCertificate != null)
                    if (typeof object.drmCertificate === "string")
                        $util.base64.decode(object.drmCertificate, message.drmCertificate = $util.newBuffer($util.base64.length(object.drmCertificate)), 0);
                    else if (object.drmCertificate.length >= 0)
                        message.drmCertificate = object.drmCertificate;
                if (object.signature != null)
                    if (typeof object.signature === "string")
                        $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                    else if (object.signature.length >= 0)
                        message.signature = object.signature;
                if (object.signer != null) {
                    if (typeof object.signer !== "object")
                        throw TypeError(".license_protocol.SignedDrmCertificate.signer: object expected");
                    message.signer = $root.license_protocol.SignedDrmCertificate.fromObject(object.signer);
                }
                switch (object.hashAlgorithm) {
                default:
                    if (typeof object.hashAlgorithm === "number") {
                        message.hashAlgorithm = object.hashAlgorithm;
                        break;
                    }
                    break;
                case "HASH_ALGORITHM_UNSPECIFIED":
                case 0:
                    message.hashAlgorithm = 0;
                    break;
                case "HASH_ALGORITHM_SHA_1":
                case 1:
                    message.hashAlgorithm = 1;
                    break;
                case "HASH_ALGORITHM_SHA_256":
                case 2:
                    message.hashAlgorithm = 2;
                    break;
                case "HASH_ALGORITHM_SHA_384":
                case 3:
                    message.hashAlgorithm = 3;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a SignedDrmCertificate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof license_protocol.SignedDrmCertificate
             * @static
             * @param {license_protocol.SignedDrmCertificate} message SignedDrmCertificate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SignedDrmCertificate.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if (options.bytes === String)
                        object.drmCertificate = "";
                    else {
                        object.drmCertificate = [];
                        if (options.bytes !== Array)
                            object.drmCertificate = $util.newBuffer(object.drmCertificate);
                    }
                    if (options.bytes === String)
                        object.signature = "";
                    else {
                        object.signature = [];
                        if (options.bytes !== Array)
                            object.signature = $util.newBuffer(object.signature);
                    }
                    object.signer = null;
                    object.hashAlgorithm = options.enums === String ? "HASH_ALGORITHM_UNSPECIFIED" : 0;
                }
                if (message.drmCertificate != null && message.hasOwnProperty("drmCertificate"))
                    object.drmCertificate = options.bytes === String ? $util.base64.encode(message.drmCertificate, 0, message.drmCertificate.length) : options.bytes === Array ? Array.prototype.slice.call(message.drmCertificate) : message.drmCertificate;
                if (message.signature != null && message.hasOwnProperty("signature"))
                    object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
                if (message.signer != null && message.hasOwnProperty("signer"))
                    object.signer = $root.license_protocol.SignedDrmCertificate.toObject(message.signer, options);
                if (message.hashAlgorithm != null && message.hasOwnProperty("hashAlgorithm"))
                    object.hashAlgorithm = options.enums === String ? $root.license_protocol.HashAlgorithmProto[message.hashAlgorithm] === undefined ? message.hashAlgorithm : $root.license_protocol.HashAlgorithmProto[message.hashAlgorithm] : message.hashAlgorithm;
                return object;
            };
    
            /**
             * Converts this SignedDrmCertificate to JSON.
             * @function toJSON
             * @memberof license_protocol.SignedDrmCertificate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SignedDrmCertificate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for SignedDrmCertificate
             * @function getTypeUrl
             * @memberof license_protocol.SignedDrmCertificate
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SignedDrmCertificate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/license_protocol.SignedDrmCertificate";
            };
    
            return SignedDrmCertificate;
        })();
    
        license_protocol.WidevinePsshData = (function() {
    
            /**
             * Properties of a WidevinePsshData.
             * @memberof license_protocol
             * @interface IWidevinePsshData
             * @property {Array.<Uint8Array>|null} [keyIds] WidevinePsshData keyIds
             * @property {Uint8Array|null} [contentId] WidevinePsshData contentId
             * @property {number|null} [cryptoPeriodIndex] WidevinePsshData cryptoPeriodIndex
             * @property {number|null} [protectionScheme] WidevinePsshData protectionScheme
             * @property {number|null} [cryptoPeriodSeconds] WidevinePsshData cryptoPeriodSeconds
             * @property {license_protocol.WidevinePsshData.Type|null} [type] WidevinePsshData type
             * @property {number|null} [keySequence] WidevinePsshData keySequence
             * @property {Array.<Uint8Array>|null} [groupIds] WidevinePsshData groupIds
             * @property {Array.<license_protocol.WidevinePsshData.IEntitledKey>|null} [entitledKeys] WidevinePsshData entitledKeys
             * @property {string|null} [videoFeature] WidevinePsshData videoFeature
             * @property {license_protocol.WidevinePsshData.Algorithm|null} [algorithm] WidevinePsshData algorithm
             * @property {string|null} [provider] WidevinePsshData provider
             * @property {string|null} [trackType] WidevinePsshData trackType
             * @property {string|null} [policy] WidevinePsshData policy
             * @property {Uint8Array|null} [groupedLicense] WidevinePsshData groupedLicense
             */
    
            /**
             * Constructs a new WidevinePsshData.
             * @memberof license_protocol
             * @classdesc Represents a WidevinePsshData.
             * @implements IWidevinePsshData
             * @constructor
             * @param {license_protocol.IWidevinePsshData=} [properties] Properties to set
             */
            function WidevinePsshData(properties) {
                this.keyIds = [];
                this.groupIds = [];
                this.entitledKeys = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * WidevinePsshData keyIds.
             * @member {Array.<Uint8Array>} keyIds
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.keyIds = $util.emptyArray;
    
            /**
             * WidevinePsshData contentId.
             * @member {Uint8Array} contentId
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.contentId = $util.newBuffer([]);
    
            /**
             * WidevinePsshData cryptoPeriodIndex.
             * @member {number} cryptoPeriodIndex
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.cryptoPeriodIndex = 0;
    
            /**
             * WidevinePsshData protectionScheme.
             * @member {number} protectionScheme
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.protectionScheme = 0;
    
            /**
             * WidevinePsshData cryptoPeriodSeconds.
             * @member {number} cryptoPeriodSeconds
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.cryptoPeriodSeconds = 0;
    
            /**
             * WidevinePsshData type.
             * @member {license_protocol.WidevinePsshData.Type} type
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.type = 0;
    
            /**
             * WidevinePsshData keySequence.
             * @member {number} keySequence
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.keySequence = 0;
    
            /**
             * WidevinePsshData groupIds.
             * @member {Array.<Uint8Array>} groupIds
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.groupIds = $util.emptyArray;
    
            /**
             * WidevinePsshData entitledKeys.
             * @member {Array.<license_protocol.WidevinePsshData.IEntitledKey>} entitledKeys
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.entitledKeys = $util.emptyArray;
    
            /**
             * WidevinePsshData videoFeature.
             * @member {string} videoFeature
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.videoFeature = "";
    
            /**
             * WidevinePsshData algorithm.
             * @member {license_protocol.WidevinePsshData.Algorithm} algorithm
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.algorithm = 0;
    
            /**
             * WidevinePsshData provider.
             * @member {string} provider
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.provider = "";
    
            /**
             * WidevinePsshData trackType.
             * @member {string} trackType
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.trackType = "";
    
            /**
             * WidevinePsshData policy.
             * @member {string} policy
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.policy = "";
    
            /**
             * WidevinePsshData groupedLicense.
             * @member {Uint8Array} groupedLicense
             * @memberof license_protocol.WidevinePsshData
             * @instance
             */
            WidevinePsshData.prototype.groupedLicense = $util.newBuffer([]);
    
            /**
             * Creates a new WidevinePsshData instance using the specified properties.
             * @function create
             * @memberof license_protocol.WidevinePsshData
             * @static
             * @param {license_protocol.IWidevinePsshData=} [properties] Properties to set
             * @returns {license_protocol.WidevinePsshData} WidevinePsshData instance
             */
            WidevinePsshData.create = function create(properties) {
                return new WidevinePsshData(properties);
            };
    
            /**
             * Encodes the specified WidevinePsshData message. Does not implicitly {@link license_protocol.WidevinePsshData.verify|verify} messages.
             * @function encode
             * @memberof license_protocol.WidevinePsshData
             * @static
             * @param {license_protocol.IWidevinePsshData} message WidevinePsshData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WidevinePsshData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.algorithm != null && Object.hasOwnProperty.call(message, "algorithm"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.algorithm);
                if (message.keyIds != null && message.keyIds.length)
                    for (var i = 0; i < message.keyIds.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.keyIds[i]);
                if (message.provider != null && Object.hasOwnProperty.call(message, "provider"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.provider);
                if (message.contentId != null && Object.hasOwnProperty.call(message, "contentId"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.contentId);
                if (message.trackType != null && Object.hasOwnProperty.call(message, "trackType"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.trackType);
                if (message.policy != null && Object.hasOwnProperty.call(message, "policy"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.policy);
                if (message.cryptoPeriodIndex != null && Object.hasOwnProperty.call(message, "cryptoPeriodIndex"))
                    writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.cryptoPeriodIndex);
                if (message.groupedLicense != null && Object.hasOwnProperty.call(message, "groupedLicense"))
                    writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.groupedLicense);
                if (message.protectionScheme != null && Object.hasOwnProperty.call(message, "protectionScheme"))
                    writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.protectionScheme);
                if (message.cryptoPeriodSeconds != null && Object.hasOwnProperty.call(message, "cryptoPeriodSeconds"))
                    writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.cryptoPeriodSeconds);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 11, wireType 0 =*/88).int32(message.type);
                if (message.keySequence != null && Object.hasOwnProperty.call(message, "keySequence"))
                    writer.uint32(/* id 12, wireType 0 =*/96).uint32(message.keySequence);
                if (message.groupIds != null && message.groupIds.length)
                    for (var i = 0; i < message.groupIds.length; ++i)
                        writer.uint32(/* id 13, wireType 2 =*/106).bytes(message.groupIds[i]);
                if (message.entitledKeys != null && message.entitledKeys.length)
                    for (var i = 0; i < message.entitledKeys.length; ++i)
                        $root.license_protocol.WidevinePsshData.EntitledKey.encode(message.entitledKeys[i], writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
                if (message.videoFeature != null && Object.hasOwnProperty.call(message, "videoFeature"))
                    writer.uint32(/* id 15, wireType 2 =*/122).string(message.videoFeature);
                return writer;
            };
    
            /**
             * Encodes the specified WidevinePsshData message, length delimited. Does not implicitly {@link license_protocol.WidevinePsshData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof license_protocol.WidevinePsshData
             * @static
             * @param {license_protocol.IWidevinePsshData} message WidevinePsshData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WidevinePsshData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a WidevinePsshData message from the specified reader or buffer.
             * @function decode
             * @memberof license_protocol.WidevinePsshData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {license_protocol.WidevinePsshData} WidevinePsshData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WidevinePsshData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.WidevinePsshData();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2: {
                            if (!(message.keyIds && message.keyIds.length))
                                message.keyIds = [];
                            message.keyIds.push(reader.bytes());
                            break;
                        }
                    case 4: {
                            message.contentId = reader.bytes();
                            break;
                        }
                    case 7: {
                            message.cryptoPeriodIndex = reader.uint32();
                            break;
                        }
                    case 9: {
                            message.protectionScheme = reader.uint32();
                            break;
                        }
                    case 10: {
                            message.cryptoPeriodSeconds = reader.uint32();
                            break;
                        }
                    case 11: {
                            message.type = reader.int32();
                            break;
                        }
                    case 12: {
                            message.keySequence = reader.uint32();
                            break;
                        }
                    case 13: {
                            if (!(message.groupIds && message.groupIds.length))
                                message.groupIds = [];
                            message.groupIds.push(reader.bytes());
                            break;
                        }
                    case 14: {
                            if (!(message.entitledKeys && message.entitledKeys.length))
                                message.entitledKeys = [];
                            message.entitledKeys.push($root.license_protocol.WidevinePsshData.EntitledKey.decode(reader, reader.uint32()));
                            break;
                        }
                    case 15: {
                            message.videoFeature = reader.string();
                            break;
                        }
                    case 1: {
                            message.algorithm = reader.int32();
                            break;
                        }
                    case 3: {
                            message.provider = reader.string();
                            break;
                        }
                    case 5: {
                            message.trackType = reader.string();
                            break;
                        }
                    case 6: {
                            message.policy = reader.string();
                            break;
                        }
                    case 8: {
                            message.groupedLicense = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a WidevinePsshData message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof license_protocol.WidevinePsshData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {license_protocol.WidevinePsshData} WidevinePsshData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WidevinePsshData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a WidevinePsshData message.
             * @function verify
             * @memberof license_protocol.WidevinePsshData
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WidevinePsshData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.keyIds != null && message.hasOwnProperty("keyIds")) {
                    if (!Array.isArray(message.keyIds))
                        return "keyIds: array expected";
                    for (var i = 0; i < message.keyIds.length; ++i)
                        if (!(message.keyIds[i] && typeof message.keyIds[i].length === "number" || $util.isString(message.keyIds[i])))
                            return "keyIds: buffer[] expected";
                }
                if (message.contentId != null && message.hasOwnProperty("contentId"))
                    if (!(message.contentId && typeof message.contentId.length === "number" || $util.isString(message.contentId)))
                        return "contentId: buffer expected";
                if (message.cryptoPeriodIndex != null && message.hasOwnProperty("cryptoPeriodIndex"))
                    if (!$util.isInteger(message.cryptoPeriodIndex))
                        return "cryptoPeriodIndex: integer expected";
                if (message.protectionScheme != null && message.hasOwnProperty("protectionScheme"))
                    if (!$util.isInteger(message.protectionScheme))
                        return "protectionScheme: integer expected";
                if (message.cryptoPeriodSeconds != null && message.hasOwnProperty("cryptoPeriodSeconds"))
                    if (!$util.isInteger(message.cryptoPeriodSeconds))
                        return "cryptoPeriodSeconds: integer expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.keySequence != null && message.hasOwnProperty("keySequence"))
                    if (!$util.isInteger(message.keySequence))
                        return "keySequence: integer expected";
                if (message.groupIds != null && message.hasOwnProperty("groupIds")) {
                    if (!Array.isArray(message.groupIds))
                        return "groupIds: array expected";
                    for (var i = 0; i < message.groupIds.length; ++i)
                        if (!(message.groupIds[i] && typeof message.groupIds[i].length === "number" || $util.isString(message.groupIds[i])))
                            return "groupIds: buffer[] expected";
                }
                if (message.entitledKeys != null && message.hasOwnProperty("entitledKeys")) {
                    if (!Array.isArray(message.entitledKeys))
                        return "entitledKeys: array expected";
                    for (var i = 0; i < message.entitledKeys.length; ++i) {
                        var error = $root.license_protocol.WidevinePsshData.EntitledKey.verify(message.entitledKeys[i]);
                        if (error)
                            return "entitledKeys." + error;
                    }
                }
                if (message.videoFeature != null && message.hasOwnProperty("videoFeature"))
                    if (!$util.isString(message.videoFeature))
                        return "videoFeature: string expected";
                if (message.algorithm != null && message.hasOwnProperty("algorithm"))
                    switch (message.algorithm) {
                    default:
                        return "algorithm: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                if (message.provider != null && message.hasOwnProperty("provider"))
                    if (!$util.isString(message.provider))
                        return "provider: string expected";
                if (message.trackType != null && message.hasOwnProperty("trackType"))
                    if (!$util.isString(message.trackType))
                        return "trackType: string expected";
                if (message.policy != null && message.hasOwnProperty("policy"))
                    if (!$util.isString(message.policy))
                        return "policy: string expected";
                if (message.groupedLicense != null && message.hasOwnProperty("groupedLicense"))
                    if (!(message.groupedLicense && typeof message.groupedLicense.length === "number" || $util.isString(message.groupedLicense)))
                        return "groupedLicense: buffer expected";
                return null;
            };
    
            /**
             * Creates a WidevinePsshData message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof license_protocol.WidevinePsshData
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {license_protocol.WidevinePsshData} WidevinePsshData
             */
            WidevinePsshData.fromObject = function fromObject(object) {
                if (object instanceof $root.license_protocol.WidevinePsshData)
                    return object;
                var message = new $root.license_protocol.WidevinePsshData();
                if (object.keyIds) {
                    if (!Array.isArray(object.keyIds))
                        throw TypeError(".license_protocol.WidevinePsshData.keyIds: array expected");
                    message.keyIds = [];
                    for (var i = 0; i < object.keyIds.length; ++i)
                        if (typeof object.keyIds[i] === "string")
                            $util.base64.decode(object.keyIds[i], message.keyIds[i] = $util.newBuffer($util.base64.length(object.keyIds[i])), 0);
                        else if (object.keyIds[i].length >= 0)
                            message.keyIds[i] = object.keyIds[i];
                }
                if (object.contentId != null)
                    if (typeof object.contentId === "string")
                        $util.base64.decode(object.contentId, message.contentId = $util.newBuffer($util.base64.length(object.contentId)), 0);
                    else if (object.contentId.length >= 0)
                        message.contentId = object.contentId;
                if (object.cryptoPeriodIndex != null)
                    message.cryptoPeriodIndex = object.cryptoPeriodIndex >>> 0;
                if (object.protectionScheme != null)
                    message.protectionScheme = object.protectionScheme >>> 0;
                if (object.cryptoPeriodSeconds != null)
                    message.cryptoPeriodSeconds = object.cryptoPeriodSeconds >>> 0;
                switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "SINGLE":
                case 0:
                    message.type = 0;
                    break;
                case "ENTITLEMENT":
                case 1:
                    message.type = 1;
                    break;
                case "ENTITLED_KEY":
                case 2:
                    message.type = 2;
                    break;
                }
                if (object.keySequence != null)
                    message.keySequence = object.keySequence >>> 0;
                if (object.groupIds) {
                    if (!Array.isArray(object.groupIds))
                        throw TypeError(".license_protocol.WidevinePsshData.groupIds: array expected");
                    message.groupIds = [];
                    for (var i = 0; i < object.groupIds.length; ++i)
                        if (typeof object.groupIds[i] === "string")
                            $util.base64.decode(object.groupIds[i], message.groupIds[i] = $util.newBuffer($util.base64.length(object.groupIds[i])), 0);
                        else if (object.groupIds[i].length >= 0)
                            message.groupIds[i] = object.groupIds[i];
                }
                if (object.entitledKeys) {
                    if (!Array.isArray(object.entitledKeys))
                        throw TypeError(".license_protocol.WidevinePsshData.entitledKeys: array expected");
                    message.entitledKeys = [];
                    for (var i = 0; i < object.entitledKeys.length; ++i) {
                        if (typeof object.entitledKeys[i] !== "object")
                            throw TypeError(".license_protocol.WidevinePsshData.entitledKeys: object expected");
                        message.entitledKeys[i] = $root.license_protocol.WidevinePsshData.EntitledKey.fromObject(object.entitledKeys[i]);
                    }
                }
                if (object.videoFeature != null)
                    message.videoFeature = String(object.videoFeature);
                switch (object.algorithm) {
                default:
                    if (typeof object.algorithm === "number") {
                        message.algorithm = object.algorithm;
                        break;
                    }
                    break;
                case "UNENCRYPTED":
                case 0:
                    message.algorithm = 0;
                    break;
                case "AESCTR":
                case 1:
                    message.algorithm = 1;
                    break;
                }
                if (object.provider != null)
                    message.provider = String(object.provider);
                if (object.trackType != null)
                    message.trackType = String(object.trackType);
                if (object.policy != null)
                    message.policy = String(object.policy);
                if (object.groupedLicense != null)
                    if (typeof object.groupedLicense === "string")
                        $util.base64.decode(object.groupedLicense, message.groupedLicense = $util.newBuffer($util.base64.length(object.groupedLicense)), 0);
                    else if (object.groupedLicense.length >= 0)
                        message.groupedLicense = object.groupedLicense;
                return message;
            };
    
            /**
             * Creates a plain object from a WidevinePsshData message. Also converts values to other types if specified.
             * @function toObject
             * @memberof license_protocol.WidevinePsshData
             * @static
             * @param {license_protocol.WidevinePsshData} message WidevinePsshData
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WidevinePsshData.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.keyIds = [];
                    object.groupIds = [];
                    object.entitledKeys = [];
                }
                if (options.defaults) {
                    object.algorithm = options.enums === String ? "UNENCRYPTED" : 0;
                    object.provider = "";
                    if (options.bytes === String)
                        object.contentId = "";
                    else {
                        object.contentId = [];
                        if (options.bytes !== Array)
                            object.contentId = $util.newBuffer(object.contentId);
                    }
                    object.trackType = "";
                    object.policy = "";
                    object.cryptoPeriodIndex = 0;
                    if (options.bytes === String)
                        object.groupedLicense = "";
                    else {
                        object.groupedLicense = [];
                        if (options.bytes !== Array)
                            object.groupedLicense = $util.newBuffer(object.groupedLicense);
                    }
                    object.protectionScheme = 0;
                    object.cryptoPeriodSeconds = 0;
                    object.type = options.enums === String ? "SINGLE" : 0;
                    object.keySequence = 0;
                    object.videoFeature = "";
                }
                if (message.algorithm != null && message.hasOwnProperty("algorithm"))
                    object.algorithm = options.enums === String ? $root.license_protocol.WidevinePsshData.Algorithm[message.algorithm] === undefined ? message.algorithm : $root.license_protocol.WidevinePsshData.Algorithm[message.algorithm] : message.algorithm;
                if (message.keyIds && message.keyIds.length) {
                    object.keyIds = [];
                    for (var j = 0; j < message.keyIds.length; ++j)
                        object.keyIds[j] = options.bytes === String ? $util.base64.encode(message.keyIds[j], 0, message.keyIds[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.keyIds[j]) : message.keyIds[j];
                }
                if (message.provider != null && message.hasOwnProperty("provider"))
                    object.provider = message.provider;
                if (message.contentId != null && message.hasOwnProperty("contentId"))
                    object.contentId = options.bytes === String ? $util.base64.encode(message.contentId, 0, message.contentId.length) : options.bytes === Array ? Array.prototype.slice.call(message.contentId) : message.contentId;
                if (message.trackType != null && message.hasOwnProperty("trackType"))
                    object.trackType = message.trackType;
                if (message.policy != null && message.hasOwnProperty("policy"))
                    object.policy = message.policy;
                if (message.cryptoPeriodIndex != null && message.hasOwnProperty("cryptoPeriodIndex"))
                    object.cryptoPeriodIndex = message.cryptoPeriodIndex;
                if (message.groupedLicense != null && message.hasOwnProperty("groupedLicense"))
                    object.groupedLicense = options.bytes === String ? $util.base64.encode(message.groupedLicense, 0, message.groupedLicense.length) : options.bytes === Array ? Array.prototype.slice.call(message.groupedLicense) : message.groupedLicense;
                if (message.protectionScheme != null && message.hasOwnProperty("protectionScheme"))
                    object.protectionScheme = message.protectionScheme;
                if (message.cryptoPeriodSeconds != null && message.hasOwnProperty("cryptoPeriodSeconds"))
                    object.cryptoPeriodSeconds = message.cryptoPeriodSeconds;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.license_protocol.WidevinePsshData.Type[message.type] === undefined ? message.type : $root.license_protocol.WidevinePsshData.Type[message.type] : message.type;
                if (message.keySequence != null && message.hasOwnProperty("keySequence"))
                    object.keySequence = message.keySequence;
                if (message.groupIds && message.groupIds.length) {
                    object.groupIds = [];
                    for (var j = 0; j < message.groupIds.length; ++j)
                        object.groupIds[j] = options.bytes === String ? $util.base64.encode(message.groupIds[j], 0, message.groupIds[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.groupIds[j]) : message.groupIds[j];
                }
                if (message.entitledKeys && message.entitledKeys.length) {
                    object.entitledKeys = [];
                    for (var j = 0; j < message.entitledKeys.length; ++j)
                        object.entitledKeys[j] = $root.license_protocol.WidevinePsshData.EntitledKey.toObject(message.entitledKeys[j], options);
                }
                if (message.videoFeature != null && message.hasOwnProperty("videoFeature"))
                    object.videoFeature = message.videoFeature;
                return object;
            };
    
            /**
             * Converts this WidevinePsshData to JSON.
             * @function toJSON
             * @memberof license_protocol.WidevinePsshData
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WidevinePsshData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for WidevinePsshData
             * @function getTypeUrl
             * @memberof license_protocol.WidevinePsshData
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            WidevinePsshData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/license_protocol.WidevinePsshData";
            };
    
            /**
             * Type enum.
             * @name license_protocol.WidevinePsshData.Type
             * @enum {number}
             * @property {number} SINGLE=0 SINGLE value
             * @property {number} ENTITLEMENT=1 ENTITLEMENT value
             * @property {number} ENTITLED_KEY=2 ENTITLED_KEY value
             */
            WidevinePsshData.Type = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "SINGLE"] = 0;
                values[valuesById[1] = "ENTITLEMENT"] = 1;
                values[valuesById[2] = "ENTITLED_KEY"] = 2;
                return values;
            })();
    
            WidevinePsshData.EntitledKey = (function() {
    
                /**
                 * Properties of an EntitledKey.
                 * @memberof license_protocol.WidevinePsshData
                 * @interface IEntitledKey
                 * @property {Uint8Array|null} [entitlementKeyId] EntitledKey entitlementKeyId
                 * @property {Uint8Array|null} [keyId] EntitledKey keyId
                 * @property {Uint8Array|null} [key] EntitledKey key
                 * @property {Uint8Array|null} [iv] EntitledKey iv
                 * @property {number|null} [entitlementKeySizeBytes] EntitledKey entitlementKeySizeBytes
                 */
    
                /**
                 * Constructs a new EntitledKey.
                 * @memberof license_protocol.WidevinePsshData
                 * @classdesc Represents an EntitledKey.
                 * @implements IEntitledKey
                 * @constructor
                 * @param {license_protocol.WidevinePsshData.IEntitledKey=} [properties] Properties to set
                 */
                function EntitledKey(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * EntitledKey entitlementKeyId.
                 * @member {Uint8Array} entitlementKeyId
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @instance
                 */
                EntitledKey.prototype.entitlementKeyId = $util.newBuffer([]);
    
                /**
                 * EntitledKey keyId.
                 * @member {Uint8Array} keyId
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @instance
                 */
                EntitledKey.prototype.keyId = $util.newBuffer([]);
    
                /**
                 * EntitledKey key.
                 * @member {Uint8Array} key
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @instance
                 */
                EntitledKey.prototype.key = $util.newBuffer([]);
    
                /**
                 * EntitledKey iv.
                 * @member {Uint8Array} iv
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @instance
                 */
                EntitledKey.prototype.iv = $util.newBuffer([]);
    
                /**
                 * EntitledKey entitlementKeySizeBytes.
                 * @member {number} entitlementKeySizeBytes
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @instance
                 */
                EntitledKey.prototype.entitlementKeySizeBytes = 32;
    
                /**
                 * Creates a new EntitledKey instance using the specified properties.
                 * @function create
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @static
                 * @param {license_protocol.WidevinePsshData.IEntitledKey=} [properties] Properties to set
                 * @returns {license_protocol.WidevinePsshData.EntitledKey} EntitledKey instance
                 */
                EntitledKey.create = function create(properties) {
                    return new EntitledKey(properties);
                };
    
                /**
                 * Encodes the specified EntitledKey message. Does not implicitly {@link license_protocol.WidevinePsshData.EntitledKey.verify|verify} messages.
                 * @function encode
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @static
                 * @param {license_protocol.WidevinePsshData.IEntitledKey} message EntitledKey message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EntitledKey.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.entitlementKeyId != null && Object.hasOwnProperty.call(message, "entitlementKeyId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.entitlementKeyId);
                    if (message.keyId != null && Object.hasOwnProperty.call(message, "keyId"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.keyId);
                    if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                        writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.key);
                    if (message.iv != null && Object.hasOwnProperty.call(message, "iv"))
                        writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.iv);
                    if (message.entitlementKeySizeBytes != null && Object.hasOwnProperty.call(message, "entitlementKeySizeBytes"))
                        writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.entitlementKeySizeBytes);
                    return writer;
                };
    
                /**
                 * Encodes the specified EntitledKey message, length delimited. Does not implicitly {@link license_protocol.WidevinePsshData.EntitledKey.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @static
                 * @param {license_protocol.WidevinePsshData.IEntitledKey} message EntitledKey message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EntitledKey.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an EntitledKey message from the specified reader or buffer.
                 * @function decode
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {license_protocol.WidevinePsshData.EntitledKey} EntitledKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EntitledKey.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.WidevinePsshData.EntitledKey();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.entitlementKeyId = reader.bytes();
                                break;
                            }
                        case 2: {
                                message.keyId = reader.bytes();
                                break;
                            }
                        case 3: {
                                message.key = reader.bytes();
                                break;
                            }
                        case 4: {
                                message.iv = reader.bytes();
                                break;
                            }
                        case 5: {
                                message.entitlementKeySizeBytes = reader.uint32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an EntitledKey message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {license_protocol.WidevinePsshData.EntitledKey} EntitledKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EntitledKey.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an EntitledKey message.
                 * @function verify
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                EntitledKey.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.entitlementKeyId != null && message.hasOwnProperty("entitlementKeyId"))
                        if (!(message.entitlementKeyId && typeof message.entitlementKeyId.length === "number" || $util.isString(message.entitlementKeyId)))
                            return "entitlementKeyId: buffer expected";
                    if (message.keyId != null && message.hasOwnProperty("keyId"))
                        if (!(message.keyId && typeof message.keyId.length === "number" || $util.isString(message.keyId)))
                            return "keyId: buffer expected";
                    if (message.key != null && message.hasOwnProperty("key"))
                        if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                            return "key: buffer expected";
                    if (message.iv != null && message.hasOwnProperty("iv"))
                        if (!(message.iv && typeof message.iv.length === "number" || $util.isString(message.iv)))
                            return "iv: buffer expected";
                    if (message.entitlementKeySizeBytes != null && message.hasOwnProperty("entitlementKeySizeBytes"))
                        if (!$util.isInteger(message.entitlementKeySizeBytes))
                            return "entitlementKeySizeBytes: integer expected";
                    return null;
                };
    
                /**
                 * Creates an EntitledKey message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {license_protocol.WidevinePsshData.EntitledKey} EntitledKey
                 */
                EntitledKey.fromObject = function fromObject(object) {
                    if (object instanceof $root.license_protocol.WidevinePsshData.EntitledKey)
                        return object;
                    var message = new $root.license_protocol.WidevinePsshData.EntitledKey();
                    if (object.entitlementKeyId != null)
                        if (typeof object.entitlementKeyId === "string")
                            $util.base64.decode(object.entitlementKeyId, message.entitlementKeyId = $util.newBuffer($util.base64.length(object.entitlementKeyId)), 0);
                        else if (object.entitlementKeyId.length >= 0)
                            message.entitlementKeyId = object.entitlementKeyId;
                    if (object.keyId != null)
                        if (typeof object.keyId === "string")
                            $util.base64.decode(object.keyId, message.keyId = $util.newBuffer($util.base64.length(object.keyId)), 0);
                        else if (object.keyId.length >= 0)
                            message.keyId = object.keyId;
                    if (object.key != null)
                        if (typeof object.key === "string")
                            $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                        else if (object.key.length >= 0)
                            message.key = object.key;
                    if (object.iv != null)
                        if (typeof object.iv === "string")
                            $util.base64.decode(object.iv, message.iv = $util.newBuffer($util.base64.length(object.iv)), 0);
                        else if (object.iv.length >= 0)
                            message.iv = object.iv;
                    if (object.entitlementKeySizeBytes != null)
                        message.entitlementKeySizeBytes = object.entitlementKeySizeBytes >>> 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from an EntitledKey message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @static
                 * @param {license_protocol.WidevinePsshData.EntitledKey} message EntitledKey
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                EntitledKey.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.entitlementKeyId = "";
                        else {
                            object.entitlementKeyId = [];
                            if (options.bytes !== Array)
                                object.entitlementKeyId = $util.newBuffer(object.entitlementKeyId);
                        }
                        if (options.bytes === String)
                            object.keyId = "";
                        else {
                            object.keyId = [];
                            if (options.bytes !== Array)
                                object.keyId = $util.newBuffer(object.keyId);
                        }
                        if (options.bytes === String)
                            object.key = "";
                        else {
                            object.key = [];
                            if (options.bytes !== Array)
                                object.key = $util.newBuffer(object.key);
                        }
                        if (options.bytes === String)
                            object.iv = "";
                        else {
                            object.iv = [];
                            if (options.bytes !== Array)
                                object.iv = $util.newBuffer(object.iv);
                        }
                        object.entitlementKeySizeBytes = 32;
                    }
                    if (message.entitlementKeyId != null && message.hasOwnProperty("entitlementKeyId"))
                        object.entitlementKeyId = options.bytes === String ? $util.base64.encode(message.entitlementKeyId, 0, message.entitlementKeyId.length) : options.bytes === Array ? Array.prototype.slice.call(message.entitlementKeyId) : message.entitlementKeyId;
                    if (message.keyId != null && message.hasOwnProperty("keyId"))
                        object.keyId = options.bytes === String ? $util.base64.encode(message.keyId, 0, message.keyId.length) : options.bytes === Array ? Array.prototype.slice.call(message.keyId) : message.keyId;
                    if (message.key != null && message.hasOwnProperty("key"))
                        object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
                    if (message.iv != null && message.hasOwnProperty("iv"))
                        object.iv = options.bytes === String ? $util.base64.encode(message.iv, 0, message.iv.length) : options.bytes === Array ? Array.prototype.slice.call(message.iv) : message.iv;
                    if (message.entitlementKeySizeBytes != null && message.hasOwnProperty("entitlementKeySizeBytes"))
                        object.entitlementKeySizeBytes = message.entitlementKeySizeBytes;
                    return object;
                };
    
                /**
                 * Converts this EntitledKey to JSON.
                 * @function toJSON
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                EntitledKey.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * Gets the default type url for EntitledKey
                 * @function getTypeUrl
                 * @memberof license_protocol.WidevinePsshData.EntitledKey
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                EntitledKey.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/license_protocol.WidevinePsshData.EntitledKey";
                };
    
                return EntitledKey;
            })();
    
            /**
             * Deprecated Fields  ////////////////////////////
             * @name license_protocol.WidevinePsshData.Algorithm
             * @enum {number}
             * @property {number} UNENCRYPTED=0 UNENCRYPTED value
             * @property {number} AESCTR=1 AESCTR value
             */
            WidevinePsshData.Algorithm = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNENCRYPTED"] = 0;
                values[valuesById[1] = "AESCTR"] = 1;
                return values;
            })();
    
            return WidevinePsshData;
        })();
    
        license_protocol.FileHashes = (function() {
    
            /**
             * Properties of a FileHashes.
             * @memberof license_protocol
             * @interface IFileHashes
             * @property {Uint8Array|null} [signer] FileHashes signer
             * @property {Array.<license_protocol.FileHashes.ISignature>|null} [signatures] FileHashes signatures
             */
    
            /**
             * Constructs a new FileHashes.
             * @memberof license_protocol
             * @classdesc Represents a FileHashes.
             * @implements IFileHashes
             * @constructor
             * @param {license_protocol.IFileHashes=} [properties] Properties to set
             */
            function FileHashes(properties) {
                this.signatures = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * FileHashes signer.
             * @member {Uint8Array} signer
             * @memberof license_protocol.FileHashes
             * @instance
             */
            FileHashes.prototype.signer = $util.newBuffer([]);
    
            /**
             * FileHashes signatures.
             * @member {Array.<license_protocol.FileHashes.ISignature>} signatures
             * @memberof license_protocol.FileHashes
             * @instance
             */
            FileHashes.prototype.signatures = $util.emptyArray;
    
            /**
             * Creates a new FileHashes instance using the specified properties.
             * @function create
             * @memberof license_protocol.FileHashes
             * @static
             * @param {license_protocol.IFileHashes=} [properties] Properties to set
             * @returns {license_protocol.FileHashes} FileHashes instance
             */
            FileHashes.create = function create(properties) {
                return new FileHashes(properties);
            };
    
            /**
             * Encodes the specified FileHashes message. Does not implicitly {@link license_protocol.FileHashes.verify|verify} messages.
             * @function encode
             * @memberof license_protocol.FileHashes
             * @static
             * @param {license_protocol.IFileHashes} message FileHashes message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileHashes.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.signer != null && Object.hasOwnProperty.call(message, "signer"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.signer);
                if (message.signatures != null && message.signatures.length)
                    for (var i = 0; i < message.signatures.length; ++i)
                        $root.license_protocol.FileHashes.Signature.encode(message.signatures[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified FileHashes message, length delimited. Does not implicitly {@link license_protocol.FileHashes.verify|verify} messages.
             * @function encodeDelimited
             * @memberof license_protocol.FileHashes
             * @static
             * @param {license_protocol.IFileHashes} message FileHashes message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileHashes.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a FileHashes message from the specified reader or buffer.
             * @function decode
             * @memberof license_protocol.FileHashes
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {license_protocol.FileHashes} FileHashes
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FileHashes.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.FileHashes();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.signer = reader.bytes();
                            break;
                        }
                    case 2: {
                            if (!(message.signatures && message.signatures.length))
                                message.signatures = [];
                            message.signatures.push($root.license_protocol.FileHashes.Signature.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a FileHashes message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof license_protocol.FileHashes
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {license_protocol.FileHashes} FileHashes
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FileHashes.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a FileHashes message.
             * @function verify
             * @memberof license_protocol.FileHashes
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FileHashes.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.signer != null && message.hasOwnProperty("signer"))
                    if (!(message.signer && typeof message.signer.length === "number" || $util.isString(message.signer)))
                        return "signer: buffer expected";
                if (message.signatures != null && message.hasOwnProperty("signatures")) {
                    if (!Array.isArray(message.signatures))
                        return "signatures: array expected";
                    for (var i = 0; i < message.signatures.length; ++i) {
                        var error = $root.license_protocol.FileHashes.Signature.verify(message.signatures[i]);
                        if (error)
                            return "signatures." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a FileHashes message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof license_protocol.FileHashes
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {license_protocol.FileHashes} FileHashes
             */
            FileHashes.fromObject = function fromObject(object) {
                if (object instanceof $root.license_protocol.FileHashes)
                    return object;
                var message = new $root.license_protocol.FileHashes();
                if (object.signer != null)
                    if (typeof object.signer === "string")
                        $util.base64.decode(object.signer, message.signer = $util.newBuffer($util.base64.length(object.signer)), 0);
                    else if (object.signer.length >= 0)
                        message.signer = object.signer;
                if (object.signatures) {
                    if (!Array.isArray(object.signatures))
                        throw TypeError(".license_protocol.FileHashes.signatures: array expected");
                    message.signatures = [];
                    for (var i = 0; i < object.signatures.length; ++i) {
                        if (typeof object.signatures[i] !== "object")
                            throw TypeError(".license_protocol.FileHashes.signatures: object expected");
                        message.signatures[i] = $root.license_protocol.FileHashes.Signature.fromObject(object.signatures[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a FileHashes message. Also converts values to other types if specified.
             * @function toObject
             * @memberof license_protocol.FileHashes
             * @static
             * @param {license_protocol.FileHashes} message FileHashes
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FileHashes.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.signatures = [];
                if (options.defaults)
                    if (options.bytes === String)
                        object.signer = "";
                    else {
                        object.signer = [];
                        if (options.bytes !== Array)
                            object.signer = $util.newBuffer(object.signer);
                    }
                if (message.signer != null && message.hasOwnProperty("signer"))
                    object.signer = options.bytes === String ? $util.base64.encode(message.signer, 0, message.signer.length) : options.bytes === Array ? Array.prototype.slice.call(message.signer) : message.signer;
                if (message.signatures && message.signatures.length) {
                    object.signatures = [];
                    for (var j = 0; j < message.signatures.length; ++j)
                        object.signatures[j] = $root.license_protocol.FileHashes.Signature.toObject(message.signatures[j], options);
                }
                return object;
            };
    
            /**
             * Converts this FileHashes to JSON.
             * @function toJSON
             * @memberof license_protocol.FileHashes
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FileHashes.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for FileHashes
             * @function getTypeUrl
             * @memberof license_protocol.FileHashes
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            FileHashes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/license_protocol.FileHashes";
            };
    
            FileHashes.Signature = (function() {
    
                /**
                 * Properties of a Signature.
                 * @memberof license_protocol.FileHashes
                 * @interface ISignature
                 * @property {string|null} [filename] Signature filename
                 * @property {boolean|null} [testSigning] Signature testSigning
                 * @property {Uint8Array|null} [SHA512Hash] Signature SHA512Hash
                 * @property {boolean|null} [mainExe] Signature mainExe
                 * @property {Uint8Array|null} [signature] Signature signature
                 */
    
                /**
                 * Constructs a new Signature.
                 * @memberof license_protocol.FileHashes
                 * @classdesc Represents a Signature.
                 * @implements ISignature
                 * @constructor
                 * @param {license_protocol.FileHashes.ISignature=} [properties] Properties to set
                 */
                function Signature(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Signature filename.
                 * @member {string} filename
                 * @memberof license_protocol.FileHashes.Signature
                 * @instance
                 */
                Signature.prototype.filename = "";
    
                /**
                 * Signature testSigning.
                 * @member {boolean} testSigning
                 * @memberof license_protocol.FileHashes.Signature
                 * @instance
                 */
                Signature.prototype.testSigning = false;
    
                /**
                 * Signature SHA512Hash.
                 * @member {Uint8Array} SHA512Hash
                 * @memberof license_protocol.FileHashes.Signature
                 * @instance
                 */
                Signature.prototype.SHA512Hash = $util.newBuffer([]);
    
                /**
                 * Signature mainExe.
                 * @member {boolean} mainExe
                 * @memberof license_protocol.FileHashes.Signature
                 * @instance
                 */
                Signature.prototype.mainExe = false;
    
                /**
                 * Signature signature.
                 * @member {Uint8Array} signature
                 * @memberof license_protocol.FileHashes.Signature
                 * @instance
                 */
                Signature.prototype.signature = $util.newBuffer([]);
    
                /**
                 * Creates a new Signature instance using the specified properties.
                 * @function create
                 * @memberof license_protocol.FileHashes.Signature
                 * @static
                 * @param {license_protocol.FileHashes.ISignature=} [properties] Properties to set
                 * @returns {license_protocol.FileHashes.Signature} Signature instance
                 */
                Signature.create = function create(properties) {
                    return new Signature(properties);
                };
    
                /**
                 * Encodes the specified Signature message. Does not implicitly {@link license_protocol.FileHashes.Signature.verify|verify} messages.
                 * @function encode
                 * @memberof license_protocol.FileHashes.Signature
                 * @static
                 * @param {license_protocol.FileHashes.ISignature} message Signature message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Signature.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.filename != null && Object.hasOwnProperty.call(message, "filename"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.filename);
                    if (message.testSigning != null && Object.hasOwnProperty.call(message, "testSigning"))
                        writer.uint32(/* id 2, wireType 0 =*/16).bool(message.testSigning);
                    if (message.SHA512Hash != null && Object.hasOwnProperty.call(message, "SHA512Hash"))
                        writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.SHA512Hash);
                    if (message.mainExe != null && Object.hasOwnProperty.call(message, "mainExe"))
                        writer.uint32(/* id 4, wireType 0 =*/32).bool(message.mainExe);
                    if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                        writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.signature);
                    return writer;
                };
    
                /**
                 * Encodes the specified Signature message, length delimited. Does not implicitly {@link license_protocol.FileHashes.Signature.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof license_protocol.FileHashes.Signature
                 * @static
                 * @param {license_protocol.FileHashes.ISignature} message Signature message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Signature.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Signature message from the specified reader or buffer.
                 * @function decode
                 * @memberof license_protocol.FileHashes.Signature
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {license_protocol.FileHashes.Signature} Signature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Signature.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.license_protocol.FileHashes.Signature();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.filename = reader.string();
                                break;
                            }
                        case 2: {
                                message.testSigning = reader.bool();
                                break;
                            }
                        case 3: {
                                message.SHA512Hash = reader.bytes();
                                break;
                            }
                        case 4: {
                                message.mainExe = reader.bool();
                                break;
                            }
                        case 5: {
                                message.signature = reader.bytes();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Signature message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof license_protocol.FileHashes.Signature
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {license_protocol.FileHashes.Signature} Signature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Signature.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Signature message.
                 * @function verify
                 * @memberof license_protocol.FileHashes.Signature
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Signature.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.filename != null && message.hasOwnProperty("filename"))
                        if (!$util.isString(message.filename))
                            return "filename: string expected";
                    if (message.testSigning != null && message.hasOwnProperty("testSigning"))
                        if (typeof message.testSigning !== "boolean")
                            return "testSigning: boolean expected";
                    if (message.SHA512Hash != null && message.hasOwnProperty("SHA512Hash"))
                        if (!(message.SHA512Hash && typeof message.SHA512Hash.length === "number" || $util.isString(message.SHA512Hash)))
                            return "SHA512Hash: buffer expected";
                    if (message.mainExe != null && message.hasOwnProperty("mainExe"))
                        if (typeof message.mainExe !== "boolean")
                            return "mainExe: boolean expected";
                    if (message.signature != null && message.hasOwnProperty("signature"))
                        if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                            return "signature: buffer expected";
                    return null;
                };
    
                /**
                 * Creates a Signature message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof license_protocol.FileHashes.Signature
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {license_protocol.FileHashes.Signature} Signature
                 */
                Signature.fromObject = function fromObject(object) {
                    if (object instanceof $root.license_protocol.FileHashes.Signature)
                        return object;
                    var message = new $root.license_protocol.FileHashes.Signature();
                    if (object.filename != null)
                        message.filename = String(object.filename);
                    if (object.testSigning != null)
                        message.testSigning = Boolean(object.testSigning);
                    if (object.SHA512Hash != null)
                        if (typeof object.SHA512Hash === "string")
                            $util.base64.decode(object.SHA512Hash, message.SHA512Hash = $util.newBuffer($util.base64.length(object.SHA512Hash)), 0);
                        else if (object.SHA512Hash.length >= 0)
                            message.SHA512Hash = object.SHA512Hash;
                    if (object.mainExe != null)
                        message.mainExe = Boolean(object.mainExe);
                    if (object.signature != null)
                        if (typeof object.signature === "string")
                            $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                        else if (object.signature.length >= 0)
                            message.signature = object.signature;
                    return message;
                };
    
                /**
                 * Creates a plain object from a Signature message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof license_protocol.FileHashes.Signature
                 * @static
                 * @param {license_protocol.FileHashes.Signature} message Signature
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Signature.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.filename = "";
                        object.testSigning = false;
                        if (options.bytes === String)
                            object.SHA512Hash = "";
                        else {
                            object.SHA512Hash = [];
                            if (options.bytes !== Array)
                                object.SHA512Hash = $util.newBuffer(object.SHA512Hash);
                        }
                        object.mainExe = false;
                        if (options.bytes === String)
                            object.signature = "";
                        else {
                            object.signature = [];
                            if (options.bytes !== Array)
                                object.signature = $util.newBuffer(object.signature);
                        }
                    }
                    if (message.filename != null && message.hasOwnProperty("filename"))
                        object.filename = message.filename;
                    if (message.testSigning != null && message.hasOwnProperty("testSigning"))
                        object.testSigning = message.testSigning;
                    if (message.SHA512Hash != null && message.hasOwnProperty("SHA512Hash"))
                        object.SHA512Hash = options.bytes === String ? $util.base64.encode(message.SHA512Hash, 0, message.SHA512Hash.length) : options.bytes === Array ? Array.prototype.slice.call(message.SHA512Hash) : message.SHA512Hash;
                    if (message.mainExe != null && message.hasOwnProperty("mainExe"))
                        object.mainExe = message.mainExe;
                    if (message.signature != null && message.hasOwnProperty("signature"))
                        object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
                    return object;
                };
    
                /**
                 * Converts this Signature to JSON.
                 * @function toJSON
                 * @memberof license_protocol.FileHashes.Signature
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Signature.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                /**
                 * Gets the default type url for Signature
                 * @function getTypeUrl
                 * @memberof license_protocol.FileHashes.Signature
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Signature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/license_protocol.FileHashes.Signature";
                };
    
                return Signature;
            })();
    
            return FileHashes;
        })();
    
        return license_protocol;
    })();

    return $root;
})(protobuf);

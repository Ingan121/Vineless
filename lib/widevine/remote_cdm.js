export class RemoteCdm {
    constructor(device_type, system_id, security_level, host, secret, device_name) {
        this.device_type = device_type;
        this.system_id = system_id;
        this.security_level = security_level;
        this.host = host;
        this.secret = secret;
        this.device_name = device_name;
    }

    static from_object(obj) {
        return new RemoteCdm(
            obj.device_type,
            obj.system_id,
            obj.security_level,
            obj.host,
            obj.secret,
            obj.device_name ?? obj.name,
        );
    }

    get_name() {
        const type = this.device_type === "CHROME" ? "CHROME" : `L${this.security_level}`
        return `[${type}] ${this.host}/${this.device_name} (${this.system_id})`;
    }

    async open() {
        const open_request = await fetch(
            `${this.host}/${this.device_name}/open`,
            {
                method: 'GET',
            }
        );
        console.log("[Vineless]", "REMOTE_CDM", "OPEN", open_request.status);
        const open_json = await open_request.json();

        return open_json.data.session_id;
    }

    async close(session_id) {
        const close_request = await fetch(
            `${this.host}/${this.device_name}/close/${session_id}`,
            {
                method: 'GET',
            }
        );
        console.log("[Vineless]", "REMOTE_CDM", "CLOSE", close_request.status);
    }

    // TODO:
    //   + get_service_certificate
    //   + set_service_certificate

    async get_license_challenge(session_id, pssh, privacy_mode) {
        const license_request = await fetch(
            `${this.host}/${this.device_name}/get_license_challenge/STREAMING`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    session_id: session_id,
                    init_data: pssh,
                    privacy_mode: privacy_mode
                })
            }
        )
        console.log("[Vineless]", "REMOTE_CDM", "GET_LICENSE_CHALLENGE", license_request.status);
        const license_request_json = await license_request.json();

        return license_request_json.data.challenge_b64;
    }

    async parse_license(session_id, license_b64) {
        const license = await fetch(
            `${this.host}/${this.device_name}/parse_license`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    session_id: session_id,
                    license_message: license_b64
                })
            }
        )
        console.log("[Vineless]", "REMOTE_CDM", "PARSE_LICENSE", license.status);
    }

    async get_keys(session_id, type) {
        const key_request = await fetch(
            `${this.host}/${this.device_name}/get_keys/${type}`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    session_id: session_id
                })
            }
        )
        console.log("[Vineless]", "REMOTE_CDM", "GET_KEYS", key_request.status);
        const key_request_json = await key_request.json();

        return key_request_json.data.keys;
    }
}
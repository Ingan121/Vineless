// Stupid example custom handler that just hardcodes everything
// Don't use it, please.

// Default values are for https://reference.dashif.org/dash.js/latest/samples/drm/widevine.html

export default class HardcodedDevice {
    constructor(host, keySystem, sessionId, tab) {
        this.host = host;
        this.keySystem = keySystem;
        this.sessionId = sessionId;
        this.tab = tab;
    }

    async generateChallenge(pssh) {
        const challengeB64 = "CAES2A4KiA4IARKBCgrBAggCEiBttxwCmSgwbjwQ2zlHdERS+rHgVG9ZeDagqUxltJc8phj70/qwBiKOAjCCAQoCggEBAOpt50IEyOxI7GVJQ0B1UWF55ORUXQDynDCezUSFO4QsEf5hM2Qtmw9Vyujk9EPncV415IkuyO1lYkgcZr94TeZYMKSkT560y0FADshvyNfRFBu5+ib90er34swD+EOkjPrwkiERz43UCTVe" +
        "FfB24TxC1nV/n4HpyMkaFHVejxMdjIUouoLdl3Rd2501om/SMCBlCRzjJahI/0/+wEG9Ly+9+uP3eVAb63WOtD40F9DTeX4d98ZdZQzg0l+BAqVAEwEcVRQKlsEoXFk1yggu0RPN7mqGs1VhzxCMjp0P8gzkXTBOrNh+RffplGxoUzuxZzMcUHmTOek5RI70Hiq1UY0CAwEAASi9sAFIARKAAll91kCVLvPDxJC9x/AF+al/Hz8PBzqr0DxtGiEZj" +
        "nxkvRQDDL6H9Iftz7/0HVKMwvt7MCitWZYjT2Lv0adMhwEmx3dGK+oXnJS2ig6PO/w6iH8+U4K0zd8nqEY1CvIzhLd2nKKKGpZm3EqL+AXhVEAusavu7XtJ3fYT+b1cgohujultiIPqAcKhTGND8pIXBxVB3gNzQ3eRQ91OoSCxvs2Zu+ABubt6C7CmkPcZEgtJQKvCHa3OFIwvVjpeiJ+ieH823l0mzKgEjXiN5hGgWX+UoHO7aNCxMmA27ggWaT" +
        "LgbIDQ5UaItxXcw5S7Uc0n/llK5z7leOtlNZQst/sxyhIatwUKsQIIARIQRIFuOL9Iss7LvBSYxuAWfhjS4+2EBiKOAjCCAQoCggEBAMhkrbZ++0BWv3ecM2jOixUZ5TDKEFqivM9gnW6IODk4aXJ/0dE0lMo/EjcX3svSjvZCH9wvNq3pykGUrS8TD3ZcMPQLKr2qUq2lGEsyYXKtNVe9A22ak3cX9QQsND0/2tRhPThIv0vgj4A7aafyTZWlktW" +
        "ToTkqNqK8uqxXMRn9jKZgzO0BCul8i7j+yhsvAHedH1hHeAX77MBYCwf75wds0Uu10sG17FV6im28V0uVscQ2UyfA3N1E0LsypVf1Zm/ZxyhLgvjVxSpPb+O7TEIZa4Yw/ObOlRLVGZboWiOz/hp8QnREvJfkgeaUEfhPcThlqusrg+TmP18j6fiYbN8CAwEAASi9sAFIARKAA2PlkgEPBq+hEbSGJbFLF2TF6CIzLRpFKbBlilLiqMf76Gk/E24C" +
        "y1Yo6TqigkucXpvzM6aAa3Qk//e8N34csXSQTsBNIyS8z/IvaEE6k5rrZhk5EO7kqW5aiOBTdFuzHTdEKjFyH37Jrg7TZI+R6UduDJf4MOY75NdXWw/74Eo2ua2zXaQOe2LejY/sg8AkFj5yV1YU7dwO54znxHyRfk/L4XaoQDt509Qsmf6+DBhWG5DpQxxDYxL45fdQYIqJU+5UsLhTzZWVzAQyV5Cevc9Xa1fZJ/GY2V0Q+CZWFk+FZbRln/yW8" +
        "i9PDbARTNTmX+OIEJk1sHatdb6yhxMXKKuElS+nI0sDGZkkU8bOAnX3mNoyccNirCdiI6+qsPR46YvK2Wa6fJ2YCGYZ97T6cu2sqRRHXdwsZhBYJ/0ffANXxEtwe56KSP4x+2u3ALNGs+8UNAc9zZN5YofBgxDxKvRbzEQx3lv5ZA6Tfd7BJ8aLU6xPJN9PRXfFfxl0T+j2EBomChBhcHBsaWNhdGlvbl9uYW1lEhJjb20uYW5kcm9pZC5jaHJvbW" +
        "UaTgoecGFja2FnZV9jZXJ0aWZpY2F0ZV9oYXNoX2J5dGVzEiw4UDFzVzBFUEpjc2x3N1V6UnNpWEw2NHcrTzUwRWQrUkJJQ3RheTFnMjRNPRoXCgxjb21wYW55X25hbWUSB3NhbXN1bmcaFgoKbW9kZWxfbmFtZRIIU00tQTAyNUcaIAoRYXJjaGl0ZWN0dXJlX25hbWUSC2FybWVhYmktdjdhGhMKC2RldmljZV9uYW1lEgRhMDJxGhkKDHByb2R" +
        "1Y3RfbmFtZRIJYTAycW5hZWVhGlcKCmJ1aWxkX2luZm8SSXNhbXN1bmcvYTAycW5hZWVhL2EwMnE6MTIvU1AxQS4yMTA4MTIuMDE2L0EwMjVHWFhVNUNWSzE6dXNlci9yZWxlYXNlLWtleXMaHgoUd2lkZXZpbmVfY2RtX3ZlcnNpb24SBjE2LjAuMBokCh9vZW1fY3J5cHRvX3NlY3VyaXR5X3BhdGNoX2xldmVsEgEwGlAKHG9lbV9jcnlwdG9f" +
        "YnVpbGRfaW5mb3JtYXRpb24SME9FTUNyeXB0byBMZXZlbDMgQ29kZSAyMjU4OSBNYXkgMjggMjAyMSAxOTozNzoxOTIUCAEQASAAKBAwAEAASABQAVgAYAESPAo6ChQIARIQnrQFDeRLSAKTLifXUIPiZhABGiBmMGY5MGQ3NzRmNjEyMjIzMDEwMDAwMDAwMDAwMDAwMBgBIMLRysUGMBU4haiILhqAAqzESonqxmvkdmoDk89ih2Hz/BDfGtylH" +
        "u80jTu4/U1B2wMCz/RP5Ze5O5R7S2ewiKM0WYHPXmnKD3Dk/Mb4ri5RIxEUJvwc4RrwEhkb9nEqmbJ1Nmw8rtloYF1CNgyczHKRMs3t9DtllSi3AfkO7s4k+x+OHSXj06CBa2hjyNKhMYZOTP9yotXhGa2pQM2+skDuGDrTHRFRH+4McGBiRtI5MDtQzfE17wz3XkC2JzP2pXUiZLnRI1qSEfikkMEveFsW/vGl7Sj0rT+xl/yrWH66KZ4zXqg7mj" +
        "WNn+YtTN6Rbx0tUV8WLSbezQi+ILwUBPnpOE3kBCZWbX66u4pmzE4="

        return challengeB64;
    }

    async parseLicense(license) {
        return {
            type: "WIDEVINE",
            pssh: "AAAAXHBzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAADwSEDAvgN1BHkiGvKW7H4AYoCQSEDAvgN1BHkiGvKW7H4AYoCQSEDAvgN1BHkiGvKW7H4AYoCRI88aJmwY=",
            keys: [{
                kid: "9eb4050de44b4802932e27d75083e266",
                k: "166634c675823c235a4a9446fad52e4d"
            }, {
                kid: "302f80dd411e4886bca5bb1f8018a024",
                k: "15b2aaf906ebec6309d40f91289127b8"
            }]
        };
    }
}
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
        const challengeB64 = "CAESiQ8KkA4IARKBCgrBAggCEiAeGZ856l+5hRL8m1X4Egsev3VtXh8yQI0FDIIsjBi0iBiTiNm0BiKOAjCCAQoCggEBAKK1sQ7gKmM+1/Z5+ZoII5nJvfsR" +
        "lrwYJnTbknzlP5kSY8qqaAcvPT6oEuXOuXfFZhFlgswbD7q6WH13uEjaoR2/e/y9nwfE84GZYBWATyAIgU16kA1iC3lGVBtrqfo8a5MuQKu9h283bSe8kesQLlLvgHj+ss3H3zCWAno9X" +
        "/U0IF1rknyfT6mSO27kaoipJCCiI435k1Et+hc/y/YSpSIT8u06IrpBSbHmb1/3Yvw0aXZ0zciQrDZEl907TPleAs4VnBea0wV0yepRBR35q7s5/6Ys9h3aDPn6vBhoOeG8umv01mtATL" +
        "peu2wK2iKxPk5ouOj36E9Q37vTtLvqrK0CAwEAASi+sAFIARKAAiEXnvy008ZfDH6kSh17ZF/HwN3uFG3N68XFDHRl8EBP+uVyvEC+pNoY0muE5Y1eD2ERpDKVGRoFoEo2pB+BBuLF5Yq" +
        "Zgg/g5w8LONOkB3r8oOKg2OfYL1YLQrtt05fMw8wSpfrX24R9eBGbcGdfpKjhFdTSEB9Ev6U/QDpVJFb/AV+QEg8iuDH8f2F42+LHC0nK0ufjcTTiDqVLGnQ8BBW4+08UHxfCMoSzZmtn" +
        "kXz8hC8R7QMHF8xgdFjfB+XCQY/+vsa0gL8J9dUS7/zGGXeR2SpK7aHEojGKVIXi8f9SyKzC+3xp0Yf+2YSoJ+TQCmOdSIudxL4P4NWQCw87bCAatwUKsQIIARIQs8Hws/sDNP2x51BMI" +
        "8aGoRiA5O2EBiKOAjCCAQoCggEBALgkyxXICnd67k92i9M5fbbxha9LFLVfGeXifHu+j4dTjshaGgrue4Hqk8lzi2qIn0nPDUwCwJe3IsaYfRsNOelwHTSRHAnzLtVLTT/irK3/GrnP2k" +
        "MOeijT6XE1amk0j2uFwAzuJgcR4me867JeOZwG5X/L5waaLpaVhUqi0YbxN3Rql5SnKFFjXw2SfdOSWbRBCvG9RvMwn83trTWIXuM5eWRwE7+IAwbbfz4g6O3YttvMjhyEXf4eWom+9c9" +
        "oSi14yzjY/BiaPBWlO8w0cg75/AZxtxWFta0jmIz6I1Hgj5CkGlAePKH1mR+Eay/0BhrZMjo1GsTx20Era/DGf2UCAwEAASi+sAFIARKAA4qesHrrvHv9EyZ+OzXIxGcA9D8jrPBoHegd" +
        "tgMrZdJOZUTKy6p8K+Rbw7iG93merVwVHkEt6tUXTgKJIAv7atx94b6CtObQO44ovB7bITpwGatF9tYMjoE6QOVPVrtA1X1i3+w+X9DBsjgVSUMfoC+G5VIDigQIG5fZA+yf6YHKUcSZ5" +
        "5lIQ2zEbtPlTYfjkVMeq24sCtab0slUaCUoovMpDT/ftn+6OcSxwNwsqZypPejSo+LJiBcbEjfgxcSN4e7sHw3M6xN/t4lZy06Qc6AvcBt4f9f6acCb4K+1rOyPrYcWaxkzqJf7/oacar" +
        "tCdFaQZwwXl5IdBfZP6mZJHNbdbLZz+Ti/uHmVhgBEKwDgBu6+yVSIvBQhdY/T9SF1zdKDVdN9RV5Bz39Zb/y7C6FrLoNTgrnzmOgFI/mdC+07SUqBUkF49Q96rgaRFKwd1/zXEHaEWTM" +
        "T4V1cJuRbmF6bE8keVpz8/IOr2i4Y0ub1s4ywrDklpyyUuuG7/UqMkhosChBhcHBsaWNhdGlvbl9uYW1lEhhjb20uYml0bW92aW4uZGVtby5wbGF5ZXIaTgoecGFja2FnZV9jZXJ0aWZp" +
        "Y2F0ZV9oYXNoX2J5dGVzEixPYVVnZk5YZ0tkTFBRcHh0Ym11QlpvYmJpOExTT2VxVmRGYXJHVVNhVmdZPRoWCgxjb21wYW55X25hbWUSBlhpYW9taRoVCgptb2RlbF9uYW1lEgdSZWRta" +
        "SA3Gh4KEWFyY2hpdGVjdHVyZV9uYW1lEglhcm02NC12OGEaFgoLZGV2aWNlX25hbWUSB29uY2xpdGUaIQoMcHJvZHVjdF9uYW1lEhFhZnRlcmxpZmVfb25jbGl0ZRpSCgpidWlsZF9pbm" +
        "ZvEkR4aWFvbWkvb25jL29uYzo5L1BLUTEuMTgxMDIxLjAwMS9WMTEuMC4zLjAuUEZMTUlYTTp1c2VyL3JlbGVhc2Uta2V5cxoeChR3aWRldmluZV9jZG1fdmVyc2lvbhIGMTYuMC4wGiQ" +
        "KH29lbV9jcnlwdG9fc2VjdXJpdHlfcGF0Y2hfbGV2ZWwSATAaUAocb2VtX2NyeXB0b19idWlsZF9pbmZvcm1hdGlvbhIwT0VNQ3J5cHRvIExldmVsMyBDb2RlIDIyNTkwIE1heSAyOCAy" +
        "MDIxIDE5OjM3OjI1MhQIARABIAAoEDAAQABIAFABWABgARJkCmIKPBIQMC+A3UEeSIa8pbsfgBigJBIQMC+A3UEeSIa8pbsfgBigJBIQMC+A3UEeSIa8pbsfgBigJEjzxombBhABGiBCM" +
        "kVGRjgzRDAwMDAwMDAwMDEwMDAwMDAwMDAwMDAwMBgBIOjWpsUGMBU4gv705gUagAKgGa7HCj1nVcSid+O6Mo0b+hdY2MdLx7nhAEJ7HHPgVZJHnbYkozHjNtnDxJQGQ7kxNCSU1ln8kv" +
        "VItgctA2mR/5D3DdL1zQeCu0/wX2F0aRa8MTy6tFk0IhhElTXfSTmDiL3B0GYKp/YOLV1ox+dzIDVc3tFwLtHNA5OxEu72Y0cmzbsALXLk8ajobL2GLiL8b57cn8mo8CS9K6+p2OQYi2U" +
        "hp+ikLs6hQk9hFdlKxwSl12lZ3BtaJemvhBU7OvSjETFk5FKaZU4MwhkNVrx25PprEtYsM7EgDpwdRlE73l928YANtPP30cI2nFsLbVIXi6K8JLFIqyitalU6bM/E"

        return {
            challenge: challengeB64
        };
    }

    async parseLicense(body) {
        const log = {
            type: "WIDEVINE",
            pssh_data: "AAAAXHBzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAADwSEDAvgN1BHkiGvKW7H4AYoCQSEDAvgN1BHkiGvKW7H4AYoCQSEDAvgN1BHkiGvKW7H4AYoCRI88aJmwY=",
            keys: [{
                kid: "9eb4050de44b4802932e27d75083e266",
                k: "166634c675823c235a4a9446fad52e4d"
            }, {
                kid: "302f80dd411e4886bca5bb1f8018a024",
                k: "15b2aaf906ebec6309d40f91289127b8"
            }],
            timestamp: Math.floor(Date.now() / 1000),
        }

        return {
            pssh: log.pssh_data,
            log: log
        }
    }
}
let os = require('os');

class Utils {
    static toHex(value, padding) {
        return Number(value).toString(16).padStart(padding, '0');
    }

    static toAsciiStripNull(value) {
        return value.toString().replace(/\u0000/gi, '');
    }

    static matchSessionKeys(pair1, pair2) {
        return (pair1.sessionKey1 === pair2.sessionKey1) && (pair1.sessionKey2 === pair2.sessionKey2);
    }

    static fetchIPv4Address() {
        let network = os.networkInterfaces();
        let adapter = network['en0'];
        let ipv4    = adapter.filter(item => item.family === 'IPv4');
        return ipv4[0].address;
    }
}

module.exports = Utils;

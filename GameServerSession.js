// User define
let Config = require('./Config');
let Blowfish = require('./Blowfish');
let GameServerMethods = require('./GameServerMethods');
let GameClientMethods = require('./GameClientMethods');
let Utils = require('./Utils');

class GameServerSession {
    constructor(socket) {
        this.socket = socket;
    }

    sendData(data, encrypt = true) {
        let header = new Buffer.from([data.length + 2, 0x00]);

        this.socket.write(
            Buffer.concat([header, encrypt ? Blowfish.encrypt(data) : data]) // encryptedPacket
        )
    }

    receiveData(data) {
        let packet = new Buffer.from(data, 'binary').slice(2);

        // Opcodes
        switch (packet[0]) {
            case 0x00: // Protocol Version
                {
                    let data = GameClientMethods.protocolVersion(packet);

                    if (Config.protocolVersion === data.protocolVersion) {
                        this.sendData(GameServerMethods.CryptInit(), false);
                    }
                }
                break;

            default:
                console.log('GS:: unknown opcode 0x%s', Utils.toHex(packet[0], 2));
                break;
        }
    }
}

module.exports = GameServerSession;
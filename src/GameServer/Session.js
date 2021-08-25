let Actor         = invoke('GameServer/Actor/Actor');
let ClientRequest = invoke('GameServer/Request');
let Utils         = invoke('Utils');

class Session {
    constructor(socket) {
        this.socket  = socket;
        this.opcodes = Array(0xff).fill((_, decryptedPacket) => {
            fatalError('GameServer:: unknown opcode 0x%s', Utils.toHex(decryptedPacket[0], 2));
        });

        this.opcodes[0x00] = ClientRequest.protocolVersion;
        this.opcodes[0x01] = ClientRequest.moveToLocation;
        this.opcodes[0x03] = ClientRequest.enterWorld;
        this.opcodes[0x08] = ClientRequest.authoriseLogin;
        this.opcodes[0x09] = ClientRequest.logout;
        this.opcodes[0x0b] = ClientRequest.createNewChar;
        this.opcodes[0x0d] = ClientRequest.charSelected;
        this.opcodes[0x0e] = ClientRequest.charCreationScreen;
        this.opcodes[0x0f] = ClientRequest.showInventory;
        this.opcodes[0x1b] = ClientRequest.socialAction;
        this.opcodes[0x36] = ClientRequest.stopMove;
        this.opcodes[0x38] = ClientRequest.say;
        this.opcodes[0x46] = ClientRequest.restart;
        this.opcodes[0x48] = ClientRequest.validatePosition;
        this.opcodes[0x57] = ClientRequest.showBoard;
        this.opcodes[0x63] = ClientRequest.questList;
    }

    initPlayer() {
        this.player = new Actor();
    }

    receiveData(data) {
        let decryptedPacket = Buffer.from(data).slice(2);
        this.opcodes[decryptedPacket[0]](this, decryptedPacket);
    }

    sendData(data) {
        let header = Buffer.alloc(2);
        header.writeInt16LE(data.length + 2);

        this.socket.write(
            Buffer.concat([header, data])
        );
    }
}

module.exports = Session;
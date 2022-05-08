let ServerResponse = invoke('Server/Auth/Response');
let Opcodes        = invoke('Server/Auth/Opcodes');
let Blowfish       = invoke('Cipher/Blowfish');

class Session {
    constructor(socket) {
        this.socket = socket;

        // First handshake from `Server` to `Client`
        this.dataSend(
            ServerResponse.initLS(invoke('Config').authServer.protocol), true
        );
    }

    dataSend(data, encrypt = true) {
        //let xor = new XOR(0);
        //data = xor.encrypt(data);

        //let header = Buffer.alloc(2);
        //header.writeInt16LE(data.byteLength + 2);

        //this.socket.write(Buffer.concat([header, encrypt ? Blowfish.encrypt(data) : data]));

        data = Buffer.from([0xc2,0x00,0x91,0x9e,0xa4,0xdb,0xf7,0x7a,0xf9,0x64,0x48,0xa3,0x58,0xb1,0xfc,0x45,0x64,0x60,0xff,0x28,0xce,0xa5,0xf5,0x74,0x37,0xdc,0x00,0x03,0x62,0xa1,0xa3,0x24,0x74,0x33,0x37,0xa2,0x70,0x51,0x7f,0x97,0xd9,0x34,0xd8,0x5f,0x38,0xcc,0xe1,0x99,0x22,0x00,0xe2,0x80,0x5b,0x22,0xd5,0x9c,0xf9,0x73,0x86,0x74,0xfc,0xfc,0xd7,0x40,0x1b,0xd2,0x76,0x52,0xba,0xac,0x17,0xf6,0xa9,0x5c,0xa9,0x0e,0x76,0xe6,0x64,0x7e,0x0b,0x8f,0x51,0x58,0x8c,0xba,0x5c,0xff,0xf1,0x44,0x43,0xbf,0x7b,0x3f,0x36,0xaf,0x76,0xdd,0x0d,0x09,0xa9,0x81,0x9e,0x93,0xb6,0x83,0x2e,0x1b,0x40,0x29,0x6e,0x5f,0x4c,0xb4,0xfa,0x02,0x24,0xaf,0x20,0x6a,0x09,0x5d,0x5e,0x8e,0x26,0x7d,0x02,0x4c,0xfa,0xc5,0x89,0x12,0xc8,0x20,0x90,0xc7,0xc4,0x07,0xd3,0xd4,0xbe,0x21,0x5e,0x98,0xc4,0x43,0xcc,0x2d,0xf0,0x51,0xf0,0x92,0xeb,0x31,0x38,0xeb,0xea,0xc7,0x6e,0xe5,0x3f,0x52,0x56,0xaf,0xd8,0xec,0xfe,0xd0,0xc5,0x4a,0x87,0xe0,0x06,0x28,0xc7,0xc5,0x67,0x11,0xf1,0x31,0x94,0x7d,0x4b,0x2f,0x76,0x3e,0x20,0xd7,0xe6,0xb4,0x61,0x44,0xf3,0x66]);

        //invoke('Utils').dumpBuffer(Blowfish.decrypt(data.slice(2)));

        this.socket.write(data);
    }

    dataReceive(data) {
        let decryptedPacket = Blowfish.decrypt(Buffer.from(data).slice(2));
        Opcodes.table[decryptedPacket[0]](this, decryptedPacket);
    }
}

module.exports = Session;

class XOR {
    constructor(key) {
        this.key = new Int32Array(new ArrayBuffer(4));
        this.key[0] = key;
    }

    encrypt(data) {
        invoke('Utils').dumpBuffer(data);
        for (let i = 4; i < data.byteLength - 4; i += 4) {
            let next = data.readInt32LE(i);
            this.key[0] += next;
            next ^= this.key[0];
            data.writeInt32LE(next, i);
        }
        console.log(data.length);
        invoke('Utils').dumpBuffer(data);
        //data = Buffer.concat([data, Buffer.alloc(8)]);
        //data.writeInt32LE(this.key[0], 180);
        invoke('Utils').dumpBuffer(data);
        console.log(data.length);
        return data;
    }
}

let Config       = invoke('Config');
let ServerPacket = invoke('ServerPacket');

class ChroniclePacket extends ServerPacket {
    constructor(key, size) {
        super(size);

        // Combination of Chronicle 1 / Chronicle 2 packet codes
        this.values = {
              charSelected: [0x21, 0x15],
            charSelectInfo: [0x1f, 0x13],
             charTemplates: [0x23, 0x17],
                 questList: [0x98, 0x80],
                   sunrise: [0x28, 0x1c],
                  userInfo: [0x04, 0x04],
              versionCheck: [0x00, 0x00],
        };

        if (!key in this.values) {
            console.log('GS:: unknown chronicle packet code -> %s', key)
            process.exit();
        }

        // Write correct Chronicle packet code in buffer
        this.writeC(
            this.values[key][Config.client.chronicle - 1]
        );
    }
}

module.exports = ChroniclePacket;

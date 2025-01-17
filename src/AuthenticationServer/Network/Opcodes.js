const ClientRequest = invoke('AuthenticationServer/Network/Request');

// Establishes an `Opcode` table to handle client packets
const Opcodes = {
    table: (() => {
        const table = utils.tupleAlloc(0xff, (_, packet) => {
            utils.infoError('AuthServer', 'unknown Opcode 0x%s', utils.toHex(packet[0]));
        });

        table[0x00] = ClientRequest.authLogin;
        table[0x02] = ClientRequest.gameLogin;
        table[0x05] = ClientRequest.serverList;

        return table;
    })()
};

module.exports = Opcodes;

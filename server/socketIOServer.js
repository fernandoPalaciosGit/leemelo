var IO = require('socket.io'),
    SocketIOServer = function (server) {
        this.io = IO.listen(server);
    };

module.exports = SocketIOServer;
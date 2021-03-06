;(function () {
    'use strict';

    var IO = require('socket.io'),
        SocketIOServer = function (server) {
            this.io = IO.listen(server);
            this.io.sockets.on('connection', this.serverConnection.bind(this));
        };

    // Subscribe handler callbacks of all our client channels after first connect
    SocketIOServer.prototype.serverConnection = function (socket) {
        socket.emit('channel-server-connection', { msg: 'emit connection from server' });
        socket.on('channel-bookShow-startConnection', this.bookSeeStartConnection);
    };

    // CHANNEL CALLBACKS
    SocketIOServer.prototype.bookSeeStartConnection = function (data) {
        console.info(data.msg);
    };

    module.exports = SocketIOServer;
}());

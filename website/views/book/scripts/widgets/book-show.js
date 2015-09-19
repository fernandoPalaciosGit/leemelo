;(function (w, SocketClient) {
    'use strict';

    var BookShow = {
        socketClient : new SocketClient(),
        initalizeChannels: function () {
            var socket = this.socketClient;

            socket.io.on('channel-server-connection', socket.serverConnChannel.bind(socket));
        },
        init: function () {
            this.initalizeChannels();
        }
    };

    w.onload = BookShow.init.bind(BookShow);
}(window, window.SocketIOClient));

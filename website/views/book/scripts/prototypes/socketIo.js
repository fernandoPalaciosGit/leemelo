;(function (w, io, global) {
    'use strict';

    w.SocketIOClient = function () {
        this.global = global();
        this.io = io.connect(this.global.config.server);
    };

    w.SocketIOClient.prototype.serverConnChannel = function (data) {
        console.info(data.msg);
        this.io.emit('channel-bookShow-startConnection', { msg: 'emit connection from client' });
    };
}(window, io, window.Global));

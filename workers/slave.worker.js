/**
 * PROCESSING WORKER
 * Located server initialization in the slave worker
 */
;(function (){
    'use strict';
    
    var http = require('http'),
        mongoose = require('mongoose');

    var SlaveWorker = function (config, ExpressServer, SocketIOServer) {
        this.config = config || {};
        this.app = new ExpressServer(this.config);
        this.server = http.createServer(this.app.expressServer);
        this.socket = new SocketIOServer(this.server);
    };
    
    /**
     * Open connection to Mongoose, before open Express server
     */
    SlaveWorker.prototype.initalizeConnection = function () {
        var msgOpenCallback = this.config.msgOpenApp.bind(this.config),
            msgErrorCallback = console.error.bind(console, 'connection error:'),
            serverPort = this.config.server.port;
        
        mongoose.connect(this.config.getMongoPath());
        mongoose.connection
            .on('error', msgErrorCallback)
            .once('open', this.server.listen.bind(this.server, serverPort, msgOpenCallback));
    };

    module.exports = SlaveWorker;
}());
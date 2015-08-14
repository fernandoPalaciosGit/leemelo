/**
 * PROCESSING WORKER
 * Located server initialization in the slave worker
 */
;(function (){
    'use strict';
    
    var http = require('http'),
        mongoose = require('mongoose'),
        conf = require('./../server/conf'),
        ExpressServer = require('./../server/expressServer'),
        SocketIOServer = require('./../server/socketIOServer');

    var SlaveWorker = function () {
        this.config = conf;
        this.app = new ExpressServer(this.config);
        this.server = http.createServer(this.app.expressServer);
        this.socket = new SocketIOServer(this.server);
    };
    
    /**
     * Open connection to Mongoose
     */
    SlaveWorker.prototype.initalizeConnection = function () {
        mongoose.connect(this.config.getMongoPath());
        mongoose.connection
            .once('open', this.onOpenConnection.bind(this))
            .on('error', this.onErrorConnection.bind(this));
    };
    
    /**
     * Open connection to resver request and socket clients
     */
    SlaveWorker.prototype.onOpenConnection = function () {
        var serverPort = this.config.server.port,
            msgOpenCallback = this.config.msgOpenApp.bind(this.config);
        
        this.server.listen(serverPort, msgOpenCallback);
    };
    
    SlaveWorker.prototype.onErrorConnection = function (err) {
        console.error('%s : %s', err.name, err.message);
    };
    
    /**
     * Reuse the Aplication from Slave Worker by export it,
     * When the Master worker creates multiple process for execute our aplication
     * $nodemon app
     */
    if (module.parent) {
        module.exports = SlaveWorker;
    
    /**
     * $nodemon --debug workers\slave.worker
     */
    } else {
        var appWorker = new SlaveWorker();
        appWorker.initalizeConnection();
    }
}());
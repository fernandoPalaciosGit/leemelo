/**
 * The main aplication scritp run the Workers
 */
;(function () {
    'use strict';

    var conf = require('./server/conf'),
        ExpressServer = require('./server/expressServer'),
        SocketIOServer = require('./server/socketIOServer'),
        SlaveWorker = require('./workers/slave.worker'),
        appWorker = new SlaveWorker(conf, ExpressServer, SocketIOServer);
    
    appWorker.initalizeConnection();
}());
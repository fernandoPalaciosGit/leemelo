'use strict';

var http = require('http'),
    mongoose = require('mongoose'),
    conf = require('./server/conf'),
    mongooseUrl = [
        'mongodb:/',
        conf.mongoDB.host,
        conf.mongoDB.name].join('/'),
    ExpressServer = require('./server/expressServer'),
    SocketIOServer = require('./server/socketIOServer');

/**
 * Open connection to Mongoose, before open Express server
 */
mongoose.connect(mongooseUrl);
mongoose.connection
    .on('error', console.error.bind(null, 'connection error:'))
    .once('open', function () {
        var app = new ExpressServer(conf),
            server = http.createServer(app.expressServer),
            socket = new SocketIOServer(server);
        
        server.listen(conf.port, conf.msgOpenApp.bind(conf));
    });
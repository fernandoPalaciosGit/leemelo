'use strict';

var http = require('http'),
    mongoose = require('mongoose'),
    conf = require('./server/conf'),
    mongooseUrl = [
        'mongodb:/',
        conf.mongoDB.host,
        conf.mongoDB.name].join('/'),
    ExpressServer = require('./server/expressServer');

/**
 * Open connection to Mongoose, before open Express server
 */
mongoose.connect(mongooseUrl);
mongoose.connection.once('open', function () {
    var app = new ExpressServer(conf),
        server = http.createServer(app.expressServer);
    
    server.listen(conf.port, conf.msgOpenApp.bind(conf));
});
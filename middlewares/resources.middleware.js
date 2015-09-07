/**
 * Middleware for  all resources required
 * @scope ExpressServer @see //server/expressServer.js
 */
module.exports = function () {
    'use strict';

    var path = require('path'),
        express = require('express'),
        faviconServer = require('serve-favicon'),
        assestPath = path.join(__dirname + './../static/'),
        bowerPath = path.join(__dirname + './../bower_components/');

    this.expressServer.use(express.static(assestPath));
    this.expressServer.use(faviconServer(assestPath + 'favicon.ico'));
    this.expressServer.use('/bower_components', express.static(bowerPath));
};

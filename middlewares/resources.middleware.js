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
        bowerPath = path.join(__dirname + './../bower_components/'),
        cssPath = path.join(__dirname + './../css/');

    this.expressServer.use(express.static(assestPath));
    this.expressServer.use(faviconServer(assestPath + 'favicon.ico'));
    this.expressServer.use('/bower_components', express.static(bowerPath));
    this.expressServer.use('/css', express.static(cssPath));
};

/**
 * Middleware for HTTP header properties
 * @scope ExpressServer @see //server/expressServer.js
 */
module.exports = function () {
    'use strict';

    var bodyParser = require('body-parser'),
        session = require('express-session');

    this.expressServer.use(session(this.conf.session));
    this.expressServer.use(bodyParser.json());
    this.expressServer.use(bodyParser.urlencoded({ extended: false }));
};

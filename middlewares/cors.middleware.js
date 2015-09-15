/**
 * Middleware for Enable Cross side origin server
 * @scope ExpressServer @see //server/expressServer.js
 */
module.exports = function () {
    'use strict';

    var cors = require('cors'),
        whitelist = [
            this.conf.getserverPath('serverDev'),
            this.conf.getserverPath('serverProd'),
            this.conf.getserverPath('serverTest')
        ],
        corsOptions = {
            // @var origin {string} path from client request
            origin: function (origin, callback) {
                var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
                callback(null, originIsWhitelisted);
            }
        };

    this.expressServer.use(cors(corsOptions));
};

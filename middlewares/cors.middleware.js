;(function () {
    'use strict';

    var cors = require('cors'),
        conf = require('./../server/conf'),
        whitelist = [
            conf.getserverPath('serverDev'),
            conf.getserverPath('serverProd'),
            conf.getserverPath('serverTest')
        ],
        corsOptions = {
            // @var origin {string} path from client request
            origin: function(origin, callback){
                var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
                callback(null, originIsWhitelisted);
            }
        };

    module.exports = cors(corsOptions);
}());

;(function () {
    'use strict';
    
    module.exports = {
        server: {
            protocol: 'http://',
            host: 'localhost',
            port: 3000
        },
        getserverPath: function () {
            var system = this.server; 
            return system.protocol + system.host + ':' + system.port;  
        },
        msgOpenApp: function () {
            console.log('Aplication listening on %s', this.getserverPath());
        },
        mongoDB: {
            protocol: 'mongodb://',
            host : 'localhost',
            db : 'leemelo'
        },
        getMongoPath: function () {
            var system = this.mongoDB; 
            return system.protocol + system.host + ':' + system.db;
        }
    };
}());
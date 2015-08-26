;(function () {
    'use strict';
    
    module.exports = {
        server: null,
        serverDev: {
            protocol: 'http://',
            host: 'localhost',
            port: 3000,
            env: process.env.NODE_ENV
        },
        serverProd: {
            protocol: 'http://',
            host: 'www.cruzalosdedos.es',
            port: 80,
            env: process.env.NODE_ENV
        },
        serverTest: {
            protocol: 'http://',
            host: 'localhost',
            port: 3999,
            env: process.env.NODE_ENV
        },
        getserverPath: function (s) {
            var server = this.server || this[s];
            return server.protocol + server.host + ':' + server.port;
        },
        msgOpenApp: function (s) {
            var server = this.server || this[s];
            console.log('Aplication listening on %s, %s environment', this.getserverPath(), server.env);
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
;(function () {
    'use strict';

    module.exports = {
        server: null, // current server running depending on NODE_ENV
        nodeRootPath: process.env.NODE_ROOT_PATH,
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
        session: {
            secret: 'leemelo-app-123-poweredby-fpl',
            name: 'sessionId', // name of the session ID cookie response
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 3600000, // after 1 hour, reset data and call req.session.touch()
                httpOnly: true,
                secure: false // cookies trusted for https
            }
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
            return system.protocol + system.host + '/' + system.db;
        }
    };
}());

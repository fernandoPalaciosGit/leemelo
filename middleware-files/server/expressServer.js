var express = require('express'),
    middlewares = require('../middlewares/admin'),
    ExpressServer = function (conf) {
        this.conf = conf || {};
        this.expressServer = express();
         
        // Middlewares
        for (var middleware in middlewares) {
            this.expressServer.use(middlewares[middleware]);
        }
        
        this.expressServer.get('/article/save', function (req, res, next) {
            res.send('loading....article/save');
        });
        this.expressServer.get('/article/list', function (req, res, next) {
            res.send('loading....article/list');
        });
    };

module.exports = ExpressServer;
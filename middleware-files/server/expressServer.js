'use strict';

var express = require('express'),
    middlewares = require('../middlewares/admin'),
    swig = require('swig'),
    ExpressServer = function (conf) {
        this.conf = conf || {};
        this.expressServer = express();
         
        // Middlewares
        for (var middleware in middlewares) {
            this.expressServer.use(middlewares[middleware]);
        }
        
        // Swig Templates
        this.expressServer.engine('html', swig.renderFile);
        this.expressServer.set('view engine', 'html'); // template of view
        this.expressServer.set('views', __dirname + './../website/views/templates'); // html templates paths
        
        // Routing
        this.expressServer.get('/article/save', function (req, res, next) {
            res.render('article_save', {name: 'Pocoyo'});
        });
        
        this.expressServer.get('/article/list', function (req, res, next) {
            res.send('loading....article/list');
        });
    };

module.exports = ExpressServer;
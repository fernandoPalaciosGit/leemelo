'use strict';

var env = process.env.NODE_ENV || 'production',
    express = require('express'),
    middlewares = require('../middlewares/admin'),
    swig = require('swig'),
    initExpressMiddlewares = function () {
        for (var middleware in middlewares) {
            this.expressServer.use(middlewares[middleware]);
        }
    },
    initExpressTemplates = function () {
        this.expressServer.engine('html', swig.renderFile);
        this.expressServer.set('view engine', 'html'); // template of view
        this.expressServer.set('views', __dirname + './../website/views/templates'); // html templates paths
        swig.setDefaults({varControls: ['[[', ']]']});
    },
    initExpressEnvironment = function () {
        // set environment into developer machine : `set NODE_ENV development`
        if (env === 'development') {
            // configurate template engine
            this.expressServer.set('view cache', false);
            swig.setDefaults({
                cache: false,
                varControls: ['[[', ']]']
            });
        }
    },
    initExpressRouting = function () {
        this.expressServer.get('/article/save', function (req, res) {
            res.render('article_save', {name: 'Pocoyo'});
        });
        
        this.expressServer.get('/article/list', function (req, res) {
            res.render('article_list', {});
        });        
    },
    ExpressServer = function (conf) {
        this.conf = conf || {};
        this.expressServer = express();   
        initExpressMiddlewares.bind(this);
        initExpressTemplates.bind(this);
        initExpressEnvironment.bind(this);
        initExpressRouting.bind(this);
    };

module.exports = ExpressServer;
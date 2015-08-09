;(function () {
    'use strict';
    
    var env = process.env.NODE_ENV || 'production',
        express = require('express'),
        middlewares = require('../middlewares/admin'),
        swig = require('swig'),
        router = require('../website/router'),
        routerControllers = [],
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
        // initialize all router resources
        initExpressRouting = function () {
            var routerConstructor, lastRouter, resources, resource; 
            
            for (routerConstructor in router) {
                // Instance All router controllers
                routerControllers.push(new router[routerConstructor]());
                lastRouter = routerControllers[routerControllers.length - 1];
                
                for (resources in lastRouter.constructor.prototype) {
                    // initialize all resources from controllers
                    resource = lastRouter[resources];
                    this.expressServer[resource.method](resource.url, resource.callback.bind(lastRouter));
                }
            }
        },
        ExpressServer = function (conf) {
            this.conf = conf || {};
            this.expressServer = express();
            initExpressMiddlewares.call(this);
            initExpressTemplates.call(this);
            initExpressEnvironment.call(this);
            initExpressRouting.call(this);
        };

    module.exports = ExpressServer;
}());
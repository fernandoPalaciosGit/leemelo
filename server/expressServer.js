 ;(function () {
    'use strict';
    
    var env = process.env.NODE_ENV || 'production',
        express = require('express'),
        swig = require('swig'),
        middlewares = require('../middlewares/admin'),
        routeList = require('../website/router'),
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
            var routerConstructor, router, resources, resource; 
            
            for (routerConstructor in routeList) {
                // Instance All router controllers
                router = new routeList[routerConstructor](this.conf);
                routerControllers.push(router);
                
                for (resources in router.constructor.prototype) {
                    // initialize all resources from controllers
                    resource = router[resources];
                    this.expressServer[resource.method](resource.url, resource.callback.bind(router));
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
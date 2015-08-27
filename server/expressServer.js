 ;(function () {
    'use strict';
    
    var env = process.env.NODE_ENV || 'production',
        express = require('express'),
        swig = require('swig'),
        middlewares = require('./../middlewares/admin'),
        routeList = require('./../website/controllers/router'),
        initExpressMiddlewares = function () {
            for (var middleware in middlewares) {
                this.expressServer.use(middlewares[middleware]);
            }
        },
        // configurate template engine and paths
        initExpressTemplates = function () {
            this.expressServer.engine('html', swig.renderFile);
            this.expressServer.set('view engine', 'html'); // template of view
            this.expressServer.set('views', [__dirname + './../website/views/book/templates']);
            this.expressServer.set('view cache', this.isProductionEnv);
            swig.setDefaults({
                cache: this.isProductionEnv ? 'memory' : false,
                varControls: ['[[', ']]']
            });
        },
        // initialize all router resources
        initExpressRouting = function () {
            var routerConstructor, router, resources, resource; 
            
            for (routerConstructor in routeList) {
                // Initialize Instance from all routeList controllers
                router = new routeList[routerConstructor](this.conf);
                
                // For our structure, throw routeList prototype objects, initialize all our resources
                for (resources in router.constructor.prototype) {
                    resource = router[resources];
                    this.expressServer[resource.method](resource.url, resource.callback.bind(router));
                }
            }
        },
        ExpressServer = function (conf) {
            this.conf = conf || {};
            this.isProductionEnv = env === 'production';
            this.expressServer = express();
            initExpressMiddlewares.call(this);
            initExpressTemplates.call(this);
            initExpressRouting.call(this);
        };

    module.exports = ExpressServer;
}());
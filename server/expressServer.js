 ;(function () {
    'use strict';
    
    var env = process.env.NODE_ENV || 'production',
        express = require('express'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        swig = require('swig'),
        session = require('express-session'),
        csrf = require('csurf'),
        methodOverride = require('method-override'),
        middlewares = require('./../middlewares/admin'),
        routeList = require('./../website/controllers/router.book'),
        initExpressSecurity = function () {
            this.expressServer.use(session(this.conf.session));
            this.expressServer.disable('x-powered-by');
            this.expressServer.use(methodOverride('X-HTTP-Method-Override'));
            this.expressServer.use(cookieParser());
            this.expressServer.use(csrf({ cookie: true }));
            this.expressServer.use(function (err, req, res, next) {
                if (err.code !== 'EBADCSRFTOKEN') { return next(err); }
                
                res
                    .status(403)
                    .send('CSRF token error, invalid csrf token.');
            });
        },
        initExpressMiddlewares = function () {
            for (var middleware in middlewares) {
                this.expressServer.use(middlewares[middleware]);
            }
            this.expressServer.use(bodyParser.json());
            this.expressServer.use(bodyParser.urlencoded({extended: true}));
        },
        // configurate template engine and paths
        initExpressTemplates = function () {
            this.expressServer.engine('html', swig.renderFile);
            this.expressServer.set('view engine', 'html'); // template of view
            this.expressServer.set('views', [__dirname + './../website/views/book/templates']);
            this.expressServer.set('view cache', this.isProductionEnv);
            swig.setDefaults({
                cache: this.isProductionEnv ? 'memory' : false,
                varControls: ['{{', '}}']
            });
        },
        // initialize all router resources
        initExpressRouting = function () {
            var routerCtrl, router, resources, resource; 
            
            for (routerCtrl in routeList) {
                // Initialize Instance from all routeList controllers
                router = new routeList[routerCtrl](this.conf);
                
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
            initExpressSecurity.call(this);
            initExpressTemplates.call(this);
            initExpressMiddlewares.call(this);
            initExpressRouting.call(this);
        };

    module.exports = ExpressServer;
}());
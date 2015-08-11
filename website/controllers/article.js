;(function () {
    'use strict';

    /**
     * @instanceof Article
     */
    var ArticleView = require('../views/article'),
        ArticleModel = require('../models/article'),
        
    
    /**
     * @class Express routing for article controller
     * @lends Article.prototype properties from Article routing
     * @property {string} url Path route from express routing (http://localhost:3000/[url])
     * @property {method} string expres routing interfaces
     * @property {restfull} string HTTP methods from restfull services
     * @property {callback} function middleware handlers for expres routing
     */
    ArticleCtrl = function (conf) {        
        this.conf = conf;
        this.view = new ArticleView();
        this.model = new ArticleModel();
        this.redirectPaths = function (response, pathname, restParam) {
            var url = [
                this.conf.getserverPath(),
                'article',
                pathname,
                restParam || ''
            ].join('/');
            response.redirect(url);
        };
    };

    /**
     * insertion request for new articles
     * @memberof Article
     * @type {Object}
     */
    ArticleCtrl.prototype.routeAddArticle = {
        url: '/article/add/',
        method: 'get',
        restfull: 'GET',
        callback: function (req, res) {
            var dataTemplate = {
                titlePage : 'Add new Article'
            };
            this.view.renderAddArticle(res, dataTemplate);
        }
    };
    
    /**
     * insert or updated new articles
     * @memberof Article
     * @type {Object}
     */
    ArticleCtrl.prototype.routeSaveArticle = {
        url: '/article/save/',
        method: 'post',
        restfull: 'POST',
        callback: function (req, res) {
            var docArticle = req.body;
            
            this.model.saveArticle(docArticle, function (err, docUpdated) {
                
                // redirect to isbn stored article, or to form for add new one.
                if (!err && !!docUpdated) {
                    this.redirectPaths(res, 'isbn', docUpdated.toJSON().isbn);
                
                } else {
                    !!err && console.error([err.name, err.errmsg || err.message].join('<->'));
                    this.redirectPaths(res, 'add');
                }
                
            }.bind(this));
        }
    };
    
    ArticleCtrl.prototype.routeGetArticle = {
        url: '/article/isbn/:isbn',
        method: 'get',
        restfull: ['GET'],
        callback: function (req, res) {
            this.model.getArticle({isbn: req.params.isbn}, function (err, doc) {
                var dataTemplate = {};
                
                // return template with isbn article or redirect to form for add new one. 
                if (!err && doc.length > 0) {
                    dataTemplate = {
                        titlePage: 'Data Stored article',
                        article: doc[0]
                    };
                    this.view.renderGetArticle(res, dataTemplate);
                
                } else {
                    !!err && console.error([err.name, err.errmsg || err.message].join('<->'));
                    this.redirectPaths(res, 'add');
                }
                
            }.bind(this));
        }
    };

    /**
     * Edit articles articles
     * @memberof Article
     * @type {Object}
     */
    ArticleCtrl.prototype.routeEditArticle = {
        url: '/article/edit/:artName',
        method: 'get',
        restfull: ['PUT', 'DELETE'],
        callback: function (req, res) {
            var dataTemplate = {
                titlePage: 'Edit stored article',
                articleName: req.params.artName
            };
            this.view.renderEditArticle(res, dataTemplate);
        }
    };
    
    /**
     * Retrieve all artticles
     * @memberof Article
     * @type {Object}
     */
    ArticleCtrl.prototype.routeListArticle = {
        url: '/article/list/',
        method: 'get',
        restfull: 'GET',
        callback: function (req, res) {
            var dataTemplate = {
                titlePage : 'List all articles'
            };
            this.view.renderListArticle(res, dataTemplate);
        }
    };

    module.exports = ArticleCtrl;
}());
;(function () {
    'use strict';

    /**
     * @instanceof Article
     */
    var ArticleView = require('../views/article'),
    
    /**
     * @class Express routing for article controller
     * @lends Article.prototype properties from Article routing
     * @property {string} url Path resource from express routing (http://localhost:3000/[url])
     * @property {method} string expres routing interfaces
     * @property {restfull} string HTTP methods from restfull services
     * @property {callback} function middleware handlers for expres routing
     */
    ArticleCtrl = function () {
        this.view = new ArticleView();
    };

    /**
     * insertion request for new articles
     * @memberof Article
     * @type {Object}
     */
    ArticleCtrl.prototype.resourceAddArticle = {
        url: '/article/add/',
        method: 'get',
        restfull: 'GET',
        callback: function (req, res) {
            this.view.add(res, {title: 'Add a new Article'});
        }
    };
    
    /**
     * insert new articles
     * @memberof Article
     * @type {Object}
     */
    ArticleCtrl.prototype.resourceSaveArticle = {
        url: '/article/save/',
        method: 'post',
        restfull: 'POST',
        callback: function (req, res) {
            this.view.save(res, {title: 'Save a new Article', data: req.body});
        }
    };

    /**
     * Edit articles articles
     * @memberof Article
     * @type {Object}
     */
    ArticleCtrl.prototype.resourceEditArticle = {
        url: '/article/edit/:data',
        method: 'get',
        restfull: ['PUT', 'DELETE'],
        callback: function (req, res) {
            this.view.edit(res, {title: 'edit next article : ', data: req.params.data});
        }
    };
    
    /**
     * Retrieve all artticles
     * @memberof Article
     * @type {Object}
     */
    ArticleCtrl.prototype.resourceListArticle = {
        url: '/article/list/',
        method: 'get',
        restfull: 'GET',
        callback: function (req, res) {
            this.view.list(res, {title: 'List all articles'});
        }
    };

    module.exports = ArticleCtrl;
}());
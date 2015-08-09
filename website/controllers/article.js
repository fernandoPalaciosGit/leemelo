;(function () {
    'use strict';

    /**
     * @class Express routing for article controller
     * @lends Article.prototype properties from Article routing
     * @property {string} url Path resource from express routing (http://localhost:3000/[url])
     * @property {method} string expres routing interfaces
     * @property {restfull} string HTTP methods from restfull services
     * @property {callback} function middleware handlers for expres routing
     */
    var Article = function () { };

    /**
     * insertion request for new articles
     * @memberof Article
     * @type {Object}
     */
    Article.prototype.resourceAddArticle = {
        url: '/article/add/',
        method: 'get',
        restfull: 'GET',
        callback: function (req, res) {
            res.render('article_add', {name: 'Pocoyo'});
        }
    };
    
    /**
     * insert new articles
     * @memberof Article
     * @type {Object}
     */
    Article.prototype.resourceSaveArticle = {
        url: '/article/save/',
        method: 'post',
        restfull: 'POST',
        callback: function (req) {
            console.dir(req.body);
            // res.render('article_save', {});
        }
    };

    /**
     * Edit articles articles
     * @memberof Article
     * @type {Object}
     */
    Article.prototype.resourceEditArticle = {
        url: '/article/edit/:data',
        method: 'get',
        restfull: ['PUT', 'DELETE'],
        callback: function (req, res) {
            res.send('article_edit');
        }
    };
    
    /**
     * Retrieve all artticles
     * @memberof Article
     * @type {Object}
     */
    Article.prototype.resourceListArticle = {
        url: '/article/list/',
        method: 'get',
        restfull: 'GET',
        callback: function (req, res) {
            res.render('article_list', {});
        }
    };

    module.exports = Article;
}());
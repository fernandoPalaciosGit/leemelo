/**
 * Article controller object
 */
;(function () {
    'use strict';
    
    var Article = function () { };

    Article.prototype.resourceAddArticle = {
        url: '/article/add/',
        method: 'get',
        context: 'add',
        callback: function (req, res) {
            res.render('article_save', {name: 'Pocoyo'});
        }
    };

    Article.prototype.resourceEditArticle = {
        url: '/article/edit/:data',
        method: 'get',
        context: 'edit',
        callback: function (req, res) {
            res.send('article_edit');
        }
    };
    
    Article.prototype.resourceListArticle = {
        url: '/article/list/',
        method: 'get',
        context: 'add',
        callback: function (req, res) {
            res.render('article_list', {});
        }
    };

    module.exports = Article;
}());
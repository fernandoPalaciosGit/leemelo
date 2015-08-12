;(function () {
    'use strict';
    
    var ArticleView = function (conf) {
        this.conf = conf || {};
    };    
    
    ArticleView.prototype.renderAddArticle = function (res, dataTemplate) {
        res.render('pages/article_add', dataTemplate);
    };
    
    ArticleView.prototype.renderGetArticle = function (res, dataTemplate) {
        res.render('pages/article_see', dataTemplate);
    };
    
    ArticleView.prototype.renderEditArticle = function (res, dataTemplate) {
        res.render('pages/article_edit', dataTemplate);
    };
    
    ArticleView.prototype.renderListArticle = function (res, dataTemplate) {
        res.render('pages/article_list', dataTemplate);
    };
    
    module.exports = ArticleView;
}());
;(function () {
    'use strict';
    
    var ArticleView = function (conf) {
        this.conf = conf || {};
    };    
    
    ArticleView.prototype.renderAddArticle = function (res, dataTemplate) {
        res.render('widgets/article_add', dataTemplate);
    };
    
    ArticleView.prototype.renderGetArticle = function (res, dataTemplate) {
        res.render('widgets/article_see', dataTemplate);
    };
    
    ArticleView.prototype.renderEditArticle = function (res, dataTemplate) {
        res.render('widgets/article_edit', dataTemplate);
    };
    
    ArticleView.prototype.renderListArticle = function (res, dataTemplate) {
        res.render('widgets/article_list', dataTemplate);
    };
    
    module.exports = ArticleView;
}());
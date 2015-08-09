;(function () {
    'use strict';
    
    var ArticleView = function () {};
    
    ArticleView.prototype.add = function (res, object) {
        res.render('article_add', object);
    };
    
    ArticleView.prototype.save = function (res, object) {
        res.render('article_save', object);
    };
    
    ArticleView.prototype.edit = function (res, object) {
        res.render('article_edit', object);
    };
    
    ArticleView.prototype.list = function (res, object) {
        res.render('article_list', object);
    };
    
    module.exports = ArticleView;
}());
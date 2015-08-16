;(function () {
    'use strict';
    
    var BookView = function (conf) {
        this.conf = conf || {};
    };    
    
    BookView.prototype.renderAddBook = function (res, dataTemplate) {
        res.render('widgets/book_add', dataTemplate);
    };
    
    BookView.prototype.renderGetBook = function (res, dataTemplate) {
        res.render('widgets/book_show', dataTemplate);
    };
    
    BookView.prototype.renderEditBook = function (res, dataTemplate) {
        res.render('widgets/book_edit', dataTemplate);
    };
    
    BookView.prototype.renderListBook = function (res, dataTemplate) {
        res.render('widgets/book_list', dataTemplate);
    };
    
    module.exports = BookView;
}());
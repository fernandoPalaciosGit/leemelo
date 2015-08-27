;(function () {
    'use strict';
        
    var _ = require('lodash'),
        BookView = function (conf) {
            this.conf = conf || {};
            this.commonKeys = require('./../cms/book/common');
        };    
    
    BookView.prototype.renderAddBook = function (res, dataCtrl) {
        var templateKeys = require('./../cms/book/book-add'),
            templateData = _.extend(dataCtrl, this.commonKeys, templateKeys);
            
        res.render('widgets/book-add', templateData);
    };
    
    BookView.prototype.renderGetBook = function (res, dataCtrl) {
        var templateKeys = require('./../cms/book/book-show')(dataCtrl.book),
            templateData = _.extend(dataCtrl, this.commonKeys, templateKeys);
            
        res.render('widgets/book-show', templateData);
};
    
    BookView.prototype.renderEditBook = function (res, dataCtrl) {
        var templateKeys = require('./../cms/book/book-edit')(dataCtrl.book),
            templateData = _.extend(dataCtrl, this.commonKeys, templateKeys);
            
        res.render('widgets/book-edit', templateData);
    };
    
    BookView.prototype.renderListBook = function (res, dataCtrl) {
        var templateKeys = require('./../cms/book/book-list'),
            templateData = _.extend(dataCtrl, this.commonKeys, templateKeys);
            
        res.render('widgets/book-list', templateData);
    };
    
    module.exports = BookView;
}());
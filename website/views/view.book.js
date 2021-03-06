;(function () {
    'use strict';

    var _ = require('lodash'),
        BookView = function (conf) {
            this.conf = conf || {};
            this.desktopKeys = require('./../cms/desktop');
        };

    BookView.prototype.renderAddBook = function (res, dataCtrl) {
        var templateKeys = require('./../cms/book-add'),
            templateData = _.extend(dataCtrl, this.desktopKeys, templateKeys);

        res.render('widgets/book-add', templateData);
    };

    BookView.prototype.renderLanding = function (res, dataCtrl) {
        var templateKeys = require('./../cms/landing'),
            templateData = _.extend(dataCtrl, this.desktopKeys, templateKeys);

        res.render('widgets/landing', templateData);
    };

    BookView.prototype.renderGetBook = function (res, dataCtrl) {
        var templateKeys = require('./../cms/book-show'),
            templateData = _.extend(dataCtrl, this.desktopKeys, templateKeys);

        res.render('widgets/book-show', templateData);
    };

    BookView.prototype.renderListBook = function (res, dataCtrl) {
        var templateKeys = require('./../cms/book-list'),
            templateData = _.extend(dataCtrl, this.desktopKeys, templateKeys);

        res.render('widgets/book-list', templateData);
    };

    module.exports = BookView;
}());

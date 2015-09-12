;(function () {
    'use strict';

    /**
     * @instanceof Book
     */
    var _ = require('lodash'),
        BookView = require('./../../views/view.book'),
        BookModel = require('./../../models/model.book'),

    /**
     * @class Express routing for book controller
     * @lends Book.prototype properties from Book routing
     * @property {string} url Path route from express routing (http://localhost:3000/[url])
     * @property {method} string expres routing interfaces
     * @property {callback} function middleware handlers for expres routing
     */
    PagesBookCtrl = function (conf) {
        this.conf = conf;
        this.view = new BookView();
        this.model = new BookModel(conf);
        this.redirectPaths = function (response, pathname, restParam) {
            var url = [
                this.conf.getserverPath(),
                pathname,
                restParam || ''
            ].join('/');

            response.redirect(url);
        };
    };

    /**
     * insertion request for new books
     * @memberof Book
     * @type {Object}
     */
    PagesBookCtrl.prototype.routeAddBook = {
        url: '/create-book/',
        method: 'get',
        callback: function (req, res) {
            var dataTemplate = {};

            this.view.renderAddBook(res, dataTemplate);
        }
    };

    PagesBookCtrl.prototype.routeLanding = {
        url: '/landing/',
        method: 'get',
        callback: function (req, res) {
            var dataTemplate = {};

            this.view.renderLanding(res, dataTemplate);
        }
    };

    /**
     * insert or updated new books
     * @memberof Book
     * @type {Object}
     */
    PagesBookCtrl.prototype.routeSaveBook = {
        url: '/save-book/',
        method: 'post',
        callback: function (req, res) {
            var docBook = req.body;

            this.model
                .saveBook(docBook)
                .then(_.bind(function (doc) {
                    return this.model.getBookById(doc.id);
                }, this))
                .then(_.bind(function (doc) {
                    // redirect to isbn stored book, or to form for add new one.
                    this.redirectPaths(res, 'isbn-book', doc.toJSON().isbn);
                }, this))
                .catch(_.bind(function (err) {
                    console.dir(err);
                    this.redirectPaths(res, 'create-book');
                }, this));
        }
    };

    PagesBookCtrl.prototype.routeGetBook = {
        url: '/isbn-book/:isbn',
        method: 'get',
        callback: function (req, res) {
            this.model
                .getBookByIsbn(req.params.isbn)
                .then(_.bind(function (doc) {
                    this.view.renderGetBook(res, {book: doc[0]});
                }, this))
                .catch(_.bind(function (err){
                    console.dir(err);
                    this.redirectPaths(res, 'create-book');
                }, this));
        }
    };

    /**
     * Retrieve all books
     * @memberof Book
     * @type {Object}
     */
    PagesBookCtrl.prototype.routeListBook = {
        url: '/list-all-books/',
        method: 'get',
        callback: function (req, res) {
            this.model
                .getAllBooks()
                .then(_.bind(function (books) {

                    if (_.size(books) > 0) {
                        this.view.renderListBook(res, {books: books});

                    } else {
                        this.redirectPaths(res, 'create-book');
                    }
                }, this))
                .catch(_.bind(function (err) {
                    console.dir(err);
                    this.redirectPaths(res, 'create-book');
                }, this));
        }
    };

    PagesBookCtrl.prototype.routeLogin = {
        url: /\/[login|access]?/,
        method: 'get',
        callback: function (req, res) {

            if (!_.isUndefined(req.session.sessionlastAccess)) {
                this.redirectPaths(res, 'create-book');

            } else {
                this.redirectPaths(res, 'landing');
            }
        }
    };

    PagesBookCtrl.prototype.routeLogout = {
        url: '/logout/',
        method: 'get',
        callback: function (req, res) {
            req.session.destroy(function (err) {

                if (!_.isUndefined(err)) {
                    this.redirectPaths(res, 'settings');

                } else {
                    this.redirectPaths(res, 'landing');
                }
            });
        }
    };

    module.exports = PagesBookCtrl;
}());

;(function () {
    'use strict';

    /**
     * @instanceof Book
     */
    var BookView = require('./../../views/view.book'),
        BookModel = require('./../../models/model.book'),
    
    /**
     * @class Express routing for book controller
     * @lends Book.prototype properties from Book routing
     * @property {string} url Path route from express routing (http://localhost:3000/[url])
     * @property {method} string expres routing interfaces
     * @property {callback} function middleware handlers for expres routing
     */
    BookCtrl = function (conf) {        
        this.conf = conf;
        this.view = new BookView();
        this.model = new BookModel();
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
    BookCtrl.prototype.routeAddBook = {
        url: '/create-book/',
        method: 'get',
        callback: function (req, res) {
            var dataTemplate = {};
            this.view.renderAddBook(res, dataTemplate);
        }
    };
    
    /**
     * insert or updated new books
     * @memberof Book
     * @type {Object}
     */
    // TODO : incorporate books API restFull
    BookCtrl.prototype.routeSaveBook = {
        url: '/save-book/',
        method: 'post',
        callback: function (req, res) {
            var docBook = req.body;
            
            this.model.saveBook(docBook)
            .then(function (doc) {
                return this.model.getBookById(doc.id);
            })
            .then(function (doc) {
                // redirect to isbn stored book, or to form for add new one. 
                this.redirectPaths(res, 'isbn-book', doc.toJSON().isbn);
            })
            .catch(function (error) {
                console.error(error);
                this.redirectPaths(res, 'create-book', error);
            });
        }
    };
    
    BookCtrl.prototype.routeGetBook = {
        url: '/isbn-book/:isbn',
        method: 'get',
        callback: function (req, res) {
            this.model.getBookByIsbn(req.params.isbn)
            .then(function (doc) {
                this.view.renderGetBook(res, {book: doc[0]});
            })
            .catch(function (error) {
                console.error(error);
                this.redirectPaths(res, 'create-book', error);
            });
        }
    };

    /**
     * Edit books
     * @memberof Book
     * @type {Object}
     */
    BookCtrl.prototype.routeEditBook = {
        url: '/edit-book/:bookName',
        method: 'get',
        callback: function (req, res) {
            var dataTemplate = {
                book: {name: req.params.bookName}
            };
            this.view.renderEditBook(res, dataTemplate);
        }
    };
    
    /**
     * Retrieve all books
     * @memberof Book
     * @type {Object}
     */
    BookCtrl.prototype.routeListBook = {
        url: '/list-all-books/',
        method: 'get',
        callback: function (req, res) {
            var dataTemplate = {};
            this.view.renderListBook(res, dataTemplate);
        }
    };

    module.exports = BookCtrl;
}());
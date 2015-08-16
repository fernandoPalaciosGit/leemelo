;(function () {
    'use strict';

    /**
     * @instanceof Book
     */
    var BookView = require('../views/book'),
        BookModel = require('../models/book'),
        
    
    /**
     * @class Express routing for book controller
     * @lends Book.prototype properties from Book routing
     * @property {string} url Path route from express routing (http://localhost:3000/[url])
     * @property {method} string expres routing interfaces
     * @property {restfull} string HTTP methods from restfull services
     * @property {callback} function middleware handlers for expres routing
     */
    BookCtrl = function (conf) {        
        this.conf = conf;
        this.view = new BookView();
        this.model = new BookModel();
        this.redirectPaths = function (response, pathname, restParam) {
            var url = [
                this.conf.getserverPath(),
                'book',
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
        url: '/book/add/',
        method: 'get',
        restfull: 'GET',
        callback: function (req, res) {
            var dataTemplate = {
                titlePage : 'Add new Book'
            };
            this.view.renderAddBook(res, dataTemplate);
        }
    };
    
    /**
     * insert or updated new books
     * @memberof Book
     * @type {Object}
     */
    BookCtrl.prototype.routeSaveBook = {
        url: '/book/save/',
        method: 'post',
        restfull: 'POST',
        callback: function (req, res) {
            var docBook = req.body;
            
            this.model.saveBook(docBook, function (err, docUpdated) {
                
                // redirect to isbn stored book, or to form for add new one.
                if (!err && !!docUpdated) {
                    this.redirectPaths(res, 'isbn', docUpdated.toJSON().isbn);
                
                } else {
                    !!err && console.error([err.name, err.errmsg || err.message].join('<->'));
                    this.redirectPaths(res, 'add');
                }
                
            }.bind(this));
        }
    };
    
    BookCtrl.prototype.routeGetBook = {
        url: '/book/isbn/:isbn',
        method: 'get',
        restfull: ['GET'],
        callback: function (req, res) {
            this.model.getBook({isbn: req.params.isbn}, function (err, doc) {
                var dataTemplate = {};
                
                // return template with isbn book or redirect to form for add new one. 
                if (!err && doc.length > 0) {
                    dataTemplate = {
                        titlePage: 'Data Stored book',
                        book: doc[0]
                    };
                    this.view.renderGetBook(res, dataTemplate);
                
                } else {
                    !!err && console.error([err.name, err.errmsg || err.message].join('<->'));
                    this.redirectPaths(res, 'add');
                }
                
            }.bind(this));
        }
    };

    /**
     * Edit books books
     * @memberof Book
     * @type {Object}
     */
    BookCtrl.prototype.routeEditBook = {
        url: '/book/edit/:bookName',
        method: 'get',
        restfull: ['PUT', 'DELETE'],
        callback: function (req, res) {
            var dataTemplate = {
                titlePage: 'Edit stored book',
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
        url: '/book/list/',
        method: 'get',
        restfull: 'GET',
        callback: function (req, res) {
            var dataTemplate = {
                titlePage : 'List all books'
            };
            this.view.renderListBook(res, dataTemplate);
        }
    };

    module.exports = BookCtrl;
}());
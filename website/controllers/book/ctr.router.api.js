;(function () {
    'use strict';
    
    var _ = require('lodash'),
        staticLibrary = {};
    
    /**
     * @class RESTFULL API for Books Library
     * @lends Book.prototype properties from Book API
     * @property {string} url Path route from express routing (http://localhost:3000/[url])
     * @property {string} method expres routing interfaces
     * @property {function} callback middleware handlers for expres routing
     */
    var ApiBookCtrl = function (conf) {        
        this.conf = conf;
    };
        
    ApiBookCtrl.prototype.routeApiBookSave = {
        url: '/api/book/save/',
        method: 'post',
        callback: function (req, res) {
            var bookReq = req.body.book;
            
            bookReq.id = Date.now();
            staticLibrary[bookReq.id] = bookReq;
            res
                .status(201)
                .send({book: bookReq});                
        }
    };
        
    ApiBookCtrl.prototype.routeApiBookId = {
        url: '/api/book/id/:id',
        method: 'get',
        callback: function (req, res) {
            var bookId = req.params.id,
                bookReq = staticLibrary[bookId],
                resApi = _.isUndefined(bookReq) ?
                        {status: 404, bookRes: {}} : {status: 200, bookRes: bookReq};
            
            res
                .status(resApi.status)
                .send({book: resApi.bookRes});
        }
    };
    
    ApiBookCtrl.prototype.routeApiBookPut = {
        url: '/api/book/id/:id',
        method: 'put',
        callback: function (req, res) {
            var bookId = req.params.id,
                bookReq = req.body.book;
            
            bookReq.id = parseInt(bookId, 10);
            staticLibrary[bookId] = bookReq; 
            res
                .status(200)
                .send({book: staticLibrary[bookId]});
        }
    };
    
    ApiBookCtrl.prototype.apiRouteListBooks = {
        url: '/api/book-list/',
        method: 'get',
        callback: function (req, res) {
            var books = _.values(staticLibrary);
            
            res
                .status(200)
                .send(books);
        }
    };
    
    ApiBookCtrl.prototype.routeApiBookDelete = {
        url: '/api/book/id/:id',
        method: 'delete',
        callback: function (req, res) {
            var bookId = req.params.id;
            
            delete staticLibrary[bookId];
            res
                .status(200)
                .send({});
        }
    };
    
    module.exports = ApiBookCtrl;
}());
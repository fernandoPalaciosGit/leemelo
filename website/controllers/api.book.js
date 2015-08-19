;(function () {
    'use strict';
    
    var staticLibrary = [];
    
    /**
     * @class RESTFULL API for Books Library
     * @lends Book.prototype properties from Book API
     * @property {string} url Path route from express routing (http://localhost:3000/[url])
     * @property {string} method expres routing interfaces
     * @property {string} restfull HTTP methods from restfull services
     * @property {function} callback middleware handlers for expres routing
     */
    var ApiBookCtrl = function (conf) {        
        this.conf = conf;
    };

    /**
     * Route middleware for override common header properties.
     */
    ApiBookCtrl.prototype.routeApiBookAll = {
        url: '/api/book*',
        method: 'all',
        restfull: ['GET', 'POST', 'PUT'],
        callback: function (req, res, next) {
            res.set('Content-Type', 'application/json');
            next();
        }
    };
    
    ApiBookCtrl.prototype.routeApiBookSave = {
        url: '/api/book/save/',
        method: 'post',
        restfull: ['POST', 'PUT'],
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
        restfull: ['GET'],
        callback: function (req, res) {
            var bookId = req.params.id,
                bookReq = staticLibrary[bookId];
            
            res
                .status(200)
                .send({book : bookReq});
        }
    };
    
    module.exports = ApiBookCtrl;
}());
;(function () {
    'use strict';
    
    var BookMongoModel = require('./schema/schema.book'),
        BookModel = function (conf) {
            this.conf = conf;
            this.mongoModel = BookMongoModel;
        };
        
    /**
     * if exist update or save newone
     * @return {[type]} [description]
     */
    BookModel.prototype.saveBook = function (docBook, callback) {
        var queryParams = {
                isbn: docBook.isbn // unique attribute
            },
            queryOptions = {
                upsert: true, // create object if it doesn´t exist
                'new': true // return updated document rather query document
            };
            
        this.mongoModel.findOneAndUpdate(queryParams, docBook, queryOptions, callback);
    };
    
    BookModel.prototype.getBook = function (query, callback) {
        this.mongoModel.find(query, callback);
    };
  
    module.exports = BookModel;
}());
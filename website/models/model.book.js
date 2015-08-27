;(function () {
    'use strict';
    
    var _ = require('lodash'),
        Q = require('q'),
        BookMongoModel = require('./schema/schema.book'),
        BookModel = function (conf) {
            this.conf = conf;
            this.mongoModel = BookMongoModel;
        };
        
    /**
     * if exist update or save newone
     * @return {[type]} [description]
     */
    BookModel.prototype.saveBook = function (docBook) {
        var deferred = Q.defer(),
            query = {
                isbn: docBook.isbn
            },
            queryOptions = {
                upsert: true, // create object if it doesn´t exist
                'new': true // return updated document rather query document
            };
        
        this.mongoModel.findOneAndUpdate(query, docBook, queryOptions, function (err, doc) {
            if (_.isUndefined(err) && !_.isEmpty(doc)) {
                deferred.resolve(doc);
            
            } else {
                deferred.reject(new Error(err));
            }
        });
        
        return deferred.promise;
    };
    
    BookModel.prototype.getBookById = function (id) {
        var deferred  = Q.defer();
        
        this.mongoModel.findById({id : id}, function (err, doc) {
            if (_.isUndefined(err) && !_.isEmpty(doc)) {
                deferred.resolve(doc);
            
            } else {
                deferred.reject(new Error(err));
            }            
        });
        return deferred.promise;
    };
    
    BookModel.prototype.getBookByIsbn = function (isbn) {
        var deferred  = Q.defer();
        
        this.mongoModel.find({isbn: isbn}, function (err, doc) {
            if (_.isUndefined(err) && !_.isEmpty(doc)) {
                deferred.resolve(doc);
            
            } else {
                deferred.reject(new Error(err));
            }            
        });
        return deferred.promise;
    };
  
    module.exports = BookModel;
}());
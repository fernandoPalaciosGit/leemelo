;(function () {
    'use strict';

    var _ = require('lodash'),
        Q = require('q'),
        BookMongoModel = require('./schema/schema.book'),
        BookModel = function (conf) {
            this.conf = conf;
            this.book = BookMongoModel;
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

        this.book.findOneAndUpdate(query, docBook, queryOptions, function (err, doc) {
            if (_.isNull(err) && !_.isEmpty(doc)) {
                deferred.resolve(doc);

            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    };

    BookModel.prototype.getAllBooks = function () {
        var deferred = Q.defer(),
            findAllBooks = this.book
                .find({})
                .select('-description')
                .lean(true)
                .exec();

        Q.all(findAllBooks)
            .then(deferred.resolve)
            .fail(deferred.reject);

        return deferred.promise;
    };

    BookModel.prototype.getBookById = function (id) {
        var deferred  = Q.defer();

        this.book.findById({ _id : id }, function (err, doc) {
            if (_.isNull(err) && !_.isEmpty(doc)) {
                deferred.resolve(doc);

            } else {
                var error = err || new Error('Not found book with id : ' + id);
                deferred.reject(error);
            }
        });
        return deferred.promise;
    };

    BookModel.prototype.getBookByIsbn = function (isbn) {
        var deferred  = Q.defer();

        this.book.find({ isbn: isbn }, function (err, doc) {
            if (_.isNull(err) && !_.isEmpty(doc)) {
                deferred.resolve(doc);

            } else {
                var error = err || new Error('Not found book with isbn : ' + isbn);
                deferred.reject(error);
            }
        });
        return deferred.promise;
    };

    module.exports = BookModel;
}());

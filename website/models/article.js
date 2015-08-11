;(function () {
    'use strict';
    
    var ArticleMongoModel = require('./schema/article'),
        ArticleModel = function (conf) {
            this.conf = conf;
            this.mongoModel = ArticleMongoModel;
        };
        
    /**
     * if exist update or save newone
     * @return {[type]} [description]
     */
    ArticleModel.prototype.saveArticle = function (docArticle, callback) {
        var queryParams = {
                isbn: docArticle.isbn // unique attribute
            },
            queryOptions = {
                upsert: true, // create object if it doesn´t exist
                'new': true // return updated document rather query document
            };
            
        this.mongoModel.findOneAndUpdate(queryParams, docArticle, queryOptions, callback);
    };
    
    ArticleModel.prototype.getArticle = function (query, callback) {
        this.mongoModel.find(query, callback);
    };
  
    module.exports = ArticleModel;
}());
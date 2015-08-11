;(function () {
    'use strict';
    
    var mongoose = require('mongoose'),
        articleIndex = {
            isbn: {type: String, require: true, unique: true},
            title: {type: String, require: true},
            slug: {type: String, require: true},
            description: {type: String}
        },
        articleSchema = new mongoose.Schema(articleIndex);
        
    module.exports = mongoose.model('Article',  articleSchema);
}());
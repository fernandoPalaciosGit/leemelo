;(function () {
    'use strict';
    
    var mongoose = require('mongoose'),
        Schema = mongoose.schema,
        articleIndex = {
            title: {type: String, require: true},
            slug: {type: String, require: true},
            content: {type: String, require: false}
        },
        articleSchema = new Schema(articleIndex);
        
    module.exports = mongoose.model('Article',  articleSchema);
}());
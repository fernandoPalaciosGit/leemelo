;(function () {
    'use strict';
    
    var mongoose = require('mongoose'),
        bookIndex = {
            isbn: {type: String, require: true, unique: true},
            title: {type: String, require: true},
            description: {type: String}
        },
        bookSchema = new mongoose.Schema(bookIndex);
        
    module.exports = mongoose.model('Book',  bookSchema);
}());
;(function () {
    'use strict';

    /**
     * Books Schema properties from Lybrary
     * @type {mongoose.model}
     */
    var mongoose = require('mongoose'),
        setUpdatedDate = function (next) {
            this.update_at = (new Date()).toJSON();
            next();
        },
        bookProperties = {
            title: {type: String, require: true, unique: true},
            isbn: {type: String, require: true, unique: true},
            language: {type: String, require: true},
            pages: {type: Number},
            summary: {type: String},
            update_at: {type: Date},
            // references
            comments: [{
                note: {type: String},
                postedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }
            }],
            author: {type: mongoose.Schema.Types.ObjectId},
            category: [{type: mongoose.Schema.Types.ObjectId, max: 2}]
        },
        bookSchema = new mongoose.Schema(bookProperties);

    bookSchema.pre('save', setUpdatedDate.bind(bookSchema));
    bookSchema.pre('findOneAndUpdate', setUpdatedDate.bind(bookSchema));

    module.exports = mongoose.model('Book',  bookSchema);
}());

;(function () {
    'use strict';

    /**
     * Any User that visited the platform and posted
     * @type {mongoose.model}
     */
    var mongoose = require('mongoose'),
        setUpdatedDate = function (next) {
            this.update_at = (new Date()).toJSON();
            next();
        },
        userProperties = {
            name: {type: String, require: true, unique: true},
            birthdate: {type: Date},
            website: {type: String},
            update_at: {type: Date}
        },
        userSchema = new mongoose.Schema(userProperties);

    userSchema.pre('save', setUpdatedDate.bind(userSchema));
    userSchema.pre('findOneAndUpdate', setUpdatedDate.bind(userSchema));

    module.exports = mongoose.model('User', userSchema);
}());

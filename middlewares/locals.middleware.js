/**
 * local variables, session filetime : everiables shared by all middlewares, used in all templates
 */
(function () {
    'use strict';
    
    module.exports = function (req, res, next) {
        res.locals.user = 'nando';
        res.locals.environment = JSON.stringify(process.env);
        next();
    };
}());
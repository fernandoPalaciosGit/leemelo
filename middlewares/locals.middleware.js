/**
 * local variables, session filetime : everiables shared by all middlewares, used in all templates
 */
(function () {
    'use strict';
        
    module.exports = function (req, res, next) {
        var csrftoken = req.csrfToken();
    
        res.cookie('XSRF-TOKEN', csrftoken);
        res.locals.csrftoken = csrftoken;
        res.locals.environment = JSON.stringify(process.env);
        res.locals.server = 'http://' + req.headers.host;
        next();
    };
}());
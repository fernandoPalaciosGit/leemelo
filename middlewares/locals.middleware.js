/**
 * local variables, session filetime : everiables shared by all middlewares, used in all templates
 */
module.exports = function () {
    'use strict';

    var localsRouter = function (req, res, next) {
        res.locals.environment = JSON.stringify(process.env);
        res.locals.server = 'http://' + req.headers.host;
        next();
    };

    this.expressServer.use(localsRouter);
};

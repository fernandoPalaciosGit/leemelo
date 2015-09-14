/**
 * local variables, session filetime : everiables shared by all middlewares, used in all templates
 */
module.exports = function () {
    'use strict';

    var localPaths = function (serverpath) {
        this.path.css = {
            'material-design-lite': '/bower_components/material-design-lite/material.min.css',
            'googleapis-material-icons': 'https://fonts.googleapis.com/icon?family=Material+Icons',
            'common-style': 'css/common.css'
        };

        this.path.js = {
            'material-design-lite': '/bower_components/material-design-lite/material.min.js',
            'npm-socketio' : serverpath + '/socket.io/socket.io.js'
        };
    };

    var localsPreference = function (req, res, next) {
        var serverpath = 'http://' + req.headers.host;

        res.locals.environment = JSON.stringify(process.env);
        res.locals.server = serverpath;
        localPaths.call(this, serverpath);
        next();
    };

    this.expressServer.use(localsPreference);
};

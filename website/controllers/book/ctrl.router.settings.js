;(function () {
    'use strict';

    var SettingsRouterCtrl = function (conf) {
        this.conf = conf;
    };

    /**
     * Route middleware for override common header properties.
     */
    SettingsRouterCtrl.prototype.routeApiBookSettings = {
        url: /\/api\/[book|book-list]\/*/,
        method: 'all',
        callback: function (req, res, next) {
            res.set('Content-Type', 'application/json');
            next();
        }
    };

    SettingsRouterCtrl.prototype.routeSessionSettings = {
        url: /\/*/,
        method: 'all',
        callback: function (req, res, next) {
            req.session.lastPageVisited = req.path;
            next();
        }
    };

    module.exports = SettingsRouterCtrl;
}());

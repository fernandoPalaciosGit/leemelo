;(function () {
    'use strict';
    
    module.exports = {
        port: 3000,
        msgOpenApp: function () {
            console.log('Aplication listening on localhost:%s', this.port);
        },
        'mongoDB': {
            'host' : 'localhost',
            'name' : 'mvc'
        }
    };
}());
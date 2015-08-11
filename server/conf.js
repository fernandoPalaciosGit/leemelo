;(function () {
    'use strict';
    
    module.exports = {
        protocol: 'http://',
        host: 'localhost',
        port: 3000,
        msgOpenApp: function () {
            console.log('Aplication listening on %s', this.getserverPath());
        },
        getserverPath: function () {
            return this.protocol + this.host + ':' + this.port;  
        },
        'mongoDB': {
            'host' : 'localhost',
            'name' : 'mvc'
        }
    };
}());
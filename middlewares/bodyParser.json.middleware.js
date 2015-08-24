/**
 * Encoding routing properties requestinto req.body
 */
;(function () {
    'use strict';
    
    var bodyParser = require('body-parser');
    
    module.exports = bodyParser.json();
}());
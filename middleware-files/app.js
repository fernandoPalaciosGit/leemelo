var http = require('http'),
    conf = require('./server/conf'),
    ExpressServer = require('./server/expressServer');

var app = new ExpressServer(conf);
var server = http.createServer(app.expressServer);
server.listen(conf.port);
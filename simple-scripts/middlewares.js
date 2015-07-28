'use strict';

// MODULES
var	express = require('express'),
    util = require('util'),
    parser = require('body-parser'); // manejar formularios get/post

// URI PAGES
var	URI_ACCESS = __dirname + '/public/access';

// SERVER
var web = express();
web.use( parser.urlencoded() ); // cualquier peticion parsea llos parametros de http

var createServer = function(){
	console.log(this);
};

var getResponseData = function( req, res ){
    res.send('<h2>Respuesta servidor</h2><br/><pre>'+ util.inspect(res) +'</pre>' );
};

var getRequestData = function( req, res ){
	res.send('<h2>Parametros GET de peticion</h2><br/><pre>'+ util.inspect(req) +'</pre>' );
};

var loadLoginPage = function( req, res ){
	res.sendFile( 'login.html' , {root : URI_ACCESS} );
};

var accessToLogin = function( req, res ){
	var params = req.body;
	res.send( util.inspect(params) );
};

var loadRegisterPage = function( req, res ){
	res.sendFile( 'register.html' , {root : URI_ACCESS} );
};

web.listen(8080, createServer);
// habilito uri por GET
web.get('/req', getRequestData);
web.get('/res', getResponseData);
web.get('/login', loadLoginPage);
web.post('/login', accessToLogin);
web.get('/register', loadRegisterPage);

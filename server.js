// Require our dependencies
var express = require('express');
var http    = require('http');

var auth   = require('./auth/auth.js');
var config = require('./config');

// Create an express instance and set a port variable
var app = express();

// Disable etag headers on responses
app.disable('etag');
app.disable('x-powered-by');

app.use('/auth', auth(config.auth));

var server = http.createServer(app).listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});
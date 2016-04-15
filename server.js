// Require our dependencies
var express = require('express');
var http    = require('http');
var cookieSession = require('cookie-session');

var config = require('./config');
var auth   = require('./auth/auth.js')(config.auth);

// Create an express instance and set a port variable
var app = express();

// Disable etag headers on responses
app.disable('etag');
app.disable('x-powered-by');

//because our session data is very limited, we can keep the entire session in an encrypted cookie
app.use(cookieSession({secret: config.cookieEncryptionKey}));

//Mount authentication routes
app.use(auth.router);

// Mount static content dir. 
// No authentication, could be potentially in a different server
app.use("/", express.static(__dirname + "/public/"));

// Mount API, require authentication with error
app.use('/api', [
    auth.onUnauthenticatedReturnError,
    function(req, res, next) {
        res.send('sample api');
    }
]);

// Mount server side rendering
// if not authenticated, redirect
app.use('/', [
    auth.onUnauthenticatedRedirectToLogin,
    function(req, res, next) {
        res.send('rendered ');
    }
]);

var server = http.createServer(app).listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});

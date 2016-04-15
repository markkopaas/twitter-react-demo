var express       = require('express');
var http          = require('http');
var cookieSession = require('cookie-session');

var config = require('./config');
var auth   = require('./auth/auth.js')(config.auth);

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

// Mount API
// Require authentication - if missing, respond with error
app.use('/api', [
    auth.onUnauthenticatedReturnError,
    function(req, res, next) {
        res.send('sample api');
    }
]);

// Mount server side rendered app
// Require authentication - if missing, then redirect to login
app.use('/', [
    auth.onUnauthenticatedRedirectToLogin,
    require('./app-render-in-server')
]);

var server = http.createServer(app).listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});

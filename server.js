// Require our dependencies
var express = require('express');
var http    = require('http');
var cookieSession = require('cookie-session');


var auth   = require('./auth/auth.js');
var config = require('./config');

// Create an express instance and set a port variable
var app = express();

// Disable etag headers on responses
app.disable('etag');
app.disable('x-powered-by');

//because our session data is very limited, we can keep the entire session in an encrypted cookie
app.use(cookieSession({secret: config.cookieEncryptionKey}));

app.use('/auth', auth(config.auth));

app.get('/', function (req, res, next) {
    if(!req.session.authenticated) {
        res.redirect('/auth/request-token');
        return;
    }
    res.send('Welcome!</br>session data:'+JSON.stringify(req.session))
})

var server = http.createServer(app).listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});

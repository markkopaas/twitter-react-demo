var express          = require('express');
var cookieSession    = require('cookie-session');
var authFactory      = require('../lib/auth/auth-factory.js');
var serverSideRender = require('./server-side-render');

module.exports = {create: create};

function create(config) {
    var app  = express();
    var auth = authFactory.create(config.auth);

    app.disable('etag');
    app.disable('x-powered-by');

//because our session data is very limited, we can keep the entire session in an encrypted cookie
//NB! it is not encrypted, just signed
    app.use(cookieSession({secret: 'cat'}));

//Mount authentication routes
    app.use(auth.router);

// Mount static content dir. 
// No authentication, could be potentially in a different server
    app.use("/", express.static(__dirname + "/../public/"));

// Mount server side rendered app
// Require authentication - if missing, then redirect to login
    app.use('/', [
        auth.onUnauthenticatedRedirectToLogin,
        serverSideRender(config.app)
    ]);

    return app;
}


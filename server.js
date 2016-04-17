var http   = require('http');
var config = require('./config');

var expressAppFactory  = require('./express-app/express-app-factory');
var socketIoAppFactory = require('./socketio-app/socketio-app-factory');

var app = expressAppFactory.create(config);

var server = http.createServer(app).listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});

socketIoAppFactory.create(server);
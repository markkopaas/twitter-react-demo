var http   = require('http');
var config = require('./config');

var app = require('./express-app-factory').create(config);

var server = http.createServer(app).listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});

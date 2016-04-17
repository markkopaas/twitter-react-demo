var io     = require('socket.io');
var cookie = require('cookie');

module.exports = {create: create};

function create(server) {
    io.listen(server).on('connection', onConnection);
}

function onConnection(clientSocket) {
    var session = extractSession(clientSocket);

    console.log('tt', session.twitterToken)
    // create twitter stream

    clientSocket.emit('testmessage', {hello: 'private world'});
}

function extractSession(clientSocket) {
    var cookies = clientSocket.handshake.headers.cookie;
    var parsed = cookie.parse(cookies);
    var decoded = decode(parsed.session);

    return decoded;
}

function decode(string) {
    var body = new Buffer(string, 'base64').toString('utf8');
    return JSON.parse(body);
}
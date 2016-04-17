var io     = require('socket.io');
var cookie = require('cookie');

var twitterAdapterFactory = require('./../lib/twitter-adapter-factory');

module.exports = {create: create};

function create(server) {
    io.listen(server).on('connection', onConnection);
}

function onConnection(clientSocket) {
    var session        = extractSession(clientSocket);
    var twitterAdapter = twitterAdapterFactory.create(session.twitterToken.accessToken, session.twitterToken.accessTokenSecret);

    twitterAdapter.getUserStream(onData, onEnd);

    function onData(err, tweet) {
        if (err) {
            console.log('twitter stream error:', err);
            return;
        }
        clientSocket.emit('tweet', tweet);
    }

    function onEnd() {
        twitterAdapter.getUserStream(onData, onEnd);
    };
}

function extractSession(clientSocket) {
    var cookies = clientSocket.handshake.headers.cookie;
    var parsed  = cookie.parse(cookies);
    var decoded = decode(parsed.session);

    return decoded;
}

function decode(string) {
    var body = new Buffer(string, 'base64').toString('utf8');
    return JSON.parse(body);
}
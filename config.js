var port = process.env.PORT || 8080;
var host = 'http://127.0.0.1';

module.exports = {
    port: port,
    auth: {
        sessionSecret: process.env.SESSION_SECRET,
        twitter: {
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackUrl: host + ':' + port + '/auth/access-token'
        }
    }
}
var Twitter = require('node-twitter-api');
var config  = require('../config');

var twitter = new Twitter({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callback: config.twitter.callbackUrl
});

module.exports = twitter;

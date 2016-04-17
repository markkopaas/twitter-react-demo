var q = require('q');

var twitter = require('./twitter-service');
var Tweet   = require('../domain/Tweet');

module.exports = {create: create};

function create(accessToken, accessTokenSecret) {
    return {
        getInitialTweets: function (count) {
            return q.Promise(function (resolve, reject) {
                    twitter.getTimeline(
                        'home_timeline',
                        {count: count},
                        accessToken,
                        accessTokenSecret,
                        function (err, result, response) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve(result);
                        });
                })
                .then(normalize);
        },
        getUserStream: function (onData, onEnd) {
            console.log(
                'connecting stream'
            )
            twitter.getStream(
                'userstream',
                {},
                accessToken,
                accessTokenSecret,
                function (err, result, response) {
                    if (err) {
                        onData(err);
                        return;
                    }
                    var tweet = Tweet(result);

                    if (tweet.id) {
                        onData(null, tweet);
                    }
                },
                onEnd
            );
        },
    };
}

function normalize(input) {
    return input.map(Tweet);
}
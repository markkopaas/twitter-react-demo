var q = require('q');

var twitter = require('./twitter-service');
var Tweet   = require('../domain/Tweet');

module.exports = {create: create};

function create(accessToken, accessSecret) {
    return {
        getInitialTweets: function (count) {
            return q.Promise(function (resolve, reject) {
                    twitter.getTimeline(
                        'home_timeline',
                        {count: count},
                        accessToken,
                        accessSecret,
                        function (err, result, response) {
                            if (err) {
                                reject(err);
                            }
                            resolve(result);
                        });
                })
                .then(normalize);
        }
    };
}

function normalize(input) {
    return input.map(Tweet);
}
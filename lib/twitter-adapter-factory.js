var q = require('q');

var twitter = require('./twitter-service');
var Tweet   = require('../domain/Tweet');

module.exports = {create: create};

function create(accessToken, accessSecret) {
    return {
        getInitialTweets: function () {
            return q.Promise(function (resolve, reject) {
                    twitter.getTimeline(
                        'home_timeline',
                        '',
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
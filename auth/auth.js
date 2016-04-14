"use strict";

var Twitter = require("node-twitter-api");
var express = require('express');

module.exports = function (config) {

    var twitter = new Twitter({
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callback: config.twitter.callbackUrl
    });
    var router  = express.Router();

    router.get('/request-token',
        function (req, res) {
            twitter.getRequestToken(function (err, requestToken, requestSecret) {
                if (err) {
                    req.session = null;
                    res.status(500).send(err);
                } else {
                    req.session.requestSecret = requestSecret;
                    res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
                }
            });
        }
    );

    router.get("/access-token",
        function (req, res) {
            var requestToken  = req.query.oauth_token;
            var verifier      = req.query.oauth_verifier;
            var requestSecret = req.session.requestSecret;

            delete req.session.requestSecret;

            twitter.getAccessToken(requestToken, requestSecret, verifier, function (err, accessToken, accessSecret) {
                if (err) {
                    req.session = null;
                    res.status(500).send(err);
                } else {
                    req.session.authenticated = true;
                    req.session.twitterToken  = {accessToken: accessToken, accessSecret: accessSecret};
                    res.redirect(config.afterAuthUrl);
                }
            });
        }
    );

    return router;
}



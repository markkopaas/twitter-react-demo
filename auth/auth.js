"use strict";

var Twitter = require("node-twitter-api");
var express = require('express');

module.exports = function (config) {

    var twitter = new Twitter({
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callback: config.twitter.callbackUrl
    });
    //TODO: this needs to go to cookie encrypted
    var _requestSecret;
    var router  = express.Router();

    router.get("/request-token",
        function (req, res) {
            twitter.getRequestToken(function (err, requestToken, requestSecret) {
                if (err)
                    res.status(500).send(err);
                else {
                    _requestSecret = requestSecret;
                    res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
                }
            });
        }
    );

    router.get("/access-token",
        function (req, res) {
            var requestToken = req.query.oauth_token;
            var verifier     = req.query.oauth_verifier;

            twitter.getAccessToken(requestToken, _requestSecret, verifier, function (err, accessToken, accessSecret) {
                if (err)
                    res.status(500).send(err);
                else
                    twitter.verifyCredentials(accessToken, accessSecret, function (err, user) {
                        if (err)
                            res.status(500).send(err);
                        else
                            res.send(user);
                    });
            });
        }
    );

    return router;
}



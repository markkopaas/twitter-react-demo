"use strict";

var twitter = require('../twitter-service');
var express = require('express');

module.exports = {create: create};

function create (config) {
    var onUnauthenticatedRedirectToLogin = function (req, res, next) {
        if (!req.session.authenticated) {
            res.redirect(config.requestTokenPath);
            return;
        }
        next();
    };

    var onUnauthenticatedReturnError = function (req, res, next) {
        if (!req.session.authenticated) {
            res.sendStatus(401);
            return;
        }
        next();
    };

    var router = express.Router();

    router.get(config.requestTokenPath,
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

    router.get(config.accessTokenPath,
        function (req, res) {
            var requestToken  = req.query.oauth_token;
            var verifier      = req.query.oauth_verifier;
            var requestSecret = req.session.requestSecret;

            delete req.session.requestSecret;

            twitter.getAccessToken(requestToken, requestSecret, verifier, function (err, accessToken, accessTokenSecret) {
                if (err) {
                    req.session = null;
                    res.status(500).send(err);
                    return;
                }

                twitter.verifyCredentials(accessToken, accessTokenSecret, function (error, data) {
                    if (error) {
                        req.session = null;
                        res.status(500).send(err);
                        return;
                    }
                    req.session.authenticated = true;
                    req.session.twitterToken  = {accessToken: accessToken, accessTokenSecret: accessTokenSecret};
                    req.session.user          = {name: data.name, screen_name: data.screen_name};
                    res.redirect(config.afterAuthPath);
                });
            });
        }
    );
    
    return {
        router: router,
        onUnauthenticatedRedirectToLogin: onUnauthenticatedRedirectToLogin,
        onUnauthenticatedReturnError: onUnauthenticatedReturnError
    };
}

"use strict";

module.exports = {create: create};

function create(config) {
    var byPass = function (req, res, next) {
        next();
    };

    var fakeAuthenticate = function (req, res, next) {
        req.session = {
            twitterToken: {
                accessToken: 'at',
                accessTokenSecret: 'as'
            },
            user: {
                name: 'testname',
                screen_name: 'testscreername'
            }
        };

        next();
    };

    return {
        router: byPass,
        onUnauthenticatedRedirectToLogin: fakeAuthenticate,
        onUnauthenticatedReturnError: fakeAuthenticate
    };
}

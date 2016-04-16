"use strict";

module.exports = {create: create};

function create (config) {
    var byPass = function (req, res, next) {
        next();
    };

    return {
        router: byPass,
        onUnauthenticatedRedirectToLogin: byPass,
        onUnauthenticatedReturnError: byPass
    };
}

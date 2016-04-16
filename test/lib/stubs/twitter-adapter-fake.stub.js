"use strict";
var q = require('q');

module.exports = {create: create};

var fakeResults = {z: 'x', s: 'f'};

function create() {
    return {
        getInitialTweets: function () {
            return q.resolve(fakeResults)
        }
    };
}

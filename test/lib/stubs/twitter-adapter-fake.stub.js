"use strict";
var q = require('q');

var Tweet = require('../../../domain/Tweet');

module.exports = {create: create};

var fakeResults = [new Tweet({text: 'Test Tweet Text'}), new Tweet({text: 'y'})];

function create() {
    return {
        getInitialTweets: function () {
            return q.resolve(fakeResults)
        }
    };
}

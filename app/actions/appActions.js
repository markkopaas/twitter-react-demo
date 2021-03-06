'use strict';

var Reflux = require('reflux');

var appActions = {
    init: Reflux.createAction(),
    toggleTweetSortOrder: Reflux.createAction(),
    tweetReceived: Reflux.createAction()
};

module.exports = appActions;
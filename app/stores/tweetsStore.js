'use strict';
var Reflux = require('reflux');

var appActions = require('../actions/appActions')

var tweets = [];
var tweetsCountLimit = 0;

var tweetsStore = Reflux.createStore({
    init: function () {
        this.listenTo(appActions.init, this.appInit);
    },
    appInit: function (INITIAL_APP_STATE) {
        tweets = INITIAL_APP_STATE.tweets;
        tweetsCountLimit = INITIAL_APP_STATE.tweetCountLimit;
        this.trigger(tweets);
    }
});

module.exports = tweetsStore;
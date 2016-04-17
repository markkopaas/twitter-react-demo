'use strict';
var Reflux = require('reflux');

var appActions         = require('../actions/appActions');
var userStore          = require('./userStore');
var tweetSortFunctions = require('../../lib/tweet-sort-functions');

var tweets;
var tweetSortOrder;
var tweetsCountLimit;

var tweetsStore = Reflux.createStore({
    init: function () {
        this.listenTo(appActions.init, this.appInit);
        this.listenTo(appActions.toggleTweetSortOrder, this.toggleTweetSortOrder);
    },
    appInit: function (INITIAL_APP_STATE) {
        tweets           = INITIAL_APP_STATE.tweets;
        tweetSortOrder   = INITIAL_APP_STATE.tweetSortOrder;
        tweetsCountLimit = INITIAL_APP_STATE.tweetCountLimit;
    },
    toggleTweetSortOrder: function () {
        var newIndex   = (tweetSortFunctions.tweetSortOrders.indexOf(tweetSortOrder) + 1) % tweetSortFunctions.tweetSortOrders.length;

        tweetSortOrder = tweetSortFunctions.tweetSortOrders[newIndex];

        var sortFunction = tweetSortFunctions.getSortFunction(tweetSortOrder, userStore.getUser().screen_name);

        tweets = tweets.sort(sortFunction);
        this.trigger(tweets, tweetSortOrder);
    }
});

module.exports = tweetsStore;
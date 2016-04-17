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
        this.listenTo(appActions.tweetReceived, this.tweetReceived);
    },
    appInit: function (INITIAL_APP_STATE) {
        tweets           = INITIAL_APP_STATE.tweets;
        tweetSortOrder   = INITIAL_APP_STATE.tweetSortOrder;
        tweetsCountLimit = INITIAL_APP_STATE.tweetCountLimit;
    },
    toggleTweetSortOrder: function () {
        var newIndex   = (tweetSortFunctions.tweetSortOrders.indexOf(tweetSortOrder) + 1) % tweetSortFunctions.tweetSortOrders.length;

        tweetSortOrder = tweetSortFunctions.tweetSortOrders[newIndex];

        sortTweets();

        this.trigger(tweets, tweetSortOrder);
    },
    tweetReceived: function (tweet) {
        tweets.push(tweet);
        sortTweets();
        limitTweets();

        this.trigger(tweets, tweetSortOrder);
    }
});

function sortTweets () {
    var tweetSortFunction = tweetSortFunctions.getSortFunction(tweetSortOrder, userStore.getUser().screen_name);

    tweets = tweetSortFunction(tweets);
}

function limitTweets () {
    tweets = tweets.slice(0, tweetsCountLimit);
}

module.exports = tweetsStore;
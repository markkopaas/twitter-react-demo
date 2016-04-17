'use strict';

var React  = require('react');
var Reflux = require('reflux');

var tweetsStore = require('../stores/tweetsStore');
var appActions  = require('../actions/appActions');

var TweetList        = require('./TweetList.react.jsx');
var Header           = require('./Header.react.jsx');
var SortOrderControl = require('./SortOrderControl.react.jsx');

var App = React.createClass({
    mixins: [
        Reflux.listenTo(tweetsStore, "onTweetsChange")
    ],
    getInitialState: function () {
        return this.props.initialAppState;
    },
    onTweetsChange: function (tweets, tweetSortOrder) {
        this.setState({tweets: tweets, tweetSortOrder:tweetSortOrder});
    },
    render: function () {
        return (
            <div>
                <Header user={this.state.user}/>
                <SortOrderControl
                    tweetSortOrder={this.state.tweetSortOrder}
                    onToggleTweetSortOrder={appActions.toggleTweetSortOrder}
                />
                <TweetList tweets={this.state.tweets}/>
            </div>
        );
    }
});

module.exports = App;
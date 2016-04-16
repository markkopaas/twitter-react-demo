'use strict';

var React  = require('react');
var Reflux = require('reflux');

var tweetsStore = require('../stores/tweetsStore');
var userStore   = require('../stores/userStore');

var TweetList = require('./TweetList.react.jsx');
var Header    = require('./Header.react.jsx');

var App = React.createClass({
    mixins: [
        Reflux.listenTo(tweetsStore, "onTweetsChange"),
        Reflux.listenTo(userStore, "onUserChange")
    ],
    getInitialState: function () {
        return this.props.initialAppState;
    },
    onTweetsChange: function (tweets) {
        this.setState({tweets: tweets});
    },
    onUserChange: function (user) {
        this.setState({user: user});
    },
    render: function () {
        return (
            <div>
                <Header user={this.state.user}/>
                <TweetList tweets={this.state.tweets}/>
            </div>
        );
    }
});

module.exports = App;
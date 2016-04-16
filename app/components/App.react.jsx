'use strict';

var React  = require('react');
var Reflux = require('reflux');

var tweetsStore = require('../stores/tweetsStore');

var TweetList = require('./TweetList.react.jsx')

var App = React.createClass({
    mixins: [Reflux.listenTo(tweetsStore, "onTweetsChange")],
    getInitialState: function () {
        return {tweets: this.props.initialAppState.tweets}
    },
    onTweetsChange: function (tweets) {
        this.setState({tweets: tweets});
    },
    render: function () {
        return (
            <div>
                <TweetList tweets={this.state.tweets}/>
            </div>
        );
    }
});

module.exports = App;
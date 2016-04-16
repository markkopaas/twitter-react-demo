'use strict';

var React = require('react');

var Tweet = require('./Tweet.react.jsx')

var TweetList = React.createClass({
    render: function () {
        return (
            <ul>
                {
                    this.props.tweets.map(function (tweet, index) {
                        return (<Tweet key={index} tweet={tweet}/>);
                    })
                }
            </ul>
        );
    }
});

module.exports = TweetList;
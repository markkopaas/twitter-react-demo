'use strict';

var React  = require('react');

var Tweet = React.createClass({
    render: function () {
        return (
            <li>
                <div>Text: {this.props.tweet.text}</div>
                <div>Created At: {this.props.tweet.created_at}</div>
                <div>Mentions: {this.props.tweet.entities && this.props.tweet.entities.user_mentions.map(function (user_mention) {
                    return user_mention.name + ' (@' + user_mention.screen_name + ')';
                }).join(', ')}</div>
            </li>
        );
    }
});

module.exports = Tweet;
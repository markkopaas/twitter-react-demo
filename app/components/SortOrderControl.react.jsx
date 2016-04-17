'use strict';

var React = require('react');

var SortOrderControl = React.createClass({
    render: function () {
        return (
            <div>
                <input
                    type="checkbox"
                    checked={this.props.tweetSortOrder==='userMentionsFirst'}
                    onChange={this.props.onToggleTweetSortOrder}
                /> My mentions first
            </div>
        );
    }
});

module.exports = SortOrderControl;
'use strict';

var React = require('react');

var Header = React.createClass({
    render: function () {
        return (
            <div>Welcome {this.props.user&&this.props.user.name} (@ {this.props.user&&this.props.user.screen_name})</div>
        );
    }
});

module.exports = Header;
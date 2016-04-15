'use strict';

var React = require('react');

var App = React.createClass({
    render: function () {
        return (
            <div>
                Props is: {JSON.stringify(this.props)}
            </div>
        );
    }
});

module.exports = App;
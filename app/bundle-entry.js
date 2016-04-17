var React    = require('react');
var ReactDOM = require('react-dom');

var appActions = require('./actions/appActions');

var App = React.createFactory(require('./components/App.react.jsx'));

// Over-render the static html component, using the same props that were used for rendering in server
ReactDOM.render(App({initialAppState: window.INITIAL_APP_STATE}), document.getElementById('react-app'));

// Populate the stores from the initial state
appActions.init(window.INITIAL_APP_STATE);

var socket = io();

socket.on('testmessage', function (data) {
    console.log('got from server', data);
    socket.emit('messageback', {my: 'data'});
});

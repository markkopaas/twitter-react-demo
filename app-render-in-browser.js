var React    = require('react');
var ReactDOM = require('react-dom');

var App = React.createFactory(require('./components/App.react.jsx'));

// Render the root component, using the same props that were used for rendering in server
ReactDOM.render(App(window.APP_PROPS), document.getElementById('react-app'));
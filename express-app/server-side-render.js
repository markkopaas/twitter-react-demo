require('node-jsx').install({extension: '.jsx'});

var ReactDOMServer = require('react-dom/server');
var React          = require('react');

var App                   = require('../app/components/App.react');
var twitterAdapterFactory = require('./../lib/twitter-adapter-factory');

module.exports = function (req, res, next) {
    var twitterAdapter = twitterAdapterFactory.create(req.session.twitterToken.accessToken, req.session.twitterToken.accessSecret);

    twitterAdapter.getInitialTweets()
        .then(function (initialTweets) {
            return {
                tweets: initialTweets
            };
        })
        .then(renderPage)
        .then(res.send.bind(res));
};

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

function renderApp(initialAppState) {
    return ReactDOMServer.renderToString(React.createElement(App, {initialAppState: initialAppState}));
}

function renderPage(initialAppState) {
    return '<body>' +
        '<div id="react-app">' + renderApp(initialAppState) + '</div>' +
        '<script>var INITIAL_APP_STATE = ' + safeStringify(initialAppState) + ';</script>' +
        '<script src="/js/bundle.js"></script>' +
        '</body>';
}
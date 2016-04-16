require('node-jsx').install({extension: '.jsx'});

var ReactDOMServer = require('react-dom/server');
var React          = require('react');

var App                   = require('../app/components/App.react');
var twitterAdapterFactory = require('./../lib/twitter-adapter-factory');

module.exports = function (config) {
    return function (req, res, next) {
        buildInitialAppState(config, req.session.twitterToken.accessToken, req.session.twitterToken.accessSecret)
            .then(renderPage)
            .then(res.send.bind(res));
    };
};

function buildInitialAppState(config, accessToken, accessSecret) {
    var twitterAdapter = twitterAdapterFactory.create(accessToken, accessSecret);

    return twitterAdapter.getInitialTweets(config.tweetCountLimit)
        .then(function (initialTweets) {
            return {
                tweetCountLimit: config.tweetCountLimit,
                tweets: initialTweets
            };
        })
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

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}


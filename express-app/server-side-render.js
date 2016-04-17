require('node-jsx').install({extension: '.jsx'});

var ReactDOMServer = require('react-dom/server');
var React          = require('react');

var tweetSortFunctions = require('../lib/tweet-sort-functions');

var App                   = require('../app/components/App.react');
var twitterAdapterFactory = require('./../lib/twitter-adapter-factory');

module.exports = function (config) {
    return function (req, res, next) {
        buildInitialAppState(config, req.session)
            .then(renderPage)
            .then(res.send.bind(res))
            .catch(next);
    };
};

function buildInitialAppState(config, session) {
    var twitterAdapter    = twitterAdapterFactory.create(session.twitterToken.accessToken, session.twitterToken.accessTokenSecret);
    var tweetSortFunction = tweetSortFunctions.getSortFunction(config.tweetSortOrder, session.user.screen_name);

    return twitterAdapter.getInitialTweets(config.tweetCountLimit)
        .then(function (initialTweets) {
            return initialTweets.sort(tweetSortFunction);
        })
        .then(function (initialTweets) {
            return {
                tweets: initialTweets,
                user: session.user,
                tweetCountLimit: config.tweetCountLimit,
                tweetSortOrder: config.tweetSortOrder
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
        '<script src="/socket.io/socket.io.js"></script>' +
        '<script src="/js/bundle.js"></script>' +
        '</body>';
}

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}


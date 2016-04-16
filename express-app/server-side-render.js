require('node-jsx').install({extension: '.jsx'});

var ReactDOMServer = require('react-dom/server');
var React          = require('react');
var q              = require('q');

var App = React.createFactory(require('../app/components/App.react'));

module.exports = function (req, res, next) {

    q.resolve([
            {a: 'b'},
            {c: 'd'}
        ])
        // twitterService.getLastTweets(10)
        .then(function (initialTweets) {
            var initialAppState = {
                tweets: initialTweets
            };
            return initialAppState;
        })
        .then(renderPage)
        .then(function (html) {
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        })
};

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

function renderApp(initialAppState) {
    return ReactDOMServer.renderToString(App({initialAppState: initialAppState}))
}

function renderPage(initialAppState) {
    return '<body>' +
        '<div id="react-app">' + renderApp(initialAppState) + '</div>' +
        '<script>var INITIAL_APP_STATE = ' + safeStringify(initialAppState) + ';</script>' +
        '<script src="/js/bundle.js"></script>' +
        '</body>';
}
require('node-jsx').install({extension: '.jsx'});

var ReactDOMServer = require('react-dom/server');
var React          = require('react');
var App            = React.createFactory(require('./components/App.react'));

module.exports = function (req, res, next) {

    var props = {
        tweets: [
            {a: 'b'},
            {c: 'd'}
        ]
    };

    var appMarkup = ReactDOMServer.renderToString(App(props));

    var html = '<body>' +
        '<div id="react-app">' + appMarkup + '</div>' +
        '<script>var APP_PROPS = ' + safeStringify(props) + ';</script>' +
        '<script src="/js/bundle.js"></script>' +
        '</body>';

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
};

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
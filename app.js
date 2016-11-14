require('node-jsx').install(); //enable use jsx in express
require('./middleware/ignore'); //ignore css

var path = require('path');
var express = require('express');
var jsdom = require('jsdom').jsdom;
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
var routes = require('./routes/index.js');
var app = express();

// set env
var env = process.env.NODE_ENV || '';
app.set('env', env);
app.locals.env = env;

var exposedProperties = ['window', 'navigator', 'document'];
global.document = jsdom('');
global.window = document.defaultView;
// global.$ = require("jquery")(document.defaultView);
global.$ = {
    ajaxSetup: function () {
    },
    ajax: function () {
    }
};
global.jQuery = {
    fn: {
        extend: function () {
            return this
        }
    }
};
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
app.use(cookieParser());

if (app.get('env') === 'dev') {
    var webpack = require('webpack'),
        proxy = require('http-proxy-middleware'),
        proxyObj = require('./property/proxy.json')[process.env.TARGET || 'mock'],
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('./webpack.config.dev.js'),
        compiler = webpack(webpackDevConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        hot: true,
        noInfo: true,
        serverSideRender: true,
        stats: {
            colors: true
        }
    }));

    app.use(webpackHotMiddleware(compiler));

    Object.keys(proxyObj).map(context => {
        var config = proxyObj[context];
        if (typeof config === 'string') {
            config = {
                target: config
            }
        }
        app.use(context, proxy(config));
    });

    app.get('/lib/:file', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'lib', req.params.file))
    })

} else {
    app.use(express.static(path.join(__dirname, 'public'))); //production use static
}

app.use('/', (req, res, next) => {
    if (/^\/$/.test(req.originalUrl)) {
        res.redirect('/index')
    }
    next()
}, routes);

module.exports = app;
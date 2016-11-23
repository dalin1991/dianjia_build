var path = require('path');
var express = require('express');
var router = express.Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var parseEntry = require('../middleware/ParsePlugin').parseEntry;
var menuHash = require('../property/menuHash.json');
var enter = parseEntry(path.join(__dirname, "../source"), {
	ignore: ['lib']
});
var source = {};
var getFilePath = function () {
};
var dev = process.env.NODE_ENV === 'dev';

if (dev) {
	getFilePath = require('../middleware/getFilePathPlugin');
} else {
	source = require('../server/static.prod.json');
}

router.get('/login', (req, res, next) => {
	const Model = require(enter.login),
		status = res.locals.webpackStats || {},
		currentPaths = dev ? getFilePath(status, 'login') : source.login,
		commonPaths = dev ? getFilePath(status, 'common') : source.common;
	res.render('login', {
		content: ReactDOMServer.renderToString(<Model />),
		scripts: Array.from(commonPaths.js).concat(Array.from(currentPaths.js)),
		csses: currentPaths.css
	});
});
/* GET home page. */
router.get('/:file', (req, res, next) => {
	const fileName = req.params.file,
		Menu = require(enter.menu),
		Header = require(enter.header),
		Model = require(enter[fileName]),
		status = res.locals.webpackStats || {},
		menuPaths = dev ? getFilePath(status, 'menu') : source.menu,
		headerPaths = dev ? getFilePath(status, 'header') : source.header,
		commonPaths = dev ? getFilePath(status, 'common') : source.common,
		currentPaths = dev ? getFilePath(status, fileName) : source[fileName],
		scripts = Array.from(commonPaths.js).concat(Array.from(headerPaths.js)).concat(Array.from(currentPaths.js)),
		csses = Array.from(menuPaths.css).concat(Array.from(headerPaths.css)).concat(Array.from(currentPaths.css));
	res.render('template', {
		csses: csses,
		scripts: scripts,
		header: ReactDOMServer.renderToString(<Header />),
		content: ReactDOMServer.renderToString(<Model url={req.url}/>),
		menu: ReactDOMServer.renderToString(<Menu crtSubMenu={`/${menuHash[fileName] || fileName}`}/>)
	});
});

router.get('/*', (req, res, next) => {
	if (/\./.test(req.originalUrl)) {
		next()
	} else {
		res.redirect('/index')
	}
});

module.exports = router;

// '/' next() -> error handlers
// 404 next() -> error handlers
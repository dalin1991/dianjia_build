require('../middleware/ignore');
require('babel-register')();

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];
global.document = jsdom('');
global.window = document.defaultView;
global.$ = {};
global.$.ajaxSetup = function () {
};
global.$.ajax = function () {
    return this
};
global.$.done = function () {
    return this
};
global.$.fail = function () {
};
global.app = {loginPath: ''};
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};
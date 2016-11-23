const storage = require('beyond-lib/lib/storage');
const {noDataAlert} = require('../lib/commonjs/util.js');
const basePath = '';

const setup = {
    type: 'post',
    contentType: 'application/json; charset=UTF-8',
    timeout: 90000,
    headers: {
        XTOKEN: storage.getCookie('token') || ''
    },
    error: error => {
        if (error.status == 401) {
            location.href = '/login'
        } else if (error.status == 500) {
            noDataAlert();
        }
    }
};

$.ajaxSetup(setup);

let upload = function (data) {
    return $.ajax({
        contentType: false,
        processData: false,
        url: basePath + '/upload/file',
        data: data
    })
};

module.exports = {
    upload
};

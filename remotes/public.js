const storage = require('beyond-lib/lib/storage');
const {noDataAlert} = require('../lib/commonjs/util.js');

const basePath = '/bestRMS/web';

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
        }else if(error.status == 500){
            noDataAlert();
        }
    }
};

$.ajaxSetup(setup);

let login = function (data) {
    return $.ajax({
        url: basePath + '/login/login',
        data: JSON.stringify(data)
    })
};

let downLoadRecordPage = function (data) {
    return $.ajax({
        url: basePath + '/downloadcenter/downLoadRecordPage',
        data: JSON.stringify(data)
    })
};

let getSkuReportList = function (data) {
    return $.ajax({
        url: basePath + '/skuReport/getSkuReportList',
        data: JSON.stringify(data)
    })
};

let getStoreStatisInfo = function (data) {
    return $.ajax({
        url: basePath + '/index/getStoreStatisInfo',
        data: JSON.stringify(data)
    })
};

let getSkuCategoryList = function (data) {
    return $.ajax({
        url: basePath + '/skuCategory/getSkuCategoryList',
        data: JSON.stringify(data)
    })
};

let getBasicSkuList = function (data) {
    return $.ajax({
        url: basePath + '/basicSku/getBasicSkuList',
        data: JSON.stringify(data)
    })
};

let exportStoreSku = function (data) {
    return $.ajax({
        url: basePath + '/storeSku/exportStoreSku',
        data: JSON.stringify(data)
    })
};

let getStoreSkuList = function (data) {
    return $.ajax({
        url: basePath + '/storeSku/getStoreSkuList',
        data: JSON.stringify(data)
    })
};

let getStoreNewSkuList = function (data) {
    return $.ajax({
        url: basePath + '/storeNewSku/getStoreNewSkuList',
        data: JSON.stringify(data)
    })
};

let exportStock = function (data) {
    return $.ajax({
        url: basePath + '/storeStock/exportStock',
        data: JSON.stringify(data)
    })
};

let getStockList = function (data) {
    return $.ajax({
        url: basePath + '/storeStock/getStockList',
        data: JSON.stringify(data)
    })
};

let getStockWarnSkuList = function (data) {
    return $.ajax({
        url: basePath + '/storeStock/getStockWarnSkuList',
        data: JSON.stringify(data)
    })
};

let getstoreBreakageDetailList = function (data) {
    return $.ajax({
        url: basePath + '/adjustOrder/getstoreBreakageDetailList',
        data: JSON.stringify(data)
    })
};

let getStocktakingDetailList = function (data) {
    return $.ajax({
        url: basePath + '/adjustOrder/getStocktakingDetailList',
        data: JSON.stringify(data)
    })
};

let getAdjustOrderList = function (data) {
    return $.ajax({
        url: basePath + '/adjustOrder/getAdjustOrderList',
        data: JSON.stringify(data)
    })
};

let updateStoreInfo = function (data) {
    return $.ajax({
        url: basePath + '/store/updateStoreInfo',
        data: JSON.stringify(data)
    })
};

let getStoreDetailInfo = function (data) {
    return $.ajax({
        url: basePath + '/store/getStoreDetailInfo',
        data: JSON.stringify(data)
    })
};

let exportSkuReport = function (data) {
    return $.ajax({
        url: basePath + '/skuReport/exportSkuReport',
        data: JSON.stringify(data)
    })
};

let getCategoryList = function (data) {
    return $.ajax({
        url: basePath + '/skuReport/getCategoryList',
        data: JSON.stringify(data)
    })
};

let exportStatmentReport = function (data) {
    return $.ajax({
        url: basePath + '/statmentReport/exportStatmentReport',
        data: JSON.stringify(data)
    })
};

let getstatmentReportList = function (data) {
    return $.ajax({
        url: basePath + '/statmentReport/getstatmentReportList',
        data: JSON.stringify(data)
    })
};

let getstatmentDetailReport = function (data) {
    return $.ajax({
        url: basePath + '/statmentReport/getstatmentDetailReport',
        data: JSON.stringify(data)
    })
};

let getCashierList = function (data) {
    return $.ajax({
        url: basePath + '/statmentReport/getCashierList',
        data: JSON.stringify(data)
    })
};

let logout = function (data) {
    return $.ajax({
        url: basePath + '/login/logout',
        data: JSON.stringify(data)
    })
};

let getStoreSupplierList = function (data) {
    return $.ajax({
        url: basePath + '/storeSupplier/getStoreSupplierList',
        data: JSON.stringify(data)
    })
};

let getPurchaseOrderList = function (data) {
    return $.ajax({
        url: basePath + '/purchaseOrder/getPurchaseOrderList',
        data: JSON.stringify(data)
    })
};

let getPurchaseOrderDetail = function (data) {
    return $.ajax({
        url: basePath + '/purchaseOrder/getPurchaseOrderDetail',
        data: JSON.stringify(data)
    })
};

let getSalesReturnOrderList = function (data) {
    return $.ajax({
        url: basePath + '/salesReturnOrder/getSalesReturnOrderList',
        data: JSON.stringify(data)
    })
};

let getSalesReturnOrderDetail = function (data) {
    return $.ajax({
        url: basePath + '/salesReturnOrder/getSalesReturnOrderDetail',
        data: JSON.stringify(data)
    })
};


module.exports = {
    downLoadRecordPage,
    login, logout,
    getSkuReportList,
    getStoreStatisInfo,
    getSkuCategoryList,
    getBasicSkuList,
    exportStoreSku,
    getStoreSkuList,
    getStoreNewSkuList,
    exportStock,
    getStockList,
    getStockWarnSkuList,
    getstoreBreakageDetailList,
    getStocktakingDetailList,
    getAdjustOrderList,
    updateStoreInfo,
    getStoreDetailInfo,
    exportSkuReport,
    getCategoryList,
    exportStatmentReport,
    getstatmentReportList,
    getstatmentDetailReport,
    getCashierList,
    getStoreSupplierList,
    getPurchaseOrderList,
    getPurchaseOrderDetail,
    getSalesReturnOrderList,
    getSalesReturnOrderDetail

};

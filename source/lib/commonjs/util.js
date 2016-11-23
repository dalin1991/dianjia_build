/**
 * Created by BG236557 on 2016/10/25.
 */
const React = require('react');
const dateFormat = require('beyond-lib/lib/dateFormat');

function dateCellRender(cell) {
    return (
        <span title={dateFormat('yyyy-MM-dd HH:mm', cell)}>
            {dateFormat('yyyy-MM-dd HH:mm', cell)}
        </span>
    )
}

function downloadAlert() {
    $.fn.alertModal({msg: '正在导出，请到“下载中心”下载文件', status: 'success'})
}

function noDataAlert() {
    $.fn.alertModal({msg: '没有获取到数据', status: 'error'})
}

function initOption(list) {
    let output = [];
    for (let key in list) {
        output.push(<option value={key} key={key}>{list[key]}</option>)
    }
    return output;
}

function calcRowSpan(list, format) {
    let cache = [], len = list && list.length || 0;
    for (let i = 0; i < len; i++) {
        let item = list[i], lastIndex = cache.length - 1, compare = format.call(null, item);
        if (cache[lastIndex] && cache[lastIndex].start !== undefined) {
            if (compare === cache[lastIndex].label) {
                cache[lastIndex].end = i;
            } else {
                cache.push({
                    start: i,
                    label: compare
                });
            }
        } else {
            cache.push({
                start: i,
                label: compare
            });
        }
    }
    return cache
}

function rowSpanRender(index) {
    let obj = {};
    this.cache.map(item=> {
        if (item.start === index && item.end !== undefined) {
            obj = {rowSpan: item.end - item.start + 1}
        }
        if (index > item.start && item.end >= index) {
            obj = {rowSpan: 0}
        }
    });
    return obj;
}
module.exports = {dateCellRender, downloadAlert, noDataAlert, initOption, calcRowSpan, rowSpanRender};
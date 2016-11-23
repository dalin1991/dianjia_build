/**
 * Created by BG200040 on 2016/11/22.
 */
var path = require('path'),
    express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    xlsx = require('xlsx');

router.all('/', (req, res, next)=> {

    console.log(req.file);

    fs.rename(path.join(__dirname, '../files', req.file.filename), path.join(__dirname, '../files', req.file.filename + '.xls'), (e)=> {});

    var workbook = xlsx.readFile(path.join(__dirname, '../files', req.file.filename + '.xls'));

    // console.log(workbook);

    console.log(xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]));

    res.send('get')
});

module.exports = router;
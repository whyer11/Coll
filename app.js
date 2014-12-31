/**
 * Created by wanghuanyu on 14-12-31.
 */
var util = require('./util');
var mysql = require('mysql');
var _mysql = require('./mysql');

//util.wget('', function ($,res,body) {
//    console.log(body);
//});
//console.log(mysql);
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

connection.connect();
    connection.query('SELECT * FROM paw.test', function (err,rows,fields) {
    if(err) throw err;
    console.log(rows);
});

_mysql.query('SELECT * FROM paw.test', function (err, rows, fields) {
    if(err) throw err;
    console.log(rows);
    console.log(fields);
})
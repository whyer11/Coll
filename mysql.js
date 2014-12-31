/**
 * Created by wanghuanyu on 14-12-31.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

module.exports = {
    query: function (str,cb) {
        connection.connect();
        connection.query(str,cb);
        connection.end();
    }
};
/**
 * Created by wanghuanyu on 14-12-31.
 */

var request = require('request');
var env = require('jsdom').env;
module.exports = {
    clearReturn: function (str) {
        return str.replace(/\n/gm, '');
    },
    wget: function (url,cb) {
        request(url, function (err, res, body) {
            if(err) throw err;
            env(body, function (err, window) {
                if(err) throw err;
                var $ = require('jquery')(window);
                return cb($,res,body);
            })
        })
    }
}
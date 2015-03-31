/**
 * Created by wanghuanyu on 14-12-31.
 */

var request = require('request');
var cheerio = require('cheerio');
module.exports = {
    clearReturn: function (str) {
        return str.replace(/\n/gm, '');
    },
    wget: function (url,cb) {
        request(url, function (err, res, body) {
            if(err) throw err;
            var $ = cheerio.load('body');
            cb($,res,body);
        })
    }
}
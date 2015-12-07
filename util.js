/**
 * Created by wanghuanyu on 14-12-31.
 */

var request = require('request');
var cheerio = require('cheerio');
module.exports = {
    clearReturn: function (str) {
        return str.replace(/\s/gm, '');
    },
    wget: function (url,cb) {
        var options = {
            url:url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36'
            }
        }
        request(options,function (err, res, body) {
            if(err) throw err;
            var $ = cheerio.load('body');
            cb($,res,body);
        })
    }
}
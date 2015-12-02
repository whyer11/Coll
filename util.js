/**
 * Created by wanghuanyu on 14-12-31.
 */

var request = require('request');
//var env = require('jsdom').env;
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
    },
    TimeRecord: function () {
        this.array = [];
        this.begin = function(){
            var date = new Date();
            var start = date.getTime()
            this.array.push(start);
        };
        this.end = function () {
            if(this.array.length == 0) throw 'begin not match end';
            var date = new Date();
            var end = date.getTime();
            var start = this.array.pop();
            return end-start;
        };
    },
    errHandle : function (err){
        if(err){
            console.log(err);
        }
    },
    /**
     *
     * @param path
     * @param content
     */
    log: function (path,content) {

    }
}
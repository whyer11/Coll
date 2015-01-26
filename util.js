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
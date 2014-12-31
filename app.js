/**
 * Created by wanghuanyu on 14-12-31.
 */
var request = require('request');
var iconv = require('iconv-lite');
var env = require('jsdom').env;
var util = require('./util');

request('http://www.zhihu.com/question/27220036', function (err, res, body) {
    //console.log(body);
    env(body, function (err, window) {
        //console.log(err);
        var $ = require('jquery')(window);
        var str = $('.zm-item-title').text();
        var ab = util.clearReturn(str);
        console.log(ab);
    })
});


//console.log($);


//env(html, function (err, window) {
//    var $ = require('jquery')(window);
//    console.log($('#aa').text());
//})
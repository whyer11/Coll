/**
 * Created by wanghuanyu on 14-12-31.
 */
var util = require('./util');

util.wget('https://kyfw.12306.cn/otn/regist/init', function ($,res,body) {
    console.log(body);
});

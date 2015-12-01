/**
 * Created by wanghuanyu on 14-12-31.
 */
var util = require('./util');
var orm = require('orm');
var url = 'http://www.zhihu.com/question/';
var questionId = 19550225;
var config = {
    protocol: "mysql",
    host: "127.0.0.1",
    database: "zhihu",
    port: '3306',
    query: {pool: true},
    user: "root",
    password: "q"
}
orm.connect(config, function (err, db) {
    if(err) console.log(err);
    var question = db.define("question", {
        id: Number,
        QUES_ID: Number,
        QUES_TOP: Number,
        QUES_TITLE: {type: 'text'},
        STATUS: Number
    }, {
        id: 'id'
    });

    function something(qid) {
        var currentQuestionUrl = url + qid;
        util.wget(currentQuestionUrl, function ($, res, body) {
            var title = util.clearReturn($(body).find('.zm-item-title').text());
            var toper = [];
            for(var i = 0;i<$(body).find('.count').length;i++){
                toper.push($(body).find('.count')[i].innerHTML);
            }
            toper.sort(function(a,b){return b-a});
            toper = toper[0];
            if (res.statusCode == '200') {
                question.create({
                    QUES_ID: qid,
                    QUES_TOP: toper || null,
                    QUES_TITLE: title,
                    STATUS: res.statusCode
                }, function (err) {
                    if (err) console.log(err);
                    console.log(qid + '--' + res.statusCode + '---' + (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100 +' + '+ title);
                    something(++qid);
                });
            } else {
                question.create({
                    QUES_ID: qid,
                    QUES_TOP: null,
                    QUES_TITLE: null,
                    STATUS: res.statusCode
                }, function (err) {
                    if (err) console.log(err);
                    console.log(qid + '--' + res.statusCode + '---' + (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100);
                    something(++qid);
                });
            }
        })
    }

    db.driver.execQuery('select max(QUES_ID) as max from question', function (err, data) {
        if(err) console.log(err);
        console.log(data);
        console.log('已找到最大问题ID为' + data[0].max);
        if (data[0].max) {
            something(parseInt(data[0].max) + 1);

        } else {
            something(questionId);
        }
    });
})



























































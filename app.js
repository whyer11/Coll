/**
 * Created by wanghuanyu on 14-12-31.
 */
var util = require('./util');
var orm = require('orm');
var url = 'http://www.zhihu.com/question/';
var config = require('./config');
var questionId = 19550225;
orm.connect(config, function (err, db) {
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
            var toper = parseInt(util.clearReturn($(body).find('#zh-question-answer-wrap').children().first().find('.zm-votebar .up .count').text()));
            if (res.statusCode == '200') {
                //console.log(qid+'----'+toper);
                //something(++qid);
                question.create({
                    QUES_ID: qid,
                    QUES_TOP: toper || null,
                    QUES_TITLE: title,
                    STATUS: res.statusCode
                }, function (err) {
                    if (err) console.log(err);
                    console.log(qid + '--' + res.statusCode + '---' + (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100);
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
        console.log('已找到最大问题ID为' + data[0].max);
        if (data[0].max) {
            something(parseInt(data[0].max) + 1);

        } else {
            something(questionId);
        }
    });
})



























































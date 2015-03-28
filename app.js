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
    database: "zhihuo",
    port:'3306',
    query:{ pool: true },
    user:"root",
    password:""
}

orm.connect(config, function (err, db) {
    var question = db.define("question",{
        id:Number,
        QUES_ID:Number,
        QUES_TITLE:String,
        ANSW_BEST:String,
        STATUS:Number
    },{
        id:'id'
    });
    function something(qid){
        var currentQuestionUrl = url+qid;
        util.wget(currentQuestionUrl, function ($, res, body) {
            var status = res.statusCode;

            if(body.substring(0,2) != '<!'){
                return something(qid);
            }else if(status == '200'){
                var title = $(body).find('.zm-item-title').text();
                var topAnswer = $(body).find('#zh-question-answer-wrap').children().first();
                var voteCount = topAnswer.find('.zm-votebar .up .count').text();
                question.create({
                    QUES_ID:qid,
                    QUES_TITLE:title,
                    ANSW_BEST:voteCount,
                    STATUS:status
                },function(err){
                    if(err) console.log(err);
                });
                console.log(qid+'--'+status+'---'+(process.memoryUsage().heapUsed/process.memoryUsage().heapTotal)*100);
                something(++qid);
            }else{
                question.create({
                    QUES_ID:qid,
                    QUES_TITLE:null,
                    ANSW_BEST:null,
                    STATUS:status
                },function(err){
                    if(err) console.log(err);
                });
                console.log(qid+'--'+status+'---'+(process.memoryUsage().heapUsed/process.memoryUsage().heapTotal)*100);
                something(++qid);
            }
        })
    }
    db.driver.execQuery('select max(QUES_ID) as max from question', function (err,data) {
        console.log('已找到最大问题ID为'+data[0].max);
        if(data[0].max){
            var max = parseInt(data[0].max)+1;
            something(max);
        }else{
            something(questionId);
        }
    });

})



























































/**
 * Created by wanghuanyu on 14-12-31.
 */
var util = require('./util');
var mysql = require('mysql');
//var _mysql = require('./mysql');
var url = 'http://www.zhihu.com/question/';
/**
 * the first question of zhihu
 * @type {number}
 */
var questionId = 19550225;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});


//var tr = new util.TimeRecord();

var coll = function (id) {
    //tr.begin();
    //console.log(start.getTime());
    var currentQuestionUrl = url+id;
    util.wget(currentQuestionUrl, function ($, res, body) {
        var status = res.statusCode;
        if(body.substring(0,2) != '<!'){
            //console.log(id+' : '+tr.end());
            return coll(id);
        }else {
            var title = util.clearReturn($(body).find('.zm-item-title').text());
            var topAnswer = $(body).find('#zh-question-answer-wrap').children().first();
            var voteCount = util.clearReturn(topAnswer.find('.zm-votebar .up .count').text());
            connection.query('INSERT INTO `zhihu`.`QANDA` (`QUES_ID`, `QUES_TITLE`, `QUES_STATUS`, `TOP_ANSER_COUNT`) VALUES ("'+id+'", "'+title+'", "'+status+'", "'+voteCount+'")', function (err, rows, fields) {
                util.errHandle(err);
                console.error(id);
                return coll(++id);

            });


        }
    })
};



connection.connect();
connection.query('SELECT max(zhihu.QANDA.QUES_ID) FROM zhihu.QANDA', function (err,rows,field) {
    util.errHandle(err);
    console.log('The last question is :'+rows[0]['max(zhihu.QANDA.QUES_ID)']);
    if(rows[0]['max(zhihu.QANDA.QUES_ID)']){
        var id = parseInt(rows[0]['max(zhihu.QANDA.QUES_ID)'])+1;
        coll(id);
    }else{
        coll(questionId);
    }
});

//
//_mysql.query('SELECT * FROM paw.test', function (err, rows, fields) {
//    if(err) throw err;
//    console.log(rows);
//    console.log(fields);
//})
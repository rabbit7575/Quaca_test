var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = require('../../app');
var conn = require('../components/mariaDB');
var first = require("../function/first");
var moment = require('moment');
var https = require('https');
var request = require('request');
const { title } = require('process');
let serverurl = "https://heronoah.github.io/Tera_Quaca_Notice/server.json";

//quoka
router.get('/', function (req, res, next) {
    let Qmail = req.query.email; 
    console.log(Qmail);
    res.render('sign_up',{ title :"회원가입", Qmail:Qmail,overLap:' ' });
  });



  //사용자목록
  router.get('/users', function (req, res) {
    console.log("in");
    let email = req.query.email;
    conn.connection.query('SELECT * FROM QUser where Email like' +'"'+email + '"' , function (err, rows, fields) {
        // console.log(rows.length);
        if (!err) {
            console.log(rows);
            console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
            res.send(rows);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
});
router.get('/idcheck', function (req, res) {
    let Qmail = req.query.Qmail;
    console.log(Qmail);
    if(Qmail != '' || null ){
        conn.connection.query('SELECT * FROM QUser where Email = '+ '"'+Qmail+'"', function (err, rows, fields) {
            console.log(rows.length);
            if (rows.length == 0) { 
                res.render('sign_up', { title :"회원가입",  overLap: 'ID 사용가능', Qmail: Qmail });
            } else {
                console.log('중복id발견');
                res.render('sign_up', { title :"회원가입",  overLap: 'ID 중복', Qmail:' ' });
              }
        });
    }else{
        console.log('null값 입력');
        res.render('sign_up', { title :"회원가입",  overLap: ' ', Qmail:'' });
    }

});
//회원가입 insert 쿼리
router.get('/signup', function (req, res) {
    let Email = req.query.Qmail;
    let NickName = req.query.NickName;
    let TelNo = req.query.TelNo;
    let CMCode = req.query.CMCode;
    let UseYn = 'Y';
    var date = moment().format('YYYY-MM-DD HH:mm:ss');

    if(Email != '' || null){
    conn.connection.query('SELECT * FROM QUser where Email = ' + '"' + Email + '"', function (err, rows, fields) {
        //console.log(rows.length);
        if (rows.length == 0) { 
            var sql = 'INSERT INTO QUser VALUES (?,?,?,?,?,?)';
            var params =[Email,NickName,TelNo,CMCode,UseYn,date];
            conn.connection.query(sql,params, function (err, rows, fields) {
                if (!err) {
                    console.log("success !!");
                    console.log(rows);
                    res.send(rows);
                } else {
                    console.log('query error : ' + err);
                    res.send(err);
                }
            }); 
          } else {
            console.log('중복id발견');
            res.render('sign_up', { title :"회원가입",  overLap: 'ID 중복', Qmail:' ' });
          }
      });
    }else{
        console.log('null값 입력');
        res.render('sign_up', { title :"회원가입",  overLap: ' ', Qmail:'ID 및 PW를 입력하십시오.' });
    }
  });

  router.get('/home', function (req, res) {
    request({
        url: serverurl,
      }, function (err, ress, html) {
        if (err) {
          console.log(err);
          return;
        }
        //console.log(html);
        const noticeJson = JSON.parse(html);
        var hUrl = noticeJson.serverUrl;
        var Url = req.protocol + '://' + req.get('host');
        res.render('index', { title: 'Quaca!!!', Url: Url,hUrl:hUrl});
        console.log("헤로쿠url :" ,hUrl);
        console.log("현재url :" ,Url);
      });
});
module.exports = router;
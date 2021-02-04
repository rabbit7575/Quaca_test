// 선언 구간
var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = require('../../app');
var conn = require('../components/mariaDB');
var fisrt = require("../function/first");
var moment = require('moment');
var https = require('https');
var request = require('request');
const {title} = require('process');
const ejs = require('ejs');
let serverurl = "https://heronoah.github.io/Tera_Quaca_Notice/server.json";

//quoka user Info

// 1. 회원정보 조회
router.get('/search', function (req, res, next){
    let email = req.query.email;
    console.log(email);
    if(email != null && email != ""){
        conn.connection.query(
            'SELECT Email, NickName, TelNo, CMCode, UseYn, date_format(InsertDt, "%Y-%m-%d %H:%i") AS InsertDt FROM QUser '
            +'where Email like "%' + email + '%"', function(err, rows, fieldes){
            console.log(rows);
            if(!err){
                if(rows.length > 0){
                    res.send(rows);
                }else{
                    res.send('데이터가 존재하지 않습니다.');
                }
            }else{
                console.log('query error'+err);
                res.send(err);
            }

        });
    }else{
        res.send('조회 할 수 없습니다.');
    }
});

// 2. 회원 조회, 수정,  삭제 화면 이동 처리 
router.get('/edit', function (req, res, next) {
    let email = req.query.email;
    console.log(email);
    var sql = 'SELECT Email, NickName, TelNo, CMCode, UseYn, date_format(InsertDt, "%Y-%m-%d %H:%i") AS InsertDt FROM QUser '
    +'where Email like "%'+email+'%"';
    console.log(sql);
    conn.connection.query(sql, function(err, rows, fieldes){
        if(err){console.log(err);}
        else{
            if(rows.length > 0){
                res.render('userInfoUpdate',{title : '회원 정보', overLap:'', Email:rows[0].Email, NickName:rows[0].NickName, TelNo:rows[0].TelNo, CMCode:rows[0].CMCode, UseYn:rows[0].UseYn, InsertDt:rows[0].InsertDt});
            }else{
                res.render('userInfoUpdate',{title : '회원 정보', overLap:'', Email:'', NickName:'', TelNo:'', CMCode:'', UseYn:'', InsertDt:'', });
            }
        }            
    });
});

// 3. 회원정보 페이지 기능 (조회)
router.get('/infoSearch', function(req, res, next){
    console.log("!@조회");
    let email = req.query.Email;
    
    var sql = 'SELECT Email, NickName, TelNo, CMCode, UseYn, date_format(InsertDt, "%Y-%m-%d %H:%i") AS InsertDt FROM QUser '
    +'where Email like "%'+email+'%"';
    console.log(sql);
    conn.connection.query(sql, function(err, rows, fieldes){
        if(err){console.log(err);}
        else{
            if(rows.length > 0){
                res.render('userInfoUpdate',{title : '회원 정보', overLap:'', Email:rows[0].Email, NickName:rows[0].NickName, TelNo:rows[0].TelNo, CMCode:rows[0].CMCode, UseYn:rows[0].UseYn, InsertDt:rows[0].InsertDt});
            }else{
                res.render('userInfoUpdate',{title : '회원 정보', overLap:'', Email:'', NickName:'', TelNo:'', CMCode:'', UseYn:'', InsertDt:'', });
            }
        }            
    });
});

// 4. 회원정보 페이지 기능(수정)
router.get('/infoUpdate', function(req, res, next){
    console.log("!@수정");
    let email = req.query.Email;
    let nickName = req.query.NickName;
    let telNo = req.query.TelNo;
    let cmCode = req.query.CMCode;
    let useYn = req.query.UseYn;

    // 수정 처리 
    var updateSql = 'UPDATE QUser SET NickName=?, TelNo=?, CMCode=?, UseYn=? WHERE Email= ?';
    var params = [nickName, telNo, cmCode, useYn, email];
    console.log(params);
    conn.connection.query(updateSql, params, function(err, rows, fieldes){
            if(err) console.log("err : " + err);
    });
    
    // 조회 처리 
    var selectSql = 'SELECT Email, NickName, TelNo, CMCode, UseYn, date_format(InsertDt, "%Y-%m-%d %H:%i") AS InsertDt FROM QUser '
    +'where Email like "%'+email+'%"';
    conn.connection.query(selectSql, function(err, rows, fieldes){
        if(err){console.log(err);}
        else{            
            //res.render('userInfo',{title : '회원 정보', overLap:'', Email:rows[0].Email, NickName:rows[0].NickName, TelNo:rows[0].TelNo, CMCode:rows[0].CMCode, UseYn:rows[0].UseYn, InsertDt:rows[0].InsertDt});
            if(rows.length > 0){
                res.render('userInfoUpdate',{title : '회원 정보', overLap:'', Email:rows[0].Email, NickName:rows[0].NickName, TelNo:rows[0].TelNo, CMCode:rows[0].CMCode, UseYn:rows[0].UseYn, InsertDt:rows[0].InsertDt});
            }else{
                res.render('userInfoUpdate',{title : '회원 정보', overLap:'', Email:'', NickName:'', TelNo:'', CMCode:'', UseYn:'', InsertDt:'', });
            }
        }            
    });
});

// 5. 회원정보 페이지 기능(등록)
router.get('/infoInsert', function(req, res, next){
    console.log("!@등록");
    let email = req.query.Email;
    let nickName = req.query.NickName;
    let telNo = req.query.TelNo;
    let cmCode = req.query.CMCode;
    let useYn = req.query.UseYn;
    let insertDt = moment().format('YYYY-MM-DD HH:mm:ss');
    
    // 등록 처리 
    var insertSql = 'INSERT INTO QUser (Email, NickName, TelNo, CMCode, UseYn, InsertDt) VALUE(?, ?, ?, ?, ?, ?)';
    var params = [email, nickName, telNo, cmCode, useYn, insertDt];
    conn.connection.query(insertSql, params, function(err, rows, fieldes){
        if(err){console.log(err);}
    });

     // 조회 처리 
     var selectSql = 'SELECT Email, NickName, TelNo, CMCode, UseYn, date_format(InsertDt, "%Y-%m-%d %H:%i") AS InsertDt FROM QUser '
    +'where Email like "%'+email+'%"';
     conn.connection.query(selectSql, function(err, rows, fieldes){
         if(err){console.log(err);}
         else{            
             if(rows.length > 0){
                res.render('userInfoInsert',{title : '회원 정보', overLap:'', Email:rows[0].Email, NickName:rows[0].NickName, TelNo:rows[0].TelNo, CMCode:rows[0].CMCode, UseYn:rows[0].UseYn, InsertDt:rows[0].InsertDt});
            }else{
                res.render('userInfoInsert',{title : '회원 정보', overLap:'', Email:'', NickName:'', TelNo:'', CMCode:'', UseYn:'', InsertDt:'', });
            }
         }            
     });
});

//6. 삭제처리 
router.get('/infoDelete', function(req, res, next){
    console.log("삭제");
    let email = req.query.Email;

    var deleteSql = 'DELETE FROM QUser WHERE Email =?';
    var params = [email];
    conn.connection.query(deleteSql, params, function(err, rows, fieldes){
        if(err){console.log(err);}
    });

     // 조회 처리 
     var selectSql = 'SELECT Email, NickName, TelNo, CMCode, UseYn, date_format(InsertDt, "%Y-%m-%d %H:%i") AS InsertDt FROM QUser '
    +'where Email like "%'+email+'%"';
     conn.connection.query(selectSql, function(err, rows, fieldes){
         if(err){console.log(err);}
         else{            
             //res.render('userInfo',{title : '회원 정보', overLap:'', Email:rows[0].Email, NickName:rows[0].NickName, TelNo:rows[0].TelNo, CMCode:rows[0].CMCode, UseYn:rows[0].UseYn, InsertDt:rows[0].InsertDt});
             if(rows.length > 0){
                res.render('userInfoUpdate',{title : '회원 정보', overLap:'', Email:rows[0].Email, NickName:rows[0].NickName, TelNo:rows[0].TelNo, CMCode:rows[0].CMCode, UseYn:rows[0].UseYn, InsertDt:rows[0].InsertDt});
            }else{
                res.render('userInfoUpdate',{title : '회원 정보', overLap:'', Email:'', NickName:'', TelNo:'', CMCode:'', UseYn:'', InsertDt:'', });
            }
         }            
     });
});

// 7. 등록 페이지 이동
router.get('/insert', function (req, res, next) {
    res.render('userInfoInsert',{title : '회원 등록', overLap:'', Email:'', NickName:'', TelNo:'', CMCode:'', UseYn:'', InsertDt:'', });
});


// 홈
router.get('/home', function (req, res) {
    res.render('index',{title:"User",hUrl:' ', Url:' ' });
});





module.exports = router;
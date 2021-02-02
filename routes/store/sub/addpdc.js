var express = require('express');
var router = express.Router();
var conn = require('./components/db');

//상품 추가 쿼리
//insert
var sql = 'INSERT INTO goods VALUES (?,?,?,?)';
//insert 값 화면으로부터 받아옴
//var params =[goodsNo,name,cost,beans];
var params =[5,'콜드브루','4000','남아공'];

router.get('/', function (req, res, next) {
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
     
  });

  module.exports = router;
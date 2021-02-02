var express = require('express');
var router = express.Router();
var conn = require('../../components/db');

//insert 쿼리
var sql = 'INSERT INTO CUSTOMER VALUES (?,?,?,?,?,?)';
//insert 값 화면으로부터 받아옴
//var params =[id,image,this.name,birthday,gender,job];
var params =[11,null,'장두한','290805','남자','경찰'];

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
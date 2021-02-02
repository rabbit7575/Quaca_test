var express = require('express');
var router = express.Router();
var conn = require('../../components/db');

//매장 추가 화면
var sql = 'INSERT INTO STORE VALUES (?,?,?,?,?,?,?)';
//insert 값 화면으로부터 받아옴
//var params =[STOREID,AREA,ADDR,COLOR,CEO,USEYN,COLOR_CD];
var params =['GN001','부산','부산광역시 광안대로 394,102호','레트로','김유신','Y','04'];

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
var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = require('../../app');
var first = require("../function/first");
var moment = require('moment');
var conn = require('../components/mariaDB');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('store', { title: 'store!!' });
});

//스토어 select
router.get('/store_all', function (req, res) {
    let QId = req.query.QId;
    conn.connection.query('SELECT * FROM QStoreInfo where QId like'+'"' +QId + '"', function (err, rows, fields) {
        if (!err) {
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);       
            res.send(rows);
        } else {
            console.log("---------------------------ww-----");
            console.log('query error : ' + err);
            res.send(err);
        }
    });
});

//스토어 insert
//var sql = 'INSERT INTO QSTORE VALUES (?,?,?,?,?,?,?,?,?,?)';
//insert 값 화면으로부터 받아옴
//var params =[STOREID,AREA,ADDR,COLOR,CEO,USEYN,COLOR_CD];
//var params =['8905434567811','창원시 남악대로 314,102호','카페 느림','053-175-3456','89054','3456781','35.1468191001','126.85464790001','Y','2021-01-19 09:27:23'];
// router.get('/addst', function (req, res) {
//     console.log("start~~~~~~~~~~~~~~~~~");
//     let StoreName = req.query.StoreName;
//     let Addrss = req.query.Addrss;
//     let TelNo = req.query.TelNo;
//     let SigunguCode = req.query.SigunguCode;
//     let RoadnameCode = req.query.RoadnameCode;
//     let LlatTudeCode = req.query.LlatTudeCode;
//     let LongiTude = req.query.LongiTude;
//     let UseYn = 'Y';
//     var date = moment().format('YYYY-MM-DD HH:mm:ss');
//     let UID = SigunguCode+RoadnameCode+1;
//     console.log(UID);

//     if(UID != '' || null ){
//         conn.connection.query('SELECT * FROM QSTORE where UID = ' + '"' + UID + '"', function (err, rows, fields) {
//             console.log(rows.length);
//             if (rows.length == 0) { 
//                 var sql = 'INSERT INTO QSTORE VALUES (?,?,?,?,?,?,?,?,?,?)';
//                 var params =[UID,Addrss,StoreName,TelNo,SigunguCode,RoadnameCode, LlatTudeCode, LongiTude, UseYn ,date];
//                 conn.connection.query(sql,params, function (err, rows, fields) {
//                     if (!err) {
//                         console.log("success !!");
//                         console.log(rows);
//                         res.send(rows);
//                     } else {
//                         console.log('query error : ' + err);
//                         res.send(err);
//                     }
//                 }); 
//               } else {
//                 console.log('중복id발견');
//               }
//           });
//     }else{
//         console.log('null값 입력');
//     }
//   });

module.exports = router;


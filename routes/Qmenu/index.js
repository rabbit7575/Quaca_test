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

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('menu', { title: 'menu!!' });
});

//상품 select
router.get('/menu', function (req, res, next) {
    console.log("1");
    var menu = req.query.menu;
    console.log('gggg'+menu);
    conn.connection.query('SELECT * FROM QMenu where QId like '+ '"'+ menu +'"', function (err, rows, fields) {
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


// //상품 insert
// var sql = 'INSERT INTO QMenu VALUES (?,?,?,?,?,?,?,?)';
// var params =['D0006','카페라떼','D', null,'4000',null, 'Y','2021-01-19 13:19:30' ];

// router.get('/addpdc', function (req, res, next) {
//     conn.connection.query(sql,params, function (err, rows, fields) {
//         if (!err) {
//             console.log("success !!");
//             console.log(rows);
//             res.send(rows);
//         } else {
//             console.log('query error : ' + err);
//             res.send(err);
//         }     
//     });    
//   });
var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var first = require("./function/first");
var JUserPay = require("../json/UserPay.json");
var JUserPayDetail = require("../json//UserPayDetail.json");

var server = require("../json/server.json");

var https = require('https');
var request = require('request');
const { title } = require('process');
let serverurl = "https://heronoah.github.io/Tera_Quaca_Notice/server.json";




// request({
//   url: serverurl,
// }, function(err, res, html) {
//   if (err) {
//       console.log(err);
//       return;
//   }
//   console.log(html);
//   const noticeJson = JSON.parse(html);
//   console.log(noticeJson.serverUrl);
// });

router.get('/', function (req, res, next) {
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


// request({
//   url: serverurl,
// }, function(err, res, html) {
//   if (err) {
//       console.log(err);
//       return;
//   }
//   //console.log(html);
//   const noticeJson = JSON.parse(html);

// });
// console.log(aa);

// router.get('/', function (req, res, next) {

//   var Url = req.protocol + '://' + req.get('host');
//   res.render('index', { title: 'Quaca!!!', Url: Url});

//   });






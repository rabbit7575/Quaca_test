const { name } = require('ejs');
var express = require('express');
var router = express.Router();
const app = express();
var conn = require('../components/mariaDB');

router.get('/QUserPay', function (req, res, next) {
  var email = req.query.email;
  conn. connection.query('SELECT Email,PayUid,orderCnt,orderNum,Qname AS FirstMenuName, OrderSTatus,PayCompleteTime,MenuCompleteTime,TotalPrice FROM QUserPayDetail where UId = (SELECT min(UId) FROM QUserPayDetail) AND Email LIKE'
  + '"'+ email +'"', function (err, rows, fields) {
      if (!err) {
          console.log(rows);
          console.log(rows[0].MenuCompleteTime);
          res.send(rows);
      } else {
          console.log('query error : ' + err);
          res.send(err);
      } 
  }); 
});
 
router.get('/QUserPayDetail', function (req, res, next) {
  var email = req.query.email;
  var PayUid = req.query.PayUid;
  var sql = 'SELECT '
            +'UId, Email, PayUid, PayMethod, orderCnt, OrderNum, Qname, Price, OptionA, OptionB, OptionC, '
            +'OrderStatus, date_format(PayCompleteTime, "%Y-%m-%d %H:%i:%S") AS PayCompleteTime, date_format(MenuCompleteTime, "%Y-%m-%d %H:%i:%S") AS MenuCompleteTime, TotalPrice'
            +' FROM QUserPayDetail where Email like'+ '"'+ email+'" and PayUid like'+'"'+PayUid+'"';
  conn.connection.query(sql, function (err, rows, fields) {
      if (!err) {
        var memberData = new Object();
        memberData.OrderNum = rows[0].OrderNum;
        memberData.PayUid = rows[0].PayUid;
        memberData.PayMethod = rows[0].PayMethod;
        memberData.orderCnt = rows[0].orderCnt;

        var pointHistoryItem1 = new Object();
        pointHistoryItem1.Qname = rows[0].Qname;
        pointHistoryItem1.Price = rows[0].Price;
        pointHistoryItem1.OptionA = rows[0].OptionA;
        pointHistoryItem1.OptionB = rows[0].OptionB;
        pointHistoryItem1.OptionC = rows[0].OptionC;

        var pointHistoryItem2 = new Object();
        pointHistoryItem2.Qname = rows[1].Qname;
        pointHistoryItem2.Price = rows[1].Price;
        pointHistoryItem2.OptionA = rows[1].OptionA;
        pointHistoryItem2.OptionB = rows[1].OptionB;
        pointHistoryItem2.OptionC = rows[1].OptionC;

        var pointHistoryItem3 = new Object();
        pointHistoryItem3.Qname = rows[2].Qname;
        pointHistoryItem3.Price = rows[2].Price;
        pointHistoryItem3.OptionA = rows[2].OptionA;
        pointHistoryItem3.OptionB = rows[2].OptionB;
        pointHistoryItem3.OptionC = rows[2].OptionC;

        var arrPointHistory = new Array();
        arrPointHistory.push(pointHistoryItem1);
        arrPointHistory.push(pointHistoryItem2);
        arrPointHistory.push(pointHistoryItem3);

        memberData.OrderMenu = arrPointHistory; 

        memberData.OrderStatus = rows[0].OrderStatus;
        memberData.PayCompleteTime = rows[0].PayCompleteTime;
        memberData.MenuCompleteTime = rows[0].MenuCompleteTime;
        memberData.TotalPrice = rows[0].TotalPrice;

        res.send(memberData);
      } else {
          console.log('query error : ' + err);
          res.send(err);
      } 
  }); 
});

module.exports = router;




// router.post('/',function(req,res,next){
//   console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
//   console.log(req.body.LargeDivCd);
//   //res.render('orders', { title: 'Quoca!' });
// });


//입력받은 커피 id 값
//let a = '2'; 
//입력받은 커피 수량
//let b = '5';
// for(var i=0; i<rows.length; i++){
//   console.log(rows[i].name);
// }
// router.get('/', function (req, res, next) {
//     var MenuName = req.query.MenuName;
//     console.log(MenuName);
//     var b = req.query.Count;
//     console.log(b);
//   conn.connection.query('SELECT * FROM QMenu where MenuName like ' +'"'+ MenuName + '"', function (err, rows, fields) {
    
//     if (!err) {
//         console.log(rows);
//         console.log(fields);
//         var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
//             'fields : ' + JSON.stringify(fields);
//         console.log(rows.length);
//         for(var i=0; i<rows.length; i++){
//          const iname = []
//          iname.push(rows[i].MenuName);
//          const iprice =[]
//          iprice.push(rows[i].Price);
//          console.log(iname);
//          console.log(iprice);
//         }
  
//         //res.render('orders',{ title: '주문목록', menu: iname,cost:icost, number: b,total:(icost)*(b) });
//         res.render('orders',{ title: '주문목록', menu: rows[0].MenuName,cost:rows[0].Price, number: b,total:(rows[0].Price)*(b) });
//     } else {
//         console.log('query error : ' + err);
//     }
//   }); 
//   });


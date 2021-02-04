// 선언 구간
var express = require('express');
var router = express.Router();
var moment = require('moment');

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var mongoose = require('mongoose');
var url = require('../components/mongodb').url;

// 1. 조회
router.get('/search', function (req, res, next) {
    let noticeId = req.query.noticeId;
    MongoClient.connect(url,{useUnifiedTopology:true}, function(err, client){
        var db = client.db('notice');
        var id = mongoose.Types.ObjectId(noticeId);
        var selectQuery = {_id:id};
        console.log(selectQuery);
        db.collection('notice').findOne(selectQuery,function(err,doc){
            if(err) return res.status(500).json({error:err});
            if(!doc) return res.status(404).json({error: 'UseName not found'});
            res.send(doc);
        });
    });
});


// 2. 정보 수정화면 이동(데이터 조회 동시)
router.get('/edit', function(req, res){
    let noticeId = req.query.noticeId;
    MongoClient.connect(url,{useUnifiedTopology:true}, function(err, client){
        var db = client.db('notice');
        var id = mongoose.Types.ObjectId(noticeId);
        var selectQuery = {_id:id};

        console.log(selectQuery);
        db.collection('notice').findOne(selectQuery, function(err,doc){
            if(err) return res.status(500).json({error:err});
            if(!doc) return res.status(404).json({error : 'UseName not found'});
            res.render('noticeInfoUpdate',{title:'notice', UserName:doc.UserName, MenuName:doc.MenuName, Count:doc.count, Price:doc.Price, date:doc.date, UserId:doc._id });
        })
    });
});

// 3. 정보 수정화면 (조회 기능)
router.get('/infoSearch', function(req, res){
    let userId = req.query.UserId;
    MongoClient.connect(url, {useUnifiedTopology:true}, function(err, client){
        var db = client.db('notice');
        var id = mongoose.Types.ObjectId(userId);
        var selectQuery = {_id:id};

        console.log(selectQuery);
        
        db.collection('notice').findOne(selectQuery, function(err, doc){
            if(err) return res.status(500).json({error : err});
            if(!doc) return res.status(404).json({error : 'UseName not found'});
            
            res.render('noticeInfoUpdate',{title:'notice', UserName:doc.UserName, MenuName:doc.MenuName, Count:doc.count, Price:doc.Price, date:doc.date, UserId:doc._id });
        });
    });
});

//4. 정보 수정화면(수정기능)
router.get('/infoUpdate', function(req, res){
    let UserId = req.query.UserId;
    let UserName = req.query.UserName;
    let MenuName = req.query.MenuName;
    let Count = req.query.Count;
    let Price = req.query.Price;
    var date = moment().format('YYYY-MM-DD HH:mm:ss');

    
    // 수정 처리 
    MongoClient.connect(url, {useUnifiedTopology:true}, function(err, client){
        console.log("Connected successfully to server");
        if (err) throw err;
        var db = client.db('notice');
        var id = mongoose.Types.ObjectId(UserId);
        var updateQuery = {_id:id};
        var newValues = { $set : {UserId:UserId, UserName:UserName, MenuName:MenuName, count:Count, Price:Price, date:date }}
    
        db.collection('notice').updateOne(updateQuery, newValues, function(err, res){
            if(err) throw err;
            console.log("1 document updated");
            client.close();
        });
    });
    // 조회 처리
    MongoClient.connect(url, {useUnifiedTopology:true}, function(err, client){
        var db = client.db('notice');
        var id = mongoose.Types.ObjectId(UserId);
        var selectQuery = {_id:id};

        console.log(selectQuery);
        
        db.collection('notice').findOne(selectQuery, function(err, doc){
            if(err) return res.status(500).json({error : err});
            if(!doc) return res.status(404).json({error : 'UseName not found'});
            
            res.render('noticeInfoUpdate',{title:'notice', UserName:doc.UserName, MenuName:doc.MenuName, Count:doc.count, Price:doc.Price, date:doc.date, UserId:doc._id });
        });
    });
});


// 5. 정보 수정화면(삭제기능)
router.get('/infoDelete', function (req, res){
    var UserId = req.query.UserId;
    console.log("!@!@"+UserId);
    MongoClient.connect(url, {useUnifiedTopology:true}, function(err, client){
        if(err) throw err;
        var db = client.db('notice');

        var id = mongoose.Types.ObjectId(UserId);
        var deleteQuery = {_id : id};

        console.log("!@");
        db.collection('notice').deleteOne(deleteQuery, function(err, res){
            if(err) throw err;
            client.close();
        });
    });
    //res.render('../');
    res.render('index',{title:"User",hUrl:' ', Url:' ' });
});

// 6. 정보 등록화면 이동
router.get('/insert',function(req, res){
    res.render('noticeInfoInsert',{title:'notice', UserName:'', MenuName:'', Count:'', Price:'', date:'', UserId:'' });
});

// 7. 정보 등록 처리 
router.get('/infoInsert', function(req, ress){
    let UserName = req.query.UserName;
    let MenuName = req.query.MenuName;
    let Count = req.query.Count;
    let Price = req.query.Price;
    var date = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(UserName);

    var insertedId = '';



    MongoClient.connect(url, {useUnifiedTopology:true}, function(err, client){
        var db = client.db('notice');
        var insertObj = {"UserName" : UserName, "MenuName" : MenuName, "count" : Count, "Price" : Price, "date" : date }

        db.collection('notice').insertOne(insertObj, function(err, res){
            if(err) throw err;
            
            insertedId = res.insertedId;
            // 닫기 
            client.close();

            // 조회 처리
            MongoClient.connect(url, {useUnifiedTopology:true}, function(err, client){
                console.log("!@!@!@ 조회 시작 ");
                var db = client.db('notice');
                //var id = mongoose.Types.ObjectId(insertedId);
                var id = insertedId;
                console.log("!@ id값에 담기"+id);
                var selectQuery = {_id:id};

                console.log(selectQuery);
                
                db.collection('notice').findOne(selectQuery, function(err, doc){
                    if(err) return res.status(500).json({error : err});
                    if(!doc) return res.status(404).json({error : 'UseName not found'});
                    console.log(doc);
                    ress.render('noticeInfoInsert',{title:'notice', UserName:doc.UserName, MenuName:doc.MenuName, Count:doc.count, Price:doc.Price, date:doc.date, UserId:doc._id });
                });
            });

        });

    });
});

module.exports = router;
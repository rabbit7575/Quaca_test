var express = require('express');
var router = express.Router();
//var customer = require('../customer.json')
var conn = require('./components/db');



router.get('/', function (req, res, next) {
    conn.connection.query('SELECT * FROM CUSTOMER', function (err, rows, fields) {
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
    // res.json({ title: 'Quoca!' });
});

module.exports = router;

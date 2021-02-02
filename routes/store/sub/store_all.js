var express = require('express');
var router = express.Router();
var conn = require('../../components/db');
var first = require("../function/first");
router.get('/', function (req, res, next) {
    conn.connection.query('SELECT * FROM STORE', function (err, rows, fields) {
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

module.exports = router;

var mysql = require('mysql');

var connection = mysql.createConnection({

    host: "teraenergy.iptime.org",
    port: 21301,
    user: 'root',
    password: 'Love20@!',
    database: 'Quaca',
    typeCast: function (field, next) {
        if (field.type == "VAR_STRING") {
            return field.string();
        }
        return next();
    },
});


exports.connection = connection;

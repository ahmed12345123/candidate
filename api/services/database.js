const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'your database name',
    password: 'your password'
});


module.exports = pool.promise();
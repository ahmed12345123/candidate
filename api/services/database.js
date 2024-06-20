const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'cand',
    password: 'ahmedtay'
});


module.exports = pool.promise();
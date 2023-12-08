const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // database: 'nodemysql',
    password: '',
});

const dbName = 'nodemysqlV2';

const connection = mysql.createConnection(db);

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL server');

    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err) => {
        if (err) {
            console.error('Error creating database:', err);
        }
    })
})

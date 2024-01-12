const mysql = require('mysql2');
// create the connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: "root",
    password: "123456",
    database: "sql_user"
  });

  module.exports = connection;
const dotenv = require('dotenv');
const mysql = require('mysql2');

//.ENV
dotenv.config();

// create the connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  module.exports = connection;
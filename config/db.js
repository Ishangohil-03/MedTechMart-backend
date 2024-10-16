// const mysql = require('mysql2/promise');

// const mySqlPool = mysql.createPool({
//     host:'localhost',
//     user:'medTech',
//     password:'medTech',
//     database:'medtechmart'
// });

// module.exports = mySqlPool;

// config/db.js

require('dotenv').config();
const mysql = require('mysql2/promise');

const mySqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = mySqlPool;

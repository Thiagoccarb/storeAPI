const mysql = require('mysql2/promise');

// let connection = null;

// module.exports = () => {
//   if (connection) return connection;
//   connection = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MSQL_DATABASE,
//   });
//   return connection;
// };

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'StoreManager',
});

module.exports = connection;

// MYSQL_HOST=localhost
// MYSQL_USER=root
// MYSQL_PASSWORD=thiago
// MYSQL_DATABASE=StoreManager
// PORT=3000
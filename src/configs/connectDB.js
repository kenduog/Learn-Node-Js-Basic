import mysql from "mysql2/promise";

// create the connection to database

console.log("Creating connection pool...");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejs_basic",
});

// // simple query
// connection.query('SELECT * FROM `users`', function (err, results, fields) {
//   console.log('>>>>>>> Check mySql2')
//   console.log(results) // results contains rows returned by server
//   let rows = results.map(row => {
//     return row
//   })
//   console.log(rows) // results contains rows returned by server
// })

export default pool;

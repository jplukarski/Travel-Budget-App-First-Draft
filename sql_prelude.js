// var mysql = require("mysql");
// var connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "root",
//     database: "travel_budget_db",
//     socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
// });

// connection.connect(function (err) {
//     if (err) { throw err };
//     connection.query(`select * from entries;`, function (err, res) {
//         console.log(res);
//     })
// });

// function addEntry() {
//     var query = connection.query(
//         "INSERT INTO entries SET ?",
//         {
//             City: "Milwauke",
//             Nights_Stayed: 3,
//             Amount_Spent: 70,
//             Currency: "Euro"
//         },

//     );
//     console.log("******This is query.sql: \n" + query.sql + "-------------------------------\n");
// }

// addEntry();
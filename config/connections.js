// Set up MySQL connection.
const mysql = require("mysql");
const key = require("./key")
let connection;

if(process.env.JAWSDB_URL){

 connection= mysql.createConnection(process.env.JAWSDB_URL);
} else{
  console.log(key)
  connection = mysql.createConnection(key)
}
// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;

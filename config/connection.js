// Initialize MySQL connection
var mysql = require("mysql");
var connection;

// If the app is deployed (i.e. server has a JawsDB environmental variable), connect to the JawsDB database
// Else, connect to the locally hosted db
if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "burgers_db"
    });
};

// Make connection to database
connection.connect(function(err) {
    if(err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);    
});

// Export connection so that it may be accessed in the ORM
module.exports = connection;
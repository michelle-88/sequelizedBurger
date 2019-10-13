// Required connection file so ORM can access db
var connection = require("./connection");

// Updated 'devoured' info will come from client side as an object, i.e. {devoured: true}
// This function will transform the object to a string so it can be used in the db query
function objToString(obj) {
    var arr = [];

    for(var key in obj) {
        var value = obj[key];
        if(Object.hasOwnProperty.call(obj, key)) {
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    // Method that will take table name and call back function as parameters
    // It will then use these params to make SELECT query and pull all entries in db
    selectAll: function(tableName, cb) {
        var queryString = `SELECT * FROM ${tableName}`;
        connection.query(queryString, function(err, result) {
            if(err) throw err;
            cb(result);
        });
    },

    // Method that takes in table name, column name, value, and call back function as parameters
    // It will then use these params to query db and add a new entry
    insertOne: function(tableName, col, val, cb) {
        // Template to build INSERT db query
        var queryString = `INSERT INTO ${tableName} (${col}) VALUES ("${val}")`;
        console.log(queryString);
        
        connection.query(queryString, function(err, result) {
            if(err) throw err;

            cb(result);
        });
    },

    // Method that takes in table name, a column/value pair, condition, and call back function as parameters
    // It will then use these params to query the db and update the specified entry
    updateOne: function(tableName, objColVal, condition, cb) {
        var queryString = `UPDATE ${tableName} SET ${objToString(objColVal)} WHERE ${condition}`;
        console.log(queryString);
        
        connection.query(queryString, function(err, result) {
            if(err) throw err;
            cb(result);
        });
    }
};

// Export orm object so it can be accessed by the model
module.exports = orm;
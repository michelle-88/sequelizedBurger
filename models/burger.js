// Require ORM so model can utilize its methods
var orm = require("../config/orm");

var burger = {
    // Method to pull all burgers from db using ORM
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
    // Method to add a burger to db using ORM
    insertOne: function(col, val, cb) {
        orm.insertOne("burgers", col, val, function(res) {
            cb(res);
        });
    },
    // Method to change 'devoured' state of burger in db using ORM
    updateOne: function(objColVal, condition, cb) {
        orm.updateOne("burgers", objColVal, condition, function(res) {
            cb(res);
        });
    }
};

// Export burger object so its methods can be used by the controller
module.exports = burger;
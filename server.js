// Dependency for express module and setting up express app
var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

// Require sequelize models for syncing
var db = require("./models");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Require handlebars module and enable express app to use handlebars as the view engine
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give server access to them
var routes = require("./controllers/burgers_controller");

app.use(routes);

// Sync our models to create necessary table(s) in db and then start up the server
db.sequelize.sync({force: true}).then(function() {
    app.listen(PORT, function() {
        console.log(`Server listening on: http://localhost:${PORT}`);
    });
});
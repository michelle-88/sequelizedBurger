var express = require("express");

// Initiate new instance of an express router
var router = express.Router();

// Require model so controller can utilize its sequelize methods
var db = require("../models");

// GET route that pulls all burger data from db and renders it through index template
router.get("/", function(req, res) {
    db.burger.findAll({}).then(function(dbBurgers) {
        var burgerObj = {
            burgers: dbBurgers
        }
        console.log(burgerObj)
        res.render("index", burgerObj)
    });
});

// PUT route that will update burger's 'devoured' state in db
router.put("/api/burgers/:id", function(req, res) {

    db.burger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: req.params.id
        }
    }).then(function(dbBurger) {
        res.json(dbBurger);
    }).catch(function(err) {
        res.json(err);
    });
});

// POST route that will add a new burger to the db
router.post("/api/burgers", function(req, res) {
    db.burger.create({
        burger_name: req.body.name
    }).then(function(dbBurger) {
        res.json(dbBurger);
    }).catch(function(err) {
        res.json(err);
    });
});

// Export this router instance so it can be accessed by server
module.exports = router;
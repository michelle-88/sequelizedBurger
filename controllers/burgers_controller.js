var express = require("express");

// Initiate new instance of an express router
var router = express.Router();

// Require the model file so controller can utilize its db functions
var burger = require("../models/burger");

// GET route that pulls all burger data from db and renders it through index template
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var burgerObj = {
            burgers: data
        };
        console.log(burgerObj);
        res.render("index", burgerObj);
    });
});

// PUT route that will update burger's 'devoured' state in db
router.put("/api/burgers/:id", function(req, res) {
    // Id of burger that was clicked will be provided in the request parameter
    var condition = `id=${req.params.id}`;
    console.log(`condition:${condition}`);

    // Call updateOne model method to update db
    burger.updateOne(
        // New 'devoured' state will be provided in request body
        {devoured: req.body.devoured},
        condition,
        function(result) {
            // If no changes were made in db (i.e. the specified burger does not exist), send 404 error
            if(result.changedRows == 0) {
                return res.status(404).end();
            }
            // Else, send success status code
            else {
                res.status(200).end();
            }
        });
});

// POST route that will add a new burger to the db
router.post("/api/burgers", function(req, res) {
    // Call insertOne model method to send new burger to db
    burger.insertOne("burger_name", req.body.name, function(result) {
        // Send id of new burger as json response to client
        res.json({id: result.insertId})
    });
});

// Export this router instance so it can be accessed by server
module.exports = router;
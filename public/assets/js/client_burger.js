$(document).ready(function() {
    // Click listener for 'Devour it!' button
    $(".eat-burger").on("click", function(event) {
        // Grab burger id & new 'eatenstate' from button
        var id = $(this).attr("data-id");
        var eatenState = $(this).attr("data-eatenstate");

        var newBurgerState = {
            devoured: eatenState
        };

        // Send PUT request to server with burger id in param & new 'eatenstate' in body
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newBurgerState
        }).then(function() {
            // Reload page to update burger position on page
            location.reload();
        });
    });

    // Event handler that will fire when user submits a new burger
    $(".create-form").on("submit", function(event) {
        // Prevent default page reload when form is submitted
        event.preventDefault();

        // Create new burger object to send to server
        var newBurger = {
            name: $("#add-burger").val().trim()
        };

        // Send new burger object via a POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }). then(function(){
            // Reload page to show new burger
            location.reload();
        });
    });
});
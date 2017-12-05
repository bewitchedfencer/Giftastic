//the ajax request for clicking the submit button
//whatever is searched is added to the button array (of topics)
//the rating is also added

//don't forget event.preventDefault


//the function for making the buttons from the array of topics
//declaring the topics array
var topics = ["gandalf", "legolas", "frodo", "bilbo"];
var move = "still";
var queryURL= "https://www.api.giphy.com/v1/gifs/search";

$(document).ready(function(){
    

//declaring the button creating function
function renderButtons(element, index){
    console.log("success");
    var c = $("<button>");
    c.addClass("btn btn-danger buttons");
    c.attr("data-name", element);
    console.log(element);
    c.text(element);
    $("#button-holder").prepend(c);
    
};

$("#searchButton").on("click", function() {
    $("#button-holder").empty();
    event.preventDefault();
    var newCharacter = $("#searchLOTR").val().trim();
    console.log(newCharacter);
    topics.push(newCharacter);
    console.log("working");
//this should be part of the search button function
topics.forEach(renderButtons);
})

$(".buttons").on("click", function(){
    var character = $(this).attr("data-name");
    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            q: character,
            api_key: "IZx0lnfBRUPnZ9Qw7iv7hFslwjN4UmGI",
            limit: 10
        }
    }).done(function(response){
        console.log(response.data[0].rating);

    })
})

topics.forEach(renderButtons);



});
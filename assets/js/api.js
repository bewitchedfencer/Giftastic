
var topics = ["gandalf", "legolas", "frodo", "bilbo"];
var queryURL= "https://api.giphy.com/v1/gifs/search";

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
$("#searchLOTR").val(" ");
$("#gif-holder").empty();
})

function displayLOTR(){
    var character = $(this).attr("data-name");
    console.log(character);
    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            q:character,
            limit:10,           
            api_key: "dc6zaTOxFJmzC",
        }        
    }).done(function(response){
        for(var i=0; i<10; i++){
        var gifDiv = $("<div>");
        
        var rating = $("<p>");
        rating.text(`Rating: ${response.data[i].rating}`);
        gifDiv.append(rating);
        var imgURL = response.data[i].images.downsized_still.url;
        var image = $("<img>").attr("src", imgURL);
        image.attr("img-animate", response.data[i].images.downsized.url);
        image.attr("img-still",response.data[i].images.downsized_still.url);
        image.attr("toggle-animation", "still");
        image.addClass("gifs");
        image.addClass("img-responsive");
        gifDiv.append(image);
        $("#gif-holder").prepend(gifDiv);
        }
    })
};

function changeGIF(){
    var state = $(this).attr("toggle-animation");
    if(state==="still"){
        $(this).attr("toggle-animation", "animate");
        $(this).attr("src", $(this).attr("img-animate"));
        console.log($(this).attr("src"));
    }
    if(state==="animate"){
        $(this).attr("toggle-animation", "still");
        $(this).attr("src", $(this).attr("img-still"));
    }
};

topics.forEach(renderButtons);

$(document).on("click", ".buttons", displayLOTR);
$(document).on("click", ".gifs", changeGIF);
    

});
//original buttons
var topics = ["gandalf", "legolas", "frodo", "bilbo"];
//the beginning of the queryURL
var queryURL= "https://api.giphy.com/v1/gifs/search";

//the rest of the code will run when the DOM is in place
$(document).ready(function(){
    

//declaring the button creating function 
function renderButtons(element, index){
    console.log("success");
    //creating a button
    var c = $("<button>");
    //adding the bootstrap and "buttons" classes
    c.addClass("btn btn-danger buttons");
    //added an attribute with the topic name
    c.attr("data-name", element);
    console.log(element);
    c.text(element);
    //adding the buttons
    $("#button-holder").prepend(c);
    
};

//search button on click function
$("#searchButton").on("click", function() {
    //empty out the buttons
    $("#button-holder").empty();
    //stop the submit form from running
    event.preventDefault();
    //taking the variable from the search bar.
    var newCharacter = $("#searchLOTR").val().trim();
    console.log(newCharacter);
    topics.push(newCharacter);
    console.log("working");
//this renders the buttons again
topics.forEach(renderButtons);
//blanking the search bar
$("#searchLOTR").val(" ");
//empty the gifs
$("#gif-holder").empty();
})

//the ajax function for fetching the gifs
function displayLOTR(){
    //capturing which name was picked
    var character = $(this).attr("data-name");
    console.log(character);
    //ajax function
    $.ajax({
        url: queryURL,
        method: "GET",
        //added to the query url
        data: {
            q:character,
            limit:10,           
            api_key: "IZx0lnfBRUPnZ9Qw7iv7hFslwjN4UmGI",
        }        
    }).done(function(response){
        //a for loop for creating the gifs 
        for(var i=0; i<10; i++){
            //creating a div for each gif
        var gifDiv = $("<div>");
        //the rating holder
        var rating = $("<p>");
        //setting the rating
        rating.text(`Rating: ${response.data[i].rating}`);
        //appending the rating to the div
        gifDiv.append(rating);
        //grabbing the still image
        var imgURL = response.data[i].images.downsized_still.url;
        //setting the image URL
        var image = $("<img>").attr("src", imgURL);
        //adding the attributes for the still and moving images
        image.attr("img-animate", response.data[i].images.downsized.url);
        image.attr("img-still",response.data[i].images.downsized_still.url);
        //boolean for turning animation on and off
        image.attr("toggle-animation", "still");
        image.addClass("gifs");
        image.addClass("img-responsive");
        gifDiv.append(image);
        $("#gif-holder").prepend(gifDiv);
        }
    })
};

//function for changing the gifs. called later in delegated on click because of 
//dynamic elements
function changeGIF(){
    //storing the boolean as a variable
    var state = $(this).attr("toggle-animation");
    //if the boolean is 'still' the animation turns on and the boolean is 
    //changed. 
    if(state==="still"){
        $(this).attr("toggle-animation", "animate");
        $(this).attr("src", $(this).attr("img-animate"));
        console.log($(this).attr("src"));
    }
    //if boolean is 'animate' the img url changes to make it a still image
    //and boolean changes to "still"
    if(state==="animate"){
        $(this).attr("toggle-animation", "still");
        $(this).attr("src", $(this).attr("img-still"));
    }
};
//calling the button rendering function in a forEach
topics.forEach(renderButtons);

//delegated on click function  for the dynamic elements
$(document).on("click", ".buttons", displayLOTR);
$(document).on("click", ".gifs", changeGIF);
    

});
//the ajax request for clicking the submit button
//whatever is searched is added to the button array (of topics)
//the rating is also added

//don't forget event.preventDefault


//the function for making the buttons from the array of topics
//declaring the topics array
var topics = ["gandalf", "legolas", "frodo", "bilbo"];

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



//this should be part of the search button function
topics.forEach(renderButtons);
});
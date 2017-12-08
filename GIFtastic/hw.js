//create preexisting buttons in the button div (array)
var topics = ["turtle", "gorilla", "kitty"];

function createButtons() {

	$("#buttonDiv").empty();
//loops thru the topics array to know how many objects are in the string
	for (var i = 0; i < topics.length; i++) {
//creating a button in html
		var animalButton = $("<button>");
		animalButton.addClass("animal-Button");
		animalButton.attr("data-animal", topics[i]);
//names the buttons after the data in the topics array
		animalButton.text(topics[i]);
		animalButton.addClass("btn btn-primary");
//creates the buttons inside the buttonDiv
		$("#buttonDiv").append(animalButton);
	};
};

$("#addAnimal").on("click", function(event) {
//preventing the default action from being triggered (the #animalInput from being emptied?)
	event.preventDefault();

	var newAnimal = $("#animalInput").val().trim();
	topics.push(newAnimal);
	$("#animalInput").empty()
	createButtons();
});

createButtons();

$(document.body).on("click", ".animal-Button", function(event) {
 	console.log(this);
 	var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

//create a search bar that adds a button to the array when submit button is clicked

//when buttons are clicked populate the page with gifs

$.ajax({
    	url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);

        var results = response.data;
     
        for (var i = 0; i < results.length; i++) {
			var animalDiv = $("<div>");
     		var rating = results[i].rating;
        	var p = $("<p>")
        	p.text("Rating: " + results[i].rating);
        
        	var animalImage = $("<img>");
        	animalImage.attr("src", results[i].images.fixed_height_still.url);
        	animalImage.addClass("gif").attr("data-state", "still");
        	animalImage.attr("data-animate", results[i].images.fixed_height.url);
        	animalImage.attr("data-still", results[i].images.fixed_height_still.url);
        	animalDiv.append(p);
        	animalDiv.prepend(animalImage);
        	$("#animals").prepend(animalDiv);
        
        }

    });
 	
});

//plays gifs on click if paused

$(document.body).on("click", ".gif", function(event) {
 
	var state = $(this).attr("data-state");
      
 	if (state === "still") {
      	
 		$(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
 //pauses gifs on click when playing
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
var config = {
    apiKey: "AIzaSyBOy0T_7d0P0VuAYZgI-oZwySodjcc2vdA",
    authDomain: "rockpaperscissors-4488d.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-4488d.firebaseio.com",
    projectId: "rockpaperscissors-4488d",
    storageBucket: "rockpaperscissors-4488d.appspot.com",
    messagingSenderId: "932368787685"
  };

  firebase.initializeApp(config);

var database = firebase.database()

var choices = ["rock", "paper", "scissors"]
var playerOneName;
var playerTwoName;
var playerOnePick;
var playerTwoPick;
var rockPic = $("<img class='selections' src='assets/rock.png'>");
var paperPic = $("<img class='selections' src='assets/paper.png'>");
var scissorsPic = $("<img class='selections' src='assets/scissors.png'>");
var rockPic2 = $("<img class='selections' src='assets/rock.png'>");
var paperPic2 = $("<img class='selections' src='assets/paper.png'>");
var scissorsPic2 = $("<img class='selections' src='assets/scissors.png'>");
var textMessage;
var chat;

var playerOneScore = 0;
var playerTwoScore = 0;
var playerTie = 0;
$(".scoreOne").text(playerOneScore)
$(".scoreTwo").text(playerTwoScore)
$(".scoreThree").text(playerTie)

var nameOne;
var nameTwo;

$("#submitName").on("click", function(event){
	event.preventDefault();
	$(".choiceOne").html("waiting...")
	$(".choiceTwo").html("waiting...")
	$("#name").hide()
	$("#submitName").hide()
	$(".playerName").append($("#name").val()) //may slowdown double check
	database.ref().once("value", function(snapshot) {
	  	if(snapshot.child("/playerOneInfo/nameOne").exists()) {
	  		playerTwoName = $("#name").val().trim()
	  		database.ref("/playerTwoInfo").set({
	  			nameTwo: playerTwoName,
	  		})
			$("img").on("click", function(){
				var RPS = $(this).attr("data-center")
				if(RPS=="rock"){
					$(".choiceTwo").html(rockPic)
				}else if(RPS=="paper"){
					$(".choiceTwo").html(paperPic)
				}else if(RPS=="scissors"){
					$(".choiceTwo").html(scissorsPic)
				}
				database.ref("/playerTwoInfo").set({
					playerTwoPick: RPS,
				})
			})
		}else {
	  		playerOneName = $("#name").val().trim()
			database.ref("/playerOneInfo").set({
				nameOne: playerOneName,
			})
	  		$("img").on("click", function(){
	  			var RPS = $(this).attr("data-center")
	  			if(RPS=="rock"){
	  				$(".choiceOne").html(rockPic)
	  			}else if(RPS=="paper"){
	  				$(".choiceOne").html(paperPic)
	  			}else if(RPS=="scissors"){
	  				$(".choiceOne").html(scissorsPic)
	  			}
	  			database.ref("/playerOneInfo").set({
	  				playerOnePick: RPS,

	  			})
	  		})
	  	}
	})
});

database.ref().on("value", function(snapshot) {
		console.log("here",snapshot.val())
		if(snapshot.child("/playerOneInfo").exists()){
			$(".replaceNameOne").text(snapshot.val().playerOneInfo.nameOne)
		}
		if(snapshot.child("/playerTwoInfo").exists()){
			$(".replaceNameTwo").text(snapshot.val().playerTwoInfo.nameTwo)
		}

	  	if(snapshot.child("/playerOneInfo/playerOnePick").exists() && snapshot.child("/playerTwoInfo/playerTwoPick").exists()) {
	  		var playerOneChoose = snapshot.val().playerOneInfo.playerOnePick;
	  		var playerTwoChoose = snapshot.val().playerTwoInfo.playerTwoPick;

	  		if(playerTwoChoose=="rock"){
	  			$(".choiceTwo").html(rockPic)
	  		}
	  		if(playerTwoChoose=="paper"){
	  			$(".choiceTwo").html(paperPic)
	  		}
	  		if(playerTwoChoose=="scissors"){
	  			$(".choiceTwo").html(scissorsPic)
	  		}
	  		if(playerOneChoose=="rock"){
	  			$(".choiceOne").html(rockPic2)
	  		}
	  		if(playerOneChoose=="paper"){
	  			$(".choiceOne").html(paperPic2)
	  		}
	  		if(playerOneChoose=="scissors"){
	  			$(".choiceOne").html(scissorsPic2)
	  		}

	  		if(playerOneChoose == playerTwoChoose){
	  			playerTie += 1;
	  			$(".scoreThree").text(playerTie)
	  		}else if(playerOneChoose=="rock" && playerTwoChoose=="scissors") {
	  			playerOneScore += 1;
	  			$(".scoreOne").text(playerOneScore)
	  		}else if(playerOneChoose=="paper" && playerTwoChoose=="rock") {
	  			playerOneScore += 1;
	  			$(".scoreOne").text(playerOneScore)
	  		}else if(playerOneChoose=="scissors" && playerTwoChoose=="paper") {
	  			playerOneScore += 1;
	  			$(".scoreOne").text(playerOneScore)
	  		}else{
	  			playerTwoScore += 1;
	  			$(".scoreTwo").text(playerTwoScore)
	  		}
	  		setTimeout(function(){
	  			database.ref("/playerOneInfo/playerOnePick").remove();
	  			database.ref("/playerTwoInfo/playerTwoPick").remove();
	  			$(".choiceTwo").empty()
	  			$(".choiceOne").empty()
	  			$(".choiceOne").text("waiting...")
	  			$(".choiceTwo").text("waiting...")
				$("img").prop("disabled", true)

	  		},3000)
	  	}
})

$(".post").on("click", function(event){
	event.preventDefault();

	textMessage = $(".textBox").val();
	database.ref("/dialog").push({
		chat: textMessage
	})
})

database.ref("/dialog").on("child_added", function(snapshot) {
	$(".dialog").append("<p>"+snapshot.val().chat+"</p>")
})

$(".reset").on("click", function(){
	database.ref("/playerOneInfo").remove();
	database.ref("/playerTwoInfo").remove();
	database.ref("/dialog").remove();
})
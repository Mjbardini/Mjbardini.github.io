$(document).ready(function() {

	allOrbs = ['assets/images/orb4.gif','assets/images/orb4.gif','assets/images/orb4.gif','assets/images/orb4.gif'];


	var winNumber = 0;
	var lossNumber = 0;
	$("#number-win").text(winNumber);
	$("#number-loss").text(lossNumber);

	newOrbs();
	newGame();

	function newOrbs() {
		var numbers = []
			while(numbers.length < 4){
				var randomnumber = Math.ceil(Math.random()*12)
				var found = false;
				for (var i = 0; i < numbers.length; i++) {
					if (numbers[i] == randomnumber){
						found = true; break
					}
				}
				if(!found)numbers[numbers.length]=randomnumber;
			}
		console.log(numbers);

		for (var i = 0; i < numbers.length; i++) {
			var imageOrb = $('<img>');
			imageOrb.attr('data-num', numbers[i]);
			imageOrb.attr('src', allOrbs[i]);
			imageOrb.attr('alt', 'allOrbs');
			imageOrb.addClass('imageOrb')
			$('#allOrbs').append(imageOrb);
		}

	}

	function newGame() {
		currentNumber = 0;
		$("#number-current").text(currentNumber);

		function randomIntFromInterval(min,max) {
			return Math.floor(Math.random()*(max-min+1)+min);
		}

		var targetNumber = randomIntFromInterval(19,120);
		$("#number-target").text(targetNumber);

		$(".imageOrb").on('click', function(){
			currentNumber = currentNumber + parseInt($(this).data('num'));

			$("#number-current").text(currentNumber);

			if (currentNumber == targetNumber) {
				$('#status').text('You win!');
				winNumber ++;
				$('#number-win').text(winNumber);
				console.long(wins)
				$('#allOrbs').empty();
				newOrbs();
				newGame();
			}
			else if (currentNumber > targetNumber){
				$('#status').text('You lost!')
				lossNumber ++;
				$('#number-loss').text(lossNumber);
				console.log(lossNumber)
				$('#allOrbs').empty();
				newOrbs();
				newGame();
			}
				
		});		

	}
});
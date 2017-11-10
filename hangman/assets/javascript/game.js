var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var wordBank = [
'galactic','schwifty','unity','glipglop','gwendolyn',
'mr meeseeks','wuba lubadubdub'
,'cronenberg','birdperson','squanchy','interdimensional','krombopulos',
'sleepy gary','plutonians','cromulons','snowball','snuffles','plumbus','gubba','jerryboree','schmeckles','flerbos',
'microverse','gooblebox','flooblecrank','dinglebop','schleem','horse surgeon','sanchez','dimension','portal gun',
'federation','rick','morty','pencilvester','beth','summer','jerry','tammy'
];
var choosenWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];
var winCount = 0;
var loseCount = 0;
var guessesLeft = 10;
var rightGuessCounter = 0;

function reset()
{
	
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	lettersInWord = choosenWord.split('');
	numBlanks = lettersInWord.length;
	letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 10;
	wrongLetters =[];
	blanksAndSuccesses =[];
	letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	test=false;
	startGame();
}
function startGame()
{
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	lettersInWord = choosenWord.split('');
	numBlanks = lettersInWord.length;
	rightGuessCounter = 0;
	guessesLeft = 10;
	wrongLetters =[];
	blanksAndSuccesses =[];
	letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

	for(var i = 0; i< numBlanks; i++)
	{
		if (choosenWord.charAt(i) === ' ') {
			blanksAndSuccesses.push('&nbsp;');
		 }else {
			blanksAndSuccesses.push('_');

		}
		document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses;
	}

	document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('winCounter').innerHTML = winCount;
	document.getElementById('lossCounter').innerHTML = loseCount;
	document.getElementById('wrongLetters').innerHTML = wrongLetters;
}

function compareLetters(userKey)
{
	for (var i = 0; i < choosenWord.length; i++){
		if (choosenWord.charAt(i) === userKey){
			// console.log('matched char: ' + userKey + ' at index ' + i );
			blanksAndSuccesses[i] = userKey;
			//add code here to display the character at this index.
		}
	}
	if(choosenWord.indexOf(userKey) > -1)
	{
	for(var i = 0; i < numBlanks; i++)
	{
	if(lettersInWord[i] === userKey)
	{
	rightGuessCounter++;
	blanksAndSuccesses[i] = userKey;
	document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
	this.goodSound.play();
	}}}
		else {
			wrongLetters.push(userKey);
			guessesLeft--;
			document.getElementById('numGuesses').innerHTML = guessesLeft;
			document.getElementById('wrongLetters').innerHTML = wrongLetters;
			this.badSound.play();
			 }		
}
function winLose()
{
	if(rightGuessCounter === numBlanks)
	{
		winCount++;
		document.getElementById('winCounter').innerHTML = winCount;
		this.winSound.play();
		reset();
	}
	else if(guessesLeft === 0)
	{
		loseCount++;
		document.getElementById('lossCounter').innerHTML = loseCount;
		this.loseSound.play();
		reset();
	}
}

startGame();

document.onkeyup = function(event)
{
	test = true;
	var letterGuessed = event.key;
	for(var i = 0; i < letters.length; i++)
	{	
		if(letterGuessed === letters[i] && test === true)
		{
			var spliceDword = letters.splice(i,1);

			compareLetters(letterGuessed);
			winLose();
		}
	}		
winSound = new Audio('assets/images/get_schwifty.wav');
loseSound = new Audio('assets/images/screaming_sun.mp3');
goodSound = new Audio('assets/images/I_like_what_you_got.wav');
badSound = new Audio('assets/images/boo_not_cool.mp3')

winSound.volume = 0.2;
loseSound.volume = 0.2;
goodSound.volume = 0.2;
badSound.volume = 0.2;
		
}
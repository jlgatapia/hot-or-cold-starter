$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	
  	$('.new').click(function(evt){
  		newGame();

  	})

  	$('#guessButton').click(function(evt){
  		evt.preventDefault();

  		var userInput = $('#userGuess').val();

  		var errorMessage = checkInput(userInput);

  		if (errorMessage){
  			renderFeedback(errorMessage);
  			return;
  		}

  		var feedback = getFeedback(userInput, state.secretNumber);

  		if (!feedback){
  			winner(); 
  			return;
  		}

  		renderFeedback(feedback);

  		state.userGuesses.push(userInput);

  		renderGuessCount(state.guessCount());

  		renderGuesses(userInput)

  		$('#userGuess').val('');

  	});

  	newGame();
  	console.log(state.secretNumber);

});

var state = {
	userGuesses: [],
	secretNumber: null,

	guessCount: function(){
		return this.userGuesses.length;
	},
	init: function(){
		this.userGuesses = [];
		this.secretNumber = get1To100();

	}
};


function newGame () {
	state.init();
	$("ul#guessList li").remove();
	$('#userGuess').val('')
	renderFeedback("Make your Guess!");
}

function winner(){
	alert('Winner!');
	
}

function get1To100() {
	return Math.floor((Math.random() * 100) + 1);
}

function getFeedback(userNumber, secretNumber) {
	var feedback;
	var diff = Math.abs(secretNumber - userNumber);

	if (diff === 0){
		feedback = '';
	} else if (diff < 10) {
		feedback = 'hot';
	} else if (diff < 20){
		feedback = 'kinda hot';
	} else if (diff < 30) {
		feedback = 'less than warm';
	} else {
		feedback = 'cold';
	};
	return feedback;
}


function checkInput(input){
	var feedback;

	if (isNaN(input)){
		feedback = 'Only Numbers';
	}else if(input <= 0 || input > 100){
		feedback = 'Enter only numbers between 1 to 100';
	}
	return feedback;
}

function renderFeedback(feedback) {
	$('#feedback').text(feedback);
}

function renderGuesses(guessList){
	$('ul#guessList').append('<li>' + guessList + '</li>');

}

function renderGuessCount(guessCount){
	$('#count').text(guessCount);
}


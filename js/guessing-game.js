/*
Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".
In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.
*/

document.getElementById('');

class Game {
  constructor() {
    this.playersGuess = null;
    this.winningNumber = generateWinningNumber();
    this.pastGuesses = [];
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission(guess) {
    if (typeof guess !== 'number' || guess < 1 || guess > 100) {
      throw 'That is an invalid guess.';
    }
    this.playersGuess = guess;


    return this.checkGuess();
  }

  checkGuess() {


    let feedbackText = '';

    if (this.playersGuess === this.winningNumber) {
      feedbackText = 'You Win!';
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      feedbackText = 'You have already guessed that number.';
    } else {
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length === 5) {
        feedbackText = 'You Lose.';
      } else {
        let diff = this.difference();
        if (diff < 10) feedbackText = "You're burning up!";
        else if (diff < 25) feedbackText = "You're lukewarm.";
        else if (diff < 50) feedbackText = "You're a bit chilly.";
        else feedbackText = "You're ice cold!";
      }
    }
    document.querySelector('#guess-feedback > h4').innerHTML = feedbackText;
    document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess

    return feedbackText;
  }

  provideHint() {
    let hintArray = [this.winningNumber];
    while (hintArray.length < 3) {
      hintArray.push(generateWinningNumber());
    }
    hintArray = shuffle(hintArray);
    let hintSentence = `Try guessing: ${hintArray[0]}, ${hintArray[1]}, or ${hintArray[2]}.`
    document.querySelector('#guess-feedback > h4').innerHTML = hintSentence;

    return hintArray;
  }

}

const generateWinningNumber = () => Math.floor(Math.random() * 100 + 1);

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}



function newGame() {
  return new Game;
}

//creating variables for each buttons
const guess = document.getElementById('submit');
const hint = document.getElementById('hintButton');
const reset = document.getElementById('resetButton');

//what actually happens when the game begins.

function playGame() {
  const game = new Game;
  console.log(game.winningNumber);

  //when the guess button is clicked
  guess.addEventListener('click', function () {
    const playersGuess = +document.querySelector('input').value;
    document.querySelector('input').value = '';

    game.playersGuessSubmission(playersGuess);
  });

  //when the hint button is clicked
  hint.addEventListener('click', function () {
    game.provideHint();
  });

  //when the reset button is clicked
  reset.addEventListener('click', function () {
    game = new Game;
  });
}

// start the game.
// playGame();




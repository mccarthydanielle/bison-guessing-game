document.getElementById('');


class Game {
  constructor() {
    this.playersGuess = null;
    this.winningNumber = generateWinningNumber();
    this.pastGuesses = [];
    this.hintGiven = false;
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
    let imgSrc;

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

    if (this.isLower() === true) {
      imgSrc = "Guess lower."
    } else {
      imgSrc = "Guess higher"
    }

    document.querySelector('#guess-feedback > h4').innerHTML = `${feedbackText}`;
    document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess

    return feedbackText;
  }

  provideHint() {

    if (this.hintGiven === false) {
      this.hintGiven = true;
      let hintArray = [this.winningNumber];
      while (hintArray.length < 3) {
        hintArray.push(generateWinningNumber());
      }
      hintArray = shuffle(hintArray);
      let hintSentence = `Try guessing: ${hintArray[0]}, ${hintArray[1]}, or ${hintArray[2]}.`
      document.querySelector('#hintBox > h4').innerHTML = hintSentence;

    }
    return hintArray;
  }

}


function generateWinningNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

// start the game.
let game = newGame();

function newGame() {



  document.querySelector('#hintBox > h4').innerHTML = "";
  document.querySelector('#guess-feedback > h4').innerHTML = "";
  document.querySelector('#guess1').innerHTML = "";
  document.querySelector('#guess2').innerHTML = "";
  document.querySelector('#guess3').innerHTML = "";
  document.querySelector('#guess4').innerHTML = "";
  document.querySelector('#guess5').innerHTML = "";


  let img = document.createElement("img");
  img.src = "pictures/small-Bison.png";

  let img2 = document.createElement("img");
  img2.src = "pictures/small-Bison.png";

  let img3 = document.createElement("img");
  img3.src = "pictures/small-Bison.png";

  let img4 = document.createElement("img");
  img4.src = "pictures/small-Bison.png";

  let img5 = document.createElement("img");
  img5.src = "pictures/small-Bison.png";


  let guess1 = document.getElementById("guess1");
  let guess2 = document.getElementById("guess2")
  let guess3 = document.getElementById("guess3")
  let guess4 = document.getElementById("guess4")
  let guess5 = document.getElementById("guess5")

  guess1.appendChild(img);
  guess2.appendChild(img2);
  guess3.appendChild(img3);
  guess4.appendChild(img4);
  guess5.appendChild(img5);

  return new Game;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}

//creating variables for each button
const guess = document.getElementById('submit');
const hint = document.getElementById('hintButton');
const reset = document.getElementById('resetButton');
const allGuesses = document.getElementsByClassName('guess');

//when the guess button is clicked
document.addEventListener('keyup', function (e) {
  if (event.keyCode === 13) {
    const playersGuess = +document.querySelector('input').value;
    document.querySelector('input').value = '';

    game.playersGuessSubmission(playersGuess);
  }
});

//when the hint button is clicked
hint.addEventListener('click', function () {
  game.provideHint();

});

//when the reset button is clicked
reset.addEventListener('click', function () {
  game = newGame();
});




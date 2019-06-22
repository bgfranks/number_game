/* Game Fuction
  - Player must guess a number between min and mav
  - Player gets a certain ammount of guesses
  - Notify player of guess ammount remaining
  - Notify the player of the correct answer if lose
  - Let player try again
*/

// Game Value
let min = 1,
  max = 10,
  winningNumber = getWinningNum(min, max),
  guessesLeft = 3;

//UI Elements
const game = document.getElementById("game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again Event Listener
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  // Validate Input
  if (isNaN(guess) | (guess < min) || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");

    //change border to red
    guessInput.style.borderColor = "red";
  } else {
    //check if won
    if (guess === winningNumber) {
      gameOver(true, `${winningNumber} is correct! You win!`);
    } else {
      // wrong number
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        gameOver(
          false,
          `Game over, you lost! The correct number was ${winningNumber}!`,
        );
      } else {
        //change border to red
        guessInput.style.borderColor = "red";

        // Clear input
        guessInput.value = "";

        // game continues - answer wrong
        setMessage(
          `${guess} is not correct, ${guessesLeft} guess left.`,
          "red",
        );
      }
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  //disable input
  guessInput.disabled = true;

  //change border color
  guessInput.style.borderColor = color;

  //set message
  setMessage(msg, color);

  // Play again
  guessBtn.value = "Play Again?";
  guessBtn.className += "play-again";
}

// Get Winning Number
function getWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

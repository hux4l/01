"use strict";

const pScore = document.querySelector(".p-score span");
const cScore = document.querySelector(".c-score span");
const winner = document.querySelector(".winner");
const btnCompare = document.querySelector(".compare");
const inputChoice = document.querySelector(".choice");
const choicesOutput = document.querySelector(".choices");
const btnStartGame = document.querySelector("#start-game");

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const DEFAULT_CHOICE = ROCK;
const WIN_SCORE = 5;

let gameIsRunning = false;
let myScore = 0;
let computerScore = 0;

// get random choice
function getRandom() {
  const choices = [ROCK, PAPER, SCISSORS];
  return choices[Math.floor(Math.random() * 3)];
}

// get players choice, convert to lowercase, if wrong value choose default choice
const getPlayerChoice = function () {
  return inputChoice.value.toLowerCase();
};

// check winner of round based on choice, player enters,  computer gets random
function checkRoundWinner(randomSelection, playerSelection = DEFAULT_CHOICE) {
  if (playerSelection === randomSelection) {
    choicesOutput.textContent = `${playerSelection} : ${randomSelection}`;
  } else if (
    (playerSelection === ROCK && randomSelection === SCISSORS) ||
    (playerSelection === PAPER && randomSelection === ROCK) ||
    (playerSelection === SCISSORS && randomSelection === PAPER)
  ) {
    choicesOutput.textContent = `${playerSelection} : ${randomSelection}`;
    myScore++;
  } else {
    choicesOutput.textContent = `${playerSelection} : ${randomSelection}`;
    computerScore++;
  }
}

// function to start the game
const startGame = function () {
  choicesOutput.textContent = "you : computer";
  myScore = 0;
  computerScore = 0;
  gameIsRunning = true;
  btnStartGame.setAttribute("disabled", true);
  btnCompare.removeAttribute("disabled");
  pScore.textContent = `${myScore}`;
  cScore.textContent = `${computerScore}`;
};

// on button click start the game
// sets gameIsRunning to true, if is true, prevent from starting new game, game ends when player or computer gets 3 wins
btnStartGame.addEventListener("click", startGame);

btnCompare.addEventListener("click", function () {
  if (gameIsRunning) {
    //get input and random computer value
    const playerSelection = getPlayerChoice();
    const randomSelection = getRandom();

    // check for input
    if (
      !playerSelection ||
      playerSelection !== ROCK ||
      playerSelection !== PAPER ||
      playerSelection !== SCISSORS
    )
      checkRoundWinner(randomSelection);
    else checkRoundWinner(randomSelection, playerSelection);

    // update score texts
    pScore.textContent = `${myScore}`;
    cScore.textContent = `${computerScore}`;

    // check for winner
    if (myScore === WIN_SCORE || computerScore === WIN_SCORE) {
      gameIsRunning = false;
      btnStartGame.removeAttribute("disabled");
      btnCompare.setAttribute("disabled", true);
      winner.textContent = `${
        myScore === WIN_SCORE ? "You won!" : "Computer won"
      }`;
    }
  } else {
    winner.textContent = `Start the game first!`;
  }
});

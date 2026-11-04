const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

const restartButton = document.getElementById("restart");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

let scores = {
  X: 0,
  O: 0
};

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `PLAYER ${currentPlayer} WINS! ♡`;
    scores[currentPlayer]++;
    updateScores();
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "IT'S A DRAW! ✿";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  statusText.textContent = `PLAYER ${currentPlayer}'S TURN!`;
}

function checkWinner() {
  return winningPatterns.some(pattern => {
    return pattern.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = "";
  });

  statusText.textContent = "PLAYER 1'S TURN!";
}

function resetScores() {
  scores.X = 0;
  scores.O = 0;

  updateScores();
  restartGame();
}

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
resetButton.addEventListener("click", resetScores);

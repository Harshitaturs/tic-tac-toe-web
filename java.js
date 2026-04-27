const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("reset-btn");
const newBtn = document.getElementById("new-btn");
const modal = document.getElementById("modal");
const msg = document.getElementById("msg");
const statusText = document.getElementById("status");

let currentPlayer = "O";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWinner()) {
      endGame(`${currentPlayer} Wins 🎉`);
      return;
    }

    if (!board.includes("")) {
      endGame("Draw 🤝");
      return;
    }

    currentPlayer = currentPlayer === "O" ? "X" : "O";
    statusText.innerText = `Turn: ${currentPlayer}`;
  });
});

function checkWinner() {
  return winPatterns.some(([a,b,c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  );
}

function endGame(text) {
  gameActive = false;
  msg.innerText = text;
  modal.classList.remove("hide");
  statusText.innerText = ""; // clean UI
}

function resetGame() {
  board = ["","","","","","","","",""];
  currentPlayer = "O";
  gameActive = true;

  cells.forEach(cell => cell.innerText = "");
  modal.classList.add("hide");
  statusText.innerText = "Turn: O";
}

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
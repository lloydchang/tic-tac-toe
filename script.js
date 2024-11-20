const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleClick = (e) => {
  const index = parseInt(e.target.dataset.index);
  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
};

const checkWin = () => {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      alert(`${gameBoard[a]} wins!`);
      return;
    }
  }
  if (!gameBoard.includes('')) {
    gameActive = false;
    alert("It's a draw!");
  }
};

cells.forEach(cell => cell.addEventListener('click', handleClick));

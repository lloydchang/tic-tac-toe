const board = document.getElementById('board');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

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

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-cell-index', i);
        board.appendChild(cell);
    }
}

createBoard();

function handleCellPlayed(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    handleResultValidation();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announceResult(false);
    } else if (!gameState.includes('')) {
        announceResult(true);
    } else {
        handlePlayerChange();
    }
}

function announceResult(draw) {
    const endgameMessage = document.querySelector('.endgame');
    if (draw) {
        endgameMessage.innerText = 'Draw!';
    } else {
        endgameMessage.innerText = `${currentPlayer} wins!`;
    }
    gameActive = false;
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellPlayed);
});

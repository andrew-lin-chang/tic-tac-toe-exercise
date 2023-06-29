function GameBoard() {
    const dim = 3;
    const board = [];

    for (let i = 0; i < dim; i++) {
        board[i] = [];
        for (let j = 0; j < dim; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    return { getBoard };
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

function GameController() {
    const gameBoard = GameBoard();

    return {
        getBoard: gameBoard.getBoard(),
    }
}

function ScreenController() {
    const game = GameController();
    const boardDiv = document.querySelector('.game-board');

    const updateScreen = () => {
        boardDiv.innerHTML = '';

        const board = game.getBoard;

        board.forEach(row => {
            row.forEach((cell, index) => {
                const cellBox = document.createElement('div');
                cellBox.classList.add('cell');
                boardDiv.appendChild(cellBox);
            })
        })
    }

    //initial render
    updateScreen();
}

ScreenController();
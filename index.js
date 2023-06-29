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
    let value = "";

    const setValue = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        setValue,
        getValue
    };
}

function GameController() {
    const gameBoard = GameBoard();
    const players = [
        {
            name: 'Player 1',
            token: 'X'
        },
        {
            name: 'Player 2',
            token: 'O'
        }
    ]

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    return {
        getActivePlayer,
        switchPlayer,
        getBoard: gameBoard.getBoard,
    }
}

function ScreenController() {
    const game = GameController();
    const board = game.getBoard();
    const boardDiv = document.querySelector('.game-board');

    const handleClick = (event) => {

        if(event.target.textContent) return; //can't override cells

        const dataset = event.target.dataset;
        board[dataset.rowIndex][dataset.colIndex].setValue(game.getActivePlayer().token);
        game.switchPlayer();
        updateScreen();
    }

    const updateScreen = () => {
        boardDiv.innerHTML = '';

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellBox = document.createElement('div');
                cellBox.classList.add('cell');
                cellBox.dataset.rowIndex = rowIndex;
                cellBox.dataset.colIndex = colIndex;
                cellBox.textContent = cell.getValue();
                cellBox.addEventListener('click', handleClick)
                boardDiv.appendChild(cellBox);
            })
        })
    }

    //initial render
    updateScreen();
}

ScreenController();
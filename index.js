function GameBoard() {
    const dim = 3;
    const board = [];

    for (let i = 0; i < dim * dim; i++) {
        board.push(Cell());
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
    let winner = null;
    let winningCells = [];

    const getActivePlayer = () => activePlayer;
    const getWinner = () => winner;
    const getWinningCells = () => winningCells;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const calculateWinner = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        const cells = gameBoard.getBoard();
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if(cells[a].getValue() && cells[a].getValue() === cells[b].getValue() && cells[b].getValue() === cells[c].getValue()) {
                winner = activePlayer;
                winningCells = winConditions[i];
            }
        }
        return;
    }

    return {
        getActivePlayer,
        getWinner,
        getWinningCells,
        switchPlayer,
        getBoard: gameBoard.getBoard,
        calculateWinner
    }
}

function ScreenController() {
    const game = GameController();
    const board = game.getBoard();
    const currentPlayer = document.querySelector('.current-turn');
    const boardDiv = document.querySelector('.game-board');

    const handleWinner = () => {
        console.log("WOOHOO");
    }

    const handleClick = (event) => {
        if(event.target.textContent) return; //can't override cells
        board[event.target.dataset.index].setValue(game.getActivePlayer().token);
        game.calculateWinner();
        if(game.getWinner()){ 
            handleWinner();
        } else {
            game.switchPlayer();
        }
        updateScreen();
    }

    const updateScreen = () => {
        boardDiv.innerHTML = '';

        board.forEach((cell, index) => {
            const cellBox = document.createElement('div');
            cellBox.classList.add('cell');
            cellBox.dataset.index = index;
            cellBox.textContent = cell.getValue();
            if(!game.getWinner()) cellBox.addEventListener('click', handleClick); //disable cells
            boardDiv.appendChild(cellBox);
        })

        if(game.getWinner()) {
            game.getWinningCells().forEach(i => {
                boardDiv.children[i].classList.add('win');
            })
        }

        currentPlayer.textContent = `${game.getActivePlayer().name}'s turn`;
    }
    updateScreen(); //initial render
}

ScreenController();
const player = (name, mark) => {
    return { name, mark }
}

const displayController = (() => {
    let container = document.querySelector('.container')
    let startButton = document.querySelector('.btn__start')
    let resetButton = document.querySelector('.btn__reset')
    let playAgainButton = document.querySelector('.btn__playagain')
    let modal = document.querySelector('.modal')
    let modalPlayers = document.querySelector('.modal__content.players')
    let modalWinner = document.querySelector('.modal__content.winner')
    let error = document.querySelector('.error__message')

    let namePlayer1 = document.querySelector('.name__player1')
    let namePlayer2 = document.querySelector('.name__player2')
    let nameWinner = document.querySelector('.name__winner')
    container.style.display = 'none'
    document.body.style.display = 'block'

    const showGameboard = () => {
        container.style.display = 'flex'
        document.body.style.display = 'grid'
        startButton.style.display = 'none'
        modal.style.display = 'none'
    }

    const setNamePlayer = (player1, player2) => {
        namePlayer1.textContent = player1;
        namePlayer2.textContent = player2
    }

    const showModalWinner = () => {
        if (gameBoard.checkWinner()) {
            modal.style.display = 'block';
            resetButton.style.display = 'inline-block';
            modalPlayers.style.display = 'none';
            modalWinner.style.display = 'block'
            nameWinner.textContent = gameBoard.getNamePlayerWin() + ' has won'
        }
    }

    const showDrawMessage = () => {
        if (gameBoard.checkWinner() === false) {
            modal.style.display = 'block';
            resetButton.style.display = 'inline-block';
            modalPlayers.style.display = 'none';
            modalWinner.style.display = 'block'
            nameWinner.textContent = 'Draw'
        }
    }

    const resetNamePlayer = () => {
        error.style.display = 'none'
        document.querySelector('#player1').value = ''
        document.querySelector('#player2').value = ''
    }

    resetButton.addEventListener('click', () => {
        resetNamePlayer()
        gameBoard.resetBoard()
        modalWinner.style.display = 'none'
        modalPlayers.style.display = 'block'
        startButton.style.display = 'inline-block'
    })

    playAgainButton.addEventListener('click', () => {
        modal.style.display = 'none'
    })

    const errorMessage = (player1, player2) => {
        error.style.display = 'block'
        if (player1 === '' || player2 === '') {
            error.textContent = 'Entering names'
        } else if (player1 === player2) {
            error.textContent = 'Names must be different'
        }
    }

    startButton.addEventListener('click', () => {
        let player1 = document.querySelector('#player1').value
        let player2 = document.querySelector('#player2').value
        if (player1 === '' || player2 === '' || player1 === player2) {
            errorMessage(player1, player2)
            return
        }
        showGameboard()
        setNamePlayer(player1, player2)
        gameBoard.getPlayer(player1, player2)
        gameBoard.createBoard()
        gameBoard.addMark()
    })

    return {
        showModalWinner,
        showDrawMessage,
    }

})()

const gameBoard = (() => {
    let board = new Array(9).fill(null);
    let container = document.querySelector('.gameboard');

    const createBoard = () => {
        for (let i = 0; i < board.length; i++) {
            let square = document.createElement('div')
            square.setAttribute('class', 'square')
            container.appendChild(square)
        }
    }

    let players = []
    let playerTurn = 0;

    const getPlayer = (player1, player2) => {
        player1 = player(player1, 'X')
        player2 = player(player2, 'O')
        return players = [player1, player2]
    }

    let totalX = [];
    let totalO = [];


    const addMark = () => {
        let squares = document.querySelectorAll('.square')
        squares.forEach((square) => {
            square.addEventListener('click', (e) => {

                if (checkWinner()) {
                    return
                }
                if (e.target.textContent === 'X' || e.target.textContent === 'O') return;
                if (playerTurn % 2 === 0) {
                    e.target.textContent = players[0].mark
                    playerTurn++
                } else {
                    e.target.textContent = players[1].mark
                    playerTurn++
                }
                let index = [...container.children].indexOf(square)
                if (playerTurn % 2) {
                    totalX.push(index)
                } else {
                    totalO.push(index)
                }
                board[index] = playerTurn % 2 ? 'X' : 'O'
                if (checkWinner()) {
                    displayController.showModalWinner()
                    return
                } else if (checkWinner() === false) {
                    displayController.showDrawMessage()
                }

            })
        })
    }

    const getNamePlayerWin = () => {
        let mark = playerTurn % 2 ? 'X' : 'O'
        if (mark === 'X') {
            return players[0].name
        } else {
            return players[1].name
        }
    }

    const resetBoard = () => {
        let squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.textContent = ''
        })
        totalO = [];
        totalX = [];
        board = new Array(9).fill(null)
        playerTurn = 0
    }

    let resetButton = document.querySelector('.btn__playagain')
    resetButton.addEventListener('click', resetBoard)

    let wins = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]

    const checkWinner = () => {
        for (let i = 0; i < wins.length; i++) {
            if (totalX.includes(wins[i][0]) && totalX.includes(wins[i][1]) && totalX.includes(wins[i][2])) {
                return true
            } else if (totalO.includes(wins[i][0]) && totalO.includes(wins[i][1]) && totalO.includes(wins[i][2])) {
                return true
            }
        }
        if (!board.some(mark => mark === null)) {
            return false
        }
    }

    return {
        createBoard,
        addMark,
        checkWinner,
        getPlayer,
        getNamePlayerWin,
        resetBoard,
    }
})();



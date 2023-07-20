const player = (name, mark) => {
    return { name, mark }
}

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

    const player1 = player('Player 1', 'X')
    const player2 = player('Player 2', 'O')
    let players = [player1, player2]
    let playerTurn = 0;

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
                    return
                }
                if (!board.some(mark => mark === null)) {
                    console.log('Draw');
                }
            })
        })
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

    let resetButton = document.querySelector('.btn__reset')
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
                console.log('Winner X');
                return true
            } else if (totalO.includes(wins[i][0]) && totalO.includes(wins[i][1]) && totalO.includes(wins[i][2])) {
                console.log('Winner O');
                return true
            }
        }
    }

    return {
        createBoard,
        addMark,
        checkWinner,
    }
})();

const displayController = (() => {
    let container = document.querySelector('.container')
    let resetButton = document.querySelector('.btn__reset')

    resetButton.style.display = 'none'
    container.style.display = 'none'
    document.body.style.display = 'block'

    const setDisplayElement = () => {
        resetButton.style.display = 'inline-block'
        container.style.display = 'flex'
        document.body.style.display = 'grid'
        startButton.style.display = 'none'
    }

    let startButton = document.querySelector('.btn__start')
    startButton.addEventListener('click', () => {
        setDisplayElement()
        gameBoard.createBoard()
        gameBoard.addMark()
    })
})()







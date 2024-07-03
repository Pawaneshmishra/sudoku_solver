function getBoard() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            row.push(cell.value ? parseInt(cell.value) : 0);
        }
        board.push(row);
    }
    return board;
}

function setBoard(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.value = board[i][j] || '';
        }
    }
}

function notify(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
}

function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(board = getBoard()) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            setBoard(board);
                            notify("Sudoku solved!");
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    setBoard(board);
    notify("Sudoku solved!");
    return true;
}

function validateSudoku() {
    const board = getBoard();
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] !== 0 && !isValid(board, row, col, board[row][col])) {
                notify("Invalid Sudoku!");
                return false;
            }
        }
    }
    notify("Valid Sudoku!");
    return true;
}

function generateSudoku() {
    resetGrid();
    const sample = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    setBoard(sample);
    notify("Sudoku generated!");
}

function resetGrid() {
    const inputs = document.querySelectorAll('.grid input');
    inputs.forEach(input => input.value = '');
    notify('');
}
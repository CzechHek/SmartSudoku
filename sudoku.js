const EMPTY_BOARD = Array.from({length: 9}, () => new Array(9));

Array.prototype.shuffle = function () {
	for (let i = this.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[this[i], this[j]] = [this[j], this[i]];
	}
	return this;
}

Array.prototype.deepCopy = function () {
	return this.map(row => row.slice());
}

const checkDuplicateInRow = (board, row, num) => board[row].includes(num);

function checkDuplicateInColumn(board, col, num) {
	for (let row = 0; row < 9; row++) {
		if (board[row][col] === num) {
			return true;
		}
	}

	return false;
}

function checkDuplicateInBox(board, row, col, num) {
	const startRow = row - row % 3;
	const startCol = col - col % 3;

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[startRow + i][startCol + j] === num) {
				return true;
			}
		}
	}

	return false;
}

const isValidMove = (board, row, col, num) =>
	!checkDuplicateInRow(board, row, num) &&
	!checkDuplicateInColumn(board, col, num) &&
	!checkDuplicateInBox(board, row, col, num);

let iterations;

function generateFilledBoard(board = null) {
	if (!board) {
		board = EMPTY_BOARD.deepCopy();
		iterations = 0;
	}

	const numbers = Array.from({length: 9}, (_, i) => i + 1);

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col]) {
				continue
			}

			for (const num of numbers.shuffle()) {
				iterations++;

				if (iterations > 5_000_000) {
					throw new Error('Too many iterations');
				}

				if (isValidMove(board, row, col, num)) {
					board[row][col] = num;

					if (generateFilledBoard(board)) {
						return board;
					}

					board[row][col] = 0;
				}
			}

			return false;
		}
	}

	return board;
}
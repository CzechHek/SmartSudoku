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

const isDuplicateInRow = (board, row, num) => board[row].includes(num);

function isDuplicateInColumn(board, col, num, size = 9) {
	for (let row = 0; row < size; row++) {
		if (board[row][col] === num) {
			return true;
		}
	}

	return false;
}

function isDuplicateInBox(board, row, col, num, size = 9) {
	const boxSize = Math.sqrt(size);
	const startRow = row - row % boxSize;
	const startCol = col - col % boxSize;

	for (let i = 0; i < boxSize; i++) {
		for (let j = 0; j < boxSize; j++) {
			if (board[startRow + i][startCol + j] === num) {
				return true;
			}
		}
	}

	return false;
}

const isValidMove = (board, row, col, num, size = 9) =>
	!isDuplicateInRow(board, row, num) &&
	!isDuplicateInColumn(board, col, num, size) &&
	!isDuplicateInBox(board, row, col, num, size);

let iterations = 0;

function generateFilledBoard(size = 9, board = null) {
	if (Math.sqrt(size) % 1) {
		throw new Error('Invalid size');
	}

	if (!board) {
		board = Array.from({length: size}, () => new Array(size));
	}

	const numbers = Array.from({length: size}, (_, i) => i + 1);

	for (let row = 0; row < size; row++) {
		for (let col = 0; col < size; col++) {
			if (board[row][col]) {
				continue;
			}

			for (const num of numbers.shuffle()) {
				iterations++;

				if (iterations > 5_000_000) {
					throw new Error('Too many iterations');
				}

				if (isValidMove(board, row, col, num, size)) {
					board[row][col] = num;

					if (generateFilledBoard(size, board)) {
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
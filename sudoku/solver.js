/**
 * Sudoku solver class
 * Used for solving a Sudoku board and checking if it has a unique solution
 *
 * @param {Sudoku} sudoku - Sudoku object to solve
 */
class Solver {
	constructor(sudoku) {
		this.sudoku = sudoku;
		this.board = sudoku.board.deepCopy();
		this.moreSolutions = false;
	}

	hasUniqueSolution() {
		this.checkForMultipleSolutions();

		return !this.moreSolutions;
	}

	// Count the number of solutions
	checkForMultipleSolutions() {
		for (let row = 0; row < this.sudoku.size; row++) {
			for (let col = 0; col < this.sudoku.size; col++) {
				if (this.board[row][col] === null) {
					for (let num = 0; num < this.sudoku.size; num++) {
						if (this.isValidCell(row, col, num)) {
							this.board[row][col] = num;

							if (this.checkForMultipleSolutions()) {
								return true;
							}

							this.board[row][col] = null;
						}
					}

					return false;
				}
			}
		}

		// If the Sudoku doesn't have a solution, save it first
		if (this.sudoku.solution === null) {
			// Save the first solution
			this.sudoku.solution = this.board.deepCopy();

			for (let row = 0; row < this.sudoku.size; row++) {
				console.log(this.board[row].map(cell => cell + 1).join(" "));
			}
		} else {
			// Check if the solution is different from the previous one
			for (let row = 0; row < this.sudoku.size; row++) {
				for (let col = 0; col < this.sudoku.size; col++) {
					if (this.sudoku.solution[row][col] !== this.board[row][col]) {
						// If the next solution is different, set the flag and return true to stop searching
						this.moreSolutions = true;
						return true;
					}
				}
			}

			// If the solution is the same, return false to continue searching for a different solution
			return false;
		}

		this.board = this.sudoku.board.deepCopy();

		// Search for another solution
		return this.checkForMultipleSolutions();
	}

	isValidCell(row, col, num) {
		return !this.isDuplicateInRow(row, num) &&
			!this.isDuplicateInColumn(col, num) &&
			!this.isDuplicateInBox(row, col, num);
	}

	isDuplicateInRow(row, num) {
		return this.board[row].includes(num);
	}

	isDuplicateInColumn(col, num) {
		for (let row = 0; row < this.sudoku.size; row++) {
			if (this.board[row][col] === num) {
				return true;
			}
		}

		return false;
	}

	isDuplicateInBox(row, col, num) {
		const startRow = row - row % this.sudoku.subBoxHeight;
		const startColumn = col - col % this.sudoku.subBoxWidth;

		for (let i = 0; i < this.sudoku.subBoxHeight; i++) {
			for (let j = 0; j < this.sudoku.subBoxWidth; j++) {
				if (this.board[startRow + i][startColumn + j] === num) {
					return true;
				}
			}
		}

		return false;
	}
}
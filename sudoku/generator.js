class Sudoku {
	constructor(subBoxWidth, subBoxHeight, seed) {
		this.subBoxWidth = parseInt(subBoxWidth); // Number of boxes horizontally
		this.subBoxHeight = parseInt(subBoxHeight); // Number of boxes vertically
		this.size = this.subBoxWidth * this.subBoxHeight; // Total size of the grid
		this.cellCount = this.size * this.size; // Total number of cells
		this.board = this.generateEmptyBoard();
		this.cellValues = numRange(this.size); // Array containing 0...size
		this.random = new SeededRandom(parseInt(seed));
		this.solution = null;
	}

	getByIndex(index) {
		return this.board[Math.floor(index / this.size)][index % this.size];
	}

	getSolutionByIndex(index) {
		return this.solution[Math.floor(index / this.size)][index % this.size];
	}

	generateEmptyBoard() {
		return Array.from({length: this.size}, () => new Array(this.size));
	}

	generateFilledBoard() {
		const shuffledCells = this.cellValues.shuffled(this.random);

		const rowShifts = numRange(this.subBoxWidth).shuffle(this.random);

		const columnShifts = [];
		for (let shift = 0; shift < this.subBoxHeight; shift++) {
			const values = numRange(this.subBoxWidth).shuffle(this.random);
			values.forEach(v => columnShifts.push(shift * this.subBoxWidth + v));
		}

		const rowAndColumnShifts = [];
		for (let shift = 0; shift < this.subBoxWidth; shift++) {
			const values = numRange(this.subBoxHeight).shuffle(this.random);
			values.forEach(v => rowAndColumnShifts.push(shift * this.subBoxHeight + v));
		}

		for (let i = 0; i < this.size; i++) {
			let row = 0;
			for (let rowShift = 0; rowShift < this.subBoxWidth; rowShift++) {
				for (let columnShift = 0; columnShift < this.subBoxHeight; columnShift++) {
					this.board[rowAndColumnShifts[row++]][columnShifts[i]] = shuffledCells[(i + rowShifts[rowShift] + columnShift * this.subBoxWidth) % this.size];
				}
			}
		}

		this.solution = this.board.deepCopy();
	}

	// Check if row does not contain any duplicates
	isValidRow(row) {
		const cellValues = new Set(this.cellValues);
		for (const value of this.board[row]) {
			// If the value is in the set, remove it
			if (cellValues.has(value)) {
				cellValues.delete(value);
			} else {
				// Duplicate value found in the row
				return false;
			}
		}
		return true;
	}

	// Check if column does not contain any duplicates
	isValidColumn(column) {
		const check = new Set(this.cellValues);
		for (let i = 0; i < this.size; i++) {
			const value = this.board[i][column];

			// If the value is in the set, remove it
			if (check.has(value)) {
				check.delete(value);
			} else {
				// Duplicate value found in the column
				return false;
			}
		}
		return true;
	}

	// Check if box does not contain any duplicates
	isValidSubBox(row, column) {
		const cellValues = new Set(this.cellValues);
		const startRow = row - row % this.subBoxHeight;
		const startColumn = column - column % this.subBoxWidth;

		for (let i = 0; i < this.subBoxHeight; i++) {
			for (let j = 0; j < this.subBoxWidth; j++) {
				const value = this.board[startRow + i][startColumn + j];

				// If the value is in the set, remove it
				if (cellValues.has(value)) {
					cellValues.delete(value);
				} else {
					// Duplicate value found in the box
					return false;
				}
			}
		}
		return true;
	}

	// Check if the board is valid
	isValidBoard() {
		for (let i = 0; i < this.size; i++) {
			if (!this.isValidRow(i)) {
				return false;
			}
			if (!this.isValidColumn(i)) {
				return false;
			}
		}

		for (let i = 0; i < this.size; i += this.subBoxWidth) {
			for (let j = 0; j < this.size; j += this.subBoxHeight) {
				if (!this.isValidSubBox(i, j)) {
					return false;
				}
			}
		}

		return true;
	}

	// Remove cells from the board
	removeCells(maxToRemove, maxAttempts = 1000) {
		let cellsRemoved = 0;

		let removeOrder = numRange(this.cellCount).shuffle(this.random);

		while (cellsRemoved < maxToRemove && maxAttempts-- > 0 && removeOrder.length > 0) {
			let cell = removeOrder.pop();
			let row = Math.floor(cell / this.size);
			let column = cell % this.size;

			if (this.board[row][column] === null) {
				continue;
			}

			let value = this.board[row][column];

			this.board[row][column] = null;

			let solver = new Solver(this);

			if (!solver.hasUniqueSolution()) {
				this.board[row][column] = value;
				if (maxAttempts % 100 === 0) {
					console.log(`Failed to remove cell at row ${row} and column ${column}, attempts left: ${maxAttempts}`);
				}
			} else {
				cellsRemoved++;
			}
		}

		console.log(`Removed ${cellsRemoved} cells from the board`);

		return cellsRemoved;

	}
}



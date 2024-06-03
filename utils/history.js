
function getIndexOfGameInHistory(rows, cols, seed, maxNumbersToRemove, gameHistory = null) {
	gameHistory = gameHistory || JSON.parse(localStorage.getItem("game-history"));

	return gameHistory.findIndex(game => game.rows === rows && game.cols === cols && game.seed === seed && game.maxNumbersToRemove === maxNumbersToRemove);
}

function loadGameFromHistory(rows, cols, seed, maxNumbersToRemove) {
	const gameHistory = JSON.parse(localStorage.getItem("game-history"));

	let index = getIndexOfGameInHistory(rows, cols, seed, maxNumbersToRemove, gameHistory);

	return index !== -1 ? gameHistory[index] : null;
}

function saveGameToHistory(rows, cols, seed, maxNumbersToRemove, cells, secondsElapsed) {
	const gameHistory = JSON.parse(localStorage.getItem("game-history"));

	// Remove the game if it already exists
	const index = getIndexOfGameInHistory(rows, cols, seed, maxNumbersToRemove, gameHistory);

	// Create a new game object
	const game = {};

	// Get how many numbers are left to fill
	const numbersLeft = cells.filter(cell => !cell.textContent).length;

	// Save the game data
	game.rows = rows;
	game.cols = cols;
	game.seed = seed;
	game.maxNumbersToRemove = maxNumbersToRemove;
	game.secondsElapsed = secondsElapsed;
	game.numbersLeft = numbersLeft;

	// Save all user filled cells
	cells.forEach((cell, i) => {
		if (cell.textContent && !cell.classList.contains("filled")) {
			game[i] = cell.textContent;
		}
	});

	// Remove the game if it already exists
	if (index !== -1) {
		console.log("Removing game from history")
		console.log(gameHistory[index])
		gameHistory.splice(index, 1);
	}

	// Add the game to the history
	gameHistory.unshift(game);

	console.log("Saving game to history")
	console.log(game)

	// Save the updated game history
	localStorage.setItem("game-history", JSON.stringify(gameHistory));
}

function getLastGameFromHistory() {
	const gameHistory = JSON.parse(localStorage.getItem("game-history"));

	if (gameHistory.length === 0) {
		return;
	}

	return gameHistory[0];
}

function deleteGameFromHistory(game) {
	const gameHistory = JSON.parse(localStorage.getItem("game-history"));

	// Find the index of the game in the history
	const index = getIndexOfGameInHistory(game.rows, game.cols, game.seed, game.maxNumbersToRemove, gameHistory);

	// Remove the game from the history
	if (index !== -1) {
		gameHistory.splice(index, 1);
		localStorage.setItem("game-history", JSON.stringify(gameHistory));
	}
}
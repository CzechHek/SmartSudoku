function setDefaultSettings() {
	if (localStorage.getItem("highlight") === null) {
		localStorage.setItem("highlight", true);
	}
	if (localStorage.getItem("warn-duplicates") === null) {
		localStorage.setItem("warn-duplicates", true);
	}
	if (localStorage.getItem("hide-completed") === null) {
		localStorage.setItem("hide-completed", true);
	}
	if (localStorage.getItem("autosolve") === null) {
		localStorage.setItem("autosolve", false);
	}
	if (localStorage.getItem("volume") === null) {
		localStorage.setItem("volume", 50);
	}
	if (localStorage.getItem("dark-theme") === null) {
		localStorage.setItem("dark-theme", true);
	}
	if (localStorage.getItem("subgrid-rows") === null) {
		localStorage.setItem("subgrid-rows", 3);
	}
	if (localStorage.getItem("subgrid-cols") === null) {
		localStorage.setItem("subgrid-cols", 3);
	}
	if (localStorage.getItem("seed") === null) {
		localStorage.setItem("seed", 0);
	}
	if (localStorage.getItem("max-numbers-to-remove") === null) {
		localStorage.setItem("max-numbers-to-remove", 50);
	}
	if (localStorage.getItem("game-history") === null) {
		localStorage.setItem("game-history", "[]");
	}
}

function loadSettings() {
	setDefaultSettings();

	// Load settings from localStorage
	document.getElementById("highlight").checked = localStorage.getItem("highlight") === "true";
	document.getElementById("warn-duplicates").checked = localStorage.getItem("warn-duplicates") === "true";
	document.getElementById("hide-completed").checked = localStorage.getItem("hide-completed") === "true";
	document.getElementById("autosolve").checked = localStorage.getItem("autosolve") === "true";
	document.getElementById("volume").value = localStorage.getItem("volume");
	document.getElementById("subgrid-rows-value").textContent = document.getElementById("subgrid-rows").value = localStorage.getItem("subgrid-rows");
	document.getElementById("subgrid-cols-value").textContent = document.getElementById("subgrid-cols").value = localStorage.getItem("subgrid-cols");
	document.getElementById("seed").value = localStorage.getItem("seed");

	// Update the displayed value
	document.getElementById("max-numbers-to-remove-value").textContent = document.getElementById("max-numbers-to-remove").value;

	let prevMaxNumbersToRemove = localStorage.getItem("max-numbers-to-remove");

	// Update slider max value depending on the number of rows and columns so the actual value is not greater than the new max
	updateNumbersToRemove();

	document.getElementById("max-numbers-to-remove-value").textContent = document.getElementById("max-numbers-to-remove").value = prevMaxNumbersToRemove;

	// Save the updated value in localStorage
	updateNumbersToRemove();

	// Update the theme
	changeTheme(localStorage.getItem("dark-theme") === "true");
}

function setRandomSeed() {
	// Generate a random seed between 0 and 999
	const randomSeed = Math.floor(Math.random() * 1000);

	// Get the seed input element
	const seedInput = document.getElementById("seed");

	// Set the seed slider to the random seed
	seedInput.value = randomSeed;

	seedInput.oninput();
}

function increaseSeed() {
	// Get the seed input element
	const seedInput = document.getElementById("seed");

	// Increase the seed by 1
	seedInput.value++;

	// Ensure the seed is between 0 and 999
	seedInput.oninput();
}

function decreaseSeed() {
	// Get the seed input element
	const seedInput = document.getElementById("seed");

	// Decrease the seed by 1
	seedInput.value--;

	// Ensure the seed is between 0 and 999
	seedInput.oninput();
}

function changeTheme(dark) {
	if (dark) {
		document.body.classList.add("dark-theme");
		document.querySelector(".theme-switch i").className = "fas fa-moon";
	} else {
		document.body.classList.remove("dark-theme");
		document.querySelector(".theme-switch i").className = "fas fa-sun";
	}

	localStorage.setItem("dark-theme", dark);
}

function updateNumbersToRemove() {
	const rows = document.getElementById("subgrid-rows").value;
	const cols = document.getElementById("subgrid-cols").value;

	const maxNumbersToRemove = Math.floor(rows * cols * 6);

	document.getElementById("max-numbers-to-remove").max = maxNumbersToRemove;

	// If the current value is greater than the new max, set it to the new max
	if (document.getElementById("max-numbers-to-remove").value > maxNumbersToRemove) {
		document.getElementById("max-numbers-to-remove").value = maxNumbersToRemove;
	}

	// Update the displayed value and the value in localStorage
	localStorage.setItem("max-numbers-to-remove",
		document.getElementById("max-numbers-to-remove-value").textContent = document.getElementById("max-numbers-to-remove").value
	);
}

function initSettingsChangeHandlers() {
	document.getElementById("highlight").onchange = function () {
		localStorage.setItem("highlight", this.checked);
	};
	document.getElementById("warn-duplicates").onchange = function () {
		localStorage.setItem("warn-duplicates", this.checked);
	};
	document.getElementById("hide-completed").onchange = function () {
		localStorage.setItem("hide-completed", this.checked);
	};
	document.getElementById("autosolve").onchange = function () {
		localStorage.setItem("autosolve", this.checked);
	};
	document.getElementById("volume").onchange = function () {
		localStorage.setItem("volume", this.value);
	};

	document.getElementById("theme").onchange = function () {
		changeTheme(this.checked);
	};

	document.getElementById("subgrid-rows").oninput = function () {
		document.getElementById("subgrid-rows-value").textContent = this.value;
		localStorage.setItem("subgrid-rows", this.value);
		updateNumbersToRemove();
	};
	document.getElementById("subgrid-cols").oninput = function () {
		document.getElementById("subgrid-cols-value").textContent = this.value;
		localStorage.setItem("subgrid-cols", this.value);
		updateNumbersToRemove();
	};
	document.getElementById("max-numbers-to-remove").oninput = function () {
		document.getElementById("max-numbers-to-remove-value").textContent = this.value;
		localStorage.setItem("max-numbers-to-remove", this.value);
	};
	document.getElementById("seed").oninput = function () {
		// Ensure the value is between 0 and 999
		this.value = Math.min(Math.max(parseInt(this.value), 0), 999);

		localStorage.setItem("seed", this.value);
	};
}

/**
 * Function returning a new array with elements shuffled using seeded random object
 * @param random
 * @returns {*}
 */
Array.prototype.shuffled = function(random) {
	return this.deepCopy().shuffle(random);
}

/**
 * Function to shuffle an array using a seeded random object
 * @param random
 * @returns {Array}
 */
Array.prototype.shuffle = function(random) {
	for (let i = this.length - 1; i > 0; i--) {
		const j = Math.floor(random.next() * (i + 1));
		[this[i], this[j]] = [this[j], this[i]];
	}

	return this;
}

/**
 * Function to create a deep copy of an array
 * @returns {any}
 */
Array.prototype.deepCopy = function() {
	return JSON.parse(JSON.stringify(this));
}

/**
 * Function to generate an array of numbers from 0 to n - 1
 * @param n
 * @returns {number[]}
 */
function numRange(n) {
	return [...Array(n).keys()];
}

/**
 * Function to parse seconds into a HH:MM:SS format
 * @param seconds
 * @returns {string}
 */
function formatSecondsToTime(seconds) {
	return new Date(seconds * 1000).toISOString().slice(11, 19);
}
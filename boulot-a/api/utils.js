// Fonction qui calcule la distance entre deux coordonée shiné sur internet : https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
module.exports.calcCrow = function (A, B) {
	[latA, lonA] = A;
	[latB, lonB] = B;
	var R = 6371; // km
	var dLat = toRad(latB - latA);
	var dLon = toRad(lonB - lonA);
	var latA = toRad(latA);
	var latB = toRad(latB);

	var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latA) * Math.cos(latB);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d;
};

// Converts numeric degrees to radians
function toRad(Value) {
	return (Value * Math.PI) / 180;
}

// fonxtion qui permet de générer toutes les permutation d'une liste
// Shiné sur internet : https://www.codegrepper.com/code-examples/r/how+to+find+all+permutations+of+an+array+with+javascript
function getArrayMutations(arr, perms = [], len = arr.length) {
	if (len === 1) perms.push(arr.slice(0));

	for (let i = 0; i < len; i++) {
		getArrayMutations(arr, perms, len - 1);

		len % 2 // parity dependent adjacent elements swap
			? ([arr[0], arr[len - 1]] = [arr[len - 1], arr[0]])
			: ([arr[i], arr[len - 1]] = [arr[len - 1], arr[i]]);
	}

	return perms;
}

// fonction pour trouver le chemin le plus cours passant par tout les points de la carte (voyageur de commerce)
module.exports.getShortestPath = function (start, stop, steps) {
	let paths = getArrayMutations(steps); // on crée toutes les permutations des étapes
	const newPaths = paths.map((path) => [start, ...path, stop]); // on ajoute le départ et l'arrivée
	let bestPath = [];
	let bestLenght = Number.POSITIVE_INFINITY;
	newPaths.forEach((path) => {
		// on calcule la longeur total du trajet et on regarde s'il est meilleur que l'existant
		let sum = 0;
		for (let i = 0; i < path.length - 1; i++) {
			sum += this.calcCrow(path[i].coord, path[i + 1].coord);
		}
		if (sum < bestLenght) {
			bestLenght = sum;
			bestPath = path;
		}
	});
	return bestPath;
};

module.exports.weightedRandom = function (prob) {
	let i, sum = 0, r = Math.random();
	for (i in prob) {
		sum += prob[i];
		if (r <= sum) return i;
	}
};

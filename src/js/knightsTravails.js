import moves from './moves.js';

const directions = moves;

class Node {
	constructor(row, col, path) {
		this.row = row;
		this.col = col;
		this.path = path;
	}

	getPositionString() {
		return `${this.row}, ${this.col}`;
	}
}

const getNeighbors = (row, col) => {
	//
	const neighbors = [];

	for (const direction of directions) {
		const [rowChange, colChange] = direction;

		const neighborRow = row + rowChange;
		const neighborCol = col + colChange;

		neighbors.push([neighborRow, neighborCol]);
	}

	return neighbors;
};

function knightMoves(start, end) {
	const BOARD_SIZE = 8;
	const queue = [];
	const startNode = new Node(start[0], start[1], []);

	queue.push(startNode);

	//Visited?
	const visited = new Set();

	for (const e of [...start, ...end]) {
		if (e >= BOARD_SIZE || e < 0) {
			throw new Error(
				'Invalid start and end. The board is in 8x8 dimension (0-7 indices)'
			);
		}
	}

	while (queue.length > 0) {
		// Remove node
		// in practice, we should use a real Queue class so that we can dequeue in O(1) time instead of O(n) time.
		const node = queue.shift();
		const { row, col, path } = node;

		// Process node
		if (row === end[0] && col === end[1]) {
			path.push([row, col]);
			return path;
		}
		visited.add(node.getPositionString());

		// Add neighbors
		for (const neighbor of getNeighbors(row, col)) {
			const [neighborRow, neighborCol] = neighbor;
			const neighborNode = new Node(neighborRow, neighborCol, [
				...path,
				[row, col],
			]);

			if (visited.has(neighborNode.getPositionString())) continue;

			queue.push(neighborNode);
		}
	}

	return 0;
}

export default knightMoves;

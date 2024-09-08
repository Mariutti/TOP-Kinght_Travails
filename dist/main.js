/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/knightsTravails.js":
/*!***********************************!*\
  !*** ./src/js/knightsTravails.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _moves_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moves.js */ "./src/js/moves.js");


const directions = _moves_js__WEBPACK_IMPORTED_MODULE_0__["default"];

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knightMoves);


/***/ }),

/***/ "./src/js/moves.js":
/*!*************************!*\
  !*** ./src/js/moves.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const moves = [
	[1, 2],
	[1, -2],
	[2, 1],
	[2, -1],
	[-1, 2],
	[-1, -2],
	[-2, 1],
	[-2, -1],
];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moves);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _knightsTravails_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knightsTravails.js */ "./src/js/knightsTravails.js");



function prettyPrint(start, end) {
	try {
		const result = (0,_knightsTravails_js__WEBPACK_IMPORTED_MODULE_0__["default"])(start, end);
		if (result === null) {
			console.log(`Can't see any path between ${start} -> ${end}`);
			return;
		}

		console.log(
			`You made it in ${result.length - 1} ${
				result.length - 1 === 1 ? "move" : "moves"
			}! Here's your path from ${start} -> ${end}`,
		);

		for (const e of result) {
			console.log(e);
		}
	} catch (e) {
		console.log(e.message);
	}
}

prettyPrint([0, 0], [1, 2]);
prettyPrint([0, 0], [3, 3]);
prettyPrint([3, 3], [0, 0]);
prettyPrint([0, 0], [7, 7]);
prettyPrint([3, 3], [4, 3]);
prettyPrint([0, 0], [5, 5]);
prettyPrint([0, 0], [1, 0]);
prettyPrint([0, 0], [0, 0]);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFDL0I7QUFDQSxtQkFBbUIsaURBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxTQUFTLElBQUksU0FBUztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxpQkFBaUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2hGM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLEtBQUssRUFBQzs7Ozs7OztVQ1hyQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7OztBQ04rQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwrREFBVztBQUM1QjtBQUNBLDZDQUE2QyxPQUFPLEtBQUssSUFBSTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEM7QUFDQSxJQUFJLDBCQUEwQixPQUFPLEtBQUssSUFBSTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2tuaWdodF90cmF2YWlscy8uL3NyYy9qcy9rbmlnaHRzVHJhdmFpbHMuanMiLCJ3ZWJwYWNrOi8va25pZ2h0X3RyYXZhaWxzLy4vc3JjL2pzL21vdmVzLmpzIiwid2VicGFjazovL2tuaWdodF90cmF2YWlscy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rbmlnaHRfdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tuaWdodF90cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2tuaWdodF90cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tuaWdodF90cmF2YWlscy8uL3NyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb3ZlcyBmcm9tICcuL21vdmVzLmpzJztcclxuXHJcbmNvbnN0IGRpcmVjdGlvbnMgPSBtb3ZlcztcclxuXHJcbmNsYXNzIE5vZGUge1xyXG5cdGNvbnN0cnVjdG9yKHJvdywgY29sLCBwYXRoKSB7XHJcblx0XHR0aGlzLnJvdyA9IHJvdztcclxuXHRcdHRoaXMuY29sID0gY29sO1xyXG5cdFx0dGhpcy5wYXRoID0gcGF0aDtcclxuXHR9XHJcblxyXG5cdGdldFBvc2l0aW9uU3RyaW5nKCkge1xyXG5cdFx0cmV0dXJuIGAke3RoaXMucm93fSwgJHt0aGlzLmNvbH1gO1xyXG5cdH1cclxufVxyXG5cclxuY29uc3QgZ2V0TmVpZ2hib3JzID0gKHJvdywgY29sKSA9PiB7XHJcblx0Ly9cclxuXHRjb25zdCBuZWlnaGJvcnMgPSBbXTtcclxuXHJcblx0Zm9yIChjb25zdCBkaXJlY3Rpb24gb2YgZGlyZWN0aW9ucykge1xyXG5cdFx0Y29uc3QgW3Jvd0NoYW5nZSwgY29sQ2hhbmdlXSA9IGRpcmVjdGlvbjtcclxuXHJcblx0XHRjb25zdCBuZWlnaGJvclJvdyA9IHJvdyArIHJvd0NoYW5nZTtcclxuXHRcdGNvbnN0IG5laWdoYm9yQ29sID0gY29sICsgY29sQ2hhbmdlO1xyXG5cclxuXHRcdG5laWdoYm9ycy5wdXNoKFtuZWlnaGJvclJvdywgbmVpZ2hib3JDb2xdKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBuZWlnaGJvcnM7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBrbmlnaHRNb3ZlcyhzdGFydCwgZW5kKSB7XHJcblx0Y29uc3QgQk9BUkRfU0laRSA9IDg7XHJcblx0Y29uc3QgcXVldWUgPSBbXTtcclxuXHRjb25zdCBzdGFydE5vZGUgPSBuZXcgTm9kZShzdGFydFswXSwgc3RhcnRbMV0sIFtdKTtcclxuXHJcblx0cXVldWUucHVzaChzdGFydE5vZGUpO1xyXG5cclxuXHQvL1Zpc2l0ZWQ/XHJcblx0Y29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKTtcclxuXHJcblx0Zm9yIChjb25zdCBlIG9mIFsuLi5zdGFydCwgLi4uZW5kXSkge1xyXG5cdFx0aWYgKGUgPj0gQk9BUkRfU0laRSB8fCBlIDwgMCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXHJcblx0XHRcdFx0J0ludmFsaWQgc3RhcnQgYW5kIGVuZC4gVGhlIGJvYXJkIGlzIGluIDh4OCBkaW1lbnNpb24gKDAtNyBpbmRpY2VzKSdcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XHJcblx0XHQvLyBSZW1vdmUgbm9kZVxyXG5cdFx0Ly8gaW4gcHJhY3RpY2UsIHdlIHNob3VsZCB1c2UgYSByZWFsIFF1ZXVlIGNsYXNzIHNvIHRoYXQgd2UgY2FuIGRlcXVldWUgaW4gTygxKSB0aW1lIGluc3RlYWQgb2YgTyhuKSB0aW1lLlxyXG5cdFx0Y29uc3Qgbm9kZSA9IHF1ZXVlLnNoaWZ0KCk7XHJcblx0XHRjb25zdCB7IHJvdywgY29sLCBwYXRoIH0gPSBub2RlO1xyXG5cclxuXHRcdC8vIFByb2Nlc3Mgbm9kZVxyXG5cdFx0aWYgKHJvdyA9PT0gZW5kWzBdICYmIGNvbCA9PT0gZW5kWzFdKSB7XHJcblx0XHRcdHBhdGgucHVzaChbcm93LCBjb2xdKTtcclxuXHRcdFx0cmV0dXJuIHBhdGg7XHJcblx0XHR9XHJcblx0XHR2aXNpdGVkLmFkZChub2RlLmdldFBvc2l0aW9uU3RyaW5nKCkpO1xyXG5cclxuXHRcdC8vIEFkZCBuZWlnaGJvcnNcclxuXHRcdGZvciAoY29uc3QgbmVpZ2hib3Igb2YgZ2V0TmVpZ2hib3JzKHJvdywgY29sKSkge1xyXG5cdFx0XHRjb25zdCBbbmVpZ2hib3JSb3csIG5laWdoYm9yQ29sXSA9IG5laWdoYm9yO1xyXG5cdFx0XHRjb25zdCBuZWlnaGJvck5vZGUgPSBuZXcgTm9kZShuZWlnaGJvclJvdywgbmVpZ2hib3JDb2wsIFtcclxuXHRcdFx0XHQuLi5wYXRoLFxyXG5cdFx0XHRcdFtyb3csIGNvbF0sXHJcblx0XHRcdF0pO1xyXG5cclxuXHRcdFx0aWYgKHZpc2l0ZWQuaGFzKG5laWdoYm9yTm9kZS5nZXRQb3NpdGlvblN0cmluZygpKSkgY29udGludWU7XHJcblxyXG5cdFx0XHRxdWV1ZS5wdXNoKG5laWdoYm9yTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gMDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQga25pZ2h0TW92ZXM7XHJcbiIsImNvbnN0IG1vdmVzID0gW1xyXG5cdFsxLCAyXSxcclxuXHRbMSwgLTJdLFxyXG5cdFsyLCAxXSxcclxuXHRbMiwgLTFdLFxyXG5cdFstMSwgMl0sXHJcblx0Wy0xLCAtMl0sXHJcblx0Wy0yLCAxXSxcclxuXHRbLTIsIC0xXSxcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vdmVzO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBrbmlnaHRNb3ZlcyBmcm9tICcuL2tuaWdodHNUcmF2YWlscy5qcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gcHJldHR5UHJpbnQoc3RhcnQsIGVuZCkge1xyXG5cdHRyeSB7XHJcblx0XHRjb25zdCByZXN1bHQgPSBrbmlnaHRNb3ZlcyhzdGFydCwgZW5kKTtcclxuXHRcdGlmIChyZXN1bHQgPT09IG51bGwpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coYENhbid0IHNlZSBhbnkgcGF0aCBiZXR3ZWVuICR7c3RhcnR9IC0+ICR7ZW5kfWApO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc29sZS5sb2coXHJcblx0XHRcdGBZb3UgbWFkZSBpdCBpbiAke3Jlc3VsdC5sZW5ndGggLSAxfSAke1xyXG5cdFx0XHRcdHJlc3VsdC5sZW5ndGggLSAxID09PSAxID8gXCJtb3ZlXCIgOiBcIm1vdmVzXCJcclxuXHRcdFx0fSEgSGVyZSdzIHlvdXIgcGF0aCBmcm9tICR7c3RhcnR9IC0+ICR7ZW5kfWAsXHJcblx0XHQpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgZSBvZiByZXN1bHQpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coZSk7XHJcblx0XHR9XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0Y29uc29sZS5sb2coZS5tZXNzYWdlKTtcclxuXHR9XHJcbn1cclxuXHJcbnByZXR0eVByaW50KFswLCAwXSwgWzEsIDJdKTtcclxucHJldHR5UHJpbnQoWzAsIDBdLCBbMywgM10pO1xyXG5wcmV0dHlQcmludChbMywgM10sIFswLCAwXSk7XHJcbnByZXR0eVByaW50KFswLCAwXSwgWzcsIDddKTtcclxucHJldHR5UHJpbnQoWzMsIDNdLCBbNCwgM10pO1xyXG5wcmV0dHlQcmludChbMCwgMF0sIFs1LCA1XSk7XHJcbnByZXR0eVByaW50KFswLCAwXSwgWzEsIDBdKTtcclxucHJldHR5UHJpbnQoWzAsIDBdLCBbMCwgMF0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
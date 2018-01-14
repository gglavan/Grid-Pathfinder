/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Cell {
	constructor(x, y, el) {
		this.x = x;
		this.y = y;
		this.g = 0;
		this.h = 0;
		this.f = 0;
		this.distance = Number.MAX_SAFE_INTEGER;
		this.obstacle = false;
		this.visited = false;
		this.el = el;
		this.parent = null;
	}
	heuristic(goal) {
		const dx = Math.abs(this.x - goal.x);
		const dy = Math.abs(this.y - goal.y);
		// return dx + dy;
		const dx2 = start.x - goal.x
		const dy2 = start.y - goal.y
		const cross = Math.abs(dx * dy2 - dx2 * dy)
		return (dx + dy) + cross * 0.001;
		// return 5 * (dx + dy) + (7 - 2 * 5) * Math.min(dx, dy);
	}
}
/* harmony export (immutable) */ __webpack_exports__["c"] = Cell;


const cellSize = 20;
/* harmony export (immutable) */ __webpack_exports__["b"] = cellSize;

const STRAIGHT_COST = 1;
/* harmony export (immutable) */ __webpack_exports__["a"] = STRAIGHT_COST;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = drawPath;
/* harmony export (immutable) */ __webpack_exports__["e"] = resetPath;
/* harmony export (immutable) */ __webpack_exports__["f"] = setObstacles;
/* harmony export (immutable) */ __webpack_exports__["d"] = isOnPath;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Grid__ = __webpack_require__(2);


// Colors container
const Color = {
	visitedNode: "rgb(224, 242, 241)",
	path: "rgb(179, 229, 252)",
	obstacle: "rgb(128, 128, 128)",
	start: "rgb(147, 202, 59)",
	goal: "rgb(235, 73, 96)",
	clearNode: "rgb(255, 255, 255)",
	nodeBorder: "1px solid rgb(230, 230, 230)"
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Color;


// Alert controller
const Alert = {
	start: () => Materialize.toast(`Please set the start spot!`, 1500, 'red lighten-1'),
	goal: () => Materialize.toast('Please set the finish spot!', 1500, 'red lighten-1'),
	both: () => Materialize.toast('Please set the initial spots!', 1500, 'red lighten-1'),
	notFound: () => Materialize.toast('Path not found!', 1500, 'red lighten-1'),
	pathInfo: (nodes, length, time) => Materialize.toast(`Visited nodes: ${nodes}\nPath length: ${length}\nTime: ${time}s`, 100000, 'green lighten-2')
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Alert;


// Async function to draw the path
async function drawPath() {
	if (lastPath.length) {
		const t0 = performance.now();
		for (let i = 0, len = drawOrder.length; i < len; i++) {
			grid[drawOrder[i].x][drawOrder[i].y].el.style.backgroundColor = Color.visitedNode;
			grid[drawOrder[i].x][drawOrder[i].y].distance = Number.MAX_SAFE_INTEGER;
			await sleep(2);
		}
		for (let i = lastPath.length - 1; i >= 0; i--) {
			lastPath[i].el.style.backgroundColor = Color.path;
			lastPath[i].el.style.border = "none";
			await sleep(2);
		}
		const t1 = performance.now();
		let visitedNodes = 0;
		for (let i = 0; i < h; i++) {
			for (let j = 0; j < w; j++) {
				grid[i][j].parent = null;
				if ( grid[i][j].el.style.backgroundColor == Color.visitedNode ||
					 	 grid[i][j].el.style.backgroundColor == Color.path)
					visitedNodes++;
			}
		}
		start.visited = false;
		start.distance = Number.MAX_SAFE_INTEGER;
		goal.visited = false;
		goal.distance = Number.MAX_SAFE_INTEGER;
		Alert.pathInfo(visitedNodes, lastPath.length, ((t1 - t0) / 1000).toFixed(2));
	}
}

// Reset the path
function resetPath() {
	for (let i = 0; i < lastPath.length; i++) {
		if (lastPath[i].el.style.backgroundColor == Color.path) {
			lastPath[i].el.style.backgroundColor = Color.clearNode;
			lastPath[i].el.style.border = Color.nodeBorder;
		}
	}
	for (let i = 0; i < drawOrder.length; i++) {
		if (grid[drawOrder[i].x][drawOrder[i].y].el.style.backgroundColor == Color.visitedNode)
			grid[drawOrder[i].x][drawOrder[i].y].el.style.backgroundColor = Color.clearNode;
	}
}

// Implemented artificial sleep for async to work
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate the desired amount of obstacles
function setObstacles() {
	const obst = 1000;
	let arr = [];
	let i = 0;
	for (let i = 0; i < h; i++) {
		for (let j = 0; j < w; j++) {
			grid[i][j].obstacle = false;
			grid[i][j].el.style.backgroundColor = Color.clearNode;
			grid[i][j].el.style.border = Color.nodeBorder;
			arr.push(grid[i][j]);
		}
	}
	while (i < obst) {
		let rand = Math.floor(Math.random(arr.length) * arr.length);
		arr[rand].obstacle = true;
		arr[rand].el.style.backgroundColor = Color.obstacle;
		arr[rand].el.style.border = "none";
		arr.splice(rand, 1);
		i++;
	}
}

// Check if the obstacle is on path
function isOnPath(curr) {
	for (let i = 0, len = lastPath.length; i < len; i++) {
		if (Object(__WEBPACK_IMPORTED_MODULE_0__Grid__["c" /* isSameNode */])(lastPath[i], curr))
			return true;
	}
	return false;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = initGrid;
/* harmony export (immutable) */ __webpack_exports__["a"] = clearGrid;
/* harmony export (immutable) */ __webpack_exports__["c"] = isSameNode;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Cell__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Draw__ = __webpack_require__(1);




function adjustSize() {
	const exc = document.getElementById("menu").clientHeight;
	const gridZone = document.getElementById("grid");
	let hgt = document.body.clientHeight - exc;
	hgt -= hgt % __WEBPACK_IMPORTED_MODULE_0__Cell__["b" /* cellSize */];
	hgt += __WEBPACK_IMPORTED_MODULE_0__Cell__["b" /* cellSize */];
	gridZone.style.height = hgt + "px";
	h = hgt / __WEBPACK_IMPORTED_MODULE_0__Cell__["b" /* cellSize */];
	w = Math.floor(document.body.clientWidth / __WEBPACK_IMPORTED_MODULE_0__Cell__["b" /* cellSize */]);
}

function initGrid() {
	adjustSize();
	const target = document.getElementById("grid");
	grid = new Array(h);
	for (let i = 0; i < h; i++) {
		grid[i] = new Array(w);
		for (let j = 0; j < w; j++) {
			const el = document.createElement("div");
			el.className = "cell";
			grid[i][j] = new __WEBPACK_IMPORTED_MODULE_0__Cell__["c" /* default */](i, j, el);
			grid[i][j].el.style.width = __WEBPACK_IMPORTED_MODULE_0__Cell__["b" /* cellSize */] + "px";
			grid[i][j].el.style.height = __WEBPACK_IMPORTED_MODULE_0__Cell__["b" /* cellSize */] + "px";
			target.appendChild(grid[i][j].el);
		}
	}
}

function clearGrid() {
	for (let i = 0; i < h; i++) {
		for (let j = 0; j < w; j++) {
			grid[i][j].obstacle = false;
			grid[i][j].visited = false;
			grid[i][j].parent = null;
			grid[i][j].distance = Number.MAX_SAFE_INTEGER; 
			grid[i][j].el.style.backgroundColor = __WEBPACK_IMPORTED_MODULE_1__Draw__["b" /* Color */].clearNode;
			grid[i][j].el.style.border = __WEBPACK_IMPORTED_MODULE_1__Draw__["b" /* Color */].nodeBorder;
		}
	}
	goal = start = undefined;
	const toastElement = $('.toast').first()[0];
	if (toastElement) toastElement.M_Toast.remove();;
}

function isSameNode(nodeA, nodeB) {
	return nodeA.x == nodeB.x && nodeA.y == nodeB.y;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PriorityQueue = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var AbstractPriorityQueue, ArrayStrategy, BHeapStrategy, BinaryHeapStrategy, PriorityQueue,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AbstractPriorityQueue = _dereq_('./PriorityQueue/AbstractPriorityQueue');

ArrayStrategy = _dereq_('./PriorityQueue/ArrayStrategy');

BinaryHeapStrategy = _dereq_('./PriorityQueue/BinaryHeapStrategy');

BHeapStrategy = _dereq_('./PriorityQueue/BHeapStrategy');

PriorityQueue = (function(superClass) {
  extend(PriorityQueue, superClass);

  function PriorityQueue(options) {
    options || (options = {});
    options.strategy || (options.strategy = BinaryHeapStrategy);
    options.comparator || (options.comparator = function(a, b) {
      return (a || 0) - (b || 0);
    });
    PriorityQueue.__super__.constructor.call(this, options);
  }

  return PriorityQueue;

})(AbstractPriorityQueue);

PriorityQueue.ArrayStrategy = ArrayStrategy;

PriorityQueue.BinaryHeapStrategy = BinaryHeapStrategy;

PriorityQueue.BHeapStrategy = BHeapStrategy;

module.exports = PriorityQueue;


},{"./PriorityQueue/AbstractPriorityQueue":2,"./PriorityQueue/ArrayStrategy":3,"./PriorityQueue/BHeapStrategy":4,"./PriorityQueue/BinaryHeapStrategy":5}],2:[function(_dereq_,module,exports){
var AbstractPriorityQueue;

module.exports = AbstractPriorityQueue = (function() {
  function AbstractPriorityQueue(options) {
    var ref;
    if ((options != null ? options.strategy : void 0) == null) {
      throw 'Must pass options.strategy, a strategy';
    }
    if ((options != null ? options.comparator : void 0) == null) {
      throw 'Must pass options.comparator, a comparator';
    }
    this.priv = new options.strategy(options);
    this.length = (options != null ? (ref = options.initialValues) != null ? ref.length : void 0 : void 0) || 0;
  }

  AbstractPriorityQueue.prototype.queue = function(value) {
    this.length++;
    this.priv.queue(value);
    return void 0;
  };

  AbstractPriorityQueue.prototype.dequeue = function(value) {
    if (!this.length) {
      throw 'Empty queue';
    }
    this.length--;
    return this.priv.dequeue();
  };

  AbstractPriorityQueue.prototype.peek = function(value) {
    if (!this.length) {
      throw 'Empty queue';
    }
    return this.priv.peek();
  };

  AbstractPriorityQueue.prototype.clear = function() {
    this.length = 0;
    return this.priv.clear();
  };

  return AbstractPriorityQueue;

})();


},{}],3:[function(_dereq_,module,exports){
var ArrayStrategy, binarySearchForIndexReversed;

binarySearchForIndexReversed = function(array, value, comparator) {
  var high, low, mid;
  low = 0;
  high = array.length;
  while (low < high) {
    mid = (low + high) >>> 1;
    if (comparator(array[mid], value) >= 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
};

module.exports = ArrayStrategy = (function() {
  function ArrayStrategy(options) {
    var ref;
    this.options = options;
    this.comparator = this.options.comparator;
    this.data = ((ref = this.options.initialValues) != null ? ref.slice(0) : void 0) || [];
    this.data.sort(this.comparator).reverse();
  }

  ArrayStrategy.prototype.queue = function(value) {
    var pos;
    pos = binarySearchForIndexReversed(this.data, value, this.comparator);
    this.data.splice(pos, 0, value);
    return void 0;
  };

  ArrayStrategy.prototype.dequeue = function() {
    return this.data.pop();
  };

  ArrayStrategy.prototype.peek = function() {
    return this.data[this.data.length - 1];
  };

  ArrayStrategy.prototype.clear = function() {
    this.data.length = 0;
    return void 0;
  };

  return ArrayStrategy;

})();


},{}],4:[function(_dereq_,module,exports){
var BHeapStrategy;

module.exports = BHeapStrategy = (function() {
  function BHeapStrategy(options) {
    var arr, i, j, k, len, ref, ref1, shift, value;
    this.comparator = (options != null ? options.comparator : void 0) || function(a, b) {
      return a - b;
    };
    this.pageSize = (options != null ? options.pageSize : void 0) || 512;
    this.length = 0;
    shift = 0;
    while ((1 << shift) < this.pageSize) {
      shift += 1;
    }
    if (1 << shift !== this.pageSize) {
      throw 'pageSize must be a power of two';
    }
    this._shift = shift;
    this._emptyMemoryPageTemplate = arr = [];
    for (i = j = 0, ref = this.pageSize; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      arr.push(null);
    }
    this._memory = [];
    this._mask = this.pageSize - 1;
    if (options.initialValues) {
      ref1 = options.initialValues;
      for (k = 0, len = ref1.length; k < len; k++) {
        value = ref1[k];
        this.queue(value);
      }
    }
  }

  BHeapStrategy.prototype.queue = function(value) {
    this.length += 1;
    this._write(this.length, value);
    this._bubbleUp(this.length, value);
    return void 0;
  };

  BHeapStrategy.prototype.dequeue = function() {
    var ret, val;
    ret = this._read(1);
    val = this._read(this.length);
    this.length -= 1;
    if (this.length > 0) {
      this._write(1, val);
      this._bubbleDown(1, val);
    }
    return ret;
  };

  BHeapStrategy.prototype.peek = function() {
    return this._read(1);
  };

  BHeapStrategy.prototype.clear = function() {
    this.length = 0;
    this._memory.length = 0;
    return void 0;
  };

  BHeapStrategy.prototype._write = function(index, value) {
    var page;
    page = index >> this._shift;
    while (page >= this._memory.length) {
      this._memory.push(this._emptyMemoryPageTemplate.slice(0));
    }
    return this._memory[page][index & this._mask] = value;
  };

  BHeapStrategy.prototype._read = function(index) {
    return this._memory[index >> this._shift][index & this._mask];
  };

  BHeapStrategy.prototype._bubbleUp = function(index, value) {
    var compare, indexInPage, parentIndex, parentValue;
    compare = this.comparator;
    while (index > 1) {
      indexInPage = index & this._mask;
      if (index < this.pageSize || indexInPage > 3) {
        parentIndex = (index & ~this._mask) | (indexInPage >> 1);
      } else if (indexInPage < 2) {
        parentIndex = (index - this.pageSize) >> this._shift;
        parentIndex += parentIndex & ~(this._mask >> 1);
        parentIndex |= this.pageSize >> 1;
      } else {
        parentIndex = index - 2;
      }
      parentValue = this._read(parentIndex);
      if (compare(parentValue, value) < 0) {
        break;
      }
      this._write(parentIndex, value);
      this._write(index, parentValue);
      index = parentIndex;
    }
    return void 0;
  };

  BHeapStrategy.prototype._bubbleDown = function(index, value) {
    var childIndex1, childIndex2, childValue1, childValue2, compare;
    compare = this.comparator;
    while (index < this.length) {
      if (index > this._mask && !(index & (this._mask - 1))) {
        childIndex1 = childIndex2 = index + 2;
      } else if (index & (this.pageSize >> 1)) {
        childIndex1 = (index & ~this._mask) >> 1;
        childIndex1 |= index & (this._mask >> 1);
        childIndex1 = (childIndex1 + 1) << this._shift;
        childIndex2 = childIndex1 + 1;
      } else {
        childIndex1 = index + (index & this._mask);
        childIndex2 = childIndex1 + 1;
      }
      if (childIndex1 !== childIndex2 && childIndex2 <= this.length) {
        childValue1 = this._read(childIndex1);
        childValue2 = this._read(childIndex2);
        if (compare(childValue1, value) < 0 && compare(childValue1, childValue2) <= 0) {
          this._write(childIndex1, value);
          this._write(index, childValue1);
          index = childIndex1;
        } else if (compare(childValue2, value) < 0) {
          this._write(childIndex2, value);
          this._write(index, childValue2);
          index = childIndex2;
        } else {
          break;
        }
      } else if (childIndex1 <= this.length) {
        childValue1 = this._read(childIndex1);
        if (compare(childValue1, value) < 0) {
          this._write(childIndex1, value);
          this._write(index, childValue1);
          index = childIndex1;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return void 0;
  };

  return BHeapStrategy;

})();


},{}],5:[function(_dereq_,module,exports){
var BinaryHeapStrategy;

module.exports = BinaryHeapStrategy = (function() {
  function BinaryHeapStrategy(options) {
    var ref;
    this.comparator = (options != null ? options.comparator : void 0) || function(a, b) {
      return a - b;
    };
    this.length = 0;
    this.data = ((ref = options.initialValues) != null ? ref.slice(0) : void 0) || [];
    this._heapify();
  }

  BinaryHeapStrategy.prototype._heapify = function() {
    var i, j, ref;
    if (this.data.length > 0) {
      for (i = j = 1, ref = this.data.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
        this._bubbleUp(i);
      }
    }
    return void 0;
  };

  BinaryHeapStrategy.prototype.queue = function(value) {
    this.data.push(value);
    this._bubbleUp(this.data.length - 1);
    return void 0;
  };

  BinaryHeapStrategy.prototype.dequeue = function() {
    var last, ret;
    ret = this.data[0];
    last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._bubbleDown(0);
    }
    return ret;
  };

  BinaryHeapStrategy.prototype.peek = function() {
    return this.data[0];
  };

  BinaryHeapStrategy.prototype.clear = function() {
    this.length = 0;
    this.data.length = 0;
    return void 0;
  };

  BinaryHeapStrategy.prototype._bubbleUp = function(pos) {
    var parent, x;
    while (pos > 0) {
      parent = (pos - 1) >>> 1;
      if (this.comparator(this.data[pos], this.data[parent]) < 0) {
        x = this.data[parent];
        this.data[parent] = this.data[pos];
        this.data[pos] = x;
        pos = parent;
      } else {
        break;
      }
    }
    return void 0;
  };

  BinaryHeapStrategy.prototype._bubbleDown = function(pos) {
    var last, left, minIndex, right, x;
    last = this.data.length - 1;
    while (true) {
      left = (pos << 1) + 1;
      right = left + 1;
      minIndex = pos;
      if (left <= last && this.comparator(this.data[left], this.data[minIndex]) < 0) {
        minIndex = left;
      }
      if (right <= last && this.comparator(this.data[right], this.data[minIndex]) < 0) {
        minIndex = right;
      }
      if (minIndex !== pos) {
        x = this.data[minIndex];
        this.data[minIndex] = this.data[pos];
        this.data[pos] = x;
        pos = minIndex;
      } else {
        break;
      }
    }
    return void 0;
  };

  return BinaryHeapStrategy;

})();


},{}]},{},[1])(1)
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Cell_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Grid__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__A_Star__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Dijkstra__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Draw__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__File__ = __webpack_require__(8);







global.grid = [[]];
global.lastPath = [];
global.drawOrder = [];
global.h = 0;
global.w = 0;
global.lastStart = undefined;
global.lastStop = undefined;
global.start = undefined;
global.goal = undefined;

window.onload = Object(__WEBPACK_IMPORTED_MODULE_1__Grid__["b" /* initGrid */])();

document.getElementById("grid").addEventListener("click", function (e) {
	if (document.getElementById("start").checked == true) {
		if (lastStart !== undefined) {
			if (lastStart.obstacle == false && lastStart.style.backgroundColor == __WEBPACK_IMPORTED_MODULE_4__Draw__["b" /* Color */].start) {
				lastStart.style.backgroundColor = __WEBPACK_IMPORTED_MODULE_4__Draw__["b" /* Color */].clearNode;
				lastStart.style.border = __WEBPACK_IMPORTED_MODULE_4__Draw__["b" /* Color */].nodeBorder;
			}
			Object(__WEBPACK_IMPORTED_MODULE_4__Draw__["e" /* resetPath */])();
		}
		lastStart = e.target;
		lastStart.style.backgroundColor = __WEBPACK_IMPORTED_MODULE_4__Draw__["b" /* Color */].start;
		lastStart.style.border = "none";
		lastStart.obstacle = false;
		for (let i = 0; i < h; i++) {
			for (let j = 0; j < w; j++) {
				if (grid[i][j].el == lastStart) {
					start = grid[i][j];
					start.obstacle = false;
				}
			}
		}
	} else if (document.getElementById("stop").checked == true) {
		if (lastStop !== undefined) {
			if (lastStop.obstacle == false && lastStop.style.backgroundColor == __WEBPACK_IMPORTED_MODULE_4__Draw__["b" /* Color */].goal) {
				lastStop.style.backgroundColor = __WEBPACK_IMPORTED_MODULE_4__Draw__["b" /* Color */].clearNode;
				lastStop.style.border = __WEBPACK_IMPORTED_MODULE_4__Draw__["b" /* Color */].nodeBorder;
			}
			Object(__WEBPACK_IMPORTED_MODULE_4__Draw__["e" /* resetPath */])();
		}
		lastStop = e.target;
		lastStop.style.backgroundColor = __WEBPACK_IMPORTED_MODULE_4__Draw__["b" /* Color */].goal;
		lastStop.style.border = "none";
		lastStop.obstacle = false;
		for (let i = 0; i < h; i++) {
			for (let j = 0; j < w; j++) {
				if (grid[i][j].el == lastStop) {
					goal = grid[i][j];
					goal.obstacle = false;
				}
			}
		}
	} else if (document.getElementById("obst").checked == true) {
		let spot = e.target;
		spot.style.backgroundColor = __WEBPACK_IMPORTED_MODULE_4__Draw__["b" /* Color */].obstacle;
		spot.style.border = "none";
		for (let i = 0; i < h; i++) {
			for (let j = 0; j < w; j++) {
				if (grid[i][j].el == spot && grid[i][j].obstacle == false) {
					grid[i][j].obstacle = true;
					if (grid[i][j] == goal) {
						goal = undefined;
						Object(__WEBPACK_IMPORTED_MODULE_4__Draw__["e" /* resetPath */])();
					} else if (grid[i][j] == start) {
						start = undefined;
						Object(__WEBPACK_IMPORTED_MODULE_4__Draw__["e" /* resetPath */])();
					}
					if (Object(__WEBPACK_IMPORTED_MODULE_4__Draw__["d" /* isOnPath */])(grid[i][j])) {
						Object(__WEBPACK_IMPORTED_MODULE_4__Draw__["e" /* resetPath */])();
						runAlgorithm();
					}
				} else if (grid[i][j].el == spot && grid[i][j].obstacle == true) {
					goal = undefined;
					grid[i][j].obstacle = false;
					grid[i][j].el.style.backgroundColor = __WEBPACK_IMPORTED_MODULE_4__Draw__["b" /* Color */].clearNode;
					grid[i][j].el.style.border = __WEBPACK_IMPORTED_MODULE_4__Draw__["b" /* Color */].nodeBorder;
				}
			}
		}
	}
});

function runAlgorithm() {
	const toastElement = $('.toast').first()[0];
	if (toastElement) toastElement.M_Toast.remove();;
	if (document.getElementById('aStar').checked == true) {
		Object(__WEBPACK_IMPORTED_MODULE_2__A_Star__["a" /* aStar */])(start, goal);
		console.log('A* selected.');
	} else if (document.getElementById('Dijkstra').checked == true) {
		Object(__WEBPACK_IMPORTED_MODULE_3__Dijkstra__["a" /* dijkstra */])(start, goal);
		console.log('Dijkstra selected.');
	}
}

document.getElementById('generatePathBtn').addEventListener('click', runAlgorithm);
document.getElementById('addObstacles').addEventListener('click', __WEBPACK_IMPORTED_MODULE_4__Draw__["f" /* setObstacles */]);
document.getElementById('clearGrid').addEventListener('click', __WEBPACK_IMPORTED_MODULE_1__Grid__["a" /* clearGrid */]);
document.getElementById('saveGrid').addEventListener('click', __WEBPACK_IMPORTED_MODULE_5__File__["b" /* saveGrid */]);
document.getElementById('myFile').addEventListener('change', __WEBPACK_IMPORTED_MODULE_5__File__["a" /* readFile */], false);
document.getElementById('getFile').onclick = function () {
	document.getElementById('myFile').click();
};

window.addEventListener('keyup', (e) => {
	if (e.keyCode == 81 || e.keyCode == 113) {
		if (document.getElementById('start').checked == true) {
			document.getElementById('stop').checked = true;
		} else {
			document.getElementById('start').checked = true;
		}
	}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = aStar;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Cell__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Grid__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Draw__ = __webpack_require__(1);






function aStar(start, goal) {
	if (start == undefined && goal == undefined) {
		__WEBPACK_IMPORTED_MODULE_2__Draw__["a" /* Alert */].both();
	} else if (start == undefined) {
		__WEBPACK_IMPORTED_MODULE_2__Draw__["a" /* Alert */].start();
	} else if (goal == undefined) {
		__WEBPACK_IMPORTED_MODULE_2__Draw__["a" /* Alert */].goal();
	} else {
		if (lastPath.length > 0) {
			Object(__WEBPACK_IMPORTED_MODULE_2__Draw__["e" /* resetPath */])();
			lastPath = [];
			drawOrder = [];
		}

		let closedSet = [];
		let openSet = [];

		start.g = 0;
		start.h = start.heuristic(goal);
		start.f = start.g + start.h;

		// Push the start cell in the open list
		openSet.push(start);

		while (openSet.length > 0) {
			// Get the cell with the lowest score from the open list
			let lowestF = 0;
			for (let i = 0, len = openSet.length; i < len; i++) {
				if (openSet[i].f < openSet[lowestF].f) {
					lowestF = i;
				}
			}
			let q = openSet[lowestF];

			// Check if the goal is reached
			if (Object(__WEBPACK_IMPORTED_MODULE_1__Grid__["c" /* isSameNode */])(q, goal)) {
				let curr = q.parent;
				while (curr.x != start.x || curr.y != start.y) {
					curr.el = grid[curr.x][curr.y].el;
					lastPath.push(curr);
					curr = curr.parent;
				}
				Object(__WEBPACK_IMPORTED_MODULE_2__Draw__["c" /* drawPath */])();
				return;
			}

			// Pop the cell from the open set
			openSet.splice(lowestF, 1);

			// Switch the cell to the closed list
			closedSet.push(q);
			if (!Object(__WEBPACK_IMPORTED_MODULE_1__Grid__["c" /* isSameNode */])(q, start)) {
				q.visited = false;
				drawOrder.push(q);
			}
			// Get the neighbors array of the current cell    
			let neighborsSet = neighbors(q);
			for (let i = 0; i < neighborsSet.length; i++) {
				if (indexOfNode(closedSet, neighborsSet[i]) === -1) {
					var index = indexOfNode(openSet, neighborsSet[i]);
					if (index === -1) {
						neighborsSet[i].f = neighborsSet[i].g + neighborsSet[i].heuristic(goal);
						openSet.push(neighborsSet[i]);
						neighborsSet[i].visited = true;
						if (!Object(__WEBPACK_IMPORTED_MODULE_1__Grid__["c" /* isSameNode */])(neighborsSet[i], start) && !Object(__WEBPACK_IMPORTED_MODULE_1__Grid__["c" /* isSameNode */])(neighborsSet[i], goal))
							drawOrder.push(neighborsSet[i]);
					} else if (neighborsSet[i].g < openSet[index].g) {
						neighborsSet[i].f = neighborsSet[i].g + neighborsSet[i].heuristic(goal);
						openSet[index] = neighborsSet[i];
					}
				}
			}
		}
		return __WEBPACK_IMPORTED_MODULE_2__Draw__["a" /* Alert */].notFound();
	}
}

// Generate the neighbors of the current cell
function neighbors(node) {
	let neighbors = [];
	let i = node.x;
	let j = node.y;
	if (j > 0 && !grid[i][j - 1].obstacle) {
		let newNode = new __WEBPACK_IMPORTED_MODULE_0__Cell__["c" /* default */](i, j - 1, node.el);
		newNode.g = node.g + __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* STRAIGHT_COST */];
		newNode.parent = node;
		neighbors.push(newNode);
	}
	if (j < w - 1 && !grid[i][j + 1].obstacle) {
		let newNode = new __WEBPACK_IMPORTED_MODULE_0__Cell__["c" /* default */](i, j + 1, node.el);
		newNode.g = node.g + __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* STRAIGHT_COST */];
		newNode.parent = node;
		neighbors.push(newNode);
	}

	if (i > 0 && !grid[i - 1][j].obstacle) {
		let newNode = new __WEBPACK_IMPORTED_MODULE_0__Cell__["c" /* default */](i - 1, j, node.el);
		newNode.g = node.g + __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* STRAIGHT_COST */];
		newNode.parent = node;
		neighbors.push(newNode);
	}
	if (i < h - 1 && !grid[i + 1][j].obstacle) {
		let newNode = new __WEBPACK_IMPORTED_MODULE_0__Cell__["c" /* default */](i + 1, j, node.el);
		newNode.g = node.g + __WEBPACK_IMPORTED_MODULE_0__Cell__["a" /* STRAIGHT_COST */];
		newNode.parent = node;
		neighbors.push(newNode);
	}
	return neighbors;
}


function indexOfNode(array, node) {
	for (let i = 0; i < array.length; i++) {
		if (node.x == array[i].x && node.y == array[i].y) {
			return i;
		}
	}
	return -1;
}


// For diagonal movement

// function neighbors(node) {
// 	let neighbors = [];
// 	for(let ii = -1; ii <= 1; ii++) {
// 		for(let jj = -1; jj <= 1; jj++) {
// 			let i = node.x + ii;
// 			let j = node.y + jj;
// 			if(i >= 0 && j >= 0 && i < h && j < w && (i != node.x || j != node.y) && !grid[i][j].obstacle) {
// 				neighbors.push(grid[i][j]);
// 				if((ii == -1 || ii == 1) && (jj == -1 || jj == 1)) {
// 					grid[i][j].g = node.g + 7;  
// 				} else {
// 					grid[i][j].g = node.g + 5;
// 				}
// 				grid[i][j].parent = node;
// 			}
// 		}
// 	}
// 	return neighbors;
// }

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = dijkstra;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Draw__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cell__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__priority_queue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__priority_queue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__priority_queue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Grid__ = __webpack_require__(2);







let diagonalDistance = 2;

function dijkstra(start, goal) {
	if (start == undefined && goal == undefined) {
		__WEBPACK_IMPORTED_MODULE_0__Draw__["a" /* Alert */].both();
	} else if (start == undefined) {
		__WEBPACK_IMPORTED_MODULE_0__Draw__["a" /* Alert */].start();
	} else if (goal == undefined) {
		__WEBPACK_IMPORTED_MODULE_0__Draw__["a" /* Alert */].goal();
	} else {
		let currentNode;
		let tempNode;
		if (lastPath.length > 0) {
			Object(__WEBPACK_IMPORTED_MODULE_0__Draw__["e" /* resetPath */])();
			lastPath = [];
			drawOrder = [];
		}
		goal.visited = false;
		goal.distance = Number.MAX_SAFE_INTEGER;
		start.distance = Number.MAX_SAFE_INTEGER;
		start.visited = false;
		let counter = 0;
		start.distance = 0;
		let queue = new __WEBPACK_IMPORTED_MODULE_2__priority_queue___default.a({
			comparator: (a, b) => a.distance - b.distance
		});
		queue.queue(start);

		while (queue.length > 0) {
			currentNode = queue.dequeue();
			tempNode = new __WEBPACK_IMPORTED_MODULE_1__Cell__["c" /* default */](0, 0, currentNode.el);
			if (!(goal.distance == Number.MAX_SAFE_INTEGER)) {
				let cNode = grid[goal.x][goal.y].parent;
				while (cNode.parent != null) {
					cNode.el = grid[cNode.x][cNode.y].el;
					lastPath.push(cNode);
					cNode = cNode.parent;
				}
				for (let i = 0, len = drawOrder.length; i < len; i++) {
					drawOrder[i].visited = false;
					grid[drawOrder[i].x][drawOrder[i].y].visited = false;
				}
				Object(__WEBPACK_IMPORTED_MODULE_0__Draw__["c" /* drawPath */])();
				return;
			}

			// TOP
			if (currentNode.x - 1 >= 0) {
				tempNode = grid[currentNode.x - 1][currentNode.y];
				if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + __WEBPACK_IMPORTED_MODULE_1__Cell__["a" /* STRAIGHT_COST */]) {
					tempNode.distance = currentNode.distance + __WEBPACK_IMPORTED_MODULE_1__Cell__["a" /* STRAIGHT_COST */];
					tempNode.parent = currentNode;
					if (!Object(__WEBPACK_IMPORTED_MODULE_3__Grid__["c" /* isSameNode */])(tempNode, start) && !Object(__WEBPACK_IMPORTED_MODULE_3__Grid__["c" /* isSameNode */])(tempNode, goal))
						drawOrder.push(tempNode);
					queue.queue(tempNode);
				}
			}

			// LEFT
			if (currentNode.y > 0) {
				tempNode = grid[currentNode.x][currentNode.y - 1];
				if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + __WEBPACK_IMPORTED_MODULE_1__Cell__["a" /* STRAIGHT_COST */]) {
					tempNode.distance = currentNode.distance + __WEBPACK_IMPORTED_MODULE_1__Cell__["a" /* STRAIGHT_COST */];
					tempNode.parent = currentNode;
					if (!Object(__WEBPACK_IMPORTED_MODULE_3__Grid__["c" /* isSameNode */])(tempNode, start) && !Object(__WEBPACK_IMPORTED_MODULE_3__Grid__["c" /* isSameNode */])(tempNode, goal))
						drawOrder.push(tempNode);
					queue.queue(tempNode);
				}
			}

			// RIGHT
			if (currentNode.y + 1 < w) {
				tempNode = grid[currentNode.x][currentNode.y + 1];
				if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + __WEBPACK_IMPORTED_MODULE_1__Cell__["a" /* STRAIGHT_COST */]) {
					tempNode.distance = currentNode.distance + __WEBPACK_IMPORTED_MODULE_1__Cell__["a" /* STRAIGHT_COST */];
					tempNode.parent = currentNode;
					if (!Object(__WEBPACK_IMPORTED_MODULE_3__Grid__["c" /* isSameNode */])(tempNode, start) && !Object(__WEBPACK_IMPORTED_MODULE_3__Grid__["c" /* isSameNode */])(tempNode, goal))
						drawOrder.push(tempNode);
					queue.queue(tempNode);
				}
			}
			// DOWN
			if (currentNode.x + 1 < h) {
				tempNode = grid[currentNode.x + 1][currentNode.y];
				if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + __WEBPACK_IMPORTED_MODULE_1__Cell__["a" /* STRAIGHT_COST */]) {
					tempNode.distance = currentNode.distance + __WEBPACK_IMPORTED_MODULE_1__Cell__["a" /* STRAIGHT_COST */];
					tempNode.parent = currentNode;
					if (!Object(__WEBPACK_IMPORTED_MODULE_3__Grid__["c" /* isSameNode */])(tempNode, start) && !Object(__WEBPACK_IMPORTED_MODULE_3__Grid__["c" /* isSameNode */])(tempNode, goal))
						drawOrder.push(tempNode);
					queue.queue(tempNode);
				}
			}
			// grid[currentNode.x][currentNode.y].visited = true;
			currentNode.visited = true;
		}
		return __WEBPACK_IMPORTED_MODULE_0__Draw__["a" /* Alert */].notFound();
	}
}

// For diagonal movement

// // TOP LEFT
// if (currentNode.y - 1 > 0) {
//     tempNode = grid[currentNode.x - 1][currentNode.y - 1];
//     if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + diagonalDistance) {
//         tempNode.distance = currentNode.distance + diagonalDistance;
//         tempNode.parent = currentNode;
//         queue.queue(tempNode);
//     }
// }

// // TOP RIGHT
// if (currentNode.y + 1 < width) {
//     tempNode = grid[currentNode.x - 1][currentNode.y + 1];
//     if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + diagonalDistance) {
//         tempNode.distance = currentNode.distance + diagonalDistance;
//         tempNode.parent = currentNode;
//         queue.queue(tempNode);
//     }
// }

// // DOWN LEFT
// if (currentNode.y - 1 >= 0) {
//     tempNode = grid[currentNode.x + 1][currentNode.y - 1];
//     if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + diagonalDistance) {
//         tempNode.distance = currentNode.distance + diagonalDistance;
//         tempNode.parent = currentNode;
//         queue.queue(tempNode);
//     }
// }

// // DOWN RIGHT
// if (currentNode.y + 1 < width) {
//     tempNode = grid[currentNode.x + 1][currentNode.y + 1];
//     if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + diagonalDistance) {
//         tempNode.distance = currentNode.distance + diagonalDistance;
//         tempNode.parent = currentNode;
//         queue.queue(tempNode);
//     }
// }


// let visitedCounter = distanceCounter = 0
// for(let i = 0; i < h; i++) {
//     for(let j = 0; j < w; j++) {
//         if(grid[i][j].visited)
//             visitedCounter++;
//         if(grid[i][j].distance != Number.MAX_VALUE)
//             distanceCounter++;
//         }
// }

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = readFile;
/* harmony export (immutable) */ __webpack_exports__["b"] = saveGrid;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Draw__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cell__ = __webpack_require__(0);



function readFile(e) {
	const file = e.target.files[0];
	if (!file) {
		return;
	}
	if (file.type.includes("image")) {
		const img = new Image();
		const url = window.URL || window.webkitURL;
		const src = url.createObjectURL(file);
		img.src = src;
		img.onload = () => {
			draw(img);
		};
	} else {
		const reader = new FileReader();
		reader.onload = (e) => {
			const contents = e.target.result;
			displayContents(contents);
		};
		reader.onerror = (evt) => {
			alert(evt.target.error.name);
		};
		reader.readAsText(file);
	}
}

function displayContents(contents) {
	Object(__WEBPACK_IMPORTED_MODULE_0__Draw__["e" /* resetPath */])();
	const lines = contents.split('\n');
	for (let i = 0; i < lines.length; i++) {
		const currLine = lines[i].split('');
		for (let j = 0; j < currLine.length; j++) {
			if (currLine[j] == '1') {
				grid[i][j].obstacle = true;
				grid[i][j].el.style.backgroundColor = '#808080';
				grid[i][j].el.style.border = "0";
			}
		}
	}
}

function draw(img) {
	const canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.height = img.height;
	canvas.display = 'none';
	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);
	img.style.display = 'none';
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;
	const h = imageData.height;
	const w = imageData.width;
	let arrayLine = [];
	let arrayMatrix = [];
	let delimiter = 0;
	for (let i = 0; i < data.length; i += 4) {
		arrayLine.push({
			"r": data[i],
			"g": data[i + 1],
			"b": data[i + 2],
			"a": data[i + 3]
		});
		delimiter++;
		if (delimiter == w) {
			arrayMatrix.push(arrayLine);
			arrayLine = [];
			delimiter = 0;
		}
	}
	// console.log(arrayMatrix);
	let filteredImage = "";
	for (let i = 0; i < h - __WEBPACK_IMPORTED_MODULE_1__Cell__["b" /* cellSize */] + 1; i += __WEBPACK_IMPORTED_MODULE_1__Cell__["b" /* cellSize */]) {
		for (let j = 0; j < w - __WEBPACK_IMPORTED_MODULE_1__Cell__["b" /* cellSize */] + 1; j += __WEBPACK_IMPORTED_MODULE_1__Cell__["b" /* cellSize */]) {
			let filter = 0;
			for (let n = i; n < i + __WEBPACK_IMPORTED_MODULE_1__Cell__["b" /* cellSize */]; n++) {
				for (let m = j; m < j + __WEBPACK_IMPORTED_MODULE_1__Cell__["b" /* cellSize */]; m++) {
					if (arrayMatrix[n][m].r / 255 <= 0.3 && arrayMatrix[n][m].g / 255 <= 0.3 && arrayMatrix[n][m].b / 255 <= 0.3) {
						filter++;
					}
				}
			}
			if (filter >= __WEBPACK_IMPORTED_MODULE_1__Cell__["b" /* cellSize */] ** 2 / 2) {
				filteredImage += '1'
			} else filteredImage += '0'
		}
		filteredImage += '\n';
	}
	displayContents(filteredImage);
}


function saveGrid() {
	let textToSave = "";
	for (let i = 0; i < h; i++) {
		for (let j = 0; j < w; j++) {
			if (grid[i][j].obstacle == true) textToSave += "1";
			else textToSave += "0";
		}
		textToSave += "\r\n";
	}
	const textToSaveAsBlob = new Blob([textToSave], {
		type: "text/plain"
	});
	const textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
	const fileNameToSaveAs = "savedGrid";
	const downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.href = textToSaveAsURL;
	downloadLink.onclick = destroyClickedElement;
	downloadLink.style.display = "none";
	document.body.appendChild(downloadLink);
	downloadLink.click();
}

function destroyClickedElement(event) {
	document.body.removeChild(event.target);
}

/***/ })
/******/ ]);
import Cell from './Cell'
import { cellSize } from './Cell'
import { Color } from './Draw'

function adjustSize() {
	const exc = document.getElementById("menu").clientHeight;
	const gridZone = document.getElementById("grid");
	let hgt = document.body.clientHeight - exc;
	hgt -= hgt % cellSize;
	hgt += cellSize;
	gridZone.style.height = hgt + "px";
	h = hgt / cellSize;
	w = Math.floor(document.body.clientWidth / cellSize);
}

export function initGrid() {
	adjustSize();
	const target = document.getElementById("grid");
	grid = new Array(h);
	for (let i = 0; i < h; i++) {
		grid[i] = new Array(w);
		for (let j = 0; j < w; j++) {
			const el = document.createElement("div");
			el.className = "cell";
			grid[i][j] = new Cell(i, j, el);
			grid[i][j].el.style.width = cellSize + "px";
			grid[i][j].el.style.height = cellSize + "px";
			target.appendChild(grid[i][j].el);
		}
	}
}

export function clearGrid() {
	for (let i = 0; i < h; i++) {
		for (let j = 0; j < w; j++) {
			grid[i][j].obstacle = false;
			grid[i][j].visited = false;
			grid[i][j].parent = null;
			grid[i][j].distance = Number.MAX_SAFE_INTEGER; 
			grid[i][j].el.style.backgroundColor = Color.clearNode;
			grid[i][j].el.style.border = Color.nodeBorder;
		}
	}
	goal = start = undefined;
	const toastElement = $('.toast').first()[0];
	if (toastElement) toastElement.M_Toast.remove();;
}

export function isSameNode(nodeA, nodeB) {
	return nodeA.x == nodeB.x && nodeA.y == nodeB.y;
}
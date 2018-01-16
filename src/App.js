import Cell, { cellSize } from './Cell.js'
import { initGrid, clearGrid, isSameNode } from './Grid'
import { aStar } from './A_Star'
import { dijkstra } from './Dijkstra'
import { setObstacles, resetPath, Color } from './Draw'
import { readFile, saveGrid } from './File'
import css from '../css/style.css'

global.grid = [[]];
global.lastPath = [];
global.drawOrder = [];
global.h = 0;
global.w = 0;
global.lastStart = undefined;
global.lastStop = undefined;
global.start = undefined;
global.goal = undefined;

window.onload = initGrid();

const gridElement = document.getElementById('grid');

gridElement.addEventListener('click', function (e) {
	if (document.getElementById('start').checked == true) {
		if (lastStart && lastStart.obstacle == false && lastStart.style.backgroundColor == Color.start) {
			lastStart.style.backgroundColor = Color.clearNode;
			lastStart.style.border = Color.nodeBorder;
			resetPath();
		}
		lastStart = e.target;
		if (lastStart != gridElement) {
			lastStart.style.backgroundColor = Color.start;
			lastStart.style.border = "none";
			lastStart.obstacle = false;
			const rect = lastStart.getBoundingClientRect();
			const coords = getCoords(rect.top, rect.left);
			start = grid[coords.x][coords.y];
			start.obstacle = false;
		} else {
			start = undefined;
		}
	} else if (document.getElementById('stop').checked == true) {
		if (lastStop && lastStop.obstacle == false && lastStop.style.backgroundColor == Color.goal) {
			lastStop.style.backgroundColor = Color.clearNode;
			lastStop.style.border = Color.nodeBorder;
			resetPath();
		}
		lastStop = e.target;
		if (lastStop != gridElement) {
			lastStop.style.backgroundColor = Color.goal;
			lastStop.style.border = "none";
			lastStop.obstacle = false;
			const rect = lastStop.getBoundingClientRect();
			const coords = getCoords(rect.top, rect.left);
			goal = grid[coords.x][coords.y];
			goal.obstacle = false;
		} else {
			goal = undefined;
		}
	} else if (document.getElementById("obst").checked == true) {
		let spot = e.target;
		if (spot != gridElement) {
			spot.style.backgroundColor = Color.obstacle;
			spot.style.border = "none";
			const rect = spot.getBoundingClientRect();
			const coords = getCoords(rect.top, rect.left);
			if (grid[coords.x][coords.y].obstacle == false) {
				grid[coords.x][coords.y].obstacle = true;
				if (grid[coords.x][coords.y] == goal) {
					goal = undefined;
					resetPath();
				} else if (grid[coords.x][coords.y] == start) {
					start = undefined;
					resetPath();
				}
			} else if (grid[coords.x][coords.y].obstacle == true) {
				grid[coords.x][coords.y].obstacle = false;
				grid[coords.x][coords.y].el.style.backgroundColor = Color.clearNode;
				grid[coords.x][coords.y].el.style.border = Color.nodeBorder;
			}
		}
	}
});

function runAlgorithm() {
	document.onmousemove = null;
	gridElement.onmouseup = null;
	const toastElement = $('.toast').first()[0];
	if (toastElement) toastElement.M_Toast.remove();;
	if (document.getElementById('aStar').checked == true) {
		aStar(start, goal);
		console.log('A* selected.');
	} else if (document.getElementById('dijkstra').checked == true) {
		dijkstra(start, goal);
		console.log('Dijkstra selected.');
	}
}

document.getElementById('generatePathBtn').addEventListener('click', runAlgorithm);
document.getElementById('addObstacles').addEventListener('click', setObstacles);
document.getElementById('clearGrid').addEventListener('click', clearGrid);
document.getElementById('saveGrid').addEventListener('click', saveGrid);
document.getElementById('myFile').addEventListener('change', readFile, false);
document.getElementById('getFile').onclick = function () {
	document.getElementById('myFile').click();
};

window.addEventListener('keyup', (e) => {
	switch (e.keyCode) {
		case 49 : document.getElementById('start').checked = true; break;
		case 50 : document.getElementById('stop').checked = true; break;
		case 51 : document.getElementById('obst').checked = true; break;
		case 32 : if (!document.getElementById('generatePathBtn').classList.contains('disabled')) runAlgorithm(); break;
		case 81 : if (document.getElementById('aStar').checked == true) 
								document.getElementById('dijkstra').checked = true; 
							else document.getElementById('aStar').checked = true;
	}
});

gridElement.onmousedown = function (e) {
	if (document.getElementById('obst').checked == true) {
		function moveAt(e) {
			const coords = getCoords(e.clientY, e.clientX);
			grid[coords.x][coords.y].el.style.backgroundColor = Color.obstacle;
			grid[coords.x][coords.y].obstacle = true;
			grid[coords.x][coords.y].el.style.border = "none";
			if (start && isSameNode(grid[coords.x][coords.y], start))
				start = undefined;
			if (goal && isSameNode(grid[coords.x][coords.y], goal))
				goal = undefined;
		}

		document.onmousemove = function(e) {
			moveAt(e);
		};

		gridElement.onmouseup = function() {
			document.onmousemove = null;
			gridElement.onmouseup = null;
		};
	}
}

gridElement.ondragstart = function() {
  return false;
};

function getCoords(coordX, coordY) {
  return {
		x: Math.floor(coordX / cellSize),
		y: Math.floor(coordY / cellSize)
	}
}

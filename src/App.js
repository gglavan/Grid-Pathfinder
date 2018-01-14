import Cell, { cellSize } from './Cell.js'
import { initGrid, clearGrid } from './Grid'
import { aStar } from './A_Star'
import { dijkstra } from './Dijkstra'
import { setObstacles, isOnPath, resetPath, Color } from './Draw'
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

document.getElementById("grid").addEventListener("click", function (e) {
	if (document.getElementById("start").checked == true) {
		if (lastStart !== undefined) {
			if (lastStart.obstacle == false && lastStart.style.backgroundColor == Color.start) {
				lastStart.style.backgroundColor = Color.clearNode;
				lastStart.style.border = Color.nodeBorder;
			}
			resetPath();
		}
		lastStart = e.target;
		lastStart.style.backgroundColor = Color.start;
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
			if (lastStop.obstacle == false && lastStop.style.backgroundColor == Color.goal) {
				lastStop.style.backgroundColor = Color.clearNode;
				lastStop.style.border = Color.nodeBorder;
			}
			resetPath();
		}
		lastStop = e.target;
		lastStop.style.backgroundColor = Color.goal;
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
		spot.style.backgroundColor = Color.obstacle;
		spot.style.border = "none";
		for (let i = 0; i < h; i++) {
			for (let j = 0; j < w; j++) {
				if (grid[i][j].el == spot && grid[i][j].obstacle == false) {
					grid[i][j].obstacle = true;
					if (grid[i][j] == goal) {
						goal = undefined;
						resetPath();
					} else if (grid[i][j] == start) {
						start = undefined;
						resetPath();
					}
					if (isOnPath(grid[i][j])) {
						resetPath();
						runAlgorithm();
					}
				} else if (grid[i][j].el == spot && grid[i][j].obstacle == true) {
					goal = undefined;
					grid[i][j].obstacle = false;
					grid[i][j].el.style.backgroundColor = Color.clearNode;
					grid[i][j].el.style.border = Color.nodeBorder;
				}
			}
		}
	}
});

function runAlgorithm() {
	const toastElement = $('.toast').first()[0];
	if (toastElement) toastElement.M_Toast.remove();;
	if (document.getElementById('aStar').checked == true) {
		aStar(start, goal);
		console.log('A* selected.');
	} else if (document.getElementById('Dijkstra').checked == true) {
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
	if (e.keyCode == 81 || e.keyCode == 113) {
		if (document.getElementById('start').checked == true) {
			document.getElementById('stop').checked = true;
		} else {
			document.getElementById('start').checked = true;
		}
	}
});
import Cell, { cellSize } from './Cell.js'
import {initGrid, resetPath, clearGrid} from './Grid'
import {aStar} from './A_Star'
import {dijkstra} from './Dijkstra'
import {setObstacles, isOnPath} from './Draw'
import {readFile, saveGrid} from './File'

global.grid = [[]];
global.lastPath = [];
global.h = 0;
global.w = 0;
global.pos = undefined;
global.int = undefined;
global.lastStart = undefined; 
global.lastStop = undefined;
global.start = undefined;
global.goal = undefined;

window.onload = initGrid();

document.getElementById("grid").addEventListener("click",function(e){
	if(document.getElementById("start").checked == true){
		if(lastStart !== undefined) {
			if(lastStart.obstacle == false && lastStart.style.backgroundColor == "rgb(147, 202, 59)") {
				lastStart.style.backgroundColor = "white";
				lastStart.style.border = "1px solid #E6E6E6";
			}
			resetPath();
		}
		lastStart = e.target;
		lastStart.style.backgroundColor = "#93CA3B";
		lastStart.style.border = "0";
		for(let i = 0; i < h; i++) {
			for(let j = 0; j < w; j++) {
				if(grid[i][j].el == lastStart){
					start = grid[i][j];
					start.obstacle = false;
					lastStart.obstacle = false;                
				}
			}
		}
	} else if(document.getElementById("stop").checked == true){
		if(lastStop !== undefined) {
			if(lastStop.obstacle == false && lastStop.style.backgroundColor == "rgb(235, 73, 96)") {
				lastStop.style.backgroundColor = "white";
				lastStop.style.border = "1px solid #E6E6E6";      
			}
			resetPath();
		} 
		lastStop = e.target;
		lastStop.style.backgroundColor = "#EB4960";
		lastStop.style.border = "0";
		lastStop.obstacle = false;
		for(let i = 0; i < h; i++) {
			for(let j = 0; j < w; j++) {
				if(grid[i][j].el == lastStop){
					goal = grid[i][j];
					goal.obstacle = false;
				}
			}
		}
	} else if(document.getElementById("obst").checked == true) {
		let spot = e.target;
		spot.style.backgroundColor = "#808080";
		spot.style.border = "0";
		for(let i = 0; i < h; i++) {
			for(let j = 0; j < w; j++) {
				if(grid[i][j].el == spot && grid[i][j].obstacle == false){
					grid[i][j].obstacle = true;
					if(grid[i][j] == goal) {
						goal = undefined;
						resetPath();
					}else if(grid[i][j] == start) {
						start = undefined;
						resetPath();
					}
					if(isOnPath(grid[i][j])) {
						resetPath();
						aStar(start, goal);
					}
				} else if(grid[i][j].el == spot && grid[i][j].obstacle == true){
					goal = undefined;
					grid[i][j].obstacle = false;
					grid[i][j].el.style.backgroundColor = "white";
					grid[i][j].el.style.border = "1px solid #E6E6E6";
				}
			}
		}
	}
});

function runAlgorithm(){
	if(document.getElementById('aStar').checked == true) {
		aStar(start, goal);
		console.log('A* selected.');
	} else if(document.getElementById('Dijkstra').checked == true) {
		dijkstra(start, goal);
		console.log('Dijkstra selected.');
	}
}

document.getElementById('generatePathBtn').addEventListener('click', runAlgorithm);
document.getElementById('addObstacles').addEventListener('click', setObstacles);
document.getElementById('clearGrid').addEventListener('click', clearGrid);
document.getElementById('saveGrid').addEventListener('click', saveGrid);
document.getElementById('myFile').addEventListener('change', readFile, false);
document.getElementById('getFile').onclick = function() {
    document.getElementById('myFile').click();
};



// $('#grid').on('mousedown mouseup', function mouseState(e) {
//     if (e.type == "mousedown") {
// 		document.getElementById('grid').addEventListener('mouseover',(e) => {
// 			let x = Math.floor(e.clientX / cellSize);
// 			let y = Math.floor(e.clientY / cellSize); 
// 			drawCell(y,x);
// 			if(e.type == "mouseup") {
// 				alert("realeased")
// 			}
// 		});			
// 	}
		
					// if(grid[i][j] == goal) {
					// 	goal = undefined;
					// 	resetPath();
					// }else if(grid[i][j] == start) {
					// 	start = undefined;
					// 	resetPath();
					// }
		// if(e.type == 'mousedown') {
			// document.getElementById('grid').removeEventListener('mouseover', mouseState, true)
		// 	console.log("asdas");
		// }
// });


window.addEventListener('keyup',(e)=>{
	if(e.keyCode == 81 || e.keyCode == 113) {
		if(document.getElementById('start').checked == true) {
			document.getElementById('stop').checked = true;
		} else {
			document.getElementById('start').checked = true;
		}
	}
});

function drawCell(x, y) {
	grid[x][y].el.style.backgroundColor = "black";
}




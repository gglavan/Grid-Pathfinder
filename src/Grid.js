import Cell from './Cell'
import {cellSize} from './Cell'

function adjustSize() {
	const exc = document.getElementById("menu").clientHeight;
	const gridZone = document.getElementById("grid");
	let hgt = document.body.clientHeight - exc;
	hgt -=	hgt % cellSize;
    hgt += cellSize;
    gridZone.style.height =	hgt + "px";
	h = hgt / cellSize;
    w = Math.floor((document.body.clientWidth)/ cellSize); 
}

export function initGrid() {
    adjustSize();
    const target = document.getElementById("grid");
    grid = new Array(h);
    for(let i = 0; i < h; i++) {
        grid[i] = new Array(w);
        for(let j = 0; j < w; j++) {
            const el = document.createElement("div");
            el.className = "cell";
            grid[i][j] = new Cell(i,j,el);
            grid[i][j].el.style.width = cellSize + "px";
            grid[i][j].el.style.height = cellSize + "px";
            target.appendChild(grid[i][j].el);
        }
    }
}

export function resetPath() {
    for(let i = 0; i < lastPath.length; i++) {
        if(lastPath[i].el.style.backgroundColor == "rgb(206, 235, 251)") {
            lastPath[i].el.style.backgroundColor = "white";
            lastPath[i].el.style.border = "1px solid #E6E6E6";
        } 
    }
}

export function clearGrid() {
    for(let i = 0; i < h; i++) {
        for(let j = 0; j < w; j++) {
            grid[i][j].obstacle = false;
            grid[i][j].el.style.backgroundColor = "white";
            grid[i][j].el.style.border = "1px solid #E6E6E6";
            goal = start = undefined;
        }
    }

}
import { isSameNode } from './Grid'

// Colors container
export const Color = {
	openNode: "rgb(224, 242, 241)",
	closedNode: "rgb(128, 203, 196)",
	path: "rgb(179, 229, 252)",
	obstacle: "rgb(128, 128, 128)",
	start: "rgb(147, 202, 59)",
	goal: "rgb(235, 73, 96)",
	clearNode: "rgb(255, 255, 255)",
	nodeBorder: "1px solid rgb(230, 230, 230)"
}

// Watch for the initial setup
export const Alert = {
	start: () => Materialize.toast('Please set the initial spot!', 1500, 'red darken-1'),
	goal: () => Materialize.toast('Please set the finish spot!', 1500, 'red darken-1'),
	both: () => Materialize.toast('Please set the initial spots!', 1500, 'red darken-1'),
	notFound: () => Materialize.toast('Path not found!', 1500, 'red darken-1')
}

// Async function to draw the path
export async function drawPath (drawOrder, lastPath) {
    if (lastPath.length) {
        for (let i = 0, len = drawOrder.length; i < len; i++) {
			grid[drawOrder[i].x][drawOrder[i].y].el.style.backgroundColor = drawOrder[i].opened ? Color.closedNode : Color.openNode;
			await sleep(5);
        }
        for(let i = lastPath.length - 1; i >= 0; i--) {
            lastPath[i].el.style.backgroundColor = Color.path;
		    lastPath[i].el.style.border = "none";
            await sleep(5);
        }
    }
}

// Reset the path
export function resetPath() {
    for (let i = 0; i < lastPath.length; i++) {
        if (lastPath[i].el.style.backgroundColor == Color.path) {
            lastPath[i].el.style.backgroundColor = Color.clearNode;
            lastPath[i].el.style.border = Color.nodeBorder;
        } 
	}
	for (let i = 0; i < drawOrder.length; i++) {
		if (grid[drawOrder[i].x][drawOrder[i].y].el.style.backgroundColor == Color.openNode || 
			grid[drawOrder[i].x][drawOrder[i].y].el.style.backgroundColor === Color.closedNode)
				grid[drawOrder[i].x][drawOrder[i].y].el.style.backgroundColor = Color.clearNode;
    }
}

// Implemented artificial sleep for async to work
function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate the desired amount of obstacles
export function setObstacles() {
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
export function isOnPath(curr) {
	for (let i = 0, len = lastPath.length; i < len; i++) {
		if (isSameNode(lastPath[i], curr))
			return true;
	}
	return false;
}

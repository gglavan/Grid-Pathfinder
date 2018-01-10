import { resetPath } from './Grid'
import { drawPath } from './Draw'
import { Alert } from './Draw'
import PriorityQueue from './priority-queue'


export function aStar(start, goal) {
    if (start == undefined && goal == undefined) {
        Alert.both();
    } else if (start == undefined) {
        Alert.start();
    } else if (goal == undefined) {
        Alert.goal();
    } else {
        if (lastPath.length > 0) {
            resetPath();
            lastPath = [];
        }
            
        start.g = 0;
        start.h = start.heuristic(goal);
        start.f = start.g + start.h;
        
        //Push the start cell in the open list
        var queue = new PriorityQueue({ comparator: function(a,  b) {return a.f - b.f}});
        console.log("Queue")
        queue.queue(start);
        
        while(queue.length > 0) {
            let q = queue.dequeue();
            //Check if the goal is reached
            if(q.x == goal.x && q.y == goal.y) {
                let curr = q.parent;
                while(curr.x != start.x || curr.y != start.y){
                    curr.el = grid[curr.x][curr.y].el;
                    lastPath.push(curr);
                    curr = curr.parent;
                }
                int = setInterval(drawPath, 5);
                console.log(lastPath);
                console.log("WTF")
                return;
            }

            //Switch the cell to the closed list
            q.visited = true;
            
            //Get the neighbors array of the current cell    
            let neighborsSet = neighbors(q);
            for(let i = 0; i < neighborsSet.length; i++) {
                let openNeighbor;
                if(!neighborsSet[i].visited) {
                    neighborsSet[i].h = neighborsSet[i].heuristic(goal);
                    neighborsSet[i].f = neighborsSet[i].g + neighborsSet[i].h;
                    let isOpen = false;
                    openSet.forEach((cell) => {
                        if(cell.x == neighborsSet[i].x && cell.y == neighborsSet[i].y) {
                            isOpen = true;
                            openNeighbor = cell;
                        }
                    });
                    if(isOpen == false) {
                        // openSet.push(JSON.parse(JSON.stringify(neighborsSet[i])));
                        queue.queue(neighborsSet[i])                   
                    } else if(neighborsSet[i].g < openNeighbor.g) {
                        openNeighbor.g = neighborsSet[i].g;
                        openNeighbor.parent = neighborsSet[i].parent;
                    }
                } 
            } 
        }
    return Alert.notFound();
    }
}
    
//Generate the neighbors of the current cell
function neighbors(node) {
	let neighbors = [];
    let i = node.x;
    let j = node.y;
    if (j > 0 && !grid[i][j - 1].obstacle) {
        neighbors.push(grid[i][j - 1])
        grid[i][j - 1].g = node.g + 5;
        grid[i][j - 1].parent = node;
    }
    if (j < w - 1 && !grid[i][j + 1].obstacle) {
        neighbors.push(grid[i][j + 1])
        grid[i][j + 1].g = node.g + 5;
        grid[i][j + 1].parent = node;
    }
    
    if (i > 0 && !grid[i - 1][j].obstacle) {
        neighbors.push(grid[i - 1][j]);
        grid[i - 1][j].g = node.g + 5;
        grid[i - 1][j].parent = node;
    }
    if (i < h - 1 && !grid[i + 1][j].obstacle) {
        neighbors.push(grid[i + 1][j]);
        grid[i + 1][j].g = node.g + 5;
        grid[i + 1][j].parent = node;
    }     
	return neighbors;
}





//In case

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
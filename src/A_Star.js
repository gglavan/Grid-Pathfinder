import Cell from './Cell'
import { STRAIGHT_COST } from './Cell'
import { resetPath } from './Grid'
import { drawPath } from './Draw'
import { Alert } from './Draw'
import PriorityQueue from './priority-queue'

export function aStar (start, goal) {
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
        let counter = 0;
    
        let closedSet = [];
        let openSet = [];
    
        start.g = 0;
        start.h = start.heuristic(goal);
        start.f = start.g + start.h;
        
        //Push the start cell in the open list
        openSet.push(start);
        
        while(openSet.length > 0) {
            // Get the cell with the lowest score from the open list
            let lowestF = 0;
            for (let i = 0, len = openSet.length; i < len; i++) {
                if (openSet[i].f < openSet[lowestF].f) {
                    lowestF = i;
                }
            }
            let q = openSet[lowestF];
            //Check if the goal is reached
            if(q.x == goal.x && q.y == goal.y) {
                let curr = q.parent;
                while(curr.x != start.x || curr.y != start.y){
                    curr.el = grid[curr.x][curr.y].el;
                    lastPath.push(curr);
                    curr = curr.parent;
                }
                drawPath(drawOrder, lastPath);
                console.log("Min path length: " + lastPath.length);
                console.log("Counter: " + counter);
                console.log("openSet length: " + openSet.length)
                console.log("closedSet length: " + closedSet.length)

                return;
            }
            
            openSet.splice(lowestF, 1);

            //Switch the cell to the closed list
            closedSet.push(q);
            q.opened = false;
            drawOrder.push(q);
            
            //Get the neighbors array of the current cell    
            let neighborsSet = neighbors(q);
            for(let i = 0; i < neighborsSet.length; i++) {
                if (indexOfNode(closedSet, neighborsSet[i]) === -1) {
                    var index = indexOfNode(openSet, neighborsSet[i]);
                    if (index === -1) {
                        neighborsSet[i].f = neighborsSet[i].g + neighborsSet[i].heuristic(goal);
                        openSet.push(neighborsSet[i]);
                        neighborsSet[i].opened = true;
                        drawOrder.push(neighborsSet[i])
                    } else if (neighborsSet[i].g < openSet[index].g) {
                        neighborsSet[i].f = neighborsSet[i].g + neighborsSet[i].heuristic(goal);
                        openSet[index] = neighborsSet[i];
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
        let newNode = new Cell(i, j - 1, node.el);
        newNode.g = node.g + STRAIGHT_COST;
        newNode.parent = node;
        neighbors.push(newNode);
    }
    if (j < w - 1 && !grid[i][j + 1].obstacle) {
        let newNode = new Cell(i, j + 1, node.el);
        newNode.g = node.g + STRAIGHT_COST;
        newNode.parent = node;
        neighbors.push(newNode);
    }
    
    if (i > 0 && !grid[i - 1][j].obstacle) {
        let newNode = new Cell(i - 1, j, node.el);
        newNode.g = node.g + STRAIGHT_COST;
        newNode.parent = node;
        neighbors.push(newNode);
    }
    if (i < h - 1 && !grid[i + 1][j].obstacle) {
        let newNode = new Cell(i + 1, j, node.el);
        newNode.g = node.g + STRAIGHT_COST;
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



  
  
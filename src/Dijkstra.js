import { drawPath, resetPath } from './Draw'
import { Alert } from './Draw'
import Cell from './Cell'
import PriorityQueue from './priority-queue'
import { STRAIGHT_COST } from './Cell'
import { isSameNode } from './Grid';

let diagonalDistance = 2;

export function dijkstra (start, goal) {
    if (start == undefined && goal == undefined) {
        Alert.both();
    } else if (start == undefined) {
        Alert.start();
    } else if (goal == undefined) {
        Alert.goal();
    } else {
        let currentNode;
        let tempNode;
        if (lastPath.length > 0) {
            resetPath();
            lastPath = [];
            drawOrder = [];  
        }
        goal.visited = false;
	    goal.distance = Number.MAX_SAFE_INTEGER;
	    start.distance = Number.MAX_SAFE_INTEGER;
        start.visited = false;
        console.log("NOW")
        console.log(start, goal)
        let counter = 0;
        start.distance = 0;
        let queue = new PriorityQueue({ comparator: (a, b) => a.distance - b.distance});
        queue.queue(start);
        
        while (queue.length > 0) {
            currentNode = queue.dequeue();
            tempNode = new Cell(0, 0, currentNode.el);
            if (!(goal.distance == Number.MAX_SAFE_INTEGER)) {
                let cNode = grid[goal.x][goal.y].parent;
                while (cNode.parent != null) {
                    cNode.el = grid[cNode.x][cNode.y].el;
                    lastPath.push(cNode);
                    cNode = cNode.parent;
                }
                console.log("Min path length: " + lastPath.length);
                console.log(drawOrder);
                for (let i = 0, len = drawOrder.length; i < len; i++) {
                    drawOrder[i].visited = false;
                    grid[drawOrder[i].x][drawOrder[i].y].visited = false;
                }
                drawPath();
                return;
            }

            // TOP
            if (currentNode.x - 1 >= 0) {
                tempNode = grid[currentNode.x-1][currentNode.y];
                if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + STRAIGHT_COST) {
                    tempNode.distance = currentNode.distance + STRAIGHT_COST;
                    tempNode.parent = currentNode;
                    if(!isSameNode(tempNode, start) && !isSameNode(tempNode, goal))
                        drawOrder.push(tempNode);
                    queue.queue(tempNode);
                }
            }

            // LEFT
            if (currentNode.y > 0) {
                tempNode = grid[currentNode.x][currentNode.y - 1];
                if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + STRAIGHT_COST) {
                    tempNode.distance = currentNode.distance + STRAIGHT_COST;
                    tempNode.parent = currentNode;
                    if(!isSameNode(tempNode, start) && !isSameNode(tempNode, goal))
                        drawOrder.push(tempNode);
                    queue.queue(tempNode);
                }
            }

            // RIGHT
            if (currentNode.y + 1 < w) {
                tempNode = grid[currentNode.x][currentNode.y + 1];
                if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + STRAIGHT_COST) {
                    tempNode.distance = currentNode.distance + STRAIGHT_COST;
                    tempNode.parent = currentNode;
                    if(!isSameNode(tempNode, start) && !isSameNode(tempNode, goal))
                        drawOrder.push(tempNode);
                    queue.queue(tempNode);
                }
            }
            // DOWN
            if (currentNode.x + 1 < h) {
                tempNode = grid[currentNode.x + 1][currentNode.y];
                if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + STRAIGHT_COST) {
                    tempNode.distance = currentNode.distance + STRAIGHT_COST;
                    tempNode.parent = currentNode;
                    if(!isSameNode(tempNode, start) && !isSameNode(tempNode, goal))
                        drawOrder.push(tempNode);
                    queue.queue(tempNode);
                }
            }
            // grid[currentNode.x][currentNode.y].visited = true;
            currentNode.visited = true;
        }
        return Alert.notFound();
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
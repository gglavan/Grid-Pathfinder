import {resetPath} from './Grid'
import {drawPath} from './Draw'
import {Alert} from './Draw'
import Cell from './Cell.js'
import PriorityQueue from './priority-queue'

let horizontalVerticalDistance = 1;
let diagonalDistance = 2;

export function dijkstra(start, goal) {
    let iteration = 0;
    if (start == undefined && goal == undefined) {
        Alert.both();
    } else if (start == undefined) {
        Alert.start();
    } else if (goal == undefined) {
        Alert.goal();
    } else {
        let currentNode;
        let tempNode;

        if(lastPath.length > 0) {
            resetPath();
            lastPath = []; 
        }

        start.distance = 0;

        var queue = new PriorityQueue({ comparator: function(a,  b) {return a.distance - b.distance}});
        queue.queue(start);

        while(queue.length > 0){
            currentNode = queue.dequeue();
            tempNode = new Cell(0,0,currentNode.el);

          // TOP
          if(currentNode.x - 1 >= 0){
              tempNode = grid[currentNode.x-1][currentNode.y];
              if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + horizontalVerticalDistance) {
                  tempNode.distance = currentNode.distance + horizontalVerticalDistance;
                  tempNode.parent = currentNode;
                  queue.queue(tempNode);
                }

                // // TOP LEFT
                // if (currentNode.y - 1 > 0) {
                //     tempNode = grid[currentNode.x - 1][currentNode.y - 1];
                //     if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + diagonalDistance) {
                //         tempNode.distance = currentNode.distance + diagonalDistance;
                //         tempNode.parent = currentNode;
                //         queue.queue(tempNode);
                //     }
                // }
                //
                // // TOP RIGHT
                // if (currentNode.y + 1 < width) {
                //     tempNode = grid[currentNode.x - 1][currentNode.y + 1];
                //     if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + diagonalDistance) {
                //         tempNode.distance = currentNode.distance + diagonalDistance;
                //         tempNode.parent = currentNode;
                //         queue.queue(tempNode);
                //     }
                // }
            }

            // LEFT
            // delete -1
            if (currentNode.y > 0) {
                  tempNode = grid[currentNode.x][currentNode.y - 1];
                  if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + horizontalVerticalDistance) {
                      tempNode.distance = currentNode.distance + horizontalVerticalDistance;
                      tempNode.parent = currentNode;
                      queue.queue(tempNode);
                    }
            }
            // RIGHT
            if (currentNode.y + 1 < w) {
                tempNode = grid[currentNode.x][currentNode.y + 1];
                if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + horizontalVerticalDistance) {
                    tempNode.distance = currentNode.distance + horizontalVerticalDistance;
                    tempNode.parent = currentNode;
                    queue.queue(tempNode);
                }
            }
            // DOWN
            if (currentNode.x + 1 < h) {
                tempNode = grid[currentNode.x + 1][currentNode.y];
                if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + horizontalVerticalDistance) {
                    tempNode.distance = currentNode.distance + horizontalVerticalDistance;
                    tempNode.parent = currentNode;
                    queue.queue(tempNode);
                }
                // // DOWN LEFT
                // if (currentNode.y - 1 >= 0) {
                //     tempNode = grid[currentNode.x + 1][currentNode.y - 1];
                //     if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + diagonalDistance) {
                //         tempNode.distance = currentNode.distance + diagonalDistance;
                //         tempNode.parent = currentNode;
                //         queue.queue(tempNode);
                //     }
                // }
                //
                // // DOWN RIGHT
                // if (currentNode.y + 1 < width) {
                //     tempNode = grid[currentNode.x + 1][currentNode.y + 1];
                //     if (!tempNode.visited && !tempNode.obstacle && tempNode.distance > currentNode.distance + diagonalDistance) {
                //         tempNode.distance = currentNode.distance + diagonalDistance;
                //         tempNode.parent = currentNode;
                //         queue.queue(tempNode);
                //     }
                // }
            }
            currentNode.visited = true;
          }

          // CHECK IF PATH EXISTS
          if(!(grid[goal.x][goal.y].distance == Number.MAX_VALUE)){
              let cNode = grid[goal.x][goal.y].parent;
              while(cNode.parent != null) {
                  cNode.el = grid[cNode.x][cNode.y].el;
                  lastPath.push(cNode);
                  cNode = cNode.parent;
              }
              int = setInterval(drawPath, 5);
              console.log(lastPath);
              return;
          } else {
              return Alert.notFound();
          }
     }
}

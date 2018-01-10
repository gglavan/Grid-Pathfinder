export default class Cell {
	constructor(x, y, el) {
		this.x = x;
		this.y = y;
		this.g = 0;
		this.h = 0;
		this.f = 0;
		this.distance = Number.MAX_VALUE;
		this.obstacle = false;
		this.visited = false;
		this.el = el;
		this.parent;
	}
	heuristic(goal) {
		const dx = Math.abs(this.x - goal.x);
		const dy = Math.abs(this.y - goal.y);
		return 5 * (dx + dy);
		// const dx2 = start.x - goal.x
		// const dy2 = start.y - goal.y
		// const cross = Math.abs(dx*dy2 - dx2*dy)
		// return 5 * (dx + dy) + cross * 0.001;
		// return 5 * (dx + dy) + (7 - 2 * 5) * Math.min(dx, dy);
		
	}
}

export const cellSize = 20;
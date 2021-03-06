export default class Cell {
	constructor(x, y, el) {
		this.x = x;
		this.y = y;
		this.g = 0;
		this.h = 0;
		this.f = 0;
		this.distance = Number.MAX_SAFE_INTEGER;
		this.obstacle = false;
		this.visited = false;
		this.el = el;
		this.parent = null;
	}
	heuristic(goal) {
		const dx = Math.abs(this.x - goal.x);
		const dy = Math.abs(this.y - goal.y);
		// return dx + dy;
		const dx2 = start.x - goal.x
		const dy2 = start.y - goal.y
		const cross = Math.abs(dx * dy2 - dx2 * dy)
		return (dx + dy) + cross * 0.001;
		// return 5 * (dx + dy) + (7 - 2 * 5) * Math.min(dx, dy);
	}
}

export const cellSize = 20;
export const STRAIGHT_COST = 1;
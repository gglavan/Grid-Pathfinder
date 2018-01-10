export function drawPath() {
	if(pos == undefined) pos = lastPath.length - 1;
	if(pos >= 0){
		lastPath[pos].el.style.backgroundColor = "#CEEBFB";
		lastPath[pos].el.style.border = "0";
		pos--;
	} else {
		clearInterval(int);
		pos = undefined;
	}
}
//Set obstacles
export function setObstacles() {
	const obst = 1500;
	let arr = [];
	let i = 0;
	for(let i = 0; i < h; i++) {
		for(let j = 0; j < w; j++) {
			grid[i][j].obstacle = false;
			grid[i][j].el.style.backgroundColor = "white";
			grid[i][j].el.style.border = "1px solid #E6E6E6";
			arr.push(grid[i][j]);
		}
	}
	while(i < obst) {
		let rand = Math.floor(Math.random(arr.length) * arr.length);
		arr[rand].obstacle = true;
		arr[rand].el.style.backgroundColor = "#808080";
		arr[rand].el.style.border = "0";
		arr.splice(rand, 1);
		i++;
	}
}
//Check if the obstacle is on path
export function isOnPath(curr) {
	let isOn = false;
	lastPath.forEach((cell) => {
		if(cell.x == curr.x && cell.y == curr.y) {
			isOn = true; 
			return isOn;
		}
	});
	return isOn;
}
//Watch for the initial setup
export const Alert = {
	start: () => Materialize.toast('Please set the initial spot!', 1500, 'red darken-1'),
	goal: () => Materialize.toast('Please set the finish spot!', 1500, 'red darken-1'),
	both: () => Materialize.toast('Please set the initial spots!', 1500, 'red darken-1'),
	notFound: () => Materialize.toast('Path not found!', 1500, 'red darken-1')
}

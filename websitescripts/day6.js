const inputElementd6 = document.getElementById("inputd6.1");
const outputElementd6p1 = document.getElementById("outd6.1");
const outputElementd6p2 = document.getElementById("outd6.2");

inputElementd6.addEventListener("change", eventListenerDay6, false);
function eventListenerDay6() {
	let reader = new FileReader();
	reader.onload = function () {
		const arr = reader.result.split(/\r?\n/);
		outputElementd6p1.textContent = solverd6p1(arr);
		outputElementd6p2.textContent = solverd6p2(arr);
	}
	reader.readAsText(this.files[0]);
}
/*****************************************************************************/


const numlistreg = /[\d+\s+]+/;
function findNumberOfBetterDistances(allowedTime, bestDistance) {
    function d(speed) {
        return speed * allowedTime - speed * speed;
    }
    let low = 0;
    let high = Math.floor(allowedTime / 2);
    if (high * (allowedTime - high) < bestDistance) {
        return 0;
    }
    while (low + 1 < high) {
        let middle = Math.floor((low + high) / 2);
        if (d(middle) >= bestDistance) {
            high = middle;
        }
        else {
            low = middle;
        }
    }
    const end = (allowedTime / 2) + (allowedTime / 2 - high);
    return end - high + 1;
}
function solverd6p1(lines) {
    const times = lines[0].match(numlistreg).pop().trim().split(/\s+/).map((x) => Number(x));
    const bestdistances = lines[1].match(numlistreg).pop().trim().split(/\s+/).map((x) => Number(x));
    const nums = [];
    for (let i = 0; i < times.length; i++) {
        nums.push(findNumberOfBetterDistances(times[i], bestdistances[i]));
    }
    return nums.reduce((acc, next) => acc * next, 1);
}
function solverd6p2(lines) {
    const time = Number(lines[0].match(numlistreg).pop().trim().replace(/\s+/g, ''));
    const bestdistance = Number(lines[1].match(numlistreg).pop().trim().replace(/\s+/g, ''));
    return findNumberOfBetterDistances(time, bestdistance);
}
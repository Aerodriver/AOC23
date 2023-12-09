const inputElementd4 = document.getElementById("inputd4.1");
const outputElementd4p1 = document.getElementById("outd4.1");
const outputElementd4p2 = document.getElementById("outd4.2");

inputElementd4.addEventListener("change", eventListenerDay4, false);
function eventListenerDay4() {
	let reader = new FileReader();
	reader.onload = function () {
		const arr = reader.result.split(/\r?\n/);
		outputElementd9p1.textContent = solverd4p1(arr);
		outputElementd9p2.textContent = solverd4p2(arr);
	}
	reader.readAsText(this.files[0]);
}
/*****************************************************************************/

function numberOfWinningNumbers(line) {
	var _a;
	const reg = /(?<winnums>(\d+|\s)+)\|(?<mynums>(\d+|\s)+)/;
	const numreg = /\d+/g;
	let groups = (_a = line.match(reg)) === null || _a === void 0 ? void 0 : _a.groups;
	if (groups) {
		const win = new Set([...groups["winnums"].matchAll(numreg)].map((e) => Number(e)));
		const my = new Set([...groups["mynums"].matchAll(numreg)].map((e) => Number(e)));
		return (([...win].filter(x => my.has(x)).length));
	}
	return 0;
}
function solverd4p1(lines) {
	const pointCalc = (num) => num > 0 ? Math.pow(2, num - 1) : 0;
	const points = [];
	for (let line of lines) {
		points.push(numberOfWinningNumbers(line));
	}
	return points.reduce((acc, curr) => acc + pointCalc(curr), 0);
}
function solverd4p2(lines) {
	const card_repeat = new Map();
	for (let e of lines.entries()) {
		if (!card_repeat.has(e[0])) {
			card_repeat.set(e[0], 1);
		}
		const how_often_to_count_card = card_repeat.get(e[0]);
		const numofwinnum = numberOfWinningNumbers(e[1]);
		for (let i of [...Array(numofwinnum).keys()]) {
			if (card_repeat.has(e[0] + i + 1)) {
				card_repeat.set(e[0] + i + 1, card_repeat.get(e[0] + i + 1) + how_often_to_count_card);
			}
			else {
				card_repeat.set(e[0] + i + 1, how_often_to_count_card + 1);
			}
		}
	}
	return [...card_repeat.values()].reduce((a, b) => a + b);
}
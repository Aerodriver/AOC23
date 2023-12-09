const inputElementd3 = document.getElementById("inputd3.1");
const outputElementd3p1 = document.getElementById("outd3.1");
const outputElementd3p2 = document.getElementById("outd3.2");

inputElementd3.addEventListener("change", eventListenerDay3, false);
function eventListenerDay3() {
	let reader = new FileReader();
	reader.onload = function () {
		const arr = reader.result.split(/\r?\n/);
		outputElementd3p1.textContent = solverd3p1(arr);
		outputElementd3p2.textContent = solverd3p2(arr);
	}
	reader.readAsText(this.files[0]);
}
/*****************************************************************************/


const input = "day3-input.txt";
const testinput = "day3-test.txt";
function elemToNumpos(elem) {
	return { actualNum: Number(elem[0]), begin: Number(elem["index"]), end: Number(elem["index"]) + elem[0].length - 1 };
}
function solverd3p1(lines) {
	let numsPos = new Set();
	const regNum = /\d+/g;
	const regSym = /[^\d\.]/g;
	for (let linenumber = 1; linenumber < lines.length; linenumber = linenumber + 1) {
		const scan1 = lines[linenumber - 1];
		const scan2 = lines[linenumber];
		const nums1 = [...scan1.matchAll(regNum)].map((elem) => { return elemToNumpos(elem); });
		const syms1 = [...scan1.matchAll(regSym)].map((elem) => { return { position: Number(elem["index"]) }; });
		const nums2 = [...scan2.matchAll(regNum)].map((elem) => { return elemToNumpos(elem); });
		const syms2 = [...scan2.matchAll(regSym)].map((elem) => { return { position: Number(elem["index"]) }; });
		syms1.forEach((sp) => {
			for (let num of nums2) {
				if (sp.position >= num.begin - 1 && sp.position <= num.end + 1) {
					numsPos.add({ linenum: linenumber, linepositions: num });
				}
			}
			for (let num of nums1) {
				if (sp.position == num.end + 1 || sp.position == num.begin - 1) {
					numsPos.add({ linenum: linenumber - 1, linepositions: num });
				}
			}
		});
		syms2.forEach((sp) => {
			for (let num of nums1) {
				if (sp.position >= num.begin - 1 && sp.position <= num.end + 1) {
					numsPos.add({ linenum: linenumber - 1, linepositions: num });
				}
			}
		});
	}
	return [...new Set([...numsPos]
			.map((item) => item.linepositions.actualNum + "|" + item.linenum + "|" + item.linepositions.begin + "|" + item.linepositions.end))]
		.map((str) => Number(str.match(/\d+/)))
		.reduce((a, b) => a + b);
}
function solverd3p2(lines) {
	let numsPos = new Set();
	const regNum = /\d+/g;
	const regGear = /\*/g;
	for (let linenumber = 1; linenumber < lines.length; linenumber = linenumber + 1) {
		const scan1 = lines[linenumber - 1];
		const scan2 = lines[linenumber];
		const nums1 = [...scan1.matchAll(regNum)].map((elem) => { return elemToNumpos(elem); });
		const gear1 = [...scan1.matchAll(regGear)].map((elem) => { return { gearposition: Number(elem["index"]), gearlinenum: linenumber - 1 }; });
		const nums2 = [...scan2.matchAll(regNum)].map((elem) => { return elemToNumpos(elem); });
		const gear2 = [...scan2.matchAll(regGear)].map((elem) => { return { gearposition: Number(elem["index"]), gearlinenum: linenumber }; });
		gear1.forEach((sp) => {
			for (let num of nums2) {
				if (sp.gearposition >= num.begin - 1 && sp.gearposition <= num.end + 1) {
					numsPos.add({ linenum: linenumber, linepositions: Object.assign(Object.assign({}, num), sp) });
				}
			}
			for (let num of nums1) {
				if (sp.gearposition == num.end + 1 || sp.gearposition == num.begin - 1) {
					numsPos.add({ linenum: linenumber - 1, linepositions: Object.assign(Object.assign({}, num), sp) });
				}
			}
		});
		gear2.forEach((sp) => {
			for (let num of nums1) {
				if (sp.gearposition >= num.begin - 1 && sp.gearposition <= num.end + 1) {
					numsPos.add({ linenum: linenumber - 1, linepositions: Object.assign(Object.assign({}, num), sp) });
				}
			}
		});
	}
	let gearmap = new Map();
	const bullshit = (a, b) => { return a + '|' + b; };
	for (let l of [...numsPos]) {
		const key = bullshit(l.linepositions.gearlinenum, l.linepositions.gearposition);
		if (gearmap.has(key)) {
			gearmap.get(key).push(l.linepositions.actualNum);
		}
		else {
			gearmap.set(key, [l.linepositions.actualNum]);
		}
	}
	return [...gearmap].map((el) => el[1].length == 2 ? el[1].reduce((a, b) => a * b) : 0).reduce((a, b) => a + b);
}
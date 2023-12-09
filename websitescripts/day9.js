const inputElementd9 = document.getElementById("inputd9.1");
const outputElementd9p1 = document.getElementById("outd9.1");
const outputElementd9p2 = document.getElementById("outd9.2");

inputElementd9.addEventListener("change", eventListenerDay9, false);
function eventListenerDay9() {
	let reader = new FileReader();
	reader.onload = function () {
		const arr = reader.result.split(/\r?\n/);
		outputElementd9p1.textContent = solverd9p1(arr);
		outputElementd9p2.textContent = solverd9p2(arr);
	}
	reader.readAsText(this.files[0]);
}
/*****************************************************************************/

const numReg = /\-?\d+/g;
function expando(numberList) {
    const endpoints = [];
    let tmplist = numberList;
    let newtemplist = [];
    while (!tmplist.every(x => x == 0)) {
        endpoints.push(tmplist[tmplist.length - 1]);
        newtemplist = [];
        for (let i = 1; i < tmplist.length; i++) {
            newtemplist.push(tmplist[i] - tmplist[i - 1]);
        }
        tmplist = newtemplist;
    }
    return endpoints.reverse().reduce((acc, nex) => acc + nex, 0);
}
function solverd9p1(lines) {
    let li = [];
    for (let line of lines) {
        const rowNumber = [...line.matchAll(numReg)].map(x => Number(x[0]));
        li.push(expando(rowNumber));
    }
    return li.reduce((acc, next) => acc + next);
}
function solverd9p2(lines) {
    let li = [];
    for (let line of lines) {
        const rowNumber = [...line.matchAll(numReg)].map(x => Number(x[0]));
        li.push(expando(rowNumber.reverse()));
    }
    return li.reduce((acc, next) => acc + next);
}

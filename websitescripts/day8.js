const inputElementd8 = document.getElementById("inputd8.1");
const outputElementd8p1 = document.getElementById("outd8.1");
const outputElementd8p2 = document.getElementById("outd8.2");

inputElementd8.addEventListener("change", eventListenerDay8, false);
function eventListenerDay8() {
	let reader = new FileReader();
	reader.onload = function () {
		const arr = reader.result.split(/\r?\n/);
		outputElementd8p1.textContent = solverd8p1(arr);
		outputElementd8p2.textContent = solverd8p2(arr);
	}
	reader.readAsText(this.files[0]);
}
/*****************************************************************************/
function gcd(a, b) {
    let li = [a, b];
    while (!(li[1] === 0)) {
        const tmp = li[0];
        const na = li[1];
        const nb = tmp % li[1];
        li = [na, nb];
    }
    console.log(li);
    return li[0];
}
function lcm(a, b) {
    return a / gcd(a, b) * b;
}

function cycleFind(walkstart, walkInstruction, walkMap) {
    let curr = walkstart;
    let steps = 0;
    const cyclelength = walkInstruction.length;
    const pos = [];
    const stepatpos = [];
    let done = false;
    while (!done) {
        while (!curr.endsWith("Z")) {
            if (walkInstruction[steps % cyclelength] === "L") {
                curr = walkMap.get(curr)[0];
            }
            else {
                curr = walkMap.get(curr)[1];
            }
            steps++;
        }
        if (pos.includes(steps % cyclelength)) {
            done = true;
        }
        else {
            pos.push(steps % cyclelength);
            stepatpos.push(steps);
        }
    }
    return pos.map((e, i) => [e, stepatpos[i]]);
}
function solverd8p1(lines) {
    const walkcycle = lines[0].trim();
    let cyclelength = walkcycle.length;
    let steps = 0;
    let walkMap = new Map();
    const reg = /[A-Z]{3}/g;
    for (let line of lines.slice(2)) {
        const matches = line.matchAll(reg);
        walkMap.set(matches.next().value[0], [matches.next().value[0], matches.next().value[0]]);
    }
    let curr = "AAA";
    while (curr !== "ZZZ") {
        if (walkcycle[steps % cyclelength] === "L") {
            curr = walkMap.get(curr)[0];
        }
        else {
            curr = walkMap.get(curr)[1];
        }
        steps++;
    }
    return (steps);
}
function solverd8p2(lines) {
    const walkcycle = lines[0].trim();
    const walkys = [];
    const walkMap = new Map();
    const strangelist = [];
    const reg = /[A-Z]{3}/g;
    for (let line of lines.slice(2)) {
        const matches = line.matchAll(reg);
        const key = matches.next().value[0];
        walkMap.set(key, [matches.next().value[0], matches.next().value[0]]);
        if (key.endsWith("A")) {
            walkys.push(key);
        }
    }
    for (let walkstart of walkys) {
        strangelist.push(cycleFind(walkstart, walkcycle, walkMap));
    }
    return strangelist.map((li) => li[0][1]).reduce(lcm, 1);
}

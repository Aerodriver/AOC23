const inputElement1 = document.getElementById("inputd1.1");
const outputElement1 = document.getElementById("outd1.1");
const outputElement2 = document.getElementById("outd1.2");

inputElement1.addEventListener("change", solver2Day1, false);
function solver2Day1() {
	let reader = new FileReader();
	reader.onload = function () {
		const arr = reader.result.split(/\r?\n/);
		let numbers  = []
		arr.forEach((line) => {
			numbers.push(filterNumsFromLine(line))
		});
		outputElement1.textContent = numbers.reduce( (accumulator, curr) => Number(accumulator) + Number(curr));
		numbers  = []
		arr.forEach((line) => {
			numbers.push(filterNumsFromLine2(line))
		});
		outputElement2.textContent = numbers.reduce( (accumulator, curr) => Number(accumulator) + Number(curr));

		}
		reader.readAsText(this.files[0]);
}

/*****************************************************************************/
const filterNumsFromLine = (line) => {
	const numbers = line.matchAll(/[0-9]/g);
	const first = numbers.next().value
	const last = [...Array.from(numbers)].pop()
	if( first == 0){
		console.log(line)
	}
	if(last === undefined){
		return first+first
	}
	else {
		return first+last
	}
};
//Stuff for part 2
const filterNumsFromLine2 = (line) => {
	const numbers = line.matchAll(/[0-9]|on(?=e)|tw(?=o)|thr(?=ee)|four|fi(?=ve)|six|sev(?=en)|eigh(?=t)|ni(?=ne)/g);
	const nameToNum = {"on":"1", "tw":"2", "thr":"3", "four":"4", "fi":"5", "six":"6", "sev":"7", "eigh":"8", "ni":"9"} 

	const test = numbers.next().value
	const first = (test[0] in nameToNum)? nameToNum[test[0]] : test[0];
	const last = [...numbers].pop()
	
	if(last === undefined){
		return Number(first + first)
	}
	else {
		const reallast = (last[0] in nameToNum)? nameToNum[last[0]] : last[0];
		return Number(first + reallast)
	}
};
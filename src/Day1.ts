import * as utils from "./utilitiy"

// Part 1
// for every line in the input take the first and last digit and thats your number
// What is the sum of all of the calibration values?
const input1: string = "day1-input1.txt"; 
const input2: string = input1;


const filterNumsFromLine = (line: string): number => {
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

const trial1 = (filename: string): number => {
	// read file
	//const fileReader = new FileReader();

	const arr = utils.getFileLines(filename)
	let numbers : number[] = []
	//filter the relevant number from each line
	arr.forEach((line:string) => {
		numbers.push(filterNumsFromLine(line))
	});
	//sum up all numbers
	return numbers.reduce( (accumulator, curr) => Number(accumulator) + Number(curr));
};

console.log("Solution 1",String(trial1(input1)))


/*** Part 2 ***/

const nameToNum = (name:string|number) :string =>{
	switch (name){
		case "on":
			return "1";
		case "tw":
			return "2";
		case "thr":
			return "3";
		case "four":
			return "4"; 
		case "fi":
			return "5";
		case "six":
			return "6";
		case "sev":
			return "7";
		case "eigh":
			return "8";
		case "ni":
			return "9";
		default:
			return String(name);
	}
}

const filterNumsFromLine2 = (line: string): number => {
	// if it works it works, overlapping numbers are no bueno for regex
	const numbers = line.matchAll(/[0-9]|on(?=e)|tw(?=o)|thr(?=ee)|four|fi(?=ve)|six|sev(?=en)|eigh(?=t)|ni(?=ne)/g);
	const test = numbers.next().value
	const first = nameToNum(test[0])
	const last = [...numbers].pop()
		if(last === undefined){
		return Number(first + first)
	}
	else {
		return Number(first + nameToNum(last[0]))
	}
};

const trial2 = (filename: string): number => {
	const arr = utils.getFileLines(filename)
	let numbers : number[] = []
	arr.forEach((line:string) => {
		numbers.push(filterNumsFromLine2(line))
	});
	return numbers.reduce( (accumulator, curr) => Number(accumulator) + Number(curr));
};

console.log("Solution 2",String(trial2(input2)))

import * as utils from "./utilitiy"
const input="day9-input.txt";
const testinput="day9-test.txt";

const content = utils.getFileLines(input);
const test= utils.getFileLines(testinput);
const numReg = /\-?\d+/g

function expando(numberList:number[]){
	const endpoints = []
	let tmplist = numberList
	let newtemplist:number[] = []
	
	while(!tmplist.every(x => x==0)){
		endpoints.push(tmplist[tmplist.length-1])
		newtemplist = []
		for(let i=1; i< tmplist.length; i++){
			newtemplist.push(tmplist[i] - tmplist[i-1])
		}
		tmplist = newtemplist
	}
	return endpoints.reverse().reduce((acc,nex)=> acc+nex , 0)
}

function solver1(lines:string[]){
	let li = []

	for(let line of lines){
		const rowNumber = [...line.matchAll(numReg)].map(x=>Number(x[0]))
		li.push(expando(rowNumber))
	}
	
	return li.reduce((acc, next)=> acc+next)
}

function solver2(lines:string[]){
	let li = []

	for(let line of lines){
		const rowNumber = [...line.matchAll(numReg)].map(x=>Number(x[0]))
		li.push(expando(rowNumber.reverse()))
	}
	
	return li.reduce((acc, next)=> acc+next)
}


let startTime = Date.now();
console.log(solver1(content))
console.log(solver2(content))
let timeTaken = Date.now() - startTime;
console.log("Total time taken : " + timeTaken + " milliseconds");
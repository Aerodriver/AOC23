import { time } from "console"
import * as utils from "./utilitiy"
const input = "day6-input.txt"
const testinput = "day6-test.txt"

const content = utils.getFileLines(input)
const test = utils.getFileLines(testinput)

const numlistreg = /[\d+\s+]+/ 

function findNumberOfBetterDistances(allowedTime:number, bestDistance:number):number{

	function d(speed:number):number{
		return speed*allowedTime - speed*speed 
	}
	let low =0
	let high = Math.floor(allowedTime/2)
	if( high*(allowedTime-high)< bestDistance){
		return 0;
	}
	while(low+1<high){
		let middle = Math.floor((low+high)/2)
		if (d(middle)>=bestDistance){
			high=middle
		} else{
			low =middle
		}
	}
	const end = (allowedTime/2) + (allowedTime/2-high) 
	return end-high +1
}

function solver1(lines:string[]){
	const times = lines[0].match(numlistreg)!.pop()!.trim().split(/\s+/).map((x)=>Number(x))
	const bestdistances = lines[1].match(numlistreg)!.pop()!.trim().split(/\s+/).map((x)=>Number(x))
	const nums =[];
	for(let i=0; i < times.length; i++){
		nums.push(findNumberOfBetterDistances(times[i], bestdistances[i]))
	}
	return nums.reduce((acc, next)=> acc*next, 1)
}


function solver2(lines:string[]){
	const time = Number(lines[0].match(numlistreg)!.pop()!.trim().replace(/\s+/g,''))
	const bestdistance = Number(lines[1].match(numlistreg)!.pop()!.trim().replace(/\s+/g,''))
	return findNumberOfBetterDistances(time, bestdistance)
}


let start = Date.now();
console.log(solver1(content))
console.log(solver2(content))
let timeTaken = Date.now() - start;
console.log("Total time taken : " + timeTaken + " milliseconds");
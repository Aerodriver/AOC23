import * as utils from "./utilitiy"
const input="day8-input.txt";
const testinput="day8-test.txt";

const content = utils.getFileLines(input);
const test= utils.getFileLines(testinput);

function cycleFind(walkstart:string, walkInstruction:string, walkMap:Map<string,[string,string]>):any{
	let curr = walkstart
	let steps = 0 
	const cyclelength = walkInstruction.length
	const pos:number[] = []
	const stepatpos:number[] = []
	let done=false

	while(!done){
		while(!curr.endsWith("Z")){
			if(walkInstruction[steps%cyclelength] ==="L"){
				curr = walkMap.get(curr)![0]
			} else{
				curr = walkMap.get(curr)![1]
			}
			steps++
		}
		if(pos.includes(steps%cyclelength)){
			done=true
		} else{
			pos.push(steps%cyclelength)
			stepatpos.push(steps)
		}
	}
	return pos.map( (e,i)=> [e,stepatpos[i]])
}


function solver1(lines:string[]){
	const walkcycle = lines[0].trim()
	let cyclelength = walkcycle.length
	let steps=0;
	let walkMap = new Map<string,[string,string]>()
	const reg = /[A-Z]{3}/g
	for(let line of lines.slice(2)){
		const matches = line.matchAll(reg)
		walkMap.set(matches.next().value[0],[matches.next().value[0],matches.next().value[0]])
	}
	let curr = "AAA"
	while(curr!=="ZZZ"){
		if(walkcycle[steps%cyclelength] ==="L"){
			curr = walkMap.get(curr)![0]
		} else{
			curr = walkMap.get(curr)![1]
		}
		steps++
	}
	return(steps)
}

function solver2(lines:string[]){
	const walkcycle = lines[0].trim()
	const walkys = []
	const walkMap = new Map<string,[string,string]>()
	const strangelist=[]
	const reg = /[A-Z]{3}/g

	for(let line of lines.slice(2)){
		const matches = line.matchAll(reg)
		const key = matches.next().value[0]
		walkMap.set(key,[matches.next().value[0],matches.next().value[0]])
		if(key.endsWith("A")){
			walkys.push(key)
		}
	}
	
	for(let walkstart of walkys){
		strangelist.push(cycleFind(walkstart, walkcycle, walkMap))
	}
	
	return strangelist.map((li)=> li[0][1]).reduce(utils.lcm, 1) //least common multiple of number list
}

let startTime = Date.now();
console.log(solver1(content))
console.log(solver2(content))
let timeTaken = Date.now() - startTime;
console.log("Total time taken : " + timeTaken + " milliseconds");
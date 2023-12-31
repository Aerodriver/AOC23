import * as utils from "./utilitiy"

const input1 ="day2-input.txt"

type bag = {
	blues:number;
	greens:number;
	reds:number;
}


class Game {
	id:number;
	bagSequence:bag[];

	constructor(id=0) {
		this.id = id
		this.bagSequence=[]
	}

	addBagFromString(bagString:string):void{
		const reg=(/\d+\sgreen|\d+\sred|\d+\sblue/g);
		let newbag:bag = {
			blues:0,
			greens:0,
			reds:0
		}

		for (let found of bagString.matchAll(reg)){
			const currval = found[0]
			const stuff = currval.split(/\s/)
			switch(stuff[1]){
				case "green":
					newbag.greens=Number(stuff[0]);
					continue;
				case "red":
					newbag.reds=Number(stuff[0]);
					continue;
				case "blue":
					newbag.blues=Number(stuff[0]);
					continue;
			}
		}
		this.bagSequence.push(newbag)
	}

	addBag(bag:bag):void{
		this.bagSequence.push(bag)
	}

	findIfNoViolation(reds:number,greens:number,blues:number):number{
		for (let bag of this.bagSequence){
			if ( bag.reds>reds || bag.greens>greens || bag.blues>blues){
				return 0
			}
		}
		return this.id
	}

	findSmallestNeededCube():[number,number,number]{
		let mingreen=0
		let minred=0
		let minblue=0
		for (let bag of this.bagSequence){
			mingreen = mingreen<bag.greens? bag.greens: mingreen;
			minred = minred<bag.reds? bag.reds: minred;
			minblue = minblue<bag.blues? bag.blues: minblue;
		}
		return [mingreen,minblue,minred]
	}
} 

const buildAGame = (line:string, id=0):Game => {
	let g = new Game(id);
	line.split(/:/)[1].trim().split(/;/).forEach((round:string)=>{
		g.addBagFromString(round.trim())
	})
	return g
}

function solver1(){
	const contents = utils.getFileLines(input1);
	let count=1;
	let acc=0;
	contents.forEach(
		(line:string) => {
			let g = buildAGame(line, count)
			acc = acc + g.findIfNoViolation(12,13,14)
			count = count+1
		}
	)
	return acc
}

function solver2(){
	const contents = utils.getFileLines(input1)
	let acc=0
	contents.forEach(
		(line:string) => {
			let g = buildAGame(line)
			acc = acc + g.findSmallestNeededCube().reduce((prev, curr) => prev*curr)
		}
	)
	return acc
}

console.log("Solution 1",solver1())
console.log("Solution 2", solver2())

const inputElementd2 = document.getElementById("inputd2.1");
const outputElementd2p1 = document.getElementById("outd2.1");
const outputElementd2p2 = document.getElementById("outd2.2");

inputElementd2.addEventListener("change", eventListenerDay2, false);
function eventListenerDay2() {
	let reader = new FileReader();
	reader.onload = function () {
		const arr = reader.result.split(/\r?\n/);
		outputElementd2p1.textContent = solve1(arr);
		outputElementd2p2.textContent = solve2(arr);
	}
	reader.readAsText(this.files[0]);
}
/*****************************************************************************/
class Game {
	id;
	bagSequence;

	constructor(id=0) {
		this.id = id
		this.bagSequence=[]
	}

	addBagFromString(bagString){
		const reg=(/\d+\sgreen|\d+\sred|\d+\sblue/g);
		let newbag = {
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

	addBag(bag){
		this.bagSequence.push(bag)
	}

	findIfNoViolation(reds,greens,blues){
		for (let bag of this.bagSequence){
			if ( bag.reds>reds || bag.greens>greens || bag.blues>blues){
				return 0
			}
		}
		return this.id
	}

	findSmallestNeededCube(){
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

const buildAGame = (line, id=0) => {
	let g = new Game(id);
	line.split(/:/)[1].trim().split(/;/).forEach((round)=>{
		g.addBagFromString(round.trim())
	})
	return g
}

function solve1(contents){
	let count=1;
	let acc=0;
	contents.forEach(
		(line) => {
			let g = buildAGame(line, count)
			acc = acc + g.findIfNoViolation(12,13,14)
			count = count+1
		}
	)
	return acc
}

function solve2(contents){
	let acc=0
	contents.forEach(
		(line) => {
			let g = buildAGame(line)
			acc = acc + g.findSmallestNeededCube().reduce((prev, curr) => prev*curr)
		}
	)
	return acc
}

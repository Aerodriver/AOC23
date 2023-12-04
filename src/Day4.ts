import * as utils from "./utilitiy"

const input="day4-input.txt";
const testinput="day4-test.txt";

const contents = utils.getFileLines(input);
const test= utils.getFileLines(testinput);


function numberOfWinningNumbers(line:string):number{
	const reg = /(?<winnums>(\d+|\s)+)\|(?<mynums>(\d+|\s)+)/;
	const numreg = /\d+/g;
	let groups = line.match(reg)?.groups;
	if(groups){
		const win = new Set([...groups["winnums"].matchAll(numreg)].map( (e)=> Number(e) ));
		const my = 	new Set([...groups["mynums"].matchAll(numreg)].map( (e)=> Number(e) ));
		return ( ([...win].filter(x => my.has(x)).length) );
	}
	return 0;
}

function solver1(lines:string[]):number{
	const pointCalc = (num:number):number=> num>0? Math.pow(2,num-1): 0;
	const points  = [];

	for(let line of lines){
		points.push(numberOfWinningNumbers(line));
	}

	return points.reduce( (acc, curr)=> acc+pointCalc(curr),0  );
}

function solver2(lines:string[]):number{
	const card_repeat= new Map();

	for(let e of lines.entries()){
		if(! card_repeat.has(e[0])){
			card_repeat.set(e[0],1);
		}

		const how_often_to_count_card = card_repeat.get(e[0]);
		const numofwinnum = numberOfWinningNumbers(e[1]);

		for(let i of [...Array(numofwinnum).keys()]){
			if(card_repeat.has(e[0] + i+1)){
				card_repeat.set(e[0] + i+1, card_repeat.get(e[0] + i+1) + how_often_to_count_card );
			} else{
				card_repeat.set(e[0] + i+1, how_often_to_count_card+1);
			}
		}
	}

	return [...card_repeat.values()].reduce( (a,b)=> a+b );
}


console.log("Solution 1", solver1(contents));
console.log("Solution 2", solver2(contents));

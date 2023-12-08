import * as utils from "./utilitiy"

const input = "day7-input.txt"
const testinput = "day7-test.txt"

const content = utils.getFileLines(input)
const test = utils.getFileLines(testinput)


enum handType {
	HighCard = 0,
	OnePair = 1,
	TwoPair = 2,
	ThreeOfAKind = 3,
	FullHouse = 4,
	FourOfAKind = 5,
	FiveOfAKind = 6
}

function handToType(hand:string, version2 = false):handType{
	const map = [...hand].reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()); //maps char to frequency
	let jokerbaby=0

	if(version2){
		if(map.get("J")){
			jokerbaby = map.get("J")
			map.delete("J")
			if(jokerbaby==5){
				return handType.FiveOfAKind
			}
		}
	}
	let flagP = false;
	let flagT = false;
	
	for(let pair of [...map.entries()].sort( (a,b) => b[1]-a[1] )){
		if(pair[1]+jokerbaby==5){
			return handType.FiveOfAKind
		} else if (pair[1]+jokerbaby==4){
			return handType.FourOfAKind
		} else if (pair[1]+jokerbaby==3){
			jokerbaby=0
			if(flagP){
				return handType.FullHouse
			}
			flagT = true;
		} else if(pair[1]+jokerbaby==2){
			jokerbaby=0
			if(flagP){
				return handType.TwoPair
			}
			if(flagT){
				return handType.FullHouse
			}
			flagP=true
		}
	}
	
	if(flagT){
		return handType.ThreeOfAKind
	} else if (flagP){
		return handType.OnePair
	}
	return 	handType.HighCard
}

function compareHands(hand1:string, hand2:string, version2 = false){
	const help = (x:string) => {
		switch (x){
			case "T":
				return 10;
			case "J":
				return version2? 0: 11;
			case "Q":
				return 12;
			case "K":
				return 13;
			case "A":
				return 14;
			default:
				return Number(x);
		}
	}
	for(let card=0; card< hand1.length; card++){
		if( hand1.charAt(card) !== hand2.charAt(card)){
			return help(hand1.charAt(card)) < help(hand2.charAt(card))? 1: -1 
		}
	}
	return 0
}

function solver2(lines:string[]):number{
		const handstruct = new Map<number, {hand:string, bidvalue:number}[]>().set(1,[]).set(0,[]).set(2,[]).set(3,[]).set(4,[]).set(5,[]).set(6,[])

		for(let line of lines){
			const items = line.split(" ")
			const thing = { hand:items[0], bidvalue:Number(items[1])}
			const typeothing = handToType(items[0], true)
			handstruct.get(typeothing)!.push(thing)
		}
		
		let acc=0
		let rank=1
		for(let i=0;i<7;i++){
			for( let item of handstruct.get(i)!.sort((a,b) => compareHands(b.hand,a.hand, true))){
				acc = acc+ rank*item.bidvalue
				rank++
			}
		}

		return acc
}

function solver1(lines:string[]):number{
	const handstruct = new Map<number, {hand:string, bidvalue:number}[]>().set(1,[]).set(0,[]).set(2,[]).set(3,[]).set(4,[]).set(5,[]).set(6,[])

	for(let line of lines){
		const items = line.split(" ")
		const thing = { hand:items[0], bidvalue:Number(items[1])}
		const typeothing = handToType(items[0])
		handstruct.get(typeothing)!.push(thing)
	}
	
	let acc=0
	let rank=1
	for(let i=0;i<7;i++){
		for( let item of handstruct.get(i)!.sort((a,b) => compareHands(b.hand,a.hand))){
			acc = acc+ rank*item.bidvalue
			rank++
		}
	}

	return acc
}


let start = Date.now();
console.log(solver1(content))
console.log(solver2(content))
let timeTaken = Date.now() - start;
console.log("Total time taken : " + timeTaken + " milliseconds");
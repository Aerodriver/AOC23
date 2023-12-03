import * as utils from "./utilitiy"

const input ="day3-input.txt"
const testinput = "day3-test.txt"

type numInLine = {
	linenum:number;
	linepositions:numPos;
}

type numGearInLine = {
	linenum:number;
	linepositions:numPosGear;
}

type numPos ={
	begin:number;
	end:number;
	actualNum:number;
}

type numPosGear = numPos & gearLinePos

type gearLinePos = {
	gearposition:number;
	gearlinenum:number
}

type symPos = {
	position:number
}

function elemToNumpos(elem: any):numPos {
	return {actualNum:Number(elem[0]) , begin:Number(elem["index"]), end:Number(elem["index"]) + elem[0].length -1 }
}

function solver1(lines:string[]):number{

	let numsPos = new Set<numInLine>();
	const regNum = /\d+/g;
	const regSym = /[^\d\.]/g

	for (let linenumber = 1; linenumber<lines.length; linenumber=linenumber+1){
	
		const scan1 = lines[linenumber-1];
		const scan2 = lines[linenumber];
		
		const nums1 = [...scan1.matchAll(regNum)].map((elem):numPos=>{return elemToNumpos(elem)});
		const syms1 = [...scan1.matchAll(regSym)].map((elem):symPos=>{ return {position:Number(elem["index"])} });

		const nums2 = [...scan2.matchAll(regNum)].map((elem):numPos=>{return elemToNumpos(elem)});
		const syms2 = [...scan2.matchAll(regSym)].map((elem):symPos=>{ return {position:Number(elem["index"])} });
		
		syms1.forEach( 
			(sp)=> { 
				//get all numbers in line below
				for ( let num of nums2){
					if ( sp.position >= num.begin-1 && sp.position<= num.end+1){
						numsPos.add( {linenum:linenumber , linepositions:num} )
					}
				}
				//get all numbers in same line
				for ( let num of nums1){
					if ( sp.position == num.end+1 || sp.position == num.begin-1){
						numsPos.add( {linenum:linenumber-1 , linepositions:num} )
					}
				}
			}
		);
		syms2.forEach( 
			(sp)=> { 
				//get all numbers in line above
				for ( let num of nums1){
					if ( sp.position >= num.begin-1 && sp.position<= num.end+1){
						numsPos.add( {linenum:linenumber-1 , linepositions:num} )
					}
				}
			}
		);
	}

	return [...numsPos].map((e)=>{ return e.linepositions.actualNum}).reduce( (a,b) => {return a+b} );
}

function solver2(lines:string[]):number{

	let numsPos = new Set<numGearInLine>();
	const regNum = /\d+/g;
	const regGear = /\*/g
	
	for (let linenumber = 1; linenumber<lines.length; linenumber=linenumber+1){
	
		const scan1 = lines[linenumber-1];
		const scan2 = lines[linenumber];
		
		const nums1 = [...scan1.matchAll(regNum)].map((elem):numPos=>{return elemToNumpos(elem)});
		const gear1 = [...scan1.matchAll(regGear)].map((elem):gearLinePos=>{ return {gearposition:Number(elem["index"]), gearlinenum:linenumber-1} });

		const nums2 = [...scan2.matchAll(regNum)].map((elem):numPos=>{return elemToNumpos(elem)});
		const gear2 = [...scan2.matchAll(regGear)].map((elem):gearLinePos=>{ return {gearposition:Number(elem["index"]), gearlinenum:linenumber} });
		
		gear1.forEach( 
			(sp)=> { 
				//get all numbers in line below
				for ( let num of nums2){
					if ( sp.gearposition >= num.begin-1 && sp.gearposition<= num.end+1){
						numsPos.add( {linenum:linenumber , linepositions:{...num, ...sp} } )
					}
				}
				//get all numbers in same line
				for ( let num of nums1){
					if ( sp.gearposition == num.end+1 || sp.gearposition == num.begin-1){
						numsPos.add( {linenum:linenumber-1 , linepositions:{...num, ...sp }} )
					}
				}
			}
		);
		gear2.forEach( 
			(sp)=> { 
				//get all numbers in line above
				for ( let num of nums1){
					if ( sp.gearposition >= num.begin-1 && sp.gearposition<= num.end+1){
						numsPos.add( {linenum:linenumber-1 , linepositions:{...num, ...sp }} )
					}
				}
			}
		);
	}

	//maps gearlines and gearpositions to numbers adjacent to those gears
	let gearmap = new Map<string,number[]>();
	const bullshit = (a:number,b:number):string=>{ return a+'|'+b};

	for( let l of [...numsPos]){
		const key = bullshit(l.linepositions.gearlinenum, l.linepositions.gearposition)
		if(gearmap.has(key)){
			gearmap.get(key)!.push(l.linepositions.actualNum)
		} else{
			gearmap.set(key, [l.linepositions.actualNum])
		}
	}

	return [...gearmap].map( (el)=> el[1].length==2? el[1].reduce( (a,b)=> a*b) : 0 ).reduce( (a,b)=> a+b );
}


const contents = utils.getFileLines(input)
const test= utils.getFileLines(testinput)

console.log("Solution 1", solver1(contents))
console.log("Solution 2", solver2(contents))
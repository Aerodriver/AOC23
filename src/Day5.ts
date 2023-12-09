import * as utils from "./utilitiy"

const input="day5-input.txt";
const testinput="day5-test.txt";

const contents = utils.getFileAsString(input);
const test= utils.getFileAsString(testinput);

const seedregex = /seeds:\s+(?<seedlist>[\d+| ]+)/;
const seedToSoilReg = /seed-to-soil map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
const soilToFertilizerReg = /soil-to-fertilizer map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
const fertilizerToWaterReg = /fertilizer-to-water map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
const waterToLightReg = /water-to-light map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
const lightToTemperatureReg = /light-to-temperature map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
const temperatureToHumidityReg = /temperature-to-humidity map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
const humidityToLocationReg = /humidity-to-location map:\s+(?<numbers>[\d+|\s]+)/;


function funcBuilderFromMap(map:any):any{
	// return a function that maps a source to its destination according to the given map
	return (inputt:number):number=>{
			for( let i:number = 0; i<map.length; i++){
				if( (map[i][1]<= inputt) && (inputt <= map[i][1] + map[i][2]-1)){	
					return map[i][0] + inputt - map[i][1]
				}
			}
			return inputt
		}
}

function funcBuilderFromMaps(maps:any){
	//concatenates a lot of number -> number functions
	return (x:number) => maps.reduce((acc:number, next:any)=>{return funcBuilderFromMap(next)(acc)},x)
}

function BuildMapsToFunc(lines:string){
	const toNumList = (z:string):number[][] => z.split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) )

	const seedToSoil = toNumList(lines.match(seedToSoilReg)!.groups!["numbers"]);
	const soilToFertilizer = toNumList(lines.match(soilToFertilizerReg)!.groups!["numbers"]);
	const fertilizerToWater = toNumList(lines.match(fertilizerToWaterReg)!.groups!["numbers"]);
	const waterToLight = toNumList(lines.match(waterToLightReg)!.groups!["numbers"]);
	const lightToTemperature = toNumList(lines.match(lightToTemperatureReg)!.groups!["numbers"]);
	const temperatureToHumidity = toNumList(lines.match(temperatureToHumidityReg)!.groups!["numbers"]);
	const humidityToLocation = toNumList(lines.match(humidityToLocationReg)!.groups!["numbers"]); 
	
	return funcBuilderFromMaps([humidityToLocation,
		 temperatureToHumidity,lightToTemperature, waterToLight, fertilizerToWater, soilToFertilizer, seedToSoil].reverse())
}

function solver1(lines:string){
	const seeds = lines.match(seedregex)!.groups!["seedlist"].split(/ /).map( x=> Number(x));
	
	const ultimap = BuildMapsToFunc(lines)

	let t=ultimap(seeds[0]);
	for(let seed of seeds){
		const v = ultimap(seed)
		if(v<t){
			t=v
		}
	}

	return t;
}

type bucket = {
	start:number,
	end:number
}

type breakmap = {
	sourceStart:number,
	destinationStart:number,
	range:number,
	sourceEnd: number,
	destinationEnd: number
}

function mappedIntersect(range:bucket, map:breakmap):[bucket[],boolean]{
	if(range.end < map.sourceStart || range.start> map.sourceEnd){
		return [[range], false];
	}
	//multi case for every overlap situation needed
	if(range.start >= map.sourceStart){
		if(range.end <= map.sourceEnd){
			// completly in the mapped range
			return [[{start:(range.start-map.sourceStart) + map.destinationStart,
					end: (range.end - map.sourceStart) + map.destinationStart}], true]
		}
		else{
			// end over mapped range
			return [[
				{start:(range.start-map.sourceStart) + map.destinationStart,
					end: map.destinationEnd}, 
				{start:range.start + map.range,
					end:range.end}
			], true]
		}
	}
	else{ //range.start < map.sourceStart
		// start before mapped range
		if(range.end <= map.sourceEnd){
			//case end in mapped range
			return [[
				{start:map.destinationStart,
					end: (range.end - map.sourceStart) + map.destinationStart}, 
				{start: range.start,
					end: map.sourceStart-1}
			] , true]
		}
		else{
			 //range.start < map.sourceStart
			//range.end > map.sourceEnd
			//case end over mapped range
			return [[
				{start: map.destinationStart,
					end: map.destinationEnd}, 
				{start: range.start,
					end: map.sourceStart-1},
				{start: map.sourceEnd+1,
					end: range.end}
			]  , true]
		}

	}
}

function breakApart(tobreak:bucket[], map:breakmap[]):bucket[]{
	//theres a problem here
	let output:bucket[] = [];
	//console.log(tobreak, map)

	for(let tobebroken of tobreak){
		let tomap = [tobebroken]

			for(let currmapping of map){
				let remaining:bucket[]= [] // things we preserve for the other maps

				for(let t of tomap){
					const i = mappedIntersect(t,currmapping)
					//if(i[0].length>1){console.log("broken", i[0])}
					if(i[1]){ // something was mappes, so we must put it into our oputput
						output.push(i[0][0]) //put refined part into output
						remaining =  remaining.concat(i[0].slice(1)) //put rest into next round
						console.log(i[0])
					}
					else{
						//console.log(i[0][0], "von", t)
						remaining.push(i[0][0])
					}
				}

				tomap = [...remaining]
			}
		//console.log("out",output)
		output = output.concat(tomap)
	}
	
	return output;
}


function solver2(lines:string){
	const seedlist = lines.match(seedregex)!.groups!["seedlist"].split(/ /).map( x=> Number(x));
	const seedranges:bucket[] = [];

	for(let i=0;i<seedlist.length; i=i+2){
		seedranges.push( {start:seedlist[i], end:seedlist[i]+seedlist[i+1]-1} )
	}
	//console.log(seedranges)

	const toNumList = (z:string):number[][] => z.split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) )
	const numListTobreakmapList = 
	(z:number[][]):breakmap[] => z.map((l):breakmap => {
		return {destinationStart: l[0], sourceStart:l[1], range:l[2], sourceEnd:l[1]+l[2]-1, destinationEnd:l[0]+l[2]-1 }
	});

	const seedToSoil = numListTobreakmapList(toNumList(lines.match(seedToSoilReg)!.groups!["numbers"]));
	const soilToFertilizer = numListTobreakmapList(toNumList(lines.match(soilToFertilizerReg)!.groups!["numbers"]));
	const fertilizerToWater = numListTobreakmapList(toNumList(lines.match(fertilizerToWaterReg)!.groups!["numbers"]));
	const waterToLight = numListTobreakmapList(toNumList(lines.match(waterToLightReg)!.groups!["numbers"]));
	const lightToTemperature = numListTobreakmapList(toNumList(lines.match(lightToTemperatureReg)!.groups!["numbers"]));
	const temperatureToHumidity = numListTobreakmapList(toNumList(lines.match(temperatureToHumidityReg)!.groups!["numbers"]))
	const humidityToLocation = numListTobreakmapList(toNumList(lines.match(humidityToLocationReg)!.groups!["numbers"])); 

	const final = breakApart(
		breakApart(
			breakApart(
				breakApart(
					breakApart(
						breakApart(
							breakApart(
								seedranges,	seedToSoil),
							soilToFertilizer),
						fertilizerToWater),
					waterToLight),
				lightToTemperature),
			temperatureToHumidity),
		humidityToLocation)
	const semi = breakApart(
		breakApart(
			seedranges,	seedToSoil),
		soilToFertilizer)
	//console.log(final, final.length)
	//console.log(seedToSoil, seedToSoil.length)


	let min = final[0].start
	for(let f of final){
		if(f.start<min){
			min=f.start
		}
	}
	return min;
}

console.log(solver1(contents))
console.log(solver2(contents)) //should be 104070862 or 46

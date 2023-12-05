import * as utils from "./utilitiy"

const input="day5-input.txt";
const testinput="day5-test.txt";

const contents = utils.getFileAsString(input);
const test= utils.getFileAsString(testinput);

function funcBuilderFromMap(map:any):any{
	return (inputt:number):number=>{
			for( let i:number = 0; i<map.length; i++){
				if( (map[i][1]<= inputt) && (inputt <= map[i][1] + map[i][2])){	
					return map[i][0] + (inputt - map[i][1])
				}
			}
			return inputt
		}
	// return a function that maps a source to its destination according to the given map
}

function funcBuilderFromMaps(maps:any){
	const mapaluza = [];
}

function solver1(lines:string){
	const seedregex = /seeds:\s+(?<seedlist>[\d+| ]+)/;
	const seedToSoilReg = /seed-to-soil map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
	const soilToFertilizerReg = /soil-to-fertilizer map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
	const fertilizerToWaterReg = /fertilizer-to-water map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
	const waterToLightReg = /water-to-light map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
	const lightToTemperatureReg = /light-to-temperature map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
	const temperatureToHumidityReg = /temperature-to-humidity map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
	const humidityToLocationReg = /humidity-to-location map:\s+(?<numbers>[\d+|\s]+)/;

	const seeds = lines.match(seedregex)!.groups!["seedlist"].split(/ /).map( x=> Number(x));
	const seedToSoil = lines.match(seedToSoilReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) );
	const soilToFertilizer = lines.match(soilToFertilizerReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) );
	const fertilizerToWater = lines.match(fertilizerToWaterReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) );
	const waterToLight = lines.match(waterToLightReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) );
	const lightToTemperature = lines.match(lightToTemperatureReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) );
	const temperatureToHumidity = lines.match(temperatureToHumidityReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) );
	const humidityToLocation = lines.match(humidityToLocationReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) ); 
	

	const map1 = funcBuilderFromMap(seedToSoil);
	const map2 = funcBuilderFromMap(soilToFertilizer);
	const map3 = funcBuilderFromMap(fertilizerToWater);
	const map4 = funcBuilderFromMap(waterToLight);
	const map5 = funcBuilderFromMap(lightToTemperature);
	const map6 = funcBuilderFromMap(temperatureToHumidity);
	const map7 = funcBuilderFromMap(humidityToLocation);
	const ultimap = (x:number)=> map7(map6(map5(map4(map3(map2(map1(x)))))))
	
	let t=ultimap(seeds[0]);
	for(let seed of seeds){
		const v = ultimap(seed)
		if(v<t){
			t=v
		}
	}

	return t;
}


function solver2(lines:string){
	const seedregex = /seeds:\s+(?<seedlist>[\d+| ]+)/;
	const seedToSoilReg = /seed-to-soil map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
	const soilToFertilizerReg = /soil-to-fertilizer map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
	const fertilizerToWaterReg = /fertilizer-to-water map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
	const waterToLightReg = /water-to-light map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
	const lightToTemperatureReg = /light-to-temperature map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
	const temperatureToHumidityReg = /temperature-to-humidity map:\s+(?<numbers>[\d+|\s]+)\r\n\r\n/;
	const humidityToLocationReg = /humidity-to-location map:\s+(?<numbers>[\d+|\s]+)/;

	const seedlist = lines.match(seedregex)!.groups!["seedlist"].split(/ /).map( x=> Number(x));
	
	const seedToSoil = lines.match(seedToSoilReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) );
	const soilToFertilizer = lines.match(soilToFertilizerReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) );
	const fertilizerToWater = lines.match(fertilizerToWaterReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) );
	const waterToLight = lines.match(waterToLightReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) );
	const lightToTemperature = lines.match(lightToTemperatureReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) );
	const temperatureToHumidity = lines.match(temperatureToHumidityReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) );
	const humidityToLocation = lines.match(humidityToLocationReg)!.groups!["numbers"].split(/\r\n/).map( x=> x.split(/ /).map( y=> Number(y)) ); 

	const map1 = funcBuilderFromMap(seedToSoil);
	const map2 = funcBuilderFromMap(soilToFertilizer);
	const map3 = funcBuilderFromMap(fertilizerToWater);
	const map4 = funcBuilderFromMap(waterToLight);
	const map5 = funcBuilderFromMap(lightToTemperature);
	const map6 = funcBuilderFromMap(temperatureToHumidity);
	const map7 = funcBuilderFromMap(humidityToLocation);
	const ultimap = (x:number)=> map7(map6(map5(map4(map3(map2(map1(x)))))))

	let t=ultimap(seedlist[0]);
	for(let i=0; i<seedlist.length;i=i+2){
		const start = seedlist[i]
		const range = seedlist[i+1]
		//console.log(start, range)

		for(let i=0;i<range;i++){
			
			const v = ultimap((start+i))
			if(v<t){
				t=v
			}
		}
	}

	return t;
}

console.log(solver1(contents))
console.log(solver2(contents))

//104070863
//324724204
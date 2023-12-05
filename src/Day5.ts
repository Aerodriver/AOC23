import * as utils from "./utilitiy"

const input="day5-input.txt";
const testinput="day5-test.txt";

const contents = utils.getFileLines(input);
const test= utils.getFileLines(testinput);


function solver1(lines:string){
	// [ destinationRangeStart, SourceRangeStart, RangeLength ]
	// Any source numbers that aren't mapped correspond to the same destination number
	// 
	const seedregex = /seeds:\s(\d+|\s)+/;
	const seedToSoilReg = /s/;

	console.log()

	const seeds = [];
	const seedToSoil = [];
	const soilToFertilizer = []; 
	const fertilizerToWater = []; 
	const waterToLight = []; 
	const lightToTemperature = []; 
	const temperatureToHumidity = []; 
	const humidityToLocation = []; 

	function funcBuilderFromMap(map:[number,number,number][]):any{
		// return map as function which takes number checks if it is in one of the source ranges and maps it to the destinationrange + (itself-source range start)
		//const destinations = [...map].map(  (a)=>a[0])
		//const sources = [...map].map(  (a)=>a[1])
		//const ranges =[...map].map(  (a)=>a[2])
		//const inputt=0;

		return (inputt:number):number=>{
				for( let i:number = 0; i<map.length; i++){
					if( (map[1][1]<= inputt) && (inputt <= map[i][1] + map[i][2])){	
						return map[i-1][0] + (inputt - map[i-1][0])
					}
				}
				return inputt
			}
		// return a function that maps a source to its destination according to the given map
	}



	return 0;
}

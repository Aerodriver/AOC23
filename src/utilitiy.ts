import { json } from "stream/consumers";

declare var require: any
const fs = require('fs');
const path = require("path");
const taskdir = 'C:\\Users\\giesb\\Desktop\\AOC23\\src\\task-inputs';


export const getFileLines = (filename: string, directory = taskdir): string[] => {
	const contents = fs.readFileSync(path.join(directory, filename), 'utf-8');
	const arr = contents.split(/\r?\n/);
	return arr
};

export const getFileAsString = (filename: string, directory = taskdir): string[] => {
	return fs.readFileSync(path.join(directory, filename), 'utf-8');
};


class DumbMap<K,V> extends Map{
	private inter_map:Map<string, V> ;

	constructor(){
		super();
		this.inter_map = new Map<string, V>();
	}

	
	[Symbol.iterator]() {
		return this.entries()
	}

	set(key: K, value:V) {
		this.inter_map.set(JSON.stringify(key), value)
        return this;
    }

    clear():void {
        this.inter_map.clear();
    }
    
	delete(key: K):boolean {
        return this.inter_map.delete(JSON.stringify(key));
    }

	entries(): IterableIterator<any>{
		//return map iterator
		
		const it = this.inter_map.entries()
		
		const iterable = {
			[Symbol.iterator]() {
				return this;
			},
			next() {
				let nex = it.next();
				return nex.done? {done: true, value: undefined} : {done: false, value: [JSON.parse(nex.value[0]), nex.value[1]]} ;
			},
		};
		return iterable
	}

	forEach(callback: (value:V, key:K, map:any) => void, thisArg?:any) {
        // abolutly no clue if map and thisArg would work if given but who cares
		this.inter_map.forEach( (v,k,map) => callback(v, JSON.parse(k), map), thisArg)
    }

    get(key: K): V|undefined {
        return this.inter_map.get(JSON.stringify(key));
    }

	//groupBy(items, callbackFn){

	//}

	has(key:K):boolean{
		return this.inter_map.has(JSON.stringify(key));
	}
	
    get size():number {
        return this.inter_map.size;
    }

    values():IterableIterator<V> { 
        return this.inter_map.values();
    }

	keys():IterableIterator<K>{
		const it = this.inter_map.keys()
		return {
			[Symbol.iterator]() {
				return this;
			},
			next() {
				let nex = it.next();
				return nex.done? {done: true, value: undefined} : {done: false, value: JSON.parse(nex.value)} ;
			}
		};

	}

}


function test(){

	let t = new DumbMap<[number,number],number>();
	let ma = new Map<number, number>();
	ma.set(1,2)
	ma.set(2,4)
	t.set([1,2],1).set([2,1],10)
	t.set([1,3],1)
	t.set([1,3],1)
	//console.log(t.keys())
	//console.log(ma.keys())

	//ma.forEach((a,b)=> console.log(a+b  ))
	console.log([...t])
	console.log(t.keys())
	let keys = t.keys()
	let mk = ma.keys()
	console.log([...keys])
	console.log([...keys])
	console.log([...mk])
	console.log([...mk])
	console.log(ma.keys())
	t.forEach((a,b)=> console.log( b[1]+a) )



	for (let i in t) {
		console.log(i); // "0", "1", "2",
	  }

	  interface IterateNum {
		[Symbol.iterator](): IterableIterator<number>;
	  }
	  
	  class Collection implements IterateNum {
		  private items = [1,2,3,4]; // can be Array<T>
	  
		  constructor() {}
	  
		  *[Symbol.iterator]() {
			  for(let i of this.items) {
				  yield i;
			  }
		  }
	  }
	  
	  for(let n of (new Collection())) {
		  console.log(n);
	  }
}

//test()
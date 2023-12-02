declare var require: any
const fs = require('fs');
const path = require("path");


export const getFileLines = (filename: string, directory = 'C:\\Users\\giesb\\Desktop\\AOC23\\src'): string[] => {
	const contents = fs.readFileSync(path.join(directory, filename), 'utf-8');
	const arr = contents.split(/\r?\n/);
	return arr
};


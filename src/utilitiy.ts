declare var require: any
const fs = require('fs');
const path = require("path");
const taskdir = 'C:\\Users\\giesb\\Desktop\\AOC23\\src\\task-inputs';


export const getFileLines = (filename: string, directory = taskdir): string[] => {
	const contents = fs.readFileSync(path.join(directory, filename), 'utf-8');
	const arr = contents.split(/\r?\n/);
	return arr
};


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileLines = void 0;
const fs = require('fs');
const path = require("path");
const getFileLines = (filename, directory = 'C:\\Users\\giesb\\Desktop\\AOC23\\src') => {
    const contents = fs.readFileSync(path.join(directory, filename), 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
};
exports.getFileLines = getFileLines;
//# sourceMappingURL=utilitiy.js.map
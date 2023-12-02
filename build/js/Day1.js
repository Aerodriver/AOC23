"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const input1 = "day1-input1.txt";
const input2 = input1;
const filterNumsFromLine = (line) => {
    const numbers = line.matchAll(/[0-9]/g);
    const first = numbers.next().value;
    const last = [...Array.from(numbers)].pop();
    if (first == 0) {
        console.log(line);
    }
    if (last === undefined) {
        return first + first;
    }
    else {
        return first + last;
    }
};
const trial1 = (filename) => {
    const contents = fs.readFileSync(path.join('C:\\Users\\giesb\\Desktop\\AOC23\\src', filename), 'utf-8');
    const arr = contents.split(/\r?\n/);
    let numbers = [];
    arr.forEach((line) => {
        numbers.push(filterNumsFromLine(line));
    });
    return numbers.reduce((accumulator, curr) => Number(accumulator) + Number(curr));
};
console.log("Solution 1", String(trial1(input1)));
const nameToNum = (name) => {
    switch (name) {
        case "on":
            return "1";
        case "tw":
            return "2";
        case "thr":
            return "3";
        case "four":
            return "4";
        case "fi":
            return "5";
        case "six":
            return "6";
        case "sev":
            return "7";
        case "eigh":
            return "8";
        case "ni":
            return "9";
        default:
            return String(name);
    }
};
const filterNumsFromLine2 = (line) => {
    const numbers = line.matchAll(/[0-9]|on(?=e)|tw(?=o)|thr(?=ee)|four|fi(?=ve)|six|sev(?=en)|eigh(?=t)|ni(?=ne)/g);
    const test = numbers.next().value;
    const first = nameToNum(test[0]);
    const last = [...numbers].pop();
    if (last === undefined) {
        return Number(first + first);
    }
    else {
        return Number(first + nameToNum(last[0]));
    }
};
const trial2 = (filename) => {
    const contents = fs.readFileSync(path.join('C:\\Users\\giesb\\Desktop\\AOC23\\src', filename), 'utf-8');
    const arr = contents.split(/\r?\n/);
    let numbers = [];
    arr.forEach((line) => {
        numbers.push(filterNumsFromLine2(line));
    });
    return numbers.reduce((accumulator, curr) => Number(accumulator) + Number(curr));
};
console.log("Solution 2", String(trial2(input2)));
//# sourceMappingURL=Day1.js.map
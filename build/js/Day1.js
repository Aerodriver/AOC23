"use strict";
const fs = require('fs');
const path = require("path");
const input1 = "day1-input1.txt";
const input2 = input1;
const pauluwuna = "realinput.txt";
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
console.log("Solution 2", String(trial2(pauluwuna)));
//# sourceMappingURL=Day1.js.map
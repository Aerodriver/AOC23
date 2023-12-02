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
const utils = __importStar(require("./utilitiy"));
const input1 = "day2-input.txt";
class Game {
    constructor(id) {
        this.id = id;
        this.bagSequence = [];
    }
    addBagFromString(bag) {
        const reg = (/\d+\sgreen|\d+\sred|\d+\sblue/g);
        let newbag = {
            blues: 0,
            greens: 0,
            reds: 0
        };
        for (let found of bag.matchAll(reg)) {
            const currval = found[0];
            const stuff = currval.split(/\s/);
            switch (stuff[1]) {
                case "green":
                    newbag.greens = Number(stuff[0]);
                    continue;
                case "red":
                    newbag.reds = Number(stuff[0]);
                    continue;
                case "blue":
                    newbag.blues = Number(stuff[0]);
                    continue;
            }
        }
        this.bagSequence.push(newbag);
    }
    addBag(bag) {
        this.bagSequence.push(bag);
    }
    findeIfViolation(reds, greens, blues) {
        for (let bag of this.bagSequence) {
            if (bag.reds > reds || bag.greens > greens || bag.blues > blues) {
                return 0;
            }
        }
        return this.id;
    }
    findSmallestNeededCube() {
        let mingreen = 0;
        let minred = 0;
        let minblue = 0;
        for (let bag of this.bagSequence) {
            mingreen = mingreen < bag.greens ? bag.greens : mingreen;
            minred = minred < bag.reds ? bag.reds : minred;
            minblue = minblue < bag.blues ? bag.blues : minblue;
        }
        return [mingreen, minblue, minred];
    }
}
const buildAGame = (line, id = 0) => {
    let g = new Game(id);
    line.split(/:/)[1].trim().split(/;/).forEach((round) => {
        g.addBagFromString(round.trim());
    });
    return g;
};
function solve1() {
    const contents = utils.getFileLines(input1);
    var count = 1;
    var acc = 0;
    contents.forEach((line) => {
        let g = buildAGame(line, count);
        acc = acc + g.findeIfViolation(12, 13, 14);
        count = count + 1;
    });
    return acc;
}
console.log("Solution 1", solve1());
function solve2() {
    const contents = utils.getFileLines(input1);
    var acc = 0;
    contents.forEach((line) => {
        let g = buildAGame(line);
        acc = acc + g.findSmallestNeededCube().reduce((prev, curr) => prev * curr);
    });
    return acc;
}
console.log("Solution 2", solve2());
//# sourceMappingURL=Day2.js.map
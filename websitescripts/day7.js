const inputElementd7 = document.getElementById("inputd7.1");
const outputElementd7p1 = document.getElementById("outd7.1");
const outputElementd7p2 = document.getElementById("outd7.2");

inputElementd7.addEventListener("change", eventListenerDay7, false);
function eventListenerDay7() {
	let reader = new FileReader();
	reader.onload = function () {
		const arr = reader.result.split(/\r?\n/);
		outputElementd7p1.textContent = solverd7p1(arr);
		outputElementd7p2.textContent = solverd7p2(arr);
	}
	reader.readAsText(this.files[0]);
}
/*****************************************************************************/

var handType;
(function (handType) {
    handType[handType["HighCard"] = 0] = "HighCard";
    handType[handType["OnePair"] = 1] = "OnePair";
    handType[handType["TwoPair"] = 2] = "TwoPair";
    handType[handType["ThreeOfAKind"] = 3] = "ThreeOfAKind";
    handType[handType["FullHouse"] = 4] = "FullHouse";
    handType[handType["FourOfAKind"] = 5] = "FourOfAKind";
    handType[handType["FiveOfAKind"] = 6] = "FiveOfAKind";
})(handType || (handType = {}));
function handToType(hand, version2 = false) {
    const map = [...hand].reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    let jokerbaby = 0;
    if (version2) {
        if (map.get("J")) {
            jokerbaby = map.get("J");
            map.delete("J");
            if (jokerbaby == 5) {
                return handType.FiveOfAKind;
            }
        }
    }
    let flagP = false;
    let flagT = false;
    for (let pair of [...map.entries()].sort((a, b) => b[1] - a[1])) {
        if (pair[1] + jokerbaby == 5) {
            return handType.FiveOfAKind;
        }
        else if (pair[1] + jokerbaby == 4) {
            return handType.FourOfAKind;
        }
        else if (pair[1] + jokerbaby == 3) {
            jokerbaby = 0;
            if (flagP) {
                return handType.FullHouse;
            }
            flagT = true;
        }
        else if (pair[1] + jokerbaby == 2) {
            jokerbaby = 0;
            if (flagP) {
                return handType.TwoPair;
            }
            if (flagT) {
                return handType.FullHouse;
            }
            flagP = true;
        }
    }
    if (flagT) {
        return handType.ThreeOfAKind;
    }
    else if (flagP) {
        return handType.OnePair;
    }
    return handType.HighCard;
}
function compareHands(hand1, hand2, version2 = false) {
    const help = (x) => {
        switch (x) {
            case "T":
                return 10;
            case "J":
                return version2 ? 0 : 11;
            case "Q":
                return 12;
            case "K":
                return 13;
            case "A":
                return 14;
            default:
                return Number(x);
        }
    };
    for (let card = 0; card < hand1.length; card++) {
        if (hand1.charAt(card) !== hand2.charAt(card)) {
            return help(hand1.charAt(card)) < help(hand2.charAt(card)) ? 1 : -1;
        }
    }
    return 0;
}
function solverd7p2(lines) {
    const handstruct = new Map().set(1, []).set(0, []).set(2, []).set(3, []).set(4, []).set(5, []).set(6, []);
    for (let line of lines) {
        const items = line.split(" ");
        const thing = { hand: items[0], bidvalue: Number(items[1]) };
        const typeothing = handToType(items[0], true);
        handstruct.get(typeothing).push(thing);
    }
    let acc = 0;
    let rank = 1;
    for (let i = 0; i < 7; i++) {
        for (let item of handstruct.get(i).sort((a, b) => compareHands(b.hand, a.hand, true))) {
            acc = acc + rank * item.bidvalue;
            rank++;
        }
    }
    return acc;
}
function solverd7p1(lines) {
    const handstruct = new Map().set(1, []).set(0, []).set(2, []).set(3, []).set(4, []).set(5, []).set(6, []);
    for (let line of lines) {
        const items = line.split(" ");
        const thing = { hand: items[0], bidvalue: Number(items[1]) };
        const typeothing = handToType(items[0]);
        handstruct.get(typeothing).push(thing);
    }
    let acc = 0;
    let rank = 1;
    for (let i = 0; i < 7; i++) {
        for (let item of handstruct.get(i).sort((a, b) => compareHands(b.hand, a.hand))) {
            acc = acc + rank * item.bidvalue;
            rank++;
        }
    }
    return acc;
}

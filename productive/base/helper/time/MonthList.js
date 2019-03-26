"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Month_1 = require("./Month");
class MonthList {
    constructor() {
        this.monthObjects = [];
        this.monthObjects = [
            new Month_1.Month(63, 43, "Januar", "Jan.", "J"),
            new Month_1.Month(72, 43, "Februar", "Feb.", "F"),
            new Month_1.Month(50, 43, "März", "Mrz.", "M"),
            new Month_1.Month(57, 43, "April", "Apr.", "A"),
            new Month_1.Month(43, 43, "Mai", "Mai", "M"),
            new Month_1.Month(49, 43, "Juni", "Jun.", "J"),
            new Month_1.Month(43, 43, "Juli", "Jul.", "J"),
            new Month_1.Month(85, 43, "August", "Aug.", "A"),
            new Month_1.Month(96, 43, "September", "Sep.", "S"),
            new Month_1.Month(75, 43, "Oktober", "Okt.", "O"),
            new Month_1.Month(96, 43, "November", "Nov.", "N"),
            new Month_1.Month(92, 43, "Dezember", "Dez.", "D")
        ];
    }
    getMonthLabel(d, width) {
        const monthObject = this.monthObjects[d.getMonth()];
        if (width > monthObject.fullWidth) {
            return monthObject.fullName;
        }
        if (width > monthObject.shortWidth) {
            return monthObject.shortName;
        }
        return monthObject.letter;
    }
    getMonthName(d) {
        return this.monthObjects[d.getMonth()].fullName;
    }
    getMonthShortName(d) {
        return this.monthObjects[d.getMonth()].shortName;
    }
    getMonthLetter(d) {
        return this.monthObjects[d.getMonth()].letter;
    }
    getMonthAndYear(d) {
        return this.getMonthName(d) + " " + d.getFullYear();
    }
}
exports.MonthList = MonthList;

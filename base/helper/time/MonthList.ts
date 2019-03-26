import {Month} from "./Month";

export class MonthList {

    public monthObjects: Month[] = [];

    constructor() {
        this.monthObjects = [
            new Month(63, 43, "Januar", "Jan.", "J"),
            new Month(72, 43, "Februar", "Feb.", "F"),
            new Month(50, 43, "März", "Mrz.", "M"),
            new Month(57, 43, "April", "Apr.", "A"),
            new Month(43, 43, "Mai", "Mai", "M"),
            new Month(49, 43, "Juni", "Jun.", "J"),
            new Month(43, 43, "Juli", "Jul.", "J"),
            new Month(85, 43, "August", "Aug.", "A"),
            new Month(96, 43, "September", "Sep.", "S"),
            new Month(75, 43, "Oktober", "Okt.", "O"),
            new Month(96, 43, "November", "Nov.", "N"),
            new Month(92, 43, "Dezember", "Dez.", "D")
        ];
    }

    public getMonthLabel(d: Date, width: number) {
        const monthObject = this.monthObjects[d.getMonth()];
        if (width > monthObject.fullWidth) {
            return monthObject.fullName;
        }
        if (width > monthObject.shortWidth) {
            return monthObject.shortName;
        }
        return monthObject.letter;
    }

    public getMonthName(d: Date): string {
        return this.monthObjects[d.getMonth()].fullName;
    }

    public getMonthShortName(d: Date): string {
        return this.monthObjects[d.getMonth()].shortName;
    }

    public getMonthLetter(d: Date): string {
        return this.monthObjects[d.getMonth()].letter;
    }

    public getMonthAndYear(d: Date): string {
        return this.getMonthName(d) + " " + d.getFullYear();
    }
}

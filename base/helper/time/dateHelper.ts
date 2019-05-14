import {MonthList} from "./MonthList";

export function dateToDayString(date: Date): string {
    return basicDateToString(date, "-");
}

export function beautyDateString(date: Date): string {
    return basicDateToString(date, ".");
}

export function basicDateToString(date: Date, delimiter: string): string {
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + day;
    }

    return [day, month, year].join(delimiter);
}

export function dateToYMDString(date: Date, delimiter: string): string {
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + day;
    }

    return [year, month, day].join(delimiter);
}

export function stringToDate(s: string): Date {
    return Date.parse(s) ? new Date(Date.parse(s)) : null;
}

export function basicStringDMYToDate(s: string, seperator: string): Date {
    const stringArray = s.split(seperator);
    const day = stringArray[0];
    const month = stringArray[1];
    const year = stringArray[2];
    return stringToDate(year + "-" + month + "-" + day);
}

export function dateToString(d: Date): string {
    return d == null ? "" : beautyDateString(d);
}

export function daysDiff(d1: Date, d2: Date): number {
    return ((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
}

export function getYearString(d1: Date): string {
    return String(d1.getFullYear());
}

// export function changeDateMonth(d: Date, a: number): Date {
//   return new Date(d.getFullYear(), d.getMonth() + a, 1);
// }
export function changeDateYearFirstDay(d: Date, a: number): Date {
    return new Date(d.getFullYear() + a, 0, 1);
}

export function changeDateMonthFirstDay(d: Date, a: number): Date {
    return new Date(d.getFullYear(), d.getMonth() + a, 1);
}

export function changeDateMonthLastDay(d: Date, a: number): Date {
    return new Date(d.getFullYear(), d.getMonth() + a + 1, 0);
}

export function changeDateMonthMiddleDay(d: Date, a: number): Date {
    return new Date(d.getFullYear(), d.getMonth() + a, 15);
}

export function prevDay(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
}

export function nextDay(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
}

export function getEachDayBetweenDays(d1: Date, d2: Date) {
    const returnDates: Date[] = [];
    for (let d3 = d1; d3.getTime() < d2.getTime(); d3 = nextDay(d3)) {
        returnDates.push(d3);
    }
    return returnDates;
}

export function getFirstDayOfYearsBetweenDays(d1: Date, d2: Date): Date[] {
    const returnDates: Date[] = [];
    for (let d3 = changeDateYearFirstDay(d1, 0); d3.getTime() < d2.getTime(); d3 = changeDateYearFirstDay(d3, 1)) {
        returnDates.push(d3);
    }
    return returnDates;
}

export function getFirstDayOfMonthsBetweenDays(d1: Date, d2: Date): Date[] {
    const returnDates: Date[] = [];
    for (let d3 = changeDateMonthFirstDay(d1, 0); d3.getTime() < d2.getTime(); d3 = changeDateMonthFirstDay(d3, 1)) {
        returnDates.push(d3);
    }
    return returnDates;
}

export interface IMonthYear {
    month: number;
    year: number;
}

export function getCountOfMonthsBetweenDates(d1: Date, d2: Date): number {
    let monthCount: number = 0;
    const d3: IMonthYear = {
        month: d1.getMonth(),
        year: d1.getFullYear()
    };

    while (d3.month !== d2.getMonth() || d3.year !== d2.getFullYear()) {
        if (d3.month === 11) {
            d3.year++;
            d3.month = 0;
        } else {
            d3.month++;
        }
        monthCount++;
    }
    return monthCount;
}

export function isDMYDateString(s: string) {
    return (s.match(/^\d\d\.\d\d.\d\d\d\d$/) !== null);
}

export const monthList = new MonthList();

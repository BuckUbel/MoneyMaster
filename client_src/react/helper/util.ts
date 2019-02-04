export function dateToDayString(date: Date): string {
  return basicDateToString(date, "-");
}

export function beautyDateString(date: Date): string {
  return date ? basicDateToString(date, ".") : "";
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

export function stringToDate(s: string): Date {
  return Date.parse(s) ? new Date(Date.parse(s)) : null;
}

export function dateToString(d: Date): string {
  return d == null ? "" : beautyDateString(d);
}

export function daysDiff(d1: Date, d2: Date): number {
  return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
}

// export function changeDateMonth(d: Date, a: number): Date {
//   return new Date(d.getFullYear(), d.getMonth() + a, 1);
// }

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
  for (let d3 = changeDateMonthFirstDay(d1, 0); d3.getTime() < d2.getTime(); d3 = nextDay(d3)) {
    returnDates.push(d3);
  }
  return returnDates;
}

export function getFirstDayOfMonthsBetweenDays(d1: Date, d2: Date): Date[] {
  const returnDates: Date[] = [];
  for (let d3 = changeDateMonthFirstDay(d1, 0); d3.getTime() < d2.getTime(); d3 = changeDateMonthFirstDay(d3, 1)) {
    returnDates.push(d3);
  }
  // for (let d3 = changeDateMonthFirstDay(d1, 0); d3.getTime() < d2.getTime(); d3 = nextDay(d3)) {
  //   returnDates.push(d3);
  // }
  return returnDates;
}

const monthNames = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember"
];
const monthShortCut = [
  "Jan.",
  "Feb.",
  "Mrz.",
  "Apr.",
  "Mai",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Okt.",
  "Nov.",
  "Dez."
];
const monthLetter = [
  "J",
  "F",
  "M",
  "A",
  "M",
  "J",
  "J",
  "A",
  "S",
  "O",
  "N",
  "D"
];

export function getMonthName(d: Date): string {
  return monthShortCut[d.getMonth()];
}

export function getMonthAndYear(d: Date): string {
  return getMonthName(d) + " " + d.getFullYear();
}

export function getStringValues(element: string, separator: string): string[] {
  return element.split(separator).map((p: string): string => {
    return p ? p.replace(/[\"]/gi, "") : "";
  });
}

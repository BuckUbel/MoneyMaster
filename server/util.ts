export function beautyDateString(date: Date): string {
  return basicDateToString(date, ".");
}

export function beautyDateTimeString(date: Date): string {
  return beautyDateString(date) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
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

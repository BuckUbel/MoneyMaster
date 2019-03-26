export class Month {
    public fullWidth: number;
    public shortWidth: number;
    public fullName: string;
    public shortName: string;
    public letter: string;

    constructor(fullWidth: number, shortWidth: number, fullName: string, shortName: string, letter: string) {
        this.fullWidth = fullWidth;
        this.shortWidth = shortWidth;
        this.fullName = fullName;
        this.shortName = shortName;
        this.letter = letter;
    }
}

//
// export const monthObjects = [
//   new Month(63, 43, "Januar", "Jan.", "J"),
//   new Month(72, 43, "Februar", "Feb.", "F"),
//   new Month(50, 43, "März", "Mrz.", "M"),
//   new Month(57, 43, "April", "Apr.", "A"),
//   new Month(43, 43, "Mai", "Mai", "M"),
//   new Month(49, 43, "Juni", "Jun.", "J"),
//   new Month(43, 43, "Juli", "Jul.", "J"),
//   new Month(85, 43, "August", "Aug.", "A"),
//   new Month(93, 43, "September", "Sep.", "S"),
//   new Month(75, 43, "Oktober", "Okt.", "O"),
//   new Month(96, 43, "November", "Nov.", "N"),
//   new Month(92, 43, "Dezember", "Dez.", "D")
// ];

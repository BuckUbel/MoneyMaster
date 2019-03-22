import {promisify} from "util";
import fs, {Stats} from "fs";
import {arrayToBookingModel, BookingModel} from "../base/model/BookingModel";

export const readdir = promisify(fs.readdir);
export const stat = promisify(fs.stat);
export const readFile = promisify(fs.readFile);

interface IFileStats {
    stats: Stats;
    path: string;
}

export async function getLastModifiedFileInDir(dir: string) {
    const filePathList = await readdir(dir);
    const fileObjectList: Stats[] = await Promise.all(filePathList.map(async (file: string) => {
        const path = dir + "/" + file;
        return await stat(path);
    }));

    const fileObjectListWithPaths: IFileStats[] = filePathList.map((filePath: string, index: number): IFileStats => {
        return {
            stats: fileObjectList[index],
            path: dir + "/" + filePath,
        };
    });

    fileObjectListWithPaths.sort((a: IFileStats, b: IFileStats): number => {
        return b.stats.ctimeMs - a.stats.ctimeMs;
    });

    return fileObjectListWithPaths[0].path;
}

export function getStringValues(element: string, separator: string): string[] {
    return element.split(separator).map((p: string): string => {
        return p ? p.replace(/[\"]/gi, "") : "";
    });
}

export interface IDifferentExportedBookings {
    addBookings: BookingModel[];
    editBookings: BookingModel[];
}

export function extractBookingsFromFile(fileContent: string, bookings: BookingModel[]): IDifferentExportedBookings {
    const elements: string[] = fileContent.split("\n");
    elements.pop();
    const categories = getStringValues(elements[0], ";");
    elements.shift();

    const newBookings = elements.map((el: string): BookingModel => {
        return arrayToBookingModel(getStringValues(el, ";"), categories);
    });

    const updateBookings: BookingModel[] = [];
    const reallyNewBookings = newBookings.filter((newBooking) => {

        return bookings.every((oldBooking: BookingModel) => {
            const bookingStatus = newBooking.equals(oldBooking);
            if (bookingStatus === "ignore") {
                return false;
            }
            if (bookingStatus === "update") {
                updateBookings.push(newBooking);
                return false;
            }
            return true;
        });
    });
    return {
        addBookings: reallyNewBookings,
        editBookings: updateBookings
    };
}

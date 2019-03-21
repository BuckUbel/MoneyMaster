"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const BookingModel_1 = require("../base/model/BookingModel");
exports.readdir = util_1.promisify(fs_1.default.readdir);
exports.stat = util_1.promisify(fs_1.default.stat);
exports.readFile = util_1.promisify(fs_1.default.readFile);
function getLastModifiedFileInDir(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePathList = yield exports.readdir(dir);
        const fileObjectList = yield Promise.all(filePathList.map((file) => __awaiter(this, void 0, void 0, function* () {
            const path = dir + "/" + file;
            return yield exports.stat(path);
        })));
        const fileObjectListWithPaths = filePathList.map((filePath, index) => {
            return {
                stats: fileObjectList[index],
                path: dir + "/" + filePath,
            };
        });
        fileObjectListWithPaths.sort((a, b) => {
            return b.stats.ctimeMs - a.stats.ctimeMs;
        });
        return fileObjectListWithPaths[0].path;
    });
}
exports.getLastModifiedFileInDir = getLastModifiedFileInDir;
function getStringValues(element, separator) {
    return element.split(separator).map((p) => {
        return p ? p.replace(/[\"]/gi, "") : "";
    });
}
exports.getStringValues = getStringValues;
function extractBookingsFromFile(fileContent, bookings) {
    const elements = fileContent.split("\n");
    elements.pop();
    const categories = getStringValues(elements[0], ";");
    elements.shift();
    const newBookings = elements.map((el) => {
        return BookingModel_1.arrayToBookingModel(getStringValues(el, ";"), categories);
    });
    const updateBookings = [];
    const reallyNewBookings = newBookings.filter((newBooking) => {
        return bookings.every((oldBooking) => {
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
exports.extractBookingsFromFile = extractBookingsFromFile;

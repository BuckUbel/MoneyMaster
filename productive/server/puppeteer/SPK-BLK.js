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
const puppeteer = require("puppeteer");
const path = require("path");
require("dotenv").config();
const today = new Date(new Date().getFullYear(), 0, 1);
const todayString = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
const waitTimeForGoto = 1000;
const waitTimeForDisplayChanging = 10000;
const waitTimeForDownload = 5000;
const homeURL = "https://www.spk-burgenlandkreis.de/de/home.html";
const bookingsURL = "https://www.spk-burgenlandkreis.de/de/home/onlinebanking/" +
    "umsaetze/umsaetze.html?n=true&stref=hnav";
const readdir = util_1.promisify(fs_1.default.readdir);
const stat = util_1.promisify(fs_1.default.stat);
const unlink = util_1.promisify(fs_1.default.unlink);
function getCSVDataFromSPKBLK(downloadPath, bank) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer.launch({
            headless: true
        });
        const page = yield browser.newPage();
        yield page.goto(homeURL);
        yield page.evaluate((username, password) => {
            const userNameLabelObject = document.getElementsByTagName("label")[0];
            const passwordLabelObject = document.getElementsByTagName("label")[1];
            const userNameLabel = userNameLabelObject.htmlFor;
            const passwordLabel = passwordLabelObject.htmlFor;
            const usernameObject = document.getElementsByName(userNameLabel)[0];
            const passwordObject = document.getElementsByName(passwordLabel)[0];
            usernameObject.value = username;
            passwordObject.value = password;
        }, bank.username, bank.password);
        yield page.evaluate(() => {
            const loginObject = document.querySelector(".login > input");
            loginObject.click();
        });
        yield page.waitForNavigation({
            waitUntil: "networkidle0"
        });
        yield page.waitFor(waitTimeForGoto);
        yield page.goto(bookingsURL);
        yield page.evaluate((ts) => {
            const firstDateLabelObject = document.getElementsByTagName("label")[2];
            const firstDateLabel = firstDateLabelObject.htmlFor;
            const firstDateObject = document.getElementsByName(firstDateLabel)[0];
            firstDateObject.value = ts;
            const refreshObject = document.getElementsByClassName("icon-if5_refresh")[0].getElementsByTagName("input")[0];
            refreshObject.click();
        }, todayString);
        yield page.waitFor(waitTimeForDisplayChanging);
        yield page._client.send("Page.setDownloadBehavior", {
            behavior: "allow",
            downloadPath
        });
        yield page.evaluate(() => {
            const exportButtonObjectList = document.getElementById("exportGroup").getElementsByTagName("ul")[0];
            exportButtonObjectList.getElementsByTagName("input")[0].click();
        });
        yield page.waitFor(waitTimeForDownload);
        yield browser.close();
    });
}
exports.getCSVDataFromSPKBLK = getCSVDataFromSPKBLK;
function testPasswordForSPKBLK(newPassword, bank) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer.launch({
            headless: true
        });
        const page = yield browser.newPage();
        yield page.goto(homeURL);
        yield page.evaluate((username, password) => {
            const userNameLabelObject = document.getElementsByTagName("label")[0];
            const passwordLabelObject = document.getElementsByTagName("label")[1];
            const userNameLabel = userNameLabelObject.htmlFor;
            const passwordLabel = passwordLabelObject.htmlFor;
            const usernameObject = document.getElementsByName(userNameLabel)[0];
            const passwordObject = document.getElementsByName(passwordLabel)[0];
            usernameObject.value = username;
            passwordObject.value = password;
        }, bank.username, newPassword);
        yield page.evaluate(() => {
            const loginObject = document.querySelector(".login > input");
            loginObject.click();
        });
        yield page.waitForNavigation({
            waitUntil: "networkidle0"
        });
        yield page.waitFor(waitTimeForGoto);
        yield page.goto(bookingsURL);
        let success = false;
        success = yield page.evaluate(() => {
            const firstDateLabelObject = document.getElementsByTagName("label")[2];
            const firstDateLabel = firstDateLabelObject.htmlFor;
            const firstDateObject = document.getElementsByName(firstDateLabel)[0];
            const refreshObject = document.getElementsByClassName("icon-if5_refresh")[0]
                .getElementsByTagName("input")[0];
            if (firstDateLabelObject && firstDateLabel && firstDateObject && refreshObject) {
                return true;
            }
        });
        yield browser.close();
        if (!success) {
            throw new Error("False Password");
        }
    });
}
exports.testPasswordForSPKBLK = testPasswordForSPKBLK;

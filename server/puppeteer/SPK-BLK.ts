import {promisify} from "util";
import fs from "fs";
import {IBankConfig} from "../HapiServer";

const puppeteer = require("puppeteer");
const path = require("path");
require("dotenv").config();

// const today: Date = new Date(new Date().getFullYear(), 0, 1);
// const todayString: string = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();

const waitTimeForGoto: number = 1000;
const waitTimeForDisplayChanging: number = 10000;
const waitTimeForDownload: number = 5000;

const homeURL: string = "https://www.spk-burgenlandkreis.de/de/home.html";
const bookingsURL: string = "https://www.spk-burgenlandkreis.de/de/home/onlinebanking/" +
    "umsaetze/umsaetze.html?n=true&stref=hnav";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);

export async function getCSVDataFromSPKBLK(downloadPath: string, bank: IBankConfig) {

    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto(homeURL);

    await page.evaluate((username: string, password: string) => {
        const userNameLabelObject: any = document.getElementsByTagName("label")[0];
        const passwordLabelObject: any = document.getElementsByTagName("label")[1];
        const userNameLabel: string = userNameLabelObject.htmlFor;
        const passwordLabel: string = passwordLabelObject.htmlFor;
        const usernameObject: any = document.getElementsByName(userNameLabel)[0];
        const passwordObject: any = document.getElementsByName(passwordLabel)[0];
        usernameObject.value = username;
        passwordObject.value = password;
    }, bank.username, bank.password);

    await page.evaluate(() => {
        const loginObject: any = document.querySelector(".login > input");
        loginObject.click();
    });

    await page.waitForNavigation({
        waitUntil: "networkidle0"
    });

    await page.waitFor(waitTimeForGoto);

    await page.goto(bookingsURL);

    await page.waitFor(waitTimeForDisplayChanging);

    await page._client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath
    });

    await page.evaluate(() => {
        const exportButtonObjectList: any = document.getElementsByClassName("exportable")[0];
        exportButtonObjectList.getElementsByTagName("input")[0].click();
    });

    await page.waitFor(waitTimeForDownload);

    await browser.close();
}

export async function testPasswordForSPKBLK(newPassword: string, bank: IBankConfig) {

    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto(homeURL);

    await page.evaluate((username: string, password: string) => {
        const userNameLabelObject: any = document.getElementsByTagName("label")[0];
        const passwordLabelObject: any = document.getElementsByTagName("label")[1];
        const userNameLabel: string = userNameLabelObject.htmlFor;
        const passwordLabel: string = passwordLabelObject.htmlFor;
        const usernameObject: any = document.getElementsByName(userNameLabel)[0];
        const passwordObject: any = document.getElementsByName(passwordLabel)[0];
        usernameObject.value = username;
        passwordObject.value = password;
    }, bank.username, newPassword);

    await page.evaluate(() => {
        const loginObject: any = document.querySelector(".login > input");
        loginObject.click();
    });

    await page.waitForNavigation({
        waitUntil: "networkidle0"
    });

    await page.waitFor(waitTimeForGoto);

    await page.goto(bookingsURL);

    let success: boolean = false;

    success = await page.evaluate(() => {
        const firstDateLabelObject: any = document.getElementsByTagName("label")[2];
        const firstDateLabel: string = firstDateLabelObject.htmlFor;
        const firstDateObject: any = document.getElementsByName(firstDateLabel)[0];
        const refreshObject: any = document.getElementsByClassName("icon-if5_refresh")[0]
            .getElementsByTagName("input")[0];
        if (firstDateLabelObject && firstDateLabel && firstDateObject && refreshObject) {
            return true;
        }
    });

    await browser.close();

    if (!success) {
        throw new Error("False Password");
    }
}

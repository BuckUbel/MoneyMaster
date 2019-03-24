import {IDatabase} from "../../database";
import {
    IShortDescriptionDatabase,
    shortDescriptionFields,
    ShortDescriptionModel
} from "../../../base/model/ShortDescriptionModel";

export class ShortDescription implements IShortDescriptionDatabase {

    public id: number;
    public originalContent: string;
    public replaceContent: string;

    [key: string]: any;

    public constructor(object: ShortDescriptionModel) {
        this.id = object.id;
        this.originalContent = object.originalContent;
        this.replaceContent = object.replaceContent;
    }
}

export async function loadAllShortDescriptionsFromDB(db: IDatabase, limit?: number) {

    const rowNamesArray = Object.keys(shortDescriptionFields).map((key) => {
        return "" + shortDescriptionFields[key].fieldName + " as " + key;
    });

    const rowNames = rowNamesArray.join(", ");

    let queryString = (
        "SELECT " + rowNames + " " +
        "FROM " + db.config.tableNames.shortDescriptions + " m "
    );

    if (limit) {
        queryString += "LIMIT " + limit + " ";
    }

    return await db.sqlQuery(queryString);
}

export async function insertAShortDescription(db: IDatabase, accounts: ShortDescriptionModel[]) {

    const rowNamesArray = Object.keys(shortDescriptionFields).reduce((filtered: any[], key) => {
        if (key !== "id") {
            filtered.push(shortDescriptionFields[key].fieldName);
        }
        return filtered;
    }, []);
    const rowNames = rowNamesArray.join(", ");

    const bookingStringArray: string[] = accounts.map((account): string => {
        const newBooking = new ShortDescription(account);
        const valueArray = Object.keys(newBooking).reduce((filtered: any[], key) => {
            if (key !== "id") {
                filtered.push(newBooking[key]);
            }
            return filtered;
        }, []);

        return "('" + valueArray.join("', '") + "')";
    });

    const values = bookingStringArray.join(", ");

    const queryString = (
        "INSERT INTO " + db.config.tableNames.shortDescriptions + " (" + rowNames + ") VALUES " + values + ""
    );
    return await db.sqlQuery(queryString);
}

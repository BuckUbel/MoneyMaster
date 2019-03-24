import {IDatabase} from "../../database";
import {categoryFields, CategoryModel, ICategoryDatabase} from "../../../base/model/CategoryModel";

export class Category implements ICategoryDatabase {

    public id: number;
    public name: string;
    public description: string;
    public color: string;
    public isStandard: number;

    [key: string]: any;

    public constructor(object: CategoryModel) {
        this.id = object.id;
        this.name = object.name;
        this.description = object.description;
        this.color = object.color;
        this.isStandard = Number(object.isStandard);
    }
}

export async function loadAllCategoriesFromDB(db: IDatabase, limit?: number) {

    const rowNamesArray = Object.keys(categoryFields).map((key) => {
        return "" + categoryFields[key].fieldName + " as " + key;
    });

    const rowNames = rowNamesArray.join(", ");

    let queryString = (
        "SELECT " + rowNames + " " +
        "FROM " + db.config.tableNames.categories + " m "
    );

    if (limit) {
        queryString += "LIMIT " + limit + " ";
    }

    return await db.sqlQuery(queryString);
}

export async function insertACategory(db: IDatabase, accounts: CategoryModel[]) {

    const rowNamesArray = Object.keys(categoryFields).reduce((filtered: any[], key) => {
        if (key !== "id") {
            filtered.push(categoryFields[key].fieldName);
        }
        return filtered;
    }, []);
    const rowNames = rowNamesArray.join(", ");

    const bookingStringArray: string[] = accounts.map((account): string => {
        const newBooking = new Category(account);
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
        "INSERT INTO " + db.config.tableNames.categories + " (" + rowNames + ") VALUES " + values + ""
    );
    return await db.sqlQuery(queryString);
}

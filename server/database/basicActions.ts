import {IDatabase} from "../database";
import {createEntityForDB, IDatabaseClass, IDatabaseFields, IEntityClass} from "../../base/helper/Entity";

export async function loadAllEntitiesFromDB(
    db: IDatabase,
    tableName: string,
    fields: IDatabaseFields,
    limit?: number
) {

    const rowNamesArray = Object.keys(fields).map((key) => {
        return "" + fields[key].fieldName + " as " + key;
    });

    const rowNames = rowNamesArray.join(", ");

    let queryString = (
        "SELECT " + rowNames + " " +
        "FROM " + tableName + " m "
    );

    if (limit) {
        queryString += "LIMIT " + limit + " ";
    }
    return await db.sqlQuery(queryString);
}

export async function loadOneEntityFromDB(
    db: IDatabase,
    tableName: string,
    fields: IDatabaseFields,
    id: number,
    limit?: number
) {

    const rowNamesArray = Object.keys(fields).map((key) => {
        return "" + fields[key].fieldName + " as " + key;
    });

    const rowNames = rowNamesArray.join(", ");

    let queryString = (
        "SELECT " + rowNames + " " +
        "FROM " + tableName + " m " +
        "WHERE m.id=" + id + " "
    );

    if (limit) {
        queryString += "LIMIT " + limit + " ";
    }
    return await db.sqlQuery(queryString);
}

export async function insertEntities(
    db: IDatabase,
    tableName: string,
    fields: IDatabaseFields,
    entities: IEntityClass[]
) {

    const rowNamesArray = Object.keys(fields).reduce((filtered: any[], key) => {
        if (key !== "id") {
            filtered.push(fields[key].fieldName);
        }
        return filtered;
    }, []);
    const rowNames = rowNamesArray.join(", ");

    const entityStringArray: string[] = entities.map((entity: IEntityClass): string => {
        const databaseEntity: IDatabaseClass = createEntityForDB(entity);
        const valueArray = Object.keys(fields).reduce((filtered: any[], key) => {
            if (key !== "id") {
                filtered.push(databaseEntity[key]);
            }
            return filtered;
        }, []);

        return "('" + valueArray.join("', '") + "')";
    });

    const values = entityStringArray.join(", ");

    const queryString = (
        "INSERT INTO " + tableName + " (" + rowNames + ") VALUES " + values + ""
    );
    return await db.sqlQuery(queryString);
}

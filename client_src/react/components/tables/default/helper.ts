import {ISelectorResponse} from "../../core/simple/Selector";
import {basicStringDMYToDate, isDMYDateString} from "../../../../../base/helper/time/dateHelper";
import * as React from "react";
import {TypesAsString} from "../../../../../base/helper/util";

export interface IObjectWithEntityProp {
    entity: any;
}

export interface IBaseData {
    id: number;

    [key: string]: any;
}

export interface IRow {
    id: number;
    content: {
        [key: string]: any;
    };
}

export interface IFilterOptions {
    stringCut?: number;
}

export interface ICol {
    key?: string;
    name: string;
    type: TypesAsString;
    hidden?: boolean;
    sorting?: boolean;
    filtering?: boolean;
    filterOptions?: IFilterOptions;
    style?: React.CSSProperties;
}

export function eliminateByFilterValues(data: IRow[], cols: ICol[], allFilter: ISelectorResponse[]): IRow[] {
    return data.filter((row: IRow) => {
        let isFiltered = false;
        allFilter.forEach((filter: ISelectorResponse) => {
            const currentCol: ICol = cols[Number(filter.name)];
            if (currentCol.filtering === false) {
                return true;
            }
            if (isFiltered) {
                return !isFiltered;
            } else {
                if (currentCol.type === "number") {
                    isFiltered = (Number(row.content[filter.name]) !== Number(filter.value));
                }
                if (currentCol.type === "date") {
                    isFiltered = (row.content[filter.name] !== filter.value);
                }
                if (currentCol.type === "string") {
                    isFiltered = !row.content[filter.name].startsWith(filter.value);
                }
            }
        });

        return !isFiltered;
    });
}


export function defaultRowCompare(index: number) {
    return (a: IRow, b: IRow) => {
        const typeOfVar = typeof a.content[index];
        if (typeOfVar === "boolean") {
            const elementA: boolean = a.content[index];
            const elementB: boolean = b.content[index];
            return elementA === elementB ? 0 : elementA ? 1 : -1;
        }
        if (typeOfVar === "string") {
            const isDate = isDMYDateString(a.content[index]);
            if (isDate) {
                const elementA: number = a.content[index] ? basicStringDMYToDate(a.content[index], ".").getTime() : 0;
                const elementB: number = b.content[index] ? basicStringDMYToDate(b.content[index], ".").getTime() : 0;
                return elementA - elementB;
            } else {
                const elementA: string = a.content[index];
                const elementB: string = b.content[index];
                return elementA.localeCompare(elementB);
            }
        }
        if (typeOfVar === "number") {
            const elementA: number = a.content[index];
            const elementB: number = b.content[index];
            return elementA - elementB;
        }
        if (typeOfVar === "object") {
            const elementA: any = a.content[index];
            const elementB: any = b.content[index];
            if (elementA.hasOwnProperty("props")) {
                if (elementA.props.hasOwnProperty("percentage")) {
                    return elementA.props.percentage - elementB.props.percentage;
                }
            }
        }
        return 0;
    };
}
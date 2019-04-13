import * as React from "react";
import Selector, {ISelectorResponse} from "../../core/simple/Selector";
import {ChangeEvent} from "react";
import {ReactNode} from "react";
import {defaultCompare, uniqueArray} from "../../../../../base/helper/util";
import {Button, Grid} from "@material-ui/core";
import {ICol, IRow} from "./helper";

export interface ITableFilterProps {
    rowData: IRow[];
    headerData: ICol[];
    onFilter: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void;
    resetFilter?: () => void;
    filterValues: ISelectorResponse[];
}

export interface ITableFilterState {
    filterObjects: JSX.Element[];
    colData: IRow[][];
}

const defaultState: ITableFilterState = {
    filterObjects: [],
    colData: []
};

export default class TableFilter extends React.Component<ITableFilterProps, ITableFilterState> {

    public static getDerivedStateFromProps(newProps: ITableFilterProps, oldState: ITableFilterState): ITableFilterState {
        const {rowData, headerData, onFilter, filterValues} = newProps;

        const colData = headerData.map((col: ICol, index: number): IRow[] => {
            if (col.filtering) {
                let orderDirection = "asc";
                let filterFunction = (a: any) => {
                    if (a === "") {
                        return null;
                    }
                    return a;
                };
                if (col.type === "string") {
                    filterFunction = (a: any) => {
                        const b = String(a);
                        let cutLength = 1;
                        if (col.filterOptions) {
                            if (col.filterOptions.stringCut) {
                                cutLength = col.filterOptions.stringCut;
                                if (col.filterOptions.stringCut === -1) {
                                    cutLength = b.length;
                                }
                            }
                        }
                        return b ? b.slice(0, cutLength) : null;
                    };
                }
                if (col.type === "number") {
                    filterFunction = (a: string) => {
                        return Number(a);
                    };
                    orderDirection = "desc";
                }
                if (col.type === "date") {
                    orderDirection = "desc";

                }
                const returnData = rowData.map((row: IRow) => {
                    return filterFunction(row.content[index]);
                }).filter(uniqueArray).sort(defaultCompare);

                if (orderDirection === "desc") {
                    returnData.reverse();
                }
                return returnData;
            }
        });

        const filter = headerData.map((col: ICol, index: number): JSX.Element | null => {
            if (col.filtering) {
                let value = "";
                if (filterValues.length > 0) {
                    const valueToFilter = filterValues.find((filterValue) => {
                        return (filterValue.name === String(index));
                    });
                    if (valueToFilter) {
                        value = valueToFilter.value;
                    }
                }
                return (
                    <Selector
                        keyValue={String(index)}
                        value={value}
                        onChange={onFilter}
                        valueArray={colData[index]}
                        emptyValue={"Filter ausschalten"}
                        helpText={col.name + " wählen"}
                    />);
            }
            return null;
        });
        return ({
            filterObjects: filter,
            colData
        });
    }

    public state: ITableFilterState = defaultState;

    constructor(props: ITableFilterProps) {
        super(props);
    }

    public render() {

        const {resetFilter} = this.props;
        const {filterObjects} = this.state;
        return (

            <React.Fragment>
                <form>

                    <Grid item xs={12} container spacing={16} alignItems={"center"} justify={"space-between"}>
                        <Grid item xs={10} container spacing={8} alignItems={"center"} justify={"flex-start"}>
                            {filterObjects.map((filter, index) => {
                                if (filter) {
                                    return (
                                        <Grid item xs={3} key={index}>
                                            {filter}
                                        </Grid>
                                    );
                                }
                            })}
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                onClick={resetFilter}
                                aria-label={"resetFilter"}
                                size={"medium"}
                                variant={"contained"}
                                color={"primary"}>
                                {"Filter zurücksetzen"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </React.Fragment>
        );
    }
}

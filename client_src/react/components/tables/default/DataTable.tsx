import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TablePager from "./pager/TablePager";
import {ChangeEvent} from "react";
import SortTableHeader from "./SortTableHeader";
import {SortDirection} from "@material-ui/core/TableCell/TableCell";
import TableFilter from "./TableFilter";
import {ReactNode} from "react";
import {ISelectorResponse} from "../../core/simple/Selector";
import {Card, CardContent, Drawer, Grid} from "@material-ui/core";
import {defaultRowCompare, eliminateByFilterValues, IBaseData, ICol, IObjectWithEntityProp, IRow} from "./helper";

export interface IDataTableProps {
    rowData: IRow[];
    colData: ICol[];
    noFilter?: boolean;
    baseData?: IBaseData[];
    baseClass?: React.ComponentType<IObjectWithEntityProp>;
    defaultSortRow?: number;
}

export interface IDataTableState {
    order: SortDirection;
    orderBy: number;
    currentPage: number;
    rowsPerPage: number;
    filterValues: ISelectorResponse[];
    clickedRow: number;
    currentFilteredData: IRow[];
    currentDisplayData: IRow[];
}

export const defaultState: IDataTableState = {
    order: "desc",
    orderBy: -1,
    currentPage: 0,
    rowsPerPage: 10,
    filterValues: [],
    clickedRow: -1,
    currentFilteredData: [],
    currentDisplayData: [],
};
export default class DataTable extends React.Component<IDataTableProps, IDataTableState> {

    public static getDerivedStateFromProps(newProps: IDataTableProps, oldState: IDataTableState): IDataTableState {
        const {defaultSortRow, rowData, colData} = newProps;
        const {order, orderBy, currentPage, rowsPerPage, filterValues, clickedRow} = oldState;

        const newOrderBy = (orderBy === -1) ? defaultSortRow ? defaultSortRow : 0 : orderBy;

        const newFilteredData = eliminateByFilterValues(rowData, colData, filterValues);
        const sortData = newFilteredData.sort(defaultRowCompare(newOrderBy));
        if (order === "desc") {
            sortData.reverse();
        }
        const newDisplayData = sortData.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

        return ({
            order,
            orderBy: newOrderBy,
            currentPage,
            rowsPerPage,
            filterValues,
            clickedRow,
            currentFilteredData: newFilteredData,
            currentDisplayData: newDisplayData
        });

    }

    public state: IDataTableState = defaultState;

    constructor(props: IDataTableProps) {
        super(props);
        this.onPageChange = this.onPageChange.bind(this);
        this.onRowsPerPageChange = this.onRowsPerPageChange.bind(this);
        this.onSort = this.onSort.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
        this.clickOnRow = this.clickOnRow.bind(this);
    }

    public clickOnRow(id: number) {
        return () => {
            this.setState({clickedRow: id});
        };
    }

    public onPageChange(page: number) {
        this.setState({currentPage: page});
    }

    public onRowsPerPageChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        this.setState({
            currentPage: defaultState.currentPage,
            rowsPerPage: Number(event.target.value)
        });
    }

    public onSort(event: React.MouseEvent<HTMLElement, MouseEvent>, property: number) {
        const orderBy = property;
        let order: SortDirection = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }
        this.setState({order, orderBy});
    }

    public resetFilter() {
        this.setState({filterValues: []});
    }

    public onFilter(event: ChangeEvent<HTMLSelectElement>, child: ReactNode) {
        let isNew = true;
        const newFilterValues = this.state.filterValues.map((filterValue: ISelectorResponse) => {
            if (filterValue.name === event.target.name) {
                isNew = false;
                return event.target;
            }
            return filterValue;
        });
        if (isNew) {
            newFilterValues.push(event.target);
        }
        const newFilterValuesWithoutEmptys = newFilterValues.filter((filter) => {
            return (filter.value !== "");
        });
        this.setState({
            filterValues: newFilterValuesWithoutEmptys
        });
    }

    public render() {

        const {colData, baseData, baseClass, noFilter} = this.props;
        const {
            order, orderBy, currentPage, rowsPerPage,
            filterValues, clickedRow, currentDisplayData, currentFilteredData
        } = this.state;

        const hiddenElement = clickedRow !== -1 ? baseData.find((d: IBaseData) => {
            return (d.id === clickedRow);
        }) : null;

        return (
            <React.Fragment>
                <Grid container spacing={40}>
                    {!noFilter && <Grid item xs={12}>
                      <Card>
                        <CardContent>
                          <TableFilter
                            rowData={currentFilteredData}
                            headerData={colData}
                            onFilter={this.onFilter}
                            filterValues={filterValues}
                            resetFilter={this.resetFilter}
                          />
                        </CardContent>
                      </Card>
                    </Grid>}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Table>
                                    <SortTableHeader
                                        colData={colData}
                                        order={order}
                                        orderBy={orderBy}
                                        sortHandler={this.onSort}
                                    />
                                    <TableBody>
                                        {currentDisplayData.map((row, index) => {
                                            return (
                                                <TableRow
                                                    key={index}
                                                    hover={true}
                                                    onClick={this.clickOnRow(row.id)}
                                                >
                                                    {Object.keys(row.content).map((key: string, cellIndex: number) => {
                                                        if (!colData[cellIndex].hidden) {
                                                            let cellContent = row.content[key];
                                                            if (colData[cellIndex].type === "boolean") {
                                                                cellContent = row.content[key] ?
                                                                    String.fromCharCode(10003) :
                                                                    String.fromCharCode(9747);
                                                            }
                                                            return (
                                                                <TableCell key={key}>{cellContent}</TableCell>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <TablePager
                                    count={currentFilteredData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={currentPage}
                                    onPageChange={this.onPageChange}
                                    onRowsPerPageChange={this.onRowsPerPageChange}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {clickedRow > -1 &&
                <Drawer anchor="right" open={true} onClose={this.clickOnRow(-1)}
                        PaperProps={{style: {maxWidth: "40%"}}}>
                    {React.createElement(baseClass, {entity: hiddenElement})}
                </Drawer>}
            </React.Fragment>
        );
    }
}

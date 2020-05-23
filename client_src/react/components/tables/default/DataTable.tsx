import * as React from "react";
import {ChangeEvent, ReactNode} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TablePager from "./pager/TablePager";
import SortTableHeader from "./SortTableHeader";
import {SortDirection} from "@material-ui/core/TableCell/TableCell";
import TableFilter from "./TableFilter";
import {ISelectorResponse} from "../../core/simple/Selector";
import {Card, CardContent, Checkbox, Drawer, Grid, Toolbar, Typography} from "@material-ui/core";
import {
    defaultRowCompare,
    eliminateByFilterValues,
    getColoredString,
    getColorOnBaseOfValue,
    IBaseData,
    ICol,
    IObjectWithEntityProp,
    IRow
} from "./helper";
import {RenderThings} from "../../../helper/util";

export type SelectedActions = (selectedItems: number[], afterSubmit: () => void) => RenderThings[];

export interface IDataTableProps {
    rowData: IRow[];
    colData: ICol[];
    noFilter?: boolean;
    withCheckboxes?: boolean;
    baseData?: IBaseData[];
    baseClass?: React.ComponentType<IObjectWithEntityProp>;
    defaultSortRow?: number;
    selectedActions?: SelectedActions;
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
    selectedItems: number[];
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
    selectedItems: [],
};
export default class DataTable extends React.Component<IDataTableProps, IDataTableState> {

    public static getDerivedStateFromProps(newProps: IDataTableProps, oldState: IDataTableState): IDataTableState {
        const {defaultSortRow, rowData, colData} = newProps;
        const {order, orderBy, currentPage, rowsPerPage, filterValues, clickedRow, selectedItems} = oldState;

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
            currentDisplayData: newDisplayData,
            selectedItems,
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
        this.selectAllItems = this.selectAllItems.bind(this);
    }

    public selectAllItems(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            this.setState((prevState) =>
                ({selectedItems: prevState.currentFilteredData.map((row: IRow) => row.id)})
            );
        } else {
            this.setState((prevState) => ({selectedItems: []}));
        }
    }

    public clickOnRow(id: number) {
        if (this.props.withCheckboxes) {
            return () => {
                this.setState((prevState) => {
                    const newSelectedItems = prevState.selectedItems;
                    const indexNumber = prevState.selectedItems.indexOf(id);
                    if (indexNumber === -1) {
                        newSelectedItems.push(id);
                    } else {
                        newSelectedItems.splice(indexNumber, 1);
                    }
                    return ({selectedItems: newSelectedItems});
                });
            };
        }
        return () => {
            this.setState((prevState) => ({clickedRow: id}));
        };
    }

    public onPageChange(page: number) {
        this.setState((prevState) => ({currentPage: page}));
    }

    public onRowsPerPageChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        this.setState((prevState) => ({
            currentPage: defaultState.currentPage,
            rowsPerPage: Number(event.target.value)
        }));
    }

    public onSort(event: React.MouseEvent<HTMLElement, MouseEvent>, property: number) {
        const orderBy = property;
        let order: SortDirection = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }
        this.setState((prevState) => ({order, orderBy}));
    }

    public resetFilter() {
        this.setState((prevState) => ({filterValues: []}));
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
        this.setState((prevState) => ({
            filterValues: newFilterValuesWithoutEmptys
        }));
    }

    public render() {

        const {colData, baseData, baseClass, noFilter, withCheckboxes, selectedActions} = this.props;
        const {
            order, orderBy, currentPage, rowsPerPage,
            filterValues, clickedRow, currentDisplayData, currentFilteredData,
            selectedItems
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
                                {withCheckboxes &&
                                <Toolbar>
                                  <Grid container justify={"space-between"}>
                                    <Grid item xs={5}>
                                        {selectedItems.length > 0 ?
                                            <Typography variant="subtitle1">
                                                {selectedItems.length} Elemente ausgewählt
                                            </Typography> :
                                            <Typography color="inherit" variant="subtitle1">
                                                Keine Elemente sind ausgewählt
                                            </Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={7} container justify={"flex-end"}>
                                        {selectedActions(selectedItems, () => {
                                            this.setState((prevState) => ({
                                                selectedItems: []
                                            }));
                                        }).map(
                                            (currentAction: RenderThings, index: number) => {
                                                return (
                                                    <Grid item xs={1} container justify={"flex-end"} key={index}>
                                                        <Grid item xs={12}>
                                                            {currentAction}
                                                        </Grid>
                                                    </Grid>);
                                            })}
                                    </Grid>

                                  </Grid>
                                </Toolbar>}
                                <Table>
                                    <SortTableHeader
                                        colData={colData}
                                        order={order}
                                        orderBy={orderBy}
                                        sortHandler={this.onSort}
                                        withCheckboxes={withCheckboxes}
                                        handleSelectAll={this.selectAllItems}
                                        anythingIsSelected={
                                            selectedItems.length > 0 &&
                                            selectedItems.length < currentFilteredData.length
                                        }
                                    />
                                    <TableBody>
                                        {currentDisplayData.map((row, index) => {
                                            return (
                                                <TableRow
                                                    key={index}
                                                    hover={true}
                                                    onClick={this.clickOnRow(row.id)}
                                                >
                                                    {withCheckboxes &&
                                                    <TableCell key={1} padding={"checkbox"}>
                                                      <Checkbox checked={selectedItems.indexOf(row.id) !== -1}/>
                                                    </TableCell>}

                                                    {Object.keys(row.content).map((key: string, cellIndex: number) => {
                                                        if (!colData[cellIndex].hidden) {
                                                            let cellContent = row.content[key];
                                                            if (colData[cellIndex].type === "boolean") {
                                                                cellContent = row.content[key] ?
                                                                    String.fromCharCode(10003) :
                                                                    String.fromCharCode(9747);
                                                            }
                                                            if (colData[cellIndex].type === "number" &&
                                                                colData[cellIndex].styleOptions &&
                                                                colData[cellIndex].styleOptions.coloredNumbers) {
                                                                cellContent =
                                                                    <p style={getColorOnBaseOfValue(row.content[key])}>
                                                                        {getColoredString(row.content[key])}
                                                                    </p>;
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
                {hiddenElement &&
                <Drawer anchor="right" open={true} onClose={this.clickOnRow(-1)}
                        PaperProps={{style: {minWidth: "40%", maxWidth: "50%"}}}>
                    {React.createElement(baseClass, {entity: hiddenElement})}
                </Drawer>}
            </React.Fragment>
        );
    }
}

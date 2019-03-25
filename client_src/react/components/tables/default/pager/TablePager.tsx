import * as React from "react";
import {Grid, Typography} from "@material-ui/core";
import {ChangeEvent} from "react";
import TablePagerActions from "./TablePagerActions";
import Selector from "../../../core/simple/Selector";

export interface ITablePagerProps {
    count: number;
    rowsPerPage: number;
    page: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (event: ChangeEvent) => void;
}

export interface ITablePagerState {
    from: number;
    to: number;
}

export const defaultState: ITablePagerState = {
    from: 0,
    to: 0,
};

export default class TablePager extends React.Component<ITablePagerProps, ITablePagerState> {

    public static getDerivedStateFromProps(newProps: ITablePagerProps, oldState: ITablePagerState): ITablePagerState {

        const {count, rowsPerPage, page} = newProps;

        let newFrom = 0;
        let newTo = 0;

        if (count > 0) {
            newFrom = 1 + (rowsPerPage * page);
            const preNewTo: number = rowsPerPage * (page + 1);
            newTo = Math.min(preNewTo, count);
        }

        return {
            from: newFrom,
            to: newTo
        };
    }

    public state = defaultState;

    constructor(props: ITablePagerProps) {
        super(props);
        this.pageHandlerPagination = this.pageHandlerPagination.bind(this);
    }

    public pageHandlerPagination(event: React.MouseEvent<HTMLButtonElement>, page: number) {
        this.props.onPageChange(page);
    }

    public render() {
        const {count, rowsPerPage, page, onRowsPerPageChange} = this.props;
        const {from, to} = this.state;

        return (
            <React.Fragment>
                <Grid container item xs={12} justify={"flex-end"} alignItems={"center"} className={"tablePager"}>
                    <Grid item lg={4} md={12}/>
                    <Grid item lg={4} md={12} container justify={"center"} alignItems={"center"}>
                        <TablePagerActions onChangePage={this.pageHandlerPagination} count={count}
                                           rowsPerPage={rowsPerPage}
                                           page={page}/>
                    </Grid>
                    <Grid item lg={4} md={12} container justify={"flex-end"} alignItems={"center"}>
                        <Grid item xs={3}>
                            <Typography component={"p"}
                                        style={{textAlign: "center"}}>{from + " - " + to + " von " + count}</Typography>
                        </Grid>
                        <Grid item xs={4} style={{display: "inline-flex"}}>
                            <Selector value={rowsPerPage} onChange={onRowsPerPageChange} valueArray={[10, 25, 50, 100]}
                                      helpText={""}/>
                            <Typography className={"centeringGrid"} component={"p"}>Zeilen pro Seite</Typography>
                        </Grid>
                        <Grid item xs={5}/>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

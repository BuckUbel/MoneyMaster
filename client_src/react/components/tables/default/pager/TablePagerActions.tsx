import * as React from "react";
import {Grid, IconButton} from "@material-ui/core";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import PageSelector from "./PageSelector";
import {ChangeEvent} from "react";
import {ReactNode} from "react";

export interface ITablePagerActionsProps {

    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, page: number) => void;
    count: number;
    rowsPerPage: number;
    page: number;
}

export interface ITablePagerActionsState {
}

const defaultState: ITablePagerActionsState = {};
export default class TablePagerActions extends React.Component<ITablePagerActionsProps, ITablePagerActionsState> {

    public state: ITablePagerActionsState = defaultState;

    constructor(props: ITablePagerActionsProps) {
        super(props);
        this.handleFirstPageButtonClick = this.handleFirstPageButtonClick.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
        this.handleLastPageButtonClick = this.handleLastPageButtonClick.bind(this);
        this.pageHandlerPageSelector = this.pageHandlerPageSelector.bind(this);
    }

    public handleFirstPageButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.onChangePage(event, 0);
    }

    public handleBackButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.onChangePage(event, this.props.page - 1);
    }

    public handleNextButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.onChangePage(event, this.props.page + 1);
    }

    public handleLastPageButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    }

    public pageHandlerPageSelector(event: ChangeEvent<HTMLSelectElement>, child: ReactNode) {
        this.props.onChangePage(null, Number(event.target.value) - 1);
    }

    public render() {
        const {count, page, rowsPerPage} = this.props;
        return (
            <React.Fragment>
                <Grid item container spacing={8} justify={"center"}>
                    <Grid className={"centeringGrid"} item xs={1}>
                        <IconButton
                            onClick={this.handleFirstPageButtonClick}
                            disabled={page === 0}
                            aria-label="First Page"
                        >
                            <FirstPageIcon/>
                        </IconButton>
                    </Grid>
                    <Grid className={"centeringGrid"} item xs={1}>
                        <IconButton
                            onClick={this.handleBackButtonClick}
                            disabled={page === 0}
                            aria-label="Previous Page"
                        >
                            <KeyboardArrowLeft/>
                        </IconButton>
                    </Grid>
                    <Grid className={"centeringGrid"} item xs={2}>
                        <PageSelector
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={this.pageHandlerPageSelector}
                        />
                    </Grid>
                    <Grid className={"centeringGrid"} item xs={1}>
                        <IconButton
                            onClick={this.handleNextButtonClick}
                            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                            aria-label="Next Page"
                        >
                            <KeyboardArrowRight/>
                        </IconButton>
                    </Grid>
                    <Grid className={"centeringGrid"} item xs={1}>
                        <IconButton
                            onClick={this.handleLastPageButtonClick}
                            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                            aria-label="Last Page"
                        >
                            <LastPageIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

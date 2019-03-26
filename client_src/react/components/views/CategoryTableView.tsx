import * as React from "react";
import Button from "@material-ui/core/Button";
import {Divider, Grid, Typography} from "@material-ui/core";
import CategoryTable from "../tables/CategoryTable";
import {CategoryModel, ICategoryIdentity} from "../../../../base/model/CategoryModel";

export interface ICategoryViewProps {
    categories: CategoryModel[];
    fetchAllCategories: () => Promise<any>;
    addCategories: (categories: ICategoryIdentity[]) => Promise<any>;
    editCategories: (categories: ICategoryIdentity[]) => Promise<any>;
}

export interface ICategoryViewState {
}

const defaultState: ICategoryViewState = {};

export default class CategoryTableView extends React.Component<ICategoryViewProps, ICategoryViewState> {

    public state: ICategoryViewState = defaultState;

    constructor(props: ICategoryViewProps) {
        super(props);
        this.loadForTable = this.loadForTable.bind(this);
        this.resetMonth = this.resetMonth.bind(this);
    }

    public componentDidMount() {
        this.loadForTable();
    }

    public loadForTable() {
        this.props.fetchAllCategories()
            .then(() => {
                    console.log("Success");
                },
            )
            .catch(() => {
                console.log("Error");
            });
    }

    public resetMonth() {
        this.setState(defaultState);
    }

    public render() {
        const {categories} = this.props;

        return (
            <Grid item xs={12} container spacing={24}>
                <Grid key={1} item xs={12} container spacing={16}>
                    <Grid item key={1}>
                        <Button onClick={this.loadForTable} color={"primary"} variant={"contained"}> Tabelle
                            laden</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} key={2}>
                    <Divider variant={"middle"}/>
                </Grid>
                <Grid item xs={12} container spacing={32} key={3}>
                    <CategoryTable categories={categories}/>
                </Grid>
            </Grid>
        );
    }
}

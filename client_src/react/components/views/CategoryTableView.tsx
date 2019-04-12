import * as React from "react";
import {Divider, Grid} from "@material-ui/core";
import CategoryTable from "../tables/CategoryTable";
import {CategoryModel, ICategoryIdentity} from "../../../../base/model/CategoryModel";
import AddCategoryDialog from "../dialogs/AddCategoryDialog";

export interface ICategoryViewProps {
    categories: CategoryModel[];
    addCategory: (categories: ICategoryIdentity) => Promise<any>;
    editCategory: (categories: ICategoryIdentity) => Promise<any>;
}

export interface ICategoryViewState {
}

const defaultState: ICategoryViewState = {};

export default class CategoryTableView extends React.Component<ICategoryViewProps, ICategoryViewState> {

    public state: ICategoryViewState = defaultState;

    constructor(props: ICategoryViewProps) {
        super(props);
        this.resetMonth = this.resetMonth.bind(this);
    }

    public resetMonth() {
        this.setState(defaultState);
    }

    public render() {
        const {categories, addCategory} = this.props;

        return (
            <Grid item xs={12} container spacing={24}>
                <Grid container item xs={12} key={1}>
                    <Grid item xs={2}>
                        <AddCategoryDialog submit={addCategory}/>
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

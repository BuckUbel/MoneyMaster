import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {load} from "../../api";
import {IRootState} from "../../store";
import {categoryActions, CategoryModel, ICategoryIdentity} from "../../../../base/model/CategoryModel";
import CategoryTableView from "../../components/views/CategoryTableView";
import * as React from "react";

export interface ICategoryViewContainerProps {
    categories: CategoryModel[];
    fetchAllCategories: () => Promise<any>;
    addCategories: (categories: ICategoryIdentity[]) => Promise<any>;
    editCategories: (categories: ICategoryIdentity[]) => Promise<any>;
}

export interface ICategoryViewContainerState {
}

export const defaultState: ICategoryViewContainerState = {};

class CategoryViewContainer extends React.Component<ICategoryViewContainerProps, ICategoryViewContainerState> {


    public state: ICategoryViewContainerState = defaultState;

    public constructor(props: ICategoryViewContainerProps) {
        super(props);
        this.addCategory = this.addCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
    }

    public async addCategory(category: ICategoryIdentity) {
        try {
            await this.props.addCategories([category]);
            await this.props.fetchAllCategories();
        } catch (error) {
            console.error(error);
        }
    }

    public async editCategory(category: ICategoryIdentity) {
        try {
            await this.props.editCategories([category]);
        } catch (error) {
            console.error(error);
        }
    }

    public render() {
        const {categories} = this.props;
        return (
            <CategoryTableView categories={categories}
                               addCategory={this.addCategory}
                               editCategory={this.editCategory}
            />
        );
    }
}

const mapsStateToProps = (state: IRootState) => {
    return ({categories: state.categories.data});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchAllCategories: () => dispatch(load(categoryActions.actions.loadAll())),
    addCategories: (categories: ICategoryIdentity[]) => dispatch(load(categoryActions.actions.add(categories))),
    editCategories: (categories: ICategoryIdentity[]) => dispatch(load(categoryActions.actions.edit(categories))),
});
export default connect(mapsStateToProps, mapDispatchToProps)(CategoryViewContainer);

//
// const mapsStateToProps = (state: IRootState) => {
//     return ({categories: state.categories.data});
// };
// const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
//     addCategories: (categories: ICategoryIdentity[]) => dispatch(load(categoryActions.actions.add(categories))),
//     editCategories: (categories: ICategoryIdentity[]) => dispatch(load(categoryActions.actions.edit(categories))),
// });
// const CategoryViewContainer = connect(mapsStateToProps, mapDispatchToProps)(CategoryTableView);
// export default CategoryViewContainer;

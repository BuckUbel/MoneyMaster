import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {load} from "../../api";
import {IRootState} from "../../store";
import {categoryActions, ICategoryIdentity} from "../../../../base/model/CategoryModel";
import CategoryTableView from "../../components/views/CategoryTableView";

const mapsStateToProps = (state: IRootState) => {
    return ({categories: state.categories.data});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    addCategories: (categories: ICategoryIdentity[]) => dispatch(load(categoryActions.actions.add(categories))),
    editCategories: (categories: ICategoryIdentity[]) => dispatch(load(categoryActions.actions.edit(categories))),
});
const CategoryViewContainer = connect(mapsStateToProps, mapDispatchToProps)(CategoryTableView);
export default CategoryViewContainer;

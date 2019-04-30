import * as React from "react";
import {IRootState} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {load} from "../../api";
import {connect} from "react-redux";
import {categoryActions, CategoryModel, ICategoryIdentity} from "../../../../base/model/CategoryModel";
import {IEntityClass} from "../../../../base/helper/Entity";
import Category from "../../components/core/Category";
import {IVBookingIdentity, vBookingActions, VBookingModel} from "../../../../base/model/VBookingModel";
import {AccountModel} from "../../../../base/model/AccountModel";

export interface ICategoryContainerProps {
    fetchCategory: (id: number) => Promise<any>;
    editCategories: (accounts: ICategoryIdentity[]) => Promise<any>;
    deleteCategories: (ids: number[]) => Promise<any>;
    entity: CategoryModel;
    vBookings: VBookingModel[];
}

export interface ICategoryOwnProps {
    entity: IEntityClass;
}

class CategoryContainer extends React.Component<ICategoryContainerProps, {}> {

    constructor(props: ICategoryContainerProps) {
        super(props);
        this.editCategory = this.editCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    public async componentDidMount() {
        await this.props.fetchCategory(this.props.entity.id);
    }

    public async editCategory(category: ICategoryIdentity) {
        try {
            await this.props.editCategories([category]);
            await this.props.fetchCategory(this.props.entity.id);
        } catch (error) {
            console.error(error);

        }
    }

    public async deleteCategory(id: number) {
        try {
            await this.props.deleteCategories([id]);
            await this.props.fetchCategory(this.props.entity.id);
        } catch (error) {
            console.error(error);

        }
    }

    public render() {
        return (
            <React.Fragment>
                {this.props.entity &&
                <Category
                    entity={this.props.entity}
                    deleteAction={this.deleteCategory}
                    editAction={this.editCategory}
                    vBookings={this.props.vBookings}
                />}
            </React.Fragment>
        );
    }
}

const mapsStateToProps = (state: IRootState, ownProps: ICategoryOwnProps) => {
    let virtualBookings: VBookingModel[] = [];
    let thisEntity: CategoryModel = null;
    if (ownProps.entity) {
        if (ownProps.entity.id) {
            const seekedId: number = Number(ownProps.entity.id);
            thisEntity = state.categories.data.find((category: CategoryModel) => category.id === seekedId);
            virtualBookings = state.vBookings.data.filter((vb: VBookingModel) => vb.categoryId === seekedId);
        }
    }
    return (
        {
            entity: thisEntity,
            vBookings: virtualBookings
        }
    );
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchCategory: (id: number) => dispatch(load(categoryActions.actions.load(id))),
    editCategories: (cateogories: ICategoryIdentity[]) => dispatch(load(categoryActions.actions.edit(cateogories))),
    deleteCategories: (ids: number[]) => dispatch(load(categoryActions.actions.delete(ids))),
});
export default connect(mapsStateToProps, mapDispatchToProps)(CategoryContainer);

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
import {ISplitRealBookingParams} from "../../components/forms/SplitRealBookingForm";

export interface ICategoryContainerProps {
    fetchCategory: (id: number) => Promise<any>;
    editCategories: (accounts: ICategoryIdentity[]) => Promise<any>;
    deleteCategories: (ids: number[]) => Promise<any>;
    fetchAllVBookings: () => Promise<any>;
    fetchVBooking: (id: number) => Promise<any>;
    editVBookings: (vBookings: IVBookingIdentity[]) => Promise<any>;
    entity: CategoryModel;
    vBookings: VBookingModel[];
    withTable?: boolean;
}

export interface ICategoryOwnProps {
    entity: IEntityClass;
}

class CategoryContainer extends React.Component<ICategoryContainerProps, {}> {

    constructor(props: ICategoryContainerProps) {
        super(props);
        this.editCategory = this.editCategory.bind(this);
        this.editVBooking = this.editVBooking.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.changeVBookingsCategory = this.changeVBookingsCategory.bind(this);
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

    public async changeVBookingsCategory(newCategoryId: number, ids: number[]) {
        const newVBookings = this.props.vBookings
            .filter((vB: VBookingModel) => ids.indexOf(vB.id) !== -1)
            .map((vb: VBookingModel) => {
                vb.categoryId = newCategoryId;
                return vb;
            });
        try {
            await this.props.editVBookings(newVBookings);
            await this.props.fetchAllVBookings();
        } catch (error) {
            console.error(error);
        }
    }

    public async editVBooking(params: ISplitRealBookingParams, oldEntity: VBookingModel) {

        const newVBooking = oldEntity;
        newVBooking.name = params.name;
        newVBooking.description = params.description;
        newVBooking.value = params.value;
        newVBooking.categoryId = params.category.id;
        try {
            await this.props.editVBookings([newVBooking]);
            await this.props.fetchVBooking(newVBooking.id);
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
                    withTable={this.props.withTable}
                    changeVBookingsCategory={this.changeVBookingsCategory}
                    editVBookingAction={this.editVBooking}
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
            // if no entity with this id is found
            if (!thisEntity) {
                thisEntity = CategoryModel.createEmptyEntity();
                thisEntity.id = ownProps.entity.id;
            }
        }
    }
    return {
        entity: thisEntity,
        vBookings: virtualBookings
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchCategory: (id: number) => dispatch(load(categoryActions.actions.load(id))),
    editCategories: (cateogories: ICategoryIdentity[]) => dispatch(load(categoryActions.actions.edit(cateogories))),
    deleteCategories: (ids: number[]) => dispatch(load(categoryActions.actions.delete(ids))),
    fetchVBooking: (id: number) => dispatch(load(vBookingActions.actions.load(id))),
    fetchAllVBookings: () => dispatch(load(vBookingActions.actions.loadAll())),
    editVBookings: (vBookings: IVBookingIdentity[]) => dispatch(load(vBookingActions.actions.edit(vBookings))),
});
export default connect(mapsStateToProps, mapDispatchToProps)(CategoryContainer);

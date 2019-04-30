import * as React from "react";
import {IRootState} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {load} from "../../api";
import {vBookingActions, VBookingModel, IVBookingIdentity} from "../../../../base/model/VBookingModel";
import {connect} from "react-redux";
import VBooking from "../../components/core/VBooking";
import {IEntityClass} from "../../../../base/helper/Entity";
import {BookingModel} from "../../../../base/model/BookingModel";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import {ISplitRealBookingParams} from "../../components/forms/SplitRealBookingForm";

export interface IVBookingContainerProps {
    fetchVBooking: (id: number) => Promise<any>;
    editVBookings: (vBookings: IVBookingIdentity[]) => Promise<any>;
    deleteVBookings: (ids: number[]) => Promise<any>;
    entity: VBookingModel;
    category: CategoryModel;
    splitRealBooking?: boolean;
    bookOnVirtualAccount?: boolean;
}

export interface IVBookingOwnProps {
    entity: IEntityClass;
}

class VBookingContainer extends React.Component<IVBookingContainerProps, {}> {

    constructor(props: IVBookingContainerProps) {
        super(props);
        this.editVBooking = this.editVBooking.bind(this);
        this.deleteVBooking = this.deleteVBooking.bind(this);
    }

    public async componentDidMount() {
        await this.props.fetchVBooking(this.props.entity.id);
    }

    public async editVBooking(params: ISplitRealBookingParams, oldEntity: VBookingModel) {

        const newVBooking = oldEntity;
        newVBooking.name = params.name;
        newVBooking.description = params.description;
        newVBooking.value = params.value;
        newVBooking.categoryId = params.category.id;
        try {
            await this.props.editVBookings([newVBooking]);
            await this.props.fetchVBooking(this.props.entity.id);
        } catch (error) {
            console.error(error);
        }
    }

    public async deleteVBooking() {
        try {
            await this.props.deleteVBookings([this.props.entity.id]);
            // await this.props.fetchVBooking(this.props.entity.id);
        } catch (error) {
            console.error(error);
        }
    }

    public render() {
        return (
            <React.Fragment>
                {this.props.entity &&
                <VBooking
                    entity={this.props.entity}
                    category={this.props.category}
                    editAction={this.editVBooking}
                    deleteAction={this.deleteVBooking}
                    bookOnVirtualAccount={this.props.bookOnVirtualAccount}
                    splitRealBooking={this.props.splitRealBooking}
                />
                }
            </React.Fragment>
        );
    }
}

const mapsStateToProps = (state: IRootState, ownProps: IVBookingOwnProps) => {

    let thisEntity: VBookingModel = null;
    let entitiesCategory: CategoryModel = null;
    if (ownProps.entity) {
        if (ownProps.entity.id) {
            thisEntity = state.vBookings.data.find((vb: VBookingModel) => vb.id === ownProps.entity.id);
            entitiesCategory = state.categories.data.find((c: CategoryModel) => c.id === thisEntity.categoryId);
        }
    }
    return {
        entity: thisEntity,
        category: entitiesCategory
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchVBooking: (id: number) => dispatch(load(vBookingActions.actions.load(id))),
    editVBookings: (vBookings: IVBookingIdentity[]) => dispatch(load(vBookingActions.actions.edit(vBookings))),
    deleteVBookings: (ids: number[]) => dispatch(load(vBookingActions.actions.delete(ids))),
});
export default connect(mapsStateToProps, mapDispatchToProps)(VBookingContainer);

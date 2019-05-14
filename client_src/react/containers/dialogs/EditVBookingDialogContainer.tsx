import * as React from "react";
import {IRootState} from "../../store";
import {VBookingModel} from "../../../../base/model/VBookingModel";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import {connect} from "react-redux";
import SplitRealBookingDialog, {
    ISplitRealBookingDialogRealProps
} from "../../components/dialogs/SplitRealBookingDialog";
import {BookingModel} from "../../../../base/model/BookingModel";

export interface IEditVBookingDialogContainerProps extends ISplitRealBookingDialogRealProps {
    categories: CategoryModel[];
    associatedVBookings: VBookingModel[];
    associatedBase: BookingModel;
    entity: VBookingModel;
}

export interface IEditVBookingDialogContainerState {
}

export const defaultState: IEditVBookingDialogContainerState = {};

class EditVBookingDialogContainer
    extends React.Component<IEditVBookingDialogContainerProps, IEditVBookingDialogContainerState> {

    public state: IEditVBookingDialogContainerState = defaultState;

    constructor(props: IEditVBookingDialogContainerProps) {
        super(props);
    }

    public render() {
        return (
            <React.Fragment>
                <SplitRealBookingDialog {...this.props}/>
            </React.Fragment>
        );
    }
}

export interface IEditVBookingDialogRealProps extends ISplitRealBookingDialogRealProps {
    id: number;
}

const mapsStateToProps = (state: IRootState, ownProps: IEditVBookingDialogRealProps) => {
    const thisEntity = state.vBookings.data.find((vb) => vb.id === ownProps.id);
    return {
        categories: state.categories.data,
        entity: thisEntity,
        associatedVBookings: state.vBookings.data.filter(
            (vb: VBookingModel) => (vb.bookingId === thisEntity.bookingId && vb.id !== thisEntity.id)),
        associatedBase: state.bookings.data.find((b: BookingModel) => b.id === thisEntity.bookingId),
    };
};
export default connect(mapsStateToProps)(EditVBookingDialogContainer);

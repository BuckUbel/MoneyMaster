import * as React from "react";
import {IRootState} from "../../store";
import {VBookingModel} from "../../../../base/model/VBookingModel";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import {connect} from "react-redux";
import SplitRealBookingDialog, {
    ISplitRealBookingDialogRealProps
} from "../../components/dialogs/SplitRealBookingDialog";
import {BookingModel} from "../../../../base/model/BookingModel";

export interface ISplitRealBookingDialogContainerProps extends ISplitRealBookingDialogRealProps {
    categories: CategoryModel[];
    associatedVBookings: VBookingModel[];
    associatedBase: BookingModel;
}

export interface ISplitRealBookingDialogContainerState {
}

export const defaultState: ISplitRealBookingDialogContainerState = {};

class SplitRealBookingDialogContainer
    extends React.Component<ISplitRealBookingDialogContainerProps, ISplitRealBookingDialogContainerState> {

    public state: ISplitRealBookingDialogContainerState = defaultState;

    constructor(props: ISplitRealBookingDialogContainerProps) {
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

const mapsStateToProps = (state: IRootState, ownProps: ISplitRealBookingDialogRealProps) => {
    return {
        categories: state.categories.data,
        associatedVBookings: state.vBookings.data.filter(
            (vb: VBookingModel) => (vb.bookingId === ownProps.entity.bookingId && vb.id !== ownProps.entity.id)),
        associatedBase: state.bookings.data.find((b: BookingModel) => b.id === ownProps.entity.bookingId),
    };
};
export default connect(mapsStateToProps)(SplitRealBookingDialogContainer);

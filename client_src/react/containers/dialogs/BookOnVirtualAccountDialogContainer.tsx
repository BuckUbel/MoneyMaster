import * as React from "react";
import {IRootState} from "../../store";
import {VBookingModel} from "../../../../base/model/VBookingModel";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {connect} from "react-redux";
import SplitRealBookingDialog, {
    ISplitRealBookingDialogRealProps
} from "../../components/dialogs/SplitRealBookingDialog";
import {BookingModel} from "../../../../base/model/BookingModel";
import {AccountModel} from "../../../../base/model/AccountModel";

export interface IBookOnVirtualAccountDialogContainerProps extends ISplitRealBookingDialogRealProps {
    categories: CategoryModel[];
    associatedVBookings: VBookingModel[];
    associatedBase: AccountModel;
}

export interface IBookOnVirtualAccountDialogContainerState {
}

export const defaultState: IBookOnVirtualAccountDialogContainerState = {};

class BookOnVirtualAccountDialogContainer
    extends React.Component<IBookOnVirtualAccountDialogContainerProps, IBookOnVirtualAccountDialogContainerState> {

    public state: IBookOnVirtualAccountDialogContainerState = defaultState;

    constructor(props: IBookOnVirtualAccountDialogContainerProps) {
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
            (vb: VBookingModel) => (vb.accountId === ownProps.entity.accountId && vb.id !== ownProps.entity.id)),
        associatedBase: state.accounts.data.find((b: AccountModel) => b.id === ownProps.entity.accountId),
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    // fetchVBooking: (id: number) => dispatch(load(vBookingActions.actions.load(id))),
    // editVBookings: (vBookings: IVBookingIdentity[]) => dispatch(load(vBookingActions.actions.edit(vBookings))),
    // deleteVBookings: (ids: number[]) => dispatch(load(vBookingActions.actions.delete(ids))),
});
export default connect(mapsStateToProps, mapDispatchToProps)(BookOnVirtualAccountDialogContainer);

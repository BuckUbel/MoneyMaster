import {Action} from "redux";
import {ThunkDispatch} from "redux-thunk";

import {load} from "../../api";
import {IRootState} from "../../store";
import {IVBookingIdentity, vBookingActions} from "../../../../base/model/VBookingModel";

const mapsStateToProps = (state: IRootState) => {
    return ({vBookings: state.vBookings.data});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    editVBookings: (vBookings: IVBookingIdentity[]) => dispatch(load(vBookingActions.actions.edit(vBookings))),
});
// export const VBookingViewContainer = connect(mapsStateToProps, mapDispatchToProps)(VBookingView);

// export const VBookingTableViewContainer = connect(mapsStateToProps, mapDispatchToProps)(BookingTableView);

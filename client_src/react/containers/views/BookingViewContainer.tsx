import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {load} from "../../api";
import {IRootState} from "../../store";
import {bookingActions, IBookingIdentity} from "../../../../base/model/BookingModel";
import BookingTableView from "../../components/views/BookingTableView";
// import BookingView from "../../components/views/BookingView";

const mapsStateToProps = (state: IRootState) => {
    return ({bookings: state.bookings.data});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    addBookings: (bookings: IBookingIdentity[]) => dispatch(load(bookingActions.actions.add(bookings))),
    editBookings: (bookings: IBookingIdentity[]) => dispatch(load(bookingActions.actions.edit(bookings))),
});
// export const BookingViewContainer = connect(mapsStateToProps, mapDispatchToProps)(BookingView);

export const BookingTableViewContainer = connect(mapsStateToProps, mapDispatchToProps)(BookingTableView);

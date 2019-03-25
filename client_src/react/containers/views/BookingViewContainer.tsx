import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {load} from "../../api";
import {IRootState} from "../../store";
import {
    loadAllBookingAction,
    addBookingAction, editBookingAction,
} from "../../actions/Booking";
import {IBookingIdentity} from "../../../../base/model/BookingModel";
import BookingTableView from "../../components/views/BookingTableView";

const mapsStateToProps = (state: IRootState) => {
    return ({bookings: state.bookings.data});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchAllBookings: () => dispatch(load(loadAllBookingAction)),
    addBookings: (bookings: IBookingIdentity[]) => dispatch(load(addBookingAction(bookings))),
    editBookings: (bookings: IBookingIdentity[]) => dispatch(load(editBookingAction(bookings))),
});
const BookingViewContainer = connect(mapsStateToProps, mapDispatchToProps)(BookingTableView);
export default BookingViewContainer;

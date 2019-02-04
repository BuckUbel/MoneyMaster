import { Action } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { load } from "../../api";
import { IRootState } from "../../store";
import { loadBookingInRelationToDatesAction, loadAllBookingAction } from "../../actions/Booking";
import BookingView from "../../components/views/BookingView";

const mapsStateToProps = (state: IRootState) => {
  return ({bookings: state.bookings.data});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
  fetchAllBookings: () => dispatch(load(loadAllBookingAction)),
  fetchBookingsForGantt: (from: Date, to: Date) => dispatch(load(loadBookingInRelationToDatesAction(from, to))),
});
const BookingViewContainer = connect(mapsStateToProps, mapDispatchToProps)(BookingView);
export default BookingViewContainer;

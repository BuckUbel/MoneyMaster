import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {load} from "../../api";
import {IRootState} from "../../store";
import {bookingActions, IBookingIdentity} from "../../../../base/model/BookingModel";
import BookingTableView from "../../components/views/BookingTableView";
import StatisticsView from "../../components/views/statistics/StatisticsView";

const mapsStateToProps = (state: IRootState) => {
    return ({bookings: state.bookings.data});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    addBookings: (bookings: IBookingIdentity[]) => dispatch(load(bookingActions.actions.add(bookings))),
    editBookings: (bookings: IBookingIdentity[]) => dispatch(load(bookingActions.actions.edit(bookings))),
});
const mapsStateToPropsStatistics = (state: IRootState) => {
    return ({bookings: state.bookings.data, categories: state.categories.data, vBookings: state.vBookings.data});
};
export const StatisticsViewContainer = connect(mapsStateToPropsStatistics)(StatisticsView);
export const BookingTableViewContainer = connect(mapsStateToProps, mapDispatchToProps)(BookingTableView);

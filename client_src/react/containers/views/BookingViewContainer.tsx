import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {load} from "../../api";
import {IRootState} from "../../store";
import {
    loadAllBookingAction,
    addBookingAction,
    editBookingAction
} from "../../actions/Booking";
import BookingView from "../../components/views/BookingView";
import {IBookingIdentity} from "../../../../base/model/BookingModel";
import {addAccountAction} from "../../actions/Account";
import {IAccountIdentity} from "../../../../base/model/AccountModel";

const mapsStateToProps = (state: IRootState) => {
    return ({bookings: state.bookings.data});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchAllBookings: () => dispatch(load(loadAllBookingAction)),
    addBookings: (bookings: IBookingIdentity[]) => dispatch(load(addBookingAction(bookings))),
    addAccount: (accounts: IAccountIdentity[]) => dispatch(load(addAccountAction(accounts))),
});
const BookingViewContainer = connect(mapsStateToProps, mapDispatchToProps)(BookingView);
export default BookingViewContainer;

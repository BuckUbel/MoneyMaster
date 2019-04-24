import thunk from "redux-thunk";
import {apiMiddleware} from "./api";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, combineReducers, createStore, Store as ReduxStore} from "redux";

import {default as bookingReducer, IState as BookingState} from "./reducers/Booking";
import {default as vBookingReducer, IState as VBookingState} from "./reducers/VBooking";
import {default as accountReducer, IState as AccountState} from "./reducers/Account";
import {default as categoryReducer, IState as CategoryState} from "./reducers/Category";
import {default as shortDescriptionReducer, IState as ShortDescriptionState} from "./reducers/ShortDescription";
import {default as applicationReducer, IState as ApplicationState} from "./reducers/Application";

const api = {};

export interface IRootState extends ReduxStore<IRootState> {
    accounts: AccountState;
    bookings: BookingState;
    vBookings: VBookingState;
    categories: CategoryState;
    shortDescriptions: ShortDescriptionState;
    application: ApplicationState;
}

const rootReducer = combineReducers({
    accounts: accountReducer,
    bookings: bookingReducer,
    vBookings: vBookingReducer,
    categories: categoryReducer,
    shortDescriptions: shortDescriptionReducer,
    application: applicationReducer,
});

const middlewares = [
    thunk.withExtraArgument(api),
    apiMiddleware,
];

const rootState = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

export default rootState;

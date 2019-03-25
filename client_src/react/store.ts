import thunk from "redux-thunk";
import {apiMiddleware} from "./api";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, combineReducers, createStore, Store as ReduxStore} from "redux";

import {default as bookingReducer, IState as BookingState} from "./reducers/Booking";
import {default as accountReducer, IState as AccountState} from "./reducers/Account";

const api = {};

export interface IRootState extends ReduxStore<IRootState> {
    bookings: BookingState;
    accounts: AccountState;
}

const rootReducer = combineReducers({
    bookings: bookingReducer,
    accounts: accountReducer,
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

import thunk from "redux-thunk";
import {apiMiddleware} from "./api";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, combineReducers, createStore, Store as ReduxStore} from "redux";

import {default as bookingReducer, IState as BookingState} from "./reducers/Booking";
import {default as accountReducer, IState as AccountState} from "./reducers/Account";
import {default as categoryReducer, IState as CategoryState} from "./reducers/Category";
import {default as shortDescriptionReducer, IState as ShortDescriptionState} from "./reducers/ShortDescription";

const api = {};

export interface IRootState extends ReduxStore<IRootState> {
    accounts: AccountState;
    bookings: BookingState;
    categories: CategoryState;
    shortDescriptions: ShortDescriptionState;
}

const rootReducer = combineReducers({
    accounts: accountReducer,
    bookings: bookingReducer,
    categories: categoryReducer,
    shortDescriptions: shortDescriptionReducer,
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

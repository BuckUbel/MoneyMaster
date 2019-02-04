import thunk from "redux-thunk";
import { apiMiddleware } from "./api";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore, Store as ReduxStore } from "redux";

import { default as bookingReducer, IState as BookingState } from "./reducers/Booking";

const api = {};

export interface IRootState extends ReduxStore<IRootState> {
  bookings: BookingState;
}

const rootReducer = combineReducers({
  bookings: bookingReducer,
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

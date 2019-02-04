import { IFailAction, IResultAction, ISuccessAction } from "../api";
import { BookingModel, IBookingIdentity, IBookingIdentityDefaultStringValues } from "../model/BookingModel";
import { ActionTypes } from "../actions/Booking";

export interface IState {
  data: BookingModel[];

}

const defaultState: IState = {
  data: [],
};

export default (state: IState = defaultState, action: IResultAction) => {

  switch (action.type) {
    case ActionTypes.ADD_BOOKING_REQUEST: {
      return state;
    }
    case ActionTypes.EDIT_BOOKING_SUCCESS: {
      return state;
    }
    case ActionTypes.LOAD_MULTIPLE_BOOKING_SUCCESS: {
      return state;
    }
    case ActionTypes.LOAD_ALL_BOOKING_FAILURE: {
      return state;
    }
    case ActionTypes.LOAD_ALL_BOOKING_SUCCESS: {
      if (action) {
        const newState: IState = Object.assign([], state);
        if (action.response) {
          if (action.response.data) {
            newState.data = action.response.data.map(
              (bookingData: IBookingIdentityDefaultStringValues): IBookingIdentity => {
                const obj = new BookingModel();
                obj.set(bookingData);
                return obj;
              });
            return newState;
          }
        }
      }
      return state;
    }
    default:
      return state;
  }
};

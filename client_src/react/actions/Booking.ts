import { ICallApiAction, IFailAction, ISuccessAction } from "../api";
import { Action } from "redux";
import { IBookingIdentity } from "../model/BookingModel";
import { dateToDayString } from "../../../base/helper/util";

export enum ActionTypes {
  ADD_BOOKING_REQUEST = "ADD_BOOKING_REQUEST",
  ADD_BOOKING_SUCCESS = "ADD_BOOKING_SUCCESS",
  ADD_BOOKING_FAILURE = "ADD_BOOKING_FAILURE",

  LOAD_BOOKING_REQUEST = "LOAD_BOOKING_REQUEST",
  LOAD_BOOKING_SUCCESS = "LOAD_BOOKING_SUCCESS",
  LOAD_BOOKING_FAILURE = "LOAD_BOOKING_FAILURE",

  EDIT_BOOKING_REQUEST = "EDIT_BOOKING_REQUEST",
  EDIT_BOOKING_SUCCESS = "EDIT_BOOKING_SUCCESS",
  EDIT_BOOKING_FAILURE = "EDIT_BOOKING_FAILURE",

  LOAD_ALL_BOOKING_REQUEST = "LOAD_BOOKING_REQUEST",
  LOAD_ALL_BOOKING_SUCCESS = "LOAD_ALL_BOOKING_SUCCESS",
  LOAD_ALL_BOOKING_FAILURE = "LOAD_ALL_BOOKING_FAILURE",

  REBUILD_BOOKING_VIEW = "REBUILD_BOOKING_VIEW",

}

export const addBookingSuccessAction = (bookings: IBookingIdentity[]): ISuccessAction => {
  return ({
    response: {
      success: true,
      data: bookings,
    },
    type: ActionTypes.ADD_BOOKING_SUCCESS,

  });
};
export const addBookingFailAction = (bookings: IBookingIdentity[], code: string, message: string): IFailAction => {
  return ({
    type: ActionTypes.ADD_BOOKING_FAILURE,
    error: {message, code},
    responseData: bookings,
  });
};

export const addBookingAction = (bookings: IBookingIdentity[]): ICallApiAction => {
  return ({
    endpoint: "api/bookings/add",
    payload: {
      element: bookings,
    },
    method: "post",
    type: ActionTypes.ADD_BOOKING_REQUEST,
    successAction: addBookingSuccessAction,
    failAction: addBookingFailAction,
  });
};

export const loadBookingAction = (id: number): ICallApiAction => {
  return ({
    type: "CALL_API",
    endpoint: "api/booking/load/" + id,
    payload: {
      calculable: id,
    },
    method: "get",
    types: [
      ActionTypes.LOAD_BOOKING_REQUEST,
      ActionTypes.LOAD_BOOKING_SUCCESS,
      ActionTypes.LOAD_BOOKING_FAILURE,
    ],

  });
};
export const editBookingSuccessAction = (bookings: IBookingIdentity[]): ISuccessAction => {
  return ({
    response: {
      success: true,
      data: bookings,
    },
    type: ActionTypes.EDIT_BOOKING_SUCCESS,
  });

};
export const editBookingFailAction = (bookings: IBookingIdentity[], code: string, message: string): IFailAction => {
  return ({
    type: ActionTypes.EDIT_BOOKING_FAILURE,
    error: {message, code},
    responseData: bookings,
  });
};

export const editBookingAction = (bookings: IBookingIdentity[]): ICallApiAction => {
  return ({
    endpoint: "api/bookings/edit",
    payload: {
      element: bookings,
    },
    method: "post",
    type: ActionTypes.EDIT_BOOKING_REQUEST,
    successAction: editBookingSuccessAction,
    failAction: editBookingFailAction,
  });
};


export const loadAllBookingSuccessAction = (bookings: IBookingIdentity[]): ISuccessAction => {
  return ({
    response: {
      success: true,
      data: bookings,
    },
    type: ActionTypes.LOAD_ALL_BOOKING_SUCCESS,
  });

};
export const loadAllBookingFailAction
  = (bookings: IBookingIdentity[], code: string, errorMsg: string): IFailAction => {
  return ({
    type: ActionTypes.LOAD_ALL_BOOKING_FAILURE,
    error: {
      message: errorMsg,
      code,
    },
    responseData: {bookings},
  });
};

export const loadAllBookingAction: ICallApiAction = ({
  endpoint: "api/bookings/load",
  method: "get",
  type: ActionTypes.LOAD_ALL_BOOKING_REQUEST,
  successAction: loadAllBookingSuccessAction,
  failAction: loadAllBookingFailAction,
});

// function?

export function loadBookingInRelationToDatesAction(from: Date, to: Date): ICallApiAction {
  return ({
    endpoint: "api/bookings/load/" + dateToDayString(from) + "/" + dateToDayString(to),
    method: "get",
    type: ActionTypes.LOAD_ALL_BOOKING_REQUEST,
    successAction: loadAllBookingSuccessAction,
    failAction: loadAllBookingFailAction,
  });
}

export const rebuildBookingViewAction: Action = ({
  type: ActionTypes.REBUILD_BOOKING_VIEW,
});

import {
    bookingActions,
    BookingModel,
    IBookingIdentity,
    IBookingIdentityDefaultStringValues
} from "../../../base/model/BookingModel";
import {IResultAction} from "../../../base/actions/Entity";

export interface IState {
    data: BookingModel[];
}

const defaultState: IState = {
    data: [],
};

export default (state: IState = defaultState, action: IResultAction) => {

    switch (action.type) {
        case bookingActions.actionTypes.add.success: {
            return state;
        }
        case bookingActions.actionTypes.edit.success: {
            return state;
        }
        case bookingActions.actionTypes.loadAll.failure: {
            return state;
        }
        case bookingActions.actionTypes.loadAll.success: {
            if (action) {
                const newState: IState = Object.assign([], state);
                if (action.response) {
                    if (action.response.entities) {
                        newState.data = action.response.entities.map(
                            (bookingData: IBookingIdentityDefaultStringValues): BookingModel => {
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

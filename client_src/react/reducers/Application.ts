import {ActionTypes as ApplicationActionTypes} from "../actions/Application";
import {ActionTypes as BookingActionTypes} from "../actions/Bookings";

export interface IState {
    isLoading: boolean;
    successMsg: string;
}

const defaultState: IState = {
    isLoading: true,
    successMsg: "",
};

export default (state: IState = defaultState, action: any) => {
    switch (action.type) {
        case ApplicationActionTypes.CHANGE_LOADING: {
            if (action) {
                const newState: IState = Object.assign([], state);
                if (action.newStateContent) {
                    if (action.newStateContent.loading !== null) {
                        newState.isLoading = action.newStateContent.loading;
                        return newState;
                    }
                }
            }
            return state;
        }
        case BookingActionTypes.DOWNLOAD_FROM_SPK_SUCCESS: {
            if (action) {
                const newState: IState = Object.assign([], state);
                if (action.response) {
                    if (action.response) {
                        if ("data" in action.response) {
                            if ("readableText" in action.response.data) {
                                if (action.response.data.readableText === "No password is available.") {
                                    if ("options" in action.response) {
                                        if ("noPasswordFunction" in action.response.options) {
                                            action.response.options.noPasswordFunction();
                                        }
                                    }
                                    newState.successMsg = "Es wurde bisher kein Passwort gesetzt.";
                                    return newState;
                                }
                                newState.successMsg = "Die Anfrage wird beantwortet.";
                                return newState;
                            }
                        }
                    }
                }
            }
            return state;
        }
        default:
            return state;
    }
};

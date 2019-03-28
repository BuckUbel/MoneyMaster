import {IAction} from "../../../base/actions/Entity";

export enum ActionTypes {
    CHANGE_LOADING = "CHANGE_LOADING",
}

export const setLoading = (isLoading: boolean): IAction => {
    return ({
        type: ActionTypes.CHANGE_LOADING,
        newStateContent: {
            loading: isLoading
        }
    });
};



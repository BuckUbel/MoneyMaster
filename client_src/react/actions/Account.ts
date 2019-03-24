import {ICallApiAction, IFailAction, ISuccessAction} from "../api";
import {Action} from "redux";
import {dateToDayString} from "../../../base/helper/util";
import {IAccountIdentity} from "../../../base/model/AccountModel";

export enum ActionTypes {
    ADD_ACCOUNT_REQUEST = "ADD_ACCOUNT_REQUEST",
    ADD_ACCOUNT_SUCCESS = "ADD_ACCOUNT_SUCCESS",
    ADD_ACCOUNT_FAILURE = "ADD_ACCOUNT_FAILURE",

    LOAD_ACCOUNT_REQUEST = "LOAD_ACCOUNT_REQUEST",
    LOAD_ACCOUNT_SUCCESS = "LOAD_ACCOUNT_SUCCESS",
    LOAD_ACCOUNT_FAILURE = "LOAD_ACCOUNT_FAILURE",

    EDIT_ACCOUNT_REQUEST = "EDIT_ACCOUNT_REQUEST",
    EDIT_ACCOUNT_SUCCESS = "EDIT_ACCOUNT_SUCCESS",
    EDIT_ACCOUNT_FAILURE = "EDIT_ACCOUNT_FAILURE",

    LOAD_ALL_ACCOUNT_REQUEST = "LOAD_ACCOUNT_REQUEST",
    LOAD_ALL_ACCOUNT_SUCCESS = "LOAD_ALL_ACCOUNT_SUCCESS",
    LOAD_ALL_ACCOUNT_FAILURE = "LOAD_ALL_ACCOUNT_FAILURE",

}

export const addAccountSuccessAction = (accounts: IAccountIdentity[]): ISuccessAction => {
    return ({
        response: {
            success: true,
            data: accounts,
        },
        type: ActionTypes.ADD_ACCOUNT_SUCCESS,

    });
};
export const addAccountFailAction = (accounts: IAccountIdentity[], code: string, message: string): IFailAction => {
    return ({
        type: ActionTypes.ADD_ACCOUNT_FAILURE,
        error: {message, code},
        responseData: accounts,
    });
};

export const addAccountAction = (accounts: IAccountIdentity[]): ICallApiAction => {
    return ({
        endpoint: "api/accounts/create",
        payload: {
            elements: accounts,
        },
        method: "post",
        type: ActionTypes.ADD_ACCOUNT_REQUEST,
        successAction: addAccountSuccessAction,
        failAction: addAccountFailAction,
    });
};

export const loadAccountAction = (id: number): ICallApiAction => {
    return ({
        type: "CALL_API",
        endpoint: "api/account/load/" + id,
        payload: {
            calculable: id,
        },
        method: "get",
        types: [
            ActionTypes.LOAD_ACCOUNT_REQUEST,
            ActionTypes.LOAD_ACCOUNT_SUCCESS,
            ActionTypes.LOAD_ACCOUNT_FAILURE,
        ],

    });
};
export const editAccountSuccessAction = (accounts: IAccountIdentity[]): ISuccessAction => {
    return ({
        response: {
            success: true,
            data: accounts,
        },
        type: ActionTypes.EDIT_ACCOUNT_SUCCESS,
    });

};
export const editAccountFailAction = (accounts: IAccountIdentity[], code: string, message: string): IFailAction => {
    return ({
        type: ActionTypes.EDIT_ACCOUNT_FAILURE,
        error: {message, code},
        responseData: accounts,
    });
};

export const editAccountAction = (accounts: IAccountIdentity[]): ICallApiAction => {
    return ({
        endpoint: "api/accounts/edit",
        payload: {
            element: accounts,
        },
        method: "post",
        type: ActionTypes.EDIT_ACCOUNT_REQUEST,
        successAction: editAccountSuccessAction,
        failAction: editAccountFailAction,
    });
};

export const loadAllAccountSuccessAction = (accounts: IAccountIdentity[]): ISuccessAction => {
    return ({
        response: {
            success: true,
            data: accounts,
        },
        type: ActionTypes.LOAD_ALL_ACCOUNT_SUCCESS,
    });

};
export const loadAllAccountFailAction
    = (accounts: IAccountIdentity[], code: string, errorMsg: string): IFailAction => {
    return ({
        type: ActionTypes.LOAD_ALL_ACCOUNT_FAILURE,
        error: {
            message: errorMsg,
            code,
        },
        responseData: {accounts},
    });
};

export const loadAllAccountAction: ICallApiAction = ({
    endpoint: "api/accounts/load",
    method: "get",
    type: ActionTypes.LOAD_ALL_ACCOUNT_REQUEST,
    successAction: loadAllAccountSuccessAction,
    failAction: loadAllAccountFailAction,
});


export function loadAccountInRelationToDatesAction(from: Date, to: Date): ICallApiAction {
    return ({
        endpoint: "api/accounts/load/" + dateToDayString(from) + "/" + dateToDayString(to),
        method: "get",
        type: ActionTypes.LOAD_ALL_ACCOUNT_REQUEST,
        successAction: loadAllAccountSuccessAction,
        failAction: loadAllAccountFailAction,
    });
}


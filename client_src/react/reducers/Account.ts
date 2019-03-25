import {IResultAction} from "../api";
import {AccountModel, IAccountIdentity, IAccountIdentityDefaultStringValues} from "../../../base/model/AccountModel";
import {ActionTypes} from "../actions/Account";

export interface IState {
    data: AccountModel[];
}

const defaultState: IState = {
    data: [],
};

export default (state: IState = defaultState, action: IResultAction) => {

    switch (action.type) {
        case ActionTypes.ADD_ACCOUNT_SUCCESS: {
            return state;
        }
        case ActionTypes.EDIT_ACCOUNT_SUCCESS: {
            return state;
        }
        case ActionTypes.LOAD_ALL_ACCOUNT_FAILURE: {
            return state;
        }
        case ActionTypes.LOAD_ALL_ACCOUNT_SUCCESS: {
            if (action) {
                const newState: IState = Object.assign([], state);
                if (action.response) {
                    if (action.response.data) {
                        newState.data = action.response.data.map(
                            (accountData: IAccountIdentityDefaultStringValues): IAccountIdentity=> {
                                const obj = new AccountModel();
                                obj.set(accountData);
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
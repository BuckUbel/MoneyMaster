import {
    accountActions,
    AccountModel,
    IAccountIdentity,
    IAccountIdentityDefaultStringValues
} from "../../../base/model/AccountModel";
import {IResultAction} from "../../../base/actions/Entity";

export interface IState {
    data: AccountModel[];
}

const defaultState: IState = {
    data: [],
};

export default (state: IState = defaultState, action: IResultAction) => {

    switch (action.type) {
        case accountActions.actionTypes.add.success: {
            return state;
        }
        case accountActions.actionTypes.edit.success: {
            return state;
        }
        case accountActions.actionTypes.loadAll.failure: {
            return state;
        }
        case accountActions.actionTypes.loadAll.success: {
            if (action) {
                const newState: IState = Object.assign([], state);
                if (action.response) {
                    if (action.response.entities) {
                        newState.data = action.response.entities.map(
                            (accountData: IAccountIdentityDefaultStringValues): AccountModel => {
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

import {
    accountActions,
    AccountModel,
    IAccountIdentityDefaultStringValues
} from "../../../base/model/AccountModel";
import {IResultAction} from "../../../base/actions/Entity";
import {deleteEntities, updateEntities} from "../../../base/helper/Entity";

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
        case accountActions.actionTypes.load.success:
        case accountActions.actionTypes.loadAll.success: {
            if (action) {
                if (action.response) {
                    if ("entities" in action.response) {
                        const newState: IState = Object.assign([], state);
                        const newData = (action.response.entities.map(
                            (accountData: IAccountIdentityDefaultStringValues): AccountModel => {
                                const obj = new AccountModel();
                                obj.set(accountData);
                                return obj;
                            }));

                        newState.data = updateEntities(state.data, newData) as AccountModel[];
                        return newState;
                    }
                }
            }
            return state;
        }
        case accountActions.actionTypes.delete.success: {
            if (action) {
                if (action.response) {
                    if ("data" in action.response) {
                        if ("ids" in action.response.data) {
                            const newState: IState = Object.assign([], state);
                            newState.data = deleteEntities(state.data, action.response.data.ids) as AccountModel[];
                            return newState;
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

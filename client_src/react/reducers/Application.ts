import {
    accountActions,
    AccountModel,
    IAccountIdentity,
    IAccountIdentityDefaultStringValues
} from "../../../base/model/AccountModel";
import {IAction, ICallApiAction, IResultAction} from "../../../base/actions/Entity";

export interface IState {
    isLoading: boolean;
}

const defaultState: IState = {
    isLoading: true,
};

export default (state: IState = defaultState, action: any) => {
    switch (action.type) {
        case accountActions.actionTypes.add.success: {
            if (action) {
                const newState: IState = Object.assign([], state);
                if (action.response) {
                    if (action.response.entities) {
                        newState.isLoading =  action.newStateContent.loading;
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

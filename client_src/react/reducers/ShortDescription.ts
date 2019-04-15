import {IResultAction} from "../../../base/actions/Entity";
import {
    IShortDescriptionIdentityDefaultStringValues,
    shortDescriptionActions,
    ShortDescriptionModel
} from "../../../base/model/ShortDescriptionModel";

export interface IState {
    data: ShortDescriptionModel[];
}

const defaultState: IState = {
    data: [],
};

export default (state: IState = defaultState, action: IResultAction) => {

    switch (action.type) {
        case shortDescriptionActions.actionTypes.add.success: {
            return state;
        }
        case shortDescriptionActions.actionTypes.edit.success: {
            return state;
        }
        case shortDescriptionActions.actionTypes.loadAll.failure: {
            return state;
        }
        case shortDescriptionActions.actionTypes.load.success:
        case shortDescriptionActions.actionTypes.loadAll.success: {
            if (action) {
                const newState: IState = Object.assign([], state);
                if (action.response) {
                    if ("entities" in action.response) {
                        newState.data = action.response.entities.map(
                            (shortDescriptionData: IShortDescriptionIdentityDefaultStringValues)
                                : ShortDescriptionModel => {
                                const obj = new ShortDescriptionModel();
                                obj.set(shortDescriptionData);
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

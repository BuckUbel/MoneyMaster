import {IResultAction} from "../../../base/actions/Entity";
import {
    IShortDescriptionIdentityDefaultStringValues,
    shortDescriptionActions,
    ShortDescriptionModel
} from "../../../base/model/ShortDescriptionModel";
import {deleteEntities, updateEntities} from "../../../base/helper/Entity";

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
                if (action.response) {
                    if ("entities" in action.response) {
                        const newState: IState = Object.assign([], state);
                        const newData = action.response.entities.map(
                            (shortDescriptionData: IShortDescriptionIdentityDefaultStringValues)
                                : ShortDescriptionModel => {
                                const obj = new ShortDescriptionModel();
                                obj.set(shortDescriptionData);
                                return obj;
                            });
                        newState.data = updateEntities(state.data, newData) as ShortDescriptionModel[];
                        return newState;
                    }
                }
            }
            return state;
        }
        case shortDescriptionActions.actionTypes.delete.success: {
            if (action) {
                if (action.response) {
                    if ("data" in action.response) {
                        if ("ids" in action.response.data) {
                            const newState: IState = Object.assign([], state);
                            newState.data =
                                deleteEntities(state.data, action.response.data.ids) as ShortDescriptionModel[];
                            return newState;

                        }
                    }
                }
            }
            return state;
        }
        // TODO: Zusammenfassen der Fehlerfälle und die Fehlermeldung anzeigen
        default:
            return state;
    }
};

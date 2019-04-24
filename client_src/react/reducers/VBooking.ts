import {
    vBookingActions,
    VBookingModel,
    IVBookingIdentityDefaultStringValues
} from "../../../base/model/VBookingModel";
import {IResultAction} from "../../../base/actions/Entity";
import {deleteEntities, updateEntities} from "../../../base/helper/Entity";

export interface IState {
    data: VBookingModel[];
}

const defaultState: IState = {
    data: [],
};

export default (state: IState = defaultState, action: IResultAction) => {

    switch (action.type) {
        case vBookingActions.actionTypes.add.success: {
            return state;
        }
        case vBookingActions.actionTypes.edit.success: {
            return state;
        }
        case vBookingActions.actionTypes.loadAll.failure: {
            return state;
        }
        case vBookingActions.actionTypes.load.success:
        case vBookingActions.actionTypes.loadAll.success: {
            if (action) {
                if (action.response) {
                    if ("entities" in action.response) {
                        const newState: IState = Object.assign([], state);
                        const newData = (action.response.entities.map(
                            (vBookingData: IVBookingIdentityDefaultStringValues): VBookingModel => {
                                const obj = new VBookingModel();
                                obj.set(vBookingData);
                                return obj;
                            }));

                        newState.data = updateEntities(state.data, newData) as VBookingModel[];
                        return newState;
                    }
                }
            }
            return state;
        }
        case vBookingActions.actionTypes.delete.success: {
            if (action) {
                if (action.response) {
                    if ("data" in action.response) {
                        if ("ids" in action.response.data) {
                            const newState: IState = Object.assign([], state);
                            newState.data = deleteEntities(state.data, action.response.data.ids) as VBookingModel[];
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

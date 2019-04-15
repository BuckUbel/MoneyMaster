import {IResultAction} from "../../../base/actions/Entity";
import {categoryActions, CategoryModel, ICategoryIdentityDefaultStringValues} from "../../../base/model/CategoryModel";
import {deleteEntities, updateEntities} from "../../../base/helper/Entity";

export interface IState {
    data: CategoryModel[];
}

const defaultState: IState = {
    data: [],
};

export default (state: IState = defaultState, action: IResultAction) => {

    switch (action.type) {
        case categoryActions.actionTypes.add.success: {
            return state;
        }
        case categoryActions.actionTypes.edit.success: {
            return state;
        }
        case categoryActions.actionTypes.loadAll.failure: {
            return state;
        }
        case categoryActions.actionTypes.load.success:
        case categoryActions.actionTypes.loadAll.success: {
            if (action) {
                if (action.response) {
                    if ("entities" in action.response) {
                        const newState: IState = Object.assign([], state);
                        const newData = action.response.entities.map(
                            (categoryData: ICategoryIdentityDefaultStringValues): CategoryModel => {
                                const obj = new CategoryModel();
                                obj.set(categoryData);
                                return obj;
                            });
                        newState.data = updateEntities(state.data, newData) as CategoryModel[];
                        return newState;
                    }
                }
            }
            return state;
        }
        case categoryActions.actionTypes.delete.success: {
            if (action) {
                if (action.response) {
                    if ("data" in action.response) {
                        if ("ids" in action.response.data) {
                            const newState: IState = Object.assign([], state);
                            newState.data = deleteEntities(state.data, action.response.data.ids) as CategoryModel[];
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

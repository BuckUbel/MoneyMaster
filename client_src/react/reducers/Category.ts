import {IResultAction} from "../../../base/actions/Entity";
import {categoryActions, CategoryModel, ICategoryIdentityDefaultStringValues} from "../../../base/model/CategoryModel";

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
        case categoryActions.actionTypes.loadAll.success: {
            if (action) {
                const newState: IState = Object.assign([], state);
                if (action.response) {
                    if (action.response.entities) {
                        newState.data = action.response.entities.map(
                            (categoryData: ICategoryIdentityDefaultStringValues): CategoryModel => {
                                const obj = new CategoryModel();
                                obj.set(categoryData);
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

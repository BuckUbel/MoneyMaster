import {Action, ActionCreator, Middleware} from "redux";
import {IRootState} from "./store";
import {Dispatch} from "react-redux";
import {ThunkAction} from "redux-thunk";
import {httpMethods, ICallApiAction, IResultAction} from "../../base/actions/Entity";

export enum ActionTypes {
    NO_RESULT_ACTION = "NO_RESULT_ACTION",
    DO_NOTHING_ACTION = "DO_NOTHING_ACTION",
}

export const noResultAction = (): IResultAction => ({
    type: ActionTypes.NO_RESULT_ACTION,
});
export const doNothingAction = (): IResultAction => ({
    type: ActionTypes.DO_NOTHING_ACTION,
});

export const load: ActionCreator<ThunkAction<Promise<Action>, IRootState, void, Action>>
    = (apiAction: ICallApiAction) => {
    return async (dispatch: Dispatch<IRootState>): Promise<Action> => {
        if (apiAction.isApiAction) {
            let failed = false;
            try {
                const objects: any = await fetch(apiAction.endpoint, getFetchBody(apiAction))
                    .then((res) => {
                        return res.json();
                    })
                    .catch((err) => {
                        failed = true;
                        if (apiAction.failAction) {
                            return dispatch(apiAction.failAction(null, 500, "Daten konnten nicht geladen werden."));
                        }
                        throw err;
                    });
                // action which load the given objects in the store
                if (!failed) {

                    if (apiAction.successAction) {
                        return dispatch(apiAction.successAction(objects, 200, "Daten wurden geladen."));
                    }
                    if (apiAction.failAction) {
                        return dispatch(apiAction.failAction(objects, 500, "Ein Fehler liegt vor."));
                    }
                    return dispatch(noResultAction());
                }
                return dispatch(doNothingAction());
            } catch (err) {
                throw err;
            }
        }
        return dispatch(apiAction);
    };
};

const getFetchBody = (apiAction: ICallApiAction) => {

    let body = {};

    if (apiAction.method === httpMethods.POST) {
        body = {
            method: apiAction.method,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiAction.payload),
        };
    }

    if (apiAction.method === httpMethods.GET) {
        body = {
            method: apiAction.method,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
    }

    return body;
};

type PromiseDispatch = <T extends Action>(promise: Promise<T>) => Promise<T>;

export const apiMiddleware: Middleware<PromiseDispatch> =
    ({dispatch}: IRootState) =>
        (next) =>
            <T extends Action>(action: ICallApiAction | Promise<T>) => {
                console.log(action);
                if (action instanceof Promise) {
                    console.log(action);
                    action.then(dispatch);
                    return action;
                }

                return next(action);
            };

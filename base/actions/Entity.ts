import {IAddActionPayload, IDeleteActionPayload, IEntityClass, IUpdateActionPayload} from "../helper/Entity";
import {createApiCallPathObject, IRestCallApiPaths} from "../helper/util";

export interface IAction {
    type: string;
    isApiAction?: boolean;
    newStateContent?: any;
}

export interface ICallEntityApiAction<T = any> extends IAction {
    endpoint: string;
    method: HttpMethods;
    payload?: IAddActionPayload | IUpdateActionPayload | IDeleteActionPayload;
    successAction?: (entities: any[], code: number, message?: string) => IResultAction;
    failAction?: (entities: IEntityClass[], code: number, message?: string) => IResultAction;
}

export interface ICallApiAction<T = any> extends IAction {
    endpoint: string;
    method: HttpMethods;
    payload?: any;
    successAction?: (data: any, code: number, message?: string) => IResultAction;
    failAction?: (data: any, code: number, message?: string) => IResultAction;
}

export interface IResponseData {
    success: boolean;
    code: number;
    message: string;
}

export interface IEntityResponseData extends IResponseData {
    entities: IAnyObject[];
}

export interface IDataResponseData extends IResponseData {
    data: IAnyObject;
    options?: IAnyObject;
}

export interface IResultAction {
    type: string;
    response?: IDataResponseData | IEntityResponseData;
}

export interface IAnyObject {
    [attributes: string]: any;
}

export type HttpMethods = "get" | "post" | "put" | "delete";

export interface IHTTPMethods {
    GET: HttpMethods;
    POST: HttpMethods;
    PUT: HttpMethods;
    DELETE: HttpMethods;
}

export const httpMethods: IHTTPMethods = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
};

export interface IActionTypesRSF {
    request: string;
    success: string;
    failure: string;
}

export function createRSFActionTypes(prefix: string): IActionTypesRSF {
    return {
        request: prefix + "_REQUEST",
        success: prefix + "_SUCCESS",
        failure: prefix + "_FAILURE",
    };
}

export interface IEntityActionsTypes {
    add: IActionTypesRSF;
    load: IActionTypesRSF;
    loadAll: IActionTypesRSF;
    edit: IActionTypesRSF;
    delete: IActionTypesRSF;
}

export function createEntityActionTypes(entityName: string): IEntityActionsTypes {

    const addPrefix = "ADD_";
    const loadPrefix = "LOAD_";
    const loadAllPrefix = "LOAD_ALL_";
    const editPrefix = "EDIT_";
    const deletePrefix = "DELETE_";

    return {
        add: createRSFActionTypes(addPrefix + entityName),
        load: createRSFActionTypes(loadPrefix + entityName),
        loadAll: createRSFActionTypes(loadAllPrefix + entityName),
        edit: createRSFActionTypes(editPrefix + entityName),
        delete: createRSFActionTypes(deletePrefix + entityName),
    };
}

export interface IEntityActions {
    add: (entities: IEntityClass[]) => ICallEntityApiAction;
    load: (id: number) => ICallEntityApiAction;
    loadAll: () => ICallEntityApiAction;
    edit: (entities: IEntityClass[]) => ICallEntityApiAction;
    delete: (ids: number[]) => ICallEntityApiAction;
}

export interface IEntityActionsObject {
    actionTypes: IEntityActionsTypes;
    actions: IEntityActions;
    apiPaths: IRestCallApiPaths;
}

export const standardResultAction = (actionType: string, success: boolean, options?: any) =>
    (data: any, code: number, message?: string): IResultAction => {
        return ({
            type: actionType,
            response: {
                success,
                code,
                message,
                data,
                options
            }
        });
    };
export const standardEntityResultAction = (actionType: string, success: boolean) =>
    (entities: any[], code: number, message?: string): IResultAction => {
        return ({
            type: actionType,
            response: {
                success,
                code,
                message,
                entities
            }
        });
    };

export const standardAddAction = (actionType: IActionTypesRSF, endpoint: string) =>
    (entities: IEntityClass[]): ICallEntityApiAction => {
        return ({
            method: httpMethods.POST,
            endpoint,
            payload: {
                entities,
            },
            type: actionType.request,
            successAction: standardEntityResultAction(actionType.success, true),
            failAction: standardEntityResultAction(actionType.failure, false),
            isApiAction: true,
        });
    };
export const standardLoadOneAction = (actionType: IActionTypesRSF, endpoint: string) =>
    (id: number): ICallEntityApiAction => {
        return ({
            method: httpMethods.GET,
            endpoint: endpoint + id,
            type: actionType.request,
            successAction: standardEntityResultAction(actionType.success, true),
            failAction: standardEntityResultAction(actionType.failure, false),
            isApiAction: true,
        });
    };
export const standardLoadAction = (actionType: IActionTypesRSF, endpoint: string) =>
    (): ICallEntityApiAction => {
        return ({
            method: httpMethods.GET,
            endpoint,
            type: actionType.request,
            successAction: standardEntityResultAction(actionType.success, true),
            failAction: standardEntityResultAction(actionType.failure, false),
            isApiAction: true,
        });
    };
export const standardUpdateAction = (actionType: IActionTypesRSF, endpoint: string) =>
    (entities: IEntityClass[]): ICallEntityApiAction => {
        return ({
            method: httpMethods.PUT,
            endpoint,
            payload: {
                entities,
            },
            type: actionType.request,
            successAction: standardEntityResultAction(actionType.success, true),
            failAction: standardEntityResultAction(actionType.failure, false),
            isApiAction: true,
        });
    };

export const standardDeleteAction = (actionType: IActionTypesRSF, endpoint: string) =>
    (ids: number[]): ICallEntityApiAction => {
        return ({
            method: httpMethods.DELETE,
            endpoint,
            payload: {
                ids,
            },
            type: actionType.request,
            successAction: standardResultAction(actionType.success, true),
            failAction: standardResultAction(actionType.failure, false),
            isApiAction: true,
        });
    };

export function createEntityActions(entityName: string): IEntityActionsObject {

    const actionTypes = createEntityActionTypes(entityName.toUpperCase());
    const apiPaths = createApiCallPathObject("/" + entityName);

    return {
        actionTypes,
        apiPaths,
        actions: {
            add: standardAddAction(actionTypes.add, apiPaths.create),
            load: standardLoadOneAction(actionTypes.load, apiPaths.readOne),
            loadAll: standardLoadAction(actionTypes.loadAll, apiPaths.read),
            edit: standardUpdateAction(actionTypes.edit, apiPaths.update),
            delete: standardDeleteAction(actionTypes.delete, apiPaths.delete)
        }
    };
}

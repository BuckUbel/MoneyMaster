"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../helper/util");
exports.httpMethods = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
};
function createRSFActionTypes(prefix) {
    return {
        request: prefix + "_REQUEST",
        success: prefix + "_SUCCESS",
        failure: prefix + "_FAILURE",
    };
}
exports.createRSFActionTypes = createRSFActionTypes;
function createEntityActionTypes(entityName) {
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
exports.createEntityActionTypes = createEntityActionTypes;
exports.standardResultAction = (actionType, success, options) => (data, code, message) => {
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
exports.standardEntityResultAction = (actionType, success) => (entities, code, message) => {
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
exports.standardAddAction = (actionType, endpoint) => (entities) => {
    return ({
        method: exports.httpMethods.POST,
        endpoint,
        payload: {
            entities,
        },
        type: actionType.request,
        successAction: exports.standardEntityResultAction(actionType.success, true),
        failAction: exports.standardEntityResultAction(actionType.failure, false),
        isApiAction: true,
    });
};
exports.standardLoadOneAction = (actionType, endpoint) => (id) => {
    return ({
        method: exports.httpMethods.GET,
        endpoint: endpoint + "/" + id,
        type: actionType.request,
        successAction: exports.standardEntityResultAction(actionType.success, true),
        failAction: exports.standardEntityResultAction(actionType.failure, false),
        isApiAction: true,
    });
};
exports.standardLoadAction = (actionType, endpoint) => () => {
    return ({
        method: exports.httpMethods.GET,
        endpoint,
        type: actionType.request,
        successAction: exports.standardEntityResultAction(actionType.success, true),
        failAction: exports.standardEntityResultAction(actionType.failure, false),
        isApiAction: true,
    });
};
exports.standardUpdateAction = (actionType, endpoint) => (entities) => {
    return ({
        method: exports.httpMethods.PUT,
        endpoint,
        payload: {
            entities,
        },
        type: actionType.request,
        successAction: exports.standardEntityResultAction(actionType.success, true),
        failAction: exports.standardEntityResultAction(actionType.failure, false),
        isApiAction: true,
    });
};
exports.standardDeleteAction = (actionType, endpoint) => (ids) => {
    return ({
        method: exports.httpMethods.DELETE,
        endpoint,
        payload: {
            ids,
        },
        type: actionType.request,
        successAction: exports.standardEntityResultAction(actionType.success, true),
        failAction: exports.standardEntityResultAction(actionType.failure, false),
        isApiAction: true,
    });
};
function createEntityActions(entityName) {
    const actionTypes = createEntityActionTypes(entityName.toUpperCase());
    const apiPaths = util_1.createApiCallPathObject("/" + entityName);
    return {
        actionTypes,
        apiPaths,
        actions: {
            add: exports.standardAddAction(actionTypes.add, apiPaths.create),
            load: exports.standardLoadOneAction(actionTypes.load, apiPaths.readOne),
            loadAll: exports.standardLoadAction(actionTypes.loadAll, apiPaths.read),
            edit: exports.standardUpdateAction(actionTypes.edit, apiPaths.update),
            delete: exports.standardDeleteAction(actionTypes.delete, apiPaths.delete)
        }
    };
}
exports.createEntityActions = createEntityActions;

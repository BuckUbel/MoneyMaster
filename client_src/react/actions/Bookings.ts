import {
    ICallApiAction,
    standardResultAction
} from "../../../base/actions/Entity";
import {pathToDownloadFromSPK} from "../../../base/config";

export enum ActionTypes {
    DOWNLOAD_FROM_SPK = "DOWNLOAD_FROM_SPK",
    DOWNLOAD_FROM_SPK_SUCCESS = "DOWNLOAD_FROM_SPK_SUCCESS",
    DOWNLOAD_FROM_SPK_FAIL = "DOWNLOAD_FROM_SPK_FAIL",
}

export const downloadFromSPK = (pwd: string, fct?: () => void): ICallApiAction => {
    return ({
        type: ActionTypes.DOWNLOAD_FROM_SPK,
        endpoint: pathToDownloadFromSPK,
        method: "post",
        payload: {
            pwd,
        },
        isApiAction: true,
        successAction: standardResultAction(ActionTypes.DOWNLOAD_FROM_SPK_SUCCESS, true,
            {noPasswordFunction: fct}),
        failAction: standardResultAction(ActionTypes.DOWNLOAD_FROM_SPK_FAIL, false),
    });
};

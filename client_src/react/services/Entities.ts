import {ThunkDispatch} from "redux-thunk";
import {IRootState} from "../store";
import {Action} from "redux";
import {bookingActions} from "../../../base/model/BookingModel";
import {load} from "../api";
import {categoryActions} from "../../../base/model/CategoryModel";
import {shortDescriptionActions} from "../../../base/model/ShortDescriptionModel";
import {accountActions} from "../../../base/model/AccountModel";
import {vBookingActions} from "../../../base/model/VBookingModel";

export const loadAllEntities = (dispatch: ThunkDispatch<IRootState, void, Action>) => {
    return new Promise(async (res, rej) => {
        try {
            await dispatch(load(accountActions.actions.loadAll()));
            await dispatch(load(bookingActions.actions.loadAll()));
            await dispatch(load(vBookingActions.actions.loadAll()));
            await dispatch(load(categoryActions.actions.loadAll()));
            await dispatch(load(shortDescriptionActions.actions.loadAll()));
            res(true);
        } catch (err) {
            rej(err);
        }
    });
};

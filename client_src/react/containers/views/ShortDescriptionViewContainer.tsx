import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {load} from "../../api";
import {IRootState} from "../../store";
import {shortDescriptionActions, IShortDescriptionIdentity} from "../../../../base/model/ShortDescriptionModel";
import ShortDescriptionTableView from "../../components/views/ShortDescriptionTableView";

const mapsStateToProps = (state: IRootState) => {
    return ({shortDescriptions: state.shortDescriptions.data});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    addShortDescriptions: (shortDescriptions: IShortDescriptionIdentity[]) =>
        dispatch(load(shortDescriptionActions.actions.add(shortDescriptions))),
    editShortDescriptions: (shortDescriptions: IShortDescriptionIdentity[]) =>
        dispatch(load(shortDescriptionActions.actions.edit(shortDescriptions))),
});
const ShortDescriptionViewContainer = connect(mapsStateToProps, mapDispatchToProps)(ShortDescriptionTableView);
export default ShortDescriptionViewContainer;

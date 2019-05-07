import * as React from "react";
import {IRootState} from "../../store";
import {IVBookingIdentity, vBookingActions, VBookingModel} from "../../../../base/model/VBookingModel";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {load} from "../../api";
import {connect} from "react-redux";
import {IVBookingOwnProps} from "../core/VBookingContainer";
import {IEntityClass} from "../../../../base/helper/Entity";
import ChangeVBookingsCategoryDialog, {
    IChangeVBookingsCategoryDialogProps,
    IChangeVBookingsCategoryDialogRealProps
} from "../../components/dialogs/ChangeVBookingsCategoryDialog";
import {BookingModel} from "../../../../base/model/BookingModel";

export interface IChangeVBookingsCategoryDialogContainerProps extends IChangeVBookingsCategoryDialogRealProps {
    categories: CategoryModel[];
}

export interface IChangeVBookingsCategoryDialogContainerState {
}

export const defaultState: IChangeVBookingsCategoryDialogContainerState = {};

class ChangeVBookingsCategoryDialogContainer
    extends React.Component<IChangeVBookingsCategoryDialogContainerProps,
        IChangeVBookingsCategoryDialogContainerState> {

    public state: IChangeVBookingsCategoryDialogContainerState = defaultState;

    constructor(props: IChangeVBookingsCategoryDialogContainerProps) {
        super(props);
    }

    public render() {
        return (
            <React.Fragment>
                <ChangeVBookingsCategoryDialog {...this.props}/>
            </React.Fragment>
        );
    }
}

const mapsStateToProps = (state: IRootState, ownProps: IChangeVBookingsCategoryDialogRealProps) => {
    return {categories: state.categories.data};
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({});
export default connect(mapsStateToProps, mapDispatchToProps)(ChangeVBookingsCategoryDialogContainer);

import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {load} from "../../api";
import {IRootState} from "../../store";
import {
    shortDescriptionActions,
    ShortDescriptionModel,
    IShortDescriptionIdentity
} from "../../../../base/model/ShortDescriptionModel";
import ShortDescriptionTableView from "../../components/views/ShortDescriptionTableView";
import * as React from "react";

export interface IShortDescriptionViewContainerProps {
    shortDescriptions: ShortDescriptionModel[];
    fetchAllShortDescriptions: () => Promise<any>;
    addShortDescriptions: (shortDescriptions: IShortDescriptionIdentity[]) => Promise<any>;
    editShortDescriptions: (shortDescriptions: IShortDescriptionIdentity[]) => Promise<any>;
}

export interface IShortDescriptionViewContainerState {
}

export const defaultState: IShortDescriptionViewContainerState = {};

class ShortDescriptionViewContainer extends React.Component<IShortDescriptionViewContainerProps, IShortDescriptionViewContainerState> {


    public state: IShortDescriptionViewContainerState = defaultState;

    public constructor(props: IShortDescriptionViewContainerProps) {
        super(props);
        this.addShortDescription = this.addShortDescription.bind(this);
        this.addShortDescription = this.addShortDescription.bind(this);
    }

    public async addShortDescription(shortDescription: ShortDescriptionModel) {
        try {
            await this.props.addShortDescriptions([shortDescription]);
            await this.props.fetchAllShortDescriptions();
        } catch (error) {
            console.error(error);
        }
    }

    public async editShortDescription(shortDescription: ShortDescriptionModel) {
        try {
            await this.props.editShortDescriptions([shortDescription]);
        } catch (error) {
            console.error(error);
        }
    }

    public render() {
        const {shortDescriptions} = this.props;
        return (
            <ShortDescriptionTableView shortDescriptions={shortDescriptions}
                                       addShortDescription={this.addShortDescription}
                                       editShortDescription={this.editShortDescription}
            />
        );
    }
}

const mapsStateToProps = (state: IRootState) => {
    return ({shortDescriptions: state.shortDescriptions.data});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchAllShortDescriptions: () => dispatch(load(shortDescriptionActions.actions.loadAll())),
    addShortDescriptions: (shortDescriptions: IShortDescriptionIdentity[]) =>
        dispatch(load(shortDescriptionActions.actions.add(shortDescriptions))),
    editShortDescriptions: (shortDescriptions: IShortDescriptionIdentity[]) =>
        dispatch(load(shortDescriptionActions.actions.edit(shortDescriptions))),
});
export default connect(mapsStateToProps, mapDispatchToProps)(ShortDescriptionViewContainer);

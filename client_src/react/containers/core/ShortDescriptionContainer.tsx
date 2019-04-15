import * as React from "react";
import {IRootState} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {load} from "../../api";
import {connect} from "react-redux";
import {
    IShortDescriptionIdentity,
    shortDescriptionActions,
    ShortDescriptionModel
} from "../../../../base/model/ShortDescriptionModel";
import {IEntityClass} from "../../../../base/helper/Entity";
import ShortDescription from "../../components/core/ShortDescription";

export interface IShortDescriptionContainerProps {
    fetchShortDescription: (id: number) => Promise<any>;
    editShortDescriptions: (accounts: IShortDescriptionIdentity[]) => Promise<any>;
    deleteShortDescriptions: (ids: number[]) => Promise<any>;
    entity: ShortDescriptionModel;
}

export interface IShortDescriptionOwnProps {
    entity: IEntityClass;

}

class ShortDescriptionContainer extends React.Component<IShortDescriptionContainerProps, {}> {

    constructor(props: IShortDescriptionContainerProps) {
        super(props);
        this.editShortDescription = this.editShortDescription.bind(this);
        this.deleteShortDescription = this.deleteShortDescription.bind(this);
    }

    public async componentDidMount() {
        await this.props.fetchShortDescription(this.props.entity.id);
    }

    public async editShortDescription(shortDescription: IShortDescriptionIdentity) {
        try {
            await this.props.editShortDescriptions([shortDescription]);
            await this.props.fetchShortDescription(this.props.entity.id);
        } catch (error) {
            console.error(error);

        }
    }

    public async deleteShortDescription(id: number) {
        try {
            await this.props.deleteShortDescriptions([id]);
            await this.props.fetchShortDescription(this.props.entity.id);
        } catch (error) {
            console.error(error);
        }
    }

    public render() {
        return (
            <React.Fragment>
                {this.props.entity &&
                <ShortDescription
                    entity={this.props.entity}
                    deleteAction={this.deleteShortDescription}
                    editAction={this.editShortDescription}
                />}
            </React.Fragment>
        );
    }
}

const mapsStateToProps = (state: IRootState, ownProps: IShortDescriptionOwnProps) => {
    return (
        {
            entity: ownProps.entity ?
                ownProps.entity.id ?
                    state.shortDescriptions.data.find((account) => account.id === Number(ownProps.entity.id)) :
                    null :
                null,
        }
    );
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchShortDescription: (id: number) => dispatch(load(shortDescriptionActions.actions.load(id))),
    editShortDescriptions: (shortDescriptions: IShortDescriptionIdentity[]) =>
        dispatch(load(shortDescriptionActions.actions.edit(shortDescriptions))),
    deleteShortDescriptions: (ids: number[]) => dispatch(load(shortDescriptionActions.actions.delete(ids))),
});
export default connect(mapsStateToProps, mapDispatchToProps)(ShortDescriptionContainer);

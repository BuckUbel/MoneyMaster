import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {load} from "../../api";
import {IRootState} from "../../store";
import HomeView, {IHomeViewProps, IHomeViewState} from "../../components/views/HomeView";
import * as React from "react";
import {AccountModel} from "../../../../base/model/AccountModel";

export interface IHomeViewContainerProps {
    accounts: AccountModel[];
}

export interface IHomeViewContainerState {
}

const defaultState: IHomeViewState = {};

class AccountViewContainer extends React.Component<IHomeViewContainerProps, IHomeViewContainerState> {
    public state: IHomeViewContainerState = defaultState;

    constructor(props: IHomeViewContainerProps) {
        super(props);
    }

    public render() {
        const {accounts} = this.props;
        return (
            <HomeView accounts={accounts}/>
        );
    }
}

const mapsStateToProps = (state: IRootState) => {
    return ({
        accounts: state.accounts.data
    });
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
});
export default connect(mapsStateToProps, mapDispatchToProps)(AccountViewContainer);

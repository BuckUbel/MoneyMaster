import {connect} from "react-redux";

import App from "../App";
import {IRootState} from "../store";
import * as React from "react";
import HomeView, {IHomeViewState} from "../components/views/HomeView";
import {IState} from "../reducers/Application";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {load} from "../api";
import {accountActions} from "../../../base/model/AccountModel";
import {loadAllEntities} from "../services/Entities";
import {setLoading} from "../actions/Application";


export interface IAppContainerProps {
    application: IState;
    fetchAllAccounts: () => Promise<any>;
    setLoading: (isLoading: boolean) => Promise<any>;
}

export interface IAppContainerState {
}

const defaultState: IHomeViewState = {};

class AppContainer extends React.Component<IAppContainerProps, IAppContainerState> {
    public state: IAppContainerState = defaultState;

    constructor(props: IAppContainerProps) {
        super(props);
    }

    public componentDidMount() {
        this.fetchEntities(false)();
    }

    public fetchEntities(isLoading: boolean) {
        return () => {
            if (!isLoading) {
                this.props.fetchAllAccounts().then(() => {
                    return this.props.setLoading(false);
                }).then(() => {
                    console.log("All Entities are loaded successfully.");
                }).catch((error) => {
                    console.error("Error on loading entities.");
                    console.error(error);
                });
            }
        };
    }

    public render() {
        const {isLoading} = this.props.application;
        return (
            <App isLoading={isLoading} loadEntities={this.fetchEntities}/>
        );
    }
}

const mapStateToProps = (state: IRootState) => {
    return ({
        application: state.application
    });
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchAllAccounts: () => loadAllEntities(dispatch),
    setLoading: (isLoading: boolean) => dispatch(load(setLoading(isLoading))),

});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

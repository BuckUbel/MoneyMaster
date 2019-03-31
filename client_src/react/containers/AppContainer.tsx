import {connect} from "react-redux";

import App from "../App";
import {IRootState} from "../store";
import * as React from "react";
import HomeView, {IHomeViewState} from "../components/views/HomeView";
import {IState} from "../reducers/Application";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {load} from "../api";
import {loadAllEntities} from "../services/Entities";
import {setLoading} from "../actions/Application";
import {downloadFromSPK} from "../actions/Bookings";

export interface IAppContainerProps {
    application: IState;
    fetchAllAccounts: () => Promise<any>;
    setLoading: (isLoading: boolean) => Promise<any>;
    downloadFromSPK: (password: string, fct?: () => void) => Promise<any>;
}

export interface IAppContainerState {}

const defaultState: IHomeViewState = {};

class AppContainer extends React.Component<IAppContainerProps, IAppContainerState> {
    public state: IAppContainerState = defaultState;

    constructor(props: IAppContainerProps) {
        super(props);
        this.fetchEntities = this.fetchEntities.bind(this);
        this.downloadFromSPK = this.downloadFromSPK.bind(this);
        this.testDownloadFromSPK = this.testDownloadFromSPK.bind(this);
    }

    public componentDidMount() {
        this.fetchEntities(false)();
    }

    public fetchEntities(isLoading: boolean) {
        return async () => {
            if (!isLoading) {
                try {
                    await this.props.setLoading(true);
                    await this.props.fetchAllAccounts();
                    await this.props.setLoading(false);
                    console.log("All Entities are loaded successfully.");
                } catch (error) {
                    console.error("Error on loading entities.");
                    console.error(error);
                }
            }
        };
    }

    public async downloadFromSPK(password: string) {
        try {
            await this.props.downloadFromSPK(password);
        } catch (error) {
            console.error(error);
        }
    }

    public async testDownloadFromSPK(failFunction: () => void) {
        try {
            await this.props.downloadFromSPK("", failFunction);
        } catch (error) {
            console.error(error);
        }
    }

    public render() {
        const {isLoading} = this.props.application;
        return (
            <App
                isLoading={isLoading}
                loadEntities={this.fetchEntities}
                downloadFromSPK={this.downloadFromSPK}
                testPassword={this.testDownloadFromSPK}
            />
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
    downloadFromSPK: (password: string, fct?: () => void) => dispatch(load(downloadFromSPK(password, fct))),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

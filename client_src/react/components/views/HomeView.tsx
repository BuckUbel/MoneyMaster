import * as React from "react";
import {Divider, Grid, Typography} from "@material-ui/core";
import {AccountModel} from "../../../../base/model/AccountModel";
import Account from "../core/Account";

export interface IHomeViewProps {
    accounts: AccountModel[];
}

export interface IHomeViewState {
}

const defaultState: IHomeViewState = {};

export default class HomeView extends React.Component<IHomeViewProps, IHomeViewState> {

    public state: IHomeViewState = defaultState;

    constructor(props: IHomeViewProps) {
        super(props);
        this.resetView = this.resetView.bind(this);
    }

    public resetView() {
        this.setState(defaultState);
    }

    public render() {
        const {accounts} = this.props;

        return (
            <Grid item xs={12} container spacing={24}>
                <Grid item xs={12} key={2}>
                    <Divider variant={"middle"}/>
                </Grid>
                <Grid item xs={12} container spacing={32} key={3}>
                    {accounts.length > 0 && <Account entity={accounts.filter((account) => account.isReal)[0]} />}
                    {/*<AccountTable accounts={accounts}/>*/}
                </Grid>
            </Grid>
        );
    }
}

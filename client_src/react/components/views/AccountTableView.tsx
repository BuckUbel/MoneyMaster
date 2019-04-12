import * as React from "react";
import {Divider, Grid} from "@material-ui/core";
import AccountTable from "../tables/AccountTable";
import {AccountModel, IAccountIdentity} from "../../../../base/model/AccountModel";
import AddAccountDialog from "../dialogs/AddAccountDialog";

export interface IAccountViewProps {
    accounts: AccountModel[];
    addAccount: (accounts: IAccountIdentity) => void;
    editAccount: (accounts: IAccountIdentity) => void;
}

export interface IAccountViewState {
}

const defaultState: IAccountViewState = {};

export default class AccountTableView extends React.Component<IAccountViewProps, IAccountViewState> {

    public state: IAccountViewState = defaultState;

    constructor(props: IAccountViewProps) {
        super(props);
        this.resetMonth = this.resetMonth.bind(this);
    }

    public resetMonth() {
        this.setState(defaultState);
    }

    public render() {
        const {accounts, addAccount} = this.props;

        return (
            <Grid item xs={12} container spacing={24}>
                <Grid container item xs={12} key={1}>
                    <Grid item xs={2}>
                        <AddAccountDialog submit={addAccount}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} key={2}>
                    <Divider variant={"middle"}/>
                </Grid>
                <Grid item xs={12} container spacing={32} key={3}>
                    <AccountTable accounts={accounts}/>
                </Grid>
            </Grid>
        );
    }
}

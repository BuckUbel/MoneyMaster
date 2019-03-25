import * as React from "react";
import Button from "@material-ui/core/Button";
import {Divider, Grid, Typography} from "@material-ui/core";
import AccountTable from "../tables/AccountTable";
import {AccountModel, IAccountIdentity} from "../../../../base/model/AccountModel";

export interface IAccountViewProps {
    accounts: AccountModel[];
    fetchAllAccounts: () => Promise<any>;
    addAccounts: (accounts: IAccountIdentity[]) => Promise<any>;
    editAccounts: (accounts: IAccountIdentity[]) => Promise<any>;
}

export interface IAccountViewState {
}

const defaultState: IAccountViewState = {};

export default class AccountTableView extends React.Component<IAccountViewProps, IAccountViewState> {

    public state: IAccountViewState = defaultState;

    constructor(props: IAccountViewProps) {
        super(props);
        this.loadForTable = this.loadForTable.bind(this);
        this.resetMonth = this.resetMonth.bind(this);
    }

    public componentDidMount() {
        this.loadForTable();
    }

    public loadForTable() {
        this.props.fetchAllAccounts()
            .then(() => {
                    console.log("Success");
                },
            )
            .catch(() => {
                console.log("Error");
            });
    }

    public resetMonth() {
        this.setState(defaultState);
    }

    public render() {
        const {accounts} = this.props;

        return (
            <Grid item xs={12} container spacing={24}>
                <Grid key={1} item xs={12} container spacing={16}>
                    <Grid item key={1}>
                        <Button onClick={this.loadForTable} color={"primary"} variant={"contained"}> Tabelle
                            laden</Button>
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

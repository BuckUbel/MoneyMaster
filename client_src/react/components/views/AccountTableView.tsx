import * as React from "react";
import {Divider, Grid, Typography} from "@material-ui/core";
import AccountTable from "../tables/AccountTable";
import {AccountModel, IAccountIdentity} from "../../../../base/model/AccountModel";
import AddAccountDialog from "../dialogs/AddEntity/AddAccountDialog";
import MoveMoneyDialog from "../dialogs/MoveMoneyDialog";
import {boolean} from "joi";
import {IMoveMoneyParams} from "../forms/MoveMoneyForm";

export interface IAccountViewProps {
    accounts: AccountModel[];
    addAccounts: (accounts: IAccountIdentity[]) => void;
    editAccounts: (accounts: IAccountIdentity[]) => void;
}

export interface IAccountViewState {
}

const defaultState: IAccountViewState = {};

export default class AccountTableView extends React.Component<IAccountViewProps, IAccountViewState> {

    public state: IAccountViewState = defaultState;

    constructor(props: IAccountViewProps) {
        super(props);
        this.resetMonth = this.resetMonth.bind(this);
        this.moveMoney = this.moveMoney.bind(this);
    }

    public resetMonth() {
        this.setState(defaultState);
    }

    public moveMoney(params: IMoveMoneyParams) {
        const {accounts} = this.props;
        const srcAccount = accounts.find((account: AccountModel) => {
            return account.name === params.srcAccountName;
        });
        const trgAccount = accounts.find((account: AccountModel) => {
            return account.name === params.trgAccountName;
        });
        if (srcAccount.isReal === false && trgAccount.isReal === false) {
            srcAccount.value = Number(srcAccount.value) - Number(params.value);
            trgAccount.value = Number(trgAccount.value) + Number(params.value);

            this.props.editAccounts([srcAccount, trgAccount]);
        }
        else {
            // TODO: Show error Mesage, because false account is selected
        }
    }

    public render() {
        const {accounts, addAccounts} = this.props;

        return (
            <Grid item xs={12} container spacing={24}>
                <Grid container item xs={12} key={1} justify={"space-between"}>
                    <Grid item xs={10}>
                        <Typography variant={"h3"}>
                            Kontenübersicht
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <MoveMoneyDialog submit={this.moveMoney} accounts={accounts}/>
                    </Grid>
                    <Grid item xs={1}>
                        <AddAccountDialog submit={addAccounts}/>
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

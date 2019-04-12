import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {load} from "../../api";
import {IRootState} from "../../store";
import {accountActions, AccountModel, IAccountIdentity} from "../../../../base/model/AccountModel";
import AccountTableView from "../../components/views/AccountTableView";
import * as React from "react";

export interface IAccountViewContainerProps {
    accounts: AccountModel[];
    fetchAllAccounts: () => Promise<any>;
    addAccounts: (accounts: IAccountIdentity[]) => Promise<any>;
    editAccounts: (accounts: IAccountIdentity[]) => Promise<any>;
}

export interface IAccountViewContainerState {
}

export const defaultState: IAccountViewContainerState = {};

class AccountViewContainer extends React.Component<IAccountViewContainerProps, IAccountViewContainerState> {


    public state: IAccountViewContainerState = defaultState;

    public constructor(props: IAccountViewContainerProps) {
        super(props);
        this.addAccount = this.addAccount.bind(this);
        this.addAccount = this.addAccount.bind(this);
    }

    public async addAccount(account: IAccountIdentity) {
        try {
            await this.props.addAccounts([account]);
            await this.props.fetchAllAccounts();
        } catch (error) {
            console.error(error);
        }
    }

    public async editAccount(account: IAccountIdentity) {
        try {
            await this.props.editAccounts([account]);
        } catch (error) {
            console.error(error);
        }
    }

    public render() {
        const {accounts} = this.props;
        return (
            <AccountTableView accounts={accounts}
                              addAccount={this.addAccount}
                              editAccount={this.editAccount}
            />
        );
    }
}

const mapsStateToProps = (state: IRootState) => {
    return ({accounts: state.accounts.data});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchAllAccounts: () => dispatch(load(accountActions.actions.loadAll())),
    addAccounts: (accounts: IAccountIdentity[]) => dispatch(load(accountActions.actions.add(accounts))),
    editAccounts: (accounts: IAccountIdentity[]) => dispatch(load(accountActions.actions.edit(accounts))),
});
export default connect(mapsStateToProps, mapDispatchToProps)(AccountViewContainer);

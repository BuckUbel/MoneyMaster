import * as React from "react";
import {IRootState} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {load} from "../../api";
import {accountActions, AccountModel, IAccountIdentity} from "../../../../base/model/AccountModel";
import {connect} from "react-redux";
import Account from "../../components/core/Account";

export interface IAccountContainerProps {
    id: number;
    fetchAccount: (id: number) => Promise<any>;
    editAccounts: (accounts: IAccountIdentity[]) => Promise<any>;
    account: AccountModel;
}

export interface IAccountOwnProps {
    id: number;
}

export interface IAccountContainerState {
}

class AccountContainer extends React.Component<IAccountContainerProps, IAccountContainerState> {

    public state: IAccountContainerState = {};

    constructor(props: IAccountContainerProps) {
        super(props);
    }

    public async componentDidMount() {
        await this.props.fetchAccount(this.props.id);
    }

    public async editAccounts(account: IAccountIdentity) {
        try {
            await this.props.editAccounts([account]);
            await this.props.fetchAccount(this.props.id);
        } catch (error) {
            console.error(error);
        }
    }

    public render() {
        return (
            <React.Fragment>
                {this.props.account && <Account entity={this.props.account} editAction={this.editAccounts}/>}
            </React.Fragment>
        );
    }
}

const mapsStateToProps = (state: IRootState, ownProps: IAccountOwnProps) => {
    return ({account: state.accounts.data.find((account) => account.id === Number(ownProps.id))});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchAccount: (id: number) => dispatch(load(accountActions.actions.load(id))),
    editAccounts: (accounts: IAccountIdentity[]) => dispatch(load(accountActions.actions.edit(accounts))),
});
export default connect(mapsStateToProps, mapDispatchToProps)(AccountContainer);

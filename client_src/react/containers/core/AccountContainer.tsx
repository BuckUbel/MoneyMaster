import * as React from "react";
import {IRootState} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {load} from "../../api";
import {accountActions, AccountModel, IAccountIdentity} from "../../../../base/model/AccountModel";
import {connect} from "react-redux";
import Account from "../../components/core/Account";
import {IEntityClass} from "../../../../base/helper/Entity";

export interface IAccountContainerProps {
    fetchAccount: (id: number) => Promise<any>;
    editAccounts: (accounts: IAccountIdentity[]) => Promise<any>;
    deleteAccounts: (ids: number[]) => Promise<any>;
    entity: AccountModel;
}

export interface IAccountOwnProps {
    entity: IEntityClass;
}

class AccountContainer extends React.Component<IAccountContainerProps, {}> {

    constructor(props: IAccountContainerProps) {
        super(props);
        this.editAccount = this.editAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    public async componentDidMount() {
        await this.props.fetchAccount(this.props.entity.id);
    }

    public async editAccount(account: IAccountIdentity) {
        try {
            await this.props.editAccounts([account]);
            await this.props.fetchAccount(this.props.entity.id);
        } catch (error) {
            console.error(error);
        }
    }

    public async deleteAccount(id: number) {
        try {
            await this.props.deleteAccounts([id]);
            await this.props.fetchAccount(this.props.entity.id);
        } catch (error) {
            console.error(error);
        }
    }

    public render() {
        return (
            <React.Fragment>
                {this.props.entity &&
                <Account
                    entity={this.props.entity}
                    editAction={this.editAccount}
                    deleteAction={this.deleteAccount}
                />
                }
            </React.Fragment>
        );
    }
}

const mapsStateToProps = (state: IRootState, ownProps: IAccountOwnProps) => {
    return (
        {
            entity: ownProps.entity ?
                ownProps.entity.id ?
                    state.accounts.data.find((account) => account.id === Number(ownProps.entity.id)) :
                    null :
                null,
        }
    );
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchAccount: (id: number) => dispatch(load(accountActions.actions.load(id))),
    editAccounts: (accounts: IAccountIdentity[]) => dispatch(load(accountActions.actions.edit(accounts))),
    deleteAccounts: (ids: number[]) => dispatch(load(accountActions.actions.delete(ids))),
});
export default connect(mapsStateToProps, mapDispatchToProps)(AccountContainer);

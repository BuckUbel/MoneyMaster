import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {load} from "../../api";
import {IRootState} from "../../store";
import {accountActions, IAccountIdentity} from "../../../../base/model/AccountModel";
import AccountTableView from "../../components/views/AccountTableView";

const mapsStateToProps = (state: IRootState) => {
    return ({accounts: state.accounts.data});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchAllAccounts: () => dispatch(load(accountActions.actions.loadAll())),
    addAccounts: (accounts: IAccountIdentity[]) => dispatch(load(accountActions.actions.add(accounts))),
    editAccounts: (accounts: IAccountIdentity[]) => dispatch(load(accountActions.actions.edit(accounts))),
});
const AccountViewContainer = connect(mapsStateToProps, mapDispatchToProps)(AccountTableView);
export default AccountViewContainer;

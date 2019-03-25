import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {load} from "../../api";
import {IRootState} from "../../store";
import {addAccountAction, editAccountAction, loadAllAccountAction} from "../../actions/Account";
import {IAccountIdentity} from "../../../../base/model/AccountModel";
import AccountTableView from "../../components/views/AccountTableView";

const mapsStateToProps = (state: IRootState) => {
    return ({accounts: state.accounts.data});
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchAllAccounts: () => dispatch(load(loadAllAccountAction)),
    addAccounts: (accounts: IAccountIdentity[]) => dispatch(load(addAccountAction(accounts))),
    editAccounts: (accounts: IAccountIdentity[]) => dispatch(load(editAccountAction(accounts))),
});
const AccountViewContainer = connect(mapsStateToProps, mapDispatchToProps)(AccountTableView);
export default AccountViewContainer;

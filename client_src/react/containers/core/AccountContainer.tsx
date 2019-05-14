import * as React from "react";
import {IRootState} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {load} from "../../api";
import {accountActions, AccountModel, IAccountIdentity} from "../../../../base/model/AccountModel";
import {connect} from "react-redux";
import Account from "../../components/core/Account";
import {IEntityClass} from "../../../../base/helper/Entity";
import {IVBookingIdentity, vBookingActions, VBookingModel} from "../../../../base/model/VBookingModel";
import {BookingModel} from "../../../../base/model/BookingModel";

export interface IAccountContainerProps {
    fetchAccount: (id: number) => Promise<any>;
    editAccounts: (accounts: IAccountIdentity[]) => Promise<any>;
    deleteAccounts: (ids: number[]) => Promise<any>;
    entity: AccountModel;
    vBookings: VBookingModel[];
    addVBooking: (entities: IVBookingIdentity[]) => Promise<any>;
    fetchAllVBooking: () => Promise<any>;
}

export interface IAccountOwnProps {
    entity: IEntityClass;
}

class AccountContainer extends React.Component<IAccountContainerProps, {}> {

    constructor(props: IAccountContainerProps) {
        super(props);
        this.editAccount = this.editAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.addVBooking = this.addVBooking.bind(this);
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

    public async addVBooking() {
        try {
            const associatedVBookingSum = this.props.vBookings.length > 0 ? this.props.vBookings
                .map(
                    (aVB) => aVB.value)
                .reduce(
                    (acc, cV) => acc + cV) : 0;
            const newVBooking = VBookingModel.createEmptyEntity();
            newVBooking.accountId = this.props.entity.id;
            newVBooking.categoryId = 1;
            newVBooking.name = this.props.entity.name;
            newVBooking.description = this.props.entity.description;
            newVBooking.value = this.props.entity.value - associatedVBookingSum;
            await this.props.addVBooking([newVBooking]);
            await this.props.fetchAllVBooking();
        } catch (error) {
            console.error(error);
        }
    }

    public async deleteAccount(id: number) {
        if (this.props.entity.value === 0) {
            try {
                await this.props.deleteAccounts([id]);
                await this.props.fetchAccount(this.props.entity.id);
            } catch (error) {
                console.error(error);
            }
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
                    vBookings={this.props.vBookings}
                    addVBooking={this.addVBooking}
                />
                }
            </React.Fragment>
        );
    }
}

const mapsStateToProps = (state: IRootState, ownProps: IAccountOwnProps) => {
    let virtualBookings: VBookingModel[] = [];
    let thisEntity: AccountModel = null;
    if (ownProps.entity) {
        if (ownProps.entity.id) {
            const seekedId: number = Number(ownProps.entity.id);
            thisEntity = state.accounts.data.find((account: AccountModel) => account.id === seekedId);
            virtualBookings = state.vBookings.data.filter((vb: VBookingModel) => vb.accountId === seekedId);
            // if no entity with this id is found
            if (!thisEntity) {
                thisEntity = AccountModel.createEmptyEntity();
                thisEntity.id = ownProps.entity.id;
            }
        }
    }
    return {
        entity: thisEntity,
        vBookings: virtualBookings
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchAccount: (id: number) => dispatch(load(accountActions.actions.load(id))),
    editAccounts: (accounts: IAccountIdentity[]) => dispatch(load(accountActions.actions.edit(accounts))),
    deleteAccounts: (ids: number[]) => dispatch(load(accountActions.actions.delete(ids))),
    fetchAllVBooking: () => dispatch(load(vBookingActions.actions.loadAll())),
    addVBooking: (entities: IVBookingIdentity[]) => dispatch(load(vBookingActions.actions.add(entities))),
});
export default connect(mapsStateToProps, mapDispatchToProps)(AccountContainer);

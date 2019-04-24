import * as React from "react";
import {IRootState} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {load} from "../../api";
import {bookingActions, BookingModel, IBookingIdentity} from "../../../../base/model/BookingModel";
import {connect} from "react-redux";
import Booking from "../../components/core/Booking";
import {IEntityClass} from "../../../../base/helper/Entity";
import {IMoveMoneyFormProps, IMoveMoneyFormState} from "../../components/forms/MoveMoneyForm";
import {IVBookingIdentity, vBookingActions, VBookingModel} from "../../../../base/model/VBookingModel";

export interface IBookingContainerProps {
    fetchBooking: (id: number) => Promise<any>;
    fetchAllVBooking: () => Promise<any>;
    // editBookings: (bookings: IBookingIdentity[]) => Promise<any>;
    // deleteBookings: (ids: number[]) => Promise<any>;
    entity: BookingModel;
    vBookings: VBookingModel[];
    addVBooking: (entities: IVBookingIdentity[]) => Promise<any>;
}

export interface IBookingOwnProps {
    entity: IEntityClass;
}

export interface IBookingState {
}

class BookingContainer extends React.Component<IBookingContainerProps, IBookingState> {

    constructor(props: IBookingContainerProps) {
        super(props);
        this.addVBooking = this.addVBooking.bind(this);
        // this.editBooking = this.editBooking.bind(this);
        // this.deleteBooking = this.deleteBooking.bind(this);
    }

    public async componentDidMount() {
        await this.props.fetchBooking(this.props.entity.id);
    }

    public async addVBooking() {
        try {
            const associatedVBookingSum = this.props.vBookings.length > 0 ? this.props.vBookings
                .map(
                    (aVB) => aVB.value)
                .reduce(
                    (acc, cV) => acc + cV) : 0;
            const newVBooking = VBookingModel.createEmptyEntity();
            newVBooking.bookingId = this.props.entity.id;
            newVBooking.categoryId = 1;
            newVBooking.name = this.props.entity.payPartner;
            newVBooking.description = this.props.entity.purpose;
            newVBooking.value = this.props.entity.value - associatedVBookingSum;
            await this.props.addVBooking([newVBooking]);
            await this.props.fetchAllVBooking();
        } catch (error) {
            console.error(error);
        }
    }

    //
    // public async editBooking(booking: IBookingIdentity) {
    //     try {
    //         await this.props.editBookings([booking]);
    //         await this.props.fetchBooking(this.props.entity.id);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    //
    // public async deleteBooking(id: number) {
    //     try {
    //         await this.props.deleteBookings([id]);
    //         await this.props.fetchBooking(this.props.entity.id);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    public render() {
        return (
            <React.Fragment>
                {this.props.entity &&
                <Booking
                    entity={this.props.entity}
                    vBookings={this.props.vBookings}
                    addVBooking={this.addVBooking}
                />
                }
            </React.Fragment>
        );
    }
}

const mapsStateToProps = (state: IRootState, ownProps: IBookingOwnProps) => {
    let virtualBookings: VBookingModel[] = [];
    let thisEntity: BookingModel = null;
    if (ownProps.entity) {
        if (ownProps.entity.id) {
            const seekedId: number = Number(ownProps.entity.id);
            thisEntity = state.bookings.data.find((booking) => booking.id === seekedId);
            virtualBookings = state.vBookings.data.filter((vb: VBookingModel) => vb.bookingId === seekedId);
        }
    }
    return {
        entity: thisEntity,
        vBookings: virtualBookings
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchBooking: (id: number) => dispatch(load(bookingActions.actions.load(id))),
    fetchAllVBooking: () => dispatch(load(vBookingActions.actions.loadAll())),
    addVBooking: (entities: IVBookingIdentity[]) => dispatch(load(vBookingActions.actions.add(entities))),
    // editBookings: (bookings: IBookingIdentity[]) => dispatch(load(bookingActions.actions.edit(bookings))),
    // deleteBookings: (ids: number[]) => dispatch(load(bookingActions.actions.delete(ids))),
});
export default connect(mapsStateToProps, mapDispatchToProps)(BookingContainer);

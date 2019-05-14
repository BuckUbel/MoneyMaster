import * as React from "react";
import {
    BookingModel,
    IBookingIdentity,
} from "../../../../base/model/BookingModel";
import Button from "@material-ui/core/Button";
import {Divider, Grid, Typography} from "@material-ui/core";
import BookingTable from "../tables/BookingTable";
import Booking from "../core/Booking";
import DateTextField from "../core/simple/DateTextField";
import {stringToDate} from "../../../../base/helper/util";
import {
    IChangeVBookingsCategoryFormProps,
    IChangeVBookingsCategoryFormState
} from "../forms/ChangeVBookingsCategoryForm";

export interface IBookingViewProps {
    bookings: BookingModel[];
    addBookings: (bookings: IBookingIdentity[]) => Promise<any>;
    editBookings: (bookings: IBookingIdentity[]) => Promise<any>;
}

export interface IBookingViewState {
}

const defaultState: IBookingViewState = {};

export default class BookingTableView extends React.Component<IBookingViewProps, IBookingViewState> {

    public state: IBookingViewState = defaultState;

    constructor(props: IBookingViewProps) {
        super(props);
        this.resetMonth = this.resetMonth.bind(this);
    }

    public resetMonth() {
        this.setState(defaultState);
    }

    public render() {
        const {bookings} = this.props;
        return (
            <Grid item xs={12} container spacing={24}>
                <Grid key={1} item xs={12} container spacing={16} justify={"space-between"}>
                    <Typography variant={"h3"}>
                        Buchungen
                    </Typography>
                </Grid>
                <Grid item xs={12} key={2}>
                    <Divider variant={"middle"}/>
                </Grid>
                <Grid item xs={12} container spacing={32} key={3}>
                    <BookingTable bookings={bookings}/>
                </Grid>
            </Grid>
        );
    }
}

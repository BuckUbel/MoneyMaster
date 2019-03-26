import * as React from "react";
import {
    BookingModel,
    IBookingIdentity,
} from "../../../../base/model/BookingModel";
import Button from "@material-ui/core/Button";
import {Divider, Grid, Typography} from "@material-ui/core";
import Booking from "../core/Booking";
import {changeDateMonthFirstDay, changeDateMonthLastDay} from "../../../../base/helper/time/dateHelper";

export interface IBookingViewProps {
    bookings: BookingModel[];
    fetchAllBookings: () => Promise<any>;
    addBookings: (bookings: IBookingIdentity[]) => Promise<any>;
    editBookings: (bookings: IBookingIdentity[]) => Promise<any>;
}

export interface IBookingViewState {
    filteredBookings: BookingModel[];
}

const defaultState: IBookingViewState = {
    filteredBookings: []
};

export default class BookingView extends React.Component<IBookingViewProps, IBookingViewState> {

    public static getDerivedStateFromProps(newProps: IBookingViewProps, oldState: IBookingViewState): IBookingViewState {
        const {bookings} = newProps;

        const prevDay = changeDateMonthLastDay(new Date(), -1).getTime();
        const newFilteredBooking = bookings.filter((booking: BookingModel): boolean => {
            return booking.bookingDate ? booking.bookingDate.getTime() > prevDay : false;
        }).sort(Booking.compareOnDate);

        return {
            filteredBookings: newFilteredBooking
        };
    }

    public state: IBookingViewState = defaultState;

    constructor(props: IBookingViewProps) {
        super(props);
        this.loadForTable = this.loadForTable.bind(this);
        this.resetMonth = this.resetMonth.bind(this);
    }

    public componentDidMount() {
        this.loadForTable();
    }

    public loadForTable() {
        this.props.fetchAllBookings()
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
        const {bookings} = this.props;
        const {filteredBookings} = this.state;

        const nowValue = 584.70;
        // if (bookings.length > 0) {
        //     nowValue = bookings.map((b) => {
        //         return b.value;
        //     }).reduce((accumulator: number, currentValue: number) => {
        //         return accumulator + currentValue;
        //     });
        // }
        return (
            <Grid item xs={12} container spacing={24}>
                <Grid key={1} item xs={12} container spacing={16}>
                    <Grid item key={1}>
                        <Button onClick={this.loadForTable} color={"primary"} variant={"contained"}> Tabelle
                            laden</Button>
                    </Grid>
                    <Grid item key={3}>
                        <Typography component={"h2"}>
                            {nowValue.toFixed(2) + " €"}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} key={2}>
                    <Divider variant={"middle"}/>
                </Grid>
                <Grid item xs={12} container spacing={32} key={3}>
                    {filteredBookings.map((booking, index) => {
                        return (
                            <Grid key={index} item xs={6}>
                                <Booking entity={booking}/>
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        );
    }
}

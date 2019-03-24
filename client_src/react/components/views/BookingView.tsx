import * as React from "react";
import {
    BookingModel,
    IBookingIdentity,
} from "../../../../base/model/BookingModel";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {Divider, Grid, Typography} from "@material-ui/core";
import Booking, {compareOnDate} from "../core/Booking";
import {IAccountIdentity} from "../../../../base/model/AccountModel";

export interface IBookingViewProps {
    bookings: BookingModel[];
    fetchAllBookings: () => Promise<any>;
    addBookings: (bookings: IBookingIdentity[]) => Promise<any>;
    editBookings: (bookings: IBookingIdentity[]) => Promise<any>;
    addAccount: (accounts: IAccountIdentity[]) => Promise<any>,
}

export interface IBookingViewState {
    uploadThing: any;
    upload: BookingModel[];
}

const defaultState: IBookingViewState = {
    uploadThing: {},
    upload: [],
};

export default class BookingView extends React.Component<IBookingViewProps, IBookingViewState> {

    public state: IBookingViewState = defaultState;

    constructor(props: IBookingViewProps) {
        super(props);
        this.loadForTable = this.loadForTable.bind(this);
        this.resetMonth = this.resetMonth.bind(this);
        this.addAccount = this.addAccount.bind(this);
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

    public addAccount() {
        this.props.addAccount([{
            id: null,
            name: "Sparkonto",
            description: "Dieses Konto ist zum Sparen da.",
            value: 0,
            color: "#0FF00F",
            isCore: false,
            isReal: false
        }]).then(() => {
            console.log("Success");
        }).catch(() => {
            console.log("error");
        });
    }

    public render() {
        const {bookings} = this.props;
        let nowValue = 0;
        if (bookings.length > 0) {
            nowValue = bookings.map((b) => {
                return b.value;
            }).reduce((accumulator: number, currentValue: number) => {
                return accumulator + currentValue;
            });
        }
        return (
            <Grid item xs={12} container spacing={24}>
                <Grid key={1} item xs={12} container spacing={16}>
                    <Grid item key={1}>
                        <Button onClick={this.loadForTable} color={"primary"} variant={"contained"}> Tabelle
                            laden</Button>
                    </Grid>
                    <Grid item key={2}>
                        <Button color={"secondary"} variant={"contained"} className={"roundButton menuToggleButton"}
                                onClick={this.addAccount}>
                            <CloudUploadIcon/>
                        </Button>
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
                    {bookings.sort(compareOnDate).map((booking, index) => {
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

import * as React from "react";
import {
    VBookingModel,
    IVBookingIdentity,
} from "../../../../base/model/VBookingModel";
import Button from "@material-ui/core/Button";
import {Divider, Grid, Typography} from "@material-ui/core";
import VBooking from "../core/VBooking";
import {changeDateMonthFirstDay, changeDateMonthLastDay} from "../../../../base/helper/time/dateHelper";

export interface IVBookingViewProps {
    vBookings: VBookingModel[];
    fetchAllVBookings?: () => Promise<any>;
    editVBookings?: (vBookings: IVBookingIdentity[]) => Promise<any>;
}

export interface IVBookingViewState {
    filteredVBookings: VBookingModel[];
}

const defaultState: IVBookingViewState = {
    filteredVBookings: []
};

export default class VBookingView extends React.Component<IVBookingViewProps, IVBookingViewState> {

    public static getDerivedStateFromProps(
        newProps: IVBookingViewProps,
        oldState: IVBookingViewState
    ): IVBookingViewState {
        const {vBookings} = newProps;

        const prevDay = changeDateMonthLastDay(new Date(), -1).getTime();
        const newFilteredVBooking = vBookings.filter((vBooking: VBookingModel): boolean => {
            return vBooking.vBookingDate ? vBooking.vBookingDate.getTime() > prevDay : false;
        }).sort(VBooking.compare);

        return {
            filteredVBookings: newFilteredVBooking
        };
    }

    public state: IVBookingViewState = defaultState;

    constructor(props: IVBookingViewProps) {
        super(props);
        this.loadForTable = this.loadForTable.bind(this);
        this.resetMonth = this.resetMonth.bind(this);
    }

    public componentDidMount() {
        this.loadForTable();
    }

    public loadForTable() {
        if (this.props.fetchAllVBookings) {
            this.props.fetchAllVBookings()
                .then(() => {
                        console.log("Success");
                    },
                )
                .catch(() => {
                    console.log("Error");
                });
        }
    }

    public resetMonth() {
        this.setState(defaultState);
    }

    public render() {
        const {vBookings} = this.props;
        const {filteredVBookings} = this.state;

        const nowValue = 584.70;
        // if (vBookings.length > 0) {
        //     nowValue = vBookings.map((b) => {
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
                    {filteredVBookings.map((vBooking, index) => {
                        return (
                            <Grid key={index} item xs={6}>
                                <VBooking entity={vBooking}/>
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        );
    }
}

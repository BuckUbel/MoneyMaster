import * as React from "react";
import {Divider, Grid, Typography} from "@material-ui/core";
import VBookingTable from "../tables/VBookingTable";
import {VBookingModel, IVBookingIdentity} from "../../../../base/model/VBookingModel";

export interface IVBookingViewProps {
    vBookings: VBookingModel[];
}

export interface IVBookingViewState {
}

const defaultState: IVBookingViewState = {};

export default class VBookingTableView extends React.Component<IVBookingViewProps, IVBookingViewState> {

    public state: IVBookingViewState = defaultState;

    constructor(props: IVBookingViewProps) {
        super(props);
        this.resetMonth = this.resetMonth.bind(this);
    }

    public resetMonth() {
        this.setState(defaultState);
    }

    public render() {
        const {vBookings} = this.props;

        return (
            <Grid item xs={12} container spacing={24}>
                <Grid container item xs={12} key={1} justify={"space-between"}>
                    <Grid item xs={10}>
                        <Typography variant={"h3"}>
                            Virtuelle Buchungsübersicht
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} key={2}>
                    <Divider variant={"middle"}/>
                </Grid>
                <Grid item xs={12} container spacing={32} key={3}>
                    <VBookingTable vBookings={vBookings}/>
                </Grid>
            </Grid>
        );
    }
}

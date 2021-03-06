import * as React from "react";
import {Avatar, Card, CardContent, CardHeader, Divider, Fab, Grid, Typography} from "@material-ui/core";
import {beautyDateString} from "../../../../base/helper/util";
import {bookingFields, BookingModel, IBookingIdentityDefaultStringValues} from "../../../../base/model/BookingModel";
import {RenderThings} from "../../helper/util";
import {IBookingTableInformations} from "../tables/BookingTable";
import {CSSProperties} from "react";
import {VBookingModel} from "../../../../base/model/VBookingModel";
import VBookingContainer from "../../containers/core/VBookingContainer";
import AddIcon from "@material-ui/icons/Add";
import {IAccountProps, IAccountState} from "./Account";
import {getColoredString, getColorOnBaseOfValueInline} from "../tables/default/helper";

export interface IBookingProps {
    entity: BookingModel;
    vBookings?: VBookingModel[];
    addVBooking?: () => void;
}

export interface IBookingState {
    vBookingsSum: number;
}

export const defaultState: IBookingState = {
    vBookingsSum: 0,
};

export default class Booking extends React.Component<IBookingProps, IBookingState> {

    public static compareOnDate(a: BookingModel, b: BookingModel): number {
        if (a.bookingDate < b.bookingDate) {
            return 1;
        }
        if (a.bookingDate > b.bookingDate) {
            return -1;
        }
        return 0;
    }

    public static getDisplay(act: BookingModel): IBookingTableInformations<RenderThings> {
        return ({
            id: String(act.id),
            bookingDate: beautyDateString(act.bookingDate),
            bookingType: act.bookingType,
            purpose: act.purpose,
            payPartner: act.payPartner,
            value: (act.value),
        });
    }

    public static getDerivedStateFromProps(newProps: IBookingProps, oldState: IBookingState): IBookingState {
        const associatedVBookingSum = newProps.vBookings.length > 0 ? newProps.vBookings
            .map(
                (aVB) => aVB.value)
            .reduce(
                (acc, cV) => acc + cV) : 0;
        return {
            vBookingsSum: associatedVBookingSum
        };
    }

    public state: IBookingState = defaultState;

    constructor(props: IBookingProps) {
        super(props);
    }

    public render() {
        const {
            orderAccount,
            bookingDate,
            validDate,
            bookingType,
            purpose,
            payPartner,
            iban,
            bic,
            value,
            currency,
            info,
        } = this.props.entity;
        const {vBookingsSum} = this.state;

        const valueColor = value < 0 ? "#f00" : "#0b0";
        const avatarSize = Math.abs(value) > 100 ? 45 : 25;

        return (
            <React.Fragment>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Acitivity"
                                            style={{
                                                backgroundColor: valueColor,
                                                width: avatarSize,
                                                height: avatarSize
                                            }}/>
                                }
                                title={beautyDateString(bookingDate)}
                                subheader={
                                    <React.Fragment>
                                        <Typography component="p" style={getColorOnBaseOfValueInline(value)}>
                                            {getColoredString(value)}
                                        </Typography>
                                        {" / "}
                                        <Typography component="p"
                                                    style={getColorOnBaseOfValueInline(value - vBookingsSum)}>
                                            {getColoredString(value - vBookingsSum)}
                                        </Typography>
                                    </React.Fragment>
                                }
                                action={
                                    <React.Fragment>
                                        {this.props.addVBooking &&
                                        <Fab onClick={this.props.addVBooking} color={"secondary"}>
                                            <AddIcon/>
                                        </Fab>
                                        }
                                    </React.Fragment>
                                }
                            />
                            <CardContent>
                                <Divider/>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography component="p">
                                            {bookingFields.payPartner.labelName + ": " + payPartner}
                                            <br/> {bookingFields.validDate.labelName + ": " + validDate}
                                            <br/> {bookingFields.bookingType.labelName + ": " + bookingType}
                                            <br/> {bookingFields.info.labelName + ": " + info}
                                            <br/>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography component="p">
                                            <br/> {bookingFields.iban.labelName + ": " + iban}
                                            <br/> {bookingFields.bic.labelName + ": " + bic}
                                            <br/>
                                            <br/> {bookingFields.orderAccount.labelName + ": " + orderAccount}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider/>
                                <br/>
                                <Typography component="p">
                                    {bookingFields.purpose.labelName + ": " + purpose}
                                    <br/> <br/>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} container spacing={8}>
                        {this.props.vBookings.map((vb: VBookingModel, index: number) => {
                            return (<Grid item xs={6} key={index}>
                                <VBookingContainer entity={vb} splitRealBooking={true}/>
                            </Grid>);
                        })}
                    </Grid>
                </Grid>

            </React.Fragment>
        );
    }
}

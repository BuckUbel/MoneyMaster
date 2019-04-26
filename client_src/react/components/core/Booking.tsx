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

export interface IBookingProps {
    entity: BookingModel;
    vBookings?: VBookingModel[];
    addVBooking?: () => void;
}

export default class Booking extends React.Component<IBookingProps, {}> {

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
            orderAccount: act.orderAccount,
            bookingDate: beautyDateString(act.bookingDate),
            validDate: beautyDateString(act.validDate),
            bookingType: act.bookingType,
            purpose: act.purpose,
            payPartner: act.payPartner,
            value: (<p style={Booking.getColorOnBaseOfValue(act.value)}>
                {Booking.getColoredValue(act.value)}
            </p>),
        });
    }

    public static getColoredValue(value: number): JSX.Element {
        return (
            <React.Fragment>{Booking.getColoredString(value)}</React.Fragment>
        );
    }

    public static getColoredString(value: number): string {
        return (value >= 0 ? "+" : "") + value.toFixed(2);
    }

    public static getColorOnBaseOfValue(value: number): CSSProperties {
        return {color: (value < 0 ? "#F00" : "#0F0")};
    }

    public state: {} = {};

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

        const money = value.toFixed(2) + " " + currency;
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
                                subheader={<Typography component="p" style={{color: valueColor}}>
                                    {money}
                                </Typography>}
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
                                <VBookingContainer entity={vb}/>
                            </Grid>);
                        })}
                    </Grid>
                </Grid>

            </React.Fragment>
        );
    }
}

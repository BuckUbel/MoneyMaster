import * as React from "react";
import {BookingModel, IBookingDisplay} from "../../model/BookingModel";
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography} from "@material-ui/core";
import {beautyDateString} from "../../helper/util";

export interface IBookingProps {
  entity: BookingModel;
}

// export interface IBookingState {}

export default class Booking extends React.Component<IBookingProps, {}> {

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
      believerId,
      mandateReference,
      customerReference,
      payPartner,
      iban,
      bic,
      value,
      currency,
      info,
    } = this.props.entity;

    const money = value + " " + currency;
    const valueColor = value < 0 ? "#f00" : "#0b0";
    const avatarSize = Math.abs(value) > 100 ? 45 : 25;

    return (
      <React.Fragment>
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="Acitivity"
                      style={{backgroundColor: valueColor, width: avatarSize, height: avatarSize}}/>
            }
            title={beautyDateString(bookingDate)}
            subheader={<Typography component="p" style={{color: valueColor}}>
              {money}
            </Typography>}
          />
          <CardContent>
            <Divider/>
            <Grid container>
              <Grid item xs={6}>
                <Typography component="p">
                  {"Zahlungspartner: " + payPartner}
                  <br/> {"Durchführung: " + validDate}
                  <br/> {"Buchungstyp: " + bookingType}
                  <br/> {"Info: " + info}
                  <br/>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="p">
                  <br/> {"IBAN: " + iban}
                  <br/> {"BIC: " + bic}
                  <br/>
                  <br/> {"Konto: " + orderAccount}
                </Typography>
              </Grid>
            </Grid>
            <Divider/>
            <br/>
            <Typography component="p">
              {"Verwendung: " + purpose}
              <br/> <br/>
            </Typography>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

export function compareOnDate(a: BookingModel, b: BookingModel): number {
  if (a.bookingDate < b.bookingDate) {
    return 1;
  }
  if (a.bookingDate > b.bookingDate) {
    return -1;
  }
  return 0;
}

export function getDisplayBooking(act: BookingModel): IBookingDisplay {
  return ({
    id: String(act.id),
    orderAccount: act.orderAccount,
    bookingDate: beautyDateString(act.bookingDate),
    validDate: beautyDateString(act.validDate),
    bookingType: act.bookingType,
    purpose: act.purpose,
    believerId: act.believerId,
    mandateReference: act.mandateReference,
    customerReference: act.customerReference,
    payPartner: act.payPartner,
    iban: act.iban,
    bic: act.bic,
    value: act.value.toFixed(2),
    currency: act.currency,
    info: act.info,
  });
}

export function getDisplayBookingArray(act: BookingModel): string[] {
  const obj = getDisplayBooking(act);
  return Object.keys(obj).map((key) => obj[key]);
}

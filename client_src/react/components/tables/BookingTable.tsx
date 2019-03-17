import * as React from "react";
import {
  BookingModel,
  IBookingDisplay,
  IBookingIdentity,
} from "../../model/BookingModel";
import DataTable, {ICol} from "./DataTable";
import MUIDataTable, {IMUIDataTableOptions} from "mui-datatables";
import Booking, {compareOnDate, getDisplayBooking, getDisplayBookingArray} from "../core/Booking";
import {Grid, Typography} from "@material-ui/core";

export interface IBookingTableProps {
  bookings: BookingModel[];
}

// export interface IBookingTableState {
// }

export default class BookingTable extends React.Component<IBookingTableProps, {}> {

  public state: {} = {};

  public bookingCols: ICol[] = [
    {
      name: "ID",
      key: "id",
    },
    {
      name: "Konto",
      key: "orderAccount",
    },
    {
      name: "Buchungsdatum",
      key: "bookingDate",
    },
    {
      name: "Durchführungsdatum",
      key: "validDate",
    },
    {
      name: "Buchungstyp",
      key: "bookingType",
    },
    {
      name: "Verwendung",
      key: "purpose",
    },
    {
      name: "Gläubiger - ID",
      key: "believerId",
    },
    {
      name: "Mandatsreferenz",
      key: "mandateReference",
    },
    {
      name: "Kundenreferenz",
      key: "customerReference",
    },
    {
      name: "Zahlungspartner",
      key: "payPartner",
    },
    {
      name: "IBAN",
      key: "iban",
    },
    {
      name: "BIC",
      key: "bic",
    },
    {
      name: "Betrag",
      key: "value",
    },
    {
      name: "Währung",
      key: "currency",
    },
    {
      name: "Info",
      key: "info",
    },
  ];

  public generalOptions: IMUIDataTableOptions = {
    filterType: "multiselect",
    // customToolbar: () => { return(<button> Anything </button>)},
  };

  constructor(props: IBookingTableProps) {
    super(props);
  }

  public render() {

    const {bookings} = this.props;

    return (
      <React.Fragment>

        <Grid container spacing={24}>
          {bookings.sort(compareOnDate).map((booking, index) => {
            return (
              <Grid key={index} item xs={6}>
                <Booking entity={booking}/>
              </Grid>
            );
          })}
        </Grid>
      </React.Fragment>
    );
  }
}

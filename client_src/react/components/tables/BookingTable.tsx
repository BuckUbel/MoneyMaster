import * as React from "react";
import {ICol, IRow} from "./default/helper";
import {bookingFields, BookingModel} from "../../../../base/model/BookingModel";
import {RenderThings} from "../../helper/util";
import Booking from "../core/Booking";
import EntityTable, {IEntityTableInformations} from "./EntityTable";
import BookingContainer from "../../containers/core/BookingContainer";

export interface IBookingTableProps {
    bookings: BookingModel[];
}

export default class BookingTable extends React.Component<IBookingTableProps, {}> {

    constructor(props: IBookingTableProps) {
        super(props);
    }

    public render() {
        const {bookings} = this.props;

        return (
            <React.Fragment>
                <EntityTable
                    entities={bookings}
                    compareFunction={Booking.compareOnDate}
                    getDisplay={Booking.getDisplay}
                    entityTableConfiguration={bookingTableConfiguration}
                    baseClass={BookingContainer}
                    defaultSortRow={1}
                />
            </React.Fragment>
        );
    }
}

export interface IBookingTableInformations<T extends RenderThings | ICol> extends IEntityTableInformations<T> {
    //orderAccount: T;
    bookingDate: T;
    // validDate: T;
    bookingType: T;
    purpose: T;
    payPartner: T;
    value: T;

    [key: string]: T;
}

export const bookingTableConfiguration: IBookingTableInformations<ICol> = {
    id: {
        name: bookingFields.id.labelName,
        filterOptions: {
            stringCut: -1,
        },
        filtering: false,
        sorting: false,
        hidden: true,
        type: "number",
    },
    // orderAccount: {
    //     name: bookingFields.orderAccount.labelName,
    //     filterOptions: {
    //         stringCut: -1,
    //     },
    //     filtering: true,
    //     sorting: true,
    //     type: "string",
    // },
    bookingDate: {
        name: bookingFields.bookingDate.labelName,
        filtering: true,
        sorting: true,
        type: "date",
    },
    // validDate: {
    //     name: bookingFields.validDate.labelName,
    //     filtering: true,
    //     sorting: true,
    //     type: "date",
    // },
    bookingType: {
        name: bookingFields.bookingType.labelName,
        filterOptions: {
            stringCut: -1,
        },
        filtering: true,
        sorting: true,
        type: "string",
    },
    purpose: {
        name: bookingFields.purpose.labelName,
        filterOptions: {
            stringCut: -1,
        },
        filtering: true,
        sorting: true,
        type: "string",
    },

    payPartner: {
        name: bookingFields.payPartner.labelName,
        filterOptions: {
            stringCut: -1,
        },
        filtering: true,
        sorting: true,
        type: "string",
    },
    value: {
        name: bookingFields.value.labelName,
        filtering: true,
        sorting: true,
        type: "number",
    },
};

import * as React from "react";
import {ICol} from "./default/helper";
import {vBookingFields, VBookingModel} from "../../../../base/model/VBookingModel";
import {RenderThings} from "../../helper/util";
import VBooking from "../core/VBooking";
import EntityTable, {IEntityTableInformations} from "./EntityTable";
import VBookingContainer from "../../containers/core/VBookingContainer";
import {SelectedActions} from "./default/DataTable";

export interface IVBookingTableProps {
    vBookings: VBookingModel[];
    withCheckboxes?: boolean;
    selectedActions?: SelectedActions;
}

export default class VBookingTable extends React.Component<IVBookingTableProps, {}> {

    constructor(props: IVBookingTableProps) {
        super(props);
    }

    public render() {
        const {vBookings, withCheckboxes, selectedActions} = this.props;

        return (
            <React.Fragment>
                <EntityTable
                    entities={vBookings}
                    compareFunction={VBooking.compare}
                    getDisplay={VBooking.getDisplay}
                    entityTableConfiguration={vBookingTableConfiguration}
                    baseClass={VBookingContainer}
                    defaultSortRow={1}
                    withCheckboxes={withCheckboxes}
                    selectedActions={selectedActions}
                />
            </React.Fragment>
        );
    }
}

export interface IVBookingTableInformations<T extends RenderThings | ICol> extends IEntityTableInformations<T> {
    bookingDate: T;
    name: T;
    description: T;
    value: T;

    [key: string]: T;
}

export const vBookingTableConfiguration: IVBookingTableInformations<ICol> = {
    id: {
        name: vBookingFields.id.labelName,
        filterOptions: {
            stringCut: -1,
        },
        filtering: false,
        sorting: false,
        hidden: true,
        type: "number",
    },
    bookingDate: {
        name: vBookingFields.bookingDate.labelName,
        filtering: true,
        sorting: true,
        type: "date",
    },
    name: {
        name: vBookingFields.name.labelName,
        filterOptions: {
            stringCut: -10,
        },
        filtering: true,
        sorting: true,
        type: "string",
    },
    description: {
        name: vBookingFields.description.labelName,
        filterOptions: {
            stringCut: 10,
        },
        filtering: true,
        sorting: true,
        type: "string",
    },
    value: {
        name: vBookingFields.value.labelName,
        filtering: true,
        sorting: true,
        type: "number",
        styleOptions: {
            coloredNumbers: true
        }
    },
};

import * as React from "react";
import {Avatar, Badge, Card, CardContent, CardHeader, Divider, Fab, Grid, Tooltip, Typography} from "@material-ui/core";
import {RenderThings} from "../../helper/util";
import {vBookingFields, VBookingModel, IVBookingIdentity} from "../../../../base/model/VBookingModel";
import Booking from "./Booking";
import MultilineText from "./simple/MultilineText";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import {ISplitRealBookingParams} from "../forms/SplitRealBookingForm";
import SplitRealBookingDialogContainer from "../../containers/dialogs/SplitRealBookingDialogContainer";
import DeleteIcon from "@material-ui/icons/Delete";
import BookOnVirtualAccountDialogContainer from "../../containers/dialogs/BookOnVirtualAccountDialogContainer";
import {IVBookingTableInformations} from "../tables/VBookingTable";

export interface IVBookingProps {
    entity: VBookingModel;
    category?: CategoryModel;
    editAction?: (params: ISplitRealBookingParams, oldEntity: VBookingModel) => void;
    deleteAction?: () => void;
    onRealBooking?: boolean;
}

export default class VBooking extends React.Component<IVBookingProps, {}> {

    public static compare(a: VBookingModel, b: VBookingModel): number {
        if (a.value < b.value) {
            return 1;
        }
        if (a.value > b.value) {
            return -1;
        }
        return 0;
    }

    public static getDisplay(act: VBookingModel): IVBookingTableInformations<RenderThings> {
        return ({
            id: String(act.id),
            name: act.name,
            description: act.description,
            value: <p style={Booking.getColorOnBaseOfValue(act.value)}>
                {Booking.getColoredValue(act.value)}
            </p>,
        });
    }

    public state: {} = {};

    constructor(props: IVBookingProps) {
        super(props);
    }

    public render() {
        const {deleteAction, editAction, entity, category, onRealBooking} = this.props;
        const {id, bookingId, accountId, categoryId, name, description, value} = entity;

        const avatarSize = Math.abs(value) > 100 ? 45 : 25;

        return (
            <React.Fragment>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Activity"
                                    style={{backgroundColor: category.color, width: avatarSize, height: avatarSize}}/>
                        }
                        title={name}
                        subheader={
                            <Typography variant="body1" style={Booking.getColorOnBaseOfValue(value)}>
                                {Booking.getColoredValue(value)}
                            </Typography>
                        }
                        action={
                            <React.Fragment>
                                {editAction && (
                                    (onRealBooking &&
                                        <SplitRealBookingDialogContainer
                                            withValueBounds={true}
                                            entity={entity}
                                            submit={editAction}
                                        />) ||
                                    (!onRealBooking &&
                                        <BookOnVirtualAccountDialogContainer
                                            withValueBounds={false}
                                            entity={entity}
                                            submit={editAction}
                                        />))
                                }
                                {deleteAction && (
                                    <Fab onClick={deleteAction} color={"secondary"}>
                                        <DeleteIcon/>
                                    </Fab>)
                                }
                            </React.Fragment>
                        }
                    />
                    <CardContent>
                        <MultilineText text={description}/>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

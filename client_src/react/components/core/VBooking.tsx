import * as React from "react";
import {Avatar, Badge, Card, CardContent, CardHeader, Divider, Fab, Grid, Tooltip, Typography} from "@material-ui/core";
import {RenderThings} from "../../helper/util";
import {vBookingFields, VBookingModel, IVBookingIdentity} from "../../../../base/model/VBookingModel";
// import {IVBookingTableInformations} from "../tables/VBookingTable";
import ColorField from "./simple/ColorField";
import Booking from "./Booking";
import MultilineText from "./simple/MultilineText";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import SplitRealBookingDialog from "../dialogs/SplitRealBookingDialog";
import BookOnVirtualAccountDialog from "../dialogs/BookOnVirtualAccountDialog";
import {IBookOnVirtualAccountParams} from "../forms/BookOnVirtualAccountForm";
import {ISplitRealBookingParams} from "../forms/SplitRealBookingForm";
import SplitRealBookingDialogContainer from "../../containers/forms/SplitRealBookingDialogContainer";
import DeleteIcon from "@material-ui/icons/Delete";

export interface IVBookingProps {
    entity: VBookingModel;
    category: CategoryModel;
    editAction?: (params: ISplitRealBookingParams, oldEntity: VBookingModel) => void;
    deleteAction?: () => void;
    onRealBooking?: boolean;
}

export default class VBooking extends React.Component<IVBookingProps, {}> {

    public static compare(a: VBookingModel, b: VBookingModel): number {
        if (a.id < b.id) {
            return 1;
        }
        if (a.id > b.id) {
            return -1;
        }
        return 0;
    }

    // public static getDisplay(act: VBookingModel): IVBookingTableInformations<RenderThings> {
    //     return ({
    //         id: String(act.id),
    //         name: act.name,
    //         description: act.description,
    //         value: <p style={Booking.getColorOnBaseOfValue(act.value)}>
    //             {Booking.getColoredValue(act.value)}
    //         </p>,
    //         color: <ColorField color={act.color}/>,
    //         isReal: act.isReal,
    //         isCore: act.isCore
    //     });
    // }

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
                                            entity={entity}
                                            // delete={() => {
                                            // }}
                                            submit={editAction}
                                        />) ||
                                    (!onRealBooking &&
                                        <BookOnVirtualAccountDialog
                                            entity={entity}
                                            // delete={() => {
                                            // }}
                                            submit={(params: IBookOnVirtualAccountParams) => {
                                                console.log(params);
                                            }}
                                            categories={[]}
                                        />))
                                }
                                {deleteAction && (
                                    (onRealBooking &&
                                        <Fab onClick={deleteAction} color={"secondary"}>
                                            <DeleteIcon/>
                                        </Fab>) ||
                                    (!onRealBooking &&
                                        <BookOnVirtualAccountDialog
                                            entity={entity}
                                            // delete={() => {
                                            // }}
                                            submit={(params: IBookOnVirtualAccountParams) => {
                                                console.log(params);
                                            }}
                                            categories={[]}
                                        />))
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

import * as React from "react";
import {Avatar, Badge, Card, CardContent, CardHeader, Divider, Fab, Grid, Tooltip, Typography} from "@material-ui/core";
import {RenderThings} from "../../helper/util";
import {vBookingFields, VBookingModel, IVBookingIdentity} from "../../../../base/model/VBookingModel";
import MultilineText from "./simple/MultilineText";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import {ISplitRealBookingParams} from "../forms/SplitRealBookingForm";
import SplitRealBookingDialogContainer from "../../containers/dialogs/SplitRealBookingDialogContainer";
import DeleteIcon from "@material-ui/icons/Delete";
import BookOnVirtualAccountDialogContainer from "../../containers/dialogs/BookOnVirtualAccountDialogContainer";
import {IVBookingTableInformations} from "../tables/VBookingTable";
import {getColoredString, getColorOnBaseOfValue} from "../tables/default/helper";
import {dateToString} from "../../../../base/helper/time/dateHelper";
import {beautyDateString} from "../../../../base/helper/util";

export interface IVBookingProps {
    entity: VBookingModel;
    category?: CategoryModel;
    editAction?: (params: ISplitRealBookingParams, oldEntity: VBookingModel) => void;
    deleteAction?: () => void;
    splitRealBooking?: boolean;
    bookOnVirtualAccount?: boolean;
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
            bookingDate: beautyDateString(act.bookingDate),
            name: act.name,
            description: act.description,
            value: act.value,
        });
    }

    public state: {} = {};

    constructor(props: IVBookingProps) {
        super(props);
    }

    public render() {
        const {deleteAction, editAction, entity, category, splitRealBooking, bookOnVirtualAccount} = this.props;
        const {id, bookingId, accountId, categoryId, name, description, value} = entity;

        const avatarSize = Math.abs(value) > 100 ? 45 : 25;

        return (
            <React.Fragment>
                {entity && <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Activity"
                                    style={{
                                        backgroundColor: category ? category.color : "#000",
                                        width: avatarSize,
                                        height: avatarSize
                                    }}/>
                        }
                        title={name}
                        subheader={
                            <Typography variant="body1" style={getColorOnBaseOfValue(value)}>
                                {getColoredString(value)}
                            </Typography>
                        }
                        action={
                            <React.Fragment>
                                {editAction && (
                                    (splitRealBooking &&
                                        <SplitRealBookingDialogContainer
                                            withValueBounds={true}
                                            entity={entity}
                                            submit={editAction}
                                        />) ||
                                    (bookOnVirtualAccount &&
                                        <BookOnVirtualAccountDialogContainer
                                            withValueBounds={false}
                                            entity={entity}
                                            submit={editAction}
                                        />))
                                }
                                {deleteAction && (splitRealBooking || bookOnVirtualAccount) && (
                                    <Fab onClick={deleteAction} color={"primary"}>
                                        <DeleteIcon/>
                                    </Fab>)
                                }
                            </React.Fragment>
                        }
                    />
                    <CardContent>
                        <MultilineText text={description}/>
                    </CardContent>
                </Card>}
            </React.Fragment>
        );
    }
}

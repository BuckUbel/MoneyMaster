import * as React from "react";
import {Avatar, Badge, Card, CardContent, CardHeader, Divider, Fab, Grid, Tooltip, Typography} from "@material-ui/core";
import {RenderThings} from "../../helper/util";
import {accountFields, AccountModel, IAccountIdentity} from "../../../../base/model/AccountModel";
import {IAccountTableInformations} from "../tables/AccountTable";
import ColorField from "./simple/ColorField";
import Booking from "./Booking";
import EditAccountDialog from "../dialogs/EditEntity/EditAccountDialog";
import MultilineText from "./simple/MultilineText";
import {VBookingModel} from "../../../../base/model/VBookingModel";
import VBookingContainer from "../../containers/core/VBookingContainer";
import AddIcon from "@material-ui/icons/Add";

export interface IAccountProps {
    entity: AccountModel;
    editAction?: (account: IAccountIdentity) => void;
    deleteAction?: (id: number) => void;
    vBookings?: VBookingModel[];
    addVBooking?: () => void;
}

export default class Account extends React.Component<IAccountProps, {}> {

    public static compare(a: AccountModel, b: AccountModel): number {
        if (a.id < b.id) {
            return 1;
        }
        if (a.id > b.id) {
            return -1;
        }
        return 0;
    }

    public static getDisplay(act: AccountModel): IAccountTableInformations<RenderThings> {
        return ({
            id: String(act.id),
            name: act.name,
            description: act.description,
            value: <p style={Booking.getColorOnBaseOfValue(act.value)}>
                {Booking.getColoredValue(act.value)}
            </p>,
            color: <ColorField color={act.color}/>,
            isReal: act.isReal,
            isCore: act.isCore
        });
    }

    public state: {} = {};

    constructor(props: IAccountProps) {
        super(props);
    }

    public render() {
        const {deleteAction, editAction, entity} = this.props;
        const {
            id,
            name,
            description,
            value,
            color,
            isCore,
            isReal
        } = entity;

        const avatarSize = Math.abs(value) > 100 ? 45 : 25;

        return (
            <React.Fragment>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Activity"
                                            style={{backgroundColor: color, width: avatarSize, height: avatarSize}}/>
                                }
                                title={name}
                                subheader={
                                    <Typography component="p" style={Booking.getColorOnBaseOfValue(value)}>
                                        {Booking.getColoredValue(value)}
                                    </Typography>
                                }
                                action={<React.Fragment>
                                    {editAction && deleteAction &&
                                    <EditAccountDialog
                                      entity={entity}
                                      delete={deleteAction}
                                      submit={editAction}
                                    />}
                                    {this.props.addVBooking &&
                                    <Fab onClick={this.props.addVBooking} color={"primary"}>
                                      <AddIcon/>
                                    </Fab>
                                    }
                                </React.Fragment>}
                            />
                            <CardContent>
                                <Divider/>
                                <MultilineText text={description}/>
                                {isCore ?
                                    <Tooltip
                                        title={"Ein Kernkonto wird mit realen Buchungen mit verändert."}
                                        placement={"bottom-start"}>
                                        <Typography component="p" color={"secondary"}>

                                            {"Dies ist ein " + accountFields.isCore.labelName}
                                        </Typography>
                                    </Tooltip> : ""}
                                <br/>
                                {isReal ?
                                    <Tooltip
                                        title={"Ein Reales Konto existiert wirklich in einer realen Banl."}
                                        placement={"bottom-start"}>
                                        <Typography component="p" color={"secondary"}>
                                            {"Dies ist ein " + accountFields.isReal.labelName}
                                        </Typography>
                                    </Tooltip> : ""}
                                <br/>
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

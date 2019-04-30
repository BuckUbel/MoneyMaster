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
import AddIcon from "@material-ui/icons/Add";
import VBookingView from "../views/VBookingView";
import VBookingContainer from "../../containers/core/VBookingContainer";

export interface IAccountProps {
    entity: AccountModel;
    editAction?: (account: IAccountIdentity) => void;
    deleteAction?: (id: number) => void;
    vBookings?: VBookingModel[];
    addVBooking?: () => void;
}

export interface IAccountState {
    vBookingsSum: number;
}

export const defaultState: IAccountState = {
    vBookingsSum: 0,
};
export default class Account extends React.Component<IAccountProps, IAccountState> {

    public static getDerivedStateFromProps(newProps: IAccountProps, oldState: IAccountState): IAccountState {
        const associatedVBookingSum = newProps.vBookings ? newProps.vBookings.length > 0 ? newProps.vBookings
            .map(
                (aVB) => aVB.value)
            .reduce(
                (acc, cV) => acc + cV) : 0 : 0;
        return {
            vBookingsSum: associatedVBookingSum
        };
    }

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

    public state: IAccountState = defaultState;

    constructor(props: IAccountProps) {
        super(props);
    }

    public render() {
        const {deleteAction, editAction, entity} = this.props;
        const {vBookingsSum} = this.state;
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
                                    <React.Fragment>
                                        <Typography component="p" style={Booking.getColorOnBaseOfValueInline(value)}>
                                            {Booking.getColoredValue(value)}
                                        </Typography>
                                        {" / "}
                                        <Typography component="p"
                                                    style={Booking.getColorOnBaseOfValueInline(value - vBookingsSum)}>
                                            {Booking.getColoredValue(value - vBookingsSum)}
                                        </Typography>
                                    </React.Fragment>
                                }
                                action={<React.Fragment>
                                    {editAction && deleteAction &&
                                    <EditAccountDialog
                                        entity={entity}
                                        delete={deleteAction}
                                        submit={editAction}
                                    />}
                                    {this.props.addVBooking && !isReal &&
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
                        {!isReal && this.props.vBookings &&
                        this.props.vBookings.map((vb: VBookingModel, index: number) => {
                            return (<Grid item xs={6} key={index}>
                                <VBookingContainer entity={vb}bookOnVirtualAccount={true}/>
                            </Grid>);
                        })
                        // <VBookingView vBookings={this.props.vBookings}/>
                        }
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

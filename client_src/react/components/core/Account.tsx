import * as React from "react";
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography} from "@material-ui/core";
import {RenderThings} from "../../helper/util";
import {accountFields, AccountModel, IAccountIdentity} from "../../../../base/model/AccountModel";
import {IAccountTableInformations} from "../tables/AccountTable";
import ColorField from "./simple/ColorField";
import Booking from "./Booking";
import {IAddAccountFormValues} from "../forms/AddEntity/AddAccountForm";
import EditAccountDialog from "../dialogs/EditEntity/EditAccountDialog";

export interface IAccountProps {
    entity: AccountModel;
    editAction?: (account: IAccountIdentity) => void;
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
        const {
            id,
            name,
            description,
            value,
            color,
            isCore,
            isReal
        } = this.props.entity;
        const {editAction, entity} = this.props;

        const avatarSize = Math.abs(value) > 100 ? 45 : 25;

        return (
            <React.Fragment>
                {editAction &&
                <Grid container item xs={12} key={1} justify={"space-between"}>
                  <Grid item xs={11}/>
                  <Grid item xs={1}>
                    <EditAccountDialog entity={entity} submit={(e2: IAddAccountFormValues[]) => {
                    }}/>
                  </Grid>
                </Grid>
                }
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Acitivity"
                                    style={{backgroundColor: color, width: avatarSize, height: avatarSize}}/>
                        }
                        title={name}
                        subheader={
                            <Typography component="p" style={Booking.getColorOnBaseOfValue(value)}>
                                {Booking.getColoredValue(value)}
                            </Typography>
                        }
                    />
                    <CardContent>
                        <Divider/>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography component="p">
                                    {description}
                                </Typography>
                            </Grid>
                            <Divider/>
                            <Grid item xs={6}>
                                <ul>
                                    {isCore ?
                                        <Typography component="li">{accountFields.isCore.labelName} </Typography> : ""}
                                    {isReal ?
                                        <Typography component="li">{accountFields.isReal.labelName} </Typography> : ""}
                                </ul>
                            </Grid>
                        </Grid>

                        <br/>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

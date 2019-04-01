import * as React from "react";
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography} from "@material-ui/core";
import {beautyDateString} from "../../../../base/helper/util";
import {RenderThings} from "../../helper/util";
import {accountFields, AccountModel} from "../../../../base/model/AccountModel";
import {IAccountTableInformations} from "../tables/AccountTable";
import ColorField from "./simple/ColorField";

export interface IAccountProps {
    entity: AccountModel;
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
            value: act.value.toFixed(2),
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

        const money = value.toFixed(2);
        const valueColor = value < 0 ? "#f00" : "#0b0";
        const avatarSize = Math.abs(value) > 100 ? 45 : 25;

        return (
            <React.Fragment>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Acitivity"
                                    style={{backgroundColor: color, width: avatarSize, height: avatarSize}}/>
                        }
                        title={name}
                        subheader={
                            <Typography component="p" style={{color: valueColor}}>
                            {money}
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

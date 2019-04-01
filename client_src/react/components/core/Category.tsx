import * as React from "react";
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography} from "@material-ui/core";
import {RenderThings} from "../../helper/util";
import {categoryFields, CategoryModel} from "../../../../base/model/CategoryModel";
import {ICategoryTableInformations} from "../tables/CategoryTable";
import ColorField from "./simple/ColorField";

export interface ICategoryProps {
    entity: CategoryModel;
}

export default class Category extends React.Component<ICategoryProps, {}> {

    public static compare(a: CategoryModel, b: CategoryModel): number {
        if (a.id < b.id) {
            return 1;
        }
        if (a.id > b.id) {
            return -1;
        }
        return 0;
    }

    public static getDisplay(act: CategoryModel): ICategoryTableInformations<RenderThings> {
        return ({
            id: String(act.id),
            name: act.name,
            description: act.description,
            color: <ColorField color={act.color}/>,
            isStandard: act.isStandard,
        });
    }

    public state: {} = {};

    constructor(props: ICategoryProps) {
        super(props);
    }

    public render() {
        const {
            id,
            name,
            description,
            color,
            isStandard
        } = this.props.entity;

        const avatarSize = 25;

        return (
            <React.Fragment>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Acitivity"
                                    style={{backgroundColor: color, width: avatarSize, height: avatarSize}}/>
                        }
                        title={name}
                    />
                    <CardContent>
                        <Divider/>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography component="p">
                                    {description}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <ul>
                                    <Typography component="li">
                                        {isStandard ? categoryFields.isStandard.labelName : ""}
                                    </Typography>
                                </ul>
                            </Grid>
                        </Grid>
                        <Divider/>
                        <br/>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

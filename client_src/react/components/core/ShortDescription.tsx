import * as React from "react";
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography} from "@material-ui/core";
import {RenderThings} from "../../helper/util";
import {shortDescriptionFields, ShortDescriptionModel} from "../../../../base/model/ShortDescriptionModel";
import {IShortDescriptionTableInformations} from "../tables/ShortDescriptionTable";

export interface IShortDescriptionProps {
    entity: ShortDescriptionModel;
}

export default class ShortDescription extends React.Component<IShortDescriptionProps, {}> {

    public static compare(a: ShortDescriptionModel, b: ShortDescriptionModel): number {
        if (a.id < b.id) {
            return 1;
        }
        if (a.id > b.id) {
            return -1;
        }
        return 0;
    }

    public static getDisplay(act: ShortDescriptionModel): IShortDescriptionTableInformations<RenderThings> {
        return ({
            id: String(act.id),
            originalContent: act.originalContent,
            replaceContent: act.replaceContent,
        });
    }

    public state: {} = {};

    constructor(props: IShortDescriptionProps) {
        super(props);
    }

    public render() {
        const {
            id,
            originalContent,
            replaceContent
        } = this.props.entity;

        return (
            <React.Fragment>
                <Card>
                    <CardContent>
                        <Divider/>
                        <Typography component="p">
                            {originalContent + " =|= " + replaceContent}
                        </Typography>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

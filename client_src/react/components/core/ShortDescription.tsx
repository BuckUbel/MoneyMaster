import * as React from "react";
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography} from "@material-ui/core";
import {RenderThings} from "../../helper/util";
import {IShortDescriptionIdentity, ShortDescriptionModel} from "../../../../base/model/ShortDescriptionModel";
import {IShortDescriptionTableInformations} from "../tables/ShortDescriptionTable";
import EditCategoryDialog from "../dialogs/EditEntity/EditCategoryDialog";
import EditShortDescriptionDialog from "../dialogs/EditEntity/EditShortDescriptionDialog";

export interface IShortDescriptionProps {
    entity: ShortDescriptionModel;
    editAction?: (shortDescription: IShortDescriptionIdentity) => void;
    deleteAction?: (id: number) => void;
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
        const {deleteAction, editAction, entity} = this.props;
        const {
            id,
            originalContent,
            replaceContent
        } = entity;

        return (
            <React.Fragment>
                <Card>
                    <CardHeader
                        action={<React.Fragment>
                            {editAction && deleteAction &&
                            <EditShortDescriptionDialog
                                entity={entity}
                                delete={deleteAction}
                                submit={editAction}
                            />}
                        </React.Fragment>}
                    />
                    <CardContent>
                        <Typography component="p" >
                            {"Die Zeichenkette "}
                        </Typography>
                        <Typography component="p" color={"primary"}>
                            {originalContent}
                        </Typography>
                        <Typography component="p" >
                            {"wird zu folgendem Text konvertiert:"}
                        </Typography>
                        <Typography component="p" color={"secondary"}>
                            {replaceContent}
                        </Typography>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

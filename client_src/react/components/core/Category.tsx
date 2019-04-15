import * as React from "react";
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Tooltip, Typography} from "@material-ui/core";
import {RenderThings} from "../../helper/util";
import {categoryFields, CategoryModel, ICategoryIdentity} from "../../../../base/model/CategoryModel";
import {ICategoryTableInformations} from "../tables/CategoryTable";
import ColorField from "./simple/ColorField";
import EditCategoryDialog from "../dialogs/EditEntity/EditCategoryDialog";
import MultilineText from "./simple/MultilineText";

export interface ICategoryProps {
    entity: CategoryModel;
    editAction?: (account: ICategoryIdentity) => void;
    deleteAction?: (id: number) => void;
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
        const {deleteAction, editAction, entity} = this.props;
        const {
            id,
            name,
            description,
            color,
            isStandard
        } = entity;
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
                        action={<React.Fragment>
                            {editAction && deleteAction &&
                            <EditCategoryDialog
                                entity={entity}
                                delete={deleteAction}
                                submit={editAction}
                            />}
                        </React.Fragment>}
                    />
                    <CardContent>
                        <Divider/>
                        <MultilineText text={description}/>
                        {isStandard ?
                            <Tooltip
                                title={"Alle Buchungen werden erstmal dieser Kategorie zugewiesen."}
                                placement={"bottom-start"}>
                                <Typography component="p" color={"secondary"}>
                                    {"Dies ist eine " + categoryFields.isStandard.labelName}
                                </Typography>
                            </Tooltip> : ""}
                        <br/>
                        <br/>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

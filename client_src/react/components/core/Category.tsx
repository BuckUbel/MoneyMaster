import * as React from "react";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Fab,
    Grid,
    IconButton,
    Tooltip,
    Typography
} from "@material-ui/core";
import {RenderThings} from "../../helper/util";
import {categoryFields, CategoryModel, ICategoryIdentity} from "../../../../base/model/CategoryModel";
import {ICategoryTableInformations} from "../tables/CategoryTable";
import ColorField from "./simple/ColorField";
import EditCategoryDialog from "../dialogs/EditEntity/EditCategoryDialog";
import MultilineText from "./simple/MultilineText";
import {VBookingModel} from "../../../../base/model/VBookingModel";
import VBookingTable from "../tables/VBookingTable";
import ChangeVBookingsCategoryDialogContainer from "../../containers/dialogs/ChangeVBookingsCategoryDialogContainer";
import {getRouteByName} from "../router/Routes";
import RouteButton from "../router/RouteButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export interface ICategoryProps {
    entity: CategoryModel;
    editAction?: (account: ICategoryIdentity) => void;
    deleteAction?: (id: number) => void;
    vBookings?: VBookingModel[];
    withTable?: boolean;
    changeVBookingsCategory?: (newCategoryId: number, ids: number[]) => void;
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
            button: <RouteButton
                nextRoute={getRouteByName("CategoryPage")}
                params={[String(act.id)]}
                buttonProps={{size: "medium", variant: "contained", color: "primary"}}
                aria-label={"nähere Informationen"}
            >
                <ChevronRightIcon/>
            </RouteButton>
        });
    }

    public state: {} = {};

    constructor(props: ICategoryProps) {
        super(props);
    }

    public render() {
        const {deleteAction, editAction, entity, changeVBookingsCategory, withTable, vBookings} = this.props;
        const {
            id,
            name,
            description,
            color,
            isStandard
        } = entity;
        const avatarSize = 10 + (vBookings.length * 0.1);

        return (
            <React.Fragment>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Acitivity"
                                            style={{backgroundColor: color, width: avatarSize, height: avatarSize}}/>
                                }
                                title={name}
                                subheader={vBookings.length + " virtuelle Buchungen"}
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
                    </Grid>
                    <Grid item xs={12} container>
                        {withTable && vBookings &&
                        <VBookingTable
                            vBookings={vBookings}
                            withCheckboxes={true}
                            selectedActions={(selectedItems: number[]) => [
                                <ChangeVBookingsCategoryDialogContainer
                                    submit={(params, ids) => changeVBookingsCategory(params.category.id, ids)}
                                    vBookingIds={selectedItems}
                                    categoryId={this.props.entity.id}/>
                            ]}
                        />
                        }
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

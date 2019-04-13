import * as React from "react";
import {Divider, Grid, Typography} from "@material-ui/core";
import ShortDescriptionTable from "../tables/ShortDescriptionTable";
import {ShortDescriptionModel, IShortDescriptionIdentity} from "../../../../base/model/ShortDescriptionModel";
import AddShortDescriptionDialog from "../dialogs/AddEntity/AddShortDescriptionDialog";

export interface IShortDescriptionViewProps {
    shortDescriptions: ShortDescriptionModel[];
    addShortDescription: (shortDescriptions: IShortDescriptionIdentity) => Promise<any>;
    editShortDescription: (shortDescriptions: IShortDescriptionIdentity) => Promise<any>;
}

export interface IShortDescriptionViewState {
}

const defaultState: IShortDescriptionViewState = {};

export default class ShortDescriptionTableView
    extends React.Component<IShortDescriptionViewProps, IShortDescriptionViewState> {

    public state: IShortDescriptionViewState = defaultState;

    constructor(props: IShortDescriptionViewProps) {
        super(props);
        this.resetMonth = this.resetMonth.bind(this);
    }

    public resetMonth() {
        this.setState(defaultState);
    }

    public render() {
        const {shortDescriptions, addShortDescription} = this.props;

        return (
            <Grid item xs={12} container spacing={24}>
                <Grid container item xs={12} key={1} justify={"space-between"}>
                    <Grid item xs={11}>
                        <Typography variant={"h3"}>
                            Kurztexte-Übersicht
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <AddShortDescriptionDialog submit={addShortDescription}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} key={2}>
                    <Divider variant={"middle"}/>
                </Grid>
                <Grid item xs={12} container spacing={32} key={3}>
                    <ShortDescriptionTable shortDescriptions={shortDescriptions}/>
                </Grid>
            </Grid>
        );
    }
}

import * as React from "react";
import Button from "@material-ui/core/Button";
import {Divider, Fab, Grid, Typography} from "@material-ui/core";
import ShortDescriptionTable from "../tables/ShortDescriptionTable";
import {ShortDescriptionModel, IShortDescriptionIdentity} from "../../../../base/model/ShortDescriptionModel";
import AddIcon from "@material-ui/icons/Add";

export interface IShortDescriptionViewProps {
    shortDescriptions: ShortDescriptionModel[];
    addShortDescriptions: (shortDescriptions: IShortDescriptionIdentity[]) => Promise<any>;
    editShortDescriptions: (shortDescriptions: IShortDescriptionIdentity[]) => Promise<any>;
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
        const {shortDescriptions} = this.props;

        return (
            <Grid item xs={12} container spacing={24}>
                <Grid container item xs={12} key={1}>
                    <Grid item xs={2}>
                        <Fab color="secondary" aria-label="Hinzufügen">
                            <AddIcon/>
                        </Fab>
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

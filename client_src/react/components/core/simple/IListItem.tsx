import * as React from "react";
import {ListItem, ListItemText} from "@material-ui/core";

export interface IIListItemProps {
    text: JSX.Element | string;
}

export default class IListItem extends React.Component<IIListItemProps> {

    public render() {
        const {text} = this.props;
        return (
            <React.Fragment>
                {text && <ListItem className={"simpleListItem"}> <ListItemText primary={text}/> </ListItem>}
            </React.Fragment>
        );
    }
}
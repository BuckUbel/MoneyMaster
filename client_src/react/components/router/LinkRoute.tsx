import * as React from "react";
import { IAppRoute } from "./Routes";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export interface ILinkRouteProps {
  route: IAppRoute;
  hideClass: string;
  isClicked: boolean;
  index: number;
  onRouteClick: (index: number) => void;
}

export default class LinkRoute extends React.Component<ILinkRouteProps, {}> {

  constructor(props: ILinkRouteProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick() {
    this.props.onRouteClick(this.props.index);
  }

  public render() {
    const {route, hideClass, isClicked} = this.props;
    const listItemClass = isClicked ? "clickedLinkText" : "";
    return (
      <div onClick={this.handleClick}>
        <ListItem button className={listItemClass}>
          <ListItemIcon className={"menuIcon"}>{React.createElement(route.icon)}</ListItemIcon>
          <ListItemText className={hideClass} primary={route.title}/>
        </ListItem>
      </div>
    );
  }
}

import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {Button} from "@material-ui/core";
import {IAppRoute} from "./Routes";
import {ButtonProps} from "@material-ui/core/Button/Button";

export interface IRouteButtonProps extends RouteComponentProps {
  nextRoute: IAppRoute;
  params?: string[];
  buttonProps?: ButtonProps;
  ariaLabel?: string;
}

class RouteButton extends React.Component<IRouteButtonProps> {

  public render() {
    const {ariaLabel, buttonProps, children, history, nextRoute, params} = this.props;
    const {size, variant, color} = buttonProps;
    return (
      <React.Fragment>
        <Button
          onClick={() => {
            history.push(nextRoute.pathWithoutParams + params.join("/"));
          }}
          aria-label={ariaLabel}
          size={size}
          variant={variant}
          color={color}>
          {children}
        </Button>
      </React.Fragment>
    );
  }
}

export default withRouter(RouteButton);

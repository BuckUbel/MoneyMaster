import * as React from "react";
import {Route, RouteComponentProps, Switch, withRouter} from "react-router";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import {SvgIconProps} from "@material-ui/core/SvgIcon/SvgIcon";
import BookingViewContainer from "../../containers/views/BookingViewContainer";

export interface IAppRoute {
  component: React.ComponentClass;
  icon: React.ComponentType<SvgIconProps>;
  path: string;
  title: string;
}

export const routeList: IAppRoute[] =
  [
    {
      component: BookingViewContainer,
      icon: DirectionsRunIcon,
      path: "/bookings",
      title: "Buchungen",
    }
  ];

class Routes extends React.Component<RouteComponentProps> {

  public render() {

    const routeObjectList = routeList.map((route, index) => {
      return (
        <Route key={index} exact={true} path={route.path} component={route.component}/>
      );
    });
    return (
      <Switch>
        {routeObjectList}
      </Switch>
    );
  }
}

export default withRouter(Routes);

import * as React from "react";
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import ShortTextIcon from "@material-ui/icons/ShortText";
import {SvgIconProps} from "@material-ui/core/SvgIcon/SvgIcon";
import {BookingTableViewContainer} from "../../containers/views/BookingViewContainer";
import AccountViewContainer from "../../containers/views/AccountViewContainer";
import CategoryViewContainer from "../../containers/views/CategoryViewContainer";
import ShortDescriptionViewContainer from "../../containers/views/ShortDescriptionViewContainer";
import HomeViewContainer from "../../containers/views/HomeViewContainer";
import AccountContainer from "../../containers/core/AccountContainer";
import CategoryContainer from "../../containers/core/CategoryContainer";

export interface IAppRoute {
    name: string;
    component: (param?: any) => React.ReactNode;
    icon: React.ComponentType<SvgIconProps>;
    path: string;
    title: string;
    pathWithoutParams: string;
    notDisplay?: boolean;
}

export const routeList: IAppRoute[] =
    [
        {
            name: "Basic",
            component: () => <Redirect from={"/"} to={"/home"}/>,
            icon: null,
            path: "/",
            pathWithoutParams: "/",
            title: "",
            notDisplay: true
        },
        {
            name: "AccountPage",
            component: (match) => <AccountContainer entity={{id: match.params.id}}/>,
            icon: null,
            path: "/accounts/:id",
            pathWithoutParams: "/accounts/",
            title: "",
            notDisplay: true
        },
        {
            name: "CategoryPage",
            component: (match) => <CategoryContainer entity={{id: match.params.id}} withTable={true}/>,
            icon: null,
            path: "/categories/:id",
            pathWithoutParams: "/categories/",
            title: "",
            notDisplay: true
        },
        {
            name: "Home",
            component: () => <HomeViewContainer/>,
            icon: HomeRoundedIcon,
            path: "/home",
            title: "Home",
            pathWithoutParams: "/home",
        },
        {
            name: "BookingTable",
            component: () => <BookingTableViewContainer/>,
            icon: DirectionsRunIcon,
            path: "/bookings",
            title: "Buchungen",
            pathWithoutParams: "/bookings",
        },
        {
            name: "AccountTable",
            component: () => <AccountViewContainer/>,
            icon: AccountBalanceIcon,
            path: "/accounts",
            title: "Konten",
            pathWithoutParams: "/accounts",
        },
        {
            name: "CategoryTable",
            component: () => <CategoryViewContainer/>,
            icon: CategoryOutlinedIcon,
            path: "/categories",
            title: "Kategorien",
            pathWithoutParams: "/categories",
        },
        {
            name: "ShortDescriptionTable",
            component: () => <ShortDescriptionViewContainer/>,
            icon: ShortTextIcon,
            path: "/short-descriptions",
            title: "Kurzbeschreibungen",
            pathWithoutParams: "/short-descriptions",
        }
    ];

export function getRouteByName(name: string): IAppRoute {
    return routeList.find((ar) => ar.name === name);
}

class Routes extends React.Component<RouteComponentProps> {

    public render() {

        const routeObjectList = routeList.map((route, index) => {
            return (
                <Route key={index} exact={true} path={route.path} render={({match}) => {
                    return (route.component(match));
                }}/>
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

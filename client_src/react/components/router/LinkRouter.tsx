import * as React from "react";
import LinkRoute from "./LinkRoute";
import {Link} from "react-router-dom";
import {IAppRoute} from "./Routes";

export interface ILinkRouterProps {
    routeList: IAppRoute[];
    showText: boolean;
}

export interface ILinkRouterState {
    selected: number;
}

export default class LinkRouter extends React.Component<ILinkRouterProps, ILinkRouterState> {

    public state: ILinkRouterState = {
        selected: -1,
    };

    constructor(props: ILinkRouterProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    public componentDidMount() {
        const index = this.props.routeList.findIndex((route: IAppRoute) => {
            return (route.path === window.location.pathname);
        });

        this.setState({
            selected: index
        });
    }

    public handleClick(index: number) {
        this.setState({selected: index});
    }

    public render() {
        const {routeList, showText} = this.props;
        const {selected} = this.state;
        const hideClass = showText ? "" : "hiddenLinkText";
        const links = routeList.map((route, index) => {
                if (!route.notDisplay) {
                    return (
                        <Link className="nav-item-link" to={route.path} key={index}>
                            <LinkRoute index={index} route={route} hideClass={hideClass}
                                       isClicked={(index === selected)}
                                       onRouteClick={this.handleClick}/>
                        </Link>);
                }
            }
        );
        return (
            <React.Fragment>
                {links}
            </React.Fragment>
        );
    }
}

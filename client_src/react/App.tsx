import * as React from "react";
import "../css/App.css";
import "../css/form.css";
import "../css/index.css";
import {BrowserRouter as Router} from "react-router-dom";
import Routes, {routeList} from "./components/router/Routes";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/es/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import {CssBaseline, Grid} from "@material-ui/core";
import LinkRouter from "./components/router/LinkRouter";
import AutorenewIcon from "@material-ui/core/SvgIcon/SvgIcon";
import QuerybuilderIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button/Button";

interface IAppProps {
    isLoading: boolean;
    loadEntities: (isLoading: boolean) => () => void;
}

interface IAppState {
    showLinkText: boolean;
}

class App extends React.Component<IAppProps, IAppState> {

    public state: IAppState = {
        showLinkText: false,
    };

    public constructor(props: IAppProps) {
        super(props);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    public toggleDrawer() {
        this.setState({
            showLinkText: !this.state.showLinkText,
        });
    }

    public render() {
        const {isLoading, loadEntities} = this.props;
        const {showLinkText} = this.state;
        const sidebarClasses = "sidebar " + (showLinkText ? "sidebar-large" : "sidebar-short");
        const sidebarPaperClasses = "sidebar-paper " + (showLinkText ? "sidebar-paper-large" : "sidebar-paper-short");
        return (
            <Router>
                <div className="App">
                    <CssBaseline/>
                    <AppBar position="fixed" className={"headerbar"}>
                        <Toolbar>
                            <IconButton className={"roundButton menuToggleButton"} onClick={this.toggleDrawer}
                                        aria-label={"Menü"}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant={"h5"}>
                                MoneyMaster
                            </Typography>
                            {/*<Button onClick={loadEntities(isLoading)} color={"primary"} variant={"contained"}>*/}
                                {/*{!isLoading && <AutorenewIcon/>}*/}
                                {/*{isLoading && <QuerybuilderIcon/>}*/}
                            {/*</Button>*/}
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        open={this.state.showLinkText}
                        variant={"permanent"}
                        onClose={this.toggleDrawer}
                        className={sidebarClasses}
                        classes={{paper: sidebarPaperClasses}}
                    >
                        <div
                            tabIndex={0}
                            role="button"
                        >
                            <div>
                                <List>
                                    <LinkRouter routeList={routeList} showText={this.state.showLinkText}/>
                                </List>
                            </div>
                        </div>
                    </Drawer>
                    <div className={"content"}>
                        <Grid container id={"mainContent"}>
                            <Routes/>
                        </Grid>
                        <div className={"footer"}>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;

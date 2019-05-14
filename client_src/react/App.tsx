import * as React from "react";
import "../css/App.css";
import "../css/form.css";
import "../css/chart.css";
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
import AutorenewIcon from "@material-ui/icons/Autorenew";
import QuerybuilderIcon from "@material-ui/icons/QueryBuilder";
import {CssBaseline, Grid} from "@material-ui/core";
import LinkRouter from "./components/router/LinkRouter";
import PasswordDialog from "./components/dialogs/PasswordDialog";

interface IAppProps {
    isLoading: boolean;
    loadEntities: (isLoading: boolean) => () => void;
    downloadFromSPK: (password: string) => void;
    testPassword: (fct: () => void) => void;
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
        const {isLoading, loadEntities, downloadFromSPK, testPassword} = this.props;
        const {showLinkText} = this.state;
        const sidebarClasses = "sidebar " + (showLinkText ? "sidebar-large" : "sidebar-short");
        const sidebarPaperClasses = "sidebar-paper " + (showLinkText ? "sidebar-paper-large" : "sidebar-paper-short");
        console.log(isLoading);
        return (
            <Router>
                <div className="App">
                    <CssBaseline/>
                    <AppBar position="fixed" className={"headerbar"}>
                        <Toolbar>
                            <IconButton className={"roundButton menuToggleButton"}
                                        onClick={this.toggleDrawer} aria-label={"Menü"}>
                                <img src="/public/images/logo.png" width={38} height={38}/>
                            </IconButton>
                            <Typography variant={"h6"} color={"inherit"} style={{flexGrow: 1}}>
                                MoneyMaster
                            </Typography>
                            <IconButton onClick={loadEntities(isLoading)} color={"inherit"}>
                                {!isLoading && <AutorenewIcon/>}
                                {isLoading && <QuerybuilderIcon/>}
                            </IconButton>
                            <PasswordDialog submit={downloadFromSPK} onClick={testPassword}/>
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

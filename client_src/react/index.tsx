import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";

import "../html/index.html";
import "../css/chart.css";

import store from "./store";
import AppContainer from "./containers/AppContainer";
import {blue, lightBlue, orange, red, teal} from "@material-ui/core/colors";

export const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: blue["400"],
            main: blue["600"], // blue 600
            dark: blue["800"],
            contrastText: "#000",
        },
        secondary: {
            light: orange["500"],
            main: orange["700"],
            dark: orange["800"],
            contrastText: "#000",
        },
        error: red
    },
    typography: {
        fontFamily: [
            "Roboto",
            '"Segoe UI"',
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        useNextVariants: true
    }
});

const Root = (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <AppContainer/>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
    Root,
    document.getElementById("react-container"),
);

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";

import "../html/index.html";
import "../css/chart.css";

import store from "./store";
import AppContainer from "./containers/AppContainer";
import {lightBlue, red, teal} from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#c7d656",
      main: "#96a500",
      dark: "#687600",
      contrastText: "#000",
    },
    secondary: {
      light: "#5effb8",
      main: "#02d188",
      dark: "#009f5b",
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

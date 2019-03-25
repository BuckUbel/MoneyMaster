import {green, grey, orange, red} from "@material-ui/core/colors";
import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import {PaletteType} from "@material-ui/core";

// export const paletteType: PaletteType = "light";
export const paletteType: PaletteType = "dark";

export interface IColorProps {
  light: string;
  main?: string;
  dark: string;
  contrastText?: string;

  [key: string]: any;
}

export interface IAppColors {
  primary: IColorProps;
  secondary: IColorProps;
  tertiary: IColorProps;
  error: any;
  grey: IColorProps;
  black: string;
  font: IColorProps;
  green: string;

  [key: string]: any;
}

// dirty bugfix - Themeoptions need a object with Interface PaletteOption, but on code you need a normal object
export const coreColors: IAppColors = {
  primary: {
    light: "#5eb8ff",
    main: "#0288d1",
    dark: "#005b9f",
    contrastText: "#000",
  },
  secondary: {
    light: "#56c7d6",
    main: "#0096a5",
    dark: "#006876",
    contrastText: "#000",
  },
  tertiary: {
    light: orange["200"],
    main: orange["500"],
    dark: orange["900"],
  },
  error: red,
  grey: {
    light: grey["300"],
    main: grey["400"],
    dark: grey["600"]
  },
  black: grey["900"],
  green: green["400"],
  font: {
    light: grey["900"],
    dark: grey["100"]
  }
};

export type aColors = "primary" | "secondary" | "tertiary" | "grey" | "font";

export function getColor(color: aColors) {
  return coreColors[color][paletteType];
}

export const coreStyle: ThemeOptions = {
  palette: {
    type: paletteType,
    primary: {
      light: coreColors.primary.light,
      main: coreColors.primary.main,
      dark: coreColors.primary.dark,
      contrastText: coreColors.primary.contrastText,
    },
    secondary: {
      light: coreColors.secondary.light,
      main: coreColors.secondary.main,
      dark: coreColors.secondary.dark,
      contrastText: coreColors.secondary.contrastText,
    },
    error: coreColors.error
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
  },
  overrides: {
    MuiTableCell: {
      root: {
        padding: "10px 15px 10px 5px",
      }
    }
  }
};

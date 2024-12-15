import { createTheme, PaletteMode } from "@mui/material";
import {
  blue,
  cyan,
  grey,
  amber,
  deepOrange,
  yellow,
  red,
  blueGrey,
} from "@mui/material/colors";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: blue[600], contrastText: "#ffffff" },
            secondary: { main: amber[600], contrastText: "#000000" },
            background: { default: grey[100], paper: "#ffffff" },
            text: {
              primary: grey[900],
              secondary: grey[700],
            },
          }
        : {
            primary: { main: yellow[300], contrastText: "#000000" },
            secondary: { main: deepOrange[300], contrastText: "#000000" },
            background: { default: grey[900], paper: grey[800] },
            text: {
              primary: grey[100],
              secondary: grey[400],
            },
          }),
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      button: {
        textTransform: "none",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            padding: "16px",
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? grey[900] : "white",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: mode === "light" ? "white" : grey[900],
            "&.Mui-selected": {
              color: mode === "light" ? amber[500] : red[800],
            },
          },
        },
      },
    },
  });

export default getTheme;

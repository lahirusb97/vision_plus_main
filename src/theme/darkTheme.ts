import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Light Blue
      light: "#e3f2fd", // Very Light Blue
      dark: "#42a5f5", // Medium Blue
      contrastText: "#000000", // Black
    },
    secondary: {
      main: "#f48fb1", // Light Pink
      light: "#ffc1e3", // Very Light Pink
      dark: "#bf5f82", // Medium Pink
      contrastText: "#000000", // Black
    },
    background: {
      default: "#121212", // Dark Gray
      paper: "#1e1e1e", // Slightly Lighter Gray
    },
    text: {
      primary: "#ffffff", // White
      secondary: "#b0bec5", // Light Gray
    },
  },
});

export default darkTheme;

import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Blue
      light: "#63a4ff", // Light Blue
      dark: "#004ba0", // Darker Blue
      contrastText: "#ffffff", // White
    },
    secondary: {
      main: "#f50057", // Pink
      light: "#ff5983", // Light Pink
      dark: "#bb002f", // Darker Pink
      contrastText: "#ffffff", // White
    },
    background: {
      default: "#f5f5f5", // Light Gray
      paper: "#ffffff", // White
    },
    text: {
      primary: "#212121", // Dark Gray
      secondary: "#757575", // Medium Gray
    },
  },
});
export default lightTheme;

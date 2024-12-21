import { yellow, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: yellow[900],
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: yellow[600],
        },
      },
    },
  },
});

export default theme;

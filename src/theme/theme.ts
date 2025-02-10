import { yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: yellow[900],
        },
        secondary: {
          main: yellow[600],
        },
      },
    },
  },
});

export default theme;

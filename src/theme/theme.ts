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
  typography: {
    button: {
      textTransform: "capitalize",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&[type=number]": {
            MozAppearance: "textfield", // Firefox
            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
          },
        },
      },
    },
  },
});

export default theme;

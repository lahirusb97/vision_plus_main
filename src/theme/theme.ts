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
        root: ({ theme }) => ({
          fontSize: ".8rem",
          [theme.breakpoints.down("sm")]: {
            fontSize: ".8rem", // Smaller font on small screens
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "1rem", // Larger font on medium and up
          },
        }),
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

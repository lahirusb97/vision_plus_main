import { yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { teal } from "@mui/material/colors";
const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: teal[800],
        },
        secondary: {
          main: teal[500],
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

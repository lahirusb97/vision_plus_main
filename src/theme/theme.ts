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
    // INPUTS OUT LINE
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
      defaultProps: {
        onWheel: (e: React.WheelEvent) =>
          e.target instanceof HTMLElement && e.target.blur(),
      },
    },
    // INPUTS ROOT
    MuiInput: {
      defaultProps: {
        onWheel: (e: React.WheelEvent) =>
          e.target instanceof HTMLElement && e.target.blur(),
      },
    },
    // INPUTS BASE
    MuiInputBase: {
      defaultProps: {
        onWheel: (e: React.WheelEvent) =>
          e.target instanceof HTMLElement && e.target.blur(),
      },
    },
    // INPUTS FILL
    MuiFilledInput: {
      defaultProps: {
        onWheel: (e: React.WheelEvent) =>
          e.target instanceof HTMLElement && e.target.blur(),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "0em .5em", // Reduced padding (you can set to 0 for no padding)
          margin: 0,

          // For even more compact cells
          "&.MuiTableCell-sizeSmall": {
            // Targets cells in small tables
            padding: "0em .5em",
            margin: 0,
          },
          "&.MuiTableCell-head": {
            // Targets header cells
            padding: ".3em",
            fontWeight: "bold",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.MuiTableRow-hover:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
  },
});

export default theme;

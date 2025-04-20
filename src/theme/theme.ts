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
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "4px 6px", // Reduced padding (you can set to 0 for no padding)
          margin: 0,
          // For even more compact cells
          "&.MuiTableCell-sizeSmall": {
            // Targets cells in small tables
            padding: "2px 4px",
          },
          "&.MuiTableCell-head": {
            // Targets header cells
            padding: "4px 6px",
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

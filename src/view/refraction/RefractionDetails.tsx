import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme,
  IconButton,
} from "@mui/material";
import useData from "../../hooks/useData";
import { useNavigate } from "react-router";
import { Forward, NavigateBefore, NavigateNext } from "@mui/icons-material";

// Customer Name Field Component
const CustomerNameField = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "right",
        marginTop: 4,
        gap: 0,
      }}
    >
      {/* Label */}
      <Box
        component="span"
        sx={{
          fontWeight: "bold",
          fontSize: "1rem",
          color: "white",
          padding: "17px 20px",
          backgroundColor: "gray",
          borderRadius: 1,
          display: "inline-block",
          textAlign: "right",
          minWidth: "200px",
          fontFamily: "Arial",
        }}
      >
        Customer Name
      </Box>
      {/* Input Field */}
      <TextField
        defaultValue="Mr. Nimal Silva"
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: false,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#f5f5f5",
            borderRadius: 1,
            minwidth: "200px",
          },
        }}
      />
    </Box>
  );
};

// Interface for Refraction Data
interface RefractionData {
  id: number;
  customer_full_name: string;
  customer_mobile: string;
  refraction_number: string;
}
// Sample Data
const data: RefractionData[] = [
  {
    name: "John Doe",
    mobileNumber: "123-456-7890",
    refractionNumber: "RF1234",
  },
  {
    name: "Jane Smith",
    mobileNumber: "987-654-3210",
    refractionNumber: "RF5678",
  },
  {
    name: "Sam Wilson",
    mobileNumber: "555-666-7777",
    refractionNumber: "RF91011",
  },
];

// Main Component

export default function RefractionDetails() {
  const theme = useTheme(); // Accessing MUI theme for dynamic styling

  // Determine the background color for the table header based on the current theme
  const headerBgColor =
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[200];

  return (
    <Box sx={{ padding: 2 }}>
     
      {/* Search Bar */}

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Table Container */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="Refraction Details Table">
          <TableHead>

            <TableRow sx={{ backgroundColor: headerBgColor }}>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                Mobile Number
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
                Refraction Number
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {refractionListLoading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <TableRow
                  onClick={() =>
                    navigator(`/refraction/${row.refraction_number}`)
                  }
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: theme.palette.grey[600] },
                  }}
                  key={row.id}
                >
                  <TableCell>{row.customer_full_name}</TableCell>
                  <TableCell>{row.customer_mobile}</TableCell>
                  <TableCell>{row.refraction_number}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No matching records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
       {/* Customer Name Field */}
       <CustomerNameField />
    </Box>
  );
}

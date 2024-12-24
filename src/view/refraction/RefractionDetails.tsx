import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme,
} from "@mui/material";

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
          color:"white",
          padding: "17px 20px",
          backgroundColor: "gray",
          borderRadius: 1,
          display: "inline-block",
          textAlign: "right",
          minWidth: "200px", 
          fontFamily:"Arial"
        
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
            minwidth:"200px",
          },
        }}
      />
    </Box>
  );
};


// Interface for Refraction Data
interface RefractionData {
  name: string;
  mobileNumber: string;
  refractionNumber: string;
}
// Sample Data
const data: RefractionData[] = [
  { name: "John Doe", mobileNumber: "123-456-7890", refractionNumber: "RF1234" },
  { name: "Jane Smith", mobileNumber: "987-654-3210", refractionNumber: "RF5678" },
  { name: "Sam Wilson", mobileNumber: "555-666-7777", refractionNumber: "RF91011" },
];

// Main Component
export default function RefractionDetails() {
  const theme = useTheme(); // Accessing Material-UI theme

  // Determine the background color for the table header based on the theme
  const headerBgColor =
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[200];

  return (
    <Box sx={{ padding: 2 }}>
     

      {/* Table Container */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflowX: "auto", // Ensures responsiveness on smaller screens
        }}
      >
<Table sx={{ minWidth: 650 }} aria-label="Refraction Details Table">
          <TableHead>
            <TableRow sx={{ backgroundColor: headerBgColor }}>
              <TableCell sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
                Mobile Number
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
                Refraction Number
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.mobileNumber}</TableCell>
                <TableCell>{row.refractionNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
       {/* Customer Name Field */}
       <CustomerNameField />
    </Box>
  );
}





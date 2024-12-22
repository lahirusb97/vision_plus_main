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
  Typography,
  useTheme,
} from "@mui/material";

interface RefractionData {
  name: string;
  mobileNumber: string;
  refractionNumber: string;
}

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

export default function RefractionDetails() {
  const theme = useTheme(); // Accessing MUI theme for dynamic styling

  // Determine the background color for the table header based on the current theme
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
        <Table sx={{ minWidth: 650 }} aria-label="refraction details table">
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
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
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
    </Box>
  );
}

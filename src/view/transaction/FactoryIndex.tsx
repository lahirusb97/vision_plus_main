import React, { useState } from "react";
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
  TableFooter,
  TablePagination,
  TextField,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import useData from "../../hooks/useData";
import { useNavigate } from "react-router";
import { Forward, NavigateBefore, NavigateNext } from "@mui/icons-material";
import { RefractionModel } from "../../model/RefractionModel";

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

export default function FactoryIndex() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: refractionList,
    loading: refractionListLoading,
    nextPage,
    prevPage,
  } = useData<RefractionData>("refractions/");

  // Safely access data and meta-information
  const results = refractionList?.results || [];
  const count = refractionList?.count || 0;
  // Filtered rows based on the search query
  const filteredRows = results.filter(
    (row) =>
      row.customer_full_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      row.customer_mobile.includes(searchQuery) ||
      row.refraction_number.includes(searchQuery)
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleNextPage = () => {
    if (nextPage) nextPage();
  };

  const handlePrevPage = () => {
    if (prevPage) prevPage();
  };

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
            <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
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
              filteredRows.map((row: RefractionModel) => (
                <TableRow
                  onClick={() =>
                    navigate(`create/${row.refraction_number}`, {
                      state: {
                        customerName: row.customer_full_name,
                        mobileNumber: row.refraction_number,
                        date: "in development",
                      },
                    })
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

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <IconButton
          onClick={handlePrevPage}
          disabled={!refractionList?.previous || refractionListLoading}
        >
          <NavigateBefore />
        </IconButton>
        <Typography>
          Showing {results.length} of {count} Pations
        </Typography>
        <IconButton
          onClick={handleNextPage}
          disabled={!refractionList?.next || refractionListLoading}
        >
          <NavigateNext />
        </IconButton>
      </Box>
    </Box>
  );
}

import React, { ChangeEvent, useState } from "react";
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
  IconButton,
  Button,
  Pagination,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Refresh } from "@mui/icons-material";
import useGetRefraction from "../../hooks/useGetRefraction";
import { RefractionModel } from "../../model/RefractionModel";

export default function RefractionDetails() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<RefractionModel | null>(null);

  const { data, isLoading, updateSearchParams, pageNavigation } =
    useGetRefraction();
  // Safely access data and meta-information

  // Filtered rows based on the search query

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInternalOrder = async () => {
    if (selectedRow) {
      navigate(`/refraction/${selectedRow.refraction_number}`, {
        state: {
          customerName: selectedRow.customer_full_name,
          mobileNumber: selectedRow.customer_mobile,
        },
      });
    }
  };
  return (
    <Box sx={{ padding: 2 }}>
      {/* Search Bar */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "baseline",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button
          onClick={() => {
            updateSearchParams(searchQuery);
          }}
          sx={{ height: 55 }}
          variant="contained"
        >
          Search
        </Button>
      </Box>

      {/* Table Container */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflowX: "auto",
        }}
      >
        <Table
          size="small"
          sx={{ minWidth: 650 }}
          aria-label="Refraction Details Table"
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: theme.palette.grey[200],

                height: 50,
              }}
            >
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Refraction Number
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ))
            ) : data.results.length > 0 ? (
              data.results.map((row: RefractionModel) => (
                <TableRow
                  onClick={() => setSelectedRow(row)}
                  sx={{
                    height: 40,
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow?.id === row.id
                        ? theme.palette.grey[600]
                        : "inherit",
                    "&:hover": {
                      backgroundColor: theme.palette.grey[600],
                    },
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
        }}
      >
        <Pagination
          count={Math.ceil(data.count / 10)}
          onChange={(e: ChangeEvent<unknown>, value: number) => {
            pageNavigation(value);
          }}
        ></Pagination>
        <IconButton
          color="info"
          onClick={() => {
            pageNavigation(1);
          }}
        >
          <Refresh />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Button
          disabled={!selectedRow}
          onClick={handleInternalOrder}
          color="info"
          variant="contained"
        >
          Refraction Details
        </Button>
      </Box>
    </Box>
  );
}

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
import { Delete, Refresh } from "@mui/icons-material";
import useGetRefraction from "../../hooks/useGetRefraction";
import { RefractionModel } from "../../model/RefractionModel";
import EditIcon from "@mui/icons-material/Edit";
// import { useDeleteDialog } from "../../context/DeleteDialogContext";

export default function RefractionDetails() {
  const theme = useTheme();
  const navigate = useNavigate();
  // const { openDialog } = useDeleteDialog();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<RefractionModel | null>(null);

  const { data, isLoading, updateSearchParams, pageNavigation, refresh } =
    useGetRefraction();
  // Safely access data and meta-information

  // Filtered rows based on the search query
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload
    updateSearchParams(searchQuery);
  };

  const handleInternalOrder = async () => {
    if (selectedRow) {
      const params = new URLSearchParams({
        customerName: selectedRow.customer_full_name,
        nic: selectedRow.nic,
        mobileNumber: selectedRow.customer_mobile,
        refraction_number: selectedRow.refraction_number,
      });
      navigate(`/refraction/${selectedRow.id}?${params.toString()}`);
    }
  };
  return (
    <Box sx={{ padding: 2 }}>
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        <TextField
          size="small"
          label="Search"
          variant="outlined"
          placeholder="Refraction Number"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "baseline",
        }}
      ></Box>

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
              }}
            >
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>NIC</TableCell>
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
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow?.id === row.id
                        ? theme.palette.grey[600]
                        : "inherit",
                    "&:hover": {
                      backgroundColor: theme.palette.grey[300],
                    },
                  }}
                  key={row.id}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <IconButton
                      size="small"
                      color="warning"
                      title="Edit"
                      onClick={() => {
                        // update/:id
                        const params = new URLSearchParams({
                          customer_full_name: row.customer_full_name,
                          nic: row.nic,
                          customer_mobile: row.customer_mobile,
                        });
                        navigate(`update/${row.id}?${params.toString()}`);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>

                  <TableCell>{row.customer_full_name}</TableCell>
                  <TableCell>{row.nic}</TableCell>
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

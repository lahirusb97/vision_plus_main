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
import EditIcon from "@mui/icons-material/Edit";
import { teal } from "@mui/material/colors";

// import { useDeleteDialog } from "../../context/DeleteDialogContext";

export default function RefractionTable() {
  const theme = useTheme();
  const navigate = useNavigate();
  // const { openDialog } = useDeleteDialog();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const {
    refractionsList,
    refractionLoading,
    handleRefractionSearch,
    refractionPageNavigation,
    refractionLimit,
    totalRefractionCount,
  } = useGetRefraction();
  // Safely access data and meta-information

  // Filtered rows based on the search query
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload
    handleRefractionSearch(searchQuery);
  };

  const handleInternalOrder = async () => {
    if (selectedRow) {
      navigate(`/refraction/${selectedRow}/`);
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
            {refractionLoading ? (
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
            ) : refractionsList.length > 0 ? (
              refractionsList.map((row) => (
                <TableRow
                  onClick={() => setSelectedRow(row.id)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow === row.id ? teal[100] : "inherit",
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
                        navigate(`update/${row.id}/`);
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
          count={Math.ceil(totalRefractionCount / refractionLimit)}
          onChange={(_e: ChangeEvent<unknown>, value: number) => {
            refractionPageNavigation(value);
          }}
        ></Pagination>
        <IconButton
          color="info"
          onClick={() => {
            refractionPageNavigation(1);
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
          variant="contained"
        >
          Refraction Details
        </Button>
      </Box>
    </Box>
  );
}

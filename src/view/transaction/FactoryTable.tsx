import { ChangeEvent, useState } from "react";
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

import useGetRefraction from "../../hooks/useGetRefraction";
import EditIcon from "@mui/icons-material/Edit";
import { RefractionNumberModel } from "../../model/RefractionModel";
import { teal } from "@mui/material/colors";
import TitleText from "../../components/TitleText";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";

// Interface for Refraction Data

export default function FactoryTable() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<RefractionNumberModel | null>(
    null
  );

  const {
    refractionsList,
    refractionLoading,
    refractionPageNavigation,
    handleRefractionSearch,
    totalRefractionCount,
    refractionLimit,
  } = useGetRefraction();
  // Safely access data and meta-information

  // Filtered rows based on the search query

  const handleInternalOrder = async () => {
    if (selectedRow) {
      const customerName = selectedRow.customer_full_name;
      const mobileNumber = selectedRow.customer_mobile;
      const refractionNumber = selectedRow.refraction_number;
      const url = `${selectedRow.id}?customerName=${encodeURIComponent(
        customerName
      )}&mobileNumber=${encodeURIComponent(
        mobileNumber
      )}&nic=${encodeURIComponent(
        selectedRow.nic
      )}&refractionNumber=${encodeURIComponent(refractionNumber)}`;

      navigate(`create/${url}`);
    }
  };
  return (
    <Box>
      {/* Search Bar */}

      <TitleText title=" Select a Refraction Number to create Factory Order" />
      <Box
        component={"form"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          mb: 1,

          alignItems: "baseline",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleRefractionSearch(searchQuery);
        }}
      >
        <TextField
          size="small"
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button size="small" type="submit" variant="contained">
          Search
        </Button>
        <Button
          size="small"
          variant="contained"
          color="info"
          onClick={() => {
            refractionPageNavigation(1);
            handleRefractionSearch("");
            setSearchQuery("");
          }}
        >
          Reset
        </Button>
      </Box>

      {/* Table Container */}
      <TableContainer
        component={Paper}
        sx={{
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

                padding: 0,
                margin: 0,
              }}
            >
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nic</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Refraction Number
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
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
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ))
            ) : refractionsList.length > 0 ? (
              refractionsList.map((row: RefractionNumberModel) => (
                <TableRow
                  onClick={() => setSelectedRow(row)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow?.id === row.id ? teal[100] : "inherit",
                    "&:hover": {
                      backgroundColor: theme.palette.grey[200],
                    },
                  }}
                  key={row.id}
                >
                  <TableCell>
                    <IconButton
                      size="small"
                      color="warning"
                      title="Edit"
                      onClick={() => {
                        // update/:id
                        const params = new URLSearchParams({
                          customer_full_name: row.customer_full_name,
                          customer_mobile: row.customer_mobile,
                        });
                        navigate(
                          `/refraction/details/update/${
                            row.id
                          }?${params.toString()}`
                        );
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.customer_full_name}</TableCell>
                  <TableCell>{row.nic}</TableCell>
                  <TableCell>{row.customer_mobile}</TableCell>
                  <TableCell>{row.refraction_number}</TableCell>
                  <TableCell>
                    {formatDateTimeByType(row?.created_at, "date")}
                  </TableCell>
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
          size="small"
          count={Math.ceil(totalRefractionCount / refractionLimit)}
          onChange={(_e: ChangeEvent<unknown>, value: number) => {
            refractionPageNavigation(value);
          }}
        ></Pagination>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button
          size="small"
          disabled={!selectedRow}
          onClick={handleInternalOrder}
          variant="contained"
        >
          Select Refraction
        </Button>
      </Box>
    </Box>
  );
}

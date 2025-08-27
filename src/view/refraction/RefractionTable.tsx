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
  Button,
  Pagination,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router";
import useGetRefraction from "../../hooks/useGetRefraction";
import { teal } from "@mui/material/colors";
import TitleText from "../../components/TitleText";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";
import DataLoadingError from "../../components/common/DataLoadingError";
import { InvoiceHistoryPopover } from "../../components/refreaction/InvoiceHistoryPopover";
import CustomerPagination from "../../components/CustomPagination";

// import { useDeleteDialog } from "../../context/DeleteDialogContext";

export default function RefractionTable() {
  const theme = useTheme();
  const navigate = useNavigate();
  // const { openDialog } = useDeleteDialog();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  //POPOver
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [popoverSearchData, setPopoverSearchData] = useState<{
    nic: string | null;
    mobile: string | null;
  } | null>(null);
  const handleShowHistory = (
    event: React.MouseEvent<HTMLElement>,
    nic: string | null,
    mobile: string | null
  ) => {
    setPopoverAnchor(event.currentTarget);
    setPopoverSearchData({ nic, mobile });
  };
  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setPopoverSearchData(null);
  };
  //POPOver
  const {
    refractionsList,
    refractionLoading,
    handleRefractionSearch,
    refractionPageNavigation,
    refractionLimit,
    totalRefractionCount,
    refractionsListerror,
    handlePageSizeChange,
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
  if (!refractionLoading && refractionsListerror) {
    return <DataLoadingError />;
  }
  return (
    <Box>
      <TitleText title=" Select a Refraction Number to Add Refraction Details" />
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          gap: "10px",
          marginBlock: 1,
          alignItems: "center",
        }}
      >
        <TextField
          size="small"
          label="Search"
          variant="outlined"
          placeholder="Refraction Number"
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
          mt: 1,
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
                p: 1,
              }}
            >
              {/* <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell> */}
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>NIC</TableCell>
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
                  {/* <TableCell sx={{ fontWeight: "bold" }}>
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
                    <Tooltip title="Invoice History">
                      <IconButton
                        size="small"
                        sx={{ p: 0 }}
                        onClick={(e) =>
                          handleShowHistory(e, row.nic, row.customer_mobile)
                        }
                      >
                        <HistoryRounded fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell> */}

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
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Button
          size="small"
          disabled={!selectedRow}
          onClick={handleInternalOrder}
          variant="contained"
        >
          Select Details
        </Button>
      </Box>
      <CustomerPagination
        totalCount={totalRefractionCount}
        handlePageNavigation={refractionPageNavigation}
        changePageSize={handlePageSizeChange}
        page_size={refractionLimit}
      />
      <InvoiceHistoryPopover
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={handleClosePopover}
        nic={popoverSearchData?.nic || null}
        mobile={popoverSearchData?.mobile || null}
      />
    </Box>
  );
}

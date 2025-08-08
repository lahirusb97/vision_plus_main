import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Pagination,
  Skeleton,
  TextField,
  Box,
  Tooltip,
} from "@mui/material";
import { RestoreFromTrash } from "@mui/icons-material";
import { useMutationDialog } from "../../context/MutationDialogContext";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import useGetHearingItem from "../../hooks/useGetHearingItem";
import { HearingItemStockSerializer } from "../../model/HearingtemStockSerializer";
import { numberWithCommas } from "../../utils/numberWithCommas";

const HearingLog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { openMutationDialog } = useMutationDialog();

  const {
    hearingItem,
    hearingItemLoading,
    hearingItemLimit,
    totalHearingItemCount,
    pageNavigationByNumber,
    searchHearingItem,
    HearingItemDataRefresh,
  } = useGetHearingItem(false);

  const handleReactivation = async (row: HearingItemStockSerializer) => {
    openMutationDialog(`Hearing Item - ${row.item.name}`, "put", async () => {
      try {
        await axiosClient.put(`/hearing-items/${row.item.id}/`, {
          item: {
            is_active: true,
          },
        });
        toast.success("Hearing item reactivated successfully");
        HearingItemDataRefresh();
      } catch (error) {
        extractErrorMessage(error);
      }
    });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchHearingItem(searchQuery);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <TextField
          size="small"
          label="Search"
          variant="outlined"
          placeholder="Search deactivated hearing items"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              searchHearingItem(searchQuery);
            }
          }}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            searchHearingItem(searchQuery);
          }}
        >
          Search
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => {
            searchHearingItem("");
            setSearchQuery("");
          }}
        >
          Reset
        </Button>
      </form>
      <Table size="small" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Code</TableCell>
            <TableCell align="right">Warranty</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hearingItemLoading ? (
            Array.from(new Array(5)).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton width={150} />
                </TableCell>
                <TableCell>
                  <Skeleton width={80} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton width={60} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton width={40} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton width={60} />
                </TableCell>
              </TableRow>
            ))
          ) : hearingItem.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No deactivated hearing items found
              </TableCell>
            </TableRow>
          ) : (
            hearingItem.map((row) => (
              <TableRow
                key={row.item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Tooltip title="Reactivate item">
                    <IconButton
                      color="success"
                      onClick={() => handleReactivation(row)}
                    >
                      <RestoreFromTrash />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.item.name}
                </TableCell>
                <TableCell>{row.item.code || "-"}</TableCell>
                <TableCell align="right">{row.item.warranty}</TableCell>
                <TableCell align="right">{row.stock[0]?.qty || 0}</TableCell>
                <TableCell align="right">
                  {numberWithCommas(row.item.price)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Pagination
          count={Math.ceil(totalHearingItemCount / hearingItemLimit)}
          color="primary"
          onChange={(e, page) => pageNavigationByNumber(page)}
        />
      </Box>
    </TableContainer>
  );
};

export default HearingLog;

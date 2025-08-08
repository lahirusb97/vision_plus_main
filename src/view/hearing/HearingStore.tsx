import React from "react";
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
} from "@mui/material";
import { Delete, Edit, Loop, PriceChange } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useDeleteDialog } from "../../context/DeleteDialogContext";
import useGetHearingItem from "../../hooks/useGetHearingItem";
import { HearingItemStockSerializer } from "../../model/HearingtemStockSerializer";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { Edit2, Edit3Icon, Pencil } from "lucide-react";

const HearingStore = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { openDialog } = useDeleteDialog();
  const {
    hearingItem,
    hearingItemLoading,
    hearingItemLimit,
    totalHearingItemCount,
    pageNavigationByNumber,
    searchHearingItem,
    HearingItemDataRefresh,
  } = useGetHearingItem();

  const navigate = useNavigate();

  // Handlers for actions
  const handleDelete = async (row: HearingItemStockSerializer) => {
    openDialog(
      `/hearing-items/${row.item.id}/`,
      row.item.name,
      "Hearing Item",
      "Deactivate",
      HearingItemDataRefresh
    );
  };

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`);
  };
  const handlefullEdit = (id: number) => {
    navigate(`full-edit/${id}`);
  };

  const handleUpdate = (id: number) => {
    navigate(`update/${id}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchHearingItem(searchQuery);
  };

  return (
    <TableContainer component={Paper}>
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
          placeholder="Search hearing items"
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
          type="submit"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            searchHearingItem("");
            setSearchQuery("");
          }}
        >
          Reset
        </Button>
      </form>
      <Table
        size="small"
        sx={{ minWidth: 650 }}
        aria-label="hearing items table"
      >
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
            // Loading skeleton
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
                No hearing items found
              </TableCell>
            </TableRow>
          ) : (
            hearingItem.map((row) => (
              <TableRow
                key={row.item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <IconButton
                    color="error"
                    title="Delete"
                    onClick={() => handleDelete(row)}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    color="warning"
                    title="Edit"
                    onClick={() => handleEdit(row.item.id)}
                  >
                    <PriceChange />
                  </IconButton>
                  <IconButton
                    color="warning"
                    title="Edit"
                    onClick={() => handlefullEdit(row.item.id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="warning"
                    title="Update Quantity"
                    onClick={() => handleUpdate(row.item.id)}
                  >
                    <Loop />
                  </IconButton>
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
      <Pagination
        count={Math.ceil(totalHearingItemCount / hearingItemLimit)}
        onChange={(_e: React.ChangeEvent<unknown>, value: number) => {
          pageNavigationByNumber(value);
        }}
        sx={{ padding: 2 }}
      />
    </TableContainer>
  );
};

export default HearingStore;

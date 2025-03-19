import useGetOtherItem from "../../../hooks/useGetOtherItem";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  IconButton,
  Pagination,
  Skeleton,
  TextField,
} from "@mui/material";
import { Delete, Edit, History, Loop } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { OtherItemModel } from "../../../model/OtherItemModel";
import { useDeleteDialog } from "../../../context/DeleteDialogContext";

const OtherItemStore = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { openDialog } = useDeleteDialog();
  const {
    otherItem,
    otherItemLoading,
    pageNavigationByNumber,
    searchOtherItem,
    OtherItemDataRefresh,
  } = useGetOtherItem();

  const navigate = useNavigate();
  // Handlers for actions
  const handleDelete = async (row: OtherItemModel) => {
    openDialog(
      `/other-items/${row.item.id}/`,
      row.item.name,
      OtherItemDataRefresh
    );
  };

  // const handleHistory = (id: number) => {
  //   navigate(`history/${id}`);
  // };

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`);
  };

  const handleUpdate = (id: number) => {
    navigate(`update/${id}`);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload
    searchOtherItem(searchQuery);
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
      <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {otherItemLoading ? (
            <TableRow>
              <TableCell>
                {" "}
                <Skeleton width={50} />
              </TableCell>
              <TableCell>
                {" "}
                <Skeleton width={50} />
              </TableCell>
              <TableCell align="right">
                {" "}
                <Skeleton width={50} />
              </TableCell>
              <TableCell align="right">
                {" "}
                <Skeleton width={50} />
              </TableCell>
            </TableRow>
          ) : (
            otherItem?.results.map((row) => (
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
                  {/* <IconButton
                    color="info"
                    title="History"
                    onClick={() => handleHistory(row.item.id)}
                  >
                    <History />
                  </IconButton> */}
                  <IconButton
                    color="warning"
                    title="Edit"
                    onClick={() => handleEdit(row.item.id)}
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
                <TableCell align="right">{row.stock[0]?.qty}</TableCell>
                <TableCell align="right">{row.item.price}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil((otherItem?.count || 0) / 10)}
        onChange={(_e: React.ChangeEvent<unknown>, value: number) => {
          pageNavigationByNumber(value);
        }}
      ></Pagination>
    </TableContainer>
  );
};

export default OtherItemStore;

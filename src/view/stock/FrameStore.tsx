import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";
import useGetFrames from "../../hooks/lense/useGetFrames";
import { useNavigate } from "react-router";
import { useDeleteDialog } from "../../context/DeleteDialogContext";

const FrameStore = () => {
  const { frames, framesLoading, refresh } = useGetFrames();
  const { openDialog } = useDeleteDialog();
  console.log(frames);

  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Action",
        id: "action",
        Cell: ({ row }) => (
          <Box>
            <IconButton
              color="error"
              title="Delete"
              onClick={() => handleDelete(row.original)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              color="info"
              title="History"
              onClick={() => handleHistory(row.original.id)}
            >
              <HistoryIcon />
            </IconButton>
            <IconButton
              color="warning"
              title="Edit"
              onClick={() => handleEdit(row.original.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="warning"
              title="Update Quantity"
              onClick={() => handleUpdate(row.original.id)}
            >
              <LoopIcon />
            </IconButton>
          </Box>
        ),
      },
      {
        header: "Brand",
        accessorKey: "brand_name",
        size: 130,
      },
      {
        header: "Code",
        accessorKey: "code_name",
        size: 130,
      },
      {
        header: "Color",
        accessorKey: "color_name",
        size: 130,
      },
      {
        header: "Species",
        accessorKey: "species",
        size: 130,
      },
      {
        header: "Price",
        accessorKey: "price",
        size: 60,
      },
      {
        header: "Stock Limit",
        accessorKey: "stock.limit", // Nested accessor for stock initial count
        size: 50,
      },
      {
        header: "Quantity",
        accessorKey: "stock.qty", // Nested accessor for stock quantity
        size: 50,
      },
    ],
    []
  );
  const navigate = useNavigate();
  // Handlers for actions
  const handleDelete = async (row) => {
    openDialog(
      `/frames/${row.id}/`,
      `Frame of Brand - ${row.brand_name} & Code - ${row.code_name}`,
      refresh
    );
  };

  const handleHistory = (id) => {
    // console.log(`View History for Frame ID: ${id}`);
    // Add history logic
    navigate(`./history/${id}`);
  };

  const handleEdit = (id) => {
    // console.log(`Edit Frame ID: ${id}`);
    // Add edit logic
    navigate(`./edit/${id}`);
  };

  const handleUpdate = (id) => {
    // console.log(`Update Quantity for Frame ID: ${id}`);
    // Add update logic
    navigate(`./update/${id}`);
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "1200px" }}>
      <Typography
        sx={{ marginBottom: 2, fontWeight: "bold" }}
        variant="h4"
        gutterBottom
      >
        Frame Store
      </Typography>

      <MaterialReactTable
        columns={columns}
        data={frames}
        enableColumnActions={false}
        enableColumnFilters={false}
        enableSorting
        enablePagination
        muiTableProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      />
    </Box>
  );
};

export default FrameStore;

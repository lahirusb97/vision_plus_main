import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";
import useGetFrames from "../../hooks/lense/useGetFrames";

const FrameStore = () => {
  const { frames, framesLoading, framesError } = useGetFrames();

  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Action",
        id: "action",
        Cell: ({ row }) => (
          <Box>
            <IconButton
              title="Delete"
              onClick={() => handleDelete(row.original.id)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              title="History"
              onClick={() => handleHistory(row.original.id)}
            >
              <HistoryIcon />
            </IconButton>
            <IconButton
              title="Edit"
              onClick={() => handleEdit(row.original.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
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
        accessorKey: "brand",
      },
      {
        header: "Code",
        accessorKey: "code",
      },
      {
        header: "Color",
        accessorKey: "color",
      },
      {
        header: "Species",
        accessorKey: "species",
      },
      {
        header: "Shape",
        accessorKey: "shape",
      },
      {
        header: "Price",
        accessorKey: "price",
      },
      {
        header: "Stock Limit",
        accessorKey: "stock.initial_count", // Nested accessor for stock initial count
      },
      {
        header: "Quantity",
        accessorKey: "stock.qty", // Nested accessor for stock quantity
      },
    ],
    []
  );

  // Handlers for actions
  const handleDelete = (id) => {
    console.log(`Delete Frame ID: ${id}`);
    // Add delete logic
  };

  const handleHistory = (id) => {
    console.log(`View History for Frame ID: ${id}`);
    // Add history logic
  };

  const handleEdit = (id) => {
    console.log(`Edit Frame ID: ${id}`);
    // Add edit logic
  };

  const handleUpdate = (id) => {
    console.log(`Update Quantity for Frame ID: ${id}`);
    // Add update logic
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "1200px" }}>
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

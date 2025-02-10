import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";
import { useNavigate } from "react-router";
import DeleteDialog from "../../components/DeleteDialogProps ";
import useGetOtherItems from "../../hooks/useGetOtherItems";

const FrameStore = () => {
  const { items, itemsLoading, itemsError ,refresh} = useGetOtherItems();
const [openDelete, setOpenDelete] = React.useState({
  open: false,
  path:'',
  itemName:''
});
console.log(items);

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
        header: "Name",
        accessorKey: "name",
        size: 150,

      },
      {
        header: "Price",
        accessorKey: "price",
        size: 150,

      },
      {
        header: "Quantity",
        accessorKey: "qty", // Nested accessor for stock quantity
        size: 150,
      },
    ],
    []
  );
const navigate=useNavigate()
  // Handlers for actions
  const handleDelete = async(row) => {
    setOpenDelete({ open: true, path: `/lens-cleaners/${row.id}/`,itemName: `Item of - ${row.name}` });
  };

  const handleHistory = (id) => {
    // console.log(`View History for Frame ID: ${id}`);
    // Add history logic
    navigate(`history/${id}`);

  };

  const handleEdit = (id) => {
    // console.log(`Edit Frame ID: ${id}`);
    // Add edit logic
    navigate(`edit/${id}`);
  };

  const handleUpdate = (id) => {
    // console.log(`Update Quantity for Frame ID: ${id}`);
    // Add update logic
    navigate(`update/${id}`);
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "1200px" }}>
      <Typography sx={{ marginBottom: 2 ,fontWeight:"bold"}} variant="h4" gutterBottom>Other Item Store</Typography>

      <MaterialReactTable
        columns={columns}
        data={items}
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
        <DeleteDialog 
          open={openDelete.open}
          path={openDelete.path} 
          itemName={openDelete.itemName} 
          onClose={() => {
            setOpenDelete({ open: false, path: '', itemName: '' })
            refresh()
          }}
        />
    </Box>
  );
};

export default FrameStore;

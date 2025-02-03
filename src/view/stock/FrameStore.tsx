import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";
import useGetFrames from "../../hooks/lense/useGetFrames";
import { useNavigate } from "react-router";
import DeleteDialog from "../../components/DeleteDialogProps ";
import axiosClient from "../../axiosClient";

const FrameStore = () => {
  const { frames, framesLoading, framesError ,refresh} = useGetFrames();
const [openDelete, setOpenDelete] = React.useState({
  open: false,
  path:'',
  itemName:''
});
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
        size: 130,

      },
      {
        header: "Code",
        accessorKey: "code",
        size: 130,

      },
      {
        header: "Color",
        accessorKey: "color",
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
const navigate=useNavigate()
  // Handlers for actions
  const handleDelete = async(id) => {
    setOpenDelete({ open: true, path: `/frames/${id}/`,itemName: 'Frame' });
      try {
        // Simulate API call
        await axiosClient.delete(`/frames/${id}/`);
        console.error("Deleteed failed");
        refresh()
      } catch (error) {
        console.error("Delete failed", error);
      }finally{
        setOpenDelete({ open: false, path: '',itemName: '' });
      }
   
  
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
        <DeleteDialog open={openDelete.open} onClose={() => 
          setOpenDelete({ open: false, path: '',itemName: '' })} 
          onConfirm={handleDelete} 
          path={openDelete.path} 
          itemName={openDelete.itemName} 
        />
    </Box>
  );
};

export default FrameStore;

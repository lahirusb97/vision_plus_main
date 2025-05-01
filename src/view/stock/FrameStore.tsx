import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";
import useGetFrames from "../../hooks/lense/useGetFrames";
import { useNavigate } from "react-router";
import { useDeleteDialog } from "../../context/DeleteDialogContext";
import { FrameModel } from "../../model/FrameModel";
import TitleText from "../../components/TitleText";

const FrameStore = () => {
  const { frames, framesLoading, refresh } = useGetFrames();
  const { openDialog } = useDeleteDialog();

  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Action",
        id: "action",
        Cell: ({ row }: { row: { original: FrameModel } }) => (
          <Box>
            <IconButton
              size="small"
              color="error"
              title="Delete"
              onClick={() => handleDelete(row.original)}
            >
              <DeleteIcon sx={{ fontSize: "1.4rem" }} />
            </IconButton>
            <IconButton
              size="small"
              color="info"
              title="History"
              onClick={() => handleHistory(row.original.id)}
            >
              <HistoryIcon sx={{ fontSize: "1.4rem" }} />
            </IconButton>
            <IconButton
              size="small"
              color="warning"
              title="Edit"
              onClick={() => handleEdit(row.original.id)}
            >
              <EditIcon sx={{ fontSize: "1.4rem" }} />
            </IconButton>
            <IconButton
              size="small"
              color="warning"
              title="Update Quantity"
              onClick={() => handleUpdate(row.original.id)}
            >
              <LoopIcon sx={{ fontSize: "1.4rem" }} />
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
        header: "Quantity",
        accessorFn: (row: FrameModel) => row.stock?.[0]?.qty ?? 0,
        size: 50,
      },
      {
        header: "Stock Limit",
        accessorFn: (row: FrameModel) => row.stock?.[0]?.limit ?? 0,
        size: 50,
      },
    ],
    [frames]
  );
  const navigate = useNavigate();
  // Handlers for actions
  const handleDelete = async (row: FrameModel) => {
    openDialog(
      `/frames/${row.id}/`,
      `Frame of Brand - ${row.brand_name} & Code - ${row.code_name}`,
      refresh
    );
  };

  const handleHistory = (id: number) => {
    // console.log(`View History for Frame ID: ${id}`);
    // Add history logic
    navigate(`./history/${id}`);
  };

  const handleEdit = (id: number) => {
    // console.log(`Edit Frame ID: ${id}`);
    // Add edit logic
    navigate(`./edit/${id}`);
  };

  const handleUpdate = (id: number) => {
    // console.log(`Update Quantity for Frame ID: ${id}`);
    // Add update logic
    navigate(`./update/${id}`);
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "1200px" }}>
      <TitleText title="  Frame Store" />

      <MaterialReactTable
        enableColumnFilters // 👈 enables filters
        enableFilters // 👈 required for custom filter functions
        columns={columns}
        data={frames}
        enableColumnActions={false}
        state={{ isLoading: framesLoading }}
        initialState={{
          density: "compact",
          pagination: { pageIndex: 0, pageSize: 15 },
        }}
        enableSorting
        enablePagination
        muiTableProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            padding: 0,
          },
        }}
      />
    </Box>
  );
};

export default FrameStore;

import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";
import useGetFrames from "../../hooks/lense/useGetFrames";
import { useNavigate } from "react-router";
import { useDeleteDialog } from "../../context/DeleteDialogContext";
import { FrameModel } from "../../model/FrameModel";
import TitleText from "../../components/TitleText";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { Edit, PriceChange } from "@mui/icons-material";

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
            <Tooltip title="Deactivate">
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(row.original)}
              >
                <DeleteIcon sx={{ fontSize: "1.4rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Frame">
              <IconButton
                size="small"
                onClick={() => handleFrameFullEdit(row.original.id)}
              >
                <Edit sx={{ fontSize: "1.4rem" }} />
              </IconButton>
            </Tooltip>
            {/* <IconButton
              size="small"
              color="info"
              title="History"
              onClick={() => handleHistory(row.original.id)}
            >
              <HistoryIcon sx={{ fontSize: "1.4rem" }} />
            </IconButton> */}
            <Tooltip title="Update Price">
              <IconButton
                size="small"
                onClick={() => handleEdit(row.original.id)}
              >
                <PriceChange sx={{ fontSize: "1.4rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Update Quantity">
              <IconButton
                size="small"
                color="warning"
                onClick={() => handleUpdate(row.original.id)}
              >
                <LoopIcon sx={{ fontSize: "1.4rem" }} />
              </IconButton>
            </Tooltip>
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
        header: "Branded",
        accessorKey: "brand_type_display",
        size: 100,
      },
      {
        header: "Price",
        accessorKey: "price",
        size: 60,
        Cell: ({ row }: { row: { original: FrameModel } }) => (
          <Typography variant="body2">
            {numberWithCommas(row.original.price)}
          </Typography>
        ),
      },
      {
        header: "Quantity",
        accessorFn: (row: FrameModel) => row.stock?.[0]?.qty ?? 0,
        size: 50,
      },
      {
        header: "Alert Limit",
        accessorFn: (row: FrameModel) => row.stock?.[0]?.limit ?? 0,
        size: 50,
      },
      {
        header: "Low Stocks",
        accessorFn: (row: FrameModel) =>
          row.stock?.[0]?.qty < row.stock?.[0]?.limit,
        size: 50,
        Cell: ({ row }: { row: { original: FrameModel } }) => (
          <Typography variant="body2">
            {row.original.stock?.[0]?.qty < row.original.stock?.[0]?.limit ? (
              <span style={{ color: "red" }}>Low Stock</span>
            ) : (
              <span style={{ color: "green" }}>OK</span>
            )}
          </Typography>
        ),
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
      "Your can activate this frame again using Logs section frame store",
      "Deactivate",
      refresh
    );
  };

  const handleFrameFullEdit = (id: number) => {
    navigate(`./edit/${id}`);
  };
  // const handleHistory = (id: number) => {
  //   // console.log(`View History for Frame ID: ${id}`);
  //   // Add history logic
  //   navigate(`./history/${id}`);
  // };

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

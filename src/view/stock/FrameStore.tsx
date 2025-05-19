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
        size: 100,
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        Cell: ({ row }: { row: { original: FrameModel } }) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Deactivate">
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(row.original)}
              >
                <DeleteIcon sx={{ fontSize: "1.4rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Frame Full Edit">
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
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        size: 130,
      },
      {
        header: "Code",
        accessorKey: "code_name",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        size: 130,
      },
      {
        header: "Color",
        accessorKey: "color_name",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        size: 130,
      },
      {
        header: "Species",
        accessorKey: "species",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        size: 50,
      },
      {
        header: "Branded",
        accessorKey: "brand_type_display",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        size: 60,
      },
      {
        header: "Price",
        accessorKey: "price",
        muiTableHeadCellProps: { align: "right" as const },
        muiTableBodyCellProps: { align: "right" as const },
        size: 80,
        Cell: ({ row }: { row: { original: FrameModel } }) => (
          <Typography align="right" variant="body2">
            {numberWithCommas(row.original.price)}
          </Typography>
        ),
      },
      {
        header: "Quantity",
        accessorFn: (row: FrameModel) => row.stock?.[0]?.qty ?? 0,
        size: 50,
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        Cell: ({ row }: { row: { original: FrameModel } }) => (
          <Typography variant="body2">
            {row.original.stock?.[0]?.qty ?? 0}
          </Typography>
        ),
      },
      {
        header: "Alert Limit",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        accessorFn: (row: FrameModel) => row.stock?.[0]?.limit ?? 0,
        size: 50,
      },
      {
        header: "Low Stocks",
        accessorFn: (row: FrameModel) => {
          const qty = row.stock?.[0]?.qty ?? 0;
          const limit = row.stock?.[0]?.limit ?? 0;
          return qty <= limit;
        },
        enableSorting: true, // explicitly enable sorting
        size: 50,
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        Cell: ({ row }: { row: { original: FrameModel } }) => {
          const qty = row.original.stock?.[0]?.qty ?? 0;
          const limit = row.original.stock?.[0]?.limit ?? 0;
          return (
            <Typography
              variant="body2"
              sx={{
                color: qty <= limit ? "error.main" : "success.main",
              }}
            >
              {qty <= limit ? "Low Stock" : "OK"}
            </Typography>
          );
        },
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
    navigate(`./full_edit/${id}`);
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
        state={{ isLoading: framesLoading, showSkeletons: framesLoading }}
        muiTableBodyRowProps={{
          sx: { "&:hover": { backgroundColor: "#f5f5fa" } },
        }}
        initialState={{
          sorting: [{ id: "Low Stocks", desc: true }],
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

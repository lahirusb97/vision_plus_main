import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LoopIcon from "@mui/icons-material/Loop";
import { AddBox, DeleteOutline, Edit, PriceChange } from "@mui/icons-material";
import { Delete, Truck } from "lucide-react";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import AddIcon from "@mui/icons-material/Add";
import { Minus } from "lucide-react";
import useGetFramesFilter, {
  FilteredFrameGroup,
} from "../../../hooks/lense/useGetFramesFilter";
import { FrameModel } from "../../../model/FrameModel";
import { useDeleteDialog } from "../../../context/DeleteDialogContext";

const DetailPanel = ({
  row,
  refresh,
}: {
  row: FrameModel[];
  refresh: () => void;
}) => {
  const { openDialog } = useDeleteDialog();
  const handleDelete = async (row: FrameModel) => {
    openDialog(
      `/frames/${row.id}/`,
      `Frame of Brand - ${row.brand_name} & Code - ${row.code_name}`,
      "Your can activate this frame again using Logs section frame store",
      "Deactivate",
      refresh
    );
  };
  if (!row || row.length === 0) {
    return (
      <Box p={2}>
        <Typography variant="body2" color="text.secondary">
          No frames available
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      {/* Table Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "80px repeat(6, 1fr) 200px 120px",
          fontWeight: 600,
          px: 2,
          py: 1,
          borderBottom: "2px solid #ccc",
          bgcolor: "#f9f9f9",
        }}
      >
        <Typography variant="caption" align="center">
          Actions
        </Typography>
        <Typography variant="caption">Image</Typography>
        <Typography variant="caption">Color</Typography>
        <Typography variant="caption">Code</Typography>
        <Typography variant="caption">Brand</Typography>
        <Typography variant="caption">Species</Typography>
        <Typography variant="caption">Size</Typography>
        <Typography variant="caption">Price</Typography>
        <Typography variant="caption">Stock / Branch</Typography>
      </Box>

      {/* Table Body */}
      {row.map((frame) => (
        <Box
          key={frame.id}
          sx={{
            display: "grid",
            gridTemplateColumns: "90px repeat(6, 1fr) 200px 120px",
            alignItems: "center",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid #eee",
          }}
        >
          {/* Actions */}
          <Box display="flex " flexWrap="wrap" gap={1} justifyContent="center">
            <Tooltip title="Edit">
              <IconButton size="small">
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => handleDelete(frame)}
                size="small"
                color="error"
              >
                <DeleteOutline fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Adjust Stock">
              <IconButton size="small">
                <PriceChange fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Transfer">
              <IconButton size="small">
                <Truck size={16} />
              </IconButton>
            </Tooltip>
          </Box>
          {/* Image */}
          {frame.image_url ? (
            <Box
              component="img"
              src={frame.image_url}
              alt="Frame Image"
              sx={{
                width: 56,
                height: 56,
                borderRadius: 1,
                objectFit: "cover",
              }}
            />
          ) : (
            <Box
              sx={{
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f0f0f0",
                borderRadius: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                No Image
              </Typography>
            </Box>
          )}

          {/* Info Columns */}
          <Typography variant="body2">{frame.color_name}</Typography>
          <Typography variant="body2">{frame.code_name}</Typography>
          <Typography variant="body2">
            {frame.brand_name} ({frame.brand_type_display})
          </Typography>
          <Typography variant="body2">{frame.species}</Typography>
          <Typography variant="body2">{frame.size}</Typography>
          <Typography variant="body2">
            {frame.price ? `${numberWithCommas(parseFloat(frame.price))}` : "0"}
          </Typography>

          {/* Stock / Branch */}
          <Box>
            {frame.stock?.length > 0 ? (
              <Stack spacing={0.5}>
                {frame.stock.map((s) => (
                  <Box
                    key={s.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      border: "1px solid #eee",
                      borderRadius: 1,
                      px: 1,
                      py: 0.25,
                      bgcolor: "#fefefe",
                    }}
                  >
                    <Typography variant="caption">{s.branch_name}</Typography>
                    <Typography variant="caption" fontWeight={500}>
                      {s.qty} pcs
                    </Typography>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography variant="caption" color="text.secondary">
                No stock
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
// Main Table Component
const InventoryFrameStore = () => {
  const { frames, framesLoading, refresh } = useGetFramesFilter();

  const columns = useMemo<MRT_ColumnDef<FilteredFrameGroup>[]>(
    () => [
      {
        header: "Action",
        size: 200,
        Cell: ({ row }) => (
          <Box display="flex" gap={1} justifyContent="center">
            <Tooltip title="Edit">
              <IconButton size="small">
                <AddBox fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
      {
        accessorKey: "brand",
        header: "Brand",
        size: 200,
      },
      {
        accessorKey: "code",
        header: "Code",
        size: 150,
      },
      {
        accessorKey: "size",
        header: "Size",
        size: 150,
      },
      {
        accessorKey: "species",
        header: "Species",
        size: 150,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 150,
        Cell: ({ row }) => numberWithCommas(row.original.price),
      },
      {
        header: "Colors",
        size: 100,
        Cell: ({ row }) => row.original.frames?.length || 0,
      },
      {
        id: "total_qty",
        header: "Stock Qty",
        size: 100,
        Cell: ({ row }) => row.original.total_qty,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: frames,
    getRowId: (row) => `${row.brand_id}-${row.code_id}`,
    enableColumnFilters: false,
    enableGlobalFilter: false,
    enablePagination: true,
    enableSorting: true,
    state: {
      isLoading: framesLoading,
    },
    muiExpandButtonProps: ({ row }) => ({
      children: row.getIsExpanded() ? (
        <Minus size={18} />
      ) : (
        <AddIcon fontSize="small" />
      ),
    }),
    renderDetailPanel: ({ row }) => (
      <DetailPanel row={row.original.frames} refresh={refresh} />
    ),

    muiTableBodyRowProps: {
      sx: {
        "&:hover": {
          backgroundColor: "action.hover",
          cursor: "pointer",
        },
      },
    },
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 1 }}>
        <Typography variant="h6">Frame Inventory</Typography>
        <Tooltip title="Refresh">
          <IconButton onClick={refresh} disabled={framesLoading}>
            <LoopIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    muiTableContainerProps: {
      sx: {
        maxHeight: "calc(100vh - 200px)",
      },
    },
  });

  return (
    <Box>
      <MaterialReactTable table={table} />
      
    </Box>
  );
};

export default InventoryFrameStore;

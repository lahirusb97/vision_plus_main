import { useMemo, useState } from "react";
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
import DialogFrameAddByColor from "../../../components/inventory-frame/DialogFrameAddByColor";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../../../data/staticVariables";

// Main Table Component
const InventoryFrameStore = () => {
  const { frames, framesLoading, refresh } = useGetFramesFilter();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<FrameModel | undefined>(
    undefined
  );
  const columns = useMemo<MRT_ColumnDef<FilteredFrameGroup>[]>(
    () => [
      {
        header: "Action",
        size: 200,
        Cell: ({ row }) => (
          <Box display="flex" gap={1} justifyContent="center">
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  setSelectedFrame(row.original.frames[0]);
                  setOpenDialog(true);
                }}
                size="small"
              >
                <AddBox fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
      {
        accessorKey: "image_url",
        header: "Image",
        size: 200,
        Cell: ({ row }) => (
          <img
            src={API_BASE_URL + row.original.image_url}
            alt="Frame"
            style={{
              width: 56,
              height: 56,
              borderRadius: 1,
              objectFit: "cover",
            }}
          />
        ),
      },
      {
        accessorKey: "brand_name",
        header: "Brand",
        size: 200,
      },
      {
        accessorKey: "code_name",
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
      // {
      //   accessorKey: "price",
      //   header: "Price",
      //   size: 150,
      //   Cell: ({ row }) => numberWithCommas(row.original.price),
      // },
      {
        accessorKey: "total_color",
        header: "Colors",
        size: 100,
      },
      {
        accessorKey: "total_qty",
        header: "Stock Qty",
        size: 100,
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
      <DialogFrameAddByColor
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedFrame(undefined);
        }}
        frame={selectedFrame}
        onSuccess={refresh}
      />
    </Box>
  );
};

export default InventoryFrameStore;

interface DetailPanelProps {
  row: FrameModel[];
  refresh: () => void;
}

export const DetailPanel = ({ row, refresh }: DetailPanelProps) => {
  const { openDialog } = useDeleteDialog();
  const navigate = useNavigate();
  const handleDelete = (frame: FrameModel) => {
    openDialog(
      `/frames/${frame.id}/`,
      `Frame of Brand - ${frame.brand_name} & Code - ${frame.code_name}`,
      "You can activate this frame again using the Logs section.",
      "Deactivate",
      refresh
    );
  };

  if (!row || row.length === 0) {
    return (
      <Box p={2}>
        <Typography variant="body2" color="text.secondary">
          No frames available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      {/* Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "80px 56px repeat(6, 1fr) 200px",
          alignItems: "center",
          px: 2,
          py: 1,
          bgcolor: "#f5f5f5",
          borderBottom: "2px solid #ddd",
          fontWeight: 600,
        }}
      >
        <Typography variant="caption" align="center">
          Actions
        </Typography>

        <Typography variant="caption">Color</Typography>
        {/* <Typography variant="caption">Code</Typography> */}
        {/* <Typography variant="caption">Brand</Typography> */}
        {/* <Typography variant="caption">Species</Typography> */}
        {/* <Typography variant="caption">Size</Typography> */}
        <Typography variant="caption">Price</Typography>
        <Typography variant="caption">Stock</Typography>
      </Box>

      {/* Frame Rows */}
      {row.map((frame) => (
        <Box
          key={frame.id}
          sx={{
            display: "grid",
            gridTemplateColumns: "80px 56px repeat(6, 1fr) 200px",
            alignItems: "center",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid #eee",
            "&:hover": {
              backgroundColor: "#fafafa",
            },
          }}
        >
          {/* Actions */}
          <Box display="flex" flexWrap="wrap" gap={0.5} justifyContent="center">
            <Tooltip title="Edit">
              <IconButton
                onClick={() =>
                  navigate(
                    `/inventory-frame/frame-store/frame-full-edit/${frame.id}`
                  )
                }
                size="small"
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(frame)}
              >
                <DeleteOutline fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Adjust Stock">
              <IconButton
                onClick={() =>
                  navigate(
                    `/inventory-frame/frame-store/frame-price-edit/${frame.id}`
                  )
                }
                size="small"
              >
                <PriceChange fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Transfer">
              <IconButton
                onClick={() =>
                  navigate(
                    `/inventory-frame/frame-store/frame-transfer/${frame.id}`
                  )
                }
                size="small"
              >
                <Truck size={16} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Image */}
          {/* {frame.image_url ? (
            <img
              src={frame.image_url}
              alt="Frame"
              style={{
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
          )} */}

          {/* Frame Info */}
          <Typography variant="body2">{frame.color_name}</Typography>
          {/* <Typography variant="body2">{frame.code_name}</Typography>
          <Typography variant="body2">
            {frame.brand_name} ({frame.brand_type_display})
          </Typography>
          <Typography variant="body2">{frame.species}</Typography>
          <Typography variant="body2">{frame.size}</Typography> */}
          <Typography variant="body2">
            {numberWithCommas(frame.price)}
          </Typography>

          {/* Stock */}
          <Box>
            {frame.stock?.length > 0 ? (
              <Stack spacing={0.5}>
                {frame.stock.map((s) => (
                  <Box key={s.id}>
                    <Typography variant="caption">{s.branch_name}</Typography>
                    <Typography variant="caption" fontWeight={600}>
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

import { useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import useGetFrames from "../../hooks/lense/useGetFrames";
import { FrameModel } from "../../model/FrameModel";
import TitleText from "../../components/TitleText";
import { useMutationDialog } from "../../context/MutationDialogContext";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import { RestoreFromTrash } from "@mui/icons-material";

const FrameLog = () => {
  const { frames, framesLoading, refresh, setFrameParamsData } = useGetFrames({
    store: null,
  });
  const { openMutationDialog } = useMutationDialog();

  useEffect(() => {
    setFrameParamsData({ status: "inactive", store: null });
  }, []);
  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Action",
        id: "action",
        Cell: ({ row }: { row: { original: FrameModel } }) => (
          <Box>
            <Tooltip title="Activate deactivated frame">
              <IconButton
                size="small"
                color="success"
                onClick={() => handleactivation(row.original)}
              >
                <RestoreFromTrash sx={{ fontSize: "1.4rem" }} />
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

  // Handlers for actions
  const handleactivation = async (row: FrameModel) => {
    openMutationDialog(
      `Frame of Brand - ${row.brand_name} & Code - ${row.code_name}`,
      "put",
      async () => {
        try {
          await axiosClient.put(`frames/${row.id}/`, {
            is_active: true,
          });
          toast.success("Frame Activated successfully");
          refresh();
        } catch (error) {
          extractErrorMessage(error);
        }
      }
    );
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

export default FrameLog;

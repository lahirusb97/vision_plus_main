import { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import useGetFrameBrandReport, {
  FrameBrandReportData,
} from "../../../hooks/report/useGetFrameBrandReport";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";

export default function FrameBrandReport() {
  const {
    frameBrandReportData,
    frameBrandReportLoading,
    frameBrandReportSummary,
    frameBrandReportError,
  } = useGetFrameBrandReport();

  const columns = useMemo<MRT_ColumnDef<FrameBrandReportData>[]>(
    () => [
      { header: "Brand Name", accessorKey: "brand_name" },
      {
        header: "Total Stock",
        accessorKey: "total_stock",
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString(),
      },
      {
        header: "Total Sold",
        accessorKey: "total_sold",
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString(),
      },
    ],
    []
  );

  if (frameBrandReportLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (frameBrandReportError) {
    return (
      <Box p={2}>
        <Typography color="error">
          Error loading frame brand report. Please try again.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {/* Summary Cards */}
      <Box display="flex" gap={2} flexWrap="wrap">
        <Paper elevation={2} sx={{ p: 2, flex: 1, minWidth: "200px" }}>
          <Typography variant="subtitle2" color="textSecondary">
            Total Stock
          </Typography>
          <Typography variant="h6">
            {frameBrandReportSummary?.total_stock?.toLocaleString() || "0"}
          </Typography>
        </Paper>
        <Paper elevation={2} sx={{ p: 2, flex: 1, minWidth: "200px" }}>
          <Typography variant="subtitle2" color="textSecondary">
            Total Sold
          </Typography>
          <Typography variant="h6">
            {frameBrandReportSummary?.total_sold?.toLocaleString() || "0"}
          </Typography>
        </Paper>
      </Box>

      {/* Data Table */}
      <Paper elevation={2}>
        <MaterialReactTable
          columns={columns}
          data={frameBrandReportData || []}
          enableColumnFilters={false}
          enableSorting
          enablePagination
          enableColumnActions
          enableTopToolbar={false}
          state={{
            isLoading: frameBrandReportLoading,
            showProgressBars: frameBrandReportLoading,
          }}
          muiTableProps={{
            sx: {
              borderRadius: 2,
              overflow: "hidden",
            },
          }}
          muiTableContainerProps={{
            sx: { maxHeight: "calc(100vh - 300px)" },
          }}
        />
      </Paper>
    </Stack>
  );
}

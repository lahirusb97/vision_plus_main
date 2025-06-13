// pages/reports/MntReport.tsx
// -------------------------------------------------------------------
// Combines filter, KPI cards and table in ONE component.
// -------------------------------------------------------------------
import { useState, useMemo, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

import { Box, Paper, Stack, Divider, Typography, Alert } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";

import DateRangePickerManual from "../../components/common/DateRangePickerManual";
import useGetMntOrderReport from "../../hooks/report/useGetMntOrderReport";
import { MntOrderModel } from "../../model/MTNOrderModel";

export interface DateRangePickerManualState {
  start_date: Dayjs | null;
  end_date: Dayjs | null;
}

export default function MntReport() {
  // --- local state -------------------------------------------------
  const [dateRange, setDateRange] = useState<DateRangePickerManualState>({
    // TODO default to a sensible business range (e.g. month-to-date)
    start_date: dayjs(),
    end_date: dayjs().add(1, "M"),
  });

  // --- hook pulls data + KPIs --------------------------------------
  const {
    mntReportList,
    mntReportLoading,
    mntReportError,
    mntReportKPIs,
    mntReportNavigate,
    mntReportTotalCount,
    mntReportSearch,
  } = useGetMntOrderReport();

  // --- push date filter to hook whenever the picker changes --------
  useEffect(() => {
    mntReportSearch({
      start_date: dateRange.start_date?.format("YYYY-MM-DD") ?? null,
      end_date: dateRange.end_date?.format("YYYY-MM-DD") ?? null,
      page: 1, // reset to first page
    });
  }, [dateRange]);

  // --- DataGrid columns (memoised) --------------------------------
  const columns: GridColDef<MntOrderModel>[] = useMemo(
    () => [
      { field: "mnt_number", headerName: "MNT No", flex: 1 },
      { field: "order_id", headerName: "Order ID", flex: 1 },
      {
        field: "mnt_price",
        headerName: "Price (LKR)",
        flex: 1,
        valueFormatter: ({ value }) =>
          parseFloat(value as string).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          }),
      },
      {
        field: "created_at",
        headerName: "Created",
        flex: 1.4,
        valueFormatter: ({ value }) =>
          dayjs(value as string).format("YYYY-MM-DD HH:mm"),
      },
      { field: "user_username", headerName: "User", flex: 1 },
      { field: "admin_username", headerName: "Admin", flex: 1 },
    ],
    []
  );

  // -------------------------- UI ----------------------------------
  return (
    <Box>
      {/* Filter Bar */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          MNT Order Report
        </Typography>
        <DateRangePickerManual
          value={dateRange}
          onChange={(range) => setDateRange((prev) => ({ ...prev, ...range }))}
        />
      </Paper>

      {/* KPI Cards */}
      <Stack direction="row" spacing={2} mb={2}>
        <KpiCard label="Total Ops" value={mntReportKPIs.totalMntOrders} />
        <KpiCard
          label="Unique Orders"
          value={mntReportKPIs.distinctFactoryOrders}
        />
        <KpiCard
          label="Revenue (LKR)"
          value={parseFloat(mntReportKPIs.totalMntPrice).toLocaleString()}
        />
      </Stack>

      {/* Data Grid or Error */}
      {mntReportError ? (
        <Alert severity="error">Unable to load MNT orders.</Alert>
      ) : (
        <DataGrid
          autoHeight
          rows={mntReportList}
          columns={columns}
          rowCount={mntReportTotalCount}
          loading={mntReportLoading}
          pageSizeOptions={[10, 20, 50]}
          paginationMode="server"
          disableRowSelectionOnClick
          onPaginationModelChange={
            (model: GridPaginationModel) => mntReportNavigate(model.page + 1) // DataGrid is 0-indexed
          }
          sx={{
            "& .MuiDataGrid-cell": { py: 1 },
            "& .MuiDataGrid-columnHeaders": { backgroundColor: "grey.100" },
          }}
        />
      )}
    </Box>
  );
}

/* --------------------------------------------------------------- */
/* Helper component for KPI cards                                 */
/* --------------------------------------------------------------- */
function KpiCard({ label, value }: { label: string; value: number | string }) {
  return (
    <Paper sx={{ p: 2, flex: 1, textAlign: "center" }}>
      <Typography variant="subtitle2">{label}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="h5" fontWeight={600}>
        {value}
      </Typography>
    </Paper>
  );
}

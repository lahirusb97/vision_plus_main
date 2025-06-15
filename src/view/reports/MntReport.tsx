// pages/reports/MntReport.tsx
// -------------------------------------------------------------------
// Combines filter, KPI cards and table in ONE component.
// -------------------------------------------------------------------
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

import {
  Box,
  Paper,
  Stack,
  Divider,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";

import DateRangePickerManual from "../../components/common/DateRangePickerManual";
import CustomerPagination from "../../components/CustomPagination";
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
    mntReportLimit,
    mntReportChangePageSize,
  } = useGetMntOrderReport();

  // --- push date filter to hook whenever the picker changes --------
  useEffect(() => {
    mntReportSearch({
      start_date: dateRange.start_date?.format("YYYY-MM-DD") ?? null,
      end_date: dateRange.end_date?.format("YYYY-MM-DD") ?? null,
      page: 1, // reset to first page
    });
  }, [dateRange]);


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

      {/* Table or Error */}
      {mntReportError ? (
        <Alert severity="error">Unable to load MNT orders.</Alert>
      ) : (
        <TableContainer component={Paper}>
          {mntReportLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>MNT Invoice</TableCell>
                  <TableCell>MNT Price (LKR)</TableCell>
                  <TableCell>Admin Name</TableCell>
                  <TableCell>User Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mntReportList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  mntReportList.map((order: MntOrderModel) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.mnt_number}</TableCell>
                      <TableCell>
                        {parseFloat(order.mnt_price).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell>{order.admin_username}</TableCell>
                      <TableCell>{order.user_username ?? "__"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
          <CustomerPagination
            totalCount={mntReportTotalCount}
            handlePageNavigation={mntReportNavigate}
            changePageSize={mntReportChangePageSize}
            page_size={mntReportLimit}
          />
        </TableContainer>
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

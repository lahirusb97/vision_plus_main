// pages/reports/MntReport.tsx
// -------------------------------------------------------------------
// Combines filter, KPI cards and table in ONE component.
// -------------------------------------------------------------------
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

import {
  Box,
  Paper,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

import DateRangePickerManual from "../../components/common/DateRangePickerManual";
import CustomerPagination from "../../components/CustomPagination";
import useGetMntOrderReport from "../../hooks/report/useGetMntOrderReport";
import { MntOrderModel } from "../../model/MTNOrderModel";
import OrderAuditDialog from "../../components/OrderAuditDialog";

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

  const [auditDialog, setAuditDialog] = useState({
    open: false,
    orderId: null as number | null,
  });

  // --- hook pulls data + KPIs --------------------------------------
  const {
    mntReportList,
    mntReportLoading,
    mntReportError,
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
                  <TableCell align="center">Audit</TableCell>
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
                      <TableCell align="center">
                        <Tooltip title="View Audit">
                          <IconButton
                            size="small"
                            onClick={() =>
                              setAuditDialog({
                                open: true,
                                orderId: (order as any).order_id ?? order.id,
                              })
                            }
                          >
                            <HistoryIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
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
      <OrderAuditDialog
        open={auditDialog.open}
        orderId={auditDialog.orderId}
        onClose={() => setAuditDialog({ open: false, orderId: null })}
      />
    </Box>
  );
}


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
import { numberWithCommas } from "../../utils/numberWithCommas";
import TitleText from "../../components/TitleText";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";
import InvoicePreviewBtn from "../../components/common/InvoicePreviewBtn";

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
    mntReportTotalMntPrice,
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
        <TitleText title="MNT Order Report" />
        <DateRangePickerManual
          value={dateRange}
          onChange={(range) => setDateRange((prev) => ({ ...prev, ...range }))}
        />
      </Paper>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Total Invoice Count : {mntReportTotalCount}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Total Mnt Cost : {numberWithCommas(mntReportTotalMntPrice)}
        </Typography>
      </Box>
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
                  <TableCell align="center">Audit</TableCell>
                  <TableCell align="center">Invoice</TableCell>
                  <TableCell align="center">MNT Invoice</TableCell>

                  <TableCell>Admin Name</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="right">Total Price</TableCell>

                  <TableCell align="right">MNT Price </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mntReportList?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  mntReportList.map((order: MntOrderModel) => (
                    <TableRow key={order.id}>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
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
                        <InvoicePreviewBtn
                          invoice_number={order.invoice_number}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {order.invoice_number}
                      </TableCell>
                      <TableCell align="center">{order.mnt_number}</TableCell>

                      <TableCell>{order.admin_username}</TableCell>
                      <TableCell>{order.user_username ?? "__"}</TableCell>
                      <TableCell align="center">
                        {formatDateTimeByType(order.created_at, "both")}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(order.order_total_price)}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(order.mnt_price)}
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

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { FileClock, History } from "lucide-react";
import CustomerPagination from "../../components/CustomPagination";
import useGetDailyOrderAudit from "../../hooks/report/useGetDailyOrderAudit";
import TitleText from "../../components/TitleText";
import OrderAuditDialog from "../../components/OrderAuditDialog";
import { useOutletContext } from "react-router";
import { OrderAuditDateRangePickerManualState } from "./layout/OrderAuditLayout";

export default function OrderAudits() {
  const [open, setOpen] = React.useState(false);
  const [orderId, setOrderId] = React.useState(0);
  const dateRange = useOutletContext<OrderAuditDateRangePickerManualState>();

  const {
    dailyOrderAuditList,
    dailyOrderAuditListLoading,
    dailyOrderAuditListTotalCount,
    dailyOrderAuditListPageNavigation,
    dailyOrderAuditListSearch,
    dailyOrderAuditListChangePageSize,
    dailyOrderAuditLimit,
  } = useGetDailyOrderAudit();

  // Update the hook with date range when it changes
  useEffect(() => {
    if (dateRange.start_date && dateRange.end_date) {
      dailyOrderAuditListSearch({
        start_date: dateRange.start_date.format("YYYY-MM-DD"),
        end_date: dateRange.end_date.format("YYYY-MM-DD"),
        page_size: 10,
        page: 1,
      });
    }
  }, [dateRange.start_date, dateRange.end_date]);

  return (
    <div style={{ padding: "20px" }}>
      <TitleText title="Order Audit Logs" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Invoice Number</TableCell>

              <TableCell align="center">Order Details</TableCell>
              <TableCell align="center">Order Item</TableCell>
              <TableCell align="center">Order Payment</TableCell>
              <TableCell align="center">Refraction Details</TableCell>
              <TableCell align="center">View History</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dailyOrderAuditListLoading && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {dailyOrderAuditList.map((audit) => (
              <TableRow key={audit.order_id}>
                <TableCell align="center">{audit.invoice_number}</TableCell>

                <TableCell align="center">
                  {audit.order_details ? <FileClock /> : "_"}
                </TableCell>
                <TableCell align="center">
                  {audit.order_item ? <FileClock /> : "_"}
                </TableCell>
                <TableCell align="center">
                  {audit.order_payment ? <FileClock /> : "_"}
                </TableCell>
                <TableCell align="center">
                  {audit.refraction_details ? <FileClock /> : "_"}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="info"
                    onClick={() => {
                      setOrderId(audit.order_id);
                      setOpen(true);
                    }}
                  >
                    <History />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <OrderAuditDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setOrderId(0);
        }}
        orderId={orderId}
      />
      <CustomerPagination
        totalCount={dailyOrderAuditListTotalCount}
        handlePageNavigation={dailyOrderAuditListPageNavigation}
        changePageSize={dailyOrderAuditListChangePageSize}
        page_size={dailyOrderAuditLimit}
      />
    </div>
  );
}

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { Check, History, X } from "lucide-react";
import CustomerPagination from "../../components/CustomPagination";
import useGetDailyOrderAudit from "../../hooks/report/useGetDailyOrderAudit";
import TitleText from "../../components/TitleText";
import OrderAuditDialog from "../../components/OrderAuditDialog";

export default function OrderAudits() {
  const [open, setOpen] = React.useState(false);
  const [orderId, setOrderId] = React.useState(0);
  const {
    dailyOrderAuditList,
    dailyOrderAuditListLoading,
    dailyOrderAuditListError,
    dailyOrderAuditListTotalCount,
    dailyOrderAuditListPageNavigation,
    dailyOrderAuditListSearch,
    dailyOrderAuditListRefres,
    dailyOrderAuditListChangePageSize,
    dailyOrderAuditLimit,
  } = useGetDailyOrderAudit();
  console.log(dailyOrderAuditList);
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
              <TableCell align="center">History</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dailyOrderAuditList.map((audit) => (
              <TableRow key={audit.order_id}>
                <TableCell align="center">{audit.invoice_number}</TableCell>

                <TableCell align="center">
                  {audit.order_details ? (
                    <Check color="green" />
                  ) : (
                    <X color="red" />
                  )}
                </TableCell>
                <TableCell align="center">
                  {audit.order_item ? (
                    <Check color="green" />
                  ) : (
                    <X color="red" />
                  )}
                </TableCell>
                <TableCell align="center">
                  {audit.order_payment ? (
                    <Check color="green" />
                  ) : (
                    <X color="red" />
                  )}
                </TableCell>
                <TableCell align="center">
                  {audit.refraction_details ? (
                    <Check color="green" />
                  ) : (
                    <X color="red" />
                  )}
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

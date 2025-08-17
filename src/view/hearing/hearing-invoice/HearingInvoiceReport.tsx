import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import useGetHearingInvoiceList, {
  HearingOrderReport,
} from "../../../hooks/useGetHearingInvoiceList";
import CustomerPagination from "../../../components/CustomPagination";
import HearingInvoiceSearch from "../../../hooks/HearingInvoiceSearch";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { Call, HistoryRounded, MedicalServices } from "@mui/icons-material";
import ConfirmDialog from "../../../components/ConfirmDialog";
import axiosClient from "../../../axiosClient";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";
import HearingServiceDialog from "../HearingServiceDialog";
import { HearingServiceHistoryPopover } from "../../../components/HearingServiceHistoryPopover";
import { SelectChangeEvent } from "@mui/material";
export default function HearingInvoiceReport() {
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [popoverOrder, setPopoverOrder] = useState<number | null>(null);
  const handleShowHistory = (
    event: React.MouseEvent<HTMLElement>,
    orderId: number
  ) => {
    setPopoverAnchor(event.currentTarget);
    setPopoverOrder(orderId);
  };
  const handleClosePopover = () => {
    setPopoverAnchor(null);
    setPopoverOrder(null);
  };
  const {
    hearingInvoiceList,
    hearingInvoiceListChangePageSize,
    hearingInvoiceListPageNavigation,
    hearingInvoiceListTotalCount,
    hearingInvoiceListSearch,
    hearingInvoiceListLoading,
    hearingInvoiceListError,
    hearingInvoiceLimit,
    hearingInvoiceListRefres,
  } = useGetHearingInvoiceList();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HearingOrderReport | null>(
    null
  );
  const updateReminderDate = async () => {
    try {
      await axiosClient.put(`/orders-item/update/`, {
        order_item_id: selectedItem?.items?.[0]?.order_item_id,
      });
    } catch (error) {}
  };
  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <HearingInvoiceSearch invoiceListSearch={hearingInvoiceListSearch} />
      </Box>

      <TableContainer component={Paper}>
        {hearingInvoiceListLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : hearingInvoiceListError ? (
          <Box sx={{ p: 2, color: "error.main" }}>
            Error loading invoices. Please try again.
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice #</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Phone 2</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Serial No</TableCell>
                <TableCell>Remark</TableCell>
                <TableCell>Last Service Date</TableCell>
                <TableCell>Next Service Date</TableCell>
                <TableCell>Last Remindered at</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Total Paid</TableCell>
                <TableCell align="right">Balance</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hearingInvoiceList?.length > 0 ? (
                hearingInvoiceList.map((invoice) => (
                  <TableRow key={invoice.invoice_number} hover>
                    <TableCell>{invoice.invoice_number}</TableCell>
                    <TableCell>
                      {new Date(invoice.invoice_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{invoice.customer_name}</TableCell>
                    <TableCell>{invoice.customer_phone}</TableCell>
                    <TableCell>{invoice.extra_phone_number}</TableCell>
                    <TableCell>{invoice?.items?.[0]?.item_name}</TableCell>
                    <TableCell>{invoice?.items?.[0]?.serial_no}</TableCell>
                    <TableCell>{invoice.order_remark}</TableCell>
                    <TableCell>
                      {invoice?.items?.[0]?.last_service?.last_service_date ||
                        "NA"}
                    </TableCell>
                    <TableCell>
                      {invoice?.items?.[0]?.next_service_date}
                    </TableCell>
                    <TableCell align="right">
                      {formatDateTimeByType(
                        invoice?.items?.[0]?.last_reminder_at,
                        "both"
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {numberWithCommas(invoice.total_price)}
                    </TableCell>
                    <TableCell align="right">
                      {numberWithCommas(invoice.total_paid)}
                    </TableCell>
                    <TableCell align="right">
                      {numberWithCommas(invoice.balance)}
                    </TableCell>

                    <TableCell align="center">
                      <a
                        href={`/hearing/${invoice.invoice_number}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }} // Optional: keep icon color
                      >
                        <IconButton size="small" sx={{ p: 0 }} color="inherit">
                          <AssignmentIcon fontSize="small" />
                        </IconButton>
                      </a>
                      <a
                        href={`/hearing/${invoice.invoice_number}/repayment`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }} // Optional: keep icon color
                      >
                        <IconButton size="small" sx={{ p: 0 }} color="inherit">
                          <PointOfSaleIcon color="error" fontSize="small" />
                        </IconButton>
                      </a>
                      <Tooltip title="Mark as called">
                        <IconButton
                          onClick={() => {
                            setSelectedItem(invoice);
                            setOpenConfirmDialog(true);
                          }}
                          size="small"
                          sx={{ p: 0 }}
                          color="inherit"
                        >
                          <Call color="primary" fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Service">
                        <IconButton
                          onClick={() => {
                            setSelectedItem(invoice);
                            setOpenServiceDialog(true);
                          }}
                          size="small"
                          sx={{ p: 0 }}
                          color="inherit"
                        >
                          <MedicalServices color="primary" fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Service History">
                        <IconButton
                          size="small"
                          sx={{ p: 0 }}
                          onClick={(e) =>
                            handleShowHistory(e, invoice.order_id)
                          }
                        >
                          <HistoryRounded fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No invoices found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        <CustomerPagination
          totalCount={hearingInvoiceListTotalCount}
          handlePageNavigation={hearingInvoiceListPageNavigation}
          changePageSize={hearingInvoiceListChangePageSize}
          page_size={hearingInvoiceLimit}
        />
        <ConfirmDialog
          apiCall={updateReminderDate}
          open={openConfirmDialog}
          closeDialog={() => {
            setOpenConfirmDialog(false);
            setSelectedItem(null);
          }}
          onSuccess={() => {
            hearingInvoiceListRefres();
          }}
        />
        <HearingServiceDialog
          orderData={selectedItem}
          open={openServiceDialog}
          closeDialog={() => {
            setOpenServiceDialog(false);
            setSelectedItem(null);
          }}
          onSuccess={() => {
            hearingInvoiceListRefres();
          }}
        />
      </TableContainer>
      <HearingServiceHistoryPopover
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={handleClosePopover}
        orderId={popoverOrder}
      />
    </Box>
  );
}

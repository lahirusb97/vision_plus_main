import React, { useEffect } from "react";
import {
  Popover,
  Box,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentIcon from "@mui/icons-material/Assignment";

import DateRangeIcon from "@mui/icons-material/DateRange";
import useGetCheckinInvoiceListManual from "../../hooks/useGetCheckinInvoiceListManual";
interface HearingServiceHistoryPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  nic: string | null;
  mobile: string | null;
}

export const InvoiceHistoryPopover: React.FC<
  HearingServiceHistoryPopoverProps
> = ({ open, anchorEl, onClose, nic, mobile }) => {
  const {
    invoiceManualList,
    invoiceManualListLoading,
    invoiceManualListError,
    invoiceManualListSearch,
  } = useGetCheckinInvoiceListManual();

  useEffect(() => {
    if ((open && mobile !== null) || nic !== null) {
      invoiceManualListSearch({
        mobile: mobile,
        nic: nic,
        invoice_number: null,
        page_size: 1000,
        page: 1,
        search: null,
        progress_status: null,
        patient_id: null,
      });
    }
  }, [open, mobile, nic]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        sx: { p: 2, minWidth: 300, maxWidth: 500, position: "relative" },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        size="small"
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          zIndex: 1,
          color: "grey.600",
        }}
        aria-label="Close"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, pr: 3 /* space for close btn */ }}
      >
        Invoice History
      </Typography>
      {invoiceManualListLoading ? (
        <CircularProgress size={24} />
      ) : invoiceManualListError ? (
        <Typography color="error">Failed to load history.</Typography>
      ) : invoiceManualList?.length === 0 ? (
        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          No invoice history found.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1, // reduced vertical gap between invoices
          }}
        >
          {invoiceManualList?.map((invoice, index) => (
            <Box
              key={invoice.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                p: 1, // reduced padding
                borderRadius: 1,
                bgcolor: index % 2 === 0 ? "grey.50" : "background.paper",
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.75, // tighter grouping
                }}
              >
                {/* Customer Name */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {invoice.customer}
                  </Typography>
                </Box>

                {/* Invoice Meta */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1.5, // reduced spacing between fields
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography variant="body2" fontWeight={500}>
                      #:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {invoice.invoice_number}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <DateRangeIcon fontSize="small" color="primary" />
                    <Typography variant="body2">
                      {new Date(invoice.invoice_date).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography variant="body2" fontWeight={500}>
                      Total:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {parseFloat(invoice.total_price).toFixed(2)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography variant="body2" fontWeight={500}>
                      Paid:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {invoice.payments
                        ?.reduce(
                          (sum, payment) =>
                            sum + parseFloat(payment.amount || "0"),
                          0
                        )
                        .toFixed(2)}
                    </Typography>
                  </Box>

                  <Box sx={{ ml: "auto" }}>
                    <a
                      href={`/transaction/invoice/view/${invoice.invoice_number}/?invoice_number=${invoice.invoice_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton size="small" color="primary">
                        <AssignmentIcon fontSize="small" />
                      </IconButton>
                    </a>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Popover>
  );
};

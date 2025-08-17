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
import useGetPatientRefractionOrderList from "../../hooks/useGetPatientRefractionOrderList";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";
import BtnViewOrderForm from "../common/BtnViewOrderForm";
interface HearingServiceHistoryPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  patient_id: number | null;
}

export const InvoiceHistoryPopover: React.FC<
  HearingServiceHistoryPopoverProps
> = ({ open, anchorEl, onClose, patient_id }) => {
  const {
    refractionInvoiceList,
    refractionInvoiceListLoading,
    refractionInvoiceListTotalCount,
    refractionInvoiceListSearch,
    refractionInvoiceListError,
  } = useGetPatientRefractionOrderList();

  useEffect(() => {
    if (open && patient_id) {
      refractionInvoiceListSearch({
        patient_id: patient_id,
      });
    }
  }, [open, patient_id]);

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
       Available {refractionInvoiceListTotalCount} Invoices
      </Typography>
      {refractionInvoiceListLoading ? (
        <CircularProgress size={24} />
      ) : refractionInvoiceListError ? (
        <Typography color="error">Failed to load history.</Typography>
      ) : refractionInvoiceList?.length === 0 ? (
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
          {refractionInvoiceList?.map((invoice, index) => (
            <Box
              key={invoice.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                p: 2,
                borderRadius: 2,
                bgcolor: index % 2 === 0 ? "grey.50" : "background.paper",
                border: "1px solid",
                borderColor: "grey.200",
                boxShadow: 1,
              }}
            >
              {/* Invoice Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  color="primary"
                >
                  Invoice Details
                </Typography>
                <BtnViewOrderForm invoiceNumber={invoice.invoice_number} />
              </Box>

              {/* Invoice Meta */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <DateRangeIcon fontSize="small" color="primary" />
                  <Typography variant="body2">
                    {formatDateTimeByType(invoice.order_date, "both")}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="body2" fontWeight={600}>
                    Invoice #:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {invoice.invoice_number}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="body2" fontWeight={600}>
                    Total:
                  </Typography>
                  <Typography
                    variant="body2"
                    color={
                      invoice.total_paid >= invoice.total_price
                        ? "success.main"
                        : "warning.main"
                    }
                    fontWeight={700}
                  >
                    {numberWithCommas(invoice.total_price)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="body2" fontWeight={600}>
                    Paid:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {numberWithCommas(invoice.total_paid)}
                  </Typography>
                </Box>
              </Box>

              {/* Divider */}
              <Box
                sx={{
                  borderBottom: "1px solid",
                  borderColor: "grey.300",
                  my: 1,
                }}
              />

              {/* Refraction Section */}
              <Typography variant="subtitle2" fontWeight={700} color="primary">
                Refraction Details
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <DateRangeIcon fontSize="small" color="primary" />
                  <Typography variant="body2">
                    {formatDateTimeByType(
                      invoice.refraction.created_at,
                      "both"
                    )}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="body2" fontWeight={600}>
                    Refraction #:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {invoice.refraction.refraction_number}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="body2" fontWeight={600}>
                    Branch:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {invoice.refraction.branch_name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Popover>
  );
};

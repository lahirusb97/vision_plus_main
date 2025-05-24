import React, { useState, useEffect } from "react";
import useGetCheckinInvoiceList from "../../../hooks/useGetCheckinInvoiceList";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import TitleText from "../../../components/TitleText";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { CheckinInvoiceModel } from "../../../model/CheckinInvoiceModel";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import toast from "react-hot-toast";

export default function FittingForm() {
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const [searchValue, setSearchValue] = useState("");
  const [selectedInvoice, setSelectedInvoice] =
    useState<CheckinInvoiceModel | null>(null);
  const [updating, setUpdating] = useState(false);

  const {
    invoiceList,
    invoiceListLoading,
    invoiceListSearch,
    invoiceListRefres,
    invoiceListError,
  } = useGetCheckinInvoiceList();

  // When user clicks Search, filter by invoice number
  const handleSearch = () => {
    setSelectedInvoice(null);
    invoiceListSearch({
      page: 1,
      invoice_number: searchValue,
      search: null,
      mobile: null,
      nic: null,
      progress_status: null,
      page_size: 1,
    });
  };

  // Update selectedInvoice when invoiceList changes
  useEffect(() => {
    setSelectedInvoice(invoiceList?.length > 0 ? invoiceList[0] : null);
  }, [invoiceList]);

  // Handle fitting status update
  const handleStatusChange = async (newStatus: string) => {
    if (!selectedInvoice) return;
    setUpdating(true);
    try {
      await putHandler(`orders/${selectedInvoice.order}/update-fit-status/`, {
        fitting_status: newStatus,
      });
      toast.success("Fitting status updated");
      await invoiceListRefres(); // Wait for refresh to complete
    } catch (error) {
      extractErrorMessage(error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 560, mx: "auto", mt: 5, boxShadow: 3 }}>
      <TitleText title="Fitting Status Change" />
      <Box display="flex" gap={2} mb={3} alignItems="center">
        <TextField
          label="Invoice Number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          autoFocus
        />
        <Button
          variant="contained"
          sx={{ minWidth: 100 }}
          onClick={handleSearch}
          disabled={invoiceListLoading || !searchValue || updating}
        >
          {invoiceListLoading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Search"
          )}
        </Button>
      </Box>
      {putHandlerError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Nextwork Error check your internet connection
        </Alert>
      )}
      {selectedInvoice && (
        <Box>
          <Divider sx={{ mb: 2 }} />
          <Stack direction="column" spacing={1.5} mb={2} pl={1}>
            <Typography variant="body1">
              <b>Customer:</b> {selectedInvoice.customer}
            </Typography>
            <Typography variant="body1">
              <b>Invoice Number:</b> {selectedInvoice.invoice_number}
            </Typography>
            <Typography variant="body1">
              <b>Date:</b>{" "}
              {formatDateTimeByType(selectedInvoice.invoice_date, "both")}
            </Typography>
            <Typography variant="body1">
              <b>Total Price:</b>{" "}
              {numberWithCommas(selectedInvoice.total_price)}
            </Typography>
            <Typography variant="body1">
              <b>Current Fitting Status:</b>{" "}
              {selectedInvoice.fitting_status.replace("_", " ").toUpperCase()}
            </Typography>
            <Typography variant="body1">
              <b>Status Updated At:</b>{" "}
              {formatDateTimeByType(
                selectedInvoice.fitting_status_updated_date,
                "both"
              )}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} mt={2} justifyContent="center">
            <Button
              variant={
                selectedInvoice.fitting_status === "fitting_ok"
                  ? "contained"
                  : "outlined"
              }
              color="primary"
              disabled={updating || putHandlerloading}
              onClick={() => handleStatusChange("fitting_ok")}
              sx={{ minWidth: 120, fontWeight: 600 }}
            >
              Fitting OK
            </Button>
            <Button
              variant={
                selectedInvoice.fitting_status === "damage"
                  ? "contained"
                  : "outlined"
              }
              color="error"
              disabled={updating || putHandlerloading}
              onClick={() => handleStatusChange("damage")}
              sx={{ minWidth: 120, fontWeight: 600 }}
            >
              Damage
            </Button>
            <Button
              variant={
                selectedInvoice.fitting_status === "not_fitting"
                  ? "contained"
                  : "outlined"
              }
              color="secondary"
              disabled={updating || putHandlerloading}
              onClick={() => handleStatusChange("not_fitting")}
              sx={{ minWidth: 120, fontWeight: 600 }}
            >
              Not Fitting
            </Button>
          </Stack>
        </Box>
      )}
      {!invoiceListLoading && !selectedInvoice && !invoiceListError && (
        <Typography color="error" mt={2} textAlign="center">
          No matching invoice found.
        </Typography>
      )}
    </Paper>
  );
}

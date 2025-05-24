import { useState } from "react";
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
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import toast from "react-hot-toast";
import useGetSingleInvoiceSearch from "../../../hooks/useGetSingleInvoiceSearch";
import { getBranchName } from "../../../utils/branchName";

export default function FittingForm() {
  const {
    invoiceSearchData,
    invoiceSearchLoading,
    invoiceSearchHandle,
    invoiceSearchError,
  } = useGetSingleInvoiceSearch();
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const [searchValue, setSearchValue] = useState(`${getBranchName()}`);
  const [updating, setUpdating] = useState(false);

  // When user clicks Search, filter by invoice number
  const handleSearch = () => {
    invoiceSearchHandle(searchValue, "factory");
  };

  // Handle fitting status update
  const handleStatusChange = async (newStatus: string) => {
    if (!invoiceSearchData) return;
    setUpdating(true);
    try {
      await putHandler(`orders/${invoiceSearchData.order}/update-fit-status/`, {
        fitting_status: newStatus,
      });
      toast.success("Fitting status updated");
      invoiceSearchHandle(invoiceSearchData.invoice_number, "factory");
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
          disabled={invoiceSearchLoading}
        >
          {invoiceSearchLoading ? (
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
      {invoiceSearchData && (
        <Box>
          <Divider sx={{ mb: 2 }} />
          <Stack direction="column" spacing={1} mb={1} pl={1}>
            <Typography variant="body1">
              <b>Customer:</b> {invoiceSearchData.customer_details.name}
            </Typography>
            <Typography variant="body1">
              <b>Invoice Number:</b> {invoiceSearchData.invoice_number}
            </Typography>
            <Typography variant="body1">
              <b>Date:</b>{" "}
              {formatDateTimeByType(invoiceSearchData.invoice_date, "both")}
            </Typography>

            <Typography variant="body1">
              <b>Current Fitting Status:</b>{" "}
              {invoiceSearchData.order_details.fitting_status
                .replace("_", " ")
                .toUpperCase()}
            </Typography>
            <Typography variant="body1">
              <b>Status Updated At:</b>{" "}
              {formatDateTimeByType(
                invoiceSearchData.order_details.fitting_status_updated_date,
                "both"
              )}
            </Typography>
            <Typography color="primary" fontWeight={"bold"} variant="body1">
              {invoiceSearchData.order_details.order_items.filter(
                (item) => item.lens !== null
              ).length >= 1 && "In Stock Lense Order"}
            </Typography>
            <Typography color="primary" fontWeight={"bold"} variant="body1">
              {invoiceSearchData.order_details.order_items.filter(
                (item) => item.external_lens !== null
              ).length >= 1 && "External Lense Order "}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} mt={2} justifyContent="center">
            <Button
              variant={
                invoiceSearchData.order_details.fitting_status === "fitting_ok"
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
                invoiceSearchData.order_details.fitting_status === "damage"
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
                invoiceSearchData.order_details.fitting_status === "not_fitting"
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
      {!invoiceSearchLoading && !invoiceSearchData && !invoiceSearchError && (
        <Typography color="info" mt={2} textAlign="center">
          No matching invoice found.
        </Typography>
      )}

      {invoiceSearchLoading && (
        <Typography color="error" mt={2} textAlign="center">
          <CircularProgress />
        </Typography>
      )}
    </Paper>
  );
}

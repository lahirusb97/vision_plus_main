import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider,
  CircularProgress,
  IconButton,
  Paper,
} from "@mui/material";
import { PatientRefractionDetailOrderSerializer } from "../../model/PatientRefractionDetailOrderSerializer";
import useGetPatientRefractionOrderList from "../../hooks/useGetPatientRefractionOrderList";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";
import BtnViewOrderForm from "../../components/common/BtnViewOrderForm";

interface RefractionHistoryDialogProps {
  open: boolean;
  onClose: () => void;
  patientId: number | null;
}

const RefractionHistoryDialog: React.FC<RefractionHistoryDialogProps> = ({
  open,
  onClose,
  patientId,
}) => {
  const {
    refractionInvoiceList,
    refractionInvoiceListLoading,
    refractionInvoiceListError,
    refractionInvoiceListSearch,
  } = useGetPatientRefractionOrderList();
  console.log("RefractionHistoryDialog", patientId);

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  useEffect(() => {
    if (open && patientId) {
      refractionInvoiceListSearch({ patient_id: patientId });
    }
  }, [open, patientId]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="refraction-history-dialog-title"
    >
      <DialogTitle id="refraction-history-dialog-title">
        Refraction History
      </DialogTitle>
      <DialogContent dividers>
        {refractionInvoiceListLoading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : refractionInvoiceListError ? (
          <Typography color="error">
            Error loading refraction history. Please try again.
          </Typography>
        ) : refractionInvoiceList.length === 0 ? (
          <Typography>No previous refractions found.</Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {refractionInvoiceList.map((item, index) => (
              <Paper variant="outlined" sx={{ p: 2 }} key={item.id}>
                <Box>
                  <Typography variant="subtitle1">
                    <strong> Order </strong>{" "}
                    <BtnViewOrderForm invoiceNumber={item.invoice_number} />
                  </Typography>
                  <Typography variant="body2">
                    Invoice:{item.invoice_number || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    total price {item.total_price || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    Date:{" "}
                    {formatDateTimeByType(item.order_date, "both") || "N/A"}
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle1">
                    <strong> Refraction </strong>
                  </Typography>
                  <Typography variant="body2">
                    Number: {item.refraction.refraction_number || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    Date:{" "}
                    {formatDateTimeByType(
                      item.refraction_details.created_at,
                      "both"
                    ) || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    Prescription Type:{" "}
                    {item.refraction_details.prescription_type_display || "N/A"}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RefractionHistoryDialog;

import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";

import useGetPatientRefractionOrderList from "../../hooks/useGetPatientRefractionOrderList";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";
import BtnViewOrderForm from "../../components/common/BtnViewOrderForm";
import { DateRangeIcon } from "@mui/x-date-pickers";
import { numberWithCommas } from "../../utils/numberWithCommas";
import BtnViewRefractionDetails from "../../components/common/BtnViewRefractionDetails";
import { AddBox } from "@mui/icons-material";
import { useFormContext } from "react-hook-form";
import { PatientRefractionDetailOrderSerializer } from "../../model/PatientRefractionDetailOrderSerializer";
import { RefractionDetailModel } from "../../model/RefractionDetailModel";

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
  const { setValue } = useFormContext();
  useEffect(() => {
    if (open && patientId) {
      refractionInvoiceListSearch({ patient_id: patientId });
    }
  }, [open, patientId]);
  const addVisionTOHbr = (refractionDetails: RefractionDetailModel) => {
    const formatEye = ({
      sph,
      cyl,
      axis,
    }: {
      sph?: string | null;
      cyl?: string | null;
      axis?: string | null;
    }) => {
      const parts: string[] = [];

      if (sph) parts.push(sph);
      if (cyl) parts.push(`/ ${cyl}`);
      if (axis) parts.push(`* ${axis}`);

      return parts.join(" ");
    };

    const rightHbRx = formatEye({
      sph: refractionDetails.right_eye_dist_sph,
      cyl: refractionDetails.right_eye_dist_cyl,
      axis: refractionDetails.right_eye_dist_axis,
    });
    const leftHbRx = formatEye({
      sph: refractionDetails.left_eye_dist_sph,
      cyl: refractionDetails.left_eye_dist_cyl,
      axis: refractionDetails.left_eye_dist_axis,
    });
    //sph /cyl/axis only
    setValue("hb_rx_right_dist", rightHbRx);
    setValue("hb_rx_left_dist", leftHbRx);
    //near
    setValue("hb_rx_right_near", refractionDetails.right_eye_near_sph);
    setValue("hb_rx_left_near", refractionDetails.left_eye_near_sph);
  };
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
        ) : refractionInvoiceList?.length === 0 ? (
          <Typography>No previous refractions found.</Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  color="primary"
                >
                  Refraction Details
                  <IconButton
                    onClick={() => {
                      addVisionTOHbr(invoice.refraction_details);
                    }}
                    color="error"
                  >
                    <AddBox fontSize="small" />
                  </IconButton>
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <DateRangeIcon fontSize="small" color="primary" />
                      <Typography variant="body2">
                        {formatDateTimeByType(
                          invoice.refraction.created_at,
                          "both"
                        )}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        Refraction #:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {invoice.refraction.refraction_number}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        Branch:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {invoice.refraction.branch_name}
                      </Typography>
                    </Box>
                  </Box>
                  <BtnViewRefractionDetails
                    refractionNumber={invoice.refraction_details.refraction}
                  />
                </Box>
              </Box>
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

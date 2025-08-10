import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
} from "@mui/material";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { HearingOrderReport } from "../../hooks/useGetHearingInvoiceList";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const HearingServiceDialog: React.FC<{
  orderData: HearingOrderReport | null;
  open: boolean;
  closeDialog: () => void;
  onSuccess: () => void;
}> = ({ orderData, open, closeDialog, onSuccess }) => {
  const { postHandler, postHandlerError, postHandlerloading } = useAxiosPost();
  const [nextSerivceDate, setNextSerivceDate] = React.useState<Dayjs | null>(
    null
  );

  const handleAction = async () => {
    try {
      const payload = {
        order_id: orderData?.order_id,
        last_service_date: dayjs().format("YYYY-MM-DD"),
        scheduled_service_date: orderData?.items?.[0]?.next_service_date,
        price: 0,
        next_service_date: nextSerivceDate?.format("YYYY-MM-DD"),
      };
      await postHandler(`hearing-orders/service/`, payload);
      toast.success("Action Performed successfully");
      setNextSerivceDate(null);
      onSuccess();
      closeDialog();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Dialog open={open} onClose={closeDialog} maxWidth="xs" fullWidth>
      <DialogTitle>
        Hearing Service Update for #{orderData?.invoice_number}
      </DialogTitle>

      <DialogContent sx={{ my: 2 }}>
        <Box sx={{ my: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Next Service Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Next Service Date"
              value={nextSerivceDate}
              format="YYYY-MM-DD"
              onChange={(newValue) => setNextSerivceDate(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="error" variant="outlined">
          Cancel
        </Button>
        <Button
          disabled={postHandlerloading}
          onClick={handleAction}
          color={postHandlerError ? "error" : "primary"}
          variant="contained"
        >
          {postHandlerloading && "Updating..."}
          {postHandlerError && "Error"}
          {!postHandlerloading && !postHandlerError && "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HearingServiceDialog;

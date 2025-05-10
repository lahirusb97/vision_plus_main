import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Typography } from "@mui/material";
import { numberWithCommas } from "../../utils/numberWithCommas";
import stringToIntConver from "../../utils/stringToIntConver";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axiosClient from "../../axiosClient";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import toast from "react-hot-toast";
interface ConfirmDialog {
  open: boolean;
  id: number | null;
  account_number: string | null;
  amount: string | null;
  date: string | null;
  is_confirmed: boolean | null;
  note: string | null;
}
export default function DepositeConfirm({
  confirmDialog,
  setConfirmDialog,
  bankDepositeRefresh,
}: {
  confirmDialog: ConfirmDialog;
  bankDepositeRefresh: () => Promise<void>;
  setConfirmDialog: React.Dispatch<React.SetStateAction<ConfirmDialog>>;
}) {
  const handleClose = () => {
    setConfirmDialog({
      open: false,
      id: null,
      account_number: null,
      amount: null,
      date: null,
      is_confirmed: null,
      note: null,
    });
  };
  const handleConfirm = async () => {
    try {
      await axiosClient.put(`bank-deposits/${confirmDialog.id}/confirm/`);
      toast.success("Deposite confirmed successfully");
      bankDepositeRefresh();
      handleClose();
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={confirmDialog.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Deposite Confirm"}</DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            Are you sure you want to confirm this deposite?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <DialogContentText variant="body1">
              Account Number
            </DialogContentText>
            <DialogContentText variant="body1">
              {confirmDialog.account_number}
            </DialogContentText>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <DialogContentText variant="body1">Amount</DialogContentText>
            <DialogContentText variant="body1">
              {numberWithCommas(stringToIntConver(confirmDialog.amount || "0"))}
            </DialogContentText>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <DialogContentText variant="body1">Date:</DialogContentText>
            <DialogContentText variant="body1">
              {confirmDialog.date}
            </DialogContentText>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <DialogContentText variant="body1">Note:</DialogContentText>
            <DialogContentText variant="body1">
              {confirmDialog.note}
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleConfirm}
            autoFocus
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <CheckCircleIcon />
            <span>Confirm</span>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

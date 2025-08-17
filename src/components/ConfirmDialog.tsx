import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../utils/extractErrorMessage";

const ConfirmDialog: React.FC<{
  apiCall: () => Promise<void>;
  open: boolean;
  closeDialog: () => void;
  onSuccess: () => void;
  message?: string;
}> = ({ apiCall, open, closeDialog, onSuccess, message }) => {
  const handleAction = async () => {
    try {
      await apiCall();
      toast.success("Action Performed successfully");
      onSuccess();
      closeDialog();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Dialog open={open} onClose={closeDialog} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>
        <Typography>
          {message || "Are you sure you want to Proceed?"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="error" variant="outlined">
          No
        </Button>
        <Button onClick={handleAction} color="primary" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import axiosClient from "../axiosClient";
import { useDeleteDialog } from "../context/DeleteDialogContext";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../utils/extractErrorMessage";

const DeleteDialog: React.FC = () => {
  const { state, closeDialog } = useDeleteDialog();

  const handleDelete = async () => {
    try {
      await axiosClient.delete(state.path);
      toast.success("Item deleted successfully");
      if (state.refresh) state.refresh(); // Call refresh function if provided
      closeDialog();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Dialog open={state.open} onClose={closeDialog} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to {state.deleteType}{" "}
          <strong>{state.itemName || "this item"}</strong>?
        </Typography>
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {state.message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary" variant="outlined">
          No
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Yes, {state.deleteType}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;

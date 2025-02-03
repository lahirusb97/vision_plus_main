import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (path: string) => void; // Passes the route path when confirming
  path: string ; // Route path for the delete action
  itemName?: string; // Optional item name
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm, path, itemName }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{itemName || "this item"}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          No
        </Button>
        <Button onClick={() => onConfirm(path)} color="error" variant="contained">

          Yes, Delete
        </Button>
        
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;

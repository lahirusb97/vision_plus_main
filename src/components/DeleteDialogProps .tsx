import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import axiosClient from "../axiosClient";
import totast from 'react-hot-toast';
interface DeleteDialogProps {
  open: boolean;
  path: string ; // Route path for the delete action
  itemName?: string; // Optional item name
  onClose: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, path, itemName ,onClose}) => {
  const handDleDelete = async () => {
    try {
    await axiosClient.delete(path);
      totast.success("Item deleted successfully");
      onClose();
    } catch (error) {
      totast.error("Delete Operation Failed");
      
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete {itemName || "this item"} Item ?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          No
        </Button>
        <Button onClick={handDleDelete} color="error" variant="contained">

          Yes, Delete
        </Button>
        
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;

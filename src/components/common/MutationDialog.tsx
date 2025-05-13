// components/ui/MutationDialog.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useMutationDialog } from "../../context/MutationDialogContext";

const MutationDialog: React.FC = () => {
  const { state, closeMutationDialog } = useMutationDialog();
  const { open, itemName, operation, onConfirm } = state;

  const handleConfirm = async () => {
    await onConfirm();
    closeMutationDialog();
  };

  const getTitle = () => {
    switch (operation) {
      case "delete":
        return `Confirm Deletion`;
      case "put":
        return `Confirm Update`;
      case "patch":
        return `Confirm Patch`;
      default:
        return `Confirm Action`;
    }
  };

  const getContentText = () => {
    switch (operation) {
      case "delete":
        return `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;
      case "put":
        return `Are you sure you want to update "${itemName}" with the provided Changes?`;
      case "patch":
        return `Are you sure you want to update "${itemName}" with the new changes?`;
      default:
        return `Please confirm your action on "${itemName}".`;
    }
  };

  return (
    <Dialog open={open} onClose={closeMutationDialog} maxWidth="sm" fullWidth>
      <DialogTitle>{getTitle()}</DialogTitle>
      <DialogContent>
        <DialogContentText>{getContentText()}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={closeMutationDialog}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MutationDialog;

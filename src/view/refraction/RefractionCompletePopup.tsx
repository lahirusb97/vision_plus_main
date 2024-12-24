import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

interface RefractionCompletePopupProps {
  open: boolean;
  message: string;
  handleToggle: () => void;
}

const RefractionCompletePopup: React.FC<RefractionCompletePopupProps> = ({
  open,
  message,
  handleToggle,
}) => {
  return (
    <Dialog open={open} onClose={handleToggle}>
      <DialogTitle>New User Created</DialogTitle>
      <DialogContent
        sx={{
          width: 300,
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{message}</Typography>
      </DialogContent>

      <Button variant="contained" onClick={handleToggle}>
        Ok
      </Button>
    </Dialog>
  );
};

export default RefractionCompletePopup;

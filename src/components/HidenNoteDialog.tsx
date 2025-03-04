import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import { Box, IconButton, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;
  const { watch } = useFormContext();

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper sx={{ p: 2, width: 500, minHeight: 100 }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" m={2}>
            Special Note
          </Typography>
          <IconButton onClick={handleClose} size="large" color="error">
            <Close />
          </IconButton>
        </Box>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 100 }}>
          <Typography
            variant="body1"
            color="error"
            fontWeight={"bold"}
            textAlign={"center"}
          >
            {watch("note") && watch("note")}
          </Typography>
        </Paper>
      </Paper>
    </Dialog>
  );
}

export default function HidenNoteDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="error" variant="contained">
        Note
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

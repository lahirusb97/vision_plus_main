import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { Badge, Box, Button, IconButton, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useFactoryOrderContext } from "../context/FactoryOrderContext";

export interface SimpleDialogProps {
  open: boolean;
  note: string | null;
  onClose: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, note, open } = props;

  const handleClose = () => {
    onClose();
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
            {note ? note : ""}
          </Typography>
        </Paper>
      </Paper>
    </Dialog>
  );
}

export default function HidenNoteDialog() {
  const { refractionDetail } = useFactoryOrderContext();
  const [open, setOpen] = React.useState(false);
  const note = refractionDetail?.note || null;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" sx={{ mx: 1 }} onClick={handleClickOpen}>
        <Badge badgeContent={note ? 1 : 0} color="error">
          Note
          <NotificationsIcon color={note ? "error" : "action"} />
        </Badge>
      </Button>

      <SimpleDialog note={note} open={open} onClose={handleClose} />
    </div>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { History } from "@mui/icons-material";
import { Box } from "@mui/material";
import { PaymentModel } from "../../../model/PaymentModel";
import PaymentListItem from "../../../components/common/PaymentListItem";

type Props = {
  paymentList: PaymentModel[];
};
export default function OrderPaymentHistoryDialog({ paymentList }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        color="info"
        sx={{ height: 32, mx: 1 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Payment History <History />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Payment History"}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: 400 }}>
            {paymentList.map((item) => (
              <PaymentListItem
                key={item.id}
                method={item.payment_method}
                date={item.payment_date}
                amount={item.amount}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

import * as React from "react";
import { AssignmentReturn, Delete } from "@mui/icons-material";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosDelete } from "../../../hooks/useAxiosDelete";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  Box,
  Typography,
  DialogContentText,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  REFUND_MAIN_CAT_ID,
  REFUND_ORDER_ID,
} from "../../../data/staticVariables";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const steps = ["Deactivate Appointment", "Refund Appointment"];

export default function OrderDeleteRefund({
  order_id,
  dialogType,
}: {
  order_id: string | undefined;
  dialogType: "delete" | "refund" | "both";
}) {
  const navigate = useNavigate();
  
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [deletedID, setDeletedID] = React.useState<string | null>(
    dialogType === "refund" && order_id ? order_id : null
  );
  const { deleteHandler, deleteHandlerError, deleteHandlerloading } =
    useAxiosDelete();
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const handleClickOpen = () => {
    setOpen(true);
    setActiveStep(0);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    setDeletedID(null);
  };
  const handleDelete = async () => {
    try {
      await deleteHandler(`orders/${order_id}/delete/`);
      toast.success("Order Deactivated successfully");
      setDeletedID(order_id || null);
      setActiveStep(1);
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  const handleRefund = async () => {
    try {
      await postHandler(`orders/${order_id}/refund/`, {
        branch: getUserCurentBranch()?.id,
        main_category: REFUND_MAIN_CAT_ID,
        sub_category: REFUND_ORDER_ID,
      });
      toast.success("Order refunded successfully");
      setDeletedID(null);
      navigate(`/transaction/factory_order`);
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  return (
    <React.Fragment>
      {dialogType === "delete" && (
        <Tooltip title="Deactivate Appointment">
          <IconButton size="small" onClick={handleClickOpen} color="error">
            <Delete />
          </IconButton>
        </Tooltip>
      )}
      {dialogType === "refund" && (
        <Tooltip title="Refund Order">
          <IconButton size="small" onClick={handleClickOpen} color="success">
            <AssignmentReturn />
          </IconButton>
        </Tooltip>
      )}
      {dialogType === "both" && (
        <Tooltip title="Deactivate & Refund Order">
          <Button
            size="small"
            variant="contained"
            onClick={handleClickOpen}
            color="error"
          >
            <Delete /> Delete & Refund
          </Button>
        </Tooltip>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogType === "delete" && "Deactivate Order"}
          {dialogType === "refund" && "Refund Order"}
          {dialogType === "both" && "Deactivate & Refund Order"}
        </DialogTitle>
        <DialogContent>
          {dialogType !== "refund" && (
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
          {/* DELETE APPOINTMENT */}

          {deletedID === null && (
            <Box>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to{" "}
                {dialogType === "delete" && "deactivate"} this order?
              </DialogContentText>

              <Button
                disabled={deleteHandlerloading}
                fullWidth
                size="small"
                color="error"
                variant="contained"
                sx={{ my: 2 }}
                onClick={handleDelete}
                autoFocus
              >
                <Delete /> Deactivate
              </Button>
            </Box>
          )}

          {/* REFUND APPOINTMENT */}
          {deletedID !== null && (
            <Box>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to refund this order?
              </DialogContentText>

              <Button
                disabled={postHandlerloading}
                fullWidth
                size="small"
                color="success"
                variant="contained"
                sx={{ my: 2 }}
                onClick={handleRefund}
                autoFocus
              >
                <AssignmentReturn /> Yes Refund
              </Button>
            </Box>
          )}
          {postHandlerError && (
            <Typography color="error" variant="caption">
              Refunding Error Occured try again or check your internet
              connection
            </Typography>
          )}
          {deleteHandlerError && (
            <Typography color="error" variant="caption">
              Deactivattion Error Occured try again or check your internet
              connection
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            disabled={deleteHandlerloading || postHandlerloading}
            variant="outlined"
            color="error"
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

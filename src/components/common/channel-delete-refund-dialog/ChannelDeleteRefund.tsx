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
  REFUND_CHANNEL_ID,
  REFUND_MAIN_CAT_ID,
} from "../../../data/staticVariables";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const steps = ["Deactivate Appointment", "Refund Appointment"];

export default function ChannelDeleteRefund({
  appointment_id,
  dialogType,
}: {
  appointment_id: string | undefined;
  dialogType: "delete" | "refund" | "both";
}) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [deletedID, setDeletedID] = React.useState<string | null>(
    dialogType === "refund" && appointment_id ? appointment_id : null
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
      await deleteHandler(`channel/${appointment_id}/cancel/`);
      toast.success("Appointment Deactivated successfully");
      setDeletedID(appointment_id || null);
      setActiveStep(1);
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  const handleRefund = async () => {
    try {
      await postHandler(`channel/${appointment_id}/refund/`, {
        branch: getUserCurentBranch()?.id,
        main_category: REFUND_MAIN_CAT_ID,
        sub_category: REFUND_CHANNEL_ID,
      });
      toast.success("Appointment refunded successfully");
      setDeletedID(null);
      navigate(`/channel/channel_details`);
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
        <Tooltip title="Refund Appointment">
          <IconButton size="small" onClick={handleClickOpen} color="success">
            <AssignmentReturn />
          </IconButton>
        </Tooltip>
      )}
      {dialogType === "both" && (
        <Tooltip title="Deactivate & Refund Appointment">
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
          {dialogType === "delete" && "Deactivate Appointment"}
          {dialogType === "refund" && "Refund Appointment"}
          {dialogType === "both" && "Deactivate & Refund Appointment"}
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
                {dialogType === "delete" && "deactivate"} this appointment?
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
                Are you sure you want to refund this appointment?
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

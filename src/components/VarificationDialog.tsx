import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axiosClient from "../axiosClient";

type UserRole = "admin" | "user";
type OperationType = "create" | "update" | null;

interface VerificationDialogProps {
  open: boolean;
  operationType: OperationType;
  onVerified: (verifiedUserId: number) => Promise<void>; // Now returns Promise
  onClose: () => void;
}

interface UserData {
  id: number;
  username: string;
  role: UserRole;
}

const userCodeSchema = z.object({
  user_code: z.string().min(1, "User code is required"),
  password: z.string().min(1, "Password is required"),
});

type UserCodeFormData = z.infer<typeof userCodeSchema>;

const VerificationDialog: React.FC<VerificationDialogProps> = ({
  open,
  operationType,
  onVerified,
  onClose,
}) => {
  const [step, setStep] = useState<"initial" | "adminConfirmation">("initial");
  const [verifiedUser, setVerifiedUser] = useState<UserData | null>(null);
  const [adminVerifier, setAdminVerifier] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userForm = useForm<UserCodeFormData>({
    resolver: zodResolver(userCodeSchema),
  });

  const adminForm = useForm<UserCodeFormData>({
    resolver: zodResolver(userCodeSchema),
  });

  const verifyUser = async (data: UserCodeFormData) => {
    try {
      setError(null);
      const response = await axiosClient.post(
        "admin-and-user/check-code/",
        data
      );
      const userData: UserData = response.data;

      if (operationType === "create") {
        setVerifiedUser(userData);
      } else {
        if (userData.role === "user") {
          setVerifiedUser(userData);
          setStep("adminConfirmation");
        } else {
          setVerifiedUser(userData);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    }
  };

  const verifyAdmin = async (data: UserCodeFormData) => {
    try {
      setError(null);
      const response = await axiosClient.post(
        "admin-and-user/check-code/",
        data
      );
      const adminData: UserData = response.data;

      if (adminData.role !== "admin") {
        throw new Error("Only admins can confirm this action");
      }

      setAdminVerifier(adminData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Admin verification failed"
      );
    }
  };

  const handleSave = async () => {
    if (!verifiedUser) return;

    setIsSubmitting(true);
    try {
      await onVerified(verifiedUser.id);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("initial");
    setVerifiedUser(null);
    setAdminVerifier(null);
    setError(null);
    userForm.reset();
    adminForm.reset();
    onClose();
  };

  const showSuccess =
    verifiedUser &&
    (operationType === "create" ||
      (operationType === "update" &&
        (verifiedUser.role === "admin" || adminVerifier)));

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {operationType === "create" ? "Create" : "Update"} Verification
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box p={2}>
          {error && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}

          {!showSuccess && step === "initial" && (
            <form onSubmit={userForm.handleSubmit(verifyUser)}>
              <Typography variant="body1" mb={2}>
                Please verify your identity
              </Typography>
              <TextField
                fullWidth
                label="User Code"
                margin="normal"
                {...userForm.register("user_code")}
                error={!!userForm.formState.errors.user_code}
                helperText={userForm.formState.errors.user_code?.message}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                {...userForm.register("password")}
                error={!!userForm.formState.errors.password}
                helperText={userForm.formState.errors.password?.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={userForm.formState.isSubmitting}
              >
                Verify Identity
              </Button>
            </form>
          )}

          {!showSuccess && step === "adminConfirmation" && (
            <form onSubmit={adminForm.handleSubmit(verifyAdmin)}>
              <Typography variant="body1" mb={2}>
                Admin confirmation required
              </Typography>
              <TextField
                fullWidth
                label="Admin Code"
                margin="normal"
                {...adminForm.register("user_code")}
                error={!!adminForm.formState.errors.user_code}
                helperText={adminForm.formState.errors.user_code?.message}
              />
              <TextField
                fullWidth
                label="Admin Password"
                type="password"
                margin="normal"
                {...adminForm.register("password")}
                error={!!adminForm.formState.errors.password}
                helperText={adminForm.formState.errors.password?.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={adminForm.formState.isSubmitting}
              >
                Verify Admin
              </Button>
            </form>
          )}

          {showSuccess && (
            <Box>
              <Typography variant="body1" mb={2}>
                Verification successful!
              </Typography>
              <Typography variant="body2" mb={3}>
                Verified as: {verifiedUser.username} ({verifiedUser.role})
                {adminVerifier && (
                  <span>, Confirmed by admin: {adminVerifier.username}</span>
                )}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSave}
                disabled={isSubmitting}
              >
                {operationType === "create" ? "Save" : "Update"} Record
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;

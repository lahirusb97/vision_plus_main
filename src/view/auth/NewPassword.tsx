import React, { useState } from "react";
import useGetPasswordResetToken from "../../hooks/useGetPasswordResetToken";
import { useParams, useNavigate } from "react-router";

import { useAxiosPost } from "../../hooks/useAxiosPost";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { toast } from "react-hot-toast";
import DataLoadingError from "../../components/common/DataLoadingError";

export default function NewPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const {
    passwordResetToken,
    passwordResetTokenLoading,
    passwordResetTokenError,
  } = useGetPasswordResetToken({ token: token || null });

  const { postHandler: updatePassword, postHandlerloading: isUpdating } =
    useAxiosPost();

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 4) {
      newErrors.newPassword = "Password must be at least 4 characters long";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !token) return;

    try {
      await updatePassword(`rest-password/confirm/`, {
        reset_token: token,
        new_password: newPassword,
      });

      toast.success("Password updated successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
    }
  };

  if (passwordResetTokenLoading) {
    return <div>Loading...</div>;
  }

  if (passwordResetTokenError || !passwordResetToken?.valid) {
    return <DataLoadingError />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "url('login.webp') center/cover no-repeat",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        },
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{ position: "relative", zIndex: 2 }}
      >
        <Paper elevation={3} sx={{ p: 4, mt: 2, mb: 2 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Reset Your Password
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mb: 3 }}
          >
            {passwordResetToken.email}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
            />

            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Password"}
            </Button>
            <Button

              fullWidth
              variant="outlined"
              disabled={isUpdating}
              onClick={() => navigate("/login")}
            >
              { "Cancel"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useAxiosPost } from "../../hooks/useAxiosPost";

export default function EnterUserCode() {
  const [userCode, setUserCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userCode.trim()) {
      setError("Please enter your user code");
      return;
    }

    try {
      const response = await postHandler("rest-password/", {
        user_code: userCode,
      });
      // If successful, navigate to new password page with the token
      if (response?.data?.reset_token) {
        navigate(
          `/login/password-reset/${response.data.reset_token}/new-password`
        );
      }
    } catch (err) {
      setError(
        "Failed to process your request. Please check your user code and try again."
      );
      console.error("Password reset error:", err);
    }
  };

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
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Reset Your Password
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          paragraph
          align="center"
        >
          Please enter your user code to reset your password
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="User Code"
            variant="outlined"
            margin="normal"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            disabled={postHandlerloading}
            autoFocus
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={postHandlerloading}
            sx={{ mt: 2 }}
          >
            {postHandlerloading ? "Processing..." : "Continue"}
          </Button>

          <Button
            fullWidth
            color="primary"
            onClick={() => navigate("/login")}
            sx={{ mt: 1 }}
            disabled={postHandlerloading}
          >
            Back to Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

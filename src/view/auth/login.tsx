import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  InputLabel,
  TextField,
  Paper,
  Avatar,
  CircularProgress,
  useTheme,
} from "@mui/material";
import logo from "../../assets/defalt/logo.png";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router";
import { saveUserAuth } from "../../utils/authDataConver";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import toast from "react-hot-toast";

interface LoginInput {
  username: string;
  password: string;
}

export default function Login() {
  const [loginInput, setLoginInput] = useState<LoginInput>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const theme = useTheme(); // Use MUI theme hook

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const data = await axiosClient.post("/login/", loginInput);
      saveUserAuth(data.data);
      navigate("/branch_selection");
      toast.success("Login Successfull");
    } catch (error) {
      extractErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with 50% opacity
          zIndex: 1,
        },
      }}
    >
      {/* Logo */}

      {/* Login Form */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 3,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Avatar
          alt="Vision Plus Logo"
          src={logo}
          sx={{
            width: 90,
            height: 90,
            animation: "bounce 1.5s infinite",
            "@keyframes bounce": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-10px)" },
            },
          }}
        />
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: theme.palette.text.primary, // Adjust text color based on theme
            textAlign: "center",
          }}
        >
          Welcome to Vision Plus
        </Typography>
        <Typography variant="body1">Please log in to continue</Typography>
        <TextField
          name="username"
          label="User name"
          id="username"
          variant="outlined"
          type="text"
          value={loginInput.username}
          fullWidth
          placeholder="Enter your username"
          onChange={handleInputChange}
        />
        <TextField
          name="password"
          label="Password"
          id="password"
          variant="outlined"
          type="password"
          value={loginInput.password}
          fullWidth
          placeholder="Enter your password"
          onChange={handleInputChange}
        />
        <Button
          data-testid={`login-button`}
          variant="contained"
          fullWidth
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
        <Typography
          sx={{ padding: 1, cursor: "pointer", textAlign: "center" }}
          onClick={() => navigate("/login/password-reset")}
          variant="caption"
        >
          Forgot Password ?
        </Typography>{" "}
        {/* <Typography
          sx={{ padding: 1, cursor: "pointer", textAlign: "center" }}
          onClick={() => navigate("/login/register")}
          variant="body2"
        >
          Register Now ?
        </Typography> */}
      </Paper>
    </Box>
  );
}

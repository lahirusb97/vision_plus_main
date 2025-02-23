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
import { useAuthContext } from "../../context/AuthContext";

interface LoginInput {
  username: string;
  password: string;
}

export default function Login() {
  const { setUser, setUserToken } = useAuthContext();
  const [loginInput, setLoginInput] = useState<LoginInput>({
    username: "admin",
    password: "admin",
  });
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const theme = useTheme(); // Use MUI theme hook

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const data = await axiosClient.post("/login/", loginInput);

      const userData: LoginResponse = {
        username: data.data.username,
        is_staff: data.data.is_staff,
        is_superuser: data.data.is_superuser,
        token: data.data.token,
        message: data.data.message,
      };
      setUser(userData);
      setUserToken(data.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
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
        bgcolor: theme.palette.background.default, // Dynamically set background color
        padding: 2,
      }}
    >
      {/* Logo */}
      <Avatar
        alt="Vision Plus Logo"
        src={logo}
        sx={{
          width: 90,
          height: 90,
          marginBottom: 2,
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
      <Typography
        variant="body1"
        sx={{
          color: "white", // Adjust text color for secondary text
          textAlign: "center",
          marginTop: 1,
          marginBottom: 3,
        }}
      >
        Please log in to continue
      </Typography>

      {/* Login Form */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 3,
          borderRadius: 3,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 8px 15px rgba(255, 255, 255, 0.3)"
              : "0px 8px 15px rgba(0, 0, 0, 0.1)", // Adjust box shadow for dark theme
          animation: "fadeIn 0.8s ease",
          bgcolor: theme.palette.background.paper, // Background for Paper component
          color: theme.palette.text.primary, // Ensure good contrast with text
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Box mb={2}>
          <InputLabel htmlFor="username" sx={{ color: "white" }}>
            Username
          </InputLabel>
          <TextField
            name="username"
            id="username"
            variant="outlined"
            type="text"
            value={loginInput.username}
            fullWidth
            placeholder="Enter your username"
            onChange={handleInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.primary.main, // Dynamic border color
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.dark, // Dynamic hover color
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.light, // Dynamic focused color
                },
              },
            }}
          />
        </Box>
        <Box mb={3}>
          <InputLabel htmlFor="password" sx={{ color: "white" }}>
            Password
          </InputLabel>
          <TextField
            name="password"
            id="password"
            variant="outlined"
            type="password"
            value={loginInput.password}
            fullWidth
            placeholder="Enter your password"
            onChange={handleInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.primary.main,
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.dark,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.light,
                },
              },
            }}
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "black",
            fontWeight: "bold",
            padding: "10px",
            textTransform: "none",
            transition: "transform 0.2s",
            "&:hover": {
              bgcolor: theme.palette.primary.dark,
              transform: "scale(1.02)",
            },
          }}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
        <Typography
          sx={{ padding: 1, cursor: "pointer", textAlign: "center" }}
          onClick={() => navigate("/login/register")}
          variant="body2"
        >
          Register Now ?
        </Typography>
      </Paper>
    </Box>
  );
}

type LoginResponse = {
  message: string;
  token: string;
  username: string;
  is_staff: boolean;
  is_superuser: boolean;
};

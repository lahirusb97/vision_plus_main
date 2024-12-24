import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  InputLabel,
  TextField,
  Paper,
  CircularProgress,
  Avatar,
  useTheme,
} from "@mui/material";
import logo from "../../assets/defalt/logo.png"; // Adjust path to your logo
import axiosClient from "../../axiosClient"; // Axios client to handle API requests
import { useNavigate } from "react-router";

interface RegisterInput {
  username: string;
  password: string;
  email: string;
}

export default function RegisterUser() {
  const [registerInput, setRegisterInput] = useState<RegisterInput>({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const theme = useTheme(); // MUI theme hook for dynamic styling

  const handleRegister = async () => {
    setLoading(true);
    try {
      const data = await axiosClient.post(
        "/api/register/admin/",
        registerInput
      );
      // Handle the response (e.g., success message, navigate to login page, etc.)
      alert("Admin registered successfully!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error(error);
      alert("Registration failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInput((prev) => ({
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
          color: theme.palette.text.primary,
          textAlign: "center",
        }}
      >
        Admin Registration
      </Typography>

      {/* Registration Form */}
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
              : "0px 8px 15px rgba(0, 0, 0, 0.1)",
          animation: "fadeIn 0.8s ease",
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {/* Username Input */}
        <Box mb={2}>
          <InputLabel htmlFor="username" sx={{ color: "white" }}>
            Username
          </InputLabel>
          <TextField
            name="username"
            id="username"
            variant="outlined"
            type="text"
            value={registerInput.username}
            fullWidth
            placeholder="Enter your username"
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

        {/* Email Input */}
        <Box mb={2}>
          <InputLabel htmlFor="email" sx={{ color: "white" }}>
            Email
          </InputLabel>
          <TextField
            name="email"
            id="email"
            variant="outlined"
            type="email"
            value={registerInput.email}
            fullWidth
            placeholder="Enter your email"
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

        {/* Password Input */}
        <Box mb={3}>
          <InputLabel htmlFor="password" sx={{ color: "white" }}>
            Password
          </InputLabel>
          <TextField
            name="password"
            id="password"
            variant="outlined"
            type="password"
            value={registerInput.password}
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

        {/* Submit Button */}
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
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Register"
          )}
        </Button>
        <Typography
          sx={{ padding: 1, cursor: "pointer", textAlign: "center" }}
          onClick={() => navigate("/login/")}
          variant="body2"
        >
          User Login
        </Typography>
      </Paper>
    </Box>
  );
}

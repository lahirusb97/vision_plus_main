import React, { useState } from "react";
import { Box, Typography, Button, InputLabel, TextField } from "@mui/material";
import logo from "../../assets/defalt/logo.png";
import hi_hand from "../../assets/defalt/hi_hand.png";
import { yellow } from "@mui/material/colors";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";

interface LoginInput {
  username: string;
  password: string;
}
export default function Login() {
  const { setUser, setToken } = useAuthContext();
  const [loginInput, setLoginInput] = useState<LoginInput>({
    username: "admin",
    password: "admin",
  });
  const navigation = useNavigate();
  const handleSingin = async () => {
    console.log(loginInput);

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
      setToken(data.data.token);
      console.log(data.data);

      // localStorage.setItem("authToken", JSON.stringify(data.data.token));
      navigation("/");
      console.log(data);
    } catch (error) {
      console.log(error);
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
      bgcolor={yellow[50]}
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {/* Yellow Bar with Centered Text */}
      <Box
        sx={{
          backgroundColor: "yellow",
          width: "100%",
          padding: "16px 0",
          textAlign: "center",
        }}
      >
        <Typography fontWeight={"bold"} variant="h6">
          Vision Plus Management System2
        </Typography>
      </Box>

      {/* Logo with Text */}
      <Box
        bgcolor={"white"}
        py={3}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          paddingLeft: "16px",
        }}
      >
        <img
          src={logo} // Replace with correct logo path
          alt="Vision Plus Logo"
        />
      </Box>
      {/* Login Form */}

      <Box
        bgcolor={"white"}
        sx={{
          width: "100%",
          maxWidth: "400px",
          marginTop: "32px",
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "24px" }}>
          Hi{" "}
          <img style={{ margin: "-10px", padding: "0 .5em" }} src={hi_hand} />
          Vision Plus.
        </Typography>

        {/* User name Input */}
        <Box>
          <InputLabel htmlFor="custom-input" sx={{ mb: 1, textAlign: "left" }}>
            User Name
          </InputLabel>
          <TextField
            name="username"
            id="custom-input1"
            variant="outlined"
            type="text"
            value={loginInput.username}
            fullWidth
            placeholder="Enter User Name"
            onChange={handleInputChange}
          />
        </Box>
        {/* Password Input */}

        <Box my={2}>
          <InputLabel htmlFor="custom-input" sx={{ mb: 1, textAlign: "left" }}>
            Password
          </InputLabel>
          <TextField
            name="password"
            id="custom-input2"
            variant="outlined"
            type="password"
            value={loginInput.password}
            fullWidth
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: "12px",
            fontWeight: "bold",
            textTransform: "none",
          }}
          onClick={handleSingin}
        >
          Continue
        </Button>
      </Box>
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

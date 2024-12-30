import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import RefractionCompletePopup from "./RefractionCompletePopup";
import axiosClient from "../../axiosClient";
import { usePostApiCall } from "../../hooks/usePostApiCall";

export default function RefractionNumber() {
  const { data, error, loading, postApi } = usePostApiCall<{
    data: {
      refraction_number: string;
      customer_full_name: string;
      id: number;
      customer_mobile: string;
    };
  }>();
  const [open, setOpen] = React.useState({ open: false, message: "" });
  const [createRefraction, setCreateRefraction] = useState({
    customer_full_name: "",
    customer_mobile: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const responseData = await postApi(
        "/refractions/create/",
        createRefraction
      );

      setOpen({
        open: true,
        message: `Refraction Number: ${responseData.data.refraction_number}`,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggle = () => {
    setOpen({ open: !open.open, message: "" });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom align="center">
          Customer Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) =>
              setCreateRefraction({
                ...createRefraction,
                customer_full_name: e.target.value,
              })
            }
            fullWidth
            label="Customer Name"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            onChange={(e) =>
              setCreateRefraction({
                ...createRefraction,
                customer_mobile: e.target.value,
              })
            }
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            required
            type="tel"
            inputProps={{
              pattern: "[0-9]{10}",
              title: "Please enter a valid 10-digit phone number",
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              marginTop: 2,
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress /> : "Create"}
          </Button>
        </form>
      </Paper>
      <RefractionCompletePopup
        open={open.open}
        message={open.message}
        handleToggle={handleToggle}
      />
    </Box>
  );
}

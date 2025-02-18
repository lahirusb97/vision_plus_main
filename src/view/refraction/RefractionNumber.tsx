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
import { handleError } from "../../utils/handleError";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function RefractionNumber() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState({ open: false, message: "" });
  const [createRefraction, setCreateRefraction] = useState({
    customer_full_name: "",
    customer_mobile: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log(createRefraction);

      setLoading(true);
      const responseData = await axiosClient.post(
        "/refractions/create/",
        createRefraction
      );
      setCreateRefraction({
        customer_full_name: "",
        customer_mobile: "",
      });
      setOpen({
        open: true,
        message: `Refraction Number: ${responseData.data.refraction_number}`,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setCreateRefraction({
        customer_full_name: "",
        customer_mobile: "",
      });
      setLoading(false);
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

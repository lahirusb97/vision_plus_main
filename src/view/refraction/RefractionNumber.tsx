import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import axiosClient from "../../axiosClient";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { RefractionModel } from "../../model/RefractionModel";
export default function RefractionNumber() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const schema = yup.object({
    customer_full_name: yup.string().required("Full Name is required"),
    nic: yup.string().required("Full Name is required"),
    customer_mobile: yup
      .string()
      .required("User Name is required")
      .max(10)
      .min(10),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const shandleSubmit = async (data) => {
    try {
      setLoading(true);
      const responseData = await axiosClient.post("/refractions/create/", data);
      const params = new URLSearchParams({
        customer_full_name: responseData.data.data.customer_full_name,
        nic: responseData.data.data.nic,
        customer_mobile: responseData.data.data.customer_mobile,
        refraction_number: responseData.data.data.refraction_number,
      });
      reset();
      navigate(`success?${params.toString()}`);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
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
        <form onSubmit={handleSubmit(shandleSubmit)}>
          <TextField
            {...register("customer_full_name")}
            fullWidth
            label="Customer Name"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            {...register("nic")}   /* chalani- textfiled added and connected to use form hook*/
            fullWidth
            label="NIC"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            {...register("customer_mobile")}
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
    </Box>
  );
}

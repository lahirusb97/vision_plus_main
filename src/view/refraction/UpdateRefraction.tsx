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
import { useLocation, useNavigate, useParams } from "react-router";
export default function UpdateRefraction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [loading, setLoading] = useState(false);
  const schema = yup.object({
    customer_full_name: yup.string().required("Full Name is required"),
    customer_mobile: yup
      .string()
      .required("User Name is required")
      .max(10)
      .min(10),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      customer_full_name: searchParams.get("customer_full_name") || "",
      customer_mobile: searchParams.get("customer_mobile") || "",
    },
  });
  const shandleSubmit = async (data) => {
    try {
      setLoading(true);
      const responseData = await axiosClient.put(
        `refractions/${id}/update/`,
        data
      );
      reset();
      toast.success("Refraction updated successfully");
      navigate(-1);
    } catch (error) {
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
          Update Coustomer Details
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

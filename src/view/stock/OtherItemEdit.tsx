import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router";
import toast from 'react-hot-toast';
import { AxiosError } from "axios";
import axiosClient from "../../axiosClient";
interface Stock {
  price: number;
}
const OtherItemEdit = () => {
const {id}=useParams()


   const schema = yup.object().shape({
    price: yup.number().positive().min(0.01, "Price must be positive").required("Price is required"),
  });
  const {  handleSubmit, formState: { errors }, register ,reset} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      price: undefined,
    }
  });
  const submiteData =async (data: Stock) => {
    const { price } = data;
    const postDAta={
      price:price,
  }
  
  try {
   await axiosClient.put(`/lens-cleaners/${id}/`,postDAta)
    toast.success("Frame added successfully");
    reset()
  } catch (error) {
    if (error instanceof AxiosError) {
      // Safely access error.response.data.message
      toast.error(error.response?.data?.message || "Something went wrong");
    } else {
      // Handle non-Axios errors (e.g., network errors, syntax errors, etc.)
      toast.error("Something went wrong");
    }
    
  }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Paper component={"form"} onSubmit={handleSubmit(submiteData)} sx={{ padding: 4, width: 400, textAlign: "Left",   }} elevation={3}>
        <Typography variant="h6" fontWeight="bold" paddingLeft="9px">
          Price Update
        </Typography>

        <Box sx={{ marginY: 2 }}>
          <Chip label="Item Name" color="primary" sx={{ marginX: 0.5, backgroundColor: "#237ADE",color:'white' }} />
        
        </Box>

        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          inputProps={{ min: 0 }}
          type="number"
          {...register('price', {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
          sx={{ marginBottom: 2 }}
        />
      

        <Button type="submit" variant="contained" fullWidth>
          SAVE
        </Button>
      </Paper>
    </Box>
  );
};

export default OtherItemEdit;

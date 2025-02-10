import React from "react";
import { Box, Button, TextField, Paper ,Typography} from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "../../axiosClient";
import toast from 'react-hot-toast';
import { AxiosError } from "axios";
interface OtherItem {
  name: string;
  price: number;
  qty: number;
}
const AddItemsForm = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Product Name is required"),
      price: Yup.number().positive().min(0.01, "Price must be positive").required("Price is required"),
      qty: Yup.number().positive().integer().min(1),
    });
    const { register, handleSubmit,formState: { errors } ,reset} = useForm({
      resolver: yupResolver(validationSchema),
    });
    const handleData=async(data:OtherItem)=>{
      try {
        await axiosClient.post("/lens-cleaners/", data);
        toast.success("Frame added successfully");
        reset();
      } catch (error) {
        // Check if the error is an AxiosError
        if (error instanceof AxiosError) {
          // Safely access error.response.data.message
          toast.error(error.response?.data?.message || "Something went wrong");
        } else {
          // Handle non-Axios errors (e.g., network errors, syntax errors, etc.)
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }
  return (
    <Box>
     <Typography sx={{ marginBottom: 2 ,fontWeight:"bold"}} variant="h4" gutterBottom>Create Other Item</Typography>

      <Paper
      onSubmit={handleSubmit(handleData)}
      component={'form'}
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          {...register('name')}
          label="Product Name"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
               disabled
               
          {...register('qty', {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          label="Quantity"
          inputProps={{
            min: 0,
          }}
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.qty}
          helperText={errors.qty?.message}
        />
        
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.price}
          helperText={errors.price?.message}
          inputProps={{
            min: 0,
          }}

          {...register('price', {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
        />
        <Button disabled={loading} type="submit" variant="contained" color="primary">{loading?"Creating...":"Create"}</Button>
      </Paper>
     
    </Box>
  );
};

export default AddItemsForm;

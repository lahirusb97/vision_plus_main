import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  OtherItemFormModel,
  schemaOtherItem,
} from "../../../validations/schemaOtherItem";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPost } from "../../../hooks/useAxiosPost";

const OtherItemCreate = () => {
  const { postHandler, postHandlerloading } = useAxiosPost();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OtherItemFormModel>({
    resolver: zodResolver(schemaOtherItem),
  });
  const otherItemcreate = async (data: OtherItemFormModel) => {
    // initial_count by defalt added as QTY when create
    // is_active by defalt true
    const OtherItemCreate = {
      name: data.name,
      price: data.price,
      is_active: true,
      stock: {
        qty: data.qty,
        initial_count: data.qty,
      },
    };

    try {
      await postHandler("other-items/", OtherItemCreate);
      toast.success("Normal Item successfully Added to the store");
      reset();
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  return (
    <Box>
      <Paper
        onSubmit={handleSubmit(otherItemcreate)}
        component={"form"}
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{ marginBottom: 2, fontWeight: "bold" }}
          variant="h4"
          gutterBottom
        >
          Create Other Item
        </Typography>

        <TextField
          {...register("name")}
          label="Product Name"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register("qty", { valueAsNumber: true })}
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
          {...register("price", { valueAsNumber: true })}
        />
        <Button
          disabled={postHandlerloading}
          type="submit"
          variant="contained"
          color="primary"
        >
          {postHandlerloading ? "Creating..." : "Create"}
        </Button>
      </Paper>
    </Box>
  );
};

export default OtherItemCreate;

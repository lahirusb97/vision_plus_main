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
import { getUserCurentBranch } from "../../../utils/authDataConver";

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
      stock: [
        {
          qty: data.qty,
          initial_count: data.qty,
          branch_id: data.branch_id,
          limit: data.limit,
        },
      ],
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
          gap: 1,
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{ marginBottom: 2, fontWeight: "bold" }}
          variant="h5"
          gutterBottom
        >
          Create Other Item
        </Typography>

        <TextField
          {...register("name")}
          label="Product Name"
          type="text"
          fullWidth
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
          variant="outlined"
          error={!!errors.qty}
          helperText={errors.qty?.message}
        />
        <TextField
          fullWidth
          label="Enter Alert  Amount"
          variant="outlined"
          inputProps={{ min: 0 }}
          type="number"
          {...register("limit", {
            valueAsNumber: true,
            min: 0,
            required: true,
          })}
          error={!!errors.limit}
          helperText={errors.limit?.message}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          error={!!errors.price}
          helperText={errors.price?.message}
          inputProps={{
            min: 0,
          }}
          {...register("price", { valueAsNumber: true })}
        />
        <TextField
          sx={{ display: "none" }}
          inputProps={{
            min: 0,
          }}
          {...register("branch_id", { valueAsNumber: true })}
          label="Branch Id"
          type="number"
          fullWidth
          variant="outlined"
          error={!!errors.branch_id}
          helperText={errors.branch_id?.message}
          defaultValue={getUserCurentBranch()?.id}
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

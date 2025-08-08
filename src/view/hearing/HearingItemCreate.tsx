import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import {
  HearingItemFormModel,
  schemaHearingItem,
} from "../../validations/schemaHearingItem";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { getUserCurentBranch } from "../../utils/authDataConver";
// Define the form schema for hearing items

const HearingItemCreate = () => {
  const { postHandler, postHandlerloading } = useAxiosPost();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HearingItemFormModel>({
    resolver: zodResolver(schemaHearingItem),
  });

  const hearingItemCreate = async (data: HearingItemFormModel) => {
    const hearingItemData = {
      name: data.name,
      price: data.price,
      warranty: data.warranty,
      code: data.code || "",
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
      await postHandler("hearing-items/", hearingItemData);
      toast.success("Hearing item successfully added to the store");
      reset();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Box>
      <Paper
        onSubmit={handleSubmit(hearingItemCreate)}
        component={"form"}
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "400px",
          display: "flex",
          gap: 2,
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{ marginBottom: 2, fontWeight: "bold" }}
          variant="h5"
          gutterBottom
        >
          Create Hearing Item
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
          {...register("code")}
          label="Product Code (Optional)"
          type="text"
          fullWidth
          variant="outlined"
          error={!!errors.code}
          helperText={errors.code?.message}
        />

        <TextField
          {...register("warranty")}
          label="Warranty Period"
          type="text"
          fullWidth
          variant="outlined"
          error={!!errors.warranty}
          helperText={errors.warranty?.message}
          placeholder="e.g., 1 year, 2 years"
        />

        <TextField
          {...register("price", { valueAsNumber: true })}
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          error={!!errors.price}
          helperText={errors.price?.message}
          inputProps={{
            min: 0,
            step: "0.01",
          }}
        />

        <TextField
          {...register("qty", { valueAsNumber: true })}
          label="Quantity"
          type="number"
          fullWidth
          variant="outlined"
          error={!!errors.qty}
          helperText={errors.qty?.message}
          inputProps={{
            min: 0,
          }}
        />

        <TextField
          {...register("limit", { valueAsNumber: true })}
          label="Low Stock Alert Level"
          type="number"
          defaultValue={0}
          fullWidth
          variant="outlined"
          error={!!errors.limit}
          helperText={errors.limit?.message}
          inputProps={{
            min: 0,
          }}
        />

        <TextField
          sx={{ display: "none" }}
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
          sx={{ mt: 2 }}
        >
          {postHandlerloading ? "Creating..." : "Create Hearing Item"}
        </Button>
      </Paper>
    </Box>
  );
};

export default HearingItemCreate;

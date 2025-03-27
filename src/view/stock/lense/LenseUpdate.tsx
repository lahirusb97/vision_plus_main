import { Box, Button, Chip, TextField, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosClient from "../../../axiosClient";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useGetSingleLense from "../../../hooks/lense/useGetSingleLense";
import { LenseFormModel, schemaLens } from "../../../validations/schemaLens";
import { getUserCurentBranch } from "../../../utils/authDataConver";

const LenseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { singleLense, singleLenseLoading, refresh } = useGetSingleLense(id);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<Pick<LenseFormModel, "limit" | "qty" | "branch_id">>({
    resolver: zodResolver(
      schemaLens.pick({ limit: true, qty: true, branch_id: true })
    ),
    defaultValues: {
      limit: undefined,
      qty: undefined,
      branch_id: getUserCurentBranch()?.id,
    },
  });
  console.log(errors);

  const submiteData = async (
    data: Pick<LenseFormModel, "limit" | "qty" | "branch_id">
  ) => {
    if (!singleLenseLoading && singleLense) {
      const { qty, limit } = data;
      const postDAta = {
        lens: id,
        initial_count: (singleLense.stock[0]?.qty || 0) + qty,
        qty: (singleLense.stock[0]?.qty || 0) + qty,
        limit: limit,
        branch_id: data.branch_id,
      };

      try {
        await axiosClient.patch(`/lenses/${id}/`, postDAta);
        toast.success("Lense Updated Successfully");
        reset();
        refresh();
        navigate(-1);
      } catch (error) {
        console.log(error);

        if (error instanceof AxiosError) {
          // Safely access error.response.data.message
          toast.error(error.response?.data?.message || "Something went wrong");
        } else {
          // Handle non-Axios errors (e.g., network errors, syntax errors, etc.)
          toast.error("Something went wrong");
        }
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
      <Paper
        component={"form"}
        onSubmit={handleSubmit(submiteData)}
        sx={{ padding: 4, width: 400, textAlign: "Left" }}
        elevation={3}
      >
        <Typography variant="h6" fontWeight="bold" paddingLeft="9px">
          Lense Update
        </Typography>

        <Box sx={{ marginY: 2 }}>
          <Chip
            label={`Factory - ${singleLense?.brand_name}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
          <Chip
            label={`Coating - ${singleLense?.coating_name}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
        </Box>
        <Typography
          marginY={1}
          variant="body1"
          fontWeight="bold"
          paddingLeft="9px"
        >
          Curently Avilable Quantity - {singleLense?.stock[0]?.qty || 0}
        </Typography>
        <TextField
          fullWidth
          label="Quantity"
          variant="outlined"
          inputProps={{ min: 0 }}
          type="number"
          {...register("qty", { valueAsNumber: true })}
          error={!!errors.qty}
          helperText={errors.qty?.message}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Alert Level"
          inputProps={{ min: 0 }}
          variant="outlined"
          {...register("limit", { valueAsNumber: true })}
          error={!!errors.limit}
          helperText={errors.limit?.message}
          sx={{ marginBottom: 2 }}
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
          margin="normal"
          variant="outlined"
          error={!!errors.branch_id}
          helperText={errors.branch_id?.message}
          defaultValue={getUserCurentBranch()?.id}
        />
        <Button type="submit" variant="contained" fullWidth>
          SAVE
        </Button>
      </Paper>
    </Box>
  );
};

export default LenseUpdate;

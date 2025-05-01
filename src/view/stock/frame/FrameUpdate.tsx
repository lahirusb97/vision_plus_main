import { Box, Chip, TextField, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useGetSingleFrame from "../../../hooks/lense/useGetSingleFrame";
import { FrameFormModel, schemaFrame } from "../../../validations/schemaFrame";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";

const FrameUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { singleFrame, singleFrameLoading } = useGetSingleFrame(id);
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<
    Pick<FrameFormModel, "qty" | "initial_count" | "limit" | "branch_id">
  >({
    resolver: zodResolver(
      schemaFrame.pick({
        qty: true,
        initial_count: true,
        limit: true,
        branch_id: true,
      })
    ),
    defaultValues: {
      limit: undefined,
      qty: undefined,
      branch_id: getUserCurentBranch()?.id,
    },
  });

  const submiteData = async (
    data: Pick<FrameFormModel, "qty" | "initial_count" | "limit" | "branch_id">
  ) => {
    if (!singleFrameLoading && singleFrame) {
      const { qty, limit, branch_id } = data;
      const postDAta = {
        // Keep frame data here if needed
        stock: [
          {
            branch_id: branch_id,
            initial_count: (singleFrame.stock[0]?.initial_count || 0) + qty,
            qty: (singleFrame.stock[0]?.qty || 0) + qty,
            limit: limit,
          },
        ],
      };

      try {
        // await axiosClient.put(`/frame-stocks/${id}/`, postDAta);
        const test = await putHandler(`/frames/${id}/`, postDAta);
        console.log(test.data);

        toast.success("Frame Stock Updated successfully");
        reset();
        navigate(-1);
      } catch (error) {
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
          Frames Updates
        </Typography>

        <Box sx={{ marginY: 2 }}>
          <Chip
            label={`Brand - ${singleFrame?.brand_name}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
          <Chip
            label={`Code - ${singleFrame?.code_name}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
          <Chip
            label={`Color - ${singleFrame?.color_name}`}
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
          Curently Avilable Quantity - {singleFrame?.stock[0]?.qty || 0}
        </Typography>
        <TextField
          fullWidth
          label="Quantity"
          variant="outlined"
          type="number"
          {...register("qty", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
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
          {...register("limit", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          error={!!errors.limit}
          helperText={errors.limit?.message}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          sx={{ display: "none" }}
          inputProps={{
            min: 0,
          }}
          {...register("branch_id", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          label="Branch Id"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.branch_id}
          helperText={errors.branch_id?.message}
          defaultValue={getUserCurentBranch()?.id}
        />
        <SubmitCustomBtn
          btnText="Update Frame Quantity"
          loading={putHandlerloading}
          isError={putHandlerError}
        />
      </Paper>
    </Box>
  );
};

export default FrameUpdate;

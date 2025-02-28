import { Box, Button, Chip, TextField, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosClient from "../../../axiosClient";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useGetSingleFrame from "../../../hooks/lense/useGetSingleFrame";
interface Stock {
  alertLevel: number;
  quantity: number;
}
const FrameUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { singleFrame, singleFrameLoading } = useGetSingleFrame(id ?? "");

  const schema = yup.object().shape({
    alertLevel: yup
      .number()
      .positive()
      .min(0.01, "Alert Level must be positive")
      .required("Alert Level is required"),
    quantity: yup
      .number()
      .positive()
      .integer()
      .min(1)
      .required("Quantity is required"),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      alertLevel: undefined,
      quantity: undefined,
    },
  });
  console.log(singleFrame);

  const submiteData = async (data: Stock) => {
    if (
      !singleFrameLoading &&
      singleFrame?.stock.initial_count &&
      singleFrame?.stock.qty
    ) {
      const { quantity, alertLevel } = data;
      const postDAta = {
        frame: id,
        initial_count: singleFrame.stock.initial_count + quantity,
        qty: singleFrame.stock.qty + quantity,
        limit: alertLevel,
      };

      try {
        await axiosClient.put(`/frame-stocks/${id}/`, postDAta);
        toast.success("Frame added successfully");
        reset();
        navigate("/stock/frame_store");
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
            label={`${singleFrame?.brand}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
          <Chip
            label={`${singleFrame?.code}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
          <Chip
            label={`${singleFrame?.color}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
        </Box>

        <TextField
          fullWidth
          label="Quantity"
          variant="outlined"
          inputProps={{ min: 0 }}
          type="number"
          {...register("quantity", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Alert Level"
          inputProps={{ min: 0 }}
          variant="outlined"
          {...register("alertLevel", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          error={!!errors.alertLevel}
          helperText={errors.alertLevel?.message}
          sx={{ marginBottom: 2 }}
        />

        <Button type="submit" variant="contained" fullWidth>
          SAVE
        </Button>
      </Paper>
    </Box>
  );
};

export default FrameUpdate;

import {
  Box,
  Chip,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useParams } from "react-router";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useGetSingleFrame from "../../../hooks/lense/useGetSingleFrame";
import { FrameFormModel, schemaFrame } from "../../../validations/schemaFrame";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import SaveButton from "../../../components/SaveButton";

const FrameEdit = () => {
  const { id } = useParams();

  const { singleFrame, singleFrameLoading, refresh } = useGetSingleFrame(id);
  const { putHandler, putHandlerloading } = useAxiosPut();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<Pick<FrameFormModel, "price">>({
    resolver: zodResolver(schemaFrame.pick({ price: true })),
    defaultValues: {
      price: undefined,
    },
  });
  const submiteData = async (data: Pick<FrameFormModel, "price">) => {
    const { price } = data;
    const postDAta = {
      price: price,
    };

    try {
      await putHandler(`/frames/${id}/`, postDAta);
      toast.success("Frame added successfully");
      reset();
      refresh();
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
      <Paper
        component={"form"}
        onSubmit={handleSubmit(submiteData)}
        sx={{ padding: 4, width: 400, textAlign: "Left" }}
        elevation={3}
      >
        <Typography variant="h6" fontWeight="bold" paddingLeft="9px">
          Frames Price Update
        </Typography>

        {!singleFrameLoading ? (
          <Box sx={{ marginY: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
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
            <Chip
              label={`species - ${singleFrame?.species}`}
              color="primary"
              sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
            />
          </Box>
        ) : (
          <CircularProgress />
        )}
        <Typography
          marginY={1}
          variant="body1"
          fontWeight="bold"
          paddingLeft="9px"
        >
          Curent Price- Rs.{singleFrame?.price}
        </Typography>
        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          inputProps={{ min: 0 }}
          type="number"
          {...register("price", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
          sx={{ marginBottom: 2 }}
        />

        <SaveButton btnText="Save" loading={putHandlerloading} />
      </Paper>
    </Box>
  );
};

export default FrameEdit;

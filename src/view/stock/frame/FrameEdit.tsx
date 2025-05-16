import {
  Box,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Stack,
  Divider,
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
import InfoChip from "../../../components/common/InfoChip";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import BackButton from "../../../components/BackButton";
import { useNavigate } from "react-router";
import DataLoadingError from "../../../components/common/DataLoadingError";

const FrameEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { singleFrame, singleFrameLoading, singleFrameError } =
    useGetSingleFrame(id);
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
      toast.success("Frame Updated successfully");
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
  };

  if (singleFrameLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (singleFrameError) {
    return <DataLoadingError />;
  }
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
        variant="outlined"
      >
        <BackButton />
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Frame Price Update
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {!singleFrameLoading && singleFrame ? (
          <>
            <Box sx={{ my: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: 600, color: "#2E3A59" }}
              >
                Frame Details
              </Typography>

              <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
                {[
                  { label: "Brand", value: singleFrame?.brand_name },
                  { label: "Code", value: singleFrame?.code_name },
                  { label: "Species", value: singleFrame?.species },
                  { label: "Size", value: singleFrame?.size },
                  { label: "Color", value: singleFrame?.color_name },
                  {
                    label: "Brand Type",
                    value: singleFrame?.brand_type_display,
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <InfoChip label={item.label} value={item.value} />
                  </div>
                ))}
              </Stack>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight="500" sx={{ mb: 0.5 }}>
                Current Price
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#1565C0", mb: 1 }}
              >
                Rs. {numberWithCommas(singleFrame?.price)}
              </Typography>
              <TextField
                fullWidth
                label="New Price"
                variant="outlined"
                inputProps={{ min: 0 }}
                type="number"
                {...register("price", {
                  setValueAs: (value) =>
                    value === "" ? undefined : Number(value),
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
                sx={{ marginBottom: 2 }}
              />

              <SaveButton btnText="Save" loading={putHandlerloading} />
            </Box>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary">
              Loading frame data...
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default FrameEdit;

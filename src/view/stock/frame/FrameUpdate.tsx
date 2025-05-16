import {
  Box,
  TextField,
  Typography,
  Paper,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";
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
import BackButton from "../../../components/BackButton";
import InfoChip from "../../../components/common/InfoChip";
import StockCountDisplay from "../../../components/common/StockCountDisplay";
import DataLoadingError from "../../../components/common/DataLoadingError";

const FrameUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { singleFrame, singleFrameLoading, singleFrameError } =
    useGetSingleFrame(id);
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
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
      const { qty, branch_id } = data;
      const postDAta = {
        // Keep frame data here if needed
        stock: [
          {
            branch_id: branch_id,
            initial_count: (singleFrame.stock[0]?.initial_count || 0) + qty,
            qty: (singleFrame.stock[0]?.qty || 0) + qty,
            // limit: limit,
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
          Frames Quantity Updates
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <>
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
                  Current Quantity
                </Typography>
                <StockCountDisplay
                  currentQty={singleFrame?.stock[0]?.qty || 0}
                  changeQty={watch("qty") || 0}
                />
                <TextField
                  fullWidth
                  label="Quantity"
                  variant="outlined"
                  type="number"
                  {...register("qty", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  error={!!errors.qty}
                  helperText={errors.qty?.message}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  sx={{ display: "none" }}
                  inputProps={{
                    min: 0,
                  }}
                  {...register("branch_id", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
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
              </Box>
              <SubmitCustomBtn
                btnText="Update Frame Quantity"
                loading={putHandlerloading}
                isError={putHandlerError}
              />
            </>
          ) : (
            <></>
          )}
        </>
      </Paper>
    </Box>
  );
};

export default FrameUpdate;

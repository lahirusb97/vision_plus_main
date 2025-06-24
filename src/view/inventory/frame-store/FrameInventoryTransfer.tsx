import {
  Box,
  TextField,
  Typography,
  Paper,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useGetSingleFrame from "../../../hooks/lense/useGetSingleFrame";
import { FrameFormModel, schemaFrame } from "../../../validations/schemaFrame";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import BackButton from "../../../components/BackButton";
import InfoChip from "../../../components/common/InfoChip";
import StockCountDisplay from "../../../components/common/StockCountDisplay";
import DataLoadingError from "../../../components/common/DataLoadingError";
import useGetBranches from "../../../hooks/useGetBranches";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import { z } from "zod";

const FrameInventoryTransfer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { singleFrame, singleFrameLoading, singleFrameError } =
    useGetSingleFrame(id);
  const { branches, branchesLoading } = useGetBranches();
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
    watch,
  } = useForm<{
    qty: number;
    to_branch_id: number;
  }>({
    resolver: zodResolver(
      schemaFrame
        .pick({
          qty: true,
        })
        .extend({
          to_branch_id: z.number(),
        })
    ),
    defaultValues: {
      qty: undefined,
      to_branch_id: undefined,
    },
  });
  console.log(errors);
  const submiteData = async (data: { qty: number; to_branch_id: number }) => {
    if (!singleFrameLoading && singleFrame) {
      const { qty, to_branch_id } = data;
      const postDAta = {
        frame_id: id,
        from_branch_id: getUserCurentBranch()?.id,
        to_branch_id: to_branch_id,
        quantity: qty,
      };

      try {
        // await axiosClient.put(`/frame-stocks/${id}/`, postDAta);
        const test = await postHandler(`frames/transfer/`, postDAta);
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
                <Controller
                  name="to_branch_id" // Field name in the form
                  control={control} // Pass the control from useForm
                  render={({ field }) => (
                    <AutocompleteInputField
                      {...field} // Spread the field props (value and onChange)
                      options={
                        branches
                          ?.filter(
                            (branch) => branch.id !== getUserCurentBranch()?.id
                          )
                          .map((branch) => ({
                            id: branch.id,
                            name: branch.branch_name,
                          })) || []
                      } // Pass the options array
                      loading={branchesLoading} // Pass the loading state
                      labelName="Choose a Branch" // Label for the input field
                      defaultId={undefined} // Optionally pass a default selected ID
                      onChange={(newValue) => {
                        field.onChange(newValue); // Pass selected date to react-hook-form
                      }}
                    />
                  )}
                />
              </Box>
              <SubmitCustomBtn
                btnText="Update Frame Quantity"
                loading={postHandlerloading}
                isError={postHandlerError}
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

export default FrameInventoryTransfer;

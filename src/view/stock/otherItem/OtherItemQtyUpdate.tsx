import { Box, Chip, TextField, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import {
  OtherItemFormModel,
  schemaOtherItem,
} from "../../../validations/schemaOtherItem";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetSingleOtherItem from "../../../hooks/useGetSingleOtherItem";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import LoadingAnimation from "../../../components/LoadingAnimation";
import { useAxiosPatch } from "../../../hooks/useAxiosPatch";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";

const OtherItemQtyUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { singleotherItem, singleotherItemLoading } = useGetSingleOtherItem(id);
  const { patchHandler, patchHandlerloading, patchHandlerError } =
    useAxiosPatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<
    Pick<OtherItemFormModel, "qty" | "initial_count" | "branch_id" | "limit">
  >({
    resolver: zodResolver(
      schemaOtherItem.pick({
        qty: true,
        initial_count: true,
        branch_id: true,
        limit: true,
      })
    ),
    defaultValues: {
      qty: undefined,
      initial_count: undefined,
      branch_id: getUserCurentBranch()?.id,
      limit: undefined,
    },
  });

  //TODO alert levels Upgrade
  const submiteData = async (
    data: Pick<
      OtherItemFormModel,
      "qty" | "initial_count" | "branch_id" | "limit"
    >
  ) => {
    if (singleotherItem && !singleotherItemLoading) {
      const postDAta = {
        stock: [
          {
            other_item_id: singleotherItem.item.id,
            qty: (singleotherItem.stock[0]?.qty || 0) + data.qty,
            initial_count: (singleotherItem.stock[0]?.qty || 0) + data.qty,
            branch_id: data.branch_id,
            limit: data.limit,
          },
        ],
      };
      console.log(postDAta);

      try {
        const responce = await patchHandler(`/other-items/${id}/`, postDAta);
        console.log(responce);

        toast.success(
          `${singleotherItem?.item.name} Quantity Updated Successfully`
        );
        reset();
        navigate(-1);
      } catch (error) {
        extractErrorMessage(error);
      }
    }
  };
  if (singleotherItemLoading) {
    return <LoadingAnimation loadingMsg="Loading Other Item" />;
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
        elevation={3}
      >
        <Typography variant="h6" fontWeight="bold" paddingLeft="9px">
          Other Item Quantity Update
        </Typography>

        <Box sx={{ marginY: 2 }}>
          <Chip
            label={`Name - ${singleotherItem?.item.name}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
          <Chip
            label={`Avilabal Quantity - ${singleotherItem?.stock[0]?.qty || 0}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
        </Box>

        <TextField
          fullWidth
          label="Enter Quantity Amount"
          variant="outlined"
          type="number"
          {...register("qty", { valueAsNumber: true, min: 0, required: true })}
          error={!!errors.qty}
          helperText={errors.qty?.message}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Enter Alert  Amount"
          variant="outlined"
          inputProps={{ min: 0 }}
          type="number"
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
            valueAsNumber: true,
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
          btnText="Update Other Item Quantity"
          isError={patchHandlerError}
          loading={patchHandlerloading}
        />
      </Paper>
    </Box>
  );
};

export default OtherItemQtyUpdate;

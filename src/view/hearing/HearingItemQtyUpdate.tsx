import React from "react";
import { Box, Chip, TextField, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetSingleHearingItem from "../../hooks/useGetSingleHearingItem";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import LoadingAnimation from "../../components/LoadingAnimation";
import { useAxiosPatch } from "../../hooks/useAxiosPatch";
import { getUserCurentBranch } from "../../utils/authDataConver";
import SubmitCustomBtn from "../../components/common/SubmiteCustomBtn";
import {
  HearingItemFormModel,
  schemaHearingItem,
} from "../../validations/schemaHearingItem";

const HearingItemQtyUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { singleHearingItem, singleHearingItemLoading } =
    useGetSingleHearingItem(id);
  const { patchHandler, patchHandlerloading, patchHandlerError } =
    useAxiosPatch();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<
    Pick<HearingItemFormModel, "qty" | "initial_count" | "branch_id" | "limit">
  >({
    resolver: zodResolver(
      schemaHearingItem.pick({
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

  const submitData = async (
    data: Pick<
      HearingItemFormModel,
      "qty" | "initial_count" | "branch_id" | "limit"
    >
  ) => {
    if (singleHearingItem && !singleHearingItemLoading) {
      const postData = {
        stock: [
          {
            hearing_item_id: singleHearingItem.item.id,
            qty: (singleHearingItem.stock[0]?.qty || 0) + (data.qty || 0),
            initial_count:
              (singleHearingItem.stock[0]?.qty || 0) + (data.qty || 0),
            branch_id: data.branch_id,
            limit: data.limit,
          },
        ]
      };

      try {
        await patchHandler(`/hearing-items/${id}/`, postData);
        toast.success(
          `${singleHearingItem?.item.name} quantity updated successfully`
        );
        reset();
        navigate(-1);
      } catch (error) {
        extractErrorMessage(error);
      }
    }
  };

  if (singleHearingItemLoading) {
    return <LoadingAnimation loadingMsg="Loading hearing item" />;
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
        onSubmit={handleSubmit(submitData)}
        sx={{ padding: 4, width: 400, textAlign: "Left" }}
        elevation={3}
      >
        <Typography variant="h6" fontWeight="bold" paddingLeft="9px">
          Hearing Item Quantity Update
        </Typography>

        <Box sx={{ marginY: 2 }}>
          <Chip
            label={`Name - ${singleHearingItem?.item.name}`}
            color="primary"
            sx={{ marginX: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
          <Chip
            label={`Available Quantity - ${
              singleHearingItem?.stock[0]?.qty || 0
            }`}
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
          inputProps={{ min: 0 }}
        />
        <TextField
          fullWidth
          label="Enter Alert Amount"
          variant="outlined"
          type="number"
          inputProps={{ min: 0 }}
          {...register("limit", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          error={!!errors.limit}
          helperText={errors.limit?.message}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          sx={{ display: "none" }}
          inputProps={{ min: 0 }}
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
          btnText="Update Hearing Item Quantity"
          isError={patchHandlerError}
          loading={patchHandlerloading}
        />
      </Paper>
    </Box>
  );
};

export default HearingItemQtyUpdate;

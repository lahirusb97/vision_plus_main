import React from "react";
import { Box, Chip, TextField, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import useGetSingleHearingItem from "../../hooks/useGetSingleHearingItem";
import { useAxiosPatch } from "../../hooks/useAxiosPatch";
import {
  HearingItemFormModel,
  schemaHearingItem,
} from "../../validations/schemaHearingItem";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import LoadingAnimation from "../../components/LoadingAnimation";
import BackButton from "../../components/BackButton";
import SaveButton from "../../components/SaveButton";
import DataLoadingError from "../../components/common/DataLoadingError";
import { numberWithCommas } from "../../utils/numberWithCommas";

const HearingItemEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // API CALL HOOKS
  const {
    singleHearingItem,
    singleHearingItemLoading,
    singleHearingItemError,
  } = useGetSingleHearingItem(id);
  const { patchHandler, patchHandlerloading } = useAxiosPatch();
  // API CALL HOOKS

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<Pick<HearingItemFormModel, "price">>({
    resolver: zodResolver(schemaHearingItem.pick({ price: true })),
    defaultValues: {
      price: undefined,
    },
  });

  const submitData = async (data: Pick<HearingItemFormModel, "price">) => {
    if (singleHearingItem) {
      const postData = {
        price: data.price,
      };
      try {
        await patchHandler(`/hearing-items/${id}/`, postData);
        toast.success(
          `${singleHearingItem?.item.name} price updated successfully`
        );
        reset();
        navigate(-1);
      } catch (error) {
        extractErrorMessage(error);
      }
    }
  };

  if (singleHearingItemLoading) {
    return <LoadingAnimation loadingMsg="Loading hearing item details..." />;
  }
  if (singleHearingItemError) {
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
        onSubmit={handleSubmit(submitData)}
        sx={{ padding: 4, width: 400, textAlign: "Left" }}
        elevation={3}
      >
        <BackButton />

        <Typography variant="h6" fontWeight="bold" paddingLeft="9px">
          Hearing Item Price Update
        </Typography>
        <Box sx={{ marginY: 2 }}>
          <Chip
            label={`Name - ${singleHearingItem?.item.name}`}
            color="primary"
            sx={{ margin: 0.5, backgroundColor: "#237ADE", color: "white" }}
          />
          <Chip
            label={`Price - Rs.${numberWithCommas(
              singleHearingItem?.item.price
            )}`}
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
          label="Price"
          variant="outlined"
          inputProps={{ min: 0, step: "0.01" }}
          type="number"
          {...register("price", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
          sx={{ marginBottom: 2 }}
        />

        <SaveButton loading={patchHandlerloading} btnText="Update Price" />
      </Paper>
    </Box>
  );
};

export default HearingItemEdit;

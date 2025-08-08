import React, { useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
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

const HearingItemFullEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // API CALL HOOKS
  const {
    singleHearingItem,
    singleHearingItemLoading,
    singleHearingItemError,
    singleHearingItemDataRefresh,
  } = useGetSingleHearingItem(id);
  const { patchHandler, patchHandlerloading } = useAxiosPatch();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
  } = useForm<HearingItemFormModel>({
    resolver: zodResolver(schemaHearingItem),
    defaultValues: {
      name: "",
      price: 0,
      warranty: "",
      code: "",
      qty: 0,
      limit: 0,
      branch_id: 1, // Default branch ID, will be overridden
    },
  });

  // Set form values when data is loaded
  useEffect(() => {
    if (singleHearingItem) {
      setValue("name", singleHearingItem.item.name);
      setValue("price", parseInt(singleHearingItem.item.price));
      setValue("warranty", singleHearingItem.item.warranty);
      setValue("code", singleHearingItem.item.code || "");
      setValue("qty", singleHearingItem.stock[0]?.qty || 0);
      setValue("limit", singleHearingItem.stock[0]?.limit || 0);
      setValue("branch_id", singleHearingItem.stock[0]?.branch_id);
    }
  }, [singleHearingItem]);

  const submitData = async (data: HearingItemFormModel) => {
    if (!singleHearingItem) return;

    try {
      // Prepare the update payload
      const updateData = {
        item: {
          name: data.name,
          price: Number(data.price),
          warranty: data.warranty,
          code: data.code || null,
        },
        stock: [
          {
            qty: Number(data.qty),
            limit: Number(data.limit),
            branch_id: data.branch_id,
            initial_count: Number(data.qty), // Using qty as initial_count for updates
          },
        ],
      };

      await patchHandler(`/hearing-items/${id}/`, updateData);
      toast.success(`${singleHearingItem.item.name} updated successfully`);
      singleHearingItemDataRefresh(); // Refresh the data
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  if (singleHearingItemLoading) {
    return <LoadingAnimation loadingMsg="Loading hearing item details..." />;
  }

  if (singleHearingItemError || !singleHearingItem) {
    return <DataLoadingError />;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
      <Paper
        component="form"
        onSubmit={handleSubmit(submitData)}
        sx={{ p: 3 }}
        elevation={3}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold">
            Edit Hearing Item
          </Typography>
          <BackButton />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Code"
              variant="outlined"
              {...register("code")}
              error={!!errors.code}
              helperText={errors.code?.message}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Warranty"
              variant="outlined"
              {...register("warranty")}
              error={!!errors.warranty}
              helperText={errors.warranty?.message}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Price (LKR)"
              type="number"
              variant="outlined"
              inputProps={{ min: 0, step: "0.01" }}
              {...register("price", {
                valueAsNumber: true,
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Quantity"
              type="number"
              variant="outlined"
              inputProps={{ min: 0 }}
              {...register("qty", {
                valueAsNumber: true,
              })}
              error={!!errors.qty}
              helperText={errors.qty?.message}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Stock Limit"
              type="number"
              variant="outlined"
              inputProps={{ min: 0 }}
              {...register("limit", {
                valueAsNumber: true,
              })}
              error={!!errors.limit}
              helperText={errors.limit?.message}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <SaveButton loading={patchHandlerloading} btnText="Update Item" />
        </Box>
      </Paper>
    </Box>
  );
};

export default HearingItemFullEdit;

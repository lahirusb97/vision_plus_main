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
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

import useGetSingleLense from "../../../hooks/lense/useGetSingleLense";
import { LenseFormModel, schemaLens } from "../../../validations/schemaLens";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

import { useAxiosPatch } from "../../../hooks/useAxiosPatch";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import BackButton from "../../../components/BackButton";
import InfoChip from "../../../components/common/InfoChip";
import StockCountDisplay from "../../../components/common/StockCountDisplay";
import returnPlusSymbol from "../../../utils/returnPlusSymbol";
import LoadingAnimation from "../../../components/LoadingAnimation";
import DataLoadingError from "../../../components/common/DataLoadingError";

const LenseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { singleLense, singleLenseLoading, refresh } = useGetSingleLense(id);
  const { patchHandler, patchHandlerloading, patchHandlerError } =
    useAxiosPatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<Pick<LenseFormModel, "limit" | "qty" | "branch_id">>({
    resolver: zodResolver(
      schemaLens.pick({ limit: true, qty: true, branch_id: true })
    ),
    defaultValues: {
      // limit: undefined,
      qty: undefined,
      branch_id: getUserCurentBranch()?.id,
    },
  });

  const submiteData = async (
    data: Pick<LenseFormModel, "limit" | "qty" | "branch_id">
  ) => {
    if (!singleLenseLoading && singleLense) {
      const { qty } = data;
      const postDAta = {
        lens: {
          brand: singleLense.brand,
        },
        stock: [
          {
            lens: id,
            initial_count: (singleLense.stock[0]?.qty || 0) + qty,
            qty: (singleLense.stock[0]?.qty || 0) + qty,
            // limit: limit,
            branch_id: data.branch_id,
          },
        ],
      };

      try {
        await patchHandler(`/lenses/${id}/`, postDAta);
        toast.success("Lense Updated Successfully");
        refresh();
        navigate(-1);
      } catch (error) {
        extractErrorMessage(error);
      }
    }
  };

  if (singleLenseLoading) {
    return <LoadingAnimation loadingMsg="Loading Lense Details" />;
  }
  if (!singleLenseLoading && !singleLense) {
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
        <Typography variant="h6" fontWeight="bold" paddingLeft="9px">
          Lense Quantity Update
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {!singleLenseLoading && singleLense ? (
          <>
            <Box sx={{ my: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: 600, color: "#2E3A59" }}
              >
                Lens Details
              </Typography>
              <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
                {[
                  { label: "Factory", value: singleLense?.brand_name },
                  { label: "Lens Type", value: singleLense?.type_name },
                  { label: "Coating", value: singleLense?.coating_name },
                ].map((item) => (
                  <div key={item.label}>
                    <InfoChip label={item.label} value={item.value} />
                  </div>
                ))}
              </Stack>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ my: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: 600, color: "#2E3A59" }}
              >
                Power Details
              </Typography>
              <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
                {singleLense?.powers.map((item) => (
                  <div key={item.power_name}>
                    <InfoChip
                      label={item.power_name}
                      value={`${returnPlusSymbol(item.value)}${parseFloat(
                        item.value
                      ).toFixed(2)}`}
                    />
                  </div>
                ))}
              </Stack>
            </Box>
          </>
        ) : (
          <CircularProgress />
        )}

        <Typography variant="body2" fontWeight="500" sx={{ mb: 0.5 }}>
          Current Quantity
        </Typography>
        {!singleLenseLoading && singleLense ? (
          <StockCountDisplay
            currentQty={singleLense?.stock[0]?.qty || 0}
            changeQty={watch("qty") || 0}
          />
        ) : (
          <CircularProgress />
        )}
        <TextField
          fullWidth
          label="Quantity"
          variant="outlined"
          type="number"
          {...register("qty", { valueAsNumber: true })}
          error={!!errors.qty}
          helperText={errors.qty?.message}
          sx={{ marginBottom: 2 }}
        />
        {/* <TextField
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
        /> */}
        <TextField
          sx={{ display: "none" }}
          inputProps={{
            min: 0,
          }}
          {...register("branch_id", { valueAsNumber: true })}
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
          btnText="Update Lense Quantity"
          isError={patchHandlerError}
          loading={patchHandlerloading}
        />
      </Paper>
    </Box>
  );
};

export default LenseUpdate;

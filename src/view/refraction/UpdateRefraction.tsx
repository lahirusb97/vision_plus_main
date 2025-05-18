import { Paper, TextField, Box, Typography } from "@mui/material";

import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate, useParams } from "react-router";
import {
  RefractionNumberFormModel,
  schemaRefractionNumber,
} from "../../validations/schemaRefractionNumber";
import { useAxiosPut } from "../../hooks/useAxiosPut";
import useGetSingleRefractionNumber from "../../hooks/useGetSingleRefractionNumber";
import LoadingAnimation from "../../components/LoadingAnimation";
import { useEffect } from "react";
import { getUserCurentBranch } from "../../utils/authDataConver";
import SubmitCustomBtn from "../../components/common/SubmiteCustomBtn";
import DataLoadingError from "../../components/common/DataLoadingError";
export default function UpdateRefraction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    singlerefractionNumber,
    singlerefractionNumberLoading,
    singleRefractionNumberError,
  } = useGetSingleRefractionNumber(id);
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RefractionNumberFormModel>({
    resolver: zodResolver(schemaRefractionNumber),
    defaultValues: {
      customer_full_name: "",
      customer_mobile: "",
      nic: "",
      branch_id: getUserCurentBranch()?.id,
    },
  });

  useEffect(() => {
    if (singlerefractionNumber) {
      reset({
        customer_full_name: singlerefractionNumber.customer_full_name || "",
        customer_mobile: singlerefractionNumber.customer_mobile || "",
        nic: singlerefractionNumber.nic || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singlerefractionNumber]); // Run when data changes

  const shandleSubmit = async (data: RefractionNumberFormModel) => {
    try {
      await putHandler(`refractions/${id}/update/`, data);
      reset({
        customer_full_name: "",
        customer_mobile: "",
        nic: "",
        branch_id: getUserCurentBranch()?.id,
      });
      toast.success("Refraction updated successfully");
      navigate(-1);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  if (singlerefractionNumberLoading) {
    return (
      <LoadingAnimation loadingMsg="Refraction Number Details Loading..." />
    );
  }
  if (singleRefractionNumberError) {
    return <DataLoadingError />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom align="center">
          Update Coustomer Details
        </Typography>
        <form onSubmit={handleSubmit(shandleSubmit)}>
          <TextField
            {...register("customer_full_name")}
            fullWidth
            label="Customer Name"
            variant="outlined"
            margin="normal"
            required
            error={!!errors.customer_full_name}
            helperText={errors.customer_full_name?.message}
            InputLabelProps={{
              shrink: Boolean(watch("customer_full_name")),
            }}
          />
          <TextField
            {...register("nic")}
            fullWidth
            label="NIC"
            variant="outlined"
            margin="normal"
            error={!!errors.nic}
            helperText={errors.nic?.message}
            InputLabelProps={{
              shrink: Boolean(watch("nic")),
            }}
          />
          <TextField
            {...register("customer_mobile")}
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            type="tel"
            inputProps={{
              pattern: "[0-9]{10}",
              title: "Please enter a valid 10-digit phone number",
            }}
            error={!!errors.customer_mobile}
            helperText={errors.customer_mobile?.message}
            InputLabelProps={{
              shrink: Boolean(watch("customer_mobile")),
            }}
          />
          <TextField
            sx={{ display: "none" }}
            inputProps={{
              min: 0,
            }}
            {...register("branch_id", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
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
            btnText="Update Customer Details"
            loading={putHandlerloading}
            isError={putHandlerError}
          />
        </form>
      </Paper>
    </Box>
  );
}

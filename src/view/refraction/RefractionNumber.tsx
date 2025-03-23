import { Paper, TextField, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import {
  RefractionNumberFormModel,
  schemaRefractionNumber,
} from "../../validations/schemaRefractionNumber";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  clearValidationData,
  openValidationDialog,
} from "../../features/validationDialogSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import VarificationBtn from "../../components/VarificationBtn";
import { useAxiosApiSend } from "../../hooks/useAxiosApiSend";
import { useValidationState } from "../../hooks/validations/useValidationState";
import VarificationDialog from "../../components/VarificationDialog";

export default function RefractionNumber() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //API CALLS
  const { postHandler, postHandlerloading } = useAxiosPost();
  const { apiSendHandler, apiSendHandlerloading } = useAxiosApiSend();
  const { setValidationState, resetValidation, validationState } =
    useValidationState();
  //API CALLS

  const Validationconfirmed = useSelector(
    (state: RootState) => state.validation_dialog.Validationconfirmed
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RefractionNumberFormModel>({
    resolver: zodResolver(schemaRefractionNumber),
  });

  const sendRefractionData = async (data) => {
    try {
      const responseData = await apiSendHandler(
        "post",
        "refractions/create/",
        data
      );
      const params = new URLSearchParams({
        customer_full_name: responseData.data.customer_full_name,
        nic: responseData.data.nic,
        customer_mobile: responseData.data.customer_mobile,
        refraction_number: responseData.data.refraction_number,
      });
      reset();
      toast.success("Refraction created successfully");
      dispatch(clearValidationData()); //!! Important
      navigate(`success?${params.toString()}`);
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  const shandleSubmit = async (data: RefractionNumberFormModel) => {
    setValidationState({
      openValidationDialog: true,
      validationType: "admin",
      apiCallFunction: () => sendRefractionData(data),
    });
  };

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
          maxWidth: 500,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom align="center">
          Customer Details
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
          />
          <TextField
            {...register(
              "nic"
            )} /* chalani- textfiled added and connected to use form hook*/
            fullWidth
            label="NIC"
            variant="outlined"
            margin="normal"
            error={!!errors.nic}
            helperText={errors.nic?.message}
          />
          <TextField
            {...register("customer_mobile")}
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            required
            type="number"
            error={!!errors.customer_mobile}
            helperText={errors.customer_mobile?.message}
          />
          {/* <TextField
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
                  /> */}
          <VarificationBtn
            btnText={`Generate New Refraction Number`}
            loading={apiSendHandlerloading}
            isVerified={Validationconfirmed}
          />
        </form>
        <VarificationDialog
          validationState={validationState}
          resetValidation={resetValidation}
        />
      </Paper>
    </Box>
  );
}

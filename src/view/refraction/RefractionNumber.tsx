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
import SaveButton from "../../components/SaveButton";
import { useDispatch, useSelector } from "react-redux";
import {
  clearValidationData,
  openValidationDialog,
} from "../../features/validationDialogSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { RootState } from "../../store/store";
export default function RefractionNumber() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //API CALLS
  const { postHandler, postHandlerloading } = useAxiosPost();
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
  const shandleSubmit = async (data: RefractionNumberFormModel) => {
    if (Validationconfirmed) {
      try {
        const responseData = await postHandler("/refractions/create/", data);
        const params = new URLSearchParams({
          customer_full_name: responseData.data.data.customer_full_name,
          nic: responseData.data.data.nic,
          customer_mobile: responseData.data.data.customer_mobile,
          refraction_number: responseData.data.data.refraction_number,
        });
        reset();
        toast.success("Refraction created successfully");
        dispatch(clearValidationData());
        navigate(`success?${params.toString()}`);
      } catch (error) {
        extractErrorMessage(error);
      }
    } else {
      dispatch(
        openValidationDialog({
          validationType: "admin",
        })
      );
    }
  };
  useEffect(() => {
    return () => {
      dispatch(clearValidationData()); // Reset Redux state when component unmounts
    };
  }, [dispatch]);
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
          <SaveButton
            btnText="Genarate New Refraction Number"
            loading={postHandlerloading}
          />
        </form>
      </Paper>
    </Box>
  );
}

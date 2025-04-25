import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getUserCurentBranch } from "../../../utils/authDataConver";
import {
  BankAccountForm,
  schemaBankAccount,
} from "../../../validations/schemaBankAccount";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useNavigate, useParams } from "react-router";
import axiosClient from "../../../axiosClient";
import { useAxiosPatch } from "../../../hooks/useAxiosPatch";
import SaveButton from "../../../components/SaveButton";
import toast from "react-hot-toast";
import BackButton from "../../../components/BackButton";

export default function BankAccountUpdate() {
  const { account_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { patchHandler, patchHandlerloading } = useAxiosPatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BankAccountForm>({
    resolver: zodResolver(schemaBankAccount),
    defaultValues: {
      account_number: "",
      bank_name: "",
      branch: getUserCurentBranch()?.id,
    },
  });

  // Simulated fetch (replace with real API call)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fake API call delay
        const response = await axiosClient.get(`bank_accounts/${account_id}/`);
        const data = response.data;
        reset({
          account_number: data.account_number,
          bank_name: data.bank_name,
          branch: data.branch,
        });
      } catch (error) {
        extractErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account_id]);

  const onSubmit = async (data: BankAccountForm) => {
    try {
      await patchHandler(`bank_accounts/${account_id}/`, data);
      reset();
      toast.success("Bank Account Created Successfully");
      navigate(-1);
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", p: 4, mt: 6 }}>
      <BackButton />
      <Typography variant="h6" gutterBottom>
        Update Bank Account Details
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}
      >
        <TextField
          label="Account Number"
          {...register("account_number")}
          error={!!errors.account_number}
          helperText={errors.account_number?.message}
          fullWidth
          InputLabelProps={{
            shrink: Boolean(watch("account_number")),
          }}
        />

        <TextField
          label="Bank Name"
          {...register("bank_name")}
          error={!!errors.bank_name}
          helperText={errors.bank_name?.message}
          fullWidth
          InputLabelProps={{
            shrink: Boolean(watch("bank_name")),
          }}
        />

        <TextField
          sx={{ display: "none" }}
          inputProps={{
            min: 0,
          }}
          {...register("branch", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          label="Branch Id"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.branch}
          helperText={errors.branch?.message}
          defaultValue={getUserCurentBranch()?.id}
        />
        <SaveButton btnText="Update Account" loading={patchHandlerloading} />
      </Box>
    </Paper>
  );
}

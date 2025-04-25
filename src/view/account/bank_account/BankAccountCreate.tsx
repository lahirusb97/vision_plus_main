import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Box, Typography, Paper } from "@mui/material";
import {
  BankAccountForm,
  schemaBankAccount,
} from "../../../validations/schemaBankAccount";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import SaveButton from "../../../components/SaveButton";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import toast from "react-hot-toast";

export default function BankAccountCreate() {
  const { postHandler, postHandlerloading } = useAxiosPost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BankAccountForm>({
    resolver: zodResolver(schemaBankAccount),
    defaultValues: {
      account_number: "",
      bank_name: "",
      branch: getUserCurentBranch()?.id,
    },
  });

  const onSubmit = async (data: BankAccountForm) => {
    try {
      await postHandler("bank_accounts/", data);
      reset();
      toast.success("Bank Account Created Successfully");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", p: 4, mt: 6 }}>
      <Typography variant="h6" gutterBottom>
        Create Bank Account
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}
      >
        <TextField
          label="Bank Name"
          {...register("bank_name")}
          error={!!errors.bank_name}
          helperText={errors.bank_name?.message}
          fullWidth
        />
        <TextField
          label="Account Number"
          {...register("account_number")}
          error={!!errors.account_number}
          helperText={errors.account_number?.message}
          fullWidth
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

        <SaveButton
          btnText="Create New Bank Account"
          loading={postHandlerloading}
        />
      </Box>
    </Paper>
  );
}

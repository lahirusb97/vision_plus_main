// pages/AddBankDeposite.tsx
import {
  Box,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SaveButton from "../../../components/SaveButton";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import {
  BankDepositForm,
  schemaBankDeposite,
} from "../../../validations/schemaBankDeposite";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import BankAutocomplete from "../../../components/inputui/BankAutocomplete";
import { useGetBankAccounts } from "../../../hooks/useGetBankAccounts";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import useGetSafeBalance from "../../../hooks/useGetSafeBalance";

export default function BankDepositCreate() {
  const { postHandler, postHandlerloading } = useAxiosPost();
  const { safeTotalBalance, safeTotalBalanceLoading } = useGetSafeBalance();
  const { bankAccountsList, bankAccountsListLoading } = useGetBankAccounts();
  const { register, handleSubmit, reset, control } = useForm<BankDepositForm>({
    resolver: zodResolver(schemaBankDeposite),
    defaultValues: {
      branch: getUserCurentBranch()?.id ?? 1,
      bank_account: 1,
      amount: undefined,
      date: new Date().toISOString().split("T")[0],
      note: "",
    },
  });

  const onSubmit = async (data: BankDepositForm) => {
    if (data.amount > safeTotalBalance) {
      toast.error("Safe locker Des not have enough money");
    } else {
      try {
        await postHandler("bank-deposits/", { ...data });
        toast.success("Bank Deposit saved Successfully");
        reset();
      } catch (error) {
        extractErrorMessage(error);
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ minWidth: 500, mx: "auto", p: 4, mt: 6 }}>
      <Typography variant="h6" gutterBottom>
        Add Bank Deposit
      </Typography>
      {safeTotalBalanceLoading ? (
        <CircularProgress />
      ) : (
        <Typography sx={{ mb: 2, fontWeight: "bold" }} variant="body1">
          Avilable Safe Locker About : {safeTotalBalance}
        </Typography>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Controller
          name="bank_account"
          control={control}
          render={({ field }) => (
            <BankAutocomplete
              options={bankAccountsList}
              onChange={field.onChange}
              labelName="Select Bank Account"
              loading={bankAccountsListLoading}
              defaultId={field.value}
            />
          )}
        />
        <TextField
          label="Amount"
          type="number"
          {...register("amount", { valueAsNumber: true })}
          InputLabelProps={{ shrink: true }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Date"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => {
                  field.onChange(date?.format("YYYY-MM-DD")); // formatted for API
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          label="Note"
          {...register("note")}
          InputLabelProps={{ shrink: true }}
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
          defaultValue={getUserCurentBranch()?.id}
        />
        <SaveButton loading={postHandlerloading} btnText="Save Deposit" />
      </Box>
    </Paper>
  );
}

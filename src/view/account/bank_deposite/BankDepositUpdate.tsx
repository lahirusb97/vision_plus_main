import {
  Box,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import {
  BankDepositForm,
  schemaBankDeposite,
} from "../../../validations/schemaBankDeposite";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import BankAutocomplete from "../../../components/inputui/BankAutocomplete";
import { useGetBankAccounts } from "../../../hooks/useGetBankAccounts";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import DataLoadingError from "../../../components/common/DataLoadingError";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";

export default function BankDepositUpdate() {
  const { bank_deposite_id } = useParams();
  const navigate = useNavigate();
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const { bankAccountsList, bankAccountsListLoading } = useGetBankAccounts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { register, handleSubmit, control, setValue } =
    useForm<BankDepositForm>({
      resolver: zodResolver(schemaBankDeposite),
      defaultValues: {
        branch: getUserCurentBranch()?.id ?? 1,
        bank_account: 1,
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        note: "",
      },
    });

  useEffect(() => {
    const fetchDepositDetails = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axiosClient.get(
          `bank-deposits/${bank_deposite_id}/`
        );
        const deposit = response.data;

        setValue("bank_account", deposit.bank_account);
        setValue("amount", deposit.amount);
        setValue("date", deposit.date);
        setValue("note", deposit.note);
        setValue("branch", deposit.branch);
        setError(false);
      } catch (error) {
        extractErrorMessage(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (bank_deposite_id) {
      fetchDepositDetails();
    }
  }, [bank_deposite_id]);

  const onSubmit = async (data: BankDepositForm) => {
    try {
      await putHandler(`bank-deposits/${bank_deposite_id}/`, { ...data });
      toast.success("Bank Deposit updated Successfully");
      navigate("/account/bank_deposite");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <DataLoadingError />;
  }

  return (
    <Paper elevation={3} sx={{ minWidth: 500, mx: "auto", p: 4, mt: 6 }}>
      <Typography variant="h6" gutterBottom>
        Update Bank Deposit
      </Typography>

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
                  field.onChange(date?.format("YYYY-MM-DD"));
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
          multiline
          rows={3}
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

        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <SubmitCustomBtn
            isError={putHandlerError}
            loading={putHandlerloading}
            btnText="Update Deposit"
          />
        </Box>
      </Box>
    </Paper>
  );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaAddToSafe,
  AddToSafeFormModel,
} from "../../../validations/schemaAddToSafe";

import { getUserCurentBranch } from "../../../utils/authDataConver";
import {
  TextField,
  Paper,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import TitleText from "../../../components/TitleText";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import useGetFinanceSummary from "../../../hooks/useGetFinanceSummary";
import DataLoadingError from "../../../components/common/DataLoadingError";
import useGetSafeBalance from "../../../hooks/useGetSafeBalance";
import { numberWithCommas } from "../../../utils/numberWithCommas";

export default function SafeIndex() {
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const { financeSummary, financeSummaryLoading, financeSummaryError } =
    useGetFinanceSummary();
  const { safeTotalBalance } = useGetSafeBalance();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddToSafeFormModel>({
    resolver: zodResolver(schemaAddToSafe),
    defaultValues: {
      branch: getUserCurentBranch()?.id,
      transaction_type: "income",
      amount: undefined,
      reason: "",
      reference_id: "",
    },
  });

  const onSubmit = async (data: AddToSafeFormModel) => {
    if (financeSummary) {
      const totalDepositableCash =
        financeSummary.today_balance + financeSummary.before_balance;

      if (data.amount > totalDepositableCash) {
        toast.error("You Can't Transfer More Than " + totalDepositableCash);
      } else {
        const postData = {
          branch: getUserCurentBranch()?.id,
          transaction_type: "income",
          amount: data.amount,
          reason: data.reason,
          reference_id: data.reference_id,
        };
        try {
          await postHandler("safe/transactions/", postData);
          toast.success("Money Transfered To Safe Locker Successfully");
          reset();
        } catch (error) {
          extractErrorMessage(error);
        }
      }
    }
  };

  return (
    <Paper elevation={1}>
      {financeSummary && (
        <Box sx={{ width: 300, p: "1rem" }}>
          <TitleText title="Avilable Cash" />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Before Balance </Typography>
            <Typography variant="body1">
              {numberWithCommas(financeSummary.before_balance)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Today Balance </Typography>
            <Typography variant="body1">
              {numberWithCommas(financeSummary?.today_balance)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" fontWeight={"bold"}>
              Total Depositable Amount
            </Typography>

            <Typography variant="body1" fontWeight={"bold"}>
              {numberWithCommas(
                financeSummary?.today_balance + financeSummary?.before_balance
              )}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" fontWeight={"bold"}>
              Safe Locker Total Balance
            </Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {numberWithCommas(safeTotalBalance)}
            </Typography>
          </Box>
        </Box>
      )}

      <form
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          minWidth: "400px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TitleText title="Tranfer Money To Safe Locker" />
        <TextField
          label="Amount"
          fullWidth
          size="small"
          type="number"
          {...register("amount", { valueAsNumber: true })}
          error={!!errors.amount}
          helperText={errors.amount?.message}
        />

        <TextField
          label="Description"
          fullWidth
          size="small"
          multiline
          rows={2}
          {...register("reason")}
          error={!!errors.reason}
          helperText={errors.reason?.message}
        />
        <TextField
          label="Reference ID"
          fullWidth
          size="small"
          multiline
          rows={1}
          {...register("reference_id")}
          error={!!errors.reference_id}
          helperText={errors.reference_id?.message}
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
          variant="outlined"
          error={!!errors.branch}
          helperText={errors.branch?.message}
          defaultValue={getUserCurentBranch()?.id}
        />
        <SubmitCustomBtn
          btnText="Add To Safe"
          loading={postHandlerloading}
          isError={postHandlerError}
        />
      </form>
    </Paper>
  );
}

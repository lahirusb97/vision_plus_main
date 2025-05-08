import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaAddToSafe,
  AddToSafeFormModel,
} from "../../../validations/schemaAddToSafe";

import { getUserCurentBranch } from "../../../utils/authDataConver";
import { TextField, Paper } from "@mui/material";
import TitleText from "../../../components/TitleText";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import toast from "react-hot-toast";

export default function SafeIndex() {
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddToSafeFormModel>({
    resolver: zodResolver(schemaAddToSafe),
    defaultValues: {
      branch: getUserCurentBranch()?.id,
      transaction_type: "deposit",
      amount: undefined,
      reason: "",
      reference_id: "",
    },
  });

  const onSubmit = async (data: AddToSafeFormModel) => {
    try {
      await postHandler("safe/transactions/", data);
      toast.success("Money Transfered To Safe Locker Successfully");
      reset();
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  return (
    <Paper elevation={1}>
      <form
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          minWidth: "300px",
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

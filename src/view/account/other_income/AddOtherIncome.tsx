import React from "react";
import { useGetOtherIncomes } from "../../../hooks/useGetOtherIncomes";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddOtherIncomeModel,
  schemaAddOtherIncome,
} from "../../../validations/schemaAddOtherIncome";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import { Paper, TextField } from "@mui/material";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import TitleText from "../../../components/TitleText";
import toast from "react-hot-toast";
export default function AddOtherIncome() {
  const { otherIncomeList, otherIncomeListLoading } = useGetOtherIncomes();
  const { postHandler, postHandlerError, postHandlerloading } = useAxiosPost();
  const {
    control,
    handleSubmit,
    formState: { errors },

    register,
    reset,
  } = useForm<AddOtherIncomeModel>({
    resolver: zodResolver(schemaAddOtherIncome),
    defaultValues: {
      branch: getUserCurentBranch()?.id,
      category: undefined,
      amount: "",
      note: "",
    },
  });
  const onSubmit = async (data: AddOtherIncomeModel) => {
    console.log(data);
    try {
      await postHandler(`other-incomes/`, data);

      reset({
        branch: getUserCurentBranch()?.id,
        category: undefined,
        amount: undefined,
        note: undefined,
      });
      toast.success("Saved");
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  return (
    <div>
      <TitleText title="Place New Other Income" />
      <Paper
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          width: "500px",
          gap: 2,
        }}
      >
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <AutocompleteInputField
              options={otherIncomeList}
              onChange={field.onChange}
              labelName="Other Income Category"
              loading={otherIncomeListLoading}
              defaultId={field.value}
            />
          )}
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
        <TextField
          size="small"
          label="amount"
          type="number"
          inputProps={{ min: 0 }}
          fullWidth
          {...register("amount", { valueAsNumber: true })}
          error={!!errors.amount}
          helperText={errors.amount?.message}
        />
        <TextField
          size="small"
          label="note"
          type="text"
          fullWidth
          {...register("note")}
          error={!!errors.note}
          helperText={errors.note?.message}
        />
        <SubmitCustomBtn
          btnText="Add Other Income"
          loading={otherIncomeListLoading}
          isError={postHandlerError}
        />
      </Paper>
    </div>
  );
}

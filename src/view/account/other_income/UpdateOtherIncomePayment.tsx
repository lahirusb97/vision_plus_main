import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import { Paper, TextField } from "@mui/material";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import TitleText from "../../../components/TitleText";
import { useGetOtherIncomes } from "../../../hooks/useGetOtherIncomes";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import {
  AddOtherIncomeModel,
  schemaAddOtherIncome,
} from "../../../validations/schemaAddOtherIncome";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import toast from "react-hot-toast";
import axios from "axios";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

export default function UpdateOtherIncomePayment() {
  const { id } = useParams(); // assumes route is /other-incomes/:id/edit
  const { otherIncomeList, otherIncomeListLoading } = useGetOtherIncomes();
  const { postHandlerError, postHandlerloading } = useAxiosPost();

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
      amount: undefined,
      note: "",
    },
  });

  // Fetch existing data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/other-incomes/${id}/`);
        const data = res.data;
        reset({
          branch: data.branch,
          category: data.category,
          amount: data.amount,
          note: data.note || "",
        });
      } catch (error) {
        extractErrorMessage(error);
      }
    }
    if (id) fetchData();
  }, [id]);

  // Update handler
  const onSubmit = async (data: AddOtherIncomeModel) => {
    try {
      await axios.put(`/other-incomes/${id}/`, data);
      toast.success("Updated successfully");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <div>
      <TitleText title="Update Other Income" />
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
          inputProps={{ min: 0 }}
          {...register("branch")}
          label="Branch Id"
          type="number"
          fullWidth
          variant="outlined"
          error={!!errors.branch}
          helperText={errors.branch?.message}
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
          btnText="Update Other Income"
          loading={postHandlerloading}
          isError={postHandlerError}
        />
      </Paper>
    </div>
  );
}

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { Paper, TextField } from "@mui/material";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import TitleText from "../../../components/TitleText";
import { useGetOtherIncomes } from "../../../hooks/useGetOtherIncomes";
import {
  AddOtherIncomeModel,
  schemaAddOtherIncome,
} from "../../../validations/schemaAddOtherIncome";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import axiosClient from "../../../axiosClient";
import { useAxiosPut } from "../../../hooks/useAxiosPut";

export default function UpdateOtherIncomePayment() {
  const navigate = useNavigate();
  const { other_income_id } = useParams(); // assumes route is /other-incomes/:id/edit
  const { otherIncomeList, otherIncomeListLoading } = useGetOtherIncomes();
  const { putHandler, putHandlerError, putHandlerloading } = useAxiosPut();
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
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
        const res = await axiosClient.get(`other-incomes/${other_income_id}/`);
        reset({
          branch: res.data.branch,
          category: res.data.category,
          amount: res.data.amount,
          note: res.data.note || "",
        });
      } catch (error) {
        extractErrorMessage(error);
      }
    }
    if (other_income_id) {
      fetchData();
    }
  }, [other_income_id]);

  // Update handler
  const onSubmit = async (data: AddOtherIncomeModel) => {
    try {
      await putHandler(`/other-incomes/${other_income_id}/`, data);
      toast.success("Updated successfully");
      reset();
      navigate(-1);
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <div>
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
        <TitleText title="Update Other Income" />

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
          InputLabelProps={{
            shrink: Boolean(watch("amount")),
          }}
        />
        <TextField
          size="small"
          label="note"
          type="text"
          fullWidth
          {...register("note")}
          error={!!errors.note}
          helperText={errors.note?.message}
          InputLabelProps={{
            shrink: Boolean(watch("note")),
          }}
        />
        <SubmitCustomBtn
          btnText="Update Other Income"
          loading={putHandlerloading}
          isError={putHandlerError}
        />
      </Paper>
    </div>
  );
}

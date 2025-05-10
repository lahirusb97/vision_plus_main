import React from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Typography, TextField, Grid, Paper } from "@mui/material";
import { useGetSubExCategory } from "../../../hooks/useGetSubExCategory";
import { useGetExCategory } from "../../../hooks/useGetExCategory";
import { ExpenceSubCategory } from "../../../model/ExpenceModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import { useForm } from "react-hook-form";
import {
  expenseSchema,
  ExpenseFormData,
} from "../../../validations/expenseSchema";
import TitleText from "../../../components/TitleText";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import useGetSingleExpence from "../../../hooks/useGetSingleExpence";
import stringToIntConver from "../../../utils/stringToIntConver";
import LoadingAnimation from "../../../components/LoadingAnimation";
import DataLoadingError from "../../../components/common/DataLoadingError";
import BackButton from "../../../components/BackButton";
export default function ExpenceUpdate() {
  const { expence_id } = useParams();
  const navigate = useNavigate();
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const { subExCategory, subExCategoryLoading } = useGetSubExCategory();
  const { exCategory, exCategoryLoading } = useGetExCategory();
  const { singleExpence, singleExpenceLoading, singleExpenceError } =
    useGetSingleExpence(expence_id);
  const [filteredSubCategories, setFilteredSubCategories] = React.useState<
    { id: number; name: string }[]
  >([]);
  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema.partial()),
    defaultValues: {
      branch: getUserCurentBranch()?.id,
      main_category: undefined,
      sub_category: undefined,
      note: "",
    },
  });
  const selectedMainCategory = watch("main_category");
  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await putHandler(`expenses/${expence_id}/update/`, data);
      toast.success("Expense recorded successfully");
      reset(); // Reset the form after successful submission
      navigate(-1);
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  React.useEffect(() => {
    if (singleExpence) {
      setValue("main_category", singleExpence.main_category);
      setValue("note", singleExpence.note);
      setValue("amount", stringToIntConver(singleExpence.amount));
      setValue("branch", singleExpence.branch);
    }
  }, [singleExpence]);

  React.useEffect(() => {
    if (selectedMainCategory && subExCategory) {
      const filtered = subExCategory
        .filter(
          (sub: ExpenceSubCategory) =>
            sub.main_category === selectedMainCategory
        )
        .map(({ id, name }) => ({ id, name }));
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  }, [selectedMainCategory, subExCategory]);
  // Convert exCategory to the correct format for AutocompleteInputField
  const mainCategoryOptions = exCategory.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  if (singleExpenceLoading) {
    return <LoadingAnimation loadingMsg="Loading Expense" />;
  }
  if (singleExpenceError) {
    return <DataLoadingError />;
  }
  return (
    <Paper sx={{ p: 2, mt: 2, maxWidth: 800, mx: "auto" }}>
      <Box>
        <BackButton />
        <TitleText title="Update Expense" />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container gap={1}>
          <Box>
            <Typography variant="body1">
              Main Category name - {singleExpence?.main_category_name}
            </Typography>
            <Typography variant="body1">
              Sub Category name - {singleExpence?.sub_category_name}
            </Typography>
          </Box>

          <Grid item xs={12}>
            <AutocompleteInputField
              options={mainCategoryOptions}
              loading={exCategoryLoading}
              labelName="Main Category"
              defaultId={watch("main_category")}
              onChange={(id) => {
                setValue("main_category", id);
                setValue("sub_category", 0); // Reset subcategory when main changes
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <AutocompleteInputField
              options={filteredSubCategories}
              loading={subExCategoryLoading}
              labelName="Sub Category"
              defaultId={watch("sub_category")}
              onChange={(id) => setValue("sub_category", id)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              size="small"
              multiline
              rows={2}
              {...register("note")}
              error={!!errors.note}
              helperText={errors.note?.message}
              InputLabelProps={{
                shrink: Boolean(watch("note")),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Amount"
              fullWidth
              size="small"
              type="number"
              {...register("amount", { valueAsNumber: true })}
              error={!!errors.amount}
              helperText={errors.amount?.message}
              InputLabelProps={{
                shrink: Boolean(watch("amount")),
              }}
            />
          </Grid>
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
            defaultValue={getUserCurentBranch()?.id}
          />
          <Grid item xs={12}>
            <SubmitCustomBtn
              btnText="Update"
              isError={putHandlerError}
              loading={putHandlerloading}
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

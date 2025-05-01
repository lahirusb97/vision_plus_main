import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";
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
export default function ExpenceUpdate() {
  const { expence_id } = useParams();
  const navigate = useNavigate();
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const { subExCategory, subExCategoryLoading } = useGetSubExCategory();
  const { exCategory, exCategoryLoading } = useGetExCategory();
  const [searchParams] = useSearchParams();
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
    if (selectedMainCategory && subExCategory) {
      const filtered = subExCategory
        .filter(
          (sub: ExpenceSubCategory) =>
            sub.main_category === selectedMainCategory
        )
        .map(({ id, name }) => ({ id, name }));
      setFilteredSubCategories(filtered);
      setValue("sub_category", 0);
    } else {
      setFilteredSubCategories([]);
    }
  }, [selectedMainCategory, subExCategory, setValue]);
  // Convert exCategory to the correct format for AutocompleteInputField
  const mainCategoryOptions = exCategory.map((category) => ({
    id: category.id,
    name: category.name,
  }));
  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: "auto" }}>
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Original Expense Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1">
          <strong>Date:</strong>{" "}
          {formatDateTimeByType(searchParams.get("created_at"), "both") ||
            "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Main Category:</strong>{" "}
          {searchParams.get("main_category_name") || "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Sub Category:</strong>{" "}
          {searchParams.get("sub_category_name") || "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Note:</strong> {searchParams.get("note") || "-"}
        </Typography>
        <Typography variant="body1">
          <strong>Amount:</strong> {searchParams.get("amount") || "0"}
        </Typography>
      </Paper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitleText title="Update Expense" />
        <Grid container spacing={1}>
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
    </Box>
  );
}

import React, { useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AutocompleteInputField from "../../components/inputui/DropdownInput";
import axiosClient from "../../axiosClient";
import { toast } from "react-hot-toast";
import { getUserCurentBranch } from "../../utils/authDataConver";
import useGetExpenseReport from "../../hooks/useGetExpenseReport";
import { useGetSubExCategory } from "../../hooks/useGetSubExCategory";
import { useGetExCategory } from "../../hooks/useGetExCategory";
import { useNavigate } from "react-router";
import useGetFinanceSummary from "../../hooks/useGetFinanceSummary";
import dayjs from "dayjs";
import { ExpenceSubCategory } from "../../model/ExpenceModel";
import { ExpensesTable } from "../../components/ExpensesTable";
import { extractErrorMessage } from "../../utils/extractErrorMessage";

const expenseSchema = z.object({
  branch: z.number().default(1),
  main_category: z.number().min(1, "Main category is required").nullable(),
  sub_category: z.number().min(1, "Sub category is required").nullable(),
  amount: z.number().min(1, "Amount must be greater than 0"),
  note: z.string(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

const Expence = () => {
  const navigate = useNavigate();
  const { subExCategory, subExCategoryLoading } = useGetSubExCategory();
  const { exCategory, exCategoryLoading } = useGetExCategory();
  const { financeSummary, setFinanceSummaryParams } = useGetFinanceSummary();
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
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      branch: getUserCurentBranch()?.id,
      main_category: 0,
      sub_category: 0,
      amount: 0,
      note: "",
    },
  });

  const selectedMainCategory = watch("main_category");
  const {
    expenseList,
    loading: expenseListLoading,
    totalExpense,
  } = useGetExpenseReport();

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
  useEffect(() => {
    const formattedDate = dayjs().format("YYYY-MM-DD"); // 👈 your required format

    setFinanceSummaryParams({ date: formattedDate });
  }, []);

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await axiosClient.post("/expenses/", data);
      toast.success("Expense recorded successfully");
      reset(); // Reset the form after successful submission
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  // Convert exCategory to the correct format for AutocompleteInputField
  const mainCategoryOptions = exCategory.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  return (
    <Box sx={{ display: "flex" }} p={1}>
      <Paper elevation={1} sx={{ p: 1 }}>
        <Box>
          <Button
            size="small"
            sx={{ my: 1 }}
            variant="outlined"
            onClick={() => navigate("manage")}
          >
            Manage Expence Category
          </Button>
          <Paper elevation={1} sx={{ p: 1, mb: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1">
                Total Expense: {totalExpense}
              </Typography>
              <Typography variant="body1">
                Total Received: {financeSummary?.today_balance}{" "}
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Divider sx={{ mb: 1 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
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
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              label="Branch Id"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue={getUserCurentBranch()?.id}
            />
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ExpensesTable data={expenseList} loading={expenseListLoading} />
    </Box>
  );
};

export default Expence;

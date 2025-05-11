import React, { useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Checkbox,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AutocompleteInputField from "../../components/inputui/DropdownInput";
import { toast } from "react-hot-toast";
import { getUserCurentBranch } from "../../utils/authDataConver";
import useGetExpenseReport from "../../hooks/useGetExpenseReport";
import { useGetSubExCategory } from "../../hooks/useGetSubExCategory";
import { useGetExCategory } from "../../hooks/useGetExCategory";
import { useNavigate } from "react-router";
import useGetFinanceSummary from "../../hooks/useGetFinanceSummary";
import dayjs from "dayjs";
import { ExpenceSubCategory } from "../../model/ExpenceModel";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import {
  expenseSchema,
  ExpenseFormData,
} from "../../validations/expenseSchema";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import SubmitCustomBtn from "../../components/common/SubmiteCustomBtn";
import TitleText from "../../components/TitleText";
import { ExpencePaymentTable } from "../../components/ExpencePaymentTable";

import useGetSafeBalance from "../../hooks/useGetSafeBalance";
import { numberWithCommas } from "../../utils/numberWithCommas";

const Expence = () => {
  const navigate = useNavigate();
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const { subExCategory, subExCategoryLoading } = useGetSubExCategory();
  const { exCategory, exCategoryLoading } = useGetExCategory();
  const { financeSummary, setFinanceSummaryParams, financeSummaryRefres } =
    useGetFinanceSummary();
  const { safeTotalBalance, safeTotalBalanceLoading, safeTotalBalanceError } =
    useGetSafeBalance();
  const {
    expenseList,
    loading: expenseListLoading,
    totalExpense,
    refreshReport,
  } = useGetExpenseReport();
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
      main_category: undefined,
      sub_category: undefined,
      note: "",
    },
  });

  const selectedMainCategory = watch("main_category");

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
    console.log(data);
    const postData = {
      branch: data.branch,
      main_category: data.main_category,
      sub_category: data.sub_category,
      amount: data.amount,
      note: data.note,
      paid_source: data.paid_from_safe ? "safe" : "cash",
      paid_from_safe: data.paid_from_safe,
    };
    try {
      await postHandler("/expenses/", postData);
      toast.success("Expense recorded successfully");
      financeSummaryRefres();
      refreshReport();
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
      <Paper elevation={1} sx={{ p: 1, width: "400px" }}>
        <TitleText title="Place New Expense" />
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
              <Typography variant="body1">Total Expense</Typography>
              <Typography variant="body1">
                {numberWithCommas(totalExpense)}
              </Typography>
            </Box>
          </Paper>
          <Paper elevation={1} sx={{ p: 1, mb: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1">Avilable Balance </Typography>
              <Typography variant="body1">
                {numberWithCommas(financeSummary?.today_balance)}{" "}
              </Typography>
            </Box>
          </Paper>
          <Paper elevation={1} sx={{ p: 1, mb: 1 }}>
            {!safeTotalBalanceLoading && !safeTotalBalanceError && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">Safe Locker Balance</Typography>
                <Typography variant="body1">
                  {numberWithCommas(safeTotalBalance)}
                </Typography>
              </Box>
            )}
            {safeTotalBalanceError && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">Refresh The Page</Typography>
              </Box>
            )}
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
            <Box ml={1} display="flex" alignItems="center">
              <Typography variant="body1"> Pay From Safe Locker</Typography>

              <Checkbox
                {...register("paid_from_safe")}
                checked={watch("paid_from_safe") || false} // Add fallback to false
                onChange={(e) => setValue("paid_from_safe", e.target.checked)}
              />
            </Box>

            <Grid item xs={12}>
              <SubmitCustomBtn
                btnText="Add Expence"
                isError={postHandlerError}
                loading={postHandlerloading}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ExpencePaymentTable data={expenseList} loading={expenseListLoading} />
    </Box>
  );
};

export default Expence;

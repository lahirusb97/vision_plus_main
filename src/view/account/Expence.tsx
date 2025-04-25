import React from "react";
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
import useGetSubExCategory from "../../hooks/useGetSubExCategory";
import useGetExCategory from "../../hooks/useGetExCategory";
import AutocompleteInputField from "../../components/inputui/DropdownInput";
import axiosClient from "../../axiosClient";
import { toast } from "react-hot-toast";
import { getUserCurentBranch } from "../../utils/authDataConver";
import useGetExpenseReport from "../../hooks/useGetExpenseReport";

const expenseSchema = z.object({
  branch: z.number().default(1),
  main_category: z.number().min(1, "Main category is required"),
  sub_category: z.number().min(1, "Sub category is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  note: z.string().min(1, "Description is required"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

const Expence = () => {
  const { subExCategory, subExCategoryLoading } = useGetSubExCategory();
  const { exCategory, exCategoryLoading } = useGetExCategory();

  const [filteredSubCategories, setFilteredSubCategories] = React.useState<
    { id: number; name: string }[]
  >([]);

  const {
    control,
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
  const { expenseList, totalExpense } = useGetExpenseReport();

  React.useEffect(() => {
    if (selectedMainCategory && subExCategory) {
      const filtered = subExCategory
        .filter((sub) => sub.main_category === selectedMainCategory)
        .map(({ id, name }) => ({ id, name }));
      setFilteredSubCategories(filtered);
      setValue("sub_category", 0);
    } else {
      setFilteredSubCategories([]);
    }
  }, [selectedMainCategory, subExCategory, setValue]);

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await axiosClient.post("/expenses/", data);
      toast.success("Expense recorded successfully");
      reset(); // Reset the form after successful submission
    } catch (error) {
      toast.error("Failed to record expense");
      console.error(error);
    }
  };

  // Convert exCategory to the correct format for AutocompleteInputField
  const mainCategoryOptions = exCategory.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  return (
    <Box p={2}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">Total Expense: {totalExpense}</Typography>
          <Typography variant="body1">Total Received: </Typography>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
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
                error={!!errors.main_category}
                helperText={errors.main_category?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <AutocompleteInputField
                options={filteredSubCategories}
                loading={subExCategoryLoading}
                labelName="Sub Category"
                defaultId={watch("sub_category")}
                onChange={(id) => setValue("sub_category", id)}
                disabled={
                  !selectedMainCategory || filteredSubCategories.length === 0
                }
                error={!!errors.sub_category}
                helperText={errors.sub_category?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                size="small"
                multiline
                rows={3}
                {...register("note")}
                error={!!errors.note}
                helperText={errors.note?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
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
              margin="normal"
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
    </Box>
  );
};

export default Expence;

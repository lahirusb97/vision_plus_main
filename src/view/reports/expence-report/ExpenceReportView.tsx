import dayjs from "dayjs";
import { ExpencePaymentTable } from "../../../components/ExpencePaymentTable";
import useGetExpenseReport from "../../../hooks/useGetExpenseReport";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Paper,
  Grid,
  Box,
} from "@mui/material";
export default function ExpenceReportView() {
  const [startDate, setStartDate] = React.useState<dayjs.Dayjs | null>(
    dayjs()
  );
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(dayjs());
  const [pending, setPending] = React.useState(false);

  const {
    expenseList,
    handleDateRangeChange,
    expenseSummary,
    loading: expenseListLoading,
  } = useGetExpenseReport();
  const handleSearch = () => {
    setPending(true);
    handleDateRangeChange(
      startDate?.format("YYYY-MM-DD") || "",
      endDate?.format("YYYY-MM-DD") || ""
    );
    setTimeout(() => setPending(false), 500);
  };
  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Expense Report
        </Typography>

        <Grid container spacing={1} mt={0.5}>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ p: 1.5 }}>
              <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Typography variant="subtitle2" color="text.secondary">
                  💼 Safe Expense Amount
                </Typography>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  {expenseSummary.safe_expense_total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ p: 1.5 }}>
              <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Typography variant="subtitle2" color="text.secondary">
                  💰 Cashier Expense Amount
                </Typography>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  {expenseSummary.cash_expense_total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ p: 1.5 }}>
              <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Typography variant="subtitle2" color="text.secondary">
                  🧾 Subtotal Expense Amount
                </Typography>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  {expenseSummary.subtotal_expense}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        mb={3}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From Date"
            format="YYYY-MM-DD"
            value={startDate}
            onChange={setStartDate}
            slotProps={{
              textField: { size: "small", sx: { minWidth: 150 } },
            }}
          />
          <DatePicker
            label="To Date"
            format="YYYY-MM-DD"
            value={endDate}
            onChange={setEndDate}
            slotProps={{
              textField: { size: "small", sx: { minWidth: 150 } },
            }}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={pending || expenseListLoading}
          sx={{ minWidth: 120, height: 40 }}
        >
          {pending || expenseListLoading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Search"
          )}
        </Button>
      </Stack>
      <ExpencePaymentTable data={expenseList} loading={expenseListLoading} />
    </div>
  );
}

import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import useInvoiceReports from "../../hooks/useInvoiceReports";
import dayjs, { Dayjs } from "dayjs";
import SingleDatePicker from "../../hooks/SingleDatePicker";
import useChannelReports from "../../hooks/useChannelReports";
import { ChannelPaymentTable } from "../../components/ChannelPaymentTable";
import { ExpensesTable } from "../../components/ExpensesTable";
import { InvoicePaymentTable } from "../../hooks/InvoicePaymentTable";
import useGetExpenseReport from "../../hooks/useGetExpenseReport";
import useGetFinanceSummary from "../../hooks/useGetFinanceSummary";
import useGetDailyOrderCount from "../../hooks/useGetDailyOrderCount";
import TodayBankingTable from "../../components/common/TodayBankingTable";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const formattedDate = selectedDate ? selectedDate.format("YYYY-MM-DD") : "";
  const { invoiceReport, invoiceReportLoading } = useInvoiceReports({
    payment_date: formattedDate,
  });
  const {
    expenseList,
    handleDateRangeChange,
    loading: expenseListLoading,
  } = useGetExpenseReport();
  const { channelReports, channelReportsLoading } = useChannelReports({
    payment_date: formattedDate,
  });
  const { financeSummary, setFinanceSummaryParams } = useGetFinanceSummary();

  const { dailyOrderCount, setdailyOrderCountParams } = useGetDailyOrderCount();
  useEffect(() => {
    if (selectedDate) {
      handleDateRangeChange(formattedDate, formattedDate);
      setFinanceSummaryParams({ date: formattedDate });
      setdailyOrderCountParams({ date: formattedDate });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);
  //! BUG WHEN NAGICATE PAGINATION VALUES DES NOT REST
  return (
    <Box p={2} minWidth="1000px" minHeight="50vh">
      <Grid container spacing={2}>
        {/* Left Side - Tables */}
        <Grid item xs={12} md={9}>
          {/* Expenses Section */}
          <Paper elevation={3} sx={{ p: 1, mb: 1 }}>
            <Typography variant="h6" gutterBottom>
              Expenses
            </Typography>
            <ExpensesTable
              accountDate={formattedDate}
              data={expenseList}
              loading={expenseListLoading}
            />
          </Paper>

          {/* Invoice Section */}
          <Paper elevation={3} sx={{ p: 1, mb: 1 }}>
            <Typography variant="h6" gutterBottom>
              Invoice
            </Typography>
            <InvoicePaymentTable
              accountDate={formattedDate}
              data={invoiceReport}
              loading={invoiceReportLoading}
            />
          </Paper>

          {/* Channel Section and Financial Buttons */}
          <Box sx={{ display: "flex", gap: 1, my: 1 }}>
            {/* Channel Section */}
            <Paper elevation={3} sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Channel
              </Typography>
              <ChannelPaymentTable
                accountDate={formattedDate}
                data={channelReports}
                loading={channelReportsLoading}
              />
            </Paper>

            {/* Financial Summary Buttons */}
          </Box>
          <TodayBankingTable data={financeSummary?.today_banking || []} />
        </Grid>

        {/* Right Sidebar Section */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 1, textAlign: "center" }}>
            <SingleDatePicker value={selectedDate} onChange={setSelectedDate} />
            <Box sx={{ p: 1 }}>
              <Typography variant="body2">
                <strong>Factory Order:</strong>{" "}
                {dailyOrderCount?.factory_order_count || 0}
              </Typography>
              <Typography variant="body2">
                <strong>Normal Order:</strong>{" "}
                {dailyOrderCount?.normal_order_count || 0}
              </Typography>
              <Typography variant="body2">
                <strong>Channel:</strong> {dailyOrderCount?.channel_count || 0}
              </Typography>
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography variant="body2">
                <strong>Total Orders Payments:</strong>{" "}
                {financeSummary?.today_order_payments || 0}
              </Typography>
              <Typography variant="body2">
                <strong>Total Channels Payments:</strong>{" "}
                {financeSummary?.today_channel_payments || 0}
              </Typography>
              <Typography variant="body2">
                <strong>Total Other Income:</strong>{" "}
                {financeSummary?.today_other_income || 0}
              </Typography>
              <Typography variant="body2">
                <strong>Total Expencess:</strong>{" "}
                {financeSummary?.today_expenses || 0}
              </Typography>
            </Box>
            <Box mt={0} mb={0}>
              <Typography>
                Before Balance - Rs.{financeSummary?.before_balance || 0}
              </Typography>
              <Typography>
                Today Balance - Rs.{financeSummary?.today_balance || 0}
              </Typography>
              <Typography>
                Cash in Hold - Rs.{financeSummary?.cash_in_hold || 0}
              </Typography>
              <Typography>
                Avilable For Deposite - Rs.
                {financeSummary?.available_for_deposit || 0}
              </Typography>
            </Box>
          </Paper>

          {/* Sidebar Buttons */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

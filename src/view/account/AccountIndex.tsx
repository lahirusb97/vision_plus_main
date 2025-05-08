import { useEffect, useState } from "react";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import useInvoiceReports from "../../hooks/useInvoiceReports";
import dayjs, { Dayjs } from "dayjs";
import SingleDatePicker from "../../hooks/SingleDatePicker";
import useChannelReports from "../../hooks/useChannelReports";
import { ChannelPaymentTable } from "../../components/ChannelPaymentTable";
import { InvoicePaymentTable } from "../../hooks/InvoicePaymentTable";
import useGetExpenseReport from "../../hooks/useGetExpenseReport";
import useGetFinanceSummary from "../../hooks/useGetFinanceSummary";
import useGetDailyOrderCount from "../../hooks/useGetDailyOrderCount";
import TodayBankingTable from "../../components/common/TodayBankingTable";
import { ExpencePaymentTable } from "../../components/ExpencePaymentTable";

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
          <Box sx={{ mb: 1 }}>
            <Typography variant="body1">Expenses</Typography>
            <ExpencePaymentTable
              data={expenseList}
              loading={expenseListLoading}
            />
          </Box>

          {/* Invoice Section */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="body1">Invoice</Typography>
            <InvoicePaymentTable
              data={invoiceReport}
              loading={invoiceReportLoading}
            />
          </Box>

          {/* Channel Section */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="body1">Channel</Typography>
            <ChannelPaymentTable
              data={channelReports}
              loading={channelReportsLoading}
            />
          </Box>

          {/* Financial Summary Buttons */}

          <TodayBankingTable data={financeSummary?.today_banking || []} />
        </Grid>

        {/* Right Sidebar Section */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 1, textAlign: "center" }}>
            <SingleDatePicker value={selectedDate} onChange={setSelectedDate} />
            <Box>
              <Typography sx={flexStyle} variant="body2">
                <span> Factory Order </span>
                <span>{dailyOrderCount?.factory_order_count || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span> Normal Order </span>
                <span>{dailyOrderCount?.normal_order_count || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span> Channel </span>
                <span>{dailyOrderCount?.channel_count || 0}</span>
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />

            <Box>
              <Typography sx={flexStyle} variant="body2">
                <span>Total Orders Payments</span>{" "}
                <span>{financeSummary?.today_order_payments || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span>Total Channels Payments</span>{" "}
                <span>{financeSummary?.today_channel_payments || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span>Total Other Income</span>{" "}
                <span>{financeSummary?.today_other_income || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span>Total Expencess</span>{" "}
                <span>{financeSummary?.today_expenses || 0}</span>
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box>
              <Typography sx={flexStyle} variant="body2">
                <span>Before Balance</span>
                <span>{financeSummary?.before_balance || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span>Today Balance</span>
                <span>{financeSummary?.today_balance || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span>Cash in Hold</span>
                <span>{financeSummary?.cash_in_hold || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span> Avilable For Deposite </span>
                <span>{financeSummary?.available_for_deposit || 0}</span>
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
const flexStyle = {
  display: "flex",
  justifyContent: "space-between",
};

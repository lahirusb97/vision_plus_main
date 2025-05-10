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
import OtherIncomePayment from "../../components/common/OtherIncomePayment";
import useGetReportOtherIncome from "../../hooks/useGetReportOtherIncome";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const formattedDate = selectedDate ? selectedDate.format("YYYY-MM-DD") : "";
  const { invoiceReport, invoiceReportLoading, setInvoiceReportParamsData } =
    useInvoiceReports();
  const {
    expenseList,
    handleDateRangeChange,
    loading: expenseListLoading,
  } = useGetExpenseReport();
  const { channelReports, channelReportsLoading, setChannelReportsParamsData } =
    useChannelReports();
  const { financeSummary, setFinanceSummaryParams, financeSummaryLoading } =
    useGetFinanceSummary();
  const {
    otherIncomeReport,
    otherIncomeReportLoading,
    setOtherIncomeReportParamsData,
  } = useGetReportOtherIncome();
  const { dailyOrderCount, setdailyOrderCountParams } = useGetDailyOrderCount();
  useEffect(() => {
    if (selectedDate) {
      handleDateRangeChange(formattedDate, formattedDate);
      setInvoiceReportParamsData({ payment_date: formattedDate });
      setFinanceSummaryParams({ date: formattedDate });
      setdailyOrderCountParams({ date: formattedDate });
      setOtherIncomeReportParamsData({ date: formattedDate });
      setChannelReportsParamsData({ payment_date: formattedDate });
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body1">Banking</Typography>
              <TodayBankingTable
                data={financeSummary?.today_banking || []}
                loading={financeSummaryLoading}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body1">Other Income</Typography>
              <OtherIncomePayment
                data={otherIncomeReport || []}
                loading={otherIncomeReportLoading}
              />
            </Box>
          </Box>
          {/* Financial Summary Buttons */}
        </Grid>

        {/* Right Sidebar Section */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 1, textAlign: "center" }}>
            <SingleDatePicker value={selectedDate} onChange={setSelectedDate} />
            <Divider sx={{ my: 1 }} />

            <Box>
              <Typography variant="body2" fontWeight="bold">
                Order Count
              </Typography>
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
              <Typography variant="body2" fontWeight="bold">
                Total Transactions
              </Typography>
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
              <Typography variant="body2" fontWeight="bold">
                Cash Avilable
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span>Cash in Hold</span>
                <span>{financeSummary?.cash_in_hold || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span> Avilable For Deposite </span>
                <span>{financeSummary?.available_for_deposit || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span>Before Balance</span>
                <span>{financeSummary?.before_balance || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span>Today Balance</span>
                <span>{financeSummary?.today_balance || 0}</span>
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Safe Locker
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span>Safe Before Balance</span>
                <span>{financeSummary?.safe_before_balance || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span>Safe Cash in Hold</span>
                <span>{financeSummary?.safe_cash_in_hold || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span>Safe Deposite</span>
                <span>{financeSummary?.safe_deposit || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span> Safe Expence</span>
                <span>{financeSummary?.safe_expense || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span> Safe Income</span>
                <span>{financeSummary?.safe_income || 0}</span>
              </Typography>
              <Typography sx={flexStyle} variant="body2">
                <span> Safe Today Balance</span>
                <span>{financeSummary?.safe_today_balance || 0}</span>
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

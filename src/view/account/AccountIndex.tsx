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
import useGetSafeBalance from "../../hooks/useGetSafeBalance";
import { numberWithCommas } from "../../utils/numberWithCommas";
import SafeTransactionsTable from "../../components/common/SafeTransactionsTable";
import useGetSafeTransactions from "../../hooks/useGetSafeTransactions";

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
  const { safeTotalBalance } = useGetSafeBalance();
  const {
    safeTransactions,
    loading: safeTransactionsLoading,
    handleDateRangeChange: handleSafeTransactionsDateRangeChange,
  } = useGetSafeTransactions();

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
      handleSafeTransactionsDateRangeChange(formattedDate, formattedDate);
      setFinanceSummaryParams({ date: formattedDate });
      setdailyOrderCountParams({ date: formattedDate });
      setOtherIncomeReportParamsData({ start_date: formattedDate });
      setChannelReportsParamsData({ payment_date: formattedDate });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);
  //! BUG WHEN NAGICATE PAGINATION VALUES DES NOT REST
  return (
    <>
      {financeSummary && dailyOrderCount && (
        <Box p={2} minWidth="1000px" minHeight="50vh">
          <Box gap={2}>
            {/* Left Side - Tables */}
            <Box display="flex" gap={2}>
              {/* Expenses Section */}
              <Box flex={1}>
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
              </Box>
              <Paper sx={{ p: 1, textAlign: "center" }}>
                <SingleDatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
                <Divider sx={{ my: 1 }} />

                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Order Count
                  </Typography>
                  <Typography sx={flexStyle} variant="body2">
                    <span> Factory Order </span>
                    <span>{dailyOrderCount.factory_order_count}</span>
                  </Typography>
                  <Typography sx={flexStyle} variant="body2">
                    <span> Normal Order </span>
                    <span>{dailyOrderCount.normal_order_count}</span>
                  </Typography>
                  <Typography sx={flexStyle} variant="body2">
                    <span> Channel </span>
                    <span>{dailyOrderCount.channel_count}</span>
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />

                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Total Transactions
                  </Typography>
                  <Typography sx={flexStyle} variant="body2">
                    <span>Total Online Payments</span>{" "}
                    <span>
                      {numberWithCommas(
                        financeSummary.today_total_online_payments
                      )}
                    </span>
                  </Typography>
                  <Typography sx={flexStyle} variant="body2">
                    <span>Total Credit Card Payments</span>{" "}
                    <span>
                      {numberWithCommas(
                        financeSummary.today_total_credit_card_payments
                      )}
                    </span>
                  </Typography>
                  <Typography sx={flexStyle} variant="body2">
                    <span>Total Cash Payments</span>{" "}
                    <span>
                      {numberWithCommas(
                        financeSummary.today_total_cash_payments
                      )}
                    </span>
                  </Typography>
                  <Typography sx={flexStyle} variant="body2">
                    <span>Total Orders Payments</span>{" "}
                    <span>
                      {numberWithCommas(financeSummary.today_order_payments)}
                    </span>
                  </Typography>
                  <Typography sx={flexStyle} variant="body2">
                    <span>Total Channels Payments</span>{" "}
                    <span>
                      {numberWithCommas(financeSummary.today_channel_payments)}
                    </span>
                  </Typography>
                  <Typography sx={flexStyle} variant="body2">
                    <span>Total Other Income</span>{" "}
                    <span>
                      {numberWithCommas(financeSummary.today_other_income)}
                    </span>
                  </Typography>
                  <Typography sx={flexStyle} variant="body2">
                    <span>Total Expencess</span>{" "}
                    <span>
                      {numberWithCommas(financeSummary.today_expenses)}
                    </span>
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Cash Avilable
                  </Typography>
                  <Typography sx={flexStyle} variant="body2">
                    <span>Cash in Hand</span>
                    <span>{numberWithCommas(financeSummary.cash_in_hand)}</span>
                  </Typography>
                  {/* <Typography sx={flexStyle} variant="body2">
                    <span> Avilable For Deposite </span>
                    <span>
                      {numberWithCommas(financeSummary.available_for_deposit)}
                    </span>
                  </Typography> */}
                  <Typography sx={flexStyle} variant="body2">
                    <span>Before Balance</span>
                    <span>
                      {numberWithCommas(financeSummary.before_balance)}
                    </span>
                  </Typography>
                  <Typography sx={flexStyle} variant="body2">
                    <span>Today Balance</span>
                    <span>
                      {numberWithCommas(financeSummary.today_balance)}
                    </span>
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Safe Locker
                  </Typography>

                  <Typography sx={flexStyle} variant="body2">
                    <span> Total Safe Balance</span>
                    <span>{numberWithCommas(safeTotalBalance || 0)}</span>
                  </Typography>
                </Box>
              </Paper>

              {/* Financial Summary Buttons */}
            </Box>

            {/* Right Sidebar Section */}
            <Grid item xs={12} md={3}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body1">Banking</Typography>
                  <TodayBankingTable
                    data={financeSummary.today_banking}
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
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body1">Safe Transactions</Typography>
                  <SafeTransactionsTable
                    data={safeTransactions || []}
                    loading={safeTransactionsLoading}
                  />
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
const flexStyle = {
  display: "flex",
  justifyContent: "space-between",
};

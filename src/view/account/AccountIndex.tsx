import { useEffect, useState } from "react";
import { Box, Button, Grid, Paper, Typography, Stack } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SavingsIcon from "@mui/icons-material/Savings";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import useInvoiceReports from "../../hooks/useInvoiceReports";
import dayjs, { Dayjs } from "dayjs";
import SingleDatePicker from "../../hooks/SingleDatePicker";
import useChannelReports from "../../hooks/useChannelReports";
import { ChannelPaymentTable } from "../../components/ChannelPaymentTable";
import { ExpensesTable } from "../../components/ExpensesTable";
import { InvoicePaymentTable } from "../../hooks/InvoicePaymentTable";
import useGetExpenseReport from "../../hooks/useGetExpenseReport";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const formattedDate = selectedDate ? selectedDate.format("YYYY-MM-DD") : "";
  const { invoiceReport, invoiceReportLoading } = useInvoiceReports({
    payment_date: formattedDate,
  });
  const { expenseList, handleDateRangeChange } = useGetExpenseReport();
  const { channelReports, channelReportsLoading, refreshChannelReports } =
    useChannelReports({
      payment_date: formattedDate,
    });
  // Dummy data for Expenses table
  const expensesData = [
    {
      time: "10:00 AM",
      mainCategory: "Office Supplies",
      subCategory: "Stationery",
      description: "Pens and Papers",
      amount: "Rs50",
    },
  ];
  useEffect(() => {
    if (selectedDate) {
      handleDateRangeChange(formattedDate, formattedDate);
    }
  }, [selectedDate]);

  return (
    <Box p={2} minHeight="50vh">
      <Grid container spacing={2}>
        {/* Left Side - Tables */}
        <Grid item xs={12} md={9}>
          {/* Expenses Section */}
          <Paper elevation={3} sx={{ p: 1, mb: 1 }}>
            <Typography variant="h6" gutterBottom>
              Expenses
            </Typography>
            <ExpensesTable data={expenseList} loading={false} />
          </Paper>

          {/* Invoice Section */}
          <Paper elevation={3} sx={{ p: 1, mb: 1 }}>
            <Typography variant="h6" gutterBottom>
              Invoice
            </Typography>
            <InvoicePaymentTable
              data={invoiceReport}
              loading={invoiceReportLoading}
            />
          </Paper>

          {/* Channel Section and Financial Buttons */}
          <Box sx={{ display: "flex", gap: 1, width: "1200px" }}>
            {/* Channel Section */}
            <Paper elevation={3} sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Channel
              </Typography>
              <ChannelPaymentTable
                data={channelReports}
                loading={channelReportsLoading}
              />
            </Paper>

            {/* Financial Summary Buttons */}
            <Box sx={{ width: "400px" }}>
              <Grid container spacing={1}>
                {/* First Row (3 Buttons) */}
                <Grid item xs={4}>
                  <Button
                    size="small"
                    variant="outlined"
                    fullWidth
                    sx={{ flexDirection: "column" }}
                  >
                    <ReceiptLongIcon sx={{ color: "orange", fontSize: 20 }} />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "black" }}
                    >
                      Total Invoice
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    size="small"
                    variant="outlined"
                    fullWidth
                    sx={{ flexDirection: "column" }}
                  >
                    <CurrencyExchangeIcon
                      sx={{ color: "orange", fontSize: 20 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "black" }}
                    >
                      Total Channel
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    size="small"
                    variant="outlined"
                    fullWidth
                    sx={{ flexDirection: "column" }}
                  >
                    <AccountBalanceWalletIcon
                      sx={{ color: "orange", fontSize: 20 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "black" }}
                    >
                      Total Reserved
                    </Typography>
                  </Button>
                </Grid>

                {/* Second Row (2 Buttons) */}
                <Grid item xs={6}>
                  <Button
                    size="small"
                    variant="outlined"
                    fullWidth
                    sx={{ flexDirection: "column" }}
                  >
                    <AttachMoneyIcon sx={{ color: "orange", fontSize: 20 }} />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "black" }}
                    >
                      Total Expenses
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    size="small"
                    variant="outlined"
                    fullWidth
                    sx={{ flexDirection: "column" }}
                  >
                    <SavingsIcon sx={{ color: "orange", fontSize: 20 }} />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "black" }}
                    >
                      Total Release
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        {/* Right Sidebar Section */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 1, textAlign: "center" }}>
            <SingleDatePicker value={selectedDate} onChange={setSelectedDate} />
            <Box sx={{ p: 1 }}>
              <Typography variant="body2">
                <strong>Factory Order:</strong> 79
              </Typography>
              <Typography variant="body2">
                <strong>Normal Order:</strong> 25
              </Typography>
              <Typography variant="body2">
                <strong>Channel:</strong> 41
              </Typography>
            </Box>
          </Paper>

          {/* Sidebar Buttons */}
          <Stack spacing={2} mt={0} mb={0}>
            <Button size="small" variant="contained" fullWidth>
              Before Balance
            </Button>
            <Button size="small" variant="contained" fullWidth>
              Today Balance
            </Button>
            <Button size="small" variant="contained" fullWidth>
              Cash in Hold
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

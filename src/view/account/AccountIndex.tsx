import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SavingsIcon from "@mui/icons-material/Savings";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

const Dashboard = () => {
  // Dummy data for Expenses table
  const expensesData = [
    { time: "10:00 AM", mainCategory: "Office Supplies", subCategory: "Stationery", description: "Pens and Papers", amount: "Rs50" },
    
  ];

  // Dummy data for Invoice table
  const invoiceData = [
    { invoiceNo: "INV001", onlinePayment: "Rs200", card: "Rs100", cash: "Rs50", amount: "Rs350" },
    
  ];

  // Dummy data for Channel table
  const channelData = [
    { channelId: "CH001", channelDate: "2023-10-01", amount: "Rs500" },
    
  ];

  return (
    <Box p={2} minHeight="50vh">
      <Grid container spacing={2}>
        {/* Left Side - Tables */}
        <Grid item xs={12} md={9}>
          {/* Expenses Section */}
          <Paper elevation={3} sx={{ p: 1,mb:1 }}>
            <Typography variant="h6" gutterBottom>Expenses</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: "orange" }}>
                    <TableCell>Time</TableCell>
                    <TableCell>Main Category</TableCell>
                    <TableCell>Sub Category</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expensesData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>{row.mainCategory}</TableCell>
                      <TableCell>{row.subCategory}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} align="right"><strong>Total</strong></TableCell>
                    <TableCell>Rs200</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Invoice Section */}
          <Paper elevation={3} sx={{ p: 1, mb:1 }}>
            <Typography variant="h6" gutterBottom>Invoice</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: "orange" }}>
                    <TableCell>Invoice No</TableCell>
                    <TableCell>Online Payment</TableCell>
                    <TableCell>Card</TableCell>
                    <TableCell>Cash</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.invoiceNo}</TableCell>
                      <TableCell>{row.onlinePayment}</TableCell>
                      <TableCell>{row.card}</TableCell>
                      <TableCell>{row.cash}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} align="right"><strong>Total</strong></TableCell>
                    <TableCell>Rs1150</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Channel Section and Financial Buttons */}
          <Box sx={{ display: "flex", gap: 1, width:"1200px" }}>
            {/* Channel Section */}
            <Paper elevation={3} sx={{flex: 1 }}>
              <Typography variant="h6" gutterBottom>Channel</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "orange" }}>
                      <TableCell>Channel ID</TableCell>
                      <TableCell>Channel Date</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {channelData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.channelId}</TableCell>
                        <TableCell>{row.channelDate}</TableCell>
                        <TableCell>{row.amount}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} align="right"><strong>Total</strong></TableCell>
                      <TableCell>Rs1000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Financial Summary Buttons */}
            <Box sx={{ width: "400px" }}>
              <Grid container spacing={1}>
                {/* First Row (3 Buttons) */}
                <Grid item xs={4}>
                  <Button size="small" variant="outlined" fullWidth sx={{ flexDirection: "column" }}>
                    <ReceiptLongIcon sx={{ color: "orange", fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: "black" }}>Total Invoice</Typography>
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button size="small" variant="outlined" fullWidth sx={{ flexDirection: "column" }}>
                    <CurrencyExchangeIcon sx={{ color: "orange", fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: "black" }}>Total Channel</Typography>
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button size="small" variant="outlined" fullWidth sx={{ flexDirection: "column" }}>
                    <AccountBalanceWalletIcon sx={{ color: "orange", fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: "black" }}>Total Reserved</Typography>
                  </Button>
                </Grid>

                {/* Second Row (2 Buttons) */}
                <Grid item xs={6}>
                  <Button size="small" variant="outlined" fullWidth sx={{ flexDirection: "column" }}>
                    <AttachMoneyIcon sx={{ color: "orange", fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: "black" }}>Total Expenses</Typography>
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button size="small" variant="outlined" fullWidth sx={{ flexDirection: "column" }}>
                    <SavingsIcon sx={{ color: "orange", fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: "black" }}>Total Release</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        {/* Right Sidebar Section */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 1, textAlign: "center" }}>
            <TextField size="small" label="Date Search" variant="outlined" fullWidth sx={{ }} />
            <Box sx={{ p: 1 }}>
              <Typography variant="body2"><strong>Factory Order:</strong> 79</Typography>
              <Typography variant="body2"><strong>Normal Order:</strong> 25</Typography>
              <Typography variant="body2"><strong>Channel:</strong> 41</Typography>
            </Box>
          </Paper>

          {/* Sidebar Buttons */}
          <Stack spacing={2} mt={0} mb={0}>
            <Button size="small" variant="contained" fullWidth>Before Balance</Button>
            <Button size="small" variant="contained" fullWidth>Today Balance</Button>
            <Button size="small" variant="contained" fullWidth>Cash in Hold</Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
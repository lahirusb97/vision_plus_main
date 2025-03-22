import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const ReportsIndex = () => {
  const [fromDate, setFromDate] = useState('2025-03-23');
  const [toDate, setToDate] = useState('2025-03-23');

  // Sample invoice data
  const invoiceData = [
    { invoice: 1457, date: '25/02/2025', time: '10:02 PM', amount: 100000, paymentMethod: 'Cash' },
  ];

  return (
    <Container>
      {/* Order Type Selection with CircleIcons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
        <CircleIcon sx={{ color: 'gray' }} />
        <Typography>Factory order</Typography>
        <CircleIcon sx={{ color: 'blue' }} />
        <Typography>Normal order</Typography>
        <CircleIcon sx={{ color: 'gray' }} />
        <Typography>Channel</Typography>
      </Box>

      {/* Revenue & Invoice Count */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2, gap:20}}>
       
        <Box p={2} sx={{ border: '1px solid gray', borderRadius: 2 }}>
          <Typography variant="h6">Total Revenue: <strong>78,584</strong></Typography>
          <Typography variant="h6">Invoice Count: <strong>457</strong></Typography>
        </Box>

        {/* Date Pickers  */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Select Date From"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Select Date To"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Box>

      {/* Invoice Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1e3a8a' }}>
              <TableCell sx={{ color: 'white' }}>Invoice</TableCell>
              <TableCell sx={{ color: 'white' }}>Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Time</TableCell>
              <TableCell sx={{ color: 'white' }}>Amount</TableCell>
              <TableCell sx={{ color: 'white' }}>Payment Method</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.map((row) => (
              <TableRow key={row.invoice}>
                <TableCell>{row.invoice}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Print Button */}
      <Box textAlign="right" my={2}>
        <Button variant="contained" color="warning">Print</Button>
      </Box>
    </Container>
  );
};

export default ReportsIndex;

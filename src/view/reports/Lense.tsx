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

const Lense = () => {
  const [fromDate, setFromDate] = useState('2025-03-23');
  const [toDate, setToDate] = useState('2025-03-23');

  // Sample invoice data
  const invoiceData = [
    { date: '25/02/2025', lensetype: 'Single Vision', coating: 'Blucut', lensebrand: 'Lanca Potic', quantity: 75 },
  ];

  return (
    <Container>
      {/* Order Type Selection with CircleIcons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
        <CircleIcon sx={{ color: 'gray' }} />
        <Typography>Stock Lense</Typography>
        <CircleIcon sx={{ color: 'blue' }} />
        <Typography>Non-Stock Lense</Typography>
        
      </Box>

      {/* Revenue & Invoice Count  */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2, gap:20 }}>
        
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
              <TableCell sx={{ color: 'white' }}>Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Lens Type</TableCell>
              <TableCell sx={{ color: 'white' }}>Coating</TableCell>
              <TableCell sx={{ color: 'white' }}>Lense Brand</TableCell>
              <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.map((row) => (
              <TableRow key={row.date}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.lensetype}</TableCell>
                <TableCell>{row.coating}</TableCell>
                <TableCell>{row.lensebrand}</TableCell>
                <TableCell>{row.quantity}</TableCell>
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

export default Lense;

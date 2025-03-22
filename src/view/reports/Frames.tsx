import React, { useState } from "react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Frames = () => {
  const [fromDate, setFromDate] = useState(dayjs("2025-03-23"));
  const [toDate, setToDate] = useState(dayjs("2025-03-23"));

  const data = [
    { date: "25/02/2025", brand: "Rover", code: "9991", color: "Black", species: "Plastic", shape: "Full", quantity: 45 }
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={10}>
        {/* Total frames */}
              <Box p={2} sx={{ border: '1px solid gray', borderRadius: 2, my: 2, }}>
                <Typography variant="h6">Total Frames: <strong>78,584</strong></Typography>
                
              </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display="flex" gap={2}>
            <DatePicker
              label="Select Date From"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="Select Date To"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </LocalizationProvider>
      </Box>

      <TableContainer sx={{ mt: 3, border: "1px solid #ccc" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#0d47a1", color: "#fff" }}>
              <TableCell sx={{ color: "#fff" }}>Date</TableCell>
              <TableCell sx={{ color: "#fff" }}>Brand</TableCell>
              <TableCell sx={{ color: "#fff" }}>Code</TableCell>
              <TableCell sx={{ color: "#fff" }}>Color</TableCell>
              <TableCell sx={{ color: "#fff" }}>Species</TableCell>
              <TableCell sx={{ color: "#fff" }}>Shape</TableCell>
              <TableCell sx={{ color: "#fff" }}>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.species}</TableCell>
                <TableCell>{item.shape}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="contained" color="warning">Print</Button>
      </Box>
    </Box>
  );
};

export default Frames;
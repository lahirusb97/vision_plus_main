import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CircleIcon from "@mui/icons-material/Circle";

const jobData = [
  { name: "Alex", date: "2024/10/5", invoice: "54755", progress: "", notes: "lens damage", status: "red" },
  { name: "Nuwan", date: "2024/10/5", invoice: "54755", progress: "Sent to factory", notes: "received lenses", status: "green" },
  { name: "Nuwan", date: "2024/10/5", invoice: "54755", progress: "Received from factory", notes: "", status: "blue" },
  { name: "Nuwan", date: "2024/10/5", invoice: "54755", progress: "Issued to customer", notes: "", status: "green" },
  { name: "Alex", date: "2025/1/5", invoice: "54755", progress: "Received from customer", notes: "", status: "red" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "red":
      return "red";
    case "green":
      return "green";
    case "blue":
      return "blue";
    default:
      return "gray";
  }
};

const CheckInIndex = () => {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <TextField size="small" label="Factory invoice Number / phone no / NIC no" variant="outlined" fullWidth />
        <Button size="small" variant="contained" color="warning" startIcon={<SearchIcon />}>
          Search
        </Button>
      </div>

     {/* Status Indicators */}
     <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <CircleIcon sx={{ color: "red" }} />
          <Typography>On Hold Job</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <CircleIcon sx={{ color: "green" }} />
          <Typography>Confirm Order</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <CircleIcon sx={{ color: "blue" }} />
          <Typography>Fitting on Collection</Typography>
        </Box>
      </Box>

      
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><b>Customer Name</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Invoice</b></TableCell>
              <TableCell><b>Progress</b> <span style={{ color: "red" }}>(4 stages)</span></TableCell>
              <TableCell><b>Notes</b></TableCell>
              <TableCell><b>Arrival Status</b></TableCell>
              <TableCell><b>Details</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.invoice}</TableCell>
                <TableCell>{row.progress}</TableCell>
                <TableCell>{row.notes}</TableCell>
                <TableCell>
                  <CircleIcon sx={{ color: getStatusColor(row.status) }} />
                </TableCell>
                <TableCell>
                  <IconButton color="inherit">
                    <AssignmentIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CheckInIndex;

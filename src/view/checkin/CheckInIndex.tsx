import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CircleIcon from "@mui/icons-material/Circle";
import useGetFactoryInvoices from "../../hooks/useGetFactoryInvoices";
import FactoryInvoiceSearch from "../../hooks/factoryInvoiceSearch";
import { dateAndTimeFormat } from "../../utils/dateAndTimeFormat";
import { progressStatus } from "../../utils/progressState";

const jobData = [
  {
    name: "Alex",
    date: "2024/10/5",
    invoice: "54755",
    progress: "",
    notes: "lens damage",
    status: "red",
  },
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
  const {
    invoices,
    loading,
    error,
    totalCount,
    currentPage,
    pageSize,
    searchParams,
    handleSearch,
    handlePageChange,
    clearFilters,
    refreshInvoices,
  } = useGetFactoryInvoices();

  return (
    <div style={{ padding: 20 }}>
      <FactoryInvoiceSearch handleSearch={handleSearch} />
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
              <TableCell>
                <b>Patient Name</b>
              </TableCell>
              <TableCell>
                <b>Date</b>
              </TableCell>
              <TableCell>
                <b>Invoice</b>
              </TableCell>
              <TableCell>
                <b>Progress</b> <span style={{ color: "red" }}>(4 stages)</span>
              </TableCell>
              {/* <TableCell>
                <b>Notes</b>
              </TableCell> */}
              <TableCell>
                <b>Arrival Status</b>
              </TableCell>
              <TableCell>
                <b>Details</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.customer_details.name}</TableCell>
                <TableCell>
                  {dateAndTimeFormat(row.order_details.order_date)}
                </TableCell>
                <TableCell>{row.invoice_number}</TableCell>
                <TableCell>{progressStatus(row.progress_status)}</TableCell>
                {/* <TableCell>{row.notes}</TableCell> */}
                <TableCell>
                  {row.lens_arrival_status == null
                    ? "_"
                    : row.lens_arrival_status == "received"
                    ? "Received"
                    : "Not Received"}
                </TableCell>
                <TableCell>
                  <CircleIcon
                    sx={{ color: getStatusColor(row.progress_status) }}
                  />
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

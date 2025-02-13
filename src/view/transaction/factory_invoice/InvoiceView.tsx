import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const InvoiceView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const responce = location.state || {}; // Handle possible undefined state

  const componentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });

  return (
    <div>
      <Box
        sx={{
          p: 4,
          maxWidth: 700,
          margin: "auto",
          border: "1px solid black",
          marginTop: "20px",
        }}
        ref={componentRef}
      >
        {/* Logo and Header */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <img
            src="\src\assets\defalt\Rectangle 522.png"
            alt="Vision Plus Logo"
            style={{ height: 50 }}
          />
        </Box>

        <Typography variant="h5" align="center" fontWeight="bold">
          VISION PLUS OPTICIANS (PVT) LTD
        </Typography>
        <Typography variant="body1" align="center">
          Tel: 034 2247354 / 077 7854695
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="body2">
              <strong>Invoice No:</strong> 584644
            </Typography>
            <Typography variant="body2">
              <strong>Customer Name:</strong> {responce.patient.name}
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> {responce.patient.address}
            </Typography>
            <Typography variant="body2">
              <strong>Phone Number:</strong> {responce.patient.phone_number}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body2">No: 34, Aluthgama Road</Typography>
            <Typography variant="body2">Mathugama</Typography>
            <Typography variant="body2">Sri Lanka</Typography>
            <Typography variant="body2">November 05, 2024</Typography>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500, border: "1px solid black" }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Items Name</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Quantity</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Price</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Last Price</strong>
                </TableCell>
              </TableRow>

              {responce.order_items.map((item: any) => (
                <TableRow>
                  <TableCell>{item.frame}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="right">{item.price_per_unit}</TableCell>
                  <TableCell align="right">{item.subtotal}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="left" colSpan={3}>
                  <strong>Full Amount</strong>
                </TableCell>
                <TableCell align="right">{responce.order.sub_total}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" colSpan={3}>
                  <strong>Discount</strong>
                </TableCell>
                <TableCell align="right">{responce.order.discount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" colSpan={3}>
                  <strong>Cash / Card</strong>
                </TableCell>
                <TableCell align="right">
                  {responce.order_payments[0]["amount"] +
                    responce.order_payments[1]["amount"]}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" colSpan={3}>
                  <strong>Balance</strong>
                </TableCell>
                <TableCell align="right">
                  {responce.order.sub_total -
                    (responce.order_payments[0]["amount"] +
                      responce.order_payments[1]["amount"])}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer Note */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, fontWeight: "Bold" }}
        >
          Each of these brands has strengths that cater to specific user needs.
          Consider what aligns best with your priorities—whether speed,
          endurance, affordability, or brand support.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => reactToPrintFn()}
        sx={{ mt: 2 }}
      >
        Print Invoice
      </Button>
    </div>
  );
};

export default InvoiceView;

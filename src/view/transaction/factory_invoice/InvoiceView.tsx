import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  TableHead,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useLocation } from "react-router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useGetSingleInvoiceDetail from "../../../hooks/useGetSingleInvoiceDetail";
import { Check } from "@mui/icons-material";

const InvoiceView = () => {
  const location = useLocation();
  // const { lense, frame, order, patient } = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  const componentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });
  const { invoiceDetail, invoiceDetailLoading } = useGetSingleInvoiceDetail(
    parseInt(queryParams.get("order_id") ?? "")
  );
  const DateView = (date) => {
    return new Date(date).toLocaleString("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  if (invoiceDetailLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!invoiceDetail) {
    return (
      <Typography variant="h6" align="center">
        Invoice not found
      </Typography>
    );
  }
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
        <Typography variant="body1" align="center">
          Date: {DateView(invoiceDetail.invoice_date)}
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
              <strong>Daily Invoice No:</strong>{" "}
              {invoiceDetail.daily_invoice_no}
            </Typography>
            <Typography variant="body2">
              <strong>Customer Name:</strong>{" "}
              {invoiceDetail?.customer_details?.name}
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong>{" "}
              {invoiceDetail?.customer_details?.address}
            </Typography>
            <Typography variant="body2">
              <strong>Phone Number:</strong>{" "}
              {invoiceDetail?.customer_details?.phone_number}
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
          <Table
            size="small"
            sx={{ minWidth: 700, maxWidth: "1200px" }}
            aria-label="spanning table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Desc</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Item List */}
              {invoiceDetail?.order_items.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      {row.lens ? (
                        <Check style={{ marginRight: 8 }} />
                      ) : row.frame ? (
                        <Check style={{ marginRight: 8 }} />
                      ) : (
                        <Check style={{ marginRight: 8 }} />
                      )}
                      <Typography variant="body1">
                        {row.lens ? "Lens" : row.frame ? "Frame" : "Item"}{" "}
                        {index + 1}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1">
                      {" "}
                      {row.price_per_unit}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1"> {row.subtotal}</Typography>
                  </TableCell>
                </TableRow>
              ))}

              {/* Summary Section */}
              <TableRow>
                <TableCell rowSpan={6} />
                <TableCell align="right" colSpan={2}>
                  <Typography variant="subtitle1">Subtotal</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1">
                    ${invoiceDetail.order_details.sub_total}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1} />
                <TableCell align="right">
                  <Typography variant="subtitle1">Discounts</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" color="error">
                    -${invoiceDetail.order_details.discount}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right" colSpan={2}>
                  <Typography variant="h6">Total</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1">
                    ${invoiceDetail.order_details.total_price}
                  </Typography>
                </TableCell>
              </TableRow>

              {/* Payment Details */}
              {invoiceDetail.order_payments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell align="right" colSpan={2}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Typography variant="body2" style={{ marginRight: 8 }}>
                        {DateView(payment.payment_date)}
                      </Typography>
                      <Chip label={payment.payment_method} />
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1">
                      ${payment.amount}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
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

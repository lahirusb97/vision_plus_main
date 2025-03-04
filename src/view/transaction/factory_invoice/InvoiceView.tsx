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
} from "@mui/material";
import { useLocation } from "react-router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useGetSingleInvoiceDetail from "../../../hooks/useGetSingleInvoiceDetail";
import log from "../../../assets/defalt/Rectangle 522.png";
import { ArrowRightAltSharp } from "@mui/icons-material";

const InvoiceView = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const componentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });
  const { invoiceDetail, invoiceDetailLoading } = useGetSingleInvoiceDetail(
    parseInt(queryParams.get("order_id") ?? "")
  );

  const DateView = (date: string) => {
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
  console.log(invoiceDetail);

  return (
    <div>
      {/* A5 Paper Size Container */}
      <Box
        sx={{
          p: 4,
          width: "210mm", // A5 width
          minHeight: "148mm", // A5 height
          margin: "0 auto",
          border: "1px solid #000",
          fontFamily: "Arial, sans-serif",
          "@media print": {
            width: "210mm",
            minHeight: "148mm",
            border: "none",
            margin: "0",
            padding: "2mm",
          },
        }}
        ref={componentRef}
      >
        {/* Logo and Header */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={"2mm"}
        >
          <img src={log} alt="Vision Plus Logo" style={{ height: "8mm" }} />
        </Box>

        <Typography variant="h6" align="center" fontWeight="bold">
          VISION PLUS OPTICIANS (PVT) LTD
        </Typography>
        <Typography variant="body2" align="center">
          Tel: 034 2247354 / 077 7854695
        </Typography>
        <Typography variant="body2" align="center">
          Date: {DateView(invoiceDetail.invoice_date)}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "-12mm",
            mb: "2mm",
          }}
        >
          <Box>
            <Typography variant="body2">
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Invoice No: {invoiceDetail.daily_invoice_no}
              </span>
            </Typography>
            <Typography variant="body2">
              Customer Name: {invoiceDetail?.customer_details?.name}
            </Typography>
            <Typography variant="body2">
              Address: {invoiceDetail?.customer_details?.address}
            </Typography>
            <Typography variant="body2">
              Phone Number: {invoiceDetail?.customer_details?.phone_number}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body2">No: 34, Aluthgama Road</Typography>
            <Typography variant="body2">Mathugama</Typography>
            <Typography variant="body2">Sri Lanka</Typography>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table
            size="small"
            sx={{ width: "100%" }}
            aria-label="spanning table"
          >
            <TableHead>
              <TableRow sx={{ height: 10 }}>
                <TableCell>Item Name</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Item List */}
              {invoiceDetail?.order_items.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="body1">
                      {row.lens
                        ? row?.lense_name
                        : row.frame
                        ? row?.frame_name
                        : ""}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.price_per_unit}</TableCell>
                  <TableCell align="right">{row.subtotal}</TableCell>
                </TableRow>
              ))}

              {/* Summary Section */}
              <TableRow>
                <TableCell rowSpan={6} />
                <TableCell align="right" colSpan={2}>
                  <Typography variant="body2">Subtotal</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {invoiceDetail.order_details.sub_total}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1} />
                <TableCell align="right">
                  <Typography variant="body2">Discounts</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {invoiceDetail.order_details.discount}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right" colSpan={2}>
                  <Typography variant="body2">Total</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {invoiceDetail.order_details.total_price}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right" colSpan={2}>
                  <Typography variant="body2">Payment</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {invoiceDetail.order_payments[0]?.amount}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right" colSpan={2}>
                  <Typography variant="body2">Balance</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {invoiceDetail.order_details.total_price -
                      invoiceDetail.order_payments[0]?.amount}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Branches Section */}
        <Box
          sx={{
            mt: "2mm",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ mt: "2mm" }} variant="h6">
            <span style={{ display: "flex", alignItems: "center" }}>
              Our Branches
              <ArrowRightAltSharp sx={{ fontSize: "10mm" }} />
            </span>
          </Typography>
          <Typography sx={{ mt: "2mm" }} variant="body1">
            Mathugama Branch{" - "}
            <span>0342247354</span>
          </Typography>
          <Typography sx={{ mt: "2mm" }} variant="body1">
            Aluthgama Branch{" - "}
            <span>0342275268</span>
          </Typography>
        </Box>

        {/* Footer Note */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: "2mm", fontWeight: "bold" }}
        >
          We will not be responsible for any uncollected orders after 3 months *
          Non-refundable
        </Typography>
        <Typography variant="body2" align="center">
          Software developed by Furigen technology
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => reactToPrintFn()}
        sx={{ mt: "2mm" }}
      >
        Print Invoice
      </Button>
    </div>
  );
};

export default InvoiceView;

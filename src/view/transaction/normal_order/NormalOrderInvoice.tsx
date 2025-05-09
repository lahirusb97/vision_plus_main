import { useRef } from "react";

import { useReactToPrint } from "react-to-print";
import useGetSingleInvoice from "../../../hooks/useGetSingleInvoice";
import { useLocation } from "react-router";
import BackButton from "../../../components/BackButton";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import InvoiceHeading from "../../../components/Invoice/InvoiceHeading";
import InvoiceAddress from "../../../components/Invoice/InvoiceAddress";
import InvoiceTotalSummery from "../../../components/Invoice/InvoiceTotalSummery";
import TableRawNormalItem from "./TableRawNormalItem";
import InvoiceFooter from "../../../components/Invoice/InvoiceFooter";
export default function NormalOrderInvoice() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { invoiceData: invoiceDetail, invoiceLoading } = useGetSingleInvoice(
    queryParams.get("invoice_number") || "",
    "normal"
  );

  const componentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });
  if (invoiceLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!invoiceDetail) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">No Invoice Found</Typography>
        <Box>
          <BackButton />
        </Box>
      </Box>
    );
  }
  return (
    <div>
      <Box
        sx={{
          padding: "4mm",
          minwidth: "6cm", // A5 width
          minHeight: "10.5mc", // A5 height
          border: "1px solid #000",
          fontFamily: "Arial, sans-serif",
          "@media print": {
            minWidth: "13cm",
            minHeight: "21cm",
            border: "none",
            margin: "0",
          },
        }}
        ref={componentRef}
      >
        <InvoiceHeading invoiceDate={invoiceDetail.invoice_date} />
        <InvoiceAddress invoiceDetail={invoiceDetail} />

        <Table sx={{ border: "2px solid #000" }}>
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid #000" }}>
              <TableCell>Description</TableCell>
              <TableCell align="center">Qty.</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRawNormalItem
              order_items={invoiceDetail?.order_details?.order_items ?? []}
            />
            <InvoiceTotalSummery invoiceDetail={invoiceDetail} />
          </TableBody>
        </Table>

        <InvoiceFooter />
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
}

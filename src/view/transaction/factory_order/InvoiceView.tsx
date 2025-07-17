import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useLocation } from "react-router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import OrderForm from "../../../components/OrderForm";
import useGetSingleInvoice from "../../../hooks/useGetSingleInvoice";
import InvoiceHeading from "../../../components/Invoice/InvoiceHeading";
import InvoiceAddress from "../../../components/Invoice/InvoiceAddress";
import InvoiceLensDetails from "../../../components/Invoice/InvoiceLensDetails";
import InvoiceExternalLensDetails from "../../../components/Invoice/InvoiceExternalLensDetails";
import InvoiceFrameDetails from "../../../components/Invoice/InvoiceFrameDetails";
import InvoiceFooter from "../../../components/Invoice/InvoiceFooter";
import InvoiceTotalSummery from "../../../components/Invoice/InvoiceTotalSummery";

const InvoiceView = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const componentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });
  const { invoiceData: invoiceDetail, invoiceLoading } = useGetSingleInvoice(
    queryParams.get("invoice_number") || "",
    "factory"
  );

  if (invoiceLoading) {
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

  return (
    <div>
      {/* A5 Paper Size Container */}
      {invoiceDetail && (
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
            {/* Logo and Header */}
            <InvoiceHeading invoiceDate={invoiceDetail.invoice_date} />

            <InvoiceAddress invoiceDetail={invoiceDetail} />

            {/* Table using CSS Grid */}
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
                <InvoiceLensDetails
                  order_items={invoiceDetail?.order_details?.order_items ?? []}
                />
                <InvoiceFrameDetails
                  order_items={invoiceDetail?.order_details?.order_items ?? []}
                />
                <InvoiceExternalLensDetails
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
          <OrderForm invoiceDetail={invoiceDetail} />
        </div>
      )}
    </div>
  );
};

export default InvoiceView;

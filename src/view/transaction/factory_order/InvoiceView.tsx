import { Box, Typography, Button, CircularProgress } from "@mui/material";
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

  if (!invoiceDetail) {
    return (
      <Typography variant="h6" align="center">
        Invoice not found
      </Typography>
    );
  }

  return (
    <div>
      {/* A5 Paper Size Container */}
      <Box
        sx={{
          padding: "4mm",
          minwidth: "7cm", // A5 width
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 21mm 21mm",
            gap: "1px",

            border: "2px solid #000",
            mt: "2mm",
          }}
        >
          {/* Table Header */}
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 24mm 21mm 21mm",

              fontWeight: "bold",
              paddingY: "8px",
              paddingX: "2mm",
              borderBottom: "1px solid #000",
            }}
          >
            <Box sx={{ marginLeft: "" }}>Item Name</Box>
            <Box sx={{ textAlign: "center" }}>Qty</Box>
            <Box sx={{ textAlign: "left" }}>Unit</Box>
            <Box sx={{ textAlign: "right" }}>Value</Box>
          </Box>
          {/* Item List */}
          <InvoiceLensDetails
            order_items={invoiceDetail?.order_details?.order_items ?? []}
          />
          <InvoiceExternalLensDetails
            order_items={invoiceDetail?.order_details?.order_items ?? []}
          />
          <InvoiceFrameDetails
            order_items={invoiceDetail?.order_details?.order_items ?? []}
          />

          {/* Summary Section */}
          <InvoiceTotalSummery invoiceDetail={invoiceDetail} />
        </Box>

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
  );
};

export default InvoiceView;

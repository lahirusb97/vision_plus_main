import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useLocation } from "react-router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useGetSingleInvoiceDetail from "../../../hooks/useGetSingleInvoiceDetail";
import log from "../../../assets/defalt/Rectangle 522.png";
import OrderForm from "../../../components/OrderForm";
import EastIcon from "@mui/icons-material/East";

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
            mt: "2mm",
            mb: "2mm",
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body2">
              <span style={{ fontSize: "20px" }}>
                Order No: {invoiceDetail.order}{" "}
                {/* //!Order ID as Invoice Number */}
              </span>
            </Typography>
            <Typography variant="body2">No: 34, Aluthgama Road</Typography>
            <Typography variant="body2">Mathugama</Typography>
            <Typography variant="body2">Sri Lanka</Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Invoice No: {invoiceDetail.id}{" "}
                {/* //!Order ID as Invoice Number */}
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
        </Box>

        {/* Table using CSS Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 150px 150px",
            gap: "1px",
            backgroundColor: "#000",
            border: "2px solid #000",
            mt: "2mm",
          }}
        >
          {/* Table Header */}
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 150px 150px",
              backgroundColor: "#f0f0f0",
              fontWeight: "bold",
              padding: "8px",
              borderBottom: "1px solid #000",
            }}
          >
            <Box>Item Name</Box>
            <Box sx={{ textAlign: "left" }}>Qty</Box>
            <Box sx={{ textAlign: "left" }}>Unit</Box>
            <Box sx={{ textAlign: "right" }}>Value</Box>
          </Box>
          {/* Item List */}

          {invoiceDetail?.order_details.order_items
            .filter((items) => items.lens !== null)
            .map(
              (item, index) =>
                item.lens_detail && (
                  <Box
                    key={index}
                    sx={{
                      gridColumn: "1 / -1",
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 150px 150px",
                      backgroundColor: "#fff",
                      padding: "1mm",
                      borderBottom: "1px solid #000",
                    }}
                  >
                    <Box sx={{ textAlign: "left", fontSize: ".9rem" }}>
                      {item.lens_detail.brand_name}/{item.lens_detail.type_name}
                      /{item.lens_detail.coating_name}
                    </Box>
                    <Box sx={{ textAlign: "left" }}>{item.quantity}</Box>
                    <Box sx={{ textAlign: "left" }}>{item.price_per_unit}</Box>
                    <Box sx={{ textAlign: "right" }}>{item.subtotal}</Box>
                  </Box>
                )
            )}
          {invoiceDetail?.order_details.order_items
            .filter((items) => items.frame !== null)
            .map(
              (item, index) =>
                item.frame_detail && (
                  <Box
                    key={index}
                    sx={{
                      gridColumn: "1 / -1",
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 150px 150px",
                      backgroundColor: "#fff",
                      padding: "1mm",
                      borderBottom: "1px solid #000",
                    }}
                  >
                    <Box sx={{ textAlign: "left", fontSize: ".9rem" }}>
                      {item.frame_detail.brand_name}/
                      {item.frame_detail.code_name}/
                      {item.frame_detail.color_name}
                    </Box>
                    <Box sx={{ textAlign: "left" }}>{item.quantity}</Box>
                    <Box sx={{ textAlign: "left" }}>{item.price_per_unit}</Box>
                    <Box sx={{ textAlign: "right" }}>{item.subtotal}</Box>
                  </Box>
                )
            )}
          {invoiceDetail?.order_details.order_items
            .filter((items) => items.external_lens !== null)
            .map(
              (item, index) =>
                item.external_lens && (
                  <Box
                    key={index}
                    sx={{
                      gridColumn: "1 / -1",
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 150px 150px",
                      backgroundColor: "#fff",
                      padding: "1mm",
                      borderBottom: "1px solid #000",
                    }}
                  >
                    <Box sx={{ textAlign: "left", fontSize: ".9rem" }}>
                      {`${item.brand_name} / ${item.coating_name} / ${item.type_name}`}
                    </Box>
                    <Box sx={{ textAlign: "left" }}>{item.quantity}</Box>
                    <Box sx={{ textAlign: "left" }}>{item.price_per_unit}</Box>
                    <Box sx={{ textAlign: "right" }}>{item.subtotal}</Box>
                  </Box>
                )
            )}

          {/* Summary Section */}
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 150px 150px ",
              backgroundColor: "#fff",
              padding: "1mm",
              borderBottom: "1px solid #000",
            }}
          >
            <Box sx={{ gridColumn: "3/4" }}>Subtotal</Box>
            <Box sx={{ textAlign: "right", gridColumn: "4 / 6" }}>
              {invoiceDetail.order_details.sub_total}
            </Box>
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 150px 150px ",
              borderBottom: "1px solid #000",

              backgroundColor: "#fff",
              padding: "1mm",
            }}
          >
            <Box sx={{ gridColumn: "3 / 4" }}>Discounts</Box>
            <Box sx={{ textAlign: "right", gridColumn: "4 / 6" }}>
              {invoiceDetail.order_details.discount}
            </Box>
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 150px 150px ",
              borderBottom: "1px solid #000",

              backgroundColor: "#fff",
              padding: "1mm",
            }}
          >
            <Box
              sx={{
                gridColumn: "3 / 4",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Total
            </Box>
            <Box sx={{ textAlign: "right", gridColumn: "4 / 6" }}>
              <strong>{invoiceDetail.order_details.total_price}</strong>
            </Box>
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 150px 150px",
              backgroundColor: "#fff",
              padding: "1mm",
              borderBottom: "1px solid #000",
            }}
          >
            <Box sx={{ gridColumn: "3 / 4" }}>Payment</Box>
            <Box sx={{ textAlign: "right", gridColumn: "4 / 6" }}>
              {invoiceDetail.order_details.order_payments.reduce(
                (acc, payment) => acc + parseFloat(payment.amount),
                0
              )}
              .00
            </Box>
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 150px 150px",
              backgroundColor: "#fff",
              padding: "1mm",
              borderBottom: "1px solid #000",
            }}
          >
            <Box sx={{ gridColumn: "3 / 4" }}>Balance</Box>
            <Box sx={{ textAlign: "right", gridColumn: "4 / 6" }}>
              {parseFloat(invoiceDetail?.order_details?.total_price) -
                invoiceDetail.order_details.order_payments.reduce(
                  (acc, payment) => acc + parseFloat(payment.amount),
                  0
                )}
              .00
            </Box>
          </Box>
        </Box>

        {/* Branches Section */}

        <Box
          sx={{ mt: "2mm", display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
            variant="body2"
          >
            <span>Our Branches</span>
          </Typography>
          <Typography variant="body1">Mathugama - 0342247354</Typography>
          <Typography variant="body1">Aluthgama - 0342275268</Typography>
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
        <Typography variant="body2" align="center" sx={{ fontSize: "12px" }}>
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
      <OrderForm invoiceDetail={invoiceDetail} />
    </div>
  );
};

export default InvoiceView;

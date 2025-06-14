import React, { useRef } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { Invoice } from "../model/SingleInvoiceModel";
import { dateAndTimeFormat } from "../utils/dateAndTimeFormat";
import OrderFormRemark from "./OrderFormRemark";
import OrderFromRemarkDetails from "./orderform/OrderFromRemarkDetails";
import { customerPaymentTotal } from "../utils/customerPaymentTotal";
import OrderFromVisionTable from "./orderform/OrderFromVisionTable";
import { numberWithCommas } from "../utils/numberWithCommas";
import dayjs from "dayjs";

interface OrderFormProps {
  invoiceDetail: Invoice | null;
}

const OrderForm: React.FC<OrderFormProps> = ({ invoiceDetail }) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const RefractionDetails = invoiceDetail?.refraction_details;

  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });

  return (
    <>
      {invoiceDetail && (
        <>
          <Box sx={{ padding: "0.5cm" }}>
            {/* Printable Section */}
            <Box
              sx={{
                padding: "0.2cm",
                width: "21cm",
                minHeight: "14.8cm",
                margin: "0 auto",
                border: "1px solid #000",
                "@media print": {
                  width: "21cm",
                  minHeight: "14.8cm",
                  border: "none",
                  margin: "0",
                  padding: "0.2cm",
                },
              }}
              ref={componentRef}
            >
              <Box
                sx={{ display: "flex", alignItems: "flex-start", gap: "0.2cm" }}
              >
                {/* Left Section */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 2,
                    width: "14cm",
                    alignItems: "flex-start",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "0.2cm" }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "Algerian", fontSize: "5mm" }}
                        align="center"
                        fontWeight="bold"
                      >
                        VISION PLUS OPTICIANS (PVT) LTD
                      </Typography>
                      <Typography variant="body1" fontFamily="Alger">
                        {dateAndTimeFormat(invoiceDetail?.invoice_date)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        border: "2px solid black",
                        padding: "0.2cm",
                        fontFamily: "Alger",
                        width: "3cm",
                      }}
                    >
                      <Typography variant="body1">Invoice No:</Typography>
                      <strong> {invoiceDetail?.invoice_number}</strong>
                    </Box>
                  </Box>
                  {invoiceDetail.order_details.urgent && (
                    <Typography
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: "5mm",
                        color: "red",
                      }}
                      variant="h6"
                      fontWeight="bold"
                    >
                      VERY URGENT
                    </Typography>
                  )}
                  {/* Table Section */}
                  <OrderFromVisionTable RefractionDetails={RefractionDetails} />

                  <OrderFormRemark invoiceDetail={invoiceDetail} />

                  {/* Staff Members Section */}
                  <Box
                    display="flex"
                    alignItems="center"
                    marginTop="0.2cm"
                    justifyContent={"flex-end"}
                  >
                    <Typography mr={1} variant="body2" fontWeight="bold">
                      Checked by:{" "}
                    </Typography>
                    <Box sx={{ display: "flex", gap: "0.2cm" }}>
                      {[...Array(4)].map((_, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            width: ".7cm",
                            height: ".7cm",
                            border: "1px solid black",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>

                {/* Right Section (On Hold / Fitting on collection) */}
                <Box
                  sx={{
                    flex: 1,
                    border: "1px solid gray",
                    padding: "0.2cm",
                    width: "7cm",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Alger",
                      border: "1px solid black",
                      textAlign: "center",
                    }}
                  >
                    <strong>
                      {invoiceDetail.order_details.on_hold && "On Hold"}
                      {invoiceDetail.order_details.on_hold &&
                        invoiceDetail.order_details.fitting_on_collection &&
                        " / "}
                      {invoiceDetail.order_details.fitting_on_collection &&
                        "Fitting on Collection"}
                    </strong>
                  </Typography>
                  <Box>
                    <Paper
                      sx={{
                        padding: "0.2cm",
                        boxShadow: "none",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Refraction by:{" "}
                        {invoiceDetail.refraction_details?.prescription_type ===
                        "internal"
                          ? invoiceDetail.refraction_details?.username
                          : invoiceDetail.refraction_details
                              ?.prescription_type_display}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Refraction No:{" "}
                        {invoiceDetail.customer_details.refraction_number}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Staff Member:
                        {invoiceDetail.order_details.sales_staff_username}
                      </Typography>
                      <hr></hr>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Name{` : `}
                        {invoiceDetail.customer_details.name}
                      </Typography>
                      {invoiceDetail.order_details.user_date && (
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          Deliver Date{` : `}
                          {dayjs(invoiceDetail.order_details.user_date).format(
                            "YYYY-MM-DD"
                          )}
                        </Typography>
                      )}
                      <hr></hr>
                      <OrderFromRemarkDetails invoiceDetail={invoiceDetail} />
                      {/* <OrderFormFrameDetails
                    order_items={invoiceDetail?.order_details.order_items ?? []}
                  />

                  <OrderFormLensDetails
                    order_items={invoiceDetail?.order_details.order_items ?? []}
                  />

                  <OrderFormExternalLensDetails
                    order_items={invoiceDetail?.order_details.order_items ?? []}
                  /> */}
                    </Paper>
                  </Box>
                </Box>
              </Box>

              {/* Payment Section */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  width: "21cm",
                  height: "4.8cm",
                  marginTop: "0.2cm",
                }}
              >
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Payment Details:
                  </Typography>
                  <Typography variant="body2">
                    Total Amount - Rs.{" "}
                    {numberWithCommas(invoiceDetail?.order_details.total_price)}
                  </Typography>
                  <Typography variant="body2">
                    Total Payment - Rs.{" "}
                    {numberWithCommas(
                      customerPaymentTotal(
                        invoiceDetail?.order_details.order_payments
                      )
                    )}
                  </Typography>
                  <Typography variant="body2">
                    Balance - Rs.
                    {numberWithCommas(
                      parseInt(
                        invoiceDetail?.order_details?.total_price ?? "0"
                      ) -
                        customerPaymentTotal(
                          invoiceDetail?.order_details.order_payments
                        )
                    )}
                  </Typography>
                </Box>

                {/* Empty Box */}
                <Box
                  sx={{
                    width: "15cm",
                    height: "3cm",
                    border: "1px solid black",
                  }}
                />
              </Box>
            </Box>

            {/* Print Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => reactToPrintFn()}
              sx={{ mt: "2mm" }}
            >
              Print Invoice
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default OrderForm;

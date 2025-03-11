import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Grid,
  Grid2,
} from "@mui/material";
import { useLocation } from "react-router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useGetSingleInvoiceDetail from "../../../hooks/useGetSingleInvoiceDetail";
import log from "../../../assets/defalt/Rectangle 522.png";
import OrderForm from "../../../components/OrderForm";
import EastIcon from "@mui/icons-material/East";
import { dateAndTimeFormat } from "../../../utils/dateAndTimeFormat";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { calculateTotals } from "../../../utils/calculations";

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

  const externalLenseTotal = calculateTotals(
    invoiceDetail?.order_details.order_items.filter(
      (items) => items.external_lens !== null
    )
  );
  const instockLenseTotal = calculateTotals(
    invoiceDetail?.order_details.order_items.filter(
      (items) => items.lens !== null
    )
  );

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
            minWidth: "14cm",
            minHeight: "21cm",
            border: "none",
            margin: "0",
          },
        }}
        ref={componentRef}
      >
        {/* Logo and Header */}
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            src={log}
            alt="Vision Plus Logo"
            style={{ height: "8mm", margin: "0 -4mm" }}
          />
          <Typography
            sx={{ fontFamily: "Algerian", fontSize: "6mm" }}
            variant="h6"
            align="center"
            fontWeight="bold"
          >
            VISION PLUS OPTICIANS & EYE - CLINIC (PVT) LTD
          </Typography>
        </Box>

        <Typography variant="body2" align="center">
          Tel: 034 2247466 / 071 7513639
        </Typography>
        <Typography variant="body2" align="center">
          Date: {DateView(invoiceDetail.invoice_date)}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Box sx={{ alignSelf: "flex-end" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "15mm 1fr",
                gridTemplateRows: "repeat(3, 1fr)", // 3 equal columns
              }}
            >
              <Typography variant="body2">Name</Typography>
              <Typography sx={{}} variant="body2">
                <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
                {invoiceDetail?.customer_details?.name}
              </Typography>
              <Typography variant="body2">Address</Typography>
              <Typography sx={{}} variant="body2">
                <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
                {invoiceDetail?.customer_details?.address}
              </Typography>
              <Typography variant="body2">Contact</Typography>
              <Typography sx={{}} variant="body2">
                <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
                {invoiceDetail?.customer_details?.phone_number}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body2">
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                INVOICE NO : MATA000{invoiceDetail.id}{" "}
                {/* //!Order ID as Invoice Number */}
              </span>
            </Typography>
            <Typography variant="body2">No: 34, Aluthgama Road</Typography>
            <Typography variant="body2">Mathugama</Typography>
            <Typography variant="body2">Sri Lanka</Typography>
          </Box>
        </Box>

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
            <Box sx={{ marginLeft: "2mm" }}>Item Name</Box>
            <Box sx={{ textAlign: "left" }}>Qty</Box>
            <Box sx={{ textAlign: "left" }}>Unit</Box>
            <Box sx={{ textAlign: "right" }}>Value</Box>
          </Box>
          {/* Item List */}
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 21mm 22mm 21mm",
              backgroundColor: "#fff",
              paddingX: "2mm",
              borderBottom:
                instockLenseTotal.subtotal > 0 ? "1px solid #000" : "none",
            }}
          >
            {invoiceDetail?.order_details.order_items
              .filter((items) => items.lens !== null)
              .map(
                (item, index) =>
                  item.lens_detail && (
                    <Box
                      sx={{
                        textAlign: "left",
                        fontSize: ".9rem",
                        paddingY: "1mm",
                      }}
                    >
                      {item.lens_detail.brand_name}/
                      {item.lens_detail.coating_name}/
                      {item.lens_detail.type_name}
                    </Box>
                  )
              )}
            {invoiceDetail.order_details.order_items.filter(
              (items) => items.lens !== null
            ).length > 0 && (
              <>
                <Box sx={{ textAlign: "left" }}>
                  {instockLenseTotal.quantity}
                </Box>
                <Box sx={{ textAlign: "left" }}>
                  {numberWithCommas(instockLenseTotal.price_per_unit)}
                </Box>
                <Box
                  sx={{
                    textAlign: "right",

                    paddingLeft: "2mm",
                  }}
                >
                  {numberWithCommas(instockLenseTotal.subtotal)}
                </Box>
              </>
            )}
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 21mm 22mm 21mm",
              backgroundColor: "#fff",
              paddingX: "1mm",
              borderBottom:
                externalLenseTotal.subtotal > 0 ? "1px solid #000" : "none",
            }}
          >
            {invoiceDetail?.order_details.order_items
              .filter((items) => items.external_lens !== null)
              .slice(0, 1)
              .map(
                (item, index) =>
                  item.external_lens && (
                    <>
                      <Box
                        sx={{
                          textAlign: "left",
                          fontSize: ".9rem",
                          paddingY: "1mm",
                        }}
                      >
                        {`${item.brand_name} / ${item.coating_name} / ${item.type_name}`}
                      </Box>
                    </>
                  )
              )}

            {invoiceDetail.order_details.order_items.filter(
              (items) => items.external_lens !== null
            ).length > 0 && (
              <>
                <Box
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {externalLenseTotal.quantity}
                </Box>
                <Box
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {numberWithCommas(externalLenseTotal.price_per_unit)}
                </Box>
                <Box
                  sx={{
                    textAlign: "right",
                  }}
                >
                  {numberWithCommas(externalLenseTotal.subtotal)}
                </Box>
              </>
            )}
          </Box>
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
                      gridTemplateColumns: "2fr 21mm 21mm 21mm",
                      backgroundColor: "#fff",
                      paddingY: "1mm",
                      paddingX: "1mm",
                      borderBottom: "1px solid #000",
                    }}
                  >
                    <Box sx={{ textAlign: "left", fontSize: ".9rem" }}>
                      {item.frame_detail.brand_name}/
                      {item.frame_detail.code_name}/
                      {item.frame_detail.color_name}
                    </Box>
                    <Box sx={{ textAlign: "left" }}>{item.quantity}</Box>
                    <Box sx={{ textAlign: "left" }}>
                      {numberWithCommas(item.price_per_unit)}
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      {numberWithCommas(item.subtotal)}
                    </Box>
                  </Box>
                )
            )}

          {/* Summary Section */}
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 24mm 21mm ",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                gridColumn: "3/4",
                padding: "1mm",

                borderBottom: "1px solid #000",
                borderLeft: "1px solid #000",
              }}
            >
              Subtotal
            </Box>

            <Box
              sx={{
                textAlign: "right",
                gridColumn: "4 / 6",
                padding: "1mm",
                borderBottom: "1px solid #000",
              }}
            >
              {numberWithCommas(invoiceDetail.order_details.sub_total)}
            </Box>
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 24mm 21mm ",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                gridColumn: "3 / 4",
                padding: "1mm",
                borderBottom: "1px solid #000",

                paddingLeft: "1mm",
                borderLeft: "1px solid #000",
              }}
            >
              Discounts
            </Box>
            <Box
              sx={{
                textAlign: "right",
                gridColumn: "4 / 6",
                padding: "1mm",
                borderBottom: "1px solid #000",
              }}
            >
              {numberWithCommas(invoiceDetail.order_details.discount)}
            </Box>
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 24mm 21mm ",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                gridColumn: "3 / 4",
                fontWeight: "bold",
                textAlign: "left",
                padding: "1mm",

                borderBottom: "1px solid #000",

                paddingLeft: "1mm",
                borderLeft: "1px solid #000",
              }}
            >
              Total
            </Box>
            <Box
              sx={{
                textAlign: "right",
                gridColumn: "4 / 6",
                padding: "1mm",

                borderBottom: "1px solid #000",
              }}
            >
              <strong>
                {numberWithCommas(invoiceDetail.order_details.total_price)}
              </strong>
            </Box>
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 24mm 21mm",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                gridColumn: "3 / 4",

                borderBottom: "1px solid #000",
                paddingLeft: "1mm",
                borderLeft: "1px solid #000",
              }}
            >
              Payment
            </Box>
            <Box
              sx={{
                textAlign: "right",
                gridColumn: "4 / 6",
                padding: "1mm",

                borderBottom: "1px solid #000",
              }}
            >
              {numberWithCommas(
                invoiceDetail.order_details.order_payments.reduce(
                  (acc, payment) => acc + parseFloat(payment.amount),
                  0
                )
              )}
            </Box>
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 24mm 21mm",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                gridColumn: "3 / 4",
                fontWeight: "bold",
                paddingLeft: "1mm",
                borderLeft: "1px solid #000",
              }}
            >
              Balance
            </Box>
            <Box
              sx={{
                textAlign: "right",
                gridColumn: "4 / 6",
                fontWeight: "bold",
                padding: "1mm",
              }}
            >
              {numberWithCommas(
                parseFloat(invoiceDetail?.order_details?.total_price) -
                  invoiceDetail.order_details.order_payments.reduce(
                    (acc, payment) => acc + parseFloat(payment.amount),
                    0
                  )
              )}
            </Box>
          </Box>
        </Box>

        {/* Branches Section */}
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: "2mm", fontWeight: "bolder" }}
        >
          <span style={{ color: "red", fontSize: "4mm" }}>* </span>We will not
          be responsible for any uncollected orders after 3 months.
          Non-refundable.
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ fontWeight: "bold", fontFamily: "fm-emanee" }}
        >
          {`udi  03la blaujQ weKjqï  ms<sn|j j.lshkq fkd,efí' ì,am;a i|yd f.jQ uqo,a kej; f.jkq fkd,efí' `}
        </Typography>
        <Box sx={{ mt: "2mm", display: "flex", justifyContent: "center" }}>
          <Typography variant="body1">
            Branches
            <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
          </Typography>
          <Typography variant="body1">
            Mathugama - 034 2247466
            <span style={{ margin: "0 2mm", fontWeight: "bold" }}>|</span>
          </Typography>
          <Typography variant="body1">Aluthgama - 034 2275268</Typography>
        </Box>

        {/* Footer Note */}

        <Typography variant="body2" align="center" sx={{ fontSize: "12px" }}>
          Bill Printed On{" "}
          <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>{" "}
          {dateAndTimeFormat(new Date().toISOString())}
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

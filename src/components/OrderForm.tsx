import React, { useRef } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { Invoice } from "../model/SingleInvoiceModel";
import { dateAndTimeFormat } from "../utils/dateAndTimeFormat";
import OrderFormRemark from "./OrderFormRemark";

interface OrderFormProps {
  invoiceDetail: Invoice | null;
}

const OrderForm: React.FC<OrderFormProps> = ({ invoiceDetail }) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const RefractionDetails = invoiceDetail?.refraction_details;

  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });

  return (
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
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: "0.2cm" }}>
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

              {/* Table Section */}
              <TableContainer
                component={Paper}
                sx={{ marginTop: "0.4cm", width: "14cm" }}
              >
                <Table size="small" sx={{ border: "1px solid black" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={3}
                        sx={{
                          border: "1px solid black",

                          fontSize: "1.3em", // Right Eye border
                        }}
                      >
                        Right Eye
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={3}
                        sx={{
                          border: "1px solid black",
                          fontSize: "1.3em", // Left Eye border
                        }}
                      >
                        Left Eye
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {/* Right Eye Columns */}
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1.1em",
                        }}
                      >
                        SPH
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1.1em",
                        }}
                      >
                        CYL
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1.1em",
                        }}
                      >
                        AXIS
                      </TableCell>

                      {/* Left Eye Columns */}
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1.1em",
                        }}
                      >
                        SPH
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1.1em",
                        }}
                      >
                        CYL
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1.1em",
                        }}
                      >
                        AXIS
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {/* Right Eye Data */}
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1em",
                        }}
                      >
                        {RefractionDetails?.right_eye_dist_sph} {/* sph */}
                      </TableCell>

                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1em",
                        }}
                      >
                        {RefractionDetails?.right_eye_dist_cyl} {/* cyl */}
                      </TableCell>

                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1em",
                        }}
                      >
                        {RefractionDetails?.right_eye_dist_axis} {/* axis */}
                      </TableCell>

                      {/* Left Eye Data */}
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1em",
                        }}
                      >
                        {RefractionDetails?.left_eye_dist_sph}
                        {/* sph */}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1em",
                        }}
                      >
                        {RefractionDetails?.left_eye_dist_cyl} {/* cyl */}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1em",
                        }}
                      >
                        {RefractionDetails?.left_eye_dist_axis}
                        {/* axis */}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1em",
                        }}
                      >
                        {RefractionDetails?.right_eye_near_sph}
                      </TableCell>
                      <TableCell
                        colSpan={2}
                        sx={{ border: "1px solid black" }}
                      ></TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          fontWeight: "bold",
                          fontSize: "1em",
                        }}
                      >
                        {RefractionDetails?.left_eye_near_sph}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ marginTop: "0.2cm" }}>
                <OrderFormRemark invoiceDetail={invoiceDetail} />

                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {RefractionDetails?.refraction_remark &&
                    ` Refraction Remark : ${RefractionDetails?.refraction_remark}`}
                </Typography>

                <Typography variant="body2" fontWeight="bold">
                  {invoiceDetail?.order_details?.order_remark &&
                    ` Refraction Remark : ${invoiceDetail?.order_details?.order_remark}`}
                </Typography>
              </Box>

              {/* Staff Members Section */}
              <Box
                display="flex"
                alignItems="center"
                marginTop="0.2cm"
                justifyContent={"flex-end"}
              >
                <Typography variant="body2" fontWeight="bold">
                  Invoice by:{" "}
                  {invoiceDetail?.order_details?.sales_staff_username}
                </Typography>
                <Box sx={{ display: "flex", gap: "0.2cm" }}>
                  <Box
                    sx={{
                      width: "1cm",
                      height: "1cm",
                      border: "1px solid black",
                    }}
                  />
                  <Box
                    sx={{
                      width: "1cm",
                      height: "1cm",
                      border: "1px solid black",
                    }}
                  />
                  <Box
                    sx={{
                      width: "1cm",
                      height: "1cm",
                      border: "1px solid black",
                    }}
                  />
                  <Box
                    sx={{
                      width: "1cm",
                      height: "1cm",
                      border: "1px solid black",
                    }}
                  />
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
                  {invoiceDetail?.order_details.on_hold && "On Hold /"}
                  {invoiceDetail?.order_details.fitting_on_collection &&
                    "Fitting on Collection Hold"}
                </strong>
              </Typography>
              <Box>
                <Paper
                  sx={{
                    padding: "0.2cm",
                    boxShadow: "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", marginTop: "0.2cm" }}
                  >
                    Refraction by:{" "}
                    {invoiceDetail?.refraction_details?.prescription &&
                      "Prescription / "}
                    {invoiceDetail?.refraction_details?.username &&
                      invoiceDetail?.refraction_details?.username}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", marginTop: "0.2cm" }}
                  >
                    Refraction No:{" "}
                    {invoiceDetail?.customer_details.refraction_number}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", marginTop: "0.2cm" }}
                  >
                    Staff Member:
                    {invoiceDetail?.order_details.sales_staff_username}
                  </Typography>
                  <hr></hr>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", marginTop: "0.2cm" }}
                  >
                    Name{` : `}
                    {invoiceDetail?.customer_details.name}
                  </Typography>
                  <hr></hr>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", marginTop: "0.2cm" }}
                  >
                    Frame:
                  </Typography>
                  {invoiceDetail?.order_details.order_items
                    .filter((items) => items.frame !== null)
                    .map((item) => (
                      <>
                        <Typography variant="body2">
                          -{item.frame_detail?.brand_name}
                        </Typography>
                        <Typography variant="body2">
                          -{item.frame_detail?.code_name}
                        </Typography>
                        <Typography variant="body2">
                          -{item.frame_detail?.color_name}
                        </Typography>
                        <Typography variant="body2">
                          -{item.frame_detail?.size}
                        </Typography>
                        <Typography variant="body2">
                          -{item.frame_detail?.species}
                        </Typography>
                      </>
                    ))}

                  {invoiceDetail?.order_details.order_items
                    .filter((items) => items.lens !== null)
                    .map(
                      (item) =>
                        item.lens_detail && (
                          <>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold", marginTop: "0.2cm" }}
                            >
                              Lens:
                            </Typography>
                            <Typography variant="body2">
                              -{item.lens_detail.brand_name}
                            </Typography>
                            <Typography variant="body2">
                              -{item.lens_detail.coating_name}
                            </Typography>
                            <Typography variant="body2">
                              -{item.lens_detail.type_name}
                            </Typography>
                          </>
                        )
                    )}

                  {invoiceDetail?.order_details.order_items
                    .filter((items) => items.external_lens !== null)
                    .map(
                      (item) =>
                        item.external_lens && (
                          <>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold", marginTop: "0.2cm" }}
                            >
                              External Lens:
                            </Typography>
                            <Typography variant="body2">
                              -{item.type_name}
                            </Typography>
                            <Typography variant="body2">
                              -{item.brand_name}
                            </Typography>
                            <Typography variant="body2">
                              -{item.coating_name}
                            </Typography>
                          </>
                        )
                    )}
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
                Full Amount - Rs. {invoiceDetail?.order_details.sub_total}
              </Typography>
              <Typography variant="body2">
                Total Payment - Rs.{" "}
                {invoiceDetail.order_details.order_payments.reduce(
                  (acc, payment) => acc + parseFloat(payment.amount),
                  0
                )}
              </Typography>
              <Typography variant="body2">
                Balance - Rs.
                {parseFloat(invoiceDetail?.order_details?.total_price) -
                  invoiceDetail.order_details.order_payments.reduce(
                    (acc, payment) => acc + parseFloat(payment.amount),
                    0
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
  );
};

export default OrderForm;

import React, { useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { Invoice } from "../model/SingleInvoiceModel";
import dayjs from "dayjs";
import { dateAndTimeFormat } from "../utils/dateAndTimeFormat";
interface OrderFormProps {
  invoiceDetail: Invoice | null;
}
const OrderForm: React.FC<OrderFormProps> = ({ invoiceDetail }) => {
  const componentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });
  const RefractionDetails = invoiceDetail?.refraction_details;

  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
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
        {/* Header Section */}
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {dateAndTimeFormat(invoiceDetail?.invoice_date)}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          VISION PLUS OPTICIANS (PVT) LTD
        </Typography>

        <Grid container spacing={2} mt={2}>
          {/* Left Section - Main Invoice */}
          <Grid item xs={8}>
            {/* Prescription Table */}
            <TableContainer
              component={Paper}
              sx={{ mb: 2, border: "1px solid black" }}
            >
              <Table size="small" sx={{ border: "1px solid black" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={3}
                      sx={{
                        fontWeight: "bold",
                        border: "2px solid black",
                        fontSize: "1.3em", // Right Eye border
                      }}
                    >
                      Right Eye
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={3}
                      sx={{
                        fontWeight: "bold",
                        border: "2px solid black",
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
                        border: "2px solid black",
                        fontWeight: "bold",
                        fontSize: "1.1em",
                      }}
                    >
                      SPH
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "2px solid black",
                        fontWeight: "bold",
                        fontSize: "1.1em",
                      }}
                    >
                      CYL
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "2px solid black",
                        fontWeight: "bold",
                        fontSize: "1.1em",
                      }}
                    >
                      AXIS
                    </TableCell>

                    {/* Left Eye Columns */}
                    <TableCell
                      sx={{
                        border: "2px solid black",
                        fontWeight: "bold",
                        fontSize: "1.1em",
                      }}
                    >
                      SPH
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "2px solid black",
                        fontWeight: "bold",
                        fontSize: "1.1em",
                      }}
                    >
                      CYL
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "2px solid black",
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
                        border: "2px solid black",
                        fontWeight: "bold",
                        fontSize: "1em",
                      }}
                    >
                      {RefractionDetails?.right_eye_dist_sph} {/* sph */}
                    </TableCell>

                    <TableCell
                      sx={{
                        border: "2px solid black",
                        fontWeight: "bold",
                        fontSize: "1em",
                      }}
                    >
                      {RefractionDetails?.right_eye_dist_cyl} {/* cyl */}
                    </TableCell>

                    <TableCell
                      sx={{
                        border: "2px solid black",
                        fontWeight: "bold",
                        fontSize: "1em",
                      }}
                    >
                      {RefractionDetails?.right_eye_dist_axis} {/* axis */}
                    </TableCell>

                    {/* Left Eye Data */}
                    <TableCell
                      sx={{
                        border: "2px solid black",
                        fontWeight: "bold",
                        fontSize: "1em",
                      }}
                    >
                      {RefractionDetails?.left_eye_dist_sph}
                      {/* sph */}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "2px solid black",
                        fontWeight: "bold",
                        fontSize: "1em",
                      }}
                    >
                      {RefractionDetails?.left_eye_dist_axis} {/* cyl */}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "2px solid black",
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
                        border: "2px solid black",
                        fontWeight: "bold",
                        fontSize: "1em",
                      }}
                      he
                    >
                      {RefractionDetails?.right_eye_near_sph}
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      sx={{ border: "2px solid black" }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        border: "2px solid black",
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

            {/* Invoice Number */}
            <Box
              sx={{
                backgroundColor: "black",
                padding: 1,
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold", flex: 1 }}>
                Invoice Number
              </Typography>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "5px 10px",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  {invoiceDetail?.id}
                </Typography>
              </Box>
            </Box>

            {/* Remark Field */}
            <Box
              sx={{
                backgroundColor: "black",
                padding: 1,
                color: "white",
                mt: 2,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Remark
              </Typography>
              <Typography
                sx={{ mt: 1, height: 40, backgroundColor: "white" }}
                variant="body2"
              >
                <span
                  style={{
                    color: "black",
                    padding: " 2rem 1rem",
                    fontSize: "1rem",
                  }}
                >
                  {RefractionDetails?.remark}
                </span>
              </Typography>
            </Box>

            {/* Payment Details */}
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
          </Grid>

          {/* Right Section - Invoice Summary */}
          <Grid item xs={4}>
            <Paper
              sx={{
                padding: 2,
                backgroundColor: "#fff",
                border: "1px solid black",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  backgroundColor: "black",
                  color: "white",
                  padding: 1,
                }}
              >
                {invoiceDetail?.id}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2 }}>
                Name: {invoiceDetail?.customer_details.name}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
                Staff Member: Mr. Nithini
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
                Refraction: Mr. Piumi
              </Typography>
              <hr></hr>
              <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2 }}>
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
                          sx={{ fontWeight: "bold", mt: 2 }}
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
                          sx={{ fontWeight: "bold", mt: 2 }}
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
          </Grid>
        </Grid>
      </Box>

      {/* Print Button */}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => reactToPrintFn()}
          sx={{ mt: "2mm" }}
        >
          Print Invoice
        </Button>
      </Box>
    </Box>
  );
};

export default OrderForm;

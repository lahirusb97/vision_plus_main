import React, { useRef } from "react";
import { Container, Typography, Box, Divider, Button } from "@mui/material";
import { useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import useGetSingleAppointment from "../../hooks/useGetSingleAppointment";
import { formatPaymentMethod } from "../../utils/formatPaymentMethod";
import { dateAndTimeFormat } from "../../utils/dateAndTimeFormat";
import { numberWithCommas } from "../../utils/numberWithCommas";

const ChannelInvoice = () => {
  const componentRef = useRef(null);

  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });

  const { channel_id } = useParams();
  const { singleAppointment, singleAppointmentLoading } =
    useGetSingleAppointment(channel_id);

  if (singleAppointmentLoading) {
    return <div>Loading...</div>;
  }
  if (!singleAppointment && !singleAppointmentLoading) {
    return <div>No Data Found</div>;
  }
  // Calculate the total of payments
  const totalAmount =
    (singleAppointment?.payments || []).reduce((total, payment) => {
      return total + parseFloat(payment.amount);
    }, 0) || 0;

  return (
    <Container
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
          margin: "1rem",
          padding: "1rem",
        },
      }}
    >
      <Box ref={componentRef} sx={{ borderRadius: 2, padding: 2 }}>
        <Typography
          sx={{ fontFamily: "Algerian", fontSize: "6mm" }}
          variant="h6"
          align="center"
          fontWeight="bold"
        >
          VISION PLUS OPTICIANS (PVT) LTD
        </Typography>
        <Typography fontWeight={"bold"} variant="body2" align="center">
          (CHANNELED CONSULTATIONS SERVICE)
        </Typography>
        <Typography variant="body2" align="center">
          34, Aluthgama Road, Mathugama
        </Typography>

        <Typography variant="body2" align="center" gutterBottom>
          Tel: 034 - 2247466 / 071 - 7513639
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Channele No:</Typography>
          <Typography variant="h6" fontWeight={"bold"}>
            {1}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Channel Date:</Typography>
          <Typography fontSize={"1.5 rem"} fontWeight={"bold"} variant="h6">
            {singleAppointment?.date}/{singleAppointment?.time}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
          <Typography variant="body2">Channel Id:</Typography>
          <Typography variant="body2">{singleAppointment?.id}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Patient Name:</Typography>
          <Typography variant="body2">
            {singleAppointment?.patient_name}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Name of Doctor:</Typography>
          <Typography variant="body2">
            {singleAppointment?.doctor_name}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Consultant Fee:</Typography>
          <Typography variant="body2">
            {numberWithCommas(singleAppointment?.amount)}
          </Typography>{" "}
          {/* Dummy Consultant Fee */}
        </Box>

        {/* <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Establishment Fee:</Typography>
          <Typography variant="body2">{singleAppointment}</Typography>
        </Box> */}

        {singleAppointment?.payments.map((payment) => (
          <Box display="flex" justifyContent="space-between" gap={1}>
            <Typography variant="body2">
              {formatPaymentMethod(payment.payment_method)} -
              {dateAndTimeFormat(payment.created_at)}
            </Typography>

            <Typography variant="body2">
              {numberWithCommas(payment.amount)}
            </Typography>
          </Box>
        ))}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Total:</Typography>
          <Typography variant="body2">
            {numberWithCommas(totalAmount)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Balance</Typography>
          <Typography variant="body2">
            {numberWithCommas(
              parseInt(singleAppointment?.amount || "0") - totalAmount
            )}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" align="right" sx={{ fontStyle: "italic" }}>
          For Authorized Office
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
    </Container>
  );
};

export default ChannelInvoice;

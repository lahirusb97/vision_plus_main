import React, { useRef } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { useLocation } from "react-router";
import { useReactToPrint } from "react-to-print";

const ChannelInvoice = () => {
  const location = useLocation();

  const {
    doctor_id,
    name,
    address,
    contact_number,
    channel_date,
    time,
    channeling_fee,
    payments,
  } = location.state || {
    doctor_id: null,
    name: "",
    address: "",
    contact_number: "",
    channel_date: "",
    time: "",
    channeling_fee: 0,
    payments: [
      { amount: 0, payment_method: "Cash" },
      { amount: 0, payment_method: "Card" },
    ],
  };

  // Calculate the total of payments
  const totalPayments = payments.reduce(
    (total, payment) => total + parseFloat(payment.amount),
    0
  );
  const componentRef = useRef(null);

  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });

  return (
    <Container maxWidth="sm" sx={{ mt: 4, width: "1400px" }}>
      <Paper ref={componentRef} elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          VISION PLUS OPTICIANS (PVT) LTD
        </Typography>
        <Typography variant="body2" align="center">
          (CHANNELED CONSULTATIONS SERVICE)
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          34, Aluthgama Road, Mathugama
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">Date: {channel_date}</Typography>
          <Typography variant="body2">
            Tel: 034 - 2247466 / 071 - 7513639
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
          <Typography variant="body2">Channel Id:</Typography>
          <Typography variant="body2">{1}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Patient Name:</Typography>
          <Typography variant="body2">{name}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Age:</Typography>
          <Typography variant="body2">{28}</Typography> {/* Dummy Age */}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Channele No:</Typography>
          <Typography variant="body2">{1}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Channel Date:</Typography>
          <Typography variant="body2">{channel_date}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Name of Doctor:</Typography>
          <Typography variant="body2">{"Doc Name"}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Consultant Fee:</Typography>
          <Typography variant="body2">2000</Typography>{" "}
          {/* Dummy Consultant Fee */}
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Establishment Fee:</Typography>
          <Typography variant="body2">{totalPayments}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Total:</Typography>
          <Typography variant="body2">{totalPayments}</Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ mt: 2, backgroundColor: "#f0f0f0", p: 1 }}
        >
          <Typography variant="body2">Paid:</Typography>
          <Typography variant="body2">{totalPayments}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" align="right" sx={{ fontStyle: "italic" }}>
          For Authorized Office
        </Typography>
      </Paper>
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

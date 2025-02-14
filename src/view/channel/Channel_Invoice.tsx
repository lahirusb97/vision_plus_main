import React from 'react';
import { Container, Typography, Paper, Box, Divider, Button } from '@mui/material';

const ChannelInvoice = () => {
  // Response object with dummy data
  const data = {
    id: 1,
    doctor: 1,
    doctor_name: "Dr. Smith",
    patient: 5,
    patient_name: "Lahiru Shiran",
    address: "A20/1, Colombo, Colombo",
    contact_number: "0711234567",
    schedule: 1,
    date: "2025-02-16",
    time: "13:02:00",
    status: "Pending",
    amount: "2500.00",
    channel_no: 2,
    payments: [
      {
        id: 1,
        appointment: 1,
        appointment_details: "1",
        doctor_name: "Dr. Smith",
        patient_name: "Lahiru Shiran",
        payment_date: "2025-02-13T03:32:08.678452Z",
        amount: "1000.00",
        payment_method: "Cash",
        is_final: false,
        created_at: "2025-02-13T03:32:08.678506Z",
        updated_at: "2025-02-13T03:32:08.678520Z",
      },
      {
        id: 2,
        appointment: 1,
        appointment_details: "1",
        doctor_name: "Dr. Smith",
        patient_name: "Lahiru Shiran",
        payment_date: "2025-02-13T03:32:08.697824Z",
        amount: "500.00",
        payment_method: "Card",
        is_final: false,
        created_at: "2025-02-13T03:32:08.697871Z",
        updated_at: "2025-02-13T03:32:08.697885Z",
      },
    ],
  };

  // Calculate the total of payments
  const totalPayments = data.payments.reduce((total, payment) => total + parseFloat(payment.amount), 0);

  return (
    <Container maxWidth="sm" sx={{ mt: 4, width:"1400px"}}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
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
          <Typography variant="body2">Date: {data.date}</Typography>
          <Typography variant="body2">Tel: 034 - 2247466 / 071 - 7513639</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
          <Typography variant="body2">Channel Id:</Typography>
          <Typography variant="body2">{data.id}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Patient Name:</Typography>
          <Typography variant="body2">{data.patient_name}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Age:</Typography>
          <Typography variant="body2">35</Typography> {/* Dummy Age */}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Channele No:</Typography>
          <Typography variant="body2">{data.channel_no}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Channel Date:</Typography>
          <Typography variant="body2">{data.date}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Name of Doctor:</Typography>
          <Typography variant="body2">{data.doctor_name}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Consultant Fee:</Typography>
          <Typography variant="body2">2000</Typography> {/* Dummy Consultant Fee */}
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Establishment Fee:</Typography>
          <Typography variant="body2">{totalPayments}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Total:</Typography>
          <Typography variant="body2">{data.amount}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" sx={{ mt: 2, backgroundColor: "#f0f0f0", p: 1 }}>
          <Typography variant="body2">Paid:</Typography>
          <Typography variant="body2">{totalPayments}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" align="right" sx={{ fontStyle: "italic" }}>
          For Authorized Office
        </Typography>

        <Box display="flex" justifyContent="center" sx={{ mt: 3, }}>
          <Button variant="contained" color="primary"sx={{ backgroundColor:"#D4B4DC" }}>
            Print
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChannelInvoice;
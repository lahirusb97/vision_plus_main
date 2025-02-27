import React from "react";
import { Paper, Typography, Button, Box, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

export default function RefractionGenerated() {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query parameters
  const searchParams = new URLSearchParams(location.search);
  const refraction_number = searchParams.get("refraction_number");
  const customer_full_name = searchParams.get("customer_full_name");
  const customer_mobile = searchParams.get("customer_mobile");

  return (
    <Box
      sx={{
        marginTop: 10,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          ✅ Refraction Created Successfully!
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" gutterBottom>
              <strong>Refraction Number</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              {refraction_number}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" gutterBottom>
              <strong>Customer Number</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              {customer_full_name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" gutterBottom>
              <strong>Mobile </strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              {customer_mobile}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Button
          variant="contained"
          fullWidth
          sx={{
            padding: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: 2,
            marginTop: 2,
          }}
          onClick={() => navigate(-1)}
        >
          OK
        </Button>
      </Paper>
    </Box>
  );
}

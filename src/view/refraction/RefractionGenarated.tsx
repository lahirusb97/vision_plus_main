import React from "react";
import { Paper, Typography, Button, Box, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import useGetSingleRefractionNumber from "../../hooks/useGetSingleRefractionNumber";
import LoadingAnimation from "../../components/LoadingAnimation";

export default function RefractionGenerated() {
  const navigate = useNavigate();
  const { refraction_id } = useParams();
  const { singlerefractionNumber, singlerefractionNumberLoading } =
    useGetSingleRefractionNumber(refraction_id);

  // Parse query parameters
  if (singlerefractionNumberLoading) {
    return <LoadingAnimation loadingMsg="Refraction Number Details Loading" />;
  }

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
              {singlerefractionNumber?.refraction_number}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" gutterBottom>
              <strong>Customer Number</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              {singlerefractionNumber?.customer_full_name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" gutterBottom>
              <strong>Mobile </strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              {singlerefractionNumber?.customer_mobile}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" gutterBottom>
              <strong>Nice </strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              {singlerefractionNumber?.nic}
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
